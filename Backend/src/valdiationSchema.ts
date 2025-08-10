import { z } from "zod";

export const compoundUpdateSchema = z.object({
  CompoundName: z.string().min(1, "Compound name is required").max(100),
  strImageSource: z.string().url("Must be a valid URL"),
  CompoundDescription: z.string().min(5, "Description too short"),
});
