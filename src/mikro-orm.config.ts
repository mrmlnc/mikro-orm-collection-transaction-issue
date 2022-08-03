import type { Options } from "@mikro-orm/core";
import { ChildEntity, FieldEntity } from "./entities/FieldEntity";

const options: Options = {
    type: 'better-sqlite',
    dbName: ':memory:',
    entities: [FieldEntity, ChildEntity],

    debug: Boolean(process.env.DEBUG) || false,

    allowGlobalContext: true,
};

export default options;
