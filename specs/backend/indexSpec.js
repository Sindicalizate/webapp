describe("Pagina de Inicio", function () {
    it("debe establecer variable title al valor correcto",function() {
        var indexController = require("../../src/controllers/index.js");
        var req={};
        var res={
            render: function(path,data){
                expect(data.title).toBe("Sindicalizate");
            }
        };
        indexController.index(req, res)
    });
});