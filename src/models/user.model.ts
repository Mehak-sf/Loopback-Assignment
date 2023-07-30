import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Customer} from './customer.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phoneNumber: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['ADMIN', 'MODERATOR', 'USER'],
    },
  })
  role: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @belongsTo(() => Customer)
  customerId: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // define navigational properties here
}

export type UserWithRelations = User & UserRelations;
