import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
dotenv.config({})

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME

})

export const uploadFile = async (file) => {
 

  try {
    const result = await cloudinary.uploader.upload(file, { resource_type: 'auto', folder: 'profile_images_for_sms', })
    return result

  } catch (error) {
    console.log(error,'here i am')

  }

}
export const distroyFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.log(error)

  }
}

export const deleteVideoFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    console.log(error);

  }
}


export const extractPublicId = (imageUrl) => {
  // console.log(imageUrl, 'this is the image in extractPublicId');

  // Regex to capture the public ID, accounting for potential folders after /upload/
  const regex = /\/upload\/(?:v\d+\/)?(.+?)\.[a-z]+$/i;
  const match = imageUrl.match(regex);

  return match ? match[1] : null; 
};


