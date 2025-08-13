//=======[ Settings, Imports & Data ]==========================================
var PORT = 3000;

var express = require('express');
var cors = require('cors');
const jwt = require('jsonwebtoken');
var pool = require('./mysql-connector');

const routerDispositivos = require('./dispositivos/index');
//const routerDispositivo = require('./routes/dispositivos');
//const routerDispositivos = require('./routes/dispositivos');
var app = express();

// CORS
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(express.json());
app.use(express.static('/home/node/app/static/'));
app.use(cors(corsOptions));

//=======[ JWT Settings ]======================================================
const YOUR_SECRET_KEY = 'mi llave';
var testUser = { username: 'test', password: '1234' };

//=======[ Middleware de Autenticación ]=======================================
var authenticator = function (req, res, next) {
    let autHeader = (req.headers.authorization || '');
    if (autHeader.startsWith('Bearer ')) {
        token = autHeader.split(' ')[1];
    } else {
        return res.status(401).send({ message: 'Se requiere un token de tipo Bearer' });
    }
    jwt.verify(token, YOUR_SECRET_KEY, function (err) {
        if (err) {
            return res.status(403).send({ message: 'Token inválido' });
        }
        next();
    });
};

//=======[ Generador de Mediciones Aleatorias ]================================
const generarMediciones = () => {
    console.log('Intentando obtener dispositivos para generar mediciones...');
    const queryDispositivos = 'SELECT dispositivoId FROM Dispositivos';
    const queryInsertMedicion = `
        INSERT INTO Mediciones (dispositivoId, fecha, valor)
        VALUES (?, NOW(), ?)`;

    pool.query(queryDispositivos, (err, dispositivos) => {
        if (err) {
            console.error('Error al obtener dispositivos:', err);
            return;
        }

        dispositivos.forEach(({ dispositivoId }) => {
            const valor = (Math.random() * 100).toFixed(2);
            pool.query(queryInsertMedicion, [dispositivoId, valor], (err) => {
                if (err) {
                    console.error(`Error al registrar medición para dispositivo ${dispositivoId}:`, err);
                } else {
                    console.log(`Medición registrada para dispositivo ${dispositivoId}: ${valor}`);
                }
            });
        });
    });
};

setTimeout(() => {
    console.log('Iniciando generación periódica de mediciones...');
    setInterval(() => {
        console.log('Generando nuevas mediciones...');
        generarMediciones();
    }, 300000); // cada 5 minutos
}, 10000); // retraso inicial de 10 segundos

//=======[ Rutas Públicas ]====================================================
app.post('/login', (req, res) => {
    if (req.body) {
        var userData = req.body;
        if (testUser.username === userData.username && testUser.password === userData.password) {
            var token = jwt.sign(userData, YOUR_SECRET_KEY);
            res.status(200).send({
                signed_user: userData,
                token: token
            });
        } else {
            res.status(403).send({ errorMessage: 'Auth required' });
        }
    } else {
        res.status(403).send({ errorMessage: 'Se requiere un usuario y contraseña' });
    }
});

app.get('/', function (req, res) {
    res.status(200).send({ mensaje: 'Hola DAM' });
});

//=======[ Rutas Protegidas por JWT ]==========================================
app.get('/prueba', authenticator, function (req, res) {
    res.send({ message: 'Está autenticado, accede a los datos' });
});

app.all('/secreto', authenticator, function (req, res) {
    console.log(req.method);
    res.status(200).send('Secreto');
});

app.get('/devices', authenticator, function (req, res) {
    const query = 'SELECT * FROM Dispositivos';
    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los dispositivos:', error);
            res.status(500).send({ error: 'Error al obtener los dispositivos' });
        } else {
            res.status(200).send(results);
        }
    });
});

//=======[ Montar Routers con Autenticación ]==================================
//app.use(authenticator, routerDispositivos);
app.use('/dispositivo', authenticator, routerDispositivos);

//=======[ Start Server ]======================================================
app.listen(PORT, function () {
    console.log(`NodeJS API running correctly on port ${PORT}`);
});
