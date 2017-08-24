export default class ProgressiveImageLoad {
	constructor(options) {
		const defaultOptions = {
			pictureTagClassName: 'js-progressive-img',
			pictureLoadedClassName: 'progressive-img-state-loaded',
			mediaQueries: ['(max-width: 600px)', '(min-width: 600px) and (max-width: 768px)'],
			fullImageDataAttribute: 'srcset',
		};

		this.options = Object.assign({}, defaultOptions, options);

		this.getImages();
		if (this.imageList.length) {
			this.load();
		}

		const resize = this.throttle(this.update.bind(this), 1000);
		window.addEventListener('resize', () => {
			resize();
		});
	}

	getImages() {
		this.imageList = document.querySelectorAll(`.${this.options.pictureTagClassName}`);
	}

	isAllSourcesLoaded(picture) {
		let isAllLoaded = true;
		const sources = picture.querySelectorAll('source');
		const img = picture.querySelector('img');

		// eslint-disable-next-line max-len
		if (sources.length && !Array.prototype.every.call(sources, source => source.getAttribute('srcset') === source.dataset[this.options.fullImageDataAttribute])) {
			isAllLoaded = false;
		}

		if (img.src.indexOf(img.dataset[this.options.fullImageDataAttribute]) === -1) {
			isAllLoaded = false;
		}

		return isAllLoaded;
	}

	load() {
		const currentMedia = this.options.mediaQueries.filter(query => window.matchMedia(query).matches)[0];

		this.imageList.forEach((picture) => {
			// desctop image
			const img = picture.querySelector('img');
			// other images
			const sources = picture.querySelectorAll('source');
			let source;

			if (sources.length && currentMedia) {
				source = Array.prototype.filter.call(sources, item => item.getAttribute('media') === currentMedia);
				source = source[0];
			}

			// image uploaded
			if (
				// eslint-disable-next-line max-len
				(currentMedia && source && source.getAttribute('srcset') === source.dataset[this.options.fullImageDataAttribute])
				|| (!source && img.getAttribute('src') === img.dataset[this.options.fullImageDataAttribute])
			) {
				return false;
			}

			img.classList.remove(this.options.pictureLoadedClassName);

			const tempImage = new Image();

			tempImage.onload = () => {
				if (source) {
					source.srcset = source.dataset[this.options.fullImageDataAttribute];
				} else {
					img.src = img.dataset[this.options.fullImageDataAttribute];
				}
				img.classList.add(this.options.pictureLoadedClassName);
				if (this.isAllSourcesLoaded(picture)) {
					picture.classList.remove(this.options.pictureTagClassName);
				}
			};

			if (source) {
				tempImage.srcset = source.dataset[this.options.fullImageDataAttribute];
			} else {
				tempImage.src = img.dataset[this.options.fullImageDataAttribute];
			}

			return true;
		});
	}

	update() {
		this.getImages();
		if (this.imageList.length) {
			this.load();
		}
	}

	// eslint-disable-next-line
	throttle(func, ms) {
		let isThrottled = false;
		let	savedArgs;
		let	savedThis;

		function wrapper(...args) {
			if (isThrottled) {
				savedArgs = args;
				savedThis = this;
				return;
			}

			func.apply(this, args);

			isThrottled = true;

			setTimeout(() => {
				isThrottled = false;
				if (savedArgs) {
					wrapper.apply(savedThis, savedArgs);
					// eslint-disable-next-line
					savedArgs = savedThis = null;
				}
			}, ms);
		}

		return wrapper;
	}
}

