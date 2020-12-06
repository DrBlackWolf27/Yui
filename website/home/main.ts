var config0_file = Deno.readTextFileSync("./config.json");
const config_base = JSON.parse(config0_file)

import { sql_query } from "../../assets/database/query.ts";
var database_query = new sql_query();
var decoder = new TextDecoder("utf-8");

export class page_home {
  async request_analyse(url: string, config_cookie: string) {
    var config
    //fichier de conf
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

    //Gestion des requettes pour la page d'acceuil
    if (url === "/home/style.css") {
      var data = Deno.readFileSync("./website/home/files/style.css");
      var temp = decoder.decode(data)
      temp = temp.replace(/'!-!_config.couleurs.couleur_primaire_!-!'/g, config.couleurs.couleur_primaire)
      temp = temp.replace(/'!-!_config.couleurs.couleur_secondaire_!-!'/g, config.couleurs.couleur_secondaire)
      return temp
    } else if (url === "/home/style2.css") {
      var data = Deno.readFileSync("./website/home/files/style2.css");
      var temp = decoder.decode(data)
      return temp
    } else if (url === "/home/script.js") {
      var data = Deno.readFileSync("./website/home/files/script.js");
      var temp = decoder.decode(data)
      temp = temp.replace(/!-!_config.page_acceuil.background_1_!-!/g, config.page_acceuil.background_1)
      temp = temp.replace(/!-!_config.page_acceuil.background_2_!-!/g, config.page_acceuil.background_2)
      temp = temp.replace(/!-!_config.page_acceuil.background_3_!-!/g, config.page_acceuil.background_3)
      temp = temp.replace(/!-!_config.page_acceuil.background_4_!-!/g, config.page_acceuil.background_4)
      return temp
    } else if (url === "/home/newsletter.jpg") {
      var data = Deno.readFileSync("./website/home/pic/newsletter.jpg");
      return data
    } else if (url === "/home/social.jpg") {
      var data = Deno.readFileSync("./website/home/pic/social.jpg");
      return data
    } else {
      var data = Deno.readFileSync("./website/home/index.html");
      var temp = decoder.decode(data)
      //Replace space
      temp = temp.replace(/!-!_config.shop.name_!-!/g, config.shop.name)
      temp = temp.replace(/!-!_config.shop.logo_!-!/g, config.shop.logo)
      temp = temp.replace(/!-!_config.page_acceuil.ville.nom_ville_!-!/g, config.page_acceuil.ville[0].nom_ville)
      temp = temp.replace(/!-!_config.page_acceuil.ville.horaire_lundi_!-!/g,config.page_acceuil.ville[0].horaire_lundi)
      temp = temp.replace(/!-!_config.page_acceuil.ville.horaire_mardi_!-!/g,config.page_acceuil.ville[0].horaire_mardi)
      temp = temp.replace(/!-!_config.page_acceuil.ville.horaire_mercredi_!-!/g,config.page_acceuil.ville[0].horaire_mercredi)
      temp = temp.replace(/!-!_config.page_acceuil.ville.horaire_jeudi_!-!/g,config.page_acceuil.ville[0].horaire_jeudi)
      temp = temp.replace(/!-!_config.page_acceuil.ville.horaire_vendredi_!-!/g,config.page_acceuil.ville[0].horaire_vendredi)
      temp = temp.replace(/!-!_config.page_acceuil.ville.horaire_samedi_!-!/g,config.page_acceuil.ville[0].horaire_samedi)
      temp = temp.replace(/!-!_config.page_acceuil.ville.horaire_dimanche_!-!/g,config.page_acceuil.ville[0].horaire_dimanche)
      if (config.page_acceuil.ville[0].click_and_collect === true) {
        temp = temp.replace(/!-!_config.page_acceuil.ville.click_and_collect_!-!/g, '<a class="btn-buy" href="/liste_produit/norm">Produits Disponibles</a>')
      } else {
        temp = temp.replace(/!-!_config.page_acceuil.ville.click_and_collect_!-!/g, '')
      }
      temp = temp.replace(/!-!_config.categories0.name_!-!/g, config.categories[0].name)
      temp = temp.replace(/!-!_config.categories1.name_!-!/g, config.categories[1].name)
      temp = temp.replace(/!-!_config.categories2.name_!-!/g, config.categories[2].name)
      temp = temp.replace(/!-!_config.categories0.background_url_!-!/g, config.categories[0].background_url)
      temp = temp.replace(/!-!_config.categories1.background_url_!-!/g, config.categories[1].background_url)
      temp = temp.replace(/!-!_config.categories2.background_url_!-!/g, config.categories[2].background_url)
      //last produits
      try {
        var list_last_art = await database_query.query_select("SELECT * FROM produits ORDER BY id DESC LIMIT 0, 10")
        var url_html = ""
        for (var i = 0; i < list_last_art.length; i++){
          url_html = url_html + "<li><article><p>"+list_last_art[i].nom+"</p></article></li>"
        }
        temp = temp.replace('!-!_liste_produit_!-!', url_html)
      } catch (err) {
        console.log(err)
      }
      return temp
    }
  }
}