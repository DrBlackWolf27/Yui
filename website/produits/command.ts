var config0 = Deno.readTextFileSync("./config.json");
const config = JSON.parse(config0)

import { sql_query } from "../../assets/database/query.ts";
var database_query = new sql_query();

function create_token(length: any) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export class add_shop {
  async request_analyse(url: string, user_cookie: string) {
    //Gestion des requettes pour passer une commande
    var check_user = await database_query.query_select("SELECT * FROM cookie_to_account WHERE cookie='" + user_cookie + "'")
    if (check_user.length === 1) { 
      var liste_panier_produit = await database_query.query_select("SELECT * FROM panier WHERE user_token='" + check_user[0].user_token + "'")
      if (liste_panier_produit.length == 0) {
        return '<html><head></head><body><script>document.location.href="/users"</script></body></html>'
      } else {
        var token = create_token(13)
        if (url.startsWith('/commande/shopping')) {
          for (var i = 0; i < liste_panier_produit.length; i++){
            database_query.query_insert("INSERT INTO produits_commande(code_commande, token_produits, date, user_token) VALUE('"+token+"','"+liste_panier_produit[i].produit_token+"','"+Date.now()+"', '"+check_user[0].user_token+"')")
          }
          database_query.query_delete("DELETE from panier WHERE user_token='" + check_user[0].user_token + "'")
        } else if (url.startsWith('/commande/c&c')) {
          var timer_array = url.split('?')
          var timer =timer_array[1]
          for (var i = 0; i < liste_panier_produit.length; i++){
            database_query.query_insert("INSERT INTO produits_cac(code_commande, token_produits, date, user_token, end_time) VALUE('"+token+"','"+liste_panier_produit[i].produit_token+"','"+Date.now()+"', '"+check_user[0].user_token+"', '"+timer+"')")
          }
          database_query.query_delete("DELETE from panier WHERE user_token='" + check_user[0].user_token + "'")
        } else if (url.startsWith('/commande/shop_check')) {
          for (var i = 0; i < liste_panier_produit.length; i++){
            database_query.query_insert("INSERT INTO produits_esseillage(code_commande, token_produits, date, user_token) VALUE('"+token+"','"+liste_panier_produit[i].produit_token+"','"+Date.now()+"', '"+check_user[0].user_token+"')")
          }
          database_query.query_delete("DELETE from panier WHERE user_token='" + check_user[0].user_token + "'")
        } else {
          //no
        }
        return '<html><head></head><body><script>document.location.href="/produits/check?'+token+'"</script></body></html>'
      }
    } else {
      return '<html><head></head><body><script>document.location.href="/users"</script></body></html>'
    }
  }
}