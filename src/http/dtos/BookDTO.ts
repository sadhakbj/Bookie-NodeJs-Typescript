import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Book } from "../../database/entities/Book";
import { IsUnique } from "../validators/IsUniqueValidator";

export class CreateBookDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsUnique(Book, "title")
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;
}

export class UpdateBookDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsUnique(Book, "title")
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;
}
