#  Progressive uploading images to Vanilla Js.

![Effect](https://github.com/dudim/progressive-images/blob/master/assets/images/effect.png)

## Use as a module
### js
```
import ProgressiveLoad from 'progressive-load';
const progresseiveLoadImages = new ProgressiveLoad({
    pictureTagClassName: 'js-progressive-img',
    pictureLoadedClassName: 'progressive-img-state-loaded',
    mediaQueries: ['(max-width: 600px)', '(min-width: 600px) and (max-width: 768px)'],
    fullImageDataAttribute: 'srcset',
});

//ajax loaded images
progresseiveLoadImages.update()
```
### css
```
.progressive-img {
	filter: blur(15px);
	transform: scale(1.05);
}

.progressive-img-state-loaded {
	filter: none;
	transform: scale(1);
}
```
### html
Different images depending on the screen resolution.
```
<picture class="js-progressive-img">
      <!-- tablet image -->
      <source
          media="(min-width: 600px) and (max-width: 768px)"
          srcset="/assets/images/1-tablet-thumbnail.jpg"
          data-srcset="/assets/images/1-tablet.jpg"
      >
      <!-- phone image -->
      <source
          media="(max-width: 600px)"
          srcset="/assets/images/1-mobile-thumbnail.jpg"
          data-srcset="/assets/images/1-mobile.jpg"
      >
      <!-- desctop image -->
      <img
          src="/assets/images/1-thumbnail.jpg"
          data-srcset="/assets/images/1.jpg"
          class="progressive-img"
      >
  </picture>
```
Images for mobile version and desktop.
```
<picture class="js-progressive-img">
  <!-- phone image -->
  <source
      media="(max-width: 600px)"
      srcset="/assets/images/2-mobile-thumbnail.jpg"
      data-srcset="/assets/images/2-mobile.jpg"
  >
  <!-- desctop image -->
  <img
      src="/assets/images/2-thumbnail.jpg"
      data-srcset="/assets/images/2.jpg"
      class="progressive-img"
  >
</picture>
```
One image for all resolutions.
```
<picture class="js-progressive-img">
  <img
      src="/assets/images/3-thumbnail.jpg"
      data-srcset="/assets/images/3.jpg"
      class="progressive-img"
  >
</picture>
```