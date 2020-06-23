const perfildatosid= document.getElementById('perfildatosid');
const perfildatosidmodificar= document.getElementById('perfildatosidmodificar');

auth.onAuthStateChanged(user =>{
    if(user){
        var docRef = db.collection("cuentasusuarios").doc(user.uid);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                let html = '';
                let html2 = '';
                const perfil = doc.data();
                document.getElementById("username").innerHTML=perfil.nombre +" "+perfil.apellido;
                document.getElementById("welcometext").innerHTML="Bienvenid@  "+perfil.nombre.toUpperCase();
                const columna = `       
                <div class="ibox-title">
                <h5>Información del perfil</h5>
            </div>
            <div>
                <div class="ibox-content no-padding border-left-right ">
                   <!--<img alt="image" class="img-fluid" style="height: 350px; width: 350px; display: block; margin-left: auto; margin-right: auto;" src="img/profile.png">--> 
                    <img alt="image" class="img-fluid" style="height: 200px; width: 380px; display: block; margin-left: auto; margin-right: auto;" src="img/Pigmento.png">
                </div>
                
                <div class="ibox-content profile-content">
                    <h4>Nombre: <strong>${perfil.nombre}</strong></h4>
                    <h4>Apellido: <strong>${perfil.apellido}</strong></h4>
                    <h4>Correo electrónico: <strong>${perfil.correo}</strong></h4>
                    <h4>Contraseña: <strong>*******</strong></h4>
                    <h4>Teléfono: <strong>${perfil.telefono}</strong></h4>
                    <h4>Dirección: <strong>${perfil.direccion}</strong></h4>
                    <hr>
                </div>
            </div>
                `;
                html += columna;
                perfildatosid.innerHTML = html;
                const columna2 = `       
                <div class="feed-activity-list">

                                        <form role="form">
                                            <div class="form-group"><label>Nombre</label> <input type="text"
                                                    value="${perfil.nombre}" id="idnombre" class="form-control"></div>
                                            <div class="form-group"><label>Apellido</label> <input type="text"
                                            value="${perfil.apellido}" id="idapellido" class="form-control"></div>
                                            <div class="form-group"><label>Correo electrónico</label> <input
                                                    type="email" id="idcorreo" value="${perfil.correo}" 
                                                    class="form-control"></div>
                                            <div class="form-group"><label>Contraseña</label> <input type="password"
                                                    placeholder="Ingresar contraseña" class="form-control"></div>
                                            <div class="form-group"><label>N° Teléfono</label> <input type="text"
                                            value="${perfil.telefono}" id="idtelefono"  class="form-control"></div>
                                            <div class="form-group"><label>Dirección</label> <input type="text"
                                            value="${perfil.direccion}" id="iddireccion" class="form-control"></div>
                                        </form>
                                    </div>
                                    <div class="user-button">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <button type="button" class="btn btn-primary btn-sm btn-block" onclick="ActualizarPerfil()"><i
                                                        class="fa fa-envelope"></i> Actualizar información</button>
                                            </div>

                                        </div>
                                    </div>
                `;
                html2 += columna2;
                perfildatosidmodificar.innerHTML = html2;
            } else {
                // doc.data() will be undefined in this case
                perfildatosid.innerHTML='<p class="text-center"> No hay perfil</p>'
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
    else{
      console.log('no entro');
  }
  });
  function ActualizarPerfil(){
    auth.onAuthStateChanged(user =>{
        if(user){
            var docRef = db.collection("cuentasusuarios").doc(user.uid);
            docRef.get().then(function(doc) {
                if (doc.exists) {
                    const perfil = doc.data();
                    var DatosPersona = db.collection('cuentasusuarios')
                    DatosPersona.doc(user.uid).set({
                      nombre: document.getElementById('idnombre').value,
                      coordenadas: perfil.coordenadas,
                      estado: perfil.estado,
                      fechaRegistro: perfil.fechaRegistro,
                      tipo: perfil.tipo,
                      apellido: document.getElementById('idapellido').value,
                      correo: document.getElementById('idcorreo').value,
                      direccion: document.getElementById('iddireccion').value,
                      telefono: document.getElementById('idtelefono').value,
                  }
                  ).then(function() {
                      alert("Persona Modificado");
                      recargarDatosPerfil();
                      }).catch(function(error) {
                          console.error("Error adding document: ", error);
                      });
                } else {
                    console.log("Error getting document2:", error);
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

function recargarDatosPerfil(){
  auth.onAuthStateChanged(user =>{
    if(user){
        var docRef = db.collection("cuentasusuarios").doc(user.uid);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                let html = '';
                let html2 = '';
                const perfil = doc.data();
                const columna = `       
                <div class="ibox-title">
                <h5>Información del perfil</h5>
            </div>
            <div>
                <div class="ibox-content no-padding border-left-right ">
                   <!--<img alt="image" class="img-fluid" style="height: 350px; width: 350px; display: block; margin-left: auto; margin-right: auto;" src="img/profile.png">--> 
                    <img alt="image" class="img-fluid" style="height: 200px; width: 380px; display: block; margin-left: auto; margin-right: auto;" src="img/Pigmento.png">
                </div>
                
                <div class="ibox-content profile-content">
                    <h4>Nombre: <strong>${perfil.nombre}</strong></h4>
                    <h4>Apellido: <strong>${perfil.apellido}</strong></h4>
                    <h4>Correo electrónico: <strong>${perfil.correo}</strong></h4>
                    <h4>Contraseña: <strong>*******</strong></h4>
                    <h4>Teléfono: <strong>${perfil.telefono}</strong></h4>
                    <h4>Dirección: <strong>${perfil.direccion}</strong></h4>
                    <hr>
                </div>
            </div>
                `;
                html += columna;
                perfildatosid.innerHTML = html;
                const columna2 = `       
                <div class="feed-activity-list">

                                        <form role="form">
                                            <div class="form-group"><label>Nombre</label> <input type="text"
                                                    value="${perfil.nombre}" id="idnombre" class="form-control"></div>
                                            <div class="form-group"><label>Apellido</label> <input type="text"
                                            value="${perfil.apellido}" id="idapellido" class="form-control"></div>
                                            <div class="form-group"><label>Correo electrónico</label> <input
                                                    type="email" id="idcorreo" value="${perfil.correo}" 
                                                    class="form-control"></div>
                                            <div class="form-group"><label>Contraseña</label> <input type="password"
                                                    placeholder="Ingresar contraseña" class="form-control"></div>
                                            <div class="form-group"><label>N° Teléfono</label> <input type="text"
                                            value="${perfil.telefono}" id="idtelefono"  class="form-control"></div>
                                            <div class="form-group"><label>Dirección</label> <input type="text"
                                            value="${perfil.direccion}" id="iddireccion" class="form-control"></div>
                                        </form>
                                    </div>
                                    <div class="user-button">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <button type="button" class="btn btn-primary btn-sm btn-block" onclick="ActualizarPerfil()"><i
                                                        class="fa fa-envelope"></i> Actualizar información</button>
                                            </div>

                                        </div>
                                    </div>
                `;
                html2 += columna2;
                perfildatosidmodificar.innerHTML = html2;
            } else {
                // doc.data() will be undefined in this case
                perfildatosid.innerHTML='<p class="text-center"> No hay perfil</p>'
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