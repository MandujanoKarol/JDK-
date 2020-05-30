///Formulario de registro
const formRegister = document.getElementById('formRegister');
$(document).ready(function() { 
    fetch("js/api/tipos_cocina.json")
    .then(response => {  
        var select = document.getElementsByName("tipococina")[0];
        response.json().then(function(dato) {    
            dato.tiposcocina.forEach( tipo => { 
                var option = document.createElement("option");
                option.text = tipo;
                select.add(option);
            });
        });
    })
    .catch(err => {
        console.log(err);
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {  
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
                    console.log(results[1].formatted_address);
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


formRegister.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(formRegister['rcorreo'].value
    +"  "+formRegister['rcontrasena'].value
    +"  "+formRegister['rnombre'].value
    +"  "+formRegister['rtelefono'].value
    +"  "+formRegister['rdireccion'].value );

    const correo = formRegister['rcorreo'].value;
    const contrasena = formRegister['rcontrasena'].value;

    
    if (navigator.geolocation) {
        auth.createUserWithEmailAndPassword(correo,contrasena).then( cred =>{  
            sessionStorage.removeItem("uid");
            sessionStorage.setItem("uid", cred.user.uid);
            navigator.geolocation.getCurrentPosition(function(position) { 
                var coordenadas = {
                    Latitud: position.coords.latitude, 
                    Longitud: position.coords.longitude
                } 
                return db.collection('usuarios').doc(cred.user.uid).set({
                    "nombre": formRegister['rnombre'].value,
                    "telefono": formRegister['rtelefono'].value,
                    "correo": formRegister['rcorreo'].value,
                    "direccion": formRegister['rdireccion'].value,
                    "coordenadas":coordenadas,
                    "dateInOut":new Date().toLocaleString(),
                    "estado":parseInt(1)
                }).then(function() { 
                    formRegister.reset();
                    document.getElementById('errorregistrar').innerHTML = '';  
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
    

});