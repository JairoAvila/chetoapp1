var geocoder;
var marker;
var latLng;
var map;
var latitud = 0;
var longitud = 0;
var rutaconductor;
var ak = '';
var mapausuario = '';
var tiporuta = '';
var puntoDestino= '';
var coordenaActual = "";
var divMapa = "";

//funcion para crear el mapa
function crearMapa(json,tipo){
  tiporuta = tipo;
    if(json === 'mipos'){
        mapausuario = 'si';
        insertarMapa();
    }else if(json === 'onlyPoint'){
        mapausuario = 'punto';
        puntoDestino = tipo;
        insertarMapa();
    }else{
        mapausuario = 'no';
        rutaconductor = json;
        console.log(rutaconductor);
        var resheight=$( window ).height();
        console.log(resheight);   
        insertarMapa();
        $('#footer-tablero').css("bottom", '-80px');
        $('.tablero_ruta').append('<p>'+localStorage.nombreRuta+'</p>');
    }
}
function insertarMapa(){
    var opt= { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true };
        console.log("entro a  latitud longitud");
        navigator.geolocation.getCurrentPosition(cd, onError, opt);
}
//calback e la geolocalizacion
function cd(posicion){
  console.log("entro a cd");
  latitud = posicion.coords.latitude;
  longitud = posicion.coords.longitude;
  if(mapausuario === 'si'){
    document.getElementById("latitudsalida").value = latitud;
    document.getElementById("longitudsalida").value = longitud;
  
    document.getElementById("latitudllegada").value = latitud;
    document.getElementById("longitudllegada").value = longitud; 
    divMapa = document.getElementById("map-canvas-user");
  }
  else if(mapausuario === 'punto')
  {
    var coordenada = puntoDestino.split(",");
    latitud = coordenada[0];
    longitud = coordenada[1];
    divMapa = document.getElementById("map-canvas1");
  }
  setTimeout(function(){initialize();},500);
  
}

//funcion de error de la geolocalizacion
function onError(error){
   //alert('code: ' +error.code+ '\n' + 'message: ' +error.message+ '\n'); 
  if(navigator.platform == 'Win32'){
      alert('Es necesario habilitar los servicios de ubicaci\u00f3n para un correcto funcionamiento');
  }else{
     navigator.notification.vibrate(1000); 
     navigator.notification.alert(
    'Es necesario habilitar los servicios de ubicaci\u00f3n para un correcto funcionamiento',
    function(){
        $('.cargando').show();
        //mostrarpagina("homec");
        },
        nombreaplicacion,
        'Aceptar'
    );
  }
}

