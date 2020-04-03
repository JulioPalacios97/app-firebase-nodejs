const { Router } = require('express');
const router = Router();
//importamos el modulo a usar
const admin = require('firebase-admin');


//direccion del archivo
var serviceAccount = require("../../fir-node-bc817-firebase-adminsdk-21ikt-e9f740c825.json");

//configuracion de conexion con firebase
admin.initializeApp({
    //especificar las credenciales
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-node-bc817.firebaseio.com/'
})

//crear objeto para interactuar con mi conexion firebase
const db = admin.database();


router.get('/', (req, res) => {
    //hacer una consulta a firebase
    db.ref('contacts').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('index', { contacts: data });  
    });     
});

router.post('/new-contac', (req, res) => {
    console.log(req.body);
    //creacion de objeto
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    };
    //guardar los datos en firebase mysql(es la tabla)
    db.ref('contacts').push(newContact);

    res.redirect('/')
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
});

module.exports = router;