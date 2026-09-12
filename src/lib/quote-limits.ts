export const quoteFieldLimits = {
  name: 80,
  phone: 32,
  email: 120,
  brand: 40,
  model: 60,
  year: 4,
  mileage: 10,
  fuelType: 30,
  plate: 20,
  notes: 800,
  defects: 800,
} as const;

export const quotePhotoLimits = {
  maxCount: 7,
  maxSizePerFile: 5 * 1024 * 1024,
  maxTotalSize: 20 * 1024 * 1024,
  acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
} as const;
