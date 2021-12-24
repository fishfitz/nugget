import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });

      table.string('slug');
      table.string('name');
      table.text('biography');
      table.text('picture');

      table.string('twitter_id');
      table.string('refresh_token');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
