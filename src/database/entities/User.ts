import { hash } from "bcryptjs";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DBTable } from "../../constants/DBTable";
import { Roles } from "./../../constants/Role";

@Entity(DBTable.USERS)
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: Roles.USER })
  role: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toResponse(): Partial<User> {
    const responseUser = new User();
    responseUser.id = this.id;
    responseUser.name = this.name;
    responseUser.email = this.email;
    responseUser.role = this.role;
    responseUser.createdAt = this.createdAt;
    responseUser.updatedAt = this.updatedAt;

    return responseUser;
  }
}
