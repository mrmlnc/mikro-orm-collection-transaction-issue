import { MikroORM } from "@mikro-orm/core";
import { FieldEntity } from "./entities/FieldEntity";
import db from './mikro-orm.config';

(async () => {
    const orm = await MikroORM.init({ ...db });

    await orm.getSchemaGenerator().refreshDatabase();

    // Creating an entity with two children
    const entity = orm.em.create(FieldEntity, {
        children: [{ counter: 1 }, { counter: 2 }]
    });

    await orm.em.persistAndFlush(entity);



    orm.em.clear();



    // Removing all children from the created entity
    const entity2 = await orm.em.findOneOrFail(FieldEntity, { id: 1 }, { populate: true });

    entity2.children.removeAll();

    await orm.em.transactional(async (em) => {
        // Works fine
        // entity2.children.removeAll();

        await em.persistAndFlush(entity2);
    });



    orm.em.clear();



    // Receiving an entity to show the problem
    const entity3 = await orm.em.findOneOrFail(FieldEntity, { id: 1 }, { populate: true });

    console.dir(entity3.children.getItems(), { colors: true });

    await orm.close();
})();
