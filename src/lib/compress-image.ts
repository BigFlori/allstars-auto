const MAX_DIMENSION = 1440;
const INITIAL_QUALITY = 0.68;
const MIN_QUALITY = 0.3;
const QUALITY_STEP = 0.12;
const TARGET_MAX_BYTES = 500 * 1024;

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

/**
 * Resizes and re-encodes an image in the browser before upload so phone
 * photos (often several MB each) don't blow past the server action /
 * function payload size limits. Falls back to the original file if
 * compression fails or doesn't actually shrink it.
 */
export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    let quality = INITIAL_QUALITY;
    let blob = await canvasToBlob(canvas, quality);
    while (blob && blob.size > TARGET_MAX_BYTES && quality > MIN_QUALITY) {
      quality -= QUALITY_STEP;
      blob = await canvasToBlob(canvas, quality);
    }

    if (!blob || blob.size >= file.size) {
      return file;
    }

    const newName = `${file.name.replace(/\.\w+$/, "")}.jpg`;
    return new File([blob], newName, { type: "image/jpeg", lastModified: Date.now() });
  } catch {
    return file;
  }
}
