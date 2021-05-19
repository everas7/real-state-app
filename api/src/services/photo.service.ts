import * as photoRepository from '../repositories/photo.repository';
import { Property } from '../interfaces/property.interface';
import { uploadImage } from '../helpers/cloudinary';

export const add = async ({
  property,
  files,
}: {
  property: Property;
  files: Express.Multer.File[];
}): Promise<void> => {
  const uploadPromises = files.map((file) => {
    return uploadImage(file.path);
  });
  const result = await Promise.all(uploadPromises);
  const photos = result.map((r) => ({
    name: r.original_filename,
    url: r.secure_url,
    propertyId: property.id,
  }));

  return photoRepository.bulkCreate(photos);
};

export const remove = async (
  propertyId: number,
  ids: number[]
): Promise<number> => {
  return photoRepository.bulkRemove(propertyId, ids);
};
