
export interface SchemaResponseType {
    schema_metadata:
    {
        schema_name: string,
        table_comment: string
    }
}; 

export interface TableResponseType {
    table_metadata:
    {
        table_name: string,
        table_comment: string
        columns: Array<ColumnResponseType>
    }
};

export interface ColumnResponseType {
    column_name: string,
    data_type: string,
    character_maximum_length: string | null,
    is_nullable: string,
    column_default: string | null,
    user_defined_type: string,
    column_comment: string | null,
    constraints: Array<ColumnConstraintResponseType>|null,
    foreign_keys: Array<ForeignKeyResponseType>| null
}

export interface ColumnConstraintResponseType {
    constraint_type: string,
    constraint_name: string
}

export interface ForeignKeyResponseType {
    foreign_key_name: string | null,
    foreign_table_name: string | null,
    foreign_column_name: string | null,
}

export interface TableAttribute {
    name: string,
    type: string
}

export interface Table {
    name: string,
    attributes: Array<TableAttribute>
}

export interface Schema {
    name: string,
    description: string,
}

export interface Database {
    name: string,
}


export type DBElement = Database | Schema | Table | TableAttribute;