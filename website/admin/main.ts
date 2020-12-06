var config0 = Deno.readTextFileSync("./config.json");
const config = JSON.parse(config0)

import { sql_query } from "../../assets/database/query.ts";
var database_query = new sql_query();
var decoder = new TextDecoder("utf-8");

//recuperer le prix total d'une commande
async function get_total_price(code_commande: string, table: string) {
  var sql_com_norm = await database_query.query_select("SELECT * FROM "+table+" WHERE code_commande='"+code_commande+"'")
  var tmp_prix = 0
  for (var j = 0; j < sql_com_norm.length; j++){
    var tmpp = await database_query.query_select("SELECT prix FROM produits WHERE token='"+sql_com_norm[j].token_produits+"'")
    tmp_prix = tmp_prix + tmpp[0].prix
  }
  return tmp_prix
}

//generation de chaine aleatoire
function create_token(length: any) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export class page_admin {
  async request_analyse(url: string, cookie: string) {
    //Gestion des requettes
    try {
      //on recupère l'user
      var check_user = await database_query.query_select('SELECT * FROM cookie_to_account WHERE cookie="' + cookie + '"')
      if (check_user.length == 1) {
        //on check si il existe
        var check_user2 = await database_query.query_select('SELECT * FROM membres WHERE token="' + check_user[0].user_token + '"')
        if (check_user2.length == 1) {
          //on regarde si il est admin
          if (check_user2[0].grade === "admin") {
            if (url.startsWith('/admin/dashboard')) {
              if (url === "/admin/dashboard/style.css") {
                var data = Deno.readFileSync("./website/admin/dashboard/style.css");
                var temp = decoder.decode(data)
                return temp
              } else if (url === "/admin/dashboard/script.js") {
                var data = Deno.readFileSync("./website/admin/dashboard/script.js");
                var temp = decoder.decode(data)
                return temp
              } else {
                var data = Deno.readFileSync("./website/admin/dashboard/index.html");
                var temp = decoder.decode(data)

                //on ajoute les commandes normale
                var liste_commandes_norm = ""
                try {
                  var sql_com_norm = await database_query.query_select("SELECT DISTINCT code_commande FROM produits_commande WHERE etat=false")
                } catch (err) {
                  console.log(err)
                }
                for (var i = 0; i < sql_com_norm.length; i++) {
                  var price = await get_total_price(sql_com_norm[i].code_commande, "produits_commande")
                  liste_commandes_norm = liste_commandes_norm + "<li class='item'><div class='checkbox'><div class='check'></div></div>" +
                    "<div class='favourite'>" +
                    "<svg viewBox='0 0 19.481 19.481' x='0px' xmlns='http://www.w3.org/2000/svg' y='0px'>" +
                    "<path d='m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z'>" +
                    "</path></svg></div>" +
                    "<div class='preview'></div>" +
                    "<div class='description'>" +
                    "<div class='price'>" + price + " " + config.shop.currency + "</div>" +
                    "<div class='title'><a style='color: #000000;' href='/admin/liste?produits_commande?" + sql_com_norm[i].code_commande + "'>N°" + sql_com_norm[i].code_commande + "</a></div>" +
                    "<p>Commande normale non validé" +
                    "</p></div></li>"
                }
        
                // on ajoute les commandes type "esseillage"
                var liste_commandes_ess = ""
                try {
                  var sql_com_norm = await database_query.query_select("SELECT DISTINCT code_commande FROM produits_esseillage WHERE etat=false")
                } catch (err) {
                  console.log(err)
                }
                for (var i = 0; i < sql_com_norm.length; i++) {
                  var price = await get_total_price(sql_com_norm[i].code_commande, "produits_esseillage")
                  liste_commandes_ess = liste_commandes_ess + "<li class='item'><div class='checkbox'><div class='check'></div></div>" +
                    "<div class='favourite'>" +
                    "<svg viewBox='0 0 19.481 19.481' x='0px' xmlns='http://www.w3.org/2000/svg' y='0px'>" +
                    "<path d='m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z'>" +
                    "</path></svg></div>" +
                    "<div class='preview'></div>" +
                    "<div class='description'>" +
                    "<div class='price'>" + price + " " + config.shop.currency + "</div>" +
                    "<div class='title'><a style='color: #000000;' href='/admin/liste?produits_esseillage?" + sql_com_norm[i].code_commande + "'>N°" + sql_com_norm[i].code_commande + "</a></div>" +
                    "<p>Commande normale non validé" +
                    "</p></div></li>"
                }
        
                //on ajoute les commande click&collect
                var liste_commandes_cac = ""
                try {
                  var sql_com_norm = await database_query.query_select("SELECT DISTINCT code_commande FROM produits_cac WHERE etat=false")
                } catch (err) {
                  console.log(err)
                }

                for (var i = 0; i < sql_com_norm.length; i++) {
                  var price = await get_total_price(sql_com_norm[i].code_commande, "produits_cac")
                  var sql_com_norm0 = await database_query.query_select("SELECT date, end_time FROM produits_cac WHERE code_commande='" + sql_com_norm[i].code_commande + "' LIMIT 0, 1")
                  var final_date = new Date(+sql_com_norm0[0].date)
                  var final_date2 = new Date(+sql_com_norm0[0].end_time)
                  var aaa = final_date
                  var bbb = final_date2
                  var ccc = +aaa + +bbb
                  var final_date0 = new Date(ccc)
                  var test_date = new Date()
                  if (test_date < final_date0) {
                    var min_0 = (ccc - +test_date)/60000
                    var min_1 = String(min_0).split('.')
                    var add_date_cac = "<p style='color: blue'>il reste "+min_1[0]+" min"
                  } else {
                    var add_date_cac = "<p style='color: red'>Temp dépassé"
                  }

                  liste_commandes_cac = liste_commandes_cac + "<li class='item'><div class='checkbox'><div class='check'></div></div>" +
                    "<div class='favourite'>" +
                    "<svg viewBox='0 0 19.481 19.481' x='0px' xmlns='http://www.w3.org/2000/svg' y='0px'>" +
                    "<path d='m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z'>" +
                    "</path></svg></div>" +
                    "<div class='preview'></div>" +
                    "<div class='description'>" +
                    "<div class='price'>" + price + " " + config.shop.currency + "</div>" +
                    "<div class='title'><a style='color: #000000;' href='/admin/liste?produits_cac?" + sql_com_norm[i].code_commande + "'>N°" + sql_com_norm[i].code_commande + "</a></div>" +
                    "<p>Commande normale non validé</p>" +
                    add_date_cac+
                    "</p></div></li>"
                }
                temp = temp.replace('!-!_liste_commandes_norm_!-!', liste_commandes_norm)
                temp = temp.replace('!-!_liste_commandes_esseillage_!-!', liste_commandes_ess)
                temp = temp.replace('!-!_liste_commandes_cac_!-!', liste_commandes_cac)

                temp = temp.replace('!-!_username_!-!', check_user2[0].pseudo)
                temp = temp.replace('!-!_grade_!-!', check_user2[0].grade)

                return temp
              }
            } else if (url.startsWith('/admin/liste')) {
              //dans le ca ou on demande une commande precise
              if (url === "/admin/liste/style.css") {
                var data = Deno.readFileSync("./website/admin/liste/style.css");
                var temp = decoder.decode(data)
                return temp
              } else if (url === "/admin/liste/script.js") {
                var data = Deno.readFileSync("./website/admin/liste/script.js");
                var temp = decoder.decode(data)
                return temp
              } else {
                var data = Deno.readFileSync("./website/admin/liste/index.html");
                var temp = decoder.decode(data)
                var code_tmp = url.split('?')
                var code = code_tmp[2]
                var type = code_tmp[1]
                var liste_commandes_produits = ""
                try {
                  var sql_com_norm = await database_query.query_select("SELECT * FROM " + type + " WHERE code_commande='" + code + "'")
                } catch (err) {
                  console.log(err)
                }
                for (var i = 0; i < sql_com_norm.length; i++) {
                  var sql_com_prodouit = await database_query.query_select("SELECT * FROM produits WHERE token='" + sql_com_norm[i].token_produits + "'")
                  liste_commandes_produits = liste_commandes_produits + "<li class='item'><div class='checkbox'><div class='check'></div></div>" +
                    "<div class='favourite'>" +
                    "<svg viewBox='0 0 19.481 19.481' x='0px' xmlns='http://www.w3.org/2000/svg' y='0px'>" +
                    "<path d='m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z'>" +
                    "</path></svg></div>" +
                    "<div class='preview'></div>" +
                    "<div class='description'>" +
                    "<div class='price'>" + sql_com_prodouit[0].prix + " " + config.shop.currency + "</div>" +
                    "<div class='title'>N°" + sql_com_prodouit[0].nom + "</div>" +
                    "<p>" + sql_com_prodouit[0].description + "</p></div></li>"
                }
                temp = temp.replace('!-!_liste_item_!-!', liste_commandes_produits)
                temp = temp.replace('!-!_num_commande_!-!', code)
                temp = temp.replace('!-!_username_!-!', check_user2[0].pseudo)
                temp = temp.replace('!-!_grade_!-!', check_user2[0].grade)
                temp = temp.replace('!-!_table_name_!-!', type)
                temp = temp.replace('!-!_token_!-!', code)

                return temp
              }
            } else if (url.startsWith('/admin/finalise')) {
              var token_finalise_array = url.split('?')
              var table = token_finalise_array[1]
              var token_finalise = token_finalise_array[2]
              try {
                await database_query.query_update("UPDATE "+table+" SET etat=true WHERE code_commande='"+token_finalise+"'")
              } catch (err) {
                console.log(err)
              }
              return "<html><body><script>document.location.href='/admin/dashboard'</script></body></html>"
            } else if (url.startsWith('/admin/add_product')) {
              try {
                var tmp_array = url.split("&")
                var tmp_array_2 = tmp_array[0].split('?')
                var produit_token = create_token(25)
                var produit_name = tmp_array_2[1].replace('produit_name=', '').replace(/\+/g, ' ')
                var produit_prix = tmp_array[1].replace('produit_prix=', '')
                var produit_pic_url = tmp_array[2].replace('image=', '').replace(/%2F/g, '/')
                var produit_shop = tmp_array[3].replace('shop_produit=', '')
                var produit_descr = tmp_array[4].replace('user_bio=', '')
                var produit_type = tmp_array[5].replace('type_produit=', '')

                database_query.query_insert("INSERT INTO produits(token, nom, description, prix, type_general, type, url_pic, shop_tag)" +
                  " VALUES('"+produit_token+"','"+produit_name+"','"+produit_descr+"','"+produit_prix+"','vetements','"+produit_type+"','"+produit_pic_url+"','"+produit_shop+"')")

                var data = Deno.readFileSync("./website/admin/produit_add_ok/index.html");
                var temp = decoder.decode(data)
                
                return temp
              } catch (err) {
                console.log(err)
                return "error"
              }
              
            } else if (url.startsWith('/admin/produits_add')) {
              if (url === "/admin/produits_add") {
                var data = Deno.readFileSync("./website/admin/produits_add/index.html");
                var temp = decoder.decode(data)

                //check all shop
                var config1 = Deno.readTextFileSync("./config/host.json");
                var config_shop_1 = JSON.parse(config1)
                var tmp_list_shop=[]
                for (var i = 0; i < config_shop_1.host.length; i++){
                  if (config_shop_1.host[i].website_config_file === "default") {
                    var config2 = Deno.readTextFileSync("./config.json");
                  } else {
                    var config2 = Deno.readTextFileSync("./config"+config_shop_1.host[i].website_config_file+".json");
                  }
                  var config_shop_2 = JSON.parse(config2)
                  tmp_list_shop.push({text:config_shop_1.host[i].website_name + ' - tag:' + config_shop_2.shop.unique_tag, value: config_shop_2.shop.unique_tag })
                }
                var list_shop = ""
                for (var i = 0; i < tmp_list_shop.length; i++) {
                  list_shop += '<option value="' + tmp_list_shop[i].value+'">'+tmp_list_shop[i].text+'</option>'
                }
                temp = temp.replace('!-!_liste_shop_!-!', list_shop)
                var tmp_list_cat = []
                for (var i = 0; i < config_shop_1.host.length; i++){
                  if (config_shop_1.host[i].website_config_file === "default") {
                    var config2 = Deno.readTextFileSync("./config.json");
                  } else {
                    var config2 = Deno.readTextFileSync("./config"+config_shop_1.host[i].website_config_file+".json");
                  }
                  var config3 = JSON.parse(config2)
                  for (var j = 0; j < config3.categories.length; j++){
                    tmp_list_cat.push({text:config_shop_1.host[i].website_name + ' - Type:' +  config3.categories[j].name, value: config3.categories[j].name.toLowerCase() })
                  }
                }
                var list_type = ""
                for (var i = 0; i < tmp_list_cat.length; i++) {
                  list_type += '<option value="' + tmp_list_cat[i].value+'">'+tmp_list_cat[i].text+'</option>'
                }
                temp = temp.replace('!-!_type_produit_!-!', list_type)
              } else if (url === '/admin/produits_add/style.css') {
                var data = Deno.readFileSync("./website/admin/produits_add/style.css");
                var temp = decoder.decode(data)
              } else {
                if (url === "/404/style.css") {
                  var data = Deno.readFileSync("./website/404/style.css");
                  var temp = decoder.decode(data)
                } else {
                  var data = Deno.readFileSync("./website/404/index.html");
                  var temp = decoder.decode(data)
                }
              }
              return temp
            } else {
              if (url === "/404/style.css") {
                var data = Deno.readFileSync("./website/404/style.css");
                var temp = decoder.decode(data)
              } else {
                var data = Deno.readFileSync("./website/404/index.html");
                var temp = decoder.decode(data)
              }
              return temp
            }
          } else {
            if (url === "/404/style.css") {
              var data = Deno.readFileSync("./website/404/style.css");
              var temp = decoder.decode(data)
            } else {
              var data = Deno.readFileSync("./website/404/index.html");
              var temp = decoder.decode(data)
            }
            return temp
          }
        } else {
          if (url === "/404/style.css") {
            var data = Deno.readFileSync("./website/404/style.css");
            var temp = decoder.decode(data)
          } else {
            var data = Deno.readFileSync("./website/404/index.html");
            var temp = decoder.decode(data)
          }
          return temp
        }
      } else {
        if (url === "/404/style.css") { 
          var data = Deno.readFileSync("./website/404/style.css");
          var temp = decoder.decode(data)
        } else {
          var data = Deno.readFileSync("./website/404/index.html");
          var temp = decoder.decode(data)
        }
        return temp
      }
    } catch (err) {
      console.log(err)
      return "error"
    }
  }
}