import cloudinary from 'cloudinary';

export const uploadImage = (image: string) =>
  cloudinary.v2.uploader.upload(image);
