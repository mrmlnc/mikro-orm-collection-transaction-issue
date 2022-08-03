import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: 'field' })
export class FieldEntity {
    @PrimaryKey({ autoincrement: true })
    id: number;

    @OneToMany(() => ChildEntity, e => e.field, {
        orphanRemoval: true,
    })
    children = new Collection<ChildEntity>(this);
}

@Entity({ tableName: 'child' })
export class ChildEntity {
    @PrimaryKey({ autoincrement: true })
    id: number;

    @ManyToOne(() => FieldEntity, { hidden: true })
    field: FieldEntity;

    @Property()
    counter: number = 0;
}
