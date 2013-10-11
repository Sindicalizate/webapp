var https = require('https');
var jsdom = require('jsdom');

function postHtml(options,data, callback){
    var req = https.request(options, function(response){
        var body="";
        response.on("data", function(chunk) {
            body += chunk;
        });
        response.on("end", function(chunk) {
           callback(body);
        });
    });
    req.write(data);
    req.end();
}

function obtenerEmpresa(rut,callback){
	var data ="RUT="+ rut.numero +"&DV="+ rut.dv +"&ACEPTAR=Efectuar+Consulta&PRG=STC&OPC=NOR";	
	var options = {
	  hostname: 'zeus.sii.cl',
	  port: 443,
	  path: '/cvc_cgi/stc/getstc',
	  method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': Buffer.byteLength(data)
	    }
	};

	postHtml(options,data,function(responseHtml) {
		//parsear aqui...	   
		callback(responseHtml)
		/*
		var selector = 'body > center:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > font:nth-child(1)';
		jsdom.env(
			  responseHtml,
			  ["http://code.jquery.com/jquery.js"],
			  function (errors, window) {

			    callback(window.$(selector).text());
			  }
			); 		
		*/
	}); 
}

describe("Empresa", function () {
    it("debe encontrar empresa a partir de rut",function(done) {
	var rutEjemplo = {numero:'76769770', dv:'8'};
        obtenerEmpresa(rutEjemplo,function(empresa){
		 expect(empresa).toContain("EMPRESA DE SERVICIOS TRANSITORIOS DE PERSONAL ANA");
			done();
	});
    });
});
