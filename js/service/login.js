///funcion de mensaje de error
function mensajeError(codigo) { 
    let mensaje = ''; 
    switch(codigo) {
        case 'auth/wrong-password':
          mensaje = 'Su contraseña no es correcta';
          break;
        case 'auth/user-not-found':
            mensaje = 'El usuario no existe o el correo no esta registrado';
            break;
        case 'auth/weak-password':
            mensaje = 'Contraseña débil debe tener al menos 6 caracteres';
            break;
        case 'auth/network-request-failed':
            mensaje = 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.';
            break;
        case 'auth/weak-password':
            mensaje = 'Password should be at least 6 characters';
            break;
        case 'auth/email-already-in-use':
            mensaje = 'The email address is already in use by another account.';
            break;
        default:
            mensaje = 'Ocurrió un error al ingresar con este usuario';
      }
    return mensaje;
}

////DOM form  LogIn
const formLogIn =  document.getElementById('formLogIn'); 
////DOM form  LogIn event  submit on button LogIn
formLogIn.addEventListener('submit',(e)=>{
    e.preventDefault();
    ///print test
    console.log(formLogIn['email'].value+"  "+formLogIn['password'].value );

    ////Data
    let email = formLogIn['email'].value;
    let password = formLogIn['password'].value; 
    ////if the navigator containe geolocation
    if (navigator.geolocation) {  
        ///signIn With Email And Password
        auth.signInWithEmailAndPassword(email,password).then( cred =>{  
        ///clear form
        formLogIn.reset();   
        ///SAVE key current user on localStorage
        localStorage.removeItem("uid");
        localStorage.setItem("uid", cred.user.uid);
            ///get Current Position
            navigator.geolocation.getCurrentPosition(function(position) { 
                ///coords
                var coords = {
                    Latitude: position.coords.latitude, 
                    Longitude: position.coords.longitude
                } 
                ///update user data on database firebase
                return db.collection('usuarios').doc(cred.user.uid).update({
                    "coords":coords,
                    "status":parseInt(1)
                }); 
            }, function(error) { 
                console.log(error);
            }); 

    }).catch( err => { 
        //error notification 
        var error=mensajeError(err.code);
         ///error print console
         console.log(err);
    });
    } else {
         ///error print console
        console.log("Ubication error");
    }
    
});
