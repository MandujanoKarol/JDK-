///Formulario de registro
const formRegister = document.getElementById('formRegister');
///carga cuando el documento ya este listo
$(document).ready(function() { 
    ///mostrar los tipo de cocina
    fetch("js/api/tipos_cocina.json")
    .then(response => {  
        ///get element por nombre
        ///solo la primera coincidencia
        var select = document.getElementsByName("tipococina")[0];
        response.json().then(function(dato) {  
            ///ciclo arreglo de respuesta  
            dato.tiposcocina.forEach( tipo => { 
                ///creo un elemento objectPosition
                ///agrego value y text en la option
                var option = document.createElement("option");
                option.value = tipo;
                option.text = tipo;
                ///agrego a el select la option
                select.add(option);
            });
        });
    })
    .catch(err => {
        console.log(err);
    });
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