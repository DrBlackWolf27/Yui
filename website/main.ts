//Import des dépendances
import { serve, Response } from "https://deno.land/std@0.77.0/http/server.ts";
import { shop } from "../assets/ascii.ts"
import { log } from "../assets/logger.ts"
import { Cookie, getCookies, setCookie, deleteCookie } from "https://deno.land/std@0.74.0/http/cookie.ts"
import { sha512 } from "https://denopkg.com/chiefbiiko/sha512/mod.ts";
import { sql_query } from "../assets/database/query.ts";

//Import des configuration des pages
import { page_about } from "./about/main.ts"
import { page_cac } from "./c&c/main.ts"
import { page_files } from "./files/main.ts"
import { page_home } from "./home/main.ts"
import { page_liste_produit } from "./liste_produit/main.ts"
import { page_login_register } from "./login_register/main.ts"
import { page_produits } from "./produits/main.ts"
import { page_users } from "./users/main.ts"
import { page_404} from "./404/main.ts"
import { add_key } from "./add_key/main.ts"
import { add_phone } from "./add_phone/main.ts"
import { add_shop } from "./produits/command.ts"
import { page_admin } from "./admin/main.ts"

// Configuration des sites du script
var config_script_tmp = Deno.readTextFileSync("./config/host.json");
const config_host = JSON.parse(config_script_tmp)

//Configuration des constantes Générales
const shop_infos_assci = new shop()
const logger = new log()
const serveur = serve({ port: config_host.listen_port });
const database_query = new sql_query()

//Creation des constantes de gestion de pages
const p_about = new page_about();
const p_cac = new page_cac();
const p_files = new page_files();
const p_home = new page_home();
const p_liste_produit = new page_liste_produit();
const p_login_register = new page_login_register();
const p_produits = new page_produits();
const p_users = new page_users();
const p_404 = new page_404();
const p_add_key = new add_key();
const p_add_phone = new add_phone()
const p_add_shop = new add_shop()
const p_admin = new page_admin()

//Mise en place de la confiruration du site par defaut
//var config0 = Deno.readTextFileSync("./config.json");
//const config = JSON.parse(config0)

//Mise en place des varriable de gestion de domaines
let website_conf_0 = []
let website_conf_1 = []
let website_conf_2 = []

for (var i = 0; i < config_host.host.length; i++){
  if (config_host.host[i].tor_network_code == 1) {
    website_conf_1.push(config_host.host[i])
  } else if (config_host.host[i].tor_network_code == 2) {
    website_conf_2.push(config_host.host[i])
  } else {
    website_conf_0.push(config_host.host[i])
  }
}

// permet de gerener une chaine aleatoire de x caractère(s)
function create_token(length: any) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// permet de verifier si le cookie est associé a un compte
async function check_user_login(cookie:string) {
  var sql = `SELECT * FROM cookie_to_account where cookie="${String(cookie)}"`
  var sql_tmp = await database_query.query_select(String(sql))
  if (sql_tmp === undefined || sql_tmp.length === 0) {
    return false
  } else {
    return true
  }
}

//Permet de verifier la provenance du flux de la requête
function check_tor(array_user_agent: any, array_user_agent2: any) {
  if (array_user_agent.length === 4 && array_user_agent[1].startsWith('5.0 (Windows NT') && array_user_agent2.length === 2) {
    return "tor"
  } else {
    return "clear"
  }
}

//Le serveur est online :p
shop_infos_assci.online()
logger.info("[SERVER] - Website online on: http://0.0.0.0:"+config_host.listen_port)

