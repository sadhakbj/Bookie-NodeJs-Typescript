import { IsInt, IsNotEmpty } from "class-validator";

export class CreateBookDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsInt()
  authorId: number;

  @IsInt()
  price: number;

  @IsNotEmpty()
  category: string;
}
