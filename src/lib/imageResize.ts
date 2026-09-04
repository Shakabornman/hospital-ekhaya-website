// Resizes and compresses an image in the browser before upload, so Storage
// never fills up with full-resolution phone photos. Caps the longest edge
// at maxDimension and re-encodes as JPEG at the given quality — typically
// shrinks a multi-MB phone photo down to a few hundred KB with no visible
// quality loss on screen.
export async function resizeImage(
  file: File,
  maxDimension = 1600,
  quality = 0.8
): Promise<File> {
  // Skip non-image files (shouldn't happen given the file input's accept
  // attribute, but safe to pass through untouched just in case).
  if (!file.type.startsWith("image/")) return file;

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = objectUrl;
    });

    const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
    const width = Math.round(img.width * scale);
    const height = Math.round(img.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );
    if (!blob) return file;

    // If somehow the "compressed" version is bigger (rare, e.g. a tiny
    // already-optimized icon), just keep the original.
    if (blob.size >= file.size) return file;

    const newName = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
