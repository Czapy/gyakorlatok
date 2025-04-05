import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const tasks = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tasks" }),
  schema: z.object({
    title: z.string(),
    suggestion: z.string().nullable().optional(),
    type: z.array(z.string()).nullable().optional(),
    age_group: z.array(z.string()),
    time_req: z.string(),
    space_req: z.string(),
    tool_req: z.string().nullable().optional(),
    keywords: z.array(z.string()),
    attachment: z.string().nullable().optional(),
  }),
});

export const collections = {
  tasks,
};
