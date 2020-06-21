///carga cuando el documento ya este listo
$(document).ready(function() {  
    ///consultar la ciudad calle y otros datos del usuario por medio de su ubicacion
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {  
            ///coordenadas actuales
            var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)}; 
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({
                'location': latlng
                // ej. "-34.653015, -58.674850"
            }, function(results, status) {
                // si la solicitud fue exitosa
                if (status === google.maps.GeocoderStatus.OK) {
                    // si encontró algún resultado.
                    if (results[1]) {  
                    document.forms["formRegisterUser"]["direccion"].value =results[1].formatted_address; 
                    }
                }
            }); 
        }, function(error) {  
            floatingMessage(error.title,error.message,"error");
        });
    }
    else { 
        floatingMessage("error al obtener las coordenadas","error ubicacion","error");
    }

 });
 ////onkeyups
function onkeyupnombre(){ 
    if (document.forms["formRegisterUser"]["nombre"].value == "") { 
        printerrorform("nombre","has-error")
        document.getElementById("error_nombre").innerHTML = "Ingrese el nombre"; 
        return 1;
    }
    else if(!/^[a-zA-Z ]{2,30}$/.test(document.formRegisterUser.nombre.value))
    {  
        printerrorform("nombre","has-warning");
        document.getElementById('error_nombre').innerHTML="Ingrese un nombre correcto";
        document.formRegisterUser.nombre.focus(); 
        return 1;
    }
    else{
       document.getElementById("error_nombre").innerHTML = "";
       printerrorform("nombre","has-success");
       return 0;
    } 
}
function onkeyupapellido(){ 
    ///Apellido
    if (document.forms["formRegisterUser"]["apellido"].value == "") { 
        printerrorform("apellido","has-error")
        document.getElementById("error_apellido").innerHTML = "Ingrese el apellido"; 
        return 1;
    }
    else if(!/^[a-zA-Z ]{2,30}$/.test(document.formRegisterUser.apellido.value))
    {  
        printerrorform("apellido","has-warning");
        document.getElementById('error_apellido').innerHTML="Ingrese un apellido correcto";
        document.formRegisterUser.apellido.focus();  
        return 1;
    }
    else{
       document.getElementById("error_apellido").innerHTML = "";
       printerrorform("apellido","has-success");
       return 0;
    } 
}
function onkeyupemail(){ 
     ///Correo electronico
     const testcorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (document.forms["formRegisterUser"]["correo"].value == "") { 
         printerrorform("correo","has-error")
         document.getElementById("error_correo").innerHTML = "Ingrese el correo"; 
         return 1;
     }else if(testcorreo.test(document.formRegisterUser.correo.value.toLowerCase()))
     {  
         document.getElementById("error_correo").innerHTML = "";
         printerrorform("correo","has-success");
         return 0;
     }
     else{ 
         printerrorform("correo","has-warning");
         document.getElementById('error_correo').innerHTML="ingrese un correo valido ej. example@email.com";
         document.formRegisterUser.correo.focus();  
         return 1;
     } 
}
function onkeyuppassword(){ 
    ///contrasena
    const testcontrasena=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (document.forms["formRegisterUser"]["contrasena"].value == "") { 
        printerrorform("contrasena","has-error")
        document.getElementById("error_contrasena").innerHTML = "Ingrese la contrasena"; 
        return 1;
    } 
    else if(testcontrasena.test(document.formRegisterUser.contrasena.value)){  
        document.getElementById("error_contrasena").innerHTML = "";
        printerrorform("contrasena","has-success");
        return 0;
    }
    else{ 
        printerrorform("contrasena","has-warning");
        document.getElementById('error_contrasena').innerHTML="ingrese una contrasena valida";
        document.formRegisterUser.contrasena.focus();  
        return 1;
    }
}
function onkeyuprpassword(){ 
    ///contrasena Repetida 
    if (document.forms["formRegisterUser"]["rcontrasena"].value == "") { 
        printerrorform("rcontrasena","has-error")
        document.getElementById("error_rcontrasena").innerHTML = "Repita la contrasena"; 
        return 1;
    }
    else if (document.forms["formRegisterUser"]["rcontrasena"].value == document.forms["formRegisterUser"]["contrasena"].value) { 
        document.getElementById("error_rcontrasena").innerHTML = "";
        printerrorform("rcontrasena","has-success");
        return 0;
    }  
    else{ 
        printerrorform("rcontrasena","has-warning")
        document.getElementById("error_rcontrasena").innerHTML = "Ambas contrasenas deben coincidir"; 
        return 1;
    }  
}
function onkeyuptelefono(){
    if (document.forms["formRegisterUser"]["telefono"].value != "") {    
        if(document.forms["formRegisterUser"]["telefono"].value.length ==10){  
            var phoneNumberString=document.forms["formRegisterUser"]["telefono"].value 
            var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
            var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
            if (match) { 
                document.getElementById("error_telefono").innerHTML = "";
                printerrorform("telefono","has-success");
                document.forms["formRegisterUser"]["telefono"].value= '(' + match[1] + ') ' + match[2] + '-' + match[3]
                return 0;
            }
        } else{ 
            if(document.forms["formRegisterUser"]["telefono"].value.length ==14){ 
                document.getElementById("error_telefono").innerHTML = "";
                printerrorform("telefono","has-success");
                return 0;
             }else{ 
                printerrorform("telefono","has-error");
                return 1;
            }
            
        }
    }else{
        printerrorform("telefono","has-error");
        document.getElementById("error_telefono").innerHTML = "Ingrese el telefono";
        return 1;
    }
} 
function onkeyupdireccion(){ 
    ///Direccion
    if (document.forms["formRegisterUser"]["direccion"].value == "") { 
        printerrorform("direccion","has-error");
        document.getElementById("error_direccion").innerHTML = "Ingrese la direccion"; 
        return 1;
    } 
    else{
       document.getElementById("error_direccion").innerHTML = "";
       printerrorform("direccion","has-success"); 
       return 0;
    }
}
 ////Funcion register
