import { MigrationInterface, QueryRunner } from "typeorm";
import { Roles } from "../../constants/Role";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export class SeedAdminUser1674889592746 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repo = AppDataSource.getRepository(User);
    const userData = new User();
    userData.email = "admin@bookie.local";
    userData.name = "Admin user";
    userData.role = Roles.ADMIN;
    userData.password = "password123";

    const user = repo.create(userData);
    await repo.save(user);
    console.info("Done....");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOneBy({
      email: "admin@bookie.local",
    });
    if (user) {
      await repo.remove(user);
    }
  }
}
