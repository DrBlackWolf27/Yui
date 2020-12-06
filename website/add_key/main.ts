var config0 = Deno.readTextFileSync("./config.json");
const config = JSON.parse(config0)
var decoder = new TextDecoder("utf-8");

export class add_key {
  request_analyse(url: string) {
    //Gestion des requettes  
    if (url === "/add_key/style.css") {
      var data = Deno.readFileSync("./website/add_key/style.css");
      var temp = decoder.decode(data)
    } else {
      var data = Deno.readFileSync("./website/add_key/index.html");
      var temp = decoder.decode(data)
      var tmp2 = url.split('=')
      var tmp3 = tmp2[1]
      let date0 = new Date()
      var hours = String(date0.getHours())
      var min = String(date0.getMinutes())
      temp = temp.replace("!-!_qrcode_!-!", tmp3)
      temp = temp.replace("!-!_backup_!-!", tmp3)
      temp = temp.replace("!-!_shopname_!-!", config.shop.name)
      temp = temp.replace("!-!_hour_!-!", hours)
      temp = temp.replace("!-!_min_!-!", min)
    }
    return temp
  }
}