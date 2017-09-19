var direccionservidor = "www.eurekadms.co/CHETO/";
var rutasDomicilios = [];
var rutasOficina = [];
var direccion = "";
var telefono = "";
var devicePasajero = "";
var idreserva = "";
var nombrePasajero = "";
var latitudConductor = "";
var longitudConductor = "";
var calculoDistancia = false;
////funcion que arma la ruta del conductor
//function armarMiruta(){
//    var tipo = '';     
//    for(var i = 0; i < 2; i++){
//        if(i == 0){
//            tipo = 'entrega';
//        }else if(i == 1){
//            tipo = 'recogida';
//        }        
//        obtenerMiruta(tipo,'solodatos');      
//    }    
//    setTimeout(function(){mostrarMiruta();},500);
//}

//funcion que muestra los datos de la ruta armada
function mostrarMiruta(){    
    var nombreruta = '';    
    $('#lista_pasajeros').empty();
    for(var i = 0; i < rutas.length; i++){
        for(var j = 0; j < rutas[i].length; j++){            
            nombreruta = rutas[i][j]['nombreruta'];
            var nombreusuario = rutas[i][j]['pasajero'];
            var numpasajeros = rutas[i][j]['numpasajeros'];
            var telefono = rutas[i][j]['telefono'];
            var fila = '<tr><td align="left">'+nombreusuario+'</td><td align="center">'+telefono+'</td><td align="center">'+numpasajeros+'</td></tr>';
            $('#lista_pasajeros').append(fila);
        }
    }
    localStorage.nombreRuta = nombreruta;
    $('#nombre_ruta').text(nombreruta);
    console.log(nombreusuario);
}
//funcion para obtener mi ruta
function obtenerMiruta(tipo,caso){
    if(caso === 'mipos'){
        crearMapa(caso);
    }else{
        var url = "http://" + direccionservidor + "web/app.php/movilapi/serviciosconductor";
        var datos = '{"idconductor" : "'+localStorage.conductor+'","tipo" : "'+tipo+'","recogida": ""}';
        var objeto=$.ajax({
            type: "POST",
            url: url,
            data: datos,
            cache: false,
            success: function()
            {
                var json = JSON.parse(objeto.responseText);
                if(json.length != 0)
                {
                    $("#iniciotecorrido").css("display", "block");
                    localStorage['numpasajeros'] = json.length;
                    localStorage['conteopasajero'] = 1;
                    localStorage['tipoRuta'] = 'recogida';
                    console.log(json);
                    if(caso === 'solodatos'){
                        if(tipo === 'entrega')
                        {
                            rutasOficina = [];
                            rutasOficina.push(json);
                        }
                        else
                        {
                            rutasDomicilios = [];
                            rutasDomicilios.push(json);
                        }
                        rutas = [];
                        rutas.push(json);
                        mostrarMiruta();
                    }else{
                        crearMapa(json,tipo);
                    }
                }            
            },
            error: function()
            {
                alerta("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente",nombreaplicacion,"Aceptar");
                //navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente" , null, nombreaplicacion, "Aceptar");
                $('.cargando').hide();

            }
        });
    }
}

