////DOM form  User
const formRegisterUser = document.getElementById('formRegisterUser');
////DOM form  User evento submit button register
formRegisterUser.addEventListener('submit',(e)=>{
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
    

});