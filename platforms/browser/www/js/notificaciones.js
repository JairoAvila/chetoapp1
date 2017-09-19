var nombreaplicacion = 'CHETO';

function registerdevice(){  
    try{
        console.log('registrando');
        var push = PushNotification.init({
            android: {
                senderID: "616869526447",
                sound: "true",
                vibration: "true"
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
        });     
    }
    catch(errr){
      //alert("error registro : "+errr);
    }
    push.on('registration', function(data) {
         
        try{ //data.registrationId
            if (data.registrationId.length > 0){  
               var deviceToken = data.registrationId;
                //alert(deviceToken);
                if(localStorage['device'] != deviceToken && localStorage['idusuario']){
                    var y = '{ "userid" : ["' + localStorage['idusuario'] + '"] , "token" : ["' + localStorage['token'] + '"], "device" : ["'+deviceToken+'"]}';
                    var url = "http://" + direccionservidor + "web/app.php/userapi/setDevice";
                    console.log(y);
                    console.log(url);
                    try{
                        var objeto = $.ajax({
                            type: "POST",
                            url: url,
                            data: y,
                            cache: false,
                            success: function(){
                                var json = JSON.parse(objeto.responseText);
                                if(json.msg == "correcto"){
                                    localStorage['device'] = deviceToken;
                                }
                                else{
                                    alert(json.msg);
                                }
                            },
                            error: function(){
                                alert("error al insertar la apikey en el servidor:");
                            }
                        });
                    }
                    catch(err){
                        alert(err);
                    }
                }
            }
        }
        catch(eeeeee){

//alert(eeee+"error registration1111");

        }
    });

    push.on('notification', function(data){
        var mensaje = data.message;
        if(data.additionalData.id){
            var id = data.additionalData.id;
        }if(data.additionalData.conductor){
            var conductor = data.additionalData.conductor;
        }if(data.additionalData.celular){
            var celular = data.additionalData.celular;
        }if(data.additionalData.rutadestino){
            var rutadestino = data.additionalData.rutadestino;
        }if(data.additionalData.rutallegada){
            var rutallegada = data.additionalData.rutallegada;
        }if(data.additionalData.placa){
            var placa = data.additionalData.placa;
        }
        var titulo = data.title;
        var tipo = data.additionalData.tipo;
        console.log(JSON.stringify(data));
        //alert(JSON.stringify(data));
        if(titulo === undefined)
        titulo=data.additionalData.titulo;        
        mostrarpush(mensaje, titulo, id, tipo, conductor, celular,rutadestino, rutallegada, placa);        
    });

    push.on('error', function(e){
        // e.message
        //alert(e.message);
    });

}

function successHandler(result){
    console.log('result = ' + result);
}

function errorHandler(error){
    console.log('error = ' + error);
}

function tokenHandler (result){
    var deviceToken = result;
    if(localStorage['device'] != deviceToken){
        var y = '{ "userid" : ["' + localStorage['idusuario'] + '"] , "token" : ["' + localStorage['token'] + '"], "device" : ["'+deviceToken+'"]}';
        var url = "http://" + direccionservidor + "web/app.php/userapi/setDevice";
        try{
            var objeto = $.ajax({
                type: "POST",
                url: url,
                data: y,
                cache: false,
                success: function(){
                    var json = JSON.parse(objeto.responseText);
                    if(json.msg == "correcto"){
                        localStorage['device'] = deviceToken;
                    }else{
                        alert(json.msg);
                    }
                },
                error: function(){
                    alert("error al conectarse al servidor");
                }
            });
        }
        catch(err){
            alert(err);
        }
    }
}

// iOS
function onNotificationAPN (event){
    if ( event.alert ){
        navigator.notification.alert(event.alert);
    }

    if ( event.sound ){
        var snd = new Media(event.sound);
        snd.play();
    }

    if ( event.badge ){
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}

// Android
function onNotification(e){
    var id;
    var claase;
    var mensaje;
    switch( e.event ){
        case 'registered':
            if ( e.regid.length > 0 ){
                var deviceToken = e.regid;
                if(localStorage['device'] != deviceToken){
                    var y = '{ "userid" : ["' + localStorage['idusuario'] + '"] , "token" : ["' + localStorage['token'] + '"], "device" : ["'+deviceToken+'"]}';
                    var url = "http://" + direccionservidor + "web/app.php/userapi/setDevice";
                    try{
                        var objeto = $.ajax({
                            type: "POST",
                            url: url,
                            data: y,
                            cache: false,
                            success: function(){
                                var json = JSON.parse(objeto.responseText);
                                if(json.msg == "correcto"){
                                    localStorage['device'] = deviceToken;
                                }else{
                                    alert(json.msg);
                                }
                            },
                            error: function(){
                                alert("error al conectarse al servidor");
                            }
                        });
                    }
                    catch(err){
                        alert(err);
                    }
                }
            }
        break;
        case 'message':
            mensaje = e.payload.message;
            id = e.payload.data.id;
            titulo = e.payload.data.title;

            if ( e.foreground ){
                //var soundfile = e.soundname;
                //var my_media = new Media("/android_asset/www/"+ soundfile);
                //my_media.play();
                //navigator.notification.alert("Aplicacion en uso", null, nombreaplicacion, "Aceptar");
                mostrarpush(mensaje, titulo, id);
            }else{
                if ( e.coldstart ){
                    //navigator.notification.alert('COLDSTART NOTIFICATION', null, nombreaplicacion, "Aceptar");
                    setTimeout(function(){ mostrarpush(mensaje, titulo, id); }, 6000);
                }else{
                    //navigator.notification.alert('BACKGROUND NOTIFICATION', null, nombreaplicacion, "Aceptar");
                    mostrarpush(mensaje, titulo, id);
                }
            }
            //Only works for GCM
            //navigator.notification.alert('MESSAGE -> MSGCNT: ' + e.payload.msgcnt, null, nombreaplicacion, "Aceptar");

            //navigator.notification.alert('Data => id:' + e.payload.data.id + ", title: " + e.payload.data.title, null, nombreaplicacion, "Aceptar");
        break;
        case 'error':
            alert('ERROR -> MSG:' + e.msg);
        break;

        default:
            alert('EVENT -> Unknown, an event was received and we do not know what it is');
        break;
    }
}

function mostrarpush(mensaje, titulo, id, tipo, conductor, celular,rutadestino, rutallegada, placa){
    console.log(tipo);
    switch(tipo){
       case 'llegadaconductor':
            alerta(mensaje,titulo,tipo,id);
            break;
        case 'llegadaoficina':
            alerta(mensaje,titulo,tipo,id);
            break;
        case 'QRexitoso':
            alerta(mensaje,titulo,tipo,id);
            break;
        case 'nuevoservicio':
            //alert('nuevo servicio '+ mensaje+' '+titulo+' '+tipo);
            alerta(mensaje,titulo,tipo,id);
            break;
        case 'servicioaceptado':
            //alert('nuevo servicio '+ mensaje+' '+titulo+' '+tipo);
            var cuerpo = mensaje+'\n'+'Ruta recogida: '+rutallegada+'\n'+'Ruta destino: '+rutadestino+'\n'+'Nombre de conductro: '+conductor+'\n'+'Celular: '+celular+'\n'+'Placa: '+placa; 
            alerta(cuerpo,titulo,tipo);
            break;            
    }


    //Llegada
    if(titulo == "ll"){      
      navigator.notification.vibrate(1500);
      navigator.notification.alert(
        mensaje,
        null,
        nombreaplicacion,
        'Aceptar'
      );
    }

    //pago efectivo
    if(titulo == "pe"){      
      navigator.notification.vibrate(1500);
      navigator.notification.confirm(
          "Gracias por usar " + nombreaplicacion + ", Te invitamos a calificar nuestro servicio",
          function(button){
            if(button == 1){
              var dd = new Array();
              dd['reserva'] = localStorage['reservaactiva'];
              mostrarpagina("factura", dd);
              $('#codigomovip').dialog("close");
            }else{
              $('.btn_menu').toggleClass('usuario');
              mostrarpagina("reserva");
              $('#codigomovip').dialog("close");
            }
          },
          nombreaplicacion,
          'Aceptar,Ahora no'
        );
      /*navigator.notification.alert(
        mensaje, 
        null,
        nombreaplicacion,
        'Aceptar'
      );
      $('.btn_menu').toggleClass('usuario');
      mostrarpagina("reserva", dd);*/
    }

    //Inicio de servicio
    if(titulo == "ic"){
      
      idreservaglobal=0;
      reciveinfo=false;
      clearInterval(progressubicacion);
      navigator.notification.vibrate(1500);
      navigator.notification.alert(
        mensaje,
        null,
        nombreaplicacion,
        'Aceptar'
      );
    }

    //fin servicio
    if(titulo == "fc"){      
      idreservaglobal=0;
      reciveinfo=false;
      clearInterval(progressubicacion);
      navigator.notification.vibrate(1500);
      navigator.notification.alert(
        mensaje,
        null,
        nombreaplicacion,
        'Aceptar'
      );
      var dd = new Array();
      dd["reserva"] = id;
      mostrarpagina("fin", dd);
    }

    // Push conductor

    //nuevo pedido
    if(titulo == "np"){      
      var date = new Date();
      horanp=date.getTime();
      timeacept=true;
      idreservatoacept=id;
      navigator.notification.vibrate(1500);
      navigator.notification.confirm(
      mensaje,
      function(button){
          if(button == 1){
              var dd = new Array();
              dd["reserva"] = id;
              mostrarpagina('pedido', dd);
              //navigator.notification.alert("El tiempo de espera superó los 15 segundos este pedido fue asignado o otro Transportman" , null, "MOVIP", "Aceptar");
        }else if(button == 2){
            aceptarserviciodirecto(id);
        }
      },
      "Nuevo Servicio",
      'Ver,Aceptar,Cancelar'
      );
    }
    //nuevo pedido web
    if(titulo == "nps"){
      
      var date = new Date();
      horanp=date.getTime();
      timeacept=true;
      idreservatoacept=id;
      navigator.notification.vibrate(1500);
     // navigator.notification.alert(mensaje, function(){ enviocorreo(id); }, nombreaplicacion, "Aceptar");
        navigator.notification.confirm(
      mensaje,
      function(button){
      
        if(button == 1){
            aceptarserviciodirecto(id);
        }else if (button == 2){
         rechazarservicio(id);
        }
      },
      "Nuevo Servicio",
      'Aceptar,Rechazar'
      );
    }
    if(titulo == "swa"){      
      var date = new Date();
      horanp=date.getTime();
      timeacept=true;
      idreservatoacept=id;
      navigator.notification.vibrate(1500);
      navigator.notification.confirm(
      mensaje,
      function(button){
        if(button == 1){
            aceptarserviciodirecto(id);
        }else if(button == 2){
            rechazarservicio(id);
        }
      },
      "Nuevo Servicio",
      'Aceptar,Rechazar'
      );
    }
    //servicio asignado
    if(titulo=="sa"){
        navigator.notification.alert(
          mensaje,
          null,
          nombreaplicacion,
          'Aceptar'
          );
        var dd = new Array();
        dd["reserva"] = id;
        mostrarpagina('pedido', dd);
    }
    //pedido cancelado
    if(titulo == "pc"){     
      navigator.notification.vibrate(1500);
      navigator.notification.alert(
        mensaje,
        null,
        nombreaplicacion,
        'Aceptar'
      );
      var dd = new Array();
      dd["reserva"] = id;
      mostrarpagina("cancelado", dd);
    }
    //push vencimiento documentos
    if(titulo == "vd"){
        navigator.notification.vibrate(1500);
        navigator.notification.alert(
          mensaje,
          null,
          nombreaplicacion,
          'Aceptar'
        );
        mostrarpagina("documentosporvencer", null, id);
    }
    //push combinado
    if(titulo == "chat"){
        if(localStorage['rol'] == 3){
            if(id == $.get('id') && $.mobile.activePage.data('url') == 'chat'){
              navigator.notification.vibrate(1500);
              var mensajes = document.getElementById("mensajesusuario");
              var html = "<div class='el'> " + mensaje + "<div>";
              $(mensajes).append(html);
              $('html, body').animate({ scrollTop: $(document).height() }, 1500);
            }else{
              navigator.notification.confirm(chatuser+" dice:  "+chatmensaje,
                function(button){
                  if(button == 1)
                  {
                    var dd = new Array();
                    dd["reserva"] = id;
                    mostrarpagina('chat',dd);
                  }
                },
                "Nuevo mensaje",
                'Ver,Mas tarde'
              );
            }
        }else{
            if(id == $.get('id') && $.mobile.activePage.data('url') == 'chatc'){
                navigator.notification.vibrate(1500);
                var mensajes = document.getElementById("mensajesconductor");
                var html = "<div class='el'> " + mensaje + "<div>";
                $(mensajes).append(html);
                $('html, body').animate({ scrollTop: $(document).height() }, 1500);
            }else{
                navigator.notification.confirm(
                    chatconductor+" dice:  "+chatmensaje,
                    function(button){
                        if(button == 1){
                            var dd = new Array();
                            dd["reserva"] = id;
                            mostrarpagina('chatc',dd);
                        }
                    },
                "Nuevo mensaje",
                'Ver,Mas tarde'
                );
            }
        }
    }

    //envio de noticias
    if(titulo == "info"){     
      navigator.notification.vibrate(1500);
      navigator.notification.alert(
        mensaje,
        null,
        nombreaplicacion,
        'Aceptar'
      );
    }

    if(titulo == "dpv"){     
      navigator.notification.vibrate(1500);
      navigator.notification.confirm(
        mensaje,
        function(button){
          if(button == 1)
          {
            var dd = new Array();
            dd["reserva"] = id;
            mostrarpagina('documentosporvencer', dd);
          }
        },
        "Documentos a vencer",
        'Ver,Aceptar'
      );
    }

    if(titulo == "fac"){     
        navigator.notification.vibrate(1500);
        navigator.notification.confirm(
            mensaje,
            function(button){
              if(button == 1)
              {
                mostrarpagina('reserva');
              }
            },
            nombreaplicacion,
            'Termianr'
        );
        $('.btn_menu').addClass('usuario');

        $('.btn_menu.usuario').click(function(){
            $('.section_menu.usuario').toggleClass('active');
            $('.section_content').toggleClass('to_right');
        });
    }
}

document.addEventListener("deviceready", registerdevice, false);

