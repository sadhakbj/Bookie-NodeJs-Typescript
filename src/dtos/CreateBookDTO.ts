import { Book } from "@/entities/Book"
import { IsUnique } from "@/validators/IsUnique"
import { IsInt, IsNotEmpty, MinLength } from "class-validator"

export class CreateBookDTO {
  id?: number

  @IsUnique(Book, "title")
  @IsNotEmpty()
  @MinLength(3)
  title: string

  @IsNotEmpty()
  description: string

  @IsInt()
  authorId: number

  @IsInt()
  price: number

  @IsNotEmpty()
  category: string
}
