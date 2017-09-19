var nombreaplicacion = 'CHETO';
var direccionservidor = "www.eurekadms.co/CHETO/";
document.addEventListener("deviceready", onDeviceReady, false);
var titulos = [];
var caduca = "31 Dec 2020 23:59:59 GMT"
//var sockett = io.connect("https://www.eurekadms.co:5060"); 

//funcion que valida si tiene tarjeta de credito registrada
function onDeviceReady(){  
    try{
      if(localStorage['rol'] == 4 || localStorage['rol'] == 1 || localStorage['rol'] == 3){
        if(localStorage['rol'] == 4 || localStorage['rol'] == 1){
            if(localStorage['telefono'] != 0 && localStorage['telefono'] != undefined && localStorage['telefono'] != null && localStorage['telefono']!="" && localStorage['telefono']!='null' && localStorage['telefono']!="null"){
                if(localStorage['tt'] == undefined || localStorage['tt'] == null || localStorage['tt'] == ""){
                navigator.notification.alert("Para continuar debes registrar tu tarjeta", null, nombreaplicacion, "Aceptar");
                }
            }else{
                navigator.notification.alert("Te invitamos a registrar tu n\u00famero telef\u00f3nico para poder mejorar nuestro servicio", null, nombreaplicacion, "Aceptar");
            }
        }

        //registerdevice();

        //opensocket();
      }

      //pictureSource = navigator.camera.PictureSourceType;
      //destinationType = navigator.camera.DestinationType;

      //navigator.splashscreen.hide();
      }
    catch(err)
    {
       navigator.notification.alert(err+"1" , null, nombreaplicacion, "Aceptar");
    }
}

//funcion que muestra u oculta el menu principal
function toogleMenu(){
    $('.section_menu').slideToggle();
}

//funcion para selecccionar el carro que condicirá.
function seleccionarcarroconduce(){
    //$('.cargando').show();
    var carro = document.getElementById("selectcarroconduce").value;
    localStorage['carro'] = carro;
    alerta("Bienvenido a " + nombreaplicacion,nombreaplicacion,'bienvenido');
    //navigator.notification.alert("Bienvenido a " + nombreaplicacion,null, nombreaplicacion, "Aceptar");
    var y = '{"id" : [ "'+localStorage['idusuario']+'"] , "token" : [ "'+localStorage['token']+'"], "carro" : [ "'+localStorage['carro']+'"] }';
    var url = "http://" + direccionservidor + "web/app.php/userapi/placaactiva";
    console.log(y);
    var objeto=$.ajax({
            type: "POST",
            url: url,
            data: y,
            cache: false,
            success: function()
            {
                var json = JSON.parse(objeto.responseText);
                console.log(json);
                if(json['error'] == ""){
                    $.mobile.changePage( "main.html#homeconductor", { transition: "slice", changeHash: true }, true, true);
                    $('.cargando').hide();
                    traerServicios();
                }else{console.log('error al registrar el vehiculo que conduce.')}
            },
            error: function()
            {
                alerta("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente",nombreaplicacion);
              //navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente", null, nombreaplicacion, "Aceptar");
              $('.cargando').hide();
            }
          });          
                //mostrarpagina("home");
//                $('.btn_menu').toggleClass('conductor');
//
//                $('.btn_menu.conductor').click(function(){
//                    //alert('algo');
//                    mostrarMenuConductor();
//                  //$('.section_menu.conductor').toggleClass('active');
//                  //$('.section_content').toggleClass('to_right');
//                });

   // $('#seleccioncarro').dialog("close");
}

//funcion para la pagina de actualizar tarjeta de credito
function paginaTarjeta(){
    document.getElementById('payer_id').value = localStorage['idusuario'];
      if(localStorage['tt'] == "" || localStorage['tt'] == undefined || localStorage['tt'] == null)
      {
        $('#volvertarjeta').hide();
        $('#volvertarjetaingreso').show();

       // $('#btn_ingresar_tarjeta').show();
      }
      else
      {
        $('#volvertarjeta').show();
        $('#volvertarjetaingreso').hide();
        document.getElementById("valorartarjeta").value ="1";
        //$('#btn_ingresar_tarjeta').hide();
      }
      $('.cargando').toggleClass('active');
}
function accionesPasajero(){
    obtenerMiruta('entrega','mipos');
    $('#obtener_miruta_entrega').hide();
    $('#obtener_miruta_recogida').hide();
    $('#obtener_misrutas').hide();
    $('#historico').show();
    $('#promociones').show();
}
function accionesConductor(){
    obtenerMiruta('recogida','solodatos');
    obtenerMiruta('entrega','solodatos');
}
$(document).ready(function(){
    if(localStorage.rol == '3'){
        accionesConductor();
    }else if(localStorage.rol == '4'){
        accionesPasajero();
    }
});