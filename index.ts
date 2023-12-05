import { app } from './app';

var puerto: number = 2900;

var server: any = app.listen(puerto, function() {
	console.log(`Servidor levantado correctamente en el puerto ${puerto}`);
});