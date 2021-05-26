import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Location extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;
  @property({
    type: 'object',
    required: true,
  })
  start: object;

  @property({
    type: 'object',
    required: true,
  })
  end: object;

  @property({
    type: 'string',
    required: true,
  })
  unit: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  // describe navigational properties here
}

export type LocationWithRelations = Location & LocationRelations;
