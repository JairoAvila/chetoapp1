var direccionservidor = "www.eurekadms.co/CHETO/";

function detallePromocion(indice){
 /*var descripcion = $('#detalle_promo'+indice).text();
  var descuento = $('#descuento_promo'+indice).text();
  var codigo = $('#codigo_promo'+indice).text();
  var imagen = $('#img_promo'+indice).attr('src');
  localStorage['promocion'] = descripcion+"|"+descuento+"|"+codigo+"|"+imagen;*/
  $('#descipcion_promocion').text($('#detalle_promo'+indice).text());
  $('#imagen_promocion').attr('src',$('#img_promo'+indice).attr('src'));
  $('#codigo_promocion').text($('#codigo_promo'+indice).text());
  //localStorage['promocion'] = 'entrega';
  $.mobile.changePage( $("#detalle_promociones"), "slide", true, true);

}
function obtenerDatosUsuario(){
    $('.cargando').show();
    var y = '{"userid" : [ "'+localStorage['idusuario']+'"] , "token" : ["'+localStorage['token']+'"] }';
    var url = "http://" + direccionservidor + "web/app.php/userapi/datosusuario";
    console.log(y);
    var objeto=$.ajax({
      type: "POST",
      url: url,
      data: y,
      cache: false,
      success: function()
      {
        $('.cargando').hide();
        var json = JSON.parse(objeto.responseText);
        console.warn(json);
        if(json.msg == "")
        {
            document.getElementById("nombreusuario").value = json.nombre;
            document.getElementById("emailusuario").value = json.email;
            document.getElementById("loginusuario").value = json.login;
            document.getElementById("numerotelefono").value = json.telefono;
            document.getElementById("pass1usuario").value = '';
            document.getElementById("pass2usuario").value = '';
        }
        else
        {
            console.log('mostrará mapa');
            alerta(json.msg,'CHETO');
        }
      },
      error: function()
      {
        $('.cargando').hide();
        alerta('Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente','Error');
      }
    });
}

function obtenerDatosPromociones(){
    $('ul.justList').empty();
    $('.cargando').show();
    var y = '{"userid" : [ "'+localStorage['idusuario']+'"] , "token" : ["'+localStorage['token']+'"] }';
    var url = "http://" + direccionservidor + "web/app.php/movilapi/codigoPromociones";
    console.log(y);
    var objeto=$.ajax({
      type: "POST",
      url: url,
      data: y,
      cache: false,
      success: function()
      {
        $('.cargando').hide();
        var json = JSON.parse(objeto.responseText);
        //json = [];
        if(json.length==0)
        {
          $("#notPromocion").css("display", "block");
        }
        else
        {
          for(var i=0;i<json.length;i++)
          {
            var text = '<a onclick="detallePromocion('+i+')"><img id="img_promo'+[i]+'" style="margin:10px;" src="'+json[i]['path']+'"><h2 id="detalle_promo'+[i]+'">'+json[i]['descripcion']+'</h2><p style="display:none;" id="descuento_promo'+[i]+'">'+json[i]['descuento']+'</p><p style="display:none;" id="codigo_promo'+[i]+'">'+json[i]['codigo']+'</p></a><br>'
            $('<li />', {
                      html: text
                  }).appendTo('ul.justList');
            $('ul.justList').listview('refresh'); 
          }
          //abrirPopup('popupDatos');
        }
      },
      error: function()
      {
        $('.cargando').hide();
        alerta('Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente','Error');
      }
    });
}
function actualizardatos()
{ 
  var pass1 = document.getElementById("pass1usuario").value;
  var pass2 = document.getElementById("pass2usuario").value;
  var nombre = document.getElementById("nombreusuario").value;
  var email = document.getElementById("emailusuario").value;
  var login = document.getElementById("loginusuario").value;
  var telefono= document.getElementById("numerotelefono").value;

  if(nombre == "" || email == "" || login == "" || telefono=="")
  {
    alerta('No debes dejar campos en blanco','CHETO');
    //navigator.notification.alert("No debes dejar campos en blanco");
  }
  else
  {
    
    if(pass1 == pass2)
    {
      $('.cargando').show();
      var y = '{"userid" : [ "'+localStorage['idusuario']+'"] , "token" : ["'+localStorage['token']+'"], "nombre" : ["'+nombre+'"], "email" : ["'+email+'"], "login" : ["'+login+'"], "password" : ["'+pass1+'"],"telefono": ["'+telefono+'"]}';
      var url = "http://" + direccionservidor + "web/app.php/userapi/actualizardatos";
      var objeto=$.ajax({
        type: "POST",
        url: url,
        data: y,
        cache: false,
        success: function()
        {
          $('.cargando').hide();
          var json = JSON.parse(objeto.responseText);
          if(json.msg == "correcto")
          {
            alerta('Cambios realizados con exito','CHETO');
            //mostrarpagina("homec");
          }
          else
          {
              alerta(json.msg,'CHETO');
          }
        },
        error: function()
        {
            alerta('Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente','CHETO');
            $('.cargando').hide();
          
        }
      });
    }
    else
    {
        alert('Las Contrase\u00F1as no coinciden','CHETO');
      //navigator.notification.alert("Las Contrase\u00F1as no coinciden", null, nombreaplicacion, "Aceptar");
    }
  }
}
function tarjetaC()
{
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
    //$('.cargando').toggleClass('active');
}