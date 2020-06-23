var misplatillospreparacion=[];
var uid = localStorage.getItem("uid"); 
$(document).ready(function() {   
    db.collection("compras").where("uidusuario", "==", uid).where("estado", "==",1).onSnapshot(function(querySnapshot) { 
        misplatillospreparacion=[];
        misplatillospreparacion=querySnapshot 


        querySnapshot.forEach(function(doc) {   


            db.collection('Restauranes').doc(doc.data().docidrestaurante).get().then( restaurante => { 


                db.collection("Restauranes").doc(doc.data().docidrestaurante).collection("Platillos").doc(doc.data().docidplatillo).get()
                .then(platillo => { 
                    console.log(restaurante.data());
                    console.log(platillo.data());


                    var tr = document.createElement("tr"); 
                    tr.setAttribute("id", "tr" + platillo.id); 
                    document.getElementById('listapedidospreparacion').appendChild(tr); 
    
                    var tdnombreproducto = document.createElement("td");  
                    tdnombreproducto.textContent = platillo.data().nombre;
                    document.getElementById("tr" + platillo.id).appendChild(tdnombreproducto); 
    
                    var tdnombrerestaurante = document.createElement("td");  
                    tdnombrerestaurante.textContent = restaurante.data().nombre_restaurante;
                    document.getElementById("tr" + platillo.id).appendChild(tdnombrerestaurante);  

                    var tdplatillodescripcion = document.createElement("td");  
                    tdplatillodescripcion.textContent = platillo.data().descripcion;
                    document.getElementById("tr" + platillo.id).appendChild(tdplatillodescripcion); 

                    var tdplatilloprecio = document.createElement("td");  
                    tdplatilloprecio.textContent = "$"+platillo.data().precio;
                    document.getElementById("tr" + platillo.id).appendChild(tdplatilloprecio); 


                    var tdaction = document.createElement("td"); 
                    tdaction.setAttribute("class", "text-right");
                    tdaction.setAttribute("id", "tdaction" + platillo.id); 
                    document.getElementById("tr" + platillo.id).appendChild(tdaction);

                    var divbuttons = document.createElement("div");  
                    divbuttons.setAttribute("class", "btn-group");
                    divbuttons.setAttribute("id", "divbuttons" + platillo.id);
                    document.getElementById("tdaction" + platillo.id).appendChild(divbuttons);

                    var button1 = document.createElement("button");  
                    button1.setAttribute("class", "btn-white btn btn-xs"); 
                    button1.textContent =  "ver";
                    button1.setAttribute("OnClick", "ver(" + JSON.stringify( doc.data().uidrepartidor )+")");
                    document.getElementById( "divbuttons" + platillo.id).appendChild(button1); 



                });
            
            
            
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
function ver(uidrepartidor){

}


function iniciaMapa(){ 
    var styledMapType = new google.maps.StyledMapType(
      [
{
  "featureType": "all",
  "elementType": "labels.text.fill",
  "stylers": [
      {
          "color": "#7c93a3"
      },
      {
          "lightness": "-10"
      }
  ]
},
{
  "featureType": "administrative.country",
  "elementType": "geometry",
  "stylers": [
      {
          "visibility": "on"
      }
  ]
},
{
  "featureType": "administrative.country",
  "elementType": "geometry.stroke",
  "stylers": [
      {
          "color": "#a0a4a5"
      }
  ]
},
{
  "featureType": "administrative.province",
  "elementType": "geometry.stroke",
  "stylers": [
      {
          "color": "#62838e"
      }
  ]
},
{
  "featureType": "landscape",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "color": "#dde3e3"
      }
  ]
},
{
  "featureType": "landscape.man_made",
  "elementType": "geometry.stroke",
  "stylers": [
      {
          "color": "#3f4a51"
      },
      {
          "weight": "0.30"
      }
  ]
},
{
  "featureType": "poi",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "simplified"
      }
  ]
},
{
  "featureType": "poi.attraction",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "on"
      }
  ]
},
{
  "featureType": "poi.business",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "poi.government",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "poi.park",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "on"
      }
  ]
},
{
  "featureType": "poi.place_of_worship",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "poi.school",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "poi.sports_complex",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "road",
  "elementType": "all",
  "stylers": [
      {
          "saturation": "-100"
      },
      {
          "visibility": "on"
      }
  ]
},
{
  "featureType": "road",
  "elementType": "geometry.stroke",
  "stylers": [
      {
          "visibility": "on"
      }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "color": "#bbcacf"
      }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry.stroke",
  "stylers": [
      {
          "lightness": "0"
      },
      {
          "color": "#bbcacf"
      },
      {
          "weight": "0.50"
      }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "labels",
  "stylers": [
      {
          "visibility": "on"
      }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "labels.text",
  "stylers": [
      {
          "visibility": "on"
      }
  ]
},
{
  "featureType": "road.highway.controlled_access",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "color": "#ffffff"
      }
  ]
},
{
  "featureType": "road.highway.controlled_access",
  "elementType": "geometry.stroke",
  "stylers": [
      {
          "color": "#a9b4b8"
      }
  ]
},
{
  "featureType": "road.arterial",
  "elementType": "labels.icon",
  "stylers": [
      {
          "invert_lightness": true
      },
      {
          "saturation": "-7"
      },
      {
          "lightness": "3"
      },
      {
          "gamma": "1.80"
      },
      {
          "weight": "0.01"
      }
  ]
},
{
  "featureType": "transit",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "water",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "color": "#a3c7df"
      }
  ]
}
],{name: 'Mapa Pigemento'});
     
          db.collection('cuentasusuarios').doc(uid).get().then( docuser =>{ 
          lt1=docuser.data().coordenadas.Latitud;
          lg1=docuser.data().coordenadas.Longitud;
          map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: docuser.data().coordenadas.Latitud, lng: docuser.data().coordenadas.Longitud} ,
          zoom: 17,
          ///disableDefaultUI: true,
          mapTypeControl: false,
          panControl:false,
          zoomControl:true,
          scaleControl:false,
          streetViewControl:false,
          overviewMapControl:false,
          rotateControl:false
          });

          //Associate the styled map with the MapTypeId and set it to display.
          map.mapTypes.set('styled_map', styledMapType);
          map.setMapTypeId('styled_map');

          var informaciónusuario = "";   
            const htmluser = ` 
            <div class="card">
              <div class="card-header text-left">
              <p class="card-text"><i style="color:green " class="fa fa-circle" aria-hidden="true"></i> Activo</p>
            </div>
            <div class="card-body">
              <h5 class="card-title">${ docuser.data().nombre }</h5>
              <p class="card-text">Correo: ${ docuser.data().correo}</p>
              <p class="hint-text">Telefono: Teléfono: ${ docuser.data().telefono }</p>
              <p class="hint-text">Dirección: ${ docuser.data().direccion }</p> 
            </div>
            <div class="card-footer text-muted">
              Inicio de sesion: ${ docuser.data().dateInOut }
            </div>
          </div>
            `; 
            informaciónusuario = htmluser;
          
          
          var infowindowuser = new google.maps.InfoWindow({
                                  content: informaciónusuario
          });
          var iconouser = {
          url: "img/icons-map/user.png", // url imagen
                scaledSize: new google.maps.Size(50, 50)
          };
          let markeruser = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(docuser.data().coordenadas.Latitud,docuser.data().coordenadas.Longitud),
          title: user.email,
          icon: iconouser
          }); 
          markeruser.addListener('click', function() {
            infowindowuser.open(map, markeruser);
          }); 
          db.collection('usuarios').get().then( querySnapshot =>{
                       
                      querySnapshot.forEach(function (doc) { 
                        if(doc.id != user.uid){   
                          addMarker(doc)
                        }
            }); 
          }); 
          console.log(markers);
        });  

  
}