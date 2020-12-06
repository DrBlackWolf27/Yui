var decoder = new TextDecoder("utf-8");

export class add_phone {
  login_ok(url: string) {
    //Gestion des requettes
    if (url === "/add/style.css") {
      var data = Deno.readFileSync("./website/add_phone/ok/style.css");
      var temp = decoder.decode(data)
    } else if (url === "/add/script.js") {
      var data = Deno.readFileSync("./website/add_phone/ok/script.js");
      var temp = decoder.decode(data)
    } else if (url === "/add/back.png") {
      var data = Deno.readFileSync("./website/add_phone/ok/back.png");
      return data;
    } else {
      var data = Deno.readFileSync("./website/add_phone/ok/index.html");
      var temp = decoder.decode(data)
    }
    return temp
  }
  login_no(url: string) {
    if (url === "/add/no/style.css") {
      var data = Deno.readFileSync("./website/add_phone/no/style.css");
      var temp = decoder.decode(data)
    } else {
      var data = Deno.readFileSync("./website/add_phone/no/index.html");
      var temp = decoder.decode(data)
    }
    return temp
  }
}