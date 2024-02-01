import { v2 as cloudinary } from 'cloudinary';
import * as process from 'process';

export async function uploadToCloud(file: any): Promise<any> {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return await cloudinary.uploader.upload(file.path);
  } catch (error) {
    console.log(error);
    throw new Error('Error uploading image to Cloudinary');
  }
}
