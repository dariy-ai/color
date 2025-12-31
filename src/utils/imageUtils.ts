import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { MAX_IMAGE_DIMENSION, IMAGE_COMPRESSION_QUALITY } from './constants';

/**
 * Optimizes an image for Claude API by resizing and compressing
 * @param imagePath - Path to the image file
 * @returns Optimized image URI
 */
export async function optimizeImageForClaude(imagePath: string): Promise<string> {
  const optimized = await manipulateAsync(
    imagePath,
    [{ resize: { width: MAX_IMAGE_DIMENSION } }],
    {
      compress: IMAGE_COMPRESSION_QUALITY,
      format: SaveFormat.JPEG
    }
  );

  return optimized.uri;
}

/**
 * Converts an image to base64 for API transmission
 * @param imagePath - Path to the image file
 * @returns Base64 encoded string
 */
export async function imageToBase64(imagePath: string): Promise<string> {
  const base64 = await FileSystem.readAsStringAsync(imagePath, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return base64;
}
