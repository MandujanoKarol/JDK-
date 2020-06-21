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
