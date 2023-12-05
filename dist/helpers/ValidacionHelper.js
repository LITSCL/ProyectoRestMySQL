"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidacionHelper = void 0;
class ValidacionHelper {
    validarCadena(cadena) {
        try {
            if (cadena.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            return false;
        }
    }
}
exports.ValidacionHelper = ValidacionHelper;
//# sourceMappingURL=ValidacionHelper.js.map