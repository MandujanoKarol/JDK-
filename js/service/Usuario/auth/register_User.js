////DOM form  User
const formRegisterUser = document.getElementById('formRegisterUser');
////DOM form  User evento submit button register
/*formRegisterUser.addEventListener('submit',(e)=>{
    e.preventDefault(); 
    //data
    const email = formRegisterUser['remail'].value;
    const password = formRegisterUser['rpassword'].value;  
    ////if the navigator containe geolocation
    if (navigator.geolocation) {
        ///create User With Email And Password
        auth.createUserWithEmailAndPassword(email,password).then( cred =>{ 
            ///clear form
            formRegisterUser.reset();   
            ///Almacenar key del actual usuario logueado en localStorage 
            localStorage.removeItem("uid");
            localStorage.setItem("uid", cred.user.uid);
            navigator.geolocation.getCurrentPosition(function(position) { 
                var coordenadas = {
                    Latitud: position.coords.latitude, 
                    Longitud: position.coords.longitude
                } 
                return db.collection('usuarios').doc(cred.user.uid).set({
                    "nombre": formRegisterUser['rnombre'].value,
                    "telefono": formRegisterUser['rtelefono'].value,
                    "correo": formRegisterUser['rcorreo'].value,
                    "direccion": formRegisterUser['rdireccion'].value,
                    "coordenadas":coordenadas,
                    "dateInOut":new Date().toLocaleString(),
                    "estado":parseInt(1)
                }).then(function() { 
                    formRegisterUser.reset();
                    document.getElementById('errorregistrar').innerHTML = ''; 
                   // window.location.replace("index.html");
                    //window.location.replace("https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/index.html");
                }).catch(function(error) {
                        console.error("Error regitering document: ", error);
                });
            }, function(error) {
                console.log(error);
            });
        
        
    }).then( ()=>{ 
        
    }).catch( err => {
        console.log(err);
        document.getElementById('errorregistrar').innerHTML = mensajeError(err.code);
    });
    } else {
        console.log("error ubicacion");
    }
    

});*/

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
                    console.log(results[1]); 
                    var arreglo = results[1].formatted_address.split(",",4);
                    var direccion=arreglo[0];
                    var ciudad=arreglo[2];  
                    document.forms["formRegisterUser"]["direccion"].value =direccion.trim();
                    document.forms["formRegisterUser"]["ciudad"].value =ciudad.trim();
                    }
                }
            });
            console.log(latlng);
        }, function(error) {
            console.log(error);
        });
    }
    else {
        console.log("error ubicacion");
    }

 });
