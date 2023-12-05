"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
var puerto = 2900;
var server = app_1.app.listen(puerto, function () {
    console.log(`Servidor levantado correctamente en el puerto ${puerto}`);
});
//# sourceMappingURL=index.js.map