//funcion para reservar servicios
function reserva(){
    if(localStorage['device'] == undefined || localStorage['device'] == null || localStorage['device'] == 'no'){
          $('#imagenprogramar').attr('onclick', "$('#linkprogramar').click();");
          $('#imagensrapido').attr('onclick', "$('#linksrapido').click();");
    }else{
          $('#imagenprogramar').attr('onclick', "$('#linkprogramar').click();");
          $('#imagensrapido').attr('onclick', "$('#linksrapido').click();");
    }    

    //trae la mayor capacidad de pasajeros
//    var urll='http://' + direccionservidor + 'web/app.php/cargaMayor';
//    var objeto=$.ajax({
//        type: "POST",
//        url: urll,
//        data: null,
//        cache: false,
//        success: function(){
//            var json = JSON.parse(objeto.responseText);
//            document.getElementById("mayorsalida").value = json["mayor"];
//            document.getElementById("mayorllegada").value = json["mayor"];
//        },
//        error: function(){
//            document.getElementById("mayorsalida").value = 20;
//            document.getElementById("mayorllegada").value = 20;
//        }
//    });

//    document.getElementById('pasajeros').value = '';
//    document.getElementById('hora').value = '';
//    document.getElementById('fecha').value = '';
//    document.getElementById('carro').value = '';
//    document.getElementById('pasajerosviaje').value = '';
//    document.getElementById('fechaviaje').value = '';
//    document.getElementById('horaviaje').value = '';
//    document.getElementById('destinoviaje').value = '';
//    document.getElementById('celularviaje').value = '';
//    document.getElementById('fechacelegido').value = '';
//    document.getElementById('horacelegido').value = '';

//    var y = '{ "userid" : ["'+localStorage['idusuario']+'"] , "token" : ["'+localStorage['token']+'"]}';
//    var url = "http://" + direccionservidor + "web/app.php/customerapi/cargaReservas";
//    var reservas=$.ajax({
//        type: "POST",
//        url: url,
//        data: y,
//        cache: false,
//        success: function(){
//            var jsonreservas = JSON.parse(reservas.responseText);
//            if(jsonreservas.error != ""){
//                if(jsonreservas.error == "Falta pago"){
//                    var dd = new Array();
//                    dd['reserva'] = jsonreservas.id;
//                    $('.cargando').show();
//                    mostrarpagina('fin', dd);
//                }
//            }else{
//                if(localStorage['convenio'] != 0 && localStorage['convenio'] != undefined && localStorage['convenio'] != null){
//                    $('#empresarial').parent().show();
//                    convenioreserva = localStorage['convenio'];
//                    tiposervicio = "EMP";
//                }
//                console.log('mostrará mapa');
//                var opt= { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true };
//                console.log("entro a  latitud longitud");
//                navigator.geolocation.getCurrentPosition(cd, onError, opt);
//            }
//        },
//        error: function(){
//            navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente", null, nombreaplicacion, "Aceptar");
//            $('.cargando').toggleClass('active');
//        }
//    });
}
function gps(){
    navigator.geolocation.getCurrentPosition(function(pos){
            var posicionActual = pos.coords.latitude+","+pos.coords.longitude;
            var url = 'http://maps.google.com/maps?saddr='+posicionActual+'&daddr='+direccion;
            $('#wazemaps').attr('href',url);
            document.getElementById("wazemaps").click();         
        }, onError);
}
function marcarNumero(){
    $('#marcartelefono').attr('href',"tel:+"+telefono);
    document.getElementById("marcartelefono").click();
}
function iniciarrecorrido(){
    alert(localStorage.conductor);
    alert(localStorage.tipoRuta);
    alert(localStorage.conteopasajero);
    var url = "http://" + direccionservidor + "web/app.php/movilapi/serviciosconductor";
        var datos = '{"idconductor" : "'+localStorage.conductor+'","tipo" : "'+localStorage.tipoRuta+'","recogida": "'+localStorage.conteopasajero+'"}';
        var objeto=$.ajax({
            type: "POST",
            url: url,
            data: datos,
            cache: false,
            success: function()
            {
                var json = JSON.parse(objeto.responseText);
                comienzoRuta(json);
            },
            error: function()
            {
                alerta("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente",nombreaplicacion,"Aceptar");
                //navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente" , null, nombreaplicacion, "Aceptar");
                $('.cargando').hide();

            }
        });
}
function comienzoRuta(obj){
    localStorage['idnombreruta'] = obj[0]['idnombreruta'];
    devicePasajero = obj[0]['device'];
    idreserva = obj[0]['idreserva'];
    nombrePasajero = obj[0]['pasajero'];
    document.getElementById("titulo-inicio-servicio").innerHTML = "Pasajero No "+obj[0]['orden'];
    document.getElementById("nombrePasajero").innerHTML = nombrePasajero;
    telefono = obj[0]['telefono'];
    var traerDireccion = obj[0]['direccion'].split(",");
    direccion = traerDireccion[0]+","+traerDireccion[1].trim();
    document.getElementById("direccionPasajero").innerHTML = direccion;
    var taerHora = obj[0]['hora'].split(" ");
    document.getElementById("horaPasajero").innerHTML = taerHora[1];
    crearMapa('onlyPoint', direccion);
    setInterval(function(){
        navigator.geolocation.getCurrentPosition(function(pos){
            latitudConductor = pos.coords.latitude;
            longitudConductor =  pos.coords.longitude;        
        }, onError);
        calculoDistancia = distanciaDestino(latitudConductor,traerDireccion[0],longitudConductor,traerDireccion[1]);
        if(calculoDistancia)
        {
            clearInterval();
        }
    },3000);
}
//funcion para obtener los radianes.
function toRad(Value) {
    /** Convierte nuemors en grados a radianees */
    return Value * Math.PI / 180;
}
//funcion que valida a que distancia de mi destino estoy
function distanciaDestino(lat2,lat1,lon2,lon1){
    //alert('latitud2= '+lat2+' latitud1= '+lat1+' longitud2= '+lon2+' longitud1'+lon1);
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;    
    if(d<1){
        if(localStorage['tipoRuta'] === 'recogida')
        {
            calculoDistancia=true;
            //limpiarUbicacion();        
            alerta("Ya hemos llegado al destino","CHETO");
            escanearqr();
            avisarllegada();
        }
        else
        {
             calculoDistancia=true;
             alerta("Se ha finalizado este servicio","CHETO");
             pasajeroEntregado();
        }
    }

    return calculoDistancia;
}
function avisarllegada(){
    var mensaje = localStorage.token+"|"+idreserva+"|"+nombrePasajero;
    var url = "http://" + direccionservidor + "web/app.php/movilapi/envioPushMovil";
        var datos = '{"device" : "'+devicePasajero+'","titulo" : "CHETO","mensaje": "El conductor ha llegado a tu domicilio", "code" : "'+mensaje+'", "bandera" : "recogido"}';
        var objeto=$.ajax({
            type: "POST",
            url: url,
            data: datos,
            cache: false,
            success: function()
            {
                console.log(objeto.responseText);
            },
            error: function()
            {
                alerta("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente",nombreaplicacion,"Aceptar");
                //navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente" , null, nombreaplicacion, "Aceptar");
                $('.cargando').hide();

            }
        });
}
function pasajeroEntregado(){
    console.log(idreserva);
    var url = "http://" + direccionservidor + "web/app.php/movilapi/envioPushMovil";
        var datos = '{"device" : "'+devicePasajero+'","titulo" : "CHETO", "mensaje": "El servicio ha finalizado, te invitamos a calificar el servicio", "code" : "'+idreserva+'", "bandera" : "entrega"}';
        var objeto=$.ajax({
            type: "POST",
            url: url,
            data: datos,
            cache: false,
            success: function()
            {
                var json = JSON.parse(objeto.responseText);
                alert('entramos');
                    var contador_pasajeros = parseInt(localStorage.conteopasajero);
                    var total_pasajeros = parseInt(localStorage.numpasajeros);
                    if(contador_pasajeros<total_pasajeros)
                    {
                        localStorage['conteopasajero'] = contador_pasajeros + 14;
                        iniciarrecorrido();
                    }
                    else
                    {
                        cambioEstadoRuta();
                    }
            },
            error: function()
            {
                alerta("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente",nombreaplicacion,"Aceptar");
                //navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente" , null, nombreaplicacion, "Aceptar");
                $('.cargando').hide();

            }
        });
}
function escanearqr(){
    cordova.plugins.barcodeScanner.scan(
      function (result) {
            validarQR(result.text);
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : true, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
}

function validarQR(codigo){
    var texto = codigo.split('|');
    var url = "http://" + direccionservidor + "web/app.php/movilapi/validaQR";
        var datos = '{"token1" : "'+texto[0]+'","token2" : "'+texto[1]+'","token3": "'+texto[2]+'","token4": "'+texto[3]+'"}';
        var objeto=$.ajax({
            type: "POST",
            url: url,
            data: datos,
            cache: false,
            success: function()
            {
                var json = JSON.parse(objeto.responseText);
                if(json.error == "")
                {
                    alert('entramos');
                    var contador_pasajeros = parseInt(localStorage.conteopasajero);
                    var total_pasajeros = parseInt(localStorage.numpasajeros);
                    if(contador_pasajeros<total_pasajeros)
                    {
                        localStorage['conteopasajero'] = contador_pasajeros + 14;
                        calculoDistancia = false;
                        iniciarrecorrido();
                    }
                    else
                    {
                        cambioEstadoRuta();
                    }
                }
                else
                {
                  navigator.notification.alert(json.error , null, nombreaplicacion, "Aceptar");
                }
            },
            error: function()
            {
                alerta("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente",nombreaplicacion,"Aceptar");
                //navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente" , null, nombreaplicacion, "Aceptar");
                $('.cargando').hide();

            }
        });
}

function cambioEstadoRuta(){
        alert("estoy en cambio estado");
        var url = "http://" + direccionservidor + "web/app.php/movilapi/cambioEstadoRuta";
        var datos = '{"idnombreruta" : "'+localStorage.idnombreruta+'"}';
        var objeto=$.ajax({
            type: "POST",
            url: url,
            data: datos,
            cache: false,
            success: function()
            {
                var json = JSON.parse(objeto.responseText);
                if(json.error == "")
                {
                    if(localStorage['tipoRuta'] === 'recogida')
                    {
                        $("#avisar_llegada").css("display", "none");
                        $("#escanear_qr").css("display", "none");
                        $("#pasajero_entregado").css("display", "block");
                        localStorage['tipoRuta'] = 'entrega';
                        localStorage['conteopasajero'] = 15; //tiene que ser 1 para que comienze con el primero 
                        iniciarrecorrido();
                    }
                    else
                    {
                        servicioFinalizado();
                    }
                }
                else
                {
                    navigator.notification.alert("la hicimos jairo" , null, nombreaplicacion, "Aceptar");
                }

            },
            error: function()
            {
                alerta("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente",nombreaplicacion,"Aceptar");
                //navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente" , null, nombreaplicacion, "Aceptar");
                $('.cargando').hide();

            }
        });
}

function envioCalificacion(entrada){
    var url = "http://" + direccionservidor + "web/app.php/movilapi/calificacionRuta";
        var datos = '{"calificacion" : "'+entrada+'","idreserva" : "'+localStorage.idruta+'"}';
        var objeto=$.ajax({
            type: "POST",
            url: url,
            data: datos,
            cache: false,
            success: function()
            {
                var json = JSON.parse(objeto.responseText);
                if(json.error == "")
                {
                    alerta("Gracias por utilizar nuestros servicios, te esperaremos de nuevo para atenderte como te mereces","CHETO");
                    $.mobile.changePage( "main.html#reserva", { transition: "fade", changeHash: true }, true, true);
                    accionesPasajero();
                }
            },
            error: function()
            {
                alerta("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente",nombreaplicacion,"Aceptar");
                //navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente" , null, nombreaplicacion, "Aceptar");
                $('.cargando').hide();

            }
        });
}
function servicioFinalizado(){
    alert("el servicio esta finalizado");
    $.mobile.changePage( $("#homeconductor"), "slide", true, true);
}

