var config0 = Deno.readTextFileSync("./config.json");
const config_base = JSON.parse(config0)
var decoder = new TextDecoder("utf-8");

export class page_about {
  request_analyse(url: string, config_cookie: string) {
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

    //Gestion des requettes
    if (url === "/about/script.js") {
      var data = Deno.readFileSync("./website/about/script.js");
      var temp = decoder.decode(data)
      temp = temp.replace('!-!_about[0].titre_!-!', config.about[0].titre)
      temp = temp.replace('!-!_about[1].titre_!-!', config.about[1].titre)
      temp = temp.replace('!-!_about[0].paragraphe_1_!-!', config.about[0].paragraphe_1)
      temp = temp.replace('!-!_about[0].paragraphe_2_!-!', config.about[0].paragraphe_2)
      temp = temp.replace('!-!_about[1].paragraphe_1_!-!', config.about[1].paragraphe_1)
      temp = temp.replace('!-!_about[1].paragraphe_2_!-!', config.about[1].paragraphe_2)
    } else if (url === "/about/style.css") {
      var data = Deno.readFileSync("./website/about/style.css");
      var temp = decoder.decode(data)
    } else {
      var data = Deno.readFileSync("./website/about/index.html");
      var temp = decoder.decode(data)
    }
    return temp
  }
}