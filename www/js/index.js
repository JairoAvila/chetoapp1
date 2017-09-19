function validacionAcceso(){
    if(localStorage.token){
        //alert();
        if(localStorage.rol == 4 || localStorage.rol == 1){
            //alert('rol4');
            if(localStorage.telefono != 0 && localStorage.telefono != undefined && localStorage.telefono != null && localStorage.telefono !="" && localStorage.telefono !='null' && localStorage.telefono !="null"){
                if(localStorage.tt == undefined || localStorage.tt == null || localStorage.tt == ""){
                    //mostrarpagina('tarjeta');
                    window.location.href = 'main.html#tarjeta';
                }else{
                    window.location.href = 'main.html#reserva';
                    //$.mobile.changePage( "main.html#reserva", { transition: "slice", changeHash: true }, true, true);
                   //$('.btn_menu').toggleClass('usuario');
                   //mostrarpagina('reserva');
                }
            }else{
                window.location.href = 'main.html#actualizartel';
                 //$.mobile.changePage( "main.html#actualizartel", { transition: "slice", changeHash: true }, true, true);
                //mostrarpagina('actualizartel');
            }
        }else if(localStorage.rol == 3){
            //alert('rol 3');
            window.location.href = 'main.html#homeconductor';
            //$.mobile.changePage( "main.html#homeconductor", { transition: "slice", changeHash: true }, true, true);
            traerServicios();
            //mostrarpagina('home');
        }else{
            window.location.href = 'main.html#login';            
            //$.mobile.changePage( "main.html#login", { transition: "fade", changeHash: true }, true, true);
            //$('#login').addClass('active');      
        }
        //window.location.href = 'main.html#principal';        
    }else{
        window.location.href = 'main.html#login';            
    }
}

console.log(navigator.platform);
if(navigator.platform == 'Win32'){
    validacionAcceso();
}else{
    document.addEventListener("resume", validacionAcceso, false); 
    var app = {    
        // Application Constructor
        initialize: function() {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        },

        // deviceready Event Handler
        //
        // Bind any cordova events here. Common events are:
        // 'pause', 'resume', etc.
        onDeviceReady: function() {
            this.receivedEvent('deviceready');
        },

        // Update DOM on a Received Event
        receivedEvent: function(id) {
            //var parentElement = document.getElementById(id);
            //var listeningElement = parentElement.querySelector('.listening');
            //var receivedElement = parentElement.querySelector('.received');

//            listeningElement.setAttribute('style', 'display:none;');
//            receivedElement.setAttribute('style', 'display:block;');
 
            
            validacionAcceso();               
            cordova.plugins.backgroundMode.enable();
            cordova.plugins.backgroundMode.setDefaults({
                title: 'cheto',
                text: 'Esta ejecutandose en segundo plano',
                icon: 'icon', // this will look for icon.png in platforms/android/res/drawable|mipmap 
                color: 'fff', // hex format like 'F14F4D' 
                resume: true,
                hidden: false,
                bigText: false
//                //,
//                //silent: true
            });
            //alert(localStorage.pass);

        }
    };
    app.initialize();

    function localization() {  
    var bgGeo = window.BackgroundGeolocation;
    //alert('localizacion en segundo');
    //Esta es la función que se invocará en cada registro de posicionamiento en segundo plano
    var callbackFn = function(location) {
        var lat = location.latitude;
        var long = location.longitude;
        var accion = 'actualizarposicion';
        alert(lat+" , "+long);        
        //enviarPosicion(accion,lat,long,localStorage.passProshare,'mapa');          
//        var parentElement = document.getElementById('prueba');
//        var listeningElement = parentElement.querySelector('.ubicacion');
//        listeningElement.setAttribute('style', 'color:red;');
//        listeningElement.innerHTML = 'ubicacion latitud: '+lat+' longitud: '+long;
        //createMapa();
        //window.location.href = 'userPos.html';
        bgGeo.finish();
    };
 
      var failureFn = function(error) {
        console.log('Error al enviar su ubicacion valide si el gps esta funcionando');
      };
     
      // Configuramos el plugin, indicando nuestra función callback y algunas opciones
      bgGeo.configure(callbackFn, failureFn, {
          desiredAccuracy: 10,
          stationaryRadius: 5,
          distanceFilter: 5,
          interval: 3000
      });
     
      // Activamos la geolocalización en segundo plano
      bgGeo.start();
     
      // Si en algún momento queremos pararla, podemos indicarlo con stop()
      //backgroundGeolocation.stop();
    }

}