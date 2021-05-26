import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'DB',
  connector: 'memory',
  localStorage: '',
  file: ''
};

@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'DB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.DB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
