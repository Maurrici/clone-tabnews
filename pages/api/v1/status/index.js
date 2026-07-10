import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;
  const sql = `
    SELECT 
      current_setting('server_version') AS version,
      current_setting('max_connections')::int AS max_connections,
      (SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1) AS open_connections;
  `;

  const resultDB = await database.query({
    text: sql,
    values: [databaseName],
  });

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: resultDB.rows[0].version,
        max_connections: resultDB.rows[0].max_connections,
        opened_connections: resultDB.rows[0].open_connections,
      },
    },
  });
}

export default status;
