const express = require('express');
const app = express();

// 1-  
app.use(express.urlencoded({extended:false}));
app.use(express.json())

// 2 -
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

// 3 -
app.set('view engine', 'ejs');

// 4 -
const bcryptjs = require('bcryptjs');

// 5 -
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    
}));

// 6 - Conexion a la BD
const connection = require('./database/db'); 

//7- Home
app.get('/', (req, res)=>{
    res.render('login');
})

// 8 - Login
app.post('/auth', async (req, res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    connection.query('SELECT * FROM USERS WHERE name_user = ?', [user], async(error, results) =>{
        if(error){
            console.log("El error que devolvió SQL es: " + error);
            return;
        }

        if (results[0] === undefined){
            return res.render('login', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Usuario y/o contraseña incorrectos",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1200,
                ruta: ''
            })
            return;
        }
        else{
            if (pass != results[0].passwor) {
                return res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1200,
                    ruta: ''
                });
            }
            else {
                req.session.name = results[0].name_user;
                req.session.loggedin1 = true;
                return res.render('login', {
                    alert: true,
                    alertTitle: "Conexión exitosa",
                    alertMessage: "¡Login correcto!",
                    alertIcon: "succes",
                    showConfirmButton: false,
                    timer: 900,
                    ruta: ''
                });
            }
        }
    })
});

// 8 - Registro 
app.post('register', async (req, res)=>{
    const nom = req.body.name
    const pass = req.body.pass
    const dni = req.body.dni 
    const equip = req.body.equip
    let passwordHaash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO personas (DNI, usuario, nombre, apellido) VALUES (' + "'" +  nom + "', '" + pass + "', " + dni + ", '" + equip + "');");
    if(error){
        console.log("El error que devolvió SQL es: ", error)
        return
    }
})

app.listen(3309, (req, res)=>{
    console.log("");
    console.log("-------------------------------------------");
    console.log("SERVER RUNNING IN http://localhost:3309");
});


