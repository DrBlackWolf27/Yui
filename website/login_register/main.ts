var config0 = Deno.readTextFileSync("./config.json");
const config = JSON.parse(config0)

//Import
import { isEmail } from "https://deno.land/x/isemail/mod.ts";
import { sql_query } from "../../assets/database/query.ts";
import { sha512 } from "https://denopkg.com/chiefbiiko/sha512/mod.ts";
var database_query = new sql_query();

//creation de token avec x en length
function create_token(length: any) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export class page_login_register {
  request_analyse(url: string, qr_random: string) {
    //Gestion des requettes
    var tmp = url

    if (tmp.startsWith("/login")) {
      if (tmp === "/login/style.css") {
        var decoder = new TextDecoder("utf-8");
        var data = Deno.readFileSync("./website/login_register/files/style.css");
        var temp = decoder.decode(data)
        return temp
      } else if (tmp === "/login/script.js") {
        var decoder = new TextDecoder("utf-8");
        var data = Deno.readFileSync("./website/login_register/files/script.js");
        var temp = decoder.decode(data)
        return temp
      } else if (tmp === "/login/qrcode.js") {
        var decoder = new TextDecoder("utf-8");
        var data = Deno.readFileSync("./website/login_register/files/qrcode.js");
        var temp = decoder.decode(data)
        return temp
      } else {
        var decoder = new TextDecoder("utf-8");
        var data = Deno.readFileSync("./website/login_register/index.html");
        var temp = decoder.decode(data)
        temp = temp.replace('!!REPME_Q_1', qr_random)
        return temp
      }
    } else if (tmp.startsWith("/register")) {
      //Register page
      if (tmp === "/register/style.css") {
        var decoder = new TextDecoder("utf-8");
        var data = Deno.readFileSync("./website/login_register/files/style.css");
        var temp = decoder.decode(data)
        return temp
      } else if (tmp === "/register/anime.min.js") {
        var decoder = new TextDecoder("utf-8");
        var data = Deno.readFileSync("./website/login_register/files/anime.min.js");
        var temp = decoder.decode(data)
        return temp
      } else if (tmp === "/register/script.js") {
        var decoder = new TextDecoder("utf-8");
        var data = Deno.readFileSync("./website/login_register/files/script.js");
        var temp = decoder.decode(data)
        return temp
      } else if (tmp === "/register/?invalid_email") {
        var decoder = new TextDecoder("utf-8");
        var data = Deno.readFileSync("./website/login_register/index2.html");
        var temp = decoder.decode(data)
        temp = temp.replace('!_!', 'Invalid Email')
        return temp
      } else if (tmp === "/register" || tmp === "/register/") {
        var decoder = new TextDecoder("utf-8");
        var data = Deno.readFileSync("./website/login_register/index2.html");
        var temp = decoder.decode(data)
        temp = temp.replace('!_!', 'Register')
        return temp
      } 
      //page de check
      else if (tmp.startsWith("/register/check/")) {
        var tmp2 = tmp.split('=')
        var email_no_check = tmp2[1]
        email_no_check = email_no_check.replace('%40', '@')
        
        if (isEmail(email_no_check)) {

          var tmp_recovery_key = create_token(15)
          
          var sql = `INSERT INTO membres(token, pseudo, nom, prenom, email, password, grade, derniereco)
          values("${create_token(40)}", "user-${create_token(7)}", "nom-user", "prenom-user", "${email_no_check}", "${sha512(tmp_recovery_key, "utf8", "hex")}", "user", "${Date.now()}")`
          
          database_query.query_insert(String(sql))

          return '<html><head></head><body><script>document.location.href="/add_key/?key='+tmp_recovery_key+'"</script></body></html>'

        } else {
          return '<html><head></head><body><script>document.location.href="/register/?invalid_email"</script></body></html>';
        }

      } else {
        var decoder = new TextDecoder("utf-8");
        var data = Deno.readFileSync("./website/login_register/index2.html");
        var temp = decoder.decode(data)
        return temp
      }
    } else {
      if (tmp === "/404/style.css") {
        var decoder = new TextDecoder("utf-8");
        var data = Deno.readFileSync("./website/404/style.css");
        var temp = decoder.decode(data)
        return temp
      } else {
        var decoder = new TextDecoder("utf-8");
        var data = Deno.readFileSync("./website/404/index.html");
        var temp = decoder.decode(data)
        return temp
      }
    }
  }
}