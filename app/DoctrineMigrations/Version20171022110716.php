<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171022110716 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE ext_log_entries_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE user_rate_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE playlist_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE stream_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE source_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE Comments_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE song_rate_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE song_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE ext_translations (id SERIAL NOT NULL, locale VARCHAR(8) NOT NULL, object_class VARCHAR(255) NOT NULL, field VARCHAR(32) NOT NULL, foreign_key VARCHAR(64) NOT NULL, content TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX translations_lookup_idx ON ext_translations (locale, object_class, foreign_key)');
        $this->addSql('CREATE UNIQUE INDEX lookup_unique_idx ON ext_translations (locale, object_class, field, foreign_key)');
        $this->addSql('CREATE TABLE ext_log_entries (id INT NOT NULL, action VARCHAR(8) NOT NULL, logged_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, object_id VARCHAR(64) DEFAULT NULL, object_class VARCHAR(255) NOT NULL, version INT NOT NULL, data TEXT DEFAULT NULL, username VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX log_class_lookup_idx ON ext_log_entries (object_class)');
        $this->addSql('CREATE INDEX log_date_lookup_idx ON ext_log_entries (logged_at)');
        $this->addSql('CREATE INDEX log_user_lookup_idx ON ext_log_entries (username)');
        $this->addSql('CREATE INDEX log_version_lookup_idx ON ext_log_entries (object_id, object_class, version)');
        $this->addSql('COMMENT ON COLUMN ext_log_entries.data IS \'(DC2Type:array)\'');
        $this->addSql('CREATE TABLE user_rate (id INT NOT NULL, ownerUser VARCHAR(255) NOT NULL, trgetUser VARCHAR(255) NOT NULL, text VARCHAR(255) DEFAULT NULL, rank INT DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, isEnabled BOOLEAN NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, created_by VARCHAR(255) DEFAULT NULL, updated_by VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE playlist (id INT NOT NULL, source_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, title VARCHAR(255) DEFAULT NULL, isEnabled BOOLEAN NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, created_by VARCHAR(255) DEFAULT NULL, updated_by VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D782112D953C1C61 ON playlist (source_id)');
        $this->addSql('CREATE TABLE playlist_song (playlist_id INT NOT NULL, song_id INT NOT NULL, PRIMARY KEY(playlist_id, song_id))');
        $this->addSql('CREATE INDEX IDX_93F4D9C36BBD148 ON playlist_song (playlist_id)');
        $this->addSql('CREATE INDEX IDX_93F4D9C3A0BDB2F3 ON playlist_song (song_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, username VARCHAR(180) NOT NULL, username_canonical VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, email_canonical VARCHAR(180) NOT NULL, enabled BOOLEAN NOT NULL, salt VARCHAR(255) DEFAULT NULL, password VARCHAR(255) NOT NULL, last_login TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, confirmation_token VARCHAR(180) DEFAULT NULL, password_requested_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, roles TEXT NOT NULL, vkontakte_id VARCHAR(255) DEFAULT NULL, vkontakte_access_token VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D64992FC23A8 ON "user" (username_canonical)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649A0D96FBF ON "user" (email_canonical)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649C05FB297 ON "user" (confirmation_token)');
        $this->addSql('COMMENT ON COLUMN "user".roles IS \'(DC2Type:array)\'');
        $this->addSql('CREATE TABLE stream (id INT NOT NULL, source_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, bitrate SMALLINT DEFAULT NULL, stat VARCHAR(255) DEFAULT NULL, url VARCHAR(512) NOT NULL, isEnabled BOOLEAN NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, created_by VARCHAR(255) DEFAULT NULL, updated_by VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_F0E9BE1C953C1C61 ON stream (source_id)');
        $this->addSql('CREATE TABLE source (id INT NOT NULL, humanId VARCHAR(32) NOT NULL, ip inet DEFAULT NULL, port SMALLINT DEFAULT NULL, login VARCHAR(255) DEFAULT NULL, password VARCHAR(512) DEFAULT NULL, type VARCHAR(255) NOT NULL, title VARCHAR(255) DEFAULT NULL, isEnabled BOOLEAN NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, created_by VARCHAR(255) DEFAULT NULL, updated_by VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5F8A7F73B5CFD533 ON source (humanId)');
        $this->addSql('COMMENT ON COLUMN source.ip IS \'(DC2Type:inet)\'');
        $this->addSql('CREATE TABLE Comments (id INT NOT NULL, owner_user_id INT DEFAULT NULL, target_source_id INT DEFAULT NULL, target_song_id INT DEFAULT NULL, type VARCHAR(128) NOT NULL, text TEXT NOT NULL, ip inet DEFAULT NULL, rate INT NOT NULL, legacy_user_name VARCHAR(255) DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, isEnabled BOOLEAN NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, created_by VARCHAR(255) DEFAULT NULL, updated_by VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_A6E8F47C2B18554A ON Comments (owner_user_id)');
        $this->addSql('CREATE INDEX IDX_A6E8F47CA1886E4D ON Comments (target_source_id)');
        $this->addSql('CREATE INDEX IDX_A6E8F47C6BD50B98 ON Comments (target_song_id)');
        $this->addSql('COMMENT ON COLUMN Comments.ip IS \'(DC2Type:inet)\'');
        $this->addSql('CREATE TABLE song_rate (id INT NOT NULL, owner_user_id INT DEFAULT NULL, song_id INT DEFAULT NULL, sign INT DEFAULT NULL, value SMALLINT DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, isEnabled BOOLEAN NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, created_by VARCHAR(255) DEFAULT NULL, updated_by VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_AC7FE9CC2B18554A ON song_rate (owner_user_id)');
        $this->addSql('CREATE INDEX IDX_AC7FE9CCA0BDB2F3 ON song_rate (song_id)');
        $this->addSql('CREATE TABLE song (id INT NOT NULL, hash VARCHAR(255) NOT NULL, tags TEXT[] DEFAULT NULL, title VARCHAR(255) DEFAULT NULL, isEnabled BOOLEAN NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, created_by VARCHAR(255) DEFAULT NULL, updated_by VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_33EDEEA1D1B862B8 ON song (hash)');
        $this->addSql('COMMENT ON COLUMN song.tags IS \'(DC2Type:text_array)\'');
        $this->addSql('ALTER TABLE playlist ADD CONSTRAINT FK_D782112D953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE playlist_song ADD CONSTRAINT FK_93F4D9C36BBD148 FOREIGN KEY (playlist_id) REFERENCES playlist (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE playlist_song ADD CONSTRAINT FK_93F4D9C3A0BDB2F3 FOREIGN KEY (song_id) REFERENCES song (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE stream ADD CONSTRAINT FK_F0E9BE1C953C1C61 FOREIGN KEY (source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE Comments ADD CONSTRAINT FK_A6E8F47C2B18554A FOREIGN KEY (owner_user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE Comments ADD CONSTRAINT FK_A6E8F47CA1886E4D FOREIGN KEY (target_source_id) REFERENCES source (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE Comments ADD CONSTRAINT FK_A6E8F47C6BD50B98 FOREIGN KEY (target_song_id) REFERENCES song (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE song_rate ADD CONSTRAINT FK_AC7FE9CC2B18554A FOREIGN KEY (owner_user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE song_rate ADD CONSTRAINT FK_AC7FE9CCA0BDB2F3 FOREIGN KEY (song_id) REFERENCES song (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE playlist_song DROP CONSTRAINT FK_93F4D9C36BBD148');
        $this->addSql('ALTER TABLE Comments DROP CONSTRAINT FK_A6E8F47C2B18554A');
        $this->addSql('ALTER TABLE song_rate DROP CONSTRAINT FK_AC7FE9CC2B18554A');
        $this->addSql('ALTER TABLE playlist DROP CONSTRAINT FK_D782112D953C1C61');
        $this->addSql('ALTER TABLE stream DROP CONSTRAINT FK_F0E9BE1C953C1C61');
        $this->addSql('ALTER TABLE Comments DROP CONSTRAINT FK_A6E8F47CA1886E4D');
        $this->addSql('ALTER TABLE playlist_song DROP CONSTRAINT FK_93F4D9C3A0BDB2F3');
        $this->addSql('ALTER TABLE Comments DROP CONSTRAINT FK_A6E8F47C6BD50B98');
        $this->addSql('ALTER TABLE song_rate DROP CONSTRAINT FK_AC7FE9CCA0BDB2F3');
        $this->addSql('DROP SEQUENCE ext_log_entries_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE user_rate_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE playlist_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('DROP SEQUENCE stream_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE source_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE Comments_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE song_rate_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE song_id_seq CASCADE');
        $this->addSql('DROP TABLE ext_translations');
        $this->addSql('DROP TABLE ext_log_entries');
        $this->addSql('DROP TABLE user_rate');
        $this->addSql('DROP TABLE playlist');
        $this->addSql('DROP TABLE playlist_song');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('DROP TABLE stream');
        $this->addSql('DROP TABLE source');
        $this->addSql('DROP TABLE Comments');
        $this->addSql('DROP TABLE song_rate');
        $this->addSql('DROP TABLE song');
    }
}
