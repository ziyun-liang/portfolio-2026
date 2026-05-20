import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    role: z.string(),
    year: z.string(),
    context: z.string(),
    thumbnail: z.string(),       // path under /media/<slug>/
    order: z.number(),           // display order on index
  }),
});

export const collections = { work };
