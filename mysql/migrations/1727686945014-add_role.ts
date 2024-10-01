import {MigrationInterface, QueryRunner} from "typeorm";

export class addRole1727686945014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `policies` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `parent_id` int DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query(`CREATE TABLE role_policies (
            policy_id INT NOT NULL,
            role_id INT NOT NULL,
            PRIMARY KEY (role_id,policy_id),
            INDEX (policy_id),
            FOREIGN KEY (role_id) REFERENCES roles (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
            FOREIGN KEY (policy_id) REFERENCES policies (id)
                ON DELETE CASCADE
                ON UPDATE CASCADE,
        ) ENGINE=InnoDB;`);
        await queryRunner.query(`
            CREATE TABLE user_roles (
                role_id INT NOT NULL,
                user_id INT NOT NULL,
                PRIMARY KEY (role_id, user_id),
                INDEX (user_id),
                FOREIGN KEY (user_id) REFERENCES users (id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,
                FOREIGN KEY (role_id) REFERENCES roles (id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,
            ) ENGINE=InnoDB;`);
        await queryRunner.query(`INSERT INTO roles (name) VALUES ('admin')`);
        await queryRunner.query(`INSERT INTO policies (name, slug, parent_id) VALUES ('All permissions', 'all', 0)`);
        await queryRunner.query(`INSERT INTO role_policies (policy_id, role_id) VALUES (1, 1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE role_policies`);
        await queryRunner.query(`DROP TABLE policies`);
        await queryRunner.query(`DROP TABLE roles`);
        await queryRunner.query(`DROP TABLE user_roles`);
    }

}
