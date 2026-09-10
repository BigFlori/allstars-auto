const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "images", "logo-source.jpeg");
const OUT_DIR = path.join(__dirname, "..", "public", "images");
const APP_DIR = path.join(__dirname, "..", "src", "app");

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // Trim the pure-black margin around the artwork, keep native black background
  // (the "chrome" text relies on real dark shading, so we don't chroma-key it out —
  // instead the site uses a dark header/hero so the logo's black bg blends in).
  const trimmed = sharp(SRC).trim({ background: "#000000", threshold: 12 });
  const trimmedBuffer = await trimmed.toBuffer();
  const meta = await sharp(trimmedBuffer).metadata();
  console.log("trimmed size:", meta.width, meta.height);

  // 1. Full-res optimized logo for hero use
  await sharp(trimmedBuffer)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 92 })
    .toFile(path.join(OUT_DIR, "logo-hero.webp"));

  // 2. Header-sized logo
  await sharp(trimmedBuffer)
    .resize({ width: 560, withoutEnlargement: true })
    .webp({ quality: 92 })
    .toFile(path.join(OUT_DIR, "logo-header.webp"));

  await sharp(trimmedBuffer)
    .resize({ width: 560, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, "logo-header.png"));

  // 3. Square icon crop (the star mark only), re-trimmed and padded to a square, for favicon/app icon
  const roughStarWidth = Math.round(meta.width * 0.23);
  const roughStarCrop = await sharp(trimmedBuffer)
    .extract({ left: 0, top: 0, width: roughStarWidth, height: meta.height })
    .toBuffer();
  const starCrop = await sharp(roughStarCrop)
    .trim({ background: "#000000", threshold: 12 })
    .toBuffer();

  await sharp(starCrop)
    .resize(440, 440, { fit: "contain", background: "#000000" })
    .extend({ top: 36, bottom: 36, left: 36, right: 36, background: "#000000" })
    .png()
    .toFile(path.join(APP_DIR, "icon.png"));

  await sharp(starCrop)
    .resize(150, 150, { fit: "contain", background: "#000000" })
    .extend({ top: 15, bottom: 15, left: 15, right: 15, background: "#000000" })
    .flatten({ background: "#000000" })
    .png()
    .toFile(path.join(APP_DIR, "apple-icon.png"));

  // 4. OG image 1200x630 — dark bg with centered logo
  const ogLogo = await sharp(trimmedBuffer)
    .resize({ width: 1000, withoutEnlargement: true })
    .toBuffer();
  const ogLogoMeta = await sharp(ogLogo).metadata();

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: "#000000",
    },
  })
    .composite([
      {
        input: ogLogo,
        left: Math.round((1200 - ogLogoMeta.width) / 2),
        top: Math.round((630 - ogLogoMeta.height) / 2),
      },
    ])
    .jpeg({ quality: 88 })
    .toFile(path.join(APP_DIR, "opengraph-image.jpg"));

  console.log("Logo processing complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
