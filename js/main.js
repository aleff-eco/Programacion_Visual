var con;


function iniciarSesion() {   

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username == 'Aleff' && password == '1234') {

        if (localStorage.getItem('host') == null) {

            location.href = './login.html';  

        }else{

            process.env.host = localStorage.getItem('host');
            process.env.user = localStorage.getItem('user');
            process.env.password = localStorage.getItem('password');
            process.env.database = localStorage.getItem('database');
            process.env.port = localStorage.getItem('port');
            location.href = './personas.html';
            alert("Iniciando.")
        }

    }else{

    }
    
}

function conectar() {
    con = require('./js/connect');
        
    setTimeout(function(){
        if (localStorage.getItem('host') != null) {
            location.href = './personas.html';
        }
    }, 5000);
}


function crear() {
    con = require('./js/connect');
    const nombre = document.getElementById('nombre').value;
    const apPaterno = document.getElementById('apPaterno').value;
    const apMaterno = document.getElementById('apMaterno').value;
    const edad = document.getElementById('edad').value;
    $queryInsert = `INSERT INTO persona(nombre, ap_paterno, ap_materno, edad) VALUES ("${nombre}","${apPaterno}","${apMaterno}","${edad}")`;
    con.query($queryInsert, function (err, rows, fields) {

        if (err) {
            console.log('Error Query');
            console.log(err);
            return;
        }

        console.log("Query exitoso", rows);
    });

    con.end(function () {
        console.log('Conexion finalizada');
    }); 
}

function select() {
    if (localStorage.getItem('host') == null) {
        
        return;
    }
    con = require('./js/connect');
    var rHtml = "";
    var rHtml2 = "";
    var rHtml3 = "";
    var rHtml4 = "";

    var conta = 0;
    $querySelect = `SELECT * FROM persona`;
    con.query($querySelect, function (err, rows, fields) {

        if (err) {
            console.log('Error Query');
            console.log(err);
            return;
        }

        rows.forEach(row => {
            rHtml += "<input class='input-custom input is-primary' disabled type='text' placeholder='"+ row.nombre +"' style='top: " + conta + "px'>";
            rHtml2 += "<input class='input-custom input is-primary' disabled type='text' placeholder='"+ row.ap_paterno +"' style='top: " + conta + "px'> ";
            rHtml3 += "<input class='input-custom input is-primary' disabled type='text' placeholder='"+ row.ap_materno +"' style='top: " + conta + "px'> ";
            rHtml4 += "<input class='input-custom input is-primary' disabled type='text' placeholder='"+ row.edad +"' style='top: " + conta + "px'> ";
            
            conta = conta + 15;
        });
        document.getElementById('renderHtml').innerHTML = rHtml;
        document.getElementById('render2Html').innerHTML = rHtml2;
        document.getElementById('render3Html').innerHTML = rHtml3;
        document.getElementById('render4Html').innerHTML = rHtml4;
        var offsetHeight = document.getElementById('column1').offsetHeight;
        document.getElementById('column1').style.height = '' + (offsetHeight + conta + 30) + 'px';
    });

}

window.onload = select();