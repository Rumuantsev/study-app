import sharp from "sharp";
import path from "path";
import fs from "fs";

const watermarkPath = path.join(__dirname, "..", "assets", "watermark.png");
export const processImage = async (filePath: string) => {
  const ext = path.extname(filePath);
  const processedPath = filePath.replace(ext, `_processed${ext}`);
  const watermarkSize = {
    width: 100,
    height: 50,
  };
  const watermarkBuffer = await sharp(watermarkPath)
    .resize(watermarkSize.width, watermarkSize.height, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();
  await sharp(filePath)
    .resize(800)
    .composite([{ input: watermarkBuffer, gravity: "southeast" }])
    .toFile(processedPath);

  return processedPath;
};
