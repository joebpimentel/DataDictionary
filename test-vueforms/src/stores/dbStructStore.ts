import { defineStore } from 'pinia'
import { Database, DBElement } from '../types/DBTypes.js'
import { Tree } from '../types/TreeViewTypes.js'

interface Attributes {
    name: string,
    type: string
}

interface Tables {
    name: string,
    attributes: Array<Attributes>
}

interface Schema {
    name: string,
    tables: Array<Tables>
}

export const dbStructStore = defineStore('dbStructState', {
    // Estado (dados reativos)
    state: () => ({
        schemas: new Array<Schema>(),
        definitionTree: {} as Tree<DBElement>,
    }),

    // Getters (computados)
    getters: {
        getSchemas: (state) => state.schemas,
        getDefinitionTree: (state) => state.definitionTree,
    },

    // Actions (métodos)
    actions: {
        populate(schemas: Array<Schema>, dbName: string) {
            this.schemas = schemas
            this.definitionTree = new Tree<DBElement>({ name: dbName } as Database);
        },
    }
})

export type DbStructStoreType = typeof dbStructStore;