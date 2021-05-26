import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {GeocoderDataSource} from '../datasources';

// Add the following interface
export interface GeoPoint {
  /**
   * latitude
   */
  y: number;

  /**
   * longitude
   */
  x: number;
}

export interface Geocoder {
  // Add the following property
  geocode(address: any): Promise<GeoPoint[]>;
  reverse(latlng: string): Promise<GeoPoint[]>;
  distance(origins: string, destinations: string, units: string): Promise<GeoPoint[]>;
}
export class GeocoderProvider implements Provider<Geocoder> {
  constructor(
    // geocoder must match the name property in the datasource json file
    @inject('datasources.geocoder')
    protected dataSource: GeocoderDataSource = new GeocoderDataSource(),
  ) { }

  value(): Promise<Geocoder> {
    return getService(this.dataSource);
  }
}