function validate() {
    
    var errores=0;  
        ///Nombre
        if (document.forms["formRegisterUser"]["nombre"].value == "") { 
            printerrorform("nombre","has-error")
            document.getElementById("error_nombre").innerHTML = "enter the firstname";
            errores++;
        }
        else if(!/^[a-zA-Z]*$/g.test(document.formRegisterUser.nombre.value))
        { 
            //alert("hello");
            printerrorform("nombre","has-warning");
            document.getElementById('error_nombre').innerHTML="only alphanumeric character  required";
            document.formRegisterUser.nombre.focus();
            return false;
        }
        else{
           document.getElementById("error_nombre").innerHTML = "";
           printerrorform("nombre","has-success")
        } 

        ///Apellido
        if (document.forms["formRegisterUser"]["apellido"].value == "") { 
            printerrorform("apellido","has-error")
            document.getElementById("error_apellido").innerHTML = "Ingrese el apellido";
        errores++;
        }
        else if(!/^[a-zA-Z]*$/g.test(document.formRegisterUser.apellido.value))
        {  
            printerrorform("apellido","has-warning");
            document.getElementById('error_apellido').innerHTML="only alphanumeric character  required";
            document.formRegisterUser.apellido.focus(); 
            return false;
        }
        else{
           document.getElementById("error_apellido").innerHTML = "";
           printerrorform("apellido","has-success")
        } 
        ///Correo electronico
        const testcorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (document.forms["formRegisterUser"]["correo"].value == "") { 
            printerrorform("correo","has-error")
            document.getElementById("error_correo").innerHTML = "Ingrese el correo";
        errores++;
        }else if(testcorreo.test(document.formRegisterUser.correo.value.toLowerCase()))
        {  
            document.getElementById("error_correo").innerHTML = "";
            printerrorform("correo","has-success");
        }
        else{ 
            printerrorform("correo","has-warning");
            document.getElementById('error_correo').innerHTML="ingrese un correo valido ej. example@email.com";
            document.formRegisterUser.correo.focus(); 
            errores++;
            return false;
        } 
        ///contrasena
        const testcontrasena=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (document.forms["formRegisterUser"]["contrasena"].value == "") { 
            printerrorform("contrasena","has-error")
            document.getElementById("error_contrasena").innerHTML = "Ingrese la contrasena";
            errores++;
        } 
        else if(testcontrasena.test(document.formRegisterUser.contrasena.value)){  
            document.getElementById("error_contrasena").innerHTML = "";
            printerrorform("contrasena","has-success");
        }
        else{ 
            printerrorform("contrasena","has-warning");
            document.getElementById('error_contrasena').innerHTML="ingrese una contrasena valida";
            document.formRegisterUser.contrasena.focus(); 
            errores++; 
            return false;
        } 
        ///contrasena Repetida 
        if (document.forms["formRegisterUser"]["rcontrasena"].value == "") { 
            printerrorform("rcontrasena","has-error")
            document.getElementById("error_rcontrasena").innerHTML = "Repita la contrasena";
            errores++;
        }
        else if (document.forms["formRegisterUser"]["rcontrasena"].value == document.forms["formRegisterUser"]["contrasena"].value) { 
            document.getElementById("error_rcontrasena").innerHTML = "";
            printerrorform("rcontrasena","has-success");
        }  
        else{ 
            printerrorform("rcontrasena","has-warning")
            document.getElementById("error_rcontrasena").innerHTML = "Ambas contrasenas deben coincidir";
            errores++;
            return false;
        }  
        ///telefono
        const testtelefono=/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        if (document.forms["formRegisterUser"]["telefono"].value == "") { 
            printerrorform("telefono","has-error")
            document.getElementById("error_telefono").innerHTML = "Ingrese el telefono";
            errores++;
        } 
        else if(testtelefono.test(document.formRegisterUser.telefono.value)){  
            document.getElementById("error_telefono").innerHTML = "";
            printerrorform("telefono","has-success");
        }
        else{ 
            printerrorform("telefono","has-warning");
            document.getElementById('error_telefono').innerHTML="ingrese una telefono valido";
            document.formRegisterUser.telefono.focus(); 
            errores++; 
            return false;
        } 
        ///Direccion
        if (document.forms["formRegisterUser"]["direccion"].value == "") { 
            printerrorform("direccion","has-error")
            document.getElementById("error_direccion").innerHTML = "enter the direccion";
            errores++;
        } 
        else{
           document.getElementById("error_direccion").innerHTML = "";
           printerrorform("direccion","has-success"); 
        }
        ///Ciudad
        if (document.forms["formRegisterUser"]["ciudad"].value == "") { 
            printerrorform("ciudad","has-error")
            document.getElementById("error_ciudad").innerHTML = "enter the ciudad";
            errores++;
        }
        else if(!/^[a-zA-Z]*$/g.test(document.formRegisterUser.ciudad.value))
        {  
            printerrorform("ciudad","has-warning");
            document.getElementById('error_ciudad').innerHTML="only alphanumeric character  required";
            document.formRegisterUser.ciudad.focus();
            return false;
        }
        else{
           document.getElementById("error_ciudad").innerHTML = "";
           printerrorform("ciudad","has-success")
        } 
        ///si hay errores
        if(errores!=0){ 
            return false;
        }
    
}

function separartelefono(){
    if (document.forms["formRegisterUser"]["telefono"].value != "") {    
        if(document.forms["formRegisterUser"]["telefono"].value.length ==10){  
            var phoneNumberString=document.forms["formRegisterUser"]["telefono"].value 
            var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
            var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
            if (match) { 
                document.getElementById("error_telefono").innerHTML = "";
                printerrorform("telefono","has-success");
                document.forms["formRegisterUser"]["telefono"].value= '(' + match[1] + ') ' + match[2] + '-' + match[3]
                
            }
        } else{ 
            if(document.forms["formRegisterUser"]["telefono"].value.length ==14){ 
                document.getElementById("error_telefono").innerHTML = "";
                printerrorform("telefono","has-success");
             }else{
                printerrorform("telefono","has-error");
            }
            
        }
    }
} 
var input = document.querySelector("#phone");
  window.intlTelInput(input, {
    // any initialisation options go here
    // initial country
    initialCountry:"mx",
    //preferredCountries: ["mx","us" ],
    onlyCountries: ["mx"]
  });
  