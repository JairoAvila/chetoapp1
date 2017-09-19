var nombreaplicacion = 'CHETO';
var direccionservidor = "www.eurekadms.co/CHETO/";
//funcion que trae todos mis servicios
function traerServicios(){
    $('.cargando').show();
    //clearinitservicedata();
    var y = '{ "userid" : ["'+localStorage['idusuario']+'"], "token" : ["'+localStorage['token']+'"] }';
    var url = "http://" + direccionservidor + "web/app.php/driverapi/cargaPedidos";
    var objeto=$.ajax({
    type: "POST",
    url: url,
    data: y,
    cache: false,
    success: function(){    
        alert('traerservicios');
        $('.cargando').hide();
        var json = JSON.parse(objeto.responseText);
        console.log(json);
        if(json.error == ""){
          var i = 0;
          var status = json.status;
          if(status == "1"){          
            $('#statusconductor').val(status).slider("refresh");
          }else{
            $('#statusconductor').val(status).slider("refresh");
          }
          obtenerMiruta('entrega','solodatos');
        }else if(json.error == "Servicio activo"){
            alert('servicioactivo');
              var dd = new Array();
              dd["reserva"] = json.id;
              dd['curso'] = "si";
              dd['temp'] = json.temp;
              //mostrarpagina("iniciarcarrera", dd);
          }else{
              alerta(json.error, nombreaplicacion, "Aceptar");
          }
      },
      error: function(){
        $('.cargando').hide();
        alerta("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente", nombreaplicacion, "Aceptar");
      }
    });
    //intervaloservicios = setInterval(actualizarservicios, 60000);
  }

//funcion que detecta el cambio de estado del conductor.
function cambiostatus(status){
    //console.log(status);
    //alert(status);
    var y = '{ "userid" : "'+localStorage['idusuario']+'", "token" : "'+localStorage['token']+'", "status" : "' + status + '" }';
    var url = "http://" + direccionservidor + "web/app.php/api/cambiostatus";
    var objeto=$.ajax({
        type: "POST",
        url: url,
        data: y,
        cache: false,
        success: function()
        {
          //var json = JSON.parse(objeto.responseText);
          console.log(objeto.responseText);
        },
        error: function()
        {
          alerta("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente",nombreaplicacion,'Aceptar');
          //navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente", null, nombreaplicacion, "Aceptar");
          $('.cargando').toggleClass('active');

        }
    });
}

//funcion para aceptar un servicio
function aceptarServicio(id){
    $('.cargando').show();
    var y = '{ "userid" : ["'+localStorage['conductor']+'"], "idreserva" : ["'+id+'"] }';
    var url = "http://" + direccionservidor + "web/app.php/movilapi/aceptarPush";
    console.log(JSON.stringify(y));
    var objeto=$.ajax({
        type: "POST",
        url: url,
        data: y,
        cache: false,
        success: function(){
            var json = JSON.parse(objeto.responseText);
            alert(JSON.stringify(json));
            console.log(JSON.stringify(json));
            if(json.error == ''){
                $('.cargando').hide();
                alerta('La ruta fue aceptada', nombreaplicacion, 'Aceptada');
            }else{
                $('.cargando').hide();
                alerta('Error al actualizar la informacion', nombreaplicacion,'Error');
            }            
        },error: function(){
            $('.cargando').hide();
            //alerta('Error al aceptar la ruta', nombreaplicacion, 'Error');
        }
    });
}

//funcion que trae el historial de mis servicios del conductor.
function historialCarreras()
{
  var url = "http://" + direccionservidor + "web/app.php/reservaapi/historialserviciosapp";
  var y = '{ "usuario" : "'+localStorage['idusuario']+'" , "token" : "'+localStorage['token']+'"}';
  console.log(url);
  console.log(y);
  $('.cargando').toggleClass('active');
  var objeto = $.ajax({
    type: "POST",
    url: url,
    data: y,
    cache: false,
    success: function()
    {
      
      var json = JSON.parse(objeto.responseText);
      var tabla = document.getElementById("tabladinamica");
      var HTML = "<table border='0' align='center' width='100%'><thead><tr><th height='50px'>Historial del viajes</th></br></tr></thead><tbody>";
      //console.log(json.length);
      console.log(json);
      var j = 0;
      if(json.error != ""){
      while(json[j] != null)
      {
        //HTML+="<tr><td align='center'><div onclick='despliegueViajes("+j+")' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='ass' data-disabled='false' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-up-b' aria-disabled='false'><span class='btn' ><span class='ui-btn-text'>Tu viaje del "+json[j].fechainicial+"</span></span><button id='' data-role='button' data-direction='reverse' data-transition='slideup' onclick='despliegueViajes("+j+")' class='ui-btn-hidden' data-disabled='false'></button></div><br>";
        //HTML+="<tr style='padding: 50px;'><td align='center'><div onclick='despliegueViajes("+j+")' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='ass' data-disabled='false' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-up-b' aria-disabled='false'><span class='btnhistorial' ><span class='ui-btn-text'>Tu viaje del "+json[j].fechainicial+"</span></span></div><br>";
        HTML+="<tr style='padding: 50px;'><td align='center'><div onclick='despliegueViajes("+j+")' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='ass' data-disabled='false' class='btnhistorial' aria-disabled='false'><span class='ui-btn-text'>Tu viaje del "+json[j].fechainicial+"</span></div><br>";
        HTML+="<div id='historia"+j+"' style='display:none;'><b>Nombre Usuario:</b> "+json[j].pasajeronombre+"<br>";
        HTML+="<hr style='height:3px; background-color:#089805; border:0; margin-top:12px; margin-bottom:12px;'>";
        HTML+="<b>Fecha Inicial Viaje:</b> "+json[j].fechainicial+"<br>";
        HTML+="<hr style='height:3px; background-color:#089805; border:0; margin-top:12px; margin-bottom:12px;'>";
        HTML+="<b>Fecha Final Viaje:</b> "+json[j].fechafinal+"<br>";
        HTML+="<hr style='height:3px; background-color:#089805; border:0; margin-top:12px; margin-bottom:12px;'>";
        HTML+="<b>Total del viaje:</b> "+json[j].valor+"<br>";
        HTML+="<hr style='height:3px; background-color:#089805; border:0; margin-top:12px; margin-bottom:12px;'>";
        HTML+="<b>Distancia recorrida:</b> "+json[j].distancia+"<br>";
        HTML+="<hr style='height:3px; background-color:#089805; border:0; margin-top:12px; margin-bottom:12px;'>";
        HTML+="<b>Tiempo:</b> "+json[j].tiempo+"</div></td></tr><tr><td></br></td></tr>";
        j++;
      }
      HTML += "</tbody></table>";
      tabla.innerHTML = HTML;
      $('.cargando').toggleClass('active');
     }
     else{$('.cargando').toggleClass('active');}
      
    },
    error: function()
    {
        $('.cargando').toggleClass('active');
        navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexi\u00f3n e intentelo nuevamente"  , null, nombreaplicacion, "Aceptar");
    }
  });
}

