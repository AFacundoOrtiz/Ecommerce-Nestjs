import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1750719415672 implements MigrationInterface {
  name = 'Init1750719415672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL DEFAULT 'https://via.placehold.co/400', "categoryId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_278a6e0f21c9db1653e6f406801" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "orderDetailId" uuid, CONSTRAINT "REL_749e30f71cc0d2d95f8546f459" UNIQUE ("orderDetailId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "phone" bigint, "country" character varying(50), "address" text, "city" character varying(50), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_details_products_products" ("orderDetailsId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_2c6c921128319f110abec51e06b" PRIMARY KEY ("orderDetailsId", "productsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_35bbcf9515eab2382bd417b385" ON "order_details_products_products" ("orderDetailsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df657e601f53f706e4b7d253c3" ON "order_details_products_products" ("productsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users_roles_roles" ("usersId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_6c1a055682c229f5a865f2080c1" PRIMARY KEY ("usersId", "rolesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON "users_roles_roles" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON "users_roles_roles" ("rolesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592" FOREIGN KEY ("orderDetailId") REFERENCES "order_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_products_products" ADD CONSTRAINT "FK_35bbcf9515eab2382bd417b385f" FOREIGN KEY ("orderDetailsId") REFERENCES "order_details"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_products_products" ADD CONSTRAINT "FK_df657e601f53f706e4b7d253c30" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_df951a64f09865171d2d7a502b1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_b2f0366aa9349789527e0c36d97" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_b2f0366aa9349789527e0c36d97"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_df951a64f09865171d2d7a502b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_products_products" DROP CONSTRAINT "FK_df657e601f53f706e4b7d253c30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details_products_products" DROP CONSTRAINT "FK_35bbcf9515eab2382bd417b385f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b2f0366aa9349789527e0c36d9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df951a64f09865171d2d7a502b"`,
    );
    await queryRunner.query(`DROP TABLE "users_roles_roles"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df657e601f53f706e4b7d253c3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_35bbcf9515eab2382bd417b385"`,
    );
    await queryRunner.query(`DROP TABLE "order_details_products_products"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "order_details"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
