import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public slug: string

  @column()
  public name: string

  @column()
  public biography: string

  @column()
  public picture: string

  @column()
  public twitter_id: string

  @column()
  public refresh_token: string
}
