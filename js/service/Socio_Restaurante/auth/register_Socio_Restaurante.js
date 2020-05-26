const formRegister = document.getElementById('formRegister');

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
    

});