//funcion que trae el histrorial de mis servicios pasajero
function historialServiciosPasajeros()
{
  var url = "http://" + direccionservidor + "web/app.php/reservaapi/historia";
  var y = '{ "usuario" : "'+localStorage['idusuario']+'" , "token" : "'+localStorage['token']+'"}';
  console.log(url);
  console.log(y);
  $('.cargando').toggleClass('active');
  var objeto = $.ajax({
    type: "POST",
    url: url,
    data: y,
    cache: false,
    success: function()
    {
      
      var json = JSON.parse(objeto.responseText);
      var tabla = document.getElementById("tabladinamica");
      var HTML = "<table border='0' align='center' width='100%'><thead><tr><th height='50px'>Historial del viajes</th></br></tr></thead><tbody>";
      //console.log(json.length);
      console.log(json);
      var j = 0;
      if(json.error != ""){
      while(json[j] != null)
      {
        //HTML+="<tr><td align='center'><div onclick='despliegueViajes("+j+")' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='ass' data-disabled='false' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-up-b' aria-disabled='false'><span class='btn' ><span class='ui-btn-text'>Tu viaje del "+json[j].fechainicial+"</span></span><button id='' data-role='button' data-direction='reverse' data-transition='slideup' onclick='despliegueViajes("+j+")' class='ui-btn-hidden' data-disabled='false'></button></div><br>";
        //HTML+="<tr style='padding: 50px;'><td align='center'><div onclick='despliegueViajes("+j+")' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='ass' data-disabled='false' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-up-b' aria-disabled='false'><span class='btnhistorial' ><span class='ui-btn-text'>Tu viaje del "+json[j].fechainicial+"</span></span></div><br>";
        HTML+="<tr style='padding: 50px;'><td align='center'><div onclick='despliegueViajes("+j+")' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='ass' data-disabled='false' class='btnhistorial' aria-disabled='false'><span class='ui-btn-text'>Tu viaje del "+json[j].fechainicial+"</span></div><br>";
        HTML+="<div id='historia"+j+"' style='display:none;'><b>Nombre Usuario:</b> "+json[j].pasajeronombre+"<br>";
        HTML+="<hr style='height:3px; background-color:#089805; border:0; margin-top:12px; margin-bottom:12px;'>";
        HTML+="<b>Fecha Inicial Viaje:</b> "+json[j].fechainicial+"<br>";
        HTML+="<hr style='height:3px; background-color:#089805; border:0; margin-top:12px; margin-bottom:12px;'>";
        HTML+="<b>Fecha Final Viaje:</b> "+json[j].fechafinal+"<br>";
        HTML+="<hr style='height:3px; background-color:#089805; border:0; margin-top:12px; margin-bottom:12px;'>";
        HTML+="<b>Total del viaje:</b> "+json[j].valor+"<br>";
        HTML+="<hr style='height:3px; background-color:#089805; border:0; margin-top:12px; margin-bottom:12px;'>";
        HTML+="<b>Distancia recorrida:</b> "+json[j].distancia+"<br>";
        HTML+="<hr style='height:3px; background-color:#089805; border:0; margin-top:12px; margin-bottom:12px;'>";
        HTML+="<b>Tiempo:</b> "+json[j].tiempo+"</div></td></tr><tr><td></br></td></tr>";
        j++;
      }
      HTML += "</tbody></table>";
      tabla.innerHTML = HTML;
      $('.cargando').toggleClass('active');
     }
     else{$('.cargando').toggleClass('active');}
      
    },
    error: function()
    {
        $('.cargando').toggleClass('active');
        navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexi\u00f3n e intentelo nuevamente"  , null, nombreaplicacion, "Aceptar");
    }
  });
}
function generarQR(code){
    $.mobile.changePage( $("#code-qr"), "slide", true, true);
    var codigo = code+"|"+localStorage.token;
    $('#imgQR').attr('src',"https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl="+codigo);
}



