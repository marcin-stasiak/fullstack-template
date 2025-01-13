import { ObjectType, Field } from '@nestjs/graphql';

import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEndpointEntity } from '../../../common/entities/base-endpoint.entity';
import { Gender } from '../../../common/enums/gender.enum';
import { Entry } from '../../entries/entities/entry.entity';

@ObjectType()
@Entity('users')
export class User extends BaseEndpointEntity {
  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', select: false, unique: true })
  public email: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', select: false })
  public password: string;

  @Field(() => Gender)
  @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
  public gender: Gender;

  @Field(() => [Entry])
  @ManyToOne(() => Entry, (entry) => entry.author)
  public entries: Entry[];
}