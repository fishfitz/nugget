import { DateTime } from 'luxon';
import { BaseModel, hasOne, HasOne, column } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User)
  public user: HasOne<typeof User>
}
