var request = require('http');

function getHtml(url, callback){
    request.get(url, function(response){
        var body="";
        response.on("data", function(chunk) {
            body += chunk;
        });
        response.on("end", function(chunk) {
           callback(body);
        });
    });
}

describe("Pagina de Inicio", function () {

    it("debe tener el título correcto", function () {
        getHtml("http://localhost:3000/", function(body){
            expect(body).toContain("<h1>Sindicalizate</h1>")
        });
    });
});