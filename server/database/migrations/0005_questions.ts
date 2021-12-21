import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Questions extends BaseSchema {
  protected tableName = 'questions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });

      table.text('content').defaultTo('');
      table.string('ip');

      table.text('answer');
      table.timestamp('answered_at', { useTz: true });
      table.boolean('is_deleted').defaultTo(false);
      table.string('tweet_id');

      table.integer('user_id').references('users.id').onDelete('CASCADE');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
