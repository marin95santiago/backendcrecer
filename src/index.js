const app = require('./app');
require('./database');

async function main () {
    app.listen(app.get('port'), () => {
        console.log(`Servidor iniciado en el puerto ${app.get('port')}`);
    });
}

main();