import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const Validator = z.object({
  name: z.string().min(4, { message: "The course name should be a string of at least 4 characters." }),
});

export { Validator };