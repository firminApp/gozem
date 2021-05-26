import {inject} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {
  getModelSchemaRef,


  post,






  requestBody,
  response
} from '@loopback/rest';
import {Location} from '../models';
import {LocationRepository} from '../repositories';
import {Geocoder} from '../services';

export class LocationController {
  constructor(
    @inject('services.Geocoder') protected geoService: Geocoder,
    @repository(LocationRepository)
    public locationRepository: LocationRepository,
  ) { }

  @post('/locations')
  @response(200, {
    description: 'Location model instance',
    content: {'application/json': {schema: getModelSchemaRef(Location)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {
            title: 'NewLocation',
            exclude: ['id'],
          }),
        },
      },
    })
    location: Omit<Location, 'id'>,
  ): Promise<any> {

    let start = location.start.lat + "," + location.start.lng;
    let end = location.end.lat + "," + location.end.lng;
    let data = await this.geoService.distance(start, end, location.unit);

    console.log(data);
    location.geo = data;
    return data; //this.locationRepository.create(location);
  }

}
