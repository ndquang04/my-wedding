import React from 'react';
import {Cloudinary} from '@cloudinary/url-gen';
import {auto} from '@cloudinary/url-gen/actions/resize';
import {autoGravity} from '@cloudinary/url-gen/qualifiers/gravity';
import {AdvancedImage} from '@cloudinary/react';

export const dataImage = Array.from({length: 6}, (v, i) => ({
  id: i,
  name: `wd${i + 1}`,
}));

const Image = ({name, className}) => {
  const cld = new Cloudinary({cloud: {cloudName: 'quangnd'}});
  // Use this sample image or upload your own via the Media Explorer
  const img = cld
    .image(name)
    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(480).height(320)); // Transform the image: auto-crop to square aspect_ratio
  return <AdvancedImage cldImg={img} className={className} />;
};

export default Image;
