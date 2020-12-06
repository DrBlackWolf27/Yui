var config0 = Deno.readTextFileSync("./config.json");
const config_base = JSON.parse(config0)

import { sha512 } from "https://denopkg.com/chiefbiiko/sha512/mod.ts";
import { sql_query } from "../../assets/database/query.ts";
var database_query = new sql_query();
var decoder = new TextDecoder("utf-8");

export class page_liste_produit {
  async request_analyse(url: string, user_token: string, config_cookie: string) {
    //gestion des produits norm et de l'ajout au panier
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

    if (url.startsWith('/liste_produit/norm')) {
      if (url === "/liste_produit/norm/files/style.css") {
        var data = Deno.readFileSync("./website/liste_produit/norm/files/style.css");
        var temp = decoder.decode(data)
        return temp
      } else if (url === "/liste_produit/norm/files/script.js") {
        var data = Deno.readFileSync("./website/liste_produit/norm/files/script.js");
        var temp = decoder.decode(data)
        return temp
      } else if (url === "/liste_produit/norm/pic/sry.png") {
        var data = Deno.readFileSync("./website//liste_produit/norm/pic/sry.png");
        return data
      } else if (url === "/liste_produit/norm/pic/sry1.jpg") {
        var data = Deno.readFileSync("./website//liste_produit/norm/pic/sry1.jpg");
        return data
      } else {
        var data = Deno.readFileSync("./website/liste_produit/norm/index.html");
        var temp = decoder.decode(data)
        temp = temp.replace('!-!_liste_produits.titre_!-!', config.liste_produits.titre)
        temp = temp.replace('!-!_liste_produits.titre2_!-!', config.liste_produits.eme2_titre)
        temp = temp.replace('!-!_liste_produits.description_!-!', config.liste_produits.paragraphe_1)
        var tmp2_titre;
        var tmp2_content;
        var tmp3="";

        //on rajoute les filtre de la config
        try {
          var maquette_filtre_titre = '<h1 class="filter-item-inner-heading">{titre_filtre}</h1>'
          var maquette_filtre_filtre = '<li class="filter-attribute-item">' +
            '<input type="checkbox" name="database_elem_{filtre_type}_{value}" id="colour-attribute-1"class="filter-attribute-checkbox ib-m"> ' +
            '<label for="colour-attribute-1" class="filter-attribute-label ib-m">{name_filtre}</label></li>'
          for (var i = 0; i < config.liste_produits.filtres.length; i++){
            tmp3 = tmp3+'<li class="filter-item"><section class="filter-item-inner">'
            tmp2_titre = maquette_filtre_titre.replace('{titre_filtre}', config.liste_produits.filtres[i].categorie_name)
            tmp3 = tmp3+tmp2_titre
            tmp3 = tmp3+'<ul class="filter-attribute-list ul-reset"><div class="filter-attribute-list-inner">'
            for (var j = 0; j < config.liste_produits.filtres[i].liste.length; j++){
              tmp2_content = maquette_filtre_filtre.replace('{name_filtre}', config.liste_produits.filtres[i].liste[j].name)
              tmp2_content = tmp2_content.replace('{filtre_type}', config.liste_produits.filtres[i].liste[j].type)
              tmp2_content = tmp2_content.replace('{value}', config.liste_produits.filtres[i].liste[j].name.toLowerCase())
              tmp3 = tmp3+tmp2_content
            } 
            tmp3 = tmp3+'</div></ul></section></li>'
          }
          temp = temp.replace('!-!_filtres_!-!', tmp3)
        } catch (err) {
          console.log(err)
        }
        //Footer page, avec les 4 col dans le fichier config.json
        try {
          temp = temp.replace('!-!_footer_col1_!-!', config.liste_produits.footer_page.colone1.name)
          var tmp_foot_col = ""
          var tmp_lien;
          for (var i = 0; i < config.liste_produits.footer_page.colone1.liste_lien.length; i++){
            tmp_lien = '<ul class="footer-navigation ul-reset"><li class="footer-navigation-item" ><a href="' +
              config.liste_produits.footer_page.colone1.liste_lien[i].lien
              +'" class="footer-navigation-link" > ' +
              config.liste_produits.footer_page.colone1.liste_lien[i].afficher
              +'</a></li></ul>'
            tmp_foot_col = tmp_foot_col+tmp_lien
          }
          temp = temp.replace('!-!_footer_col1_content_!-!', tmp_foot_col)
        } catch (err) {
          console.log(err)
        }
        try {
          temp = temp.replace('!-!_footer_col2_!-!', config.liste_produits.footer_page.colone2.name)
          var tmp_foot_col = ""
          var tmp_lien;
          for (var i = 0; i < config.liste_produits.footer_page.colone2.liste_lien.length; i++){
            tmp_lien = '<ul class="footer-navigation ul-reset"><li class="footer-navigation-item" ><a href="' +
              config.liste_produits.footer_page.colone2.liste_lien[i].lien
              +'" class="footer-navigation-link" > ' +
              config.liste_produits.footer_page.colone2.liste_lien[i].afficher
              +'</a></li></ul>'
            tmp_foot_col = tmp_foot_col+tmp_lien
          }
          temp = temp.replace('!-!_footer_col2_content_!-!', tmp_foot_col)
        } catch (err) {
          console.log(err)
        }
        try {
          temp = temp.replace('!-!_footer_col3_!-!', config.liste_produits.footer_page.colone3.name)
          var tmp_foot_col = ""
          var tmp_lien;
          for (var i = 0; i < config.liste_produits.footer_page.colone3.liste_lien.length; i++){
            tmp_lien = '<ul class="footer-navigation ul-reset"><li class="footer-navigation-item" ><a href="' +
              config.liste_produits.footer_page.colone3.liste_lien[i].lien
              +'" class="footer-navigation-link" > ' +
              config.liste_produits.footer_page.colone3.liste_lien[i].afficher
              +'</a></li></ul>'
            tmp_foot_col = tmp_foot_col+tmp_lien
          }
          temp = temp.replace('!-!_footer_col3_content_!-!', tmp_foot_col)
        } catch (err) {
          console.log(err)
        }
        try {
          temp = temp.replace('!-!_footer_col4_!-!', config.liste_produits.footer_page.colone4.name)
          var tmp_foot_col = ""
          var tmp_lien;
          for (var i = 0; i < config.liste_produits.footer_page.colone4.liste_lien.length; i++){
            tmp_lien = '<ul class="footer-navigation ul-reset"><li class="footer-navigation-item" ><a href="' +
              config.liste_produits.footer_page.colone4.liste_lien[i].lien
              +'" class="footer-navigation-link" > ' +
              config.liste_produits.footer_page.colone4.liste_lien[i].afficher
              +'</a></li></ul>'
            tmp_foot_col = tmp_foot_col+tmp_lien
          }
          temp = temp.replace('!-!_footer_col4_content_!-!', tmp_foot_col)
        } catch (err) {
          console.log(err)
        }
        
        //mise en place des produits recherchés
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
        var tmp_produits = "";

        //save la recherche
        if (tmp_array[1] === undefined) {
        } else {
          try {
            if (tmp_array[1].length > 2) {
              await database_query.query_insert('INSERT INTO historique_de_recherche(recherche, recherche_sha512) values("'+tmp_array[1]+'","'+ sha512(tmp_array[1], "utf8", "hex")+'")')
            }
          } catch (err) {
            console.log(err)
          }
        }
        
        if (tmp_array.length == 1) {
          //page home sans recherche
          try {
            var sql_final = await database_query.query_select("SELECT * FROM produits WHERE shop_tag='"+config.shop.unique_tag+"' ORDER BY RAND() LIMIT 0, 16;")
            for (var i = 0; i < sql_final.length; i++){
              tmp_produits=tmp_produits+'<li class="product-item ib"><section class="product-item-inner" >'+
                '<img src="'+sql_final[i].url_pic+'" >'+
                '<h1 class="product-title" > <a href="/produits/square?'+sql_final[i].token+'" class="product-title-link" >'+
                sql_final[i].nom
                +'</a></h1> <div class="product-price" >'+
                  sql_final[i].prix+' '+config.shop.currency+
                '</div><form action="/produits/square" method="get">' +'<input type="text" style="display: none;"name="00" value="' + sql_final[i].token + '">'+
                '<input type="submit" value="Voir le produit" class="product-add-to-cart"></form></section></li>'
            }
          } catch (err) {
            console.log(err)
          }
          temp = temp.replace('!-!_sql_produits_infos_!-!', tmp_produits)
        } else {
          //page filtré; avec recherche en cour
          var easter_eag = 0;
          var tmp_array = tmp_array[1].split('&')
          var temp_value_sql2 = "SELECT * FROM produits WHERE shop_tag='"+config.shop.unique_tag+"'  {token} AND nom LIKE '%{search}%' ORDER BY RAND() LIMIT 0, 16;";
          var sql_the_big_one = "SELECT * FROM {table} WHERE shop_tag='"+config.shop.unique_tag+"'  "
          var sql_the_big_one0 = "SELECT * FROM {table} WHERE shop_tag='"+config.shop.unique_tag+"'  "

          //constitution de la requette sql
          for (var i = 0; i < tmp_array.length; i++){
            if (tmp_array[i].startsWith('search')) {
              if (tmp_array[i] === "search=") {
                temp_value_sql2 = temp_value_sql2.replace(" AND nom LIKE '%{search}%'", '')
              } else {
                var ttmp = tmp_array[i].split('=')
                var ttmp2 = ttmp[1]
                temp_value_sql2 = temp_value_sql2.replace('{search}', ttmp2)
                if (ttmp2 === "1234") {
                  easter_eag = 1
                }
              }
            } else {
              var tmp3 = tmp_array[i].replace('database_elem_', '')
              var tmp3_array = tmp3.split('_')
              var last_element = tmp3_array[tmp3_array.length - 1]
              tmp3 = tmp3.replace('_' + last_element, '')
              var last_element_array = last_element.split('=')


              tmp3_array = tmp3.split('=')
              tmp3 = tmp3_array[0]

              sql_the_big_one = sql_the_big_one.replace('{table}', tmp3)
              sql_the_big_one = sql_the_big_one+" OR "+last_element_array[0]+"=1 "

            }
          }

          //contitution requette sql 2
          if (sql_the_big_one === sql_the_big_one0) {
            temp_value_sql2 = temp_value_sql2.replace("token='0' {token} AND", '')
          } else {
            try {
              var sql_final0 = await database_query.query_select(sql_the_big_one)
              var tmp_token = []
              for (var i = 0; i < sql_final0.length; i++){
                tmp_token.push(sql_final0[i].produits_token)
              }
              var tmp_text = "";
              for (var i = 0; i < tmp_token.length; i++){
                tmp_text = tmp_text + " OR token='"+tmp_token[i]+"'"
              }
              temp_value_sql2 = temp_value_sql2.replace('{token}', tmp_text)
            } catch (err) {
              console.log(err)
            }
          }
          
          try {
            var sql_final = await database_query.query_select(temp_value_sql2)
            if (sql_final.length == 0) {
              // c'est apres 8h00 de dev que on c'est lancé
              if (easter_eag == 1) {
                tmp_produits=tmp_produits+'<li class="product-item ib"><section class="product-item-inner" >'+
              '<img src="/liste_produit/norm/pic/sry1.jpg" >'+
              '<h1 class="product-title" > <a href="#" class="product-title-link" >'+
                '"Nous somme une équipe serieuse"'
              +'</a></h1> <input type="submit" value="PTDR" class="product-add-to-cart"></section></li>'
              } else {
                tmp_produits=tmp_produits+'<li class="product-item ib"><section class="product-item-inner" >'+
              '<img src="/liste_produit/norm/pic/sry.png" >'+
              '<h1 class="product-title" > <a href="#" class="product-title-link" >'+
                'Pas de produits'
              +'</a></h1> <input type="submit" value="Sorry" class="product-add-to-cart"></section></li>'
              }
            } else {
              for (var i = 0; i < sql_final.length; i++){
                tmp_produits=tmp_produits+'<li class="product-item ib"><section class="product-item-inner" >'+
                '<img src="'+sql_final[i].url_pic+'" >'+
                '<h1 class="product-title" > <a href="/produits/square?'+sql_final[i].token+'" class="product-title-link" >'+
                sql_final[i].nom
                +'</a></h1> <div class="product-price" >'+
                  sql_final[i].prix+' '+config.shop.currency+
                '</div><form action="/produits/square" method="get">' +'<input type="text" style="display: none;"name="00" value="' + sql_final[i].token + '">'+
                '<input type="submit" value="Voir le produit" class="product-add-to-cart"></form></section></li>'
              }
            }
          } catch (err) {
            console.log(err)
          }
          temp = temp.replace('!-!_sql_produits_infos_!-!', tmp_produits)
        }
        return temp
      }
    } else if (url.startsWith('/liste_produit/panier')) {
      if (url.startsWith('/liste_produit/panier/add_product')) { 
        //ajout d'un produits au panier
        var tmp_link_array = url.split('?')
        if (tmp_link_array.length === 2) {
          var produits_token = tmp_link_array[1]
          //on check l'utilsateur
          var check_user = await database_query.query_select("SELECT * FROM cookie_to_account WHERE cookie='" + user_token + "'")
          if (check_user.length === 1) {
            //on check le produits: 
            var check_product = await database_query.query_select("SELECT * FROM produits WHERE token='" + produits_token + "'")
            if (check_product.length === 1) {
              //ajouter le produits au panier
              console.log("INSERT INTO panier(user_token, produit_token, produit_qt) VALUES('"+check_user[0].user_token+"','"+check_product[0].token+"',1)")
              database_query.query_insert("INSERT INTO panier(user_token, produit_token, produit_qt) VALUES('"+check_user[0].user_token+"','"+check_product[0].token+"',1)")
              return '<html><head></head><body><script>document.location.href="/produits/square?'+check_product[0].token+'"</script></body></html>';
            } else {
              return '<html><head></head><body><script>document.location.href="/produits/square?'+tmp_link_array[tmp_link_array.length-1]+'"</script></body></html>';
            }
          } else {
            return '<html><head></head><body><script>document.location.href="/produits/square?'+tmp_link_array[tmp_link_array.length-1]+'"</script></body></html>';
          }
        } else {
          if (tmp_link_array.length === 0) {
            return '<html><head></head><body><script>document.location.href="/home"</script></body></html>';
          } else {
            return '<html><head></head><body><script>document.location.href="/produits/square?'+tmp_link_array[tmp_link_array.length-1]+'"</script></body></html>';
          }
        }
      } else {
        if (url === "/liste_produit/panier/style.css") {
          var data = Deno.readFileSync("./website/liste_produit/panier/style.css");
          var temp = decoder.decode(data)
          return temp
        } else {
          var data = Deno.readFileSync("./website/liste_produit/panier/index.html");
          var temp = decoder.decode(data)
          // add product
          //check user 
          var check_user = await database_query.query_select("SELECT * FROM cookie_to_account WHERE cookie='" + user_token + "'")
          if (check_user.length === 1) {
            var liste_panier_produit = await database_query.query_select("SELECT * FROM panier WHERE user_token='"+check_user[0].user_token+"'")
            var add_liste_produits = ""
            for (var i = 0; i < liste_panier_produit.length; i++){
              var produit_info = await database_query.query_select("SELECT * FROM produits WHERE token='"+liste_panier_produit[i].produit_token+"'")
              add_liste_produits = add_liste_produits+'<a class="product" href="#"><div class="product-image"><img src="'+produit_info[0].url_pic+'" /></div>'+
              '<div class="product-content"><div class="product-info">'+
                '<h2 class="product-title">' + produit_info[0].nom + '</h2><p class="product-price">' + produit_info[0].prix + '€</p>'
                + '<a href="/liste_produit/delete?'+liste_panier_produit[i].produit_token+'?'+user_token+'" class="product-price">Suprimer le produit</a> </div>' +
              '</div></a>'
            }
            temp = temp.replace('!-!_liste_produits_!-!', add_liste_produits)
            temp = temp.replace('!-!_config.shop.name_!-!', config.shop.name)
          } else {
            return '<html><head></head><body><script>document.location.href="/users"</script></body></html>';
          }
          return temp
        }
      }  
    } else if (url.startsWith('/liste_produit/delete')) {
      var tmp = url.split('?')
      var produit = tmp[1]
      var user = tmp[2]
      var check_user = await database_query.query_select("SELECT * FROM cookie_to_account WHERE cookie='" + user_token + "'")
      await database_query.query_delete('DELETE from panier WHERE user_token="' + check_user[0].user_token + '" AND produit_token="' + produit + '"')
      return '<html><head></head><body><script>document.location.href="/liste_produit/panier"</script></body></html>';

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
  }
}