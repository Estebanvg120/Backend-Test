import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1721174921225 implements MigrationInterface {
    name = 'SchemaUpdate1721174921225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "quantityProduct" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_fd965536176f304a7dd64937165" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_fd965536176f304a7dd64937165"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "quantityProduct"`);
    }

}
