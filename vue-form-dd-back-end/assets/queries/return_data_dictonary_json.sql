SELECT
    json_build_object(
        'table_name', c.table_name,
        'table_comment', pgd_table.description,
        'columns', json_agg(
            json_build_object(
                'column_name', c.column_name,
                'data_type', c.data_type,
                'character_maximum_length', c.character_maximum_length,
                'is_nullable', c.is_nullable,
                'column_default', c.column_default,
                'user_defined_type', c.udt_name,
                'column_comment', pgd_column.description,
                'constraints', json_build_object(
                    'constraint_type', tc.constraint_type,
                    'constraint_name', kcu.constraint_name
                ),
                'indexes', json_build_object(
                    'index_name', ic.indexname,
                    'index_definition', ic.indexdef
                ),
                'foreign_keys', json_build_object(
                    'foreign_key_name', fk.constraint_name,
                    'foreign_table_name', fk.foreign_table_name,
                    'foreign_column_name', fk.foreign_column_name
                )
            )
        )
    ) AS table_metadata
FROM
    information_schema.columns c
    LEFT JOIN pg_catalog.pg_statio_all_tables st ON c.table_schema = st.schemaname AND c.table_name = st.relname
    LEFT JOIN pg_catalog.pg_description pgd_column ON pgd_column.objoid = st.relid AND pgd_column.objsubid = c.ordinal_position
    LEFT JOIN pg_catalog.pg_description pgd_table ON pgd_table.objoid = st.relid AND pgd_table.objsubid = 0 -- Comentário da tabela (objsubid = 0)
    LEFT JOIN information_schema.key_column_usage kcu ON c.table_schema = kcu.table_schema AND c.table_name = kcu.table_name AND c.column_name = kcu.column_name
    LEFT JOIN information_schema.table_constraints tc ON kcu.constraint_name = tc.constraint_name AND kcu.table_schema = tc.table_schema
    LEFT JOIN pg_catalog.pg_indexes ic ON c.table_name = ic.tablename AND c.table_schema = ic.schemaname
    LEFT JOIN (
        SELECT
            tc.constraint_name,
            ccu.table_name AS foreign_table_name,
            ccu.column_name AS foreign_column_name
        FROM
            information_schema.table_constraints tc
            JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
        WHERE
            tc.constraint_type = 'FOREIGN KEY'
    ) fk ON c.table_name = fk.foreign_table_name AND c.column_name = fk.foreign_column_name
WHERE
    c.table_schema = 'public' -- Substitua pelo nome do esquema
    AND c.table_name IN ('products', 'users') -- Lista das tabelas desejadas
GROUP BY
    c.table_name, pgd_table.description
ORDER BY
    c.table_name;
