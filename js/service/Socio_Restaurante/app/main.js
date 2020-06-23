////aqui va tu codigo del restauranteconst RegistroPlatillo = document.getElementById('registroplatilloId');

const RegistrarRestauranteId = document.getElementById('registrorestaurantesId');
const RegistrarHorarioRestauranteId = document.getElementById('registrohorariorestaurantesId');
const listadeplatillos = document.getElementById('listadeplatillos');
const platilloeditar = document.getElementById('platilloeditar');
const menuconfiguracion = document.querySelectorAll('.menu-configuracion');
const menurestaurantes = document.querySelectorAll('.menu-restaurantes');

const listadeconfiguracion = document.getElementById('listadeconfiguracion');
const perfilesquina = document.getElementById('perfilesquina');
const listadeconfiguracionHorario = document.getElementById('listadeconfiguracionHorario');


const imagenDefault = "https://dam.cocinafacil.com.mx/wp-content/uploads/2019/08/comida-tailandesa.jpg";



auth.onAuthStateChanged(user =>{
  if(user){
    var RestauranteId = db.collection('Restauranes');
   RestauranteId.doc(user.uid).collection('Platillos').onSnapshot(snapshot =>{
   obtienePlatillos(snapshot.docs);}, err => { alert('Error de sistema'); });
   let html = '';
   const columna = `       
   <div class="dropdown profile-element">
                            <img alt="image" class="rounded-circle" style="margin-left: 35px" src="img/profile_small.jpg" />
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <span class="block m-t-xs font-bold">Restaurantes menú</span>
                                <span class="text-muted text-xs block">${user.email}<b class="caret"></b></span>
                            </a>
                            <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a class="dropdown-item" href="profile.html">Perfil</a></li>
                                <li class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="login.html">Cerrar Sesión</a></li>
                            </ul>
                        </div>
                        <div class="logo-element">
                            <img style="width: 25px; height: 25px;" src="img/icon-web/PigmentoFav.png">
                        </div>
   `;
   html += columna;   
   perfilesquina.innerHTML = html;
  }
  else{
    console.log('no entro');
}
});
 //Obtengo PLatillos
  const obtienePlatillos = (data) =>{
    if (data.length){
        let html = '';
        data.forEach(doc =>{
            const menuplatillo = doc.data();
            const columna = `       
            <div style="padding-top: 20px;">
            <div class="card promoting-card" onClick="EditarPlatillo('${doc.id}')" >
            <div class="d-flex flex-row">
              <div>      
                <h4 class="card-title font-weight-bold mb-2"><b>${menuplatillo.nombre}</b></h4>
                
              </div> 
            </div>
            <p style="color: red; 
            margin-bottom: 0px; "><b>${menuplatillo.estatus}</b></p> 
            <!-- Card image -->
            <div class="view overlay">
              <img class="card-img-top rounded-0" src="${imagenDefault}" alt="Card image cap">
              <a href="#!">
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>
            <!-- Card content -->
            <div class="card-body">
                <!-- Text -->
                <p class="card-text" >${menuplatillo.descripcion}</p>
                <p class="card-text"><strong>Ingredientes: </strong>${menuplatillo.ingredientes}</p>
                <!-- Button -->
    
               
              </div>
              <div class="btn" style="text-align:center;color: #A3A3A3; letter-spacing: 0.1em; background-color:#EEEEEE"><b>Precio: ${menuplatillo.precio}$</b></div>
            </div>
          </div>
          </div>
            `;
            html += columna;   
        });
        listadeplatillos.innerHTML = html;
    }
    else{listadeplatillos.innerHTML='<p class="text-center"> No hay platillos aún</p>'}
  
  };
  

  function RegistrarPlatillo(){
    auth.onAuthStateChanged(user =>{
      if(user){

        var Restaurantes = db.collection('Restauranes');
        Restaurantes.doc(user.uid).collection('Platillos').doc().set({
        nombre:  document.getElementById('idplatilloNombre').value,
        precio:  document.getElementById('idplatilloPrecio').value,
        photoURL: imagenDefault,
        descripcion:  document.getElementById('idplatilloDescripcion').value,
        ingredientes:  document.getElementById('idplatilloIngredientes').value,
        estatus:  document.getElementById('inputGroupSelect01').value
        
    }
    ).then(function() {
        alert("Platillo Agregado");
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });
      }
      else{
        console.log('no entro');
    }
    });
  
  
    };