// INICiALIZACION DE MAPA
function initialize(){  
    console.log("entro a initialize");
//    var mapcanvas = document.createElement('div');
//    mapcanvas.id = 'mapcanvas';
//    var altura = ($( window ).height());
//    mapcanvas.style.height = '100%'; //+ 'px';
//    mapcanvas.style.width = '100%';
//    $('#mapa').empty();
//    document.querySelector('#mapa').appendChild(mapcanvas);

    geocoder = new google.maps.Geocoder();
    console.log(rutaconductor);
    if(rutaconductor && rutaconductor.length > 0){
        console.log('cargará ruta');
        var marcadores = [];
        var linea = [];
        for(var i = 0; i<rutaconductor.length; i++){
            var direccion = rutaconductor[i]['direccion'];
            var direccionsplit = direccion.split(",");
            latitud = direccionsplit[0];
            longitud = direccionsplit[1];
            var titulo = 'parada '+[i+1];
            var ruta = {titulo, latitud, longitud};
            var lat = direccionsplit[0];
            var long = direccionsplit[1];
            var linearuta = new google.maps.LatLng(lat,long);
            marcadores.push(ruta);
            linea.push(linearuta); 
            if(i == '2'){
                console.log('i == 2');
                latitudcent = lat;
                longitudcent = long;
                console.log(lat,long);
            }else{console.log('i != 0');}
        } 
        console.log(linea);   
        console.log(latitudcent,longitudcent);
        latLng = new google.maps.LatLng(latitudcent,longitudcent);
        map = new google.maps.Map(document.getElementById("map-canvas"),
            {
              zoom:16,
              center: latLng,
              panControl: false,
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              overviewMapControl: false,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });         
        console.log(marcadores);
        var infowindow = new google.maps.InfoWindow();
        marker, i;
        if(tiporuta=='entrega')
        {
          var icono = 'img/iconos/marker_office.png';
        }
        else
        {
          var icono = 'img/iconos/marker_home.png';
        }
        for (i = 0; i < marcadores.length; i++) {  
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(marcadores[i]['latitud'], marcadores[i]['longitud']),
              icon: icono,
              map: map
            });
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(marcadores[i]['titulo']);
                infowindow.open(map, marker);
              }
            })(marker, i));
          }
        var lineas = new google.maps.Polyline({
            path: linea,
            map: map,
            strokeColor: '#222000',
            strokeWeight: 4,
            strokeOpacity: 0.6,
            clickable: false
        });
            //latLng = new google.maps.LatLng(latitud,longitud);
     }else{
         console.log('no cargará ruta');
         latLng = new google.maps.LatLng(latitud,longitud);
         map = new google.maps.Map(divMapa,
            {
              zoom:17,
              center: latLng,
              panControl: false,
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              overviewMapControl: false,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            // CREACION DEL MARCADOR
            marker = new google.maps.Marker(
            {
              position: latLng,
              title: '',
              map: map,
              draggable: true,
          //    icon: 'img/ubicacion.png'
            });

            // Agrega el control de ubicacion
            geocodePosition(latLng);

            // Permito los eventos drag/drop sobre el marcador
            google.maps.event.addListener(marker, 'dragstart', function() {
              updateMarkerAddress('Arrastrando...');
            });

            google.maps.event.addListener(marker, 'drag', function() {
              updateMarkerStatus('Arrastrando...');
              updateMarkerPosition(marker.getPosition());
            });

            google.maps.event.addListener(marker, 'dragend', function() {
              updateMarkerStatus('Calculando...');
              geocodePosition(marker.getPosition());
            });
     }
  $('.cargando').hide();
  }
  
// ESTA FUNCION OBTIENE LA DIRECCION A PARTIR DE LAS COORDENADAS POS
function geocodePosition(pos){
    geocoder.geocode({
          latLng: pos
        },
        function(responses){
            if (responses && responses.length > 0){
            var direcciones = responses[0].formatted_address.split("-");
            updateMarkerAddress(direcciones[0] + " - ");
            }else{
                updateMarkerAddress('No puedo encontrar esta direcci\u00f3n.');
            }
        }
    );
}

//funcion que actualiza la direccion del marcador
function updateMarkerAddress(str){
    console.log(str);
    console.log(ak);
    if(ak == 'salida'){
        console.log('salida');
        document.getElementById("direccionsalida").value = str;
    }else if(ak == 'llegada'){
        console.log('llegada');
        document.getElementById("direccionllegada").value = str;
    }else if(ak == ''){
        document.getElementById("direccionsalida").value = str;
        document.getElementById("direccionllegada").value = str;
    }  
}

//funcion que actualiza el estado del marcador.
function updateMarkerStatus(str){
    if(ak == 'salida'){
        console.log('salida');
        document.getElementById("direccionsalida").value = str;
    }else{
        console.log('llegada');
        document.getElementById("direccionllegada").value = str;
    }
  
}

// RECUPERO LOS DATOS LON LAT Y DIRECCION Y LOS PONGO EN EL FORMULARIO
function updateMarkerPosition (latLng){   
    var long,lat = '';
    console.log(ak);
    if(ak == 'salida'){
        long = 'longitudsalida';
        lat = 'latitudsalida';
    }else{ 
        long = 'longitudllegada';
        lat = 'latitudllegada';
    }  
    console.log(lat+long);
    document.getElementById(long).value =latLng.lng();
    document.getElementById(lat).value = latLng.lat();
    latitud = document.getElementById(lat).value;
    longitud = document.getElementById(long).value;
}

function cambioDireccion(tipo)
{
  codeAddress(tipo);
}
// ESTA FUNCION OBTIENE LA DIRECCION A PARTIR DE LAS COORDENADAS POS
function geocodePosition(pos)
{
  geocoder.geocode(
    {
      latLng: pos
    },
    function(responses)
    {
      if (responses && responses.length > 0)
      {
        var direcciones = responses[0].formatted_address.split("-");
        updateMarkerAddress(direcciones[0] + " - ");
      }
      else
      {
        updateMarkerAddress('No puedo encontrar esta direcci\u00f3n.');
      }
    }
  );
}

// OBTIENE LA DIRECCION A PARTIR DEL LAT y LON DEL FORMULARIO
function codeLatLon()
{
  str= document.getElementById("longitud").value+" , "+document.getElementById("latitud").value;
  latLng2 = new google.maps.LatLng(document.getElementById("latitud").value ,document.getElementById("longitud").value);
  marker.setPosition(latLng2);
  map.setCenter(latLng2);
  geocodePosition (latLng2);
}

// OBTIENE LAS COORDENADAS DESDE lA DIRECCION EN LA CAJA DEL FORMULARIO
function codeAddress(tipo)
{ 
  var address = '';
  var addressSalida = document.getElementById("direccionsalida").value + ", Bogot\u00e1, Cundinamarca, Colombia";
  var addressLlegada = document.getElementById("direccionllegada").value + ", Bogot\u00e1, Cundinamarca, Colombia";
  if(tipo == 'salida'){
      address = addressSalida;
  }else{ address = addressLlegada}
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
       updateMarkerPosition(results[0].geometry.location);
       console.log(marker);
       marker.setPosition(results[0].geometry.location);
       map.setCenter(results[0].geometry.location);
     } else {
      console.log('ERROR : ' + status);
    }
  });
}

//FUNCION QUE ABRE EL POPUP DE LA RESERVA
function abrirReserva(){
    $('#dejada').removeClass('dejada').addClass('dejadar');
    $("#map-canvas-user").css({height: '100px'});
}
//FUNCION QUE ABRE EL POPUP DE LA RESERVA
function cerrarReserva(){
    $('#dejada').removeClass('dejadar').addClass('dejada');
    $("#map-canvas-user").css({height: '670px'});
}
$( document ).on( "pageinit", function() {    
    $( "#popup_recogida" ).on({
        //Disparado después de que una ventana emergente haya completado los preparativos para la apertura, pero aún no se ha abierto
        popupbeforeposition: function(event, ui) { },
        //Disparador que se activa cuando una ventana emergente está completamente abierta
        popupafteropen: function(event, ui) {},
        //Disparador que se activa cuando una ventana emergente está completamente cerrada
        popupafterclose: function() {            
            cerrarReserva();
        }
    });
});

