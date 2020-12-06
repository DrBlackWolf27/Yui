import { Client } from "./module/mod.ts";

//On importe les conf
var config0 = Deno.readTextFileSync("./assets/database/config.json");
const config = JSON.parse(config0)

const client = await new Client().connect({
  hostname: config.hostname,
  username: config.username,
  db: config.db,
  password: config.password
});

export class sql_query {
  async query_insert(sql: string) {
    let result = await client.execute(`${sql}`);
  }
  async query_update(sql: string) {
    let result = await client.execute(`${sql}`);
  }
  async query_delete(sql: string) {
    let result = await client.execute(`${sql}`);
  }
  async query_select(sql: string) {
    let result = await client.query(`${sql}`);
    return result;
  }
}
