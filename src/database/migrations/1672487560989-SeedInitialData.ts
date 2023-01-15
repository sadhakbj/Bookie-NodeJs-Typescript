import { MigrationInterface, QueryRunner } from "typeorm"

export class SeedInitialData1672487560989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT IGNORE INTO authors (id, name, email) VALUES \n" +
        "      (1, 'John Smith', 'john@example.com'), \n" +
        "      (2, 'Jane Doe', 'jane@example.com')"
    )

    await queryRunner.query(
      "INSERT IGNORE INTO books (id, title, description, price, authorId, category) VALUES \n" +
        "      (1, 'The Alchemist', 'A book about following your dreams', 10.99, 1, 'Fiction'), \n" +
        "      (2, 'The Subtle Art of Not Giving a F*ck', 'A book about learning to prioritize your values', 12.99, 2, 'Self-help')"
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM books`)
    await queryRunner.query(`DELETE FROM authors`)
  }
}
