import { hash } from "bcryptjs"
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { DBTable } from "../constants/DBTable"

@Entity(DBTable.USERS)
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column()
  password: string

  @Column({ unique: true })
  email: string

  @Column()
  role: number

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12)
  }
}