function register(){
    //data
    const email = document.forms["formRegisterUser"]['correo'].value;
    const password = document.forms["formRegisterUser"]['contrasena'].value;  
    ////if the navigator containe geolocation
    if (navigator.geolocation) { 
        ///create User With Email And Password
        auth.createUserWithEmailAndPassword(email,password).then( cred =>{  
            ///Almacenar key del actual usuario logueado en localStorage 
            localStorage.removeItem("uid");
            localStorage.setItem("uid", cred.user.uid);
            ///get position
            navigator.geolocation.getCurrentPosition(function(position) { 
                ///cords
                var coordenadas = {
                    Latitud: position.coords.latitude, 
                    Longitud: position.coords.longitude
                } 
                //registrar nuevos datos en firebase database with id user auth
                return db.collection('cuentasusuarios').doc(cred.user.uid).set({
                    "nombre": document.forms["formRegisterUser"]['nombre'].value,
                    "apellido": document.forms["formRegisterUser"]['apellido'].value,
                    "correo":document.forms["formRegisterUser"]['correo'].value,
                    "telefono":document.forms["formRegisterUser"]['telefono'].value,
                    "direccion": document.forms["formRegisterUser"]['direccion'].value,
                    "coordenadas":coordenadas,
                    "fechaRegistro":new Date().toLocaleString(),
                    "tipo":"restaurante",
                    "estado":parseInt(1)
                }).then(function(result) { 
                    floatingMessage("Usuario Registrado!",result,"success");
                    ///clear form
                    document.forms["formRegisterUser"].reset();  
                    reiniciarestilosform();
                }).catch(function(error) {
                    floatingMessage(error.code,"","firebase");
                });

            }, function(error) {
                ////error al obtener coordenadas
                floatingMessage(error.title,error.message,"error");
            });
        }).catch( err => {  
            floatingMessage(err.code,"","firebase");
        });


    } else {
        floatingMessage("error al obtener las coordenadas","error ubicacion","error");
    }
    

};
////Funcion validar campos forms
function validarForms() {
    var errores=0;  
    errores+=onkeyupnombre();
    errores+=onkeyupapellido();
    errores+=onkeyupemail();
    errores+=onkeyuppassword();
    errores+=onkeyuprpassword();
    errores+=onkeyuptelefono();
    errores+=onkeyupdireccion(); 
    if(errores==0){ 
    return true;
    }else{
    return false;
    }
};
////funcion click button
function validator(){   
    if(validarForms().toString()=="true"){
        register();
    }else{
        floatingMessage("Formulario","Ingrese cada uno de los paramentros requeridos!","error");
    }
} 
///Telefono
var input = document.querySelector("#phone");
  window.intlTelInput(input, {
    // any initialisation options go here
    // initial country
    initialCountry:"mx",
    //preferredCountries: ["mx","us" ],
    onlyCountries: ["mx"]
  });