export class ValidacionHelper {
    
    validarCadena(cadena: string) {
        try {
            if (cadena.length > 0) {
                return true;
            }
            else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

}