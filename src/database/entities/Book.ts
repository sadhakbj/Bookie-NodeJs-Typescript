import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "../../constants/DBTable";
import { ImageUtil } from "../../utils/ImageUtil";
import { Author } from "./Author";

@Entity(DBTable.BOOKS)
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne((type) => Author, (author) => author.books, { eager: true })
  @JoinColumn({ name: "authorId" })
  author: Author;

  @Column({})
  authorId: number;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toPayload(): Partial<Book> {
    return {
      id: this.id,
      title: this.title,
      image: ImageUtil.prepareUrl("books", this.image),
      description: this.description,
      author: this.author.toPayload(),
      price: this.price / 100,
      category: this.category,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
