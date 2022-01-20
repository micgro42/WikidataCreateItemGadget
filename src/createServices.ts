import MwWindow from './@types/MwWindow';
import ApiCore from './data-access/ApiCore';
import ApiSearchEntitiesRepository from './data-access/ApiSearchEntitiesRepository';
import ApiWritingRepository from './data-access/ApiWritingRepository';
import ServiceContainer from './ServiceContainer';

export default function createServices(mwWindow: MwWindow): ServiceContainer {
  const services = new ServiceContainer();

  const localMwApi = new mwWindow.mw.Api();
  const localApiCore = new ApiCore(localMwApi);

  services.set(
    'writingEntityRepository',
    new ApiWritingRepository(localApiCore),
  );

  services.set(
    'searchEntitiesRepository',
    new ApiSearchEntitiesRepository(localApiCore),
  );

  return services;
}
