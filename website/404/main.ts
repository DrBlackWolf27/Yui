var decoder = new TextDecoder("utf-8");
export class page_404 {
  request_analyse(url: string) {
    //Gestion des requettes
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