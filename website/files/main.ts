export class page_files {
  request_analyse(url: string) {
    //Gestion des requettes du systeme des "files"
    try {
      if (url.startsWith('/')) {
        try {
          var data = Deno.readFileSync('.' + url);
          return data
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          var data = Deno.readFileSync('./' + url);
          return data
        } catch (err) {
          console.log(err)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
}