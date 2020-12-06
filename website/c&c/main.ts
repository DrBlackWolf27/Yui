var config0 = Deno.readTextFileSync("./config.json");
const config_base = JSON.parse(config0)
var decoder = new TextDecoder("utf-8");


export class page_cac {
  request_analyse(url: string, config_cookie: string) {
    //Gestion des requettes
    var config
    //fichier de configuration
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
    if (url === "/c&c/style.css") {
      var data = Deno.readFileSync("./website/c&c/style.css");
      var temp = decoder.decode(data)
      return temp
    } else {
      var data = Deno.readFileSync("./website/c&c/index.html");
      var temp = decoder.decode(data)
      try {
        //on remplace les infos
        temp = temp.replace('!-!_c&c.infos.lent.heures_!-!', config.click_and_collect.infos.lent.heures)
        temp = temp.replace('!-!_c&c.infos.lent.description_!-!', config.click_and_collect.infos.lent.description)
        temp = temp.replace('!-!_c&c.infos.lent.link_read_more_!-!', config.click_and_collect.infos.lent.link_read_more)
        temp = temp.replace('!-!_c&c.infos.rapide.heures_!-!', config.click_and_collect.infos.rapide.heures)
        temp = temp.replace('!-!_c&c.infos.rapide.description_!-!', config.click_and_collect.infos.rapide.description)
        temp = temp.replace('!-!_c&c.infos.rapide.link_read_more_!-!', config.click_and_collect.infos.rapide.link_read_more)
        temp = temp.replace('!-!_c&c.infos.turbo.heures_!-!', config.click_and_collect.infos.turbo.heures)
        temp = temp.replace('!-!_c&c.infos.turbo.description_!-!', config.click_and_collect.infos.turbo.description)
        temp = temp.replace('!-!_c&c.infos.turbo.link_read_more_!-!', config.click_and_collect.infos.turbo.link_read_more)
        temp = temp.replace('!-!_mil_sec_0_!-!', config.click_and_collect.infos.lent.time_in_mili)
        temp = temp.replace('!-!_mil_sec_1_!-!', config.click_and_collect.infos.rapide.time_in_mili)
        temp = temp.replace('!-!_mil_sec_2_!-!', config.click_and_collect.infos.turbo.time_in_mili)
      } catch (err) {
        console.log(err)
      }
      return temp
    }
  }
}