import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const work = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    myRole: z.string().default(""),
    corePartners: z
      .array(
        z.object({
          group: z.string(),
          names: z.string(),
        }),
      )
      .default([]),
    timeframe: z.string().default(""),
    thumbnail: z.string(),       // path under /media/<slug>/
    order: z.number(),           // display order on index
  }),
});

export const collections = { work };
