import { Book } from "@/entities/Book"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("authors")
export class Author {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  email: string

  @OneToMany((type) => Book, (book) => book.author)
  books: Book[]

  @Column({ nullable: true })
  bio: string

  @Column({ nullable: true })
  image: string

  @CreateDateColumn({
    type: "timestamp",
  })
  public createdAt: Date

  @UpdateDateColumn({
    type: "timestamp",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updatedAt: Date
}
