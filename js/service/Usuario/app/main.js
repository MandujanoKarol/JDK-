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
});    
auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      db.collection('cuentasusuarios').doc(user.uid).get().then( doc =>{ 
        document.getElementById("username").innerHTML=doc.data().nombre +" "+doc.data().apellido;
        document.getElementById("welcometext").innerHTML="Bienvenid@  "+doc.data().nombre.toUpperCase();
     });  
    } else {
        // User is signed out.
        window.location.href = "registroUsuario.html"; 
    }
  });
  function cerrarSesion(){
    var uid = localStorage.getItem("uid");
    auth.signOut().then(()=>{  
        localStorage.removeItem("uid");
        return db.collection('cuentasusuarios').doc(uid).update({ 
            "estado":parseInt(0)
        });  
    }).then(()=>{
        window.location.href = "login.html"; 
    });
  }