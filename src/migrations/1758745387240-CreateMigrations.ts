import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigrations1758745387240 implements MigrationInterface {
    name = 'CreateMigrations1758745387240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."unidades_status_enum" AS ENUM('DISPONIVEL', 'RESERVADO', 'VENDIDO')`);
        await queryRunner.query(`CREATE TABLE "unidades" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "empreendimento_id" uuid NOT NULL, "torre" character varying NOT NULL, "numero" character varying NOT NULL, "area_privativa" numeric(10,2) NOT NULL, "preco" numeric(12,2) NOT NULL, "status" "public"."unidades_status_enum" NOT NULL DEFAULT 'DISPONIVEL', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3e728a664b48bbd90a355065233" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "empreendimentos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "cidade" character varying NOT NULL, "uf" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bfd2c645e548c013190cee20f7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favoritos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "unidade_id" uuid NOT NULL, "favoritado_em" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_418a50757efa07b584f23a5b820" UNIQUE ("user_id", "unidade_id"), CONSTRAINT "PK_2a6a4d0119130451dc0b644590a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "unidades" ADD CONSTRAINT "FK_db514f6f841bb996e41152173eb" FOREIGN KEY ("empreendimento_id") REFERENCES "empreendimentos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favoritos" ADD CONSTRAINT "FK_10811a33b8953db49c7c9df9402" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favoritos" ADD CONSTRAINT "FK_0dc4b82ec4850165d2039f03174" FOREIGN KEY ("unidade_id") REFERENCES "unidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favoritos" DROP CONSTRAINT "FK_0dc4b82ec4850165d2039f03174"`);
        await queryRunner.query(`ALTER TABLE "favoritos" DROP CONSTRAINT "FK_10811a33b8953db49c7c9df9402"`);
        await queryRunner.query(`ALTER TABLE "unidades" DROP CONSTRAINT "FK_db514f6f841bb996e41152173eb"`);
        await queryRunner.query(`DROP TABLE "favoritos"`);
        await queryRunner.query(`DROP TABLE "empreendimentos"`);
        await queryRunner.query(`DROP TABLE "unidades"`);
        await queryRunner.query(`DROP TYPE "public"."unidades_status_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
