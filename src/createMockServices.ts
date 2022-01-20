import MwWindow from "./@types/MwWindow";
import ApiCore from "./data-access/ApiCore";
import ApiWritingRepository from "./data-access/ApiWritingRepository";
import WritingEntityRepository from "./data-access/WritingEntityRepository";
import Entity from "./datamodel/Entity";
import EntityRevision from "./datamodel/EntityRevision";
import ServiceContainer from "./ServiceContainer";

class MockWritingRepository implements WritingEntityRepository {
    saveEntity(entity: Entity, base?: EntityRevision, assertUser?: boolean): Promise<EntityRevision> {
        console.log(entity, base, assertUser);
        return Promise.resolve(new EntityRevision(new Entity('Q123', {}), 1));
    }
}

export default function createServices(): ServiceContainer {
    const services = new ServiceContainer();

    services.set( 'writingEntityRepository', new MockWritingRepository() );

    return services;
};