function RegistrarRestaurante(){
  auth.onAuthStateChanged(user =>{
    if(user){
  var Restaurantes = db.collection('Restauranes');
  Restaurantes.doc(user.uid).set({
  photoURL: imagenDefault,
  tiempo_preparacion_restaurante:document.getElementById('idrestauranteTiempoPreparacion').value,
  nombre_restaurante: document.getElementById('idrestauranteNombre').value,
  telefono_restaurante: document.getElementById('idrestauranteTelefono').value,
  direccion_restaurante:document.getElementById('idrestauranteDireccion').value,
  categoria: document.getElementById('inputGroupSelect02').value,
  dia_lunes_restaurante:document.getElementById('idrestauranteLunes').value,
  dia_martes_restaurante:document.getElementById('idrestauranteMartes').value,
  dia_miercoles_restaurante:document.getElementById('idrestauranteMiercoles').value,
  dia_jueves_restaurante: document.getElementById('idrestauranteJueves').value,
  dia_viernes_restaurante: document.getElementById('idrestauranteViernes').value,
  dia_sabado_restaurante:document.getElementById('idrestauranteSabado').value,
  dia_domingo_restaurante: document.getElementById('idrestauranteDomingo').value,
}
).then(function() {
  alert("Restaurante Registrado");
  }).catch(function(error) {
      console.error("Error adding document: ", error);
  });
}
else{
  console.log('no entro');
}
});

};


function EliminarPlatillo(ideliminar){
  var ideliminar
  auth.onAuthStateChanged(user =>{
    if(user){

var PlatilloEliminar = db.collection('Restauranes')
PlatilloEliminar.doc(user.uid).collection('Platillos').doc(ideliminar).delete().then(function() {
  let html = '';
  platilloeditar.innerHTML = html;
  alert("Platillo Eliminado");
  }).catch(function(error) {
      alert("Error Al Eliminar PLatillo",error);
  });
}
else{
  console.log('no entro');
}
});
};


