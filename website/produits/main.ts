var config0 = Deno.readTextFileSync("./config.json");
const config_base = JSON.parse(config0)

import { sql_query } from "../../assets/database/query.ts";

var database_query = new sql_query();
var decoder = new TextDecoder("utf-8");

export class page_produits {
  async request_analyse(url: string, config_cookie: string) {
    //Gestion des requettes
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
    
    var tmp = url
    if (tmp.startsWith("/produits/square")) {
      if (tmp === "/produits/square/style.css") {
        var data = Deno.readFileSync("./website/produits/square/files/style.css");
        var temp = decoder.decode(data)
        temp = temp.replace("'!-!_conf.shop.couleur_prima_!-!'", config.couleurs.couleur_primaire)
        return temp
      } else if (tmp === "/produits/square/script.js") {
        var data = Deno.readFileSync("./website/produits/square/files/script.js");
        var temp = decoder.decode(data)
        return temp
      } else {
        var data = Deno.readFileSync("./website/produits/square/index.html");
        var temp = decoder.decode(data)
        //on recupère le token du produit
        url = url.replace('00=', '')
        url = url.replace(/%22/g, '')
        url = url.replace(/%27/g, '')
        url = url.replace(/"/g, '')
        url = url.replace(/'/g, '')
        url = url.replace(/:/g, '')
        url = url.replace(/;/g, '')
        url = url.replace(/%/g, '')
        url = url.replace(/\|/g, '')
        url = url.replace(/`/g, '')
        url = url.replace(/\(/g, '')
        url = url.replace(/\)/g, '')
        url = url.replace(/\[/g, '')
        url = url.replace(/\]/g, '')
        var tmp_array = url.split('?')
        console.log(tmp_array)
        //si y'a pas de produits particuler, on repond avec un random
        if (tmp_array.length === 0) {
          // produits random
          try {
            var token_product = tmp_array[1]
            var sql_final0 = await database_query.query_select("SELECT * FROM produits ORDER BY RAND() LIMIT 0, 1")
            var liste_taille = ""
            //console.log(sql_final0)
            if (sql_final0.length === 1) {
              temp = temp.replace('!-!_product_name_!-!', sql_final0[0].nom)
              temp = temp.replace(/!-!_product_description_!-!/g, sql_final0[0].description)
              temp = temp.replace('!-!_product_error_!-!', '')
              temp = temp.replace(/!-!_product_url_!-!/g, sql_final0[0].url_pic)
              temp = temp.replace(/!-!_config.shop.name_!-!/g, config.shop.name)
              var sql_final1 = await database_query.query_select("SELECT * FROM produits_vetements_tailles WHERE produits_token='" + sql_final0[0].token + "'")
              if (sql_final1.length === 1) {
                if (sql_final1[0].xs == 1) {
                  liste_taille = liste_taille + "<li>xs /</li>"
                }
                if (sql_final1[0].s == 1) {
                  liste_taille = liste_taille + "<li>s /</li>"
                }
                if (sql_final1[0].m == 1) {
                  liste_taille = liste_taille + "<li>m /</li>"
                }
                if (sql_final1[0].l == 1) {
                  liste_taille = liste_taille + "<li>l /</li>"
                }
                if (sql_final1[0].xl == 1) {
                  liste_taille = liste_taille + "<li>xl /</li>"
                }
              } else {
                liste_taille = liste_taille + "<li>Aucune taille n'est disponible :c</li>"
              }
              temp = temp.replace('!-!_liste_taille_produits_!-!', liste_taille)
            } else {
              liste_taille = liste_taille + "<li>Aucune taille n'est disponible :c</li>"
              temp = temp.replace('!-!_liste_taille_produits_!-!', liste_taille)
            }
          } catch (err) {
            console.log(err)
          }
        } else {
          //sinon on repond avec le produits
          try {
            var token_product = tmp_array[1]
            var sql_final0 = await database_query.query_select("SELECT * FROM produits WHERE token='" + token_product + "'")
            var liste_taille = ""
            if (sql_final0.length === 1) {
              temp = temp.replace('!-!_product_name_!-!', sql_final0[0].nom)
              temp = temp.replace(/!-!_product_description_!-!/g, sql_final0[0].description)
              temp = temp.replace('!-!_product_error_!-!', '')
              temp = temp.replace(/!-!_product_url_!-!/g, sql_final0[0].url_pic)
              temp = temp.replace(/!-!_config.shop.name_!-!/g, config.shop.name)
              var sql_final1 = await database_query.query_select("SELECT * FROM produits_vetements_tailles WHERE produits_token='" + token_product + "'")
              if (sql_final1.length === 1) {
                if (sql_final1[0].xs == 1) {
                  liste_taille = liste_taille + "<li>xs /</li>"
                }
                if (sql_final1[0].s == 1) {
                  liste_taille = liste_taille + "<li>s /</li>"
                }
                if (sql_final1[0].m == 1) {
                  liste_taille = liste_taille + "<li>m /</li>"
                }
                if (sql_final1[0].l == 1) {
                  liste_taille = liste_taille + "<li>l /</li>"
                }
                if (sql_final1[0].xl == 1) {
                  liste_taille = liste_taille + "<li>xl /</li>"
                }
              } else {
                liste_taille = liste_taille + "<li>Aucune taille n'est disponible :c</li>"
              }
              temp = temp.replace('!-!_liste_taille_produits_!-!', liste_taille)
            } else {
              try {
                var token_product = tmp_array[1]
                var sql_final0 = await database_query.query_select("SELECT * FROM produits ORDER BY RAND() LIMIT 0, 1")
                var liste_taille = ""
                if (sql_final0.length === 1) {
                  temp = temp.replace('!-!_product_name_!-!', sql_final0[0].nom)
                  temp = temp.replace(/!-!_product_description_!-!/g, sql_final0[0].description)
                  temp = temp.replace('!-!_product_error_!-!', '')
                  temp = temp.replace(/!-!_product_url_!-!/g, sql_final0[0].url_pic)
                  temp = temp.replace(/!-!_config.shop.name_!-!/g, config.shop.name)
                  var sql_final1 = await database_query.query_select("SELECT * FROM produits_vetements_tailles WHERE produits_token='" + sql_final0[0].token + "'")
                  if (sql_final1.length === 1) {
                    if (sql_final1[0].xs == 1) {
                      liste_taille = liste_taille + "<li>xs /</li>"
                    }
                    if (sql_final1[0].s == 1) {
                      liste_taille = liste_taille + "<li>s /</li>"
                    }
                    if (sql_final1[0].m == 1) {
                      liste_taille = liste_taille + "<li>m /</li>"
                    }
                    if (sql_final1[0].l == 1) {
                      liste_taille = liste_taille + "<li>l /</li>"
                    }
                    if (sql_final1[0].xl == 1) {
                      liste_taille = liste_taille + "<li>xl /</li>"
                    }
                  } else {
                    liste_taille = liste_taille + "<li>Aucune taille n'est disponible :c</li>"
                  }
                  temp = temp.replace('!-!_liste_taille_produits_!-!', liste_taille)
                } else {
                  liste_taille = liste_taille + "<li>Aucune taille n'est disponible :c</li>"
                  temp = temp.replace('!-!_liste_taille_produits_!-!', liste_taille)
                }
              } catch (err) {
                console.log(err)
              }
            }
          } catch (err) {
            console.log(err)
          }
        }
        temp = temp.replace('!-!_add_product_!-!', '/liste_produit/panier/add_product?' + sql_final0[0].token)
        return temp
      }
    } else if (tmp.startsWith("/produits/check")){ 
      if (tmp === "/produits/check/style.css") {
        var data = Deno.readFileSync("./website/produits/prepa/style.css");
        var temp = decoder.decode(data)
        return temp
      } else {
        var data = Deno.readFileSync("./website/produits/prepa/index.html");
        var temp = decoder.decode(data)
        var code = tmp.split('?')
        var code_final = code[1]
        temp = temp.replace('!-!_num_comand_!-!', code_final)
        return temp
      }
    } else {
      if (tmp === "/404/style.css") {
        var data = Deno.readFileSync("./website/404/style.css");
        var temp = decoder.decode(data)
      } else {
        var data = Deno.readFileSync("./website/404/index.html");
        var temp = decoder.decode(data)
      }
      return temp
    }
  }
}