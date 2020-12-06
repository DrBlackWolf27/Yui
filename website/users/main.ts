var config0 = Deno.readTextFileSync("./config.json");
const config_base = JSON.parse(config0)

import { sql_query } from "../../assets/database/query.ts";
const database_query = new sql_query()
var decoder = new TextDecoder("utf-8");

export class page_users {
  async request_analyse(url: string, token: string, config_cookie: string) {
    //Gestion des requettes
    try {
      if (config_cookie == "0") {
        var config = config_base
      } else {
        try {
          var config1_file = Deno.readTextFileSync("./config"+config_cookie+".json");
          config = JSON.parse(config1_file)
        } catch (err) {
          var config = config_base
        }
      }
    } catch (err) {
      console.log(err)
    }
    var tmp = url
    if (tmp === "/users/style.css") {
      var data = Deno.readFileSync("./website/users/style.css");
      var temp = decoder.decode(data)
      temp = temp.replace("'!-!_config.couleurs.couleur_primaire_!-!'", "#084B8A")
      return temp
    } else if(tmp === "/users/script.js"){
      var data = Deno.readFileSync("./website/users/script.js");
      return data
    } else if(tmp === "/users/map.png"){
      var data = Deno.readFileSync("./website/users/pic/map.png");
      return data
    } else if(tmp === "/users/profile.png"){
      var data = Deno.readFileSync("./website/users/pic/profile.png");
      return data
    } else if (tmp === "/users/" || tmp === "/users") {
      var data = Deno.readFileSync("./website/users/index.html");
      var temp = decoder.decode(data)
      try {
        var sql = `SELECT * FROM membres where token="${token}"` 
        var sql_tmp = await database_query.query_select(String(sql))
        temp = temp.replace('!-!_config.shop.name_!-!', config.shop.name)
        temp = temp.replace('!-!_user_pseudo_!-!', sql_tmp[0].pseudo)
        temp = temp.replace('!-!_user_grade_!-!', sql_tmp[0].grade)
        if (sql_tmp[0].grade === "admin") {
          temp = temp.replace('!-!_admin_!-!', '<a href="/admin/dashboard"><i class="fa fa-cogs"></i></a>')
        } else {
          temp = temp.replace('!-!_admin_!-!', "")
        }
        temp = temp.replace('!-!_config.shop.name_!-!', config.shop.name)
        var x = sql_tmp[0].derniereco;
        var y: number = +x;
        let date: Date = new Date(y);  
        temp = temp.replace('!-!_last_co_!-!', String(date))
      } catch (err) {
        console.log(err)
      }
      return temp
    } else {
      return '0'
    }
  }
}