//Systeme de gestion de requêtes
for await (const request of serveur) {
  
  //Declaration des variables 
  logger.info("[SERVER] - " + request.url)
  let response: Response = {};
  response.body = "data_defaut"
  let request_type
  var send_error
  
  //Mise en place du "TOR NETWORK" Checker
  var user_agent
  var array_user_agent = [];
  var array_user_agent2 = [];
  user_agent = request.headers.get("user-agent") || "Unknown";
  array_user_agent = user_agent.split('/');
  try {array_user_agent2 = array_user_agent[1].split(';')} catch (err) {array_user_agent2 = ['0']}

  // checkeur de domaine 
  var host_url_full = request.headers.get("host") || "Null"
  var final_host_config = []
  if (host_url_full != "Null") {
    //checke la configuration du domaine
    for (var i = 0; i < website_conf_0.length; i++){
      if (website_conf_0[i].website_url === host_url_full) {
        final_host_config.push(website_conf_0[i])
      }
    }
    for (var i = 0; i < website_conf_1.length; i++){
      if (website_conf_1[i].website_url === host_url_full) {
        final_host_config.push(website_conf_1[i])
      }
    }
    for (var i = 0; i < website_conf_2.length; i++){
      if (website_conf_2[i].website_url === host_url_full) {
        final_host_config.push(website_conf_2[i])
      }
    }
  } 
  //si le site n'as pas de configuration
  if (final_host_config.length == 0 || host_url_full === "Null") {
    for (var i = 0; i < config_host.host.length; i++){
      if (config_host.host[i].website_config_file === "default") {
        final_host_config.push(config_host.host[i])
      }
    }
  }

  //en cas d'erreur de configuration
  if (final_host_config.length == 0) {
    response.body = "HOST CONFIG ERROR; '/config/host.json'"
  } else {
    //Traitement de la requête
    request_type = check_tor(array_user_agent, array_user_agent2)

    //Force la mise en place du cookie attribue
    const cookie_set: Cookie = {
      name: "change",
      value: final_host_config[0].website_config_file
    };
    setCookie(response, cookie_set);

    //Check la configurarion convient par rapport au type de requette
    if (final_host_config[0].tor_network_code == 1) {
      if (request_type === "tor") {
        send_error = true
      } else {
        send_error = false
      }
    } else if (final_host_config[0].tor_network_code == 2) {
      if (request_type === "tor") {
        send_error = false
      } else {
        send_error = true
      }
    } else {
      send_error = false
    }

    //si on doit send une erreur:
    if (send_error) {
      response.status=404
      response.body=""
    } else {
      //gestion de la requette du site
      if ((request.url === '/') || (request.url.startsWith('/home'))) {
        //dans le ca d'une requette /home
        var get_cookie = getCookies(request)
        var cookie_config = "0"
        if (get_cookie.change === undefined) {
          if (final_host_config[0].website_config_file == "default") {
            cookie_config = ""
          } else {
            cookie_config = final_host_config[0].website_config_file
          }
        } else {
          cookie_config = get_cookie.change
        }
        try {
          var home_data = await p_home.request_analyse(request.url, cookie_config);
          response.body = home_data
        } catch (err) {
          console.log(err)
          logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
        }
      } else if (request.url.startsWith('/about')) {
        //dans le cas d'une requette sur la page about
        try {
          var get_cookie = getCookies(request)
          var cookie_config = "0"
          if (get_cookie.change === undefined) {
            if (final_host_config[0].website_config_file == "default") {
              cookie_config = ""
            } else {
              cookie_config = final_host_config[0].website_config_file
            }
          } else {
            cookie_config = get_cookie.change
          }
          var about_data = p_about.request_analyse(request.url, cookie_config);
          response.body = about_data
        } catch (err) {
          logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
        }
      } else if (request.url.startsWith('/liste_produit')) {
        //dans le cas d'une requette sur une page pour lister les produits 
        let cookies_get = getCookies(request);
        if (cookies_get.Alpha === undefined) {
          var tmp_user_cookie = "0"
        } else {
          var tmp_user_cookie = cookies_get.Alpha
        }

        var get_cookie = getCookies(request)
        var cookie_config = "0"
        if (get_cookie.change === undefined) {
          if (final_host_config[0].website_config_file == "default") {
            cookie_config = ""
          } else {
            cookie_config = final_host_config[0].website_config_file
          }
        } else {
          cookie_config = get_cookie.change
        }

        try {
          var liste_produit_data = await p_liste_produit.request_analyse(request.url, tmp_user_cookie, cookie_config);
          response.body = liste_produit_data
        } catch (err) {
          logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
        }
      } else if (request.url.startsWith('/produits')) {
        //dans le cas d'une requette sur la page produits
        try {
          var get_cookie = getCookies(request)
          var cookie_config = "0"
          if (get_cookie.change === undefined) {
            if (final_host_config[0].website_config_file == "default") {
              cookie_config = ""
            } else {
              cookie_config = final_host_config[0].website_config_file
            }
          } else {
            cookie_config = get_cookie.change
          }
          var produits_data = await p_produits.request_analyse(request.url, cookie_config);
          response.body = produits_data
        } catch (err) {
          logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
        }
      } else if (request.url.startsWith('/c&c')) {
        //dans le cas d'une requette sur la page click&collect
        try {
          var get_cookie = getCookies(request)
          var cookie_config = "0"
          if (get_cookie.change === undefined) {
            if (final_host_config[0].website_config_file == "default") {
              cookie_config = ""
            } else {
              cookie_config = final_host_config[0].website_config_file
            }
          } else {
            cookie_config = get_cookie.change
          }
          var cac_data = p_cac.request_analyse(request.url, cookie_config);
          response.body = cac_data
        } catch (err) {
          logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
        }
      } else if (request.url.startsWith('/login')) {
        //dans le cas d'une requette sur la page login
        //associe qr et cookie !
        if (request.url === '/login' || request.url === "/login/") {
          //si c'est le index on traite la demande avec la gestion des cookies
          let cookies_get = getCookies(request);
          var check_user_login_user1 = await check_user_login(cookies_get.Alpha)
          if (!check_user_login_user1) {
            if (cookies_get.Alpha === undefined) {
              var generate_cookie = create_token(50)
              var cookies = generate_cookie
              const cookie_set: Cookie = {
                name: "Alpha",
                value: cookies
              };
              setCookie(response, cookie_set);
            } else {
              //chech if login
              generate_cookie = cookies_get.Alpha
            }
            try {
              var login_data = p_login_register.request_analyse(request.url, generate_cookie);
              response.body = login_data
            } catch (err) {
              logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
            }
          } else {
            response.body = '<html><head></head><body><script>document.location.href="/users"</script></body></html>'
          }
          
        } else {
          //dans le ca contraire on ne fait que envoyer les fichiers
          try {
            var login_data = p_login_register.request_analyse(request.url, 'waw');
            response.body = login_data
          } catch (err) {
            logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
          }
        }

      } else if (request.url.startsWith('/register')) {
        //dans le cas d'une requette sur la page register
        let cookies_get = getCookies(request);
        try {
          var register_data = p_login_register.request_analyse(request.url, 'wow');
          response.body = register_data
        } catch (err) {
          logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
        }

      } else if (request.url.startsWith('/users')) { 
        //dans le cas d'une requette sur la page users
        if (request.url === "/users/" || request.url === "/users") {
          //faire un checkup des users infos.
          let cookies_get = getCookies(request);
          var check_user_login_user0 = await check_user_login(cookies_get.Alpha)
          if (!check_user_login_user0) {
            try {
              response.body = '<html><head></head><body><script>document.location.href="/login"</script></body></html>'
            } catch (err) {
              logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
            }
          } else {
            //on reste la
            try {
              var sql = `SELECT * FROM cookie_to_account where cookie="${String(cookies_get.Alpha)}"`
              console.log(sql)
              var sql_tmp = await database_query.query_select(String(sql))
              var token = sql_tmp[0].user_token
              console.log(token)

              try {
                var get_cookie = getCookies(request)
                var cookie_config = "0"
                if (get_cookie.change === undefined) {
                  if (final_host_config[0].website_config_file == "default") {
                    cookie_config = ""
                  } else {
                    cookie_config = final_host_config[0].website_config_file
                  }
                } else {
                  cookie_config = get_cookie.change
                }
                var user_data = await p_users.request_analyse(request.url, token, cookie_config);
                response.body = user_data
              } catch (err) {
                console.log(err)
              }
              
            } catch (err) {
              console.log(err)
              logger.warning("[SERVER] - Erreur lors du traitement de la requette:00 " + request.url)
            }
          }
        } else {
          try {
            var get_cookie = getCookies(request)
              var cookie_config = "0"
              if (get_cookie.change === undefined) {
                if (final_host_config[0].website_config_file == "default") {
                  cookie_config = ""
                } else {
                  cookie_config = final_host_config[0].website_config_file
                }
              } else {
                cookie_config = get_cookie.change
              }
              var user_data = await p_users.request_analyse(request.url, token, cookie_config);
            response.body = user_data
          } catch (err) {
            logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
          }
        }
  
      } else if (request.url.startsWith('/files')) {    
        //dans le cas d'une requette sur le systeme 'files'
        try {
          var files_data = p_files.request_analyse(request.url);
          response.body = files_data
        } catch (err) {
          logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
          response.body = "file not found"
        }
      } else if (request.url.startsWith('/add_key')) {     
        //dans le cas d'une requette sur la page /add_key
        try {
          var add_key_data = p_add_key.request_analyse(request.url);
          response.body = add_key_data
        } catch (err) {
          logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
        }
      } else if (request.url.startsWith('/add/')) {       
        //dans le cas d'une requette sur la page /addd
        var tmp1 = request.url.split('/')
        if (request.url.startsWith('/add/qr/')) {
          var code0 = request.url.split('/')
          var code = code0[code0.length - 1]
          console.log('+---------------------------+')
          console.log(code)
          let cookies_get = getCookies(request);
          console.log(cookies_get)
          console.log(cookies_get.user)
          if (cookies_get.user === undefined) {
            //not login phone
            var tmp88 = p_add_phone.login_no(request.url)
            try {
              response.body = tmp88
            } catch (err) {
              logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
            }
          } else {
            //check database
            var time = Date.now()
            console.log(sha512(cookies_get.user, "utf8", "hex"))
            var sql = `SELECT * FROM membres where password="${String(sha512(cookies_get.user, "utf8", "hex"))}"`
            var sql_tmp0 = await database_query.query_select(String(sql))
            if (sql_tmp0 === undefined || sql_tmp0.length === 0) {
              
            } else {
              if (code === "style.css" || code === "script.js") {
                
              } else {
                var sql = `INSERT INTO cookie_to_account(cookie, user_token, time) values('${code}','${sql_tmp0[0].token}','${time}')`
                database_query.query_insert(String(sql))
              }
              try {
              var tmp777 = p_add_phone.login_ok(request.url)
              response.body = tmp777
              } catch (err) {
                logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
              }
            }
          }
        } else {
          if (request.url === "/add/style.css" || request.url === "/add/script.js" || request.url==="/add/back.png") {
            try {
              var data_add_phone = p_add_phone.login_ok(request.url);
              request.respond({
                status: 200,
                body: data_add_phone
              });
            } catch (err) {
              logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
            }
          } else {
            var tmp2 = tmp1[tmp1.length - 1]
            console.log(tmp1)
            console.log(tmp2)
            let cookies_get = getCookies(request);
            console.log(cookies_get.user)
            console.log(cookies_get)
            if (cookies_get.user === undefined) {
              const cookie_set: Cookie = {
                name: "user",
                value: tmp2
              };
              setCookie(response, cookie_set);
              var add_phone_data = p_add_phone.login_ok(request.url);
              response.body = add_phone_data
              try {
                request.respond(response);
              } catch (err) {
                logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
              }
            } else {
              console.log('000----- DELECTE THIS FUCKING COOKIE')
              deleteCookie(response, "user");
              const cookie_set: Cookie = {
                name: "user",
                value: tmp2
              };
              setCookie(response, cookie_set);
              var add_phone_data = p_add_phone.login_ok(request.url);
              response.body = add_phone_data
              try {
                request.respond(response);
              } catch (err) {
                logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
              }
            }
    
          }
        }

      } else if (request.url.startsWith('/add2/')) {
        if (request.url === "/add2/style.css" || request.url === "/add2/script.js") {
          
        } else {
          var tmp1 = request.url.split('/')
          let cookies_get = getCookies(request);
          console.log(cookies_get.user)
          var tmp2 = tmp1[tmp1.length - 1]
          console.log(tmp1)
          console.log(tmp2)
          const cookie_set: Cookie = {
            name: "user",
            value: tmp2
          };
          setCookie(response, cookie_set);
          try {
            response.body = '<html><head></head><body><script>document.location.href="/add/' + tmp2 + '"</script></body></html>'
          } catch (err) {
            logger.warning("[SERVER] - Erreur lors du traitement de la requette: " + request.url)
          }
        }
        

      } else if (request.url.startsWith('/commande/')) {    
        //dans le cas d'une requette sur la page commande
        let cookies_get = getCookies(request);
        if (cookies_get.Alpha === undefined) {
          response.body = '<html><head></head><body><script>document.location.href="/users"</script></body></html>'
        } else {
          var tmp = await p_add_shop.request_analyse(request.url, cookies_get.Alpha)
          response.body = tmp
        }

      } else if (request.url.startsWith('/admin')) {
        //dans le cas d'une requette sur la page admin
        try {
          let cookies_get = getCookies(request);
          if (cookies_get.Alpha === undefined) {
            response.body = '<html><head></head><body><script>document.location.href="/users"</script></body></html>'
          } else {
            var data_admin = await p_admin.request_analyse(request.url, cookies_get.Alpha);
            response.body = data_admin
          }
        } catch (err) {
          logger.warning("[SERVER] - Erreur lors du traitement de la requette: "+request.url)
        }
      } else if (request.url.startsWith('/404')) {
        //dans le cas d'une requette sur la page 404
        try {   
          var data_404 = p_404.request_analyse(request.url);
          response.body = data_404
        } catch (err) {
          logger.warning("[SERVER] - Erreur lors du traitement de la requette: "+request.url)
        }
      } else if (request.url === "/favicon.ico") {
        try {
          var data = Deno.readFileSync("./website/favicon.ico");
          response.body = data
        } catch (err) {
          logger.warning("[SERVER] - Erreur lors du traitement de la requette: "+request.url)
        }
      } else {
        //Mise en place d'une page 404
        try {
          var data_404 = p_404.request_analyse(request.url);
          response.body = data_404
        } catch (err) {
          logger.warning("[SERVER] - Erreur lors du traitement de la requette: "+request.url)
        }
      }
    }
  }
  //send la reponse
  request.respond(response);
}