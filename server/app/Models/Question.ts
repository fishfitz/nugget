import { DateTime } from 'luxon';
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import User from 'App/Models/User';

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public content: string

  @column()
  public userId: number

  @column()
  public tweetId: string

  @column()
  public ip: string

  @column()
  public answer: string

  @column()
  public isDeleted: boolean

  @column.dateTime()
  public answeredAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
