import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(/^\d{7,}$/, "Phone number must be at least 7 digits"),
  dob: z.string().min(1, "Date of Birth is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  province: z.string().min(1, "Province is required"),
  country: z.string().min(1, "Country is required"),
  profilePicture: z
    .string()
    .min(1, "Profile picture is required")
    .refine(
      (file) =>
        file.endsWith(".png") || file.startsWith("data:image/png;base64,"),
      "Only PNG files are allowed"
    ),
});
