SELECT nspname AS schema_name,
       CASE
           WHEN nspname LIKE 'pg_%' OR nspname = 'information_schema' THEN 'System Schema'
           ELSE 'User Schema'
       END AS schema_type
FROM pg_namespace
ORDER BY schema_type, schema_name;
