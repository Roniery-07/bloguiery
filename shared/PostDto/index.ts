import { validator, type Infer } from "../validator"

export const PostSchema = validator.object({
  title: validator.string(),
  body: validator.string(),
  createdAt: validator.date()
})

export type PostDto = Infer<typeof PostSchema>;