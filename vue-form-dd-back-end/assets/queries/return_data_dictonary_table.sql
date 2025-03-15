SELECT
    -- Informações da tabela
    c.table_name,
    pgd_table.description AS table_comment,

    -- Informações gerais da coluna
    c.column_name,
    c.data_type,
    c.character_maximum_length,
    c.is_nullable,
    c.column_default,
    c.udt_name AS user_defined_type,

    -- Comentários da coluna
    pgd_column.description AS column_comment,

    -- Informações de constraints (chaves primárias, CHECK, etc.)
    pk.constraint_type AS primary_key_constraint,
    pk.constraint_name AS primary_key_name,
    chk.constraint_type AS check_constraint,
    chk.constraint_name AS check_name,
    chk.check_clause, -- Cláusula CHECK

    -- Informações de índices
    ic.indexname AS index_name,
    ic.indexdef AS index_definition

FROM
    information_schema.columns c
    LEFT JOIN pg_catalog.pg_statio_all_tables st ON c.table_schema = st.schemaname AND c.table_name = st.relname
    LEFT JOIN pg_catalog.pg_description pgd_column ON pgd_column.objoid = st.relid AND pgd_column.objsubid = c.ordinal_position
    LEFT JOIN pg_catalog.pg_description pgd_table ON pgd_table.objoid = st.relid AND pgd_table.objsubid = 0 -- Comentário da tabela (objsubid = 0)
    LEFT JOIN pg_catalog.pg_indexes ic ON c.table_name = ic.tablename AND c.table_schema = ic.schemaname

    -- Subconsulta para PRIMARY KEY
    LEFT JOIN (
        SELECT
            kcu.table_schema,
            kcu.table_name,
            kcu.column_name,
            tc.constraint_type,
            tc.constraint_name
        FROM
            information_schema.key_column_usage kcu
            JOIN information_schema.table_constraints tc ON kcu.constraint_name = tc.constraint_name AND kcu.table_schema = tc.table_schema
        WHERE
            tc.constraint_type = 'PRIMARY KEY'
    ) pk ON c.table_schema = pk.table_schema AND c.table_name = pk.table_name AND c.column_name = pk.column_name

    -- Subconsulta para CHECK constraints
    LEFT JOIN (
        SELECT
            tc.table_schema,
            tc.table_name,
            ccu.column_name,
            tc.constraint_type,
            tc.constraint_name,
            chk.check_clause
        FROM
            information_schema.table_constraints tc
            JOIN information_schema.check_constraints chk ON tc.constraint_name = chk.constraint_name AND tc.table_schema = chk.constraint_schema
            JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name AND tc.table_schema = ccu.table_schema
        WHERE
            tc.constraint_type = 'CHECK'
    ) chk ON c.table_schema = chk.table_schema AND c.table_name = chk.table_name AND c.column_name = chk.column_name

WHERE
    c.table_schema = 'public' -- Esquema da tabela
    AND c.table_name = 'products' -- Nome da tabela
ORDER BY
    c.ordinal_position;