function EditarPlatillo(id){
  auth.onAuthStateChanged(user =>{
    if(user){
  let idPlatillo = id
var DatosPlatillo = db.collection('Restauranes')

    DatosPlatillo.doc(user.uid).collection('Platillos').doc(idPlatillo).get().then(function(doc) {
    if (doc.exists) {
      let html = '';
      const datoplatillo = doc.data();
      const columnaplatillo = `   
      <div class="input-group mb-2">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Platillo Nombre:</span>
          </div>
          <input type="text" class="form-control" id="idplatilloNombrem"  value="${datoplatillo.nombre}" aria-label="Default" aria-describedby="inputGroup-sizing-default" >
        </div>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Precio:</span>
          </div>
          <input type="text" class="form-control" id="idplatilloPreciom" value="${datoplatillo.precio}"  aria-label="Default" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Descripcion:</span>
          </div>
          <input type="text" class="form-control" id="idplatilloDescripcionm" value="${datoplatillo.descripcion}"  aria-label="Default" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Ingredientes:</span>
          </div>
          <input type="text" class="form-control" aria-label="Default" id="idplatilloIngredientesm" value="${datoplatillo.ingredientes}"  aria-describedby="inputGroup-sizing-default">
        </div>
       
        <div class="input-group mb-2">
          <div class="input-group-prepend" >
            <label class="input-group-text form-control" for="inputGroupSelect01">Estatus:</label>
          </div>
          <select class="custom-select" id="inputGroupSelect01m" >
            <option selected>${datoplatillo.estatus} </option>
            <option value="Agotado">Agotado</option>
            <option value="Existencia">Existencia</option>
          </select>
        </div>
        <button class="btn btn-primary " type="button" onclick="EliminarPlatillo('${doc.id}')" style="width: 50%;">Eliminar platillo</button>
         
        <button class="btn btn-primary" type="button" onclick="ModificarPlatillo('${doc.id}')" style="width: 48%;">Guardar cambios</button>
           `;
            html += columnaplatillo; 

            platilloeditar.innerHTML = html;
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
    }
    else{
      console.log('no entro');
    }
    });
}

function ModificarPlatillo(id){
  auth.onAuthStateChanged(user =>{
    if(user){
  let idPlatillo = id
  var DatosPlatillo = db.collection('Restauranes')
  DatosPlatillo.doc(user.uid).collection('Platillos').doc(idPlatillo).set({
    nombre: document.getElementById('idplatilloNombrem').value,
    precio: document.getElementById('idplatilloPreciom').value,
    photoURL: imagenDefault,
    descripcion: document.getElementById('idplatilloDescripcionm').value,
    ingredientes: document.getElementById('idplatilloIngredientesm').value,
    estatus: document.getElementById('inputGroupSelect01m').value
}
).then(function() {
    alert("Platillo Modificado");
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
  else{
    console.log('no entro');
  }
  });
}

function TraerRestaurantesInfo(){
  menurestaurantes.forEach( item => item.style.display = 'block');
menuconfiguracion.forEach( item => item.style.display = 'none');
}


function  TraerConfiguracionRestaurantes(){

  auth.onAuthStateChanged(user =>{
    if(user){
var DatosPlatillo = db.collection('Restauranes')

    DatosPlatillo.doc(user.uid).get().then(function(doc) {
    if (doc.exists) {
      let html = '';
      let html2 = '';
      const datorestaurante = doc.data();
      const columnaplatillo = `   
      
      <div class="input-group mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Restaurante Nombre:</span>
      </div>
      <input type="text" class="form-control"  value="${datorestaurante.nombre_restaurante}"id="idrestauranteNombre" aria-label="Default" aria-describedby="inputGroup-sizing-default">
    </div>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Tiempo Preparación:</span>
      </div>
      <input type="text" class="form-control" value="${datorestaurante.tiempo_preparacion_restaurante}"  id="idrestauranteTiempoPreparacion" aria-label="Default" aria-describedby="inputGroup-sizing-default">
    </div>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Telefono :</span>
      </div>
      <input type="text" class="form-control" value="${datorestaurante.telefono_restaurante}"  id="idrestauranteTelefono" aria-label="Default" aria-describedby="inputGroup-sizing-default">
    </div>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Dirección Restaurante:</span>
      </div>
      <input type="text" class="form-control"  value="${datorestaurante.direccion_restaurante}"  id="idrestauranteDireccion" aria-label="Default" aria-describedby="inputGroup-sizing-default">
    </div>
   
   

    <div class="input-group mb-2">
      <div class="input-group-prepend" >
        <label class="input-group-text form-control" for="inputGroupSelect02">Categoria Restaurante:</label>
      </div>
      <select class="form-control m-b" name="tipococina" id="inputGroupSelect02"> 
                        </select> 
   
  </div>
  
    <button onclick="RegistrarRestaurante()" type="button" class="btn btn-primary btn-block" value="Registrarse">Registrar Restaurante</button>

            `;
            html += columnaplatillo; 
            listadeconfiguracion.innerHTML = html;
            const columnaplatillo2 = `   
      
            <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Lunes:</span>
            </div>
            <input type="text" class="form-control" value="${datorestaurante.dia_lunes_restaurante}" id="idrestauranteLunes" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Martes:</span>
            </div>
            <input type="text" class="form-control" value="${datorestaurante.dia_martes_restaurante}" id="idrestauranteMartes" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Miercoles:</span>
            </div>
            <input type="text" class="form-control" value="${datorestaurante.dia_miercoles_restaurante}" id="idrestauranteMiercoles" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Jueves:</span>
            </div>
            <input type="text" class="form-control" value="${datorestaurante.dia_jueves_restaurante}" id="idrestauranteJueves" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Viernes:</span>
            </div>
            <input type="text" class="form-control" value="${datorestaurante.dia_viernes_restaurante}" id="idrestauranteViernes" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Sabado:</span>
            </div>
            <input type="text" class="form-control" value="${datorestaurante.dia_sabado_restaurante}" id="idrestauranteSabado" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Domingo:</span>
            </div>
            <input type="text" class="form-control" value="${datorestaurante.dia_domingo_restaurante}" id="idrestauranteDomingo" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>

        
          <button onclick=" RegistrarRestaurante()" type="button" class="btn btn-primary btn-block">Guardar Horario</button>

                  `;
                  html2 += columnaplatillo2; 
      
                  listadeconfiguracionHorario.innerHTML = html2;

        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        let html = '';
      let html2 = '';
      const datorestaurante = doc.data();
      const columnaplatillo = `   
      
      <div class="input-group mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Restaurante Nombre:</span>
      </div>
      <input type="text" class="form-control" id="idrestauranteNombre" aria-label="Default" aria-describedby="inputGroup-sizing-default">
    </div>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Tiempo Preparación:</span>
      </div>
      <input type="text" class="form-control"  id="idrestauranteTiempoPreparacion" aria-label="Default" aria-describedby="inputGroup-sizing-default">
    </div>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Telefono Restaurante:</span>
      </div>
      <input type="text" class="form-control"  id="idrestauranteTelefono" aria-label="Default" aria-describedby="inputGroup-sizing-default">
    </div>
    <div class="input-group mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">Dirección Restaurante:</span>
      </div>
      <input type="text" class="form-control"  id="idrestauranteDireccion" aria-label="Default" aria-describedby="inputGroup-sizing-default">
    </div>
   
   

    <div class="input-group mb-2">
      <div class="input-group-prepend" >
        <label class="input-group-text form-control" for="inputGroupSelect02">Categoria Restaurante:</label>
      </div>
      <select class="form-control m-b" name="tipococina" id="inputGroupSelect02"> 
                        </select> 
   
  </div>
  
    <button onclick="RegistrarRestaurante()" type="button" class="btn btn-primary btn-block" value="Registrarse">Registrar restaurante</button>

            `;
            html += columnaplatillo; 
            listadeconfiguracion.innerHTML = html;
            const columnaplatillo2 = `   
      
            <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Lunes:</span>
            </div>
            <input type="text" class="form-control"  id="idrestauranteLunes" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Martes:</span>
            </div>
            <input type="text" class="form-control" id="idrestauranteMartes" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Miercoles:</span>
            </div>
            <input type="text" class="form-control" id="idrestauranteMiercoles" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Jueves:</span>
            </div>
            <input type="text" class="form-control"  id="idrestauranteJueves" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Viernes:</span>
            </div>
            <input type="text" class="form-control" id="idrestauranteViernes" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Sabado:</span>
            </div>
            <input type="text" class="form-control"  id="idrestauranteSabado" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Domingo:</span>
            </div>
            <input type="text" class="form-control" id="idrestauranteDomingo" aria-label="Default" aria-describedby="inputGroup-sizing-default">
          </div>

        
          <button onclick=" RegistrarRestaurante()" type="button" class="btn btn-primary btn-block">Registrar horario</button>

                  `;
                  html2 += columnaplatillo2; 
      
                  listadeconfiguracionHorario.innerHTML = html2;
    }
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
}).catch(function(error) {
    console.log("Error getting document:", error);
});
  menurestaurantes.forEach( item => item.style.display = 'none');
menuconfiguracion.forEach( item => item.style.display = 'block');

}
else{
  console.log('no entro');
}
});

};


