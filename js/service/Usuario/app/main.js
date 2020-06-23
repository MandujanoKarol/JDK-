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

    db.collection('Restauranes').get().then( queryCollection => {
        limpiarareasplatillos();
        queryCollection.forEach(doccollection => {
            ///documents
            ////console.log(doc.id, " => ", doc.data());  
            ////subcollection
            db.collection("Restauranes").doc(doccollection.id).collection("Platillos").get()
            .then(docSubCollection => { 
                todosplatillos(doccollection,docSubCollection);
            }); 
        });
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
function limpiarareasplatillos(){ 
    document.getElementById('div1').innerHTML = "";
    document.getElementById('div2').innerHTML = "";
    document.getElementById('div3').innerHTML = "";
    document.getElementById('div4').innerHTML = "";
    document.getElementById('div5').innerHTML = "";
    document.getElementById('div6').innerHTML = "";
    document.getElementById('div7').innerHTML = "";
    document.getElementById('div8').innerHTML = "";
}
var ifbusqueda= 0;
function buscarplatillostipo(sel){  
    var categoria=sel.value;
    ifbusqueda=0;
    console.log("categoria a buscar:" +categoria);
    db.collection('Restauranes').get().then( queryCollection => {
        limpiarareasplatillos();
        queryCollection.forEach(doccollection => { 
            if(doccollection.data().categoria===categoria){
                ifbusqueda=1;
                document.getElementById('mensajelistaplatillos').innerHTML = "";
            db.collection("Restauranes").doc(doccollection.id).collection("Platillos").get()
            .then(docSubCollection => { 
                todosplatillos(doccollection,docSubCollection);
            }); 
            }else{
                if(ifbusqueda===0){
                    document.getElementById('mensajelistaplatillos').innerHTML = "Actualmente no hay ningun tipo de comida: "+categoria;
                }
            }
        });
    });     
}
var tem=1;
var position=0;
function todosplatillos(doccollection,docSubCollection){ 
    var divs=["div1","div2","div3","div4","div5","div6","div7","div8"];
    var cants=[4,8,12,16,20,24,28,32]; 
    docSubCollection.forEach(doc => {  
        if(tem==cants[position]){
            position++;
        }  
        var x = document.createElement("div");
        x.setAttribute("class", "col-md-3");
        x.setAttribute("id", "div" + doc.id); 
        document.getElementById(divs[position]).appendChild(x); 

        var divibox = document.createElement("div");
        divibox.setAttribute("class", "ibox"); 
        divibox.setAttribute("id", "divibox" + doc.id);
        document.getElementById("div" + doc.id).appendChild(divibox);
        
        var diviboxcontent = document.createElement("div");
        diviboxcontent.setAttribute("class", "ibox-content product-box"); 
        diviboxcontent.setAttribute("id", "diviboxcontent" + doc.id);
        document.getElementById("divibox" + doc.id).appendChild(diviboxcontent);
        ///imagen
        var divproductimitation = document.createElement("div");
        divproductimitation.setAttribute("class", "product-imitationfood"); 
        divproductimitation.setAttribute("id", "divproductimitation" + doc.id);
        document.getElementById("diviboxcontent" + doc.id).appendChild(divproductimitation);

        var img = document.createElement("img");
        img.setAttribute("class", "img-fluid"); 
        img.setAttribute("src", doc.data().photoURL);
        document.getElementById("divproductimitation" + doc.id).appendChild(img);

        var divproductdesc = document.createElement("div");
        divproductdesc.setAttribute("class", "product-desc"); 
        divproductdesc.setAttribute("id", "divproductdesc" + doc.id);
        document.getElementById("diviboxcontent" + doc.id).appendChild(divproductdesc);
        //precio
        var spanproductprice = document.createElement("span");
        spanproductprice.setAttribute("class", "product-price"); 
        spanproductprice.textContent = "$"+ doc.data().precio;
        document.getElementById("divproductdesc" + doc.id).appendChild(spanproductprice);
        //categoria
        var smalltextmuted = document.createElement("small");
        smalltextmuted.setAttribute("class", "text-muted"); 
        smalltextmuted.textContent = doccollection.data().categoria;
        document.getElementById("divproductdesc" + doc.id).appendChild(smalltextmuted);

        var aproductname = document.createElement("a");
        aproductname.setAttribute("class", "product-name"); 
        aproductname.textContent = doc.data().nombre;
        document.getElementById("divproductdesc" + doc.id).appendChild(aproductname);

        var divdescription = document.createElement("div");
        divdescription.setAttribute("class", "small m-t-xs"); 
        divdescription.textContent = doc.data().descripcion;
        document.getElementById("divproductdesc" + doc.id).appendChild(divdescription);

        var divbutton = document.createElement("div");
        divbutton.setAttribute("class", "m-t text-righ"); 
        divbutton.setAttribute("id", "divbutton" + doc.id); 
        document.getElementById("divproductdesc" + doc.id).appendChild(divbutton);

        if(doc.data().estatus!="Agotado"){
        var abutton = document.createElement("a");
        abutton.setAttribute("class", "btn btn-xs btn-outline btn-primary"); 
        abutton.setAttribute("id", "abutton" + doc.id); 
        abutton.setAttribute("OnClick", "comprarproducto(" + JSON.stringify( doccollection.id )+","+JSON.stringify( doc.id )+ ")");
        abutton.textContent = "Comprar";
        document.getElementById("divbutton" + doc.id).appendChild(abutton); 
        }else{ 
            var textagotado = document.createElement("span");
            textagotado.setAttribute("class", "label label-danger float-right"); 
            textagotado.textContent = "Agotado";
            document.getElementById("divbutton" + doc.id).appendChild(textagotado);
        }
        tem++;
    }); 
    tem=1;
    position=0;
}
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
function comprarproducto(iddocRestaurante,iddocplatillo){
    var uid = localStorage.getItem("uid"); 
    return db.collection('compras').doc().set({
        "docidrestaurante": iddocRestaurante,
        "docidplatillo": iddocplatillo,
        "uidrepartidor":"",
        "uidusuario":uid, 
        "fechaCompra":new Date().toLocaleString(), 
        "estado":parseInt(0)/////0 en preparacion////1 encamino/////2 entregado
    }).then(function(result) { 
        floatingMessage("Pedido realizado!","Tu pedido esta en preparacion!","success");
    }).catch(function(error) {
        floatingMessage(error.code,"","firebase");
    });
}