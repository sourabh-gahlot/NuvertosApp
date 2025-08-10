import { z } from "zod";

export const frontendCompoundSchema = z.object({
  CompoundName: z
    .string()
    .min(1, "Please enter a name")
    .max(100, "Name must be under 100 characters"),
  strImageSource: z
    .string()
    .min(1, "Please enter a Url")
    .url("Please enter a valid image URL"),
  CompoundDescription: z
    .string()
    .min(5, "Description should be at least 5 characters long"), // allow empty while editing
});
