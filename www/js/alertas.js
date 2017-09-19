var tipoDevice,idrecibido;//variable global que guarda el tipo de dialogo que se mostrara en el dispositivo movil.

//funcion que recibe los mensajes y tipos de alertas que se mostraran.
function alerta(mensaje,titulo,tipo,id){
    console.log('entro a alerta');
    if(navigator.platform == 'Win32'){
        console.log('plataforma pc');
        dialogoPc(mensaje,tipo);
    }else{
        console.log('enviara notificacion de dispositivo');
        console.log(mensaje,titulo,tipo);
        dialogoDevice(mensaje,titulo,tipo,id);
    }
}
//funcion  que genera un dialogo para mostrar en el pc.
function dialogoPc(mensaje,tipo){
    console.log('tipo'+tipo);
    //if(tipo){
        switch(tipo){
            case 'inscribirtarjeta':
                    var r = confirm(mensaje);
                    validarConfirm(r,tipo);
                break;
            case 'pagoefectivo':
                    alert(mensaje);
                    $.mobile.changePage( "main.html#reserva", { transition: "slice", changeHash: true }, true, true);
                break;
            case 'codigomovip':
                    var r = confirm(mensaje);
                    validarConfirm(r,tipo);
                break;
            case 'tokenizado':
                    var r = alert(mensaje);
                    $.mobile.changePage( "main.html#reserva", { transition: "slice", changeHash: true }, true, true);
                break;
            default:
                console.log('entro a alerta defoult');
                    alert(mensaje);
                break;
        } 
    //}    
}
//funcion que valida el resutado de la confirmacion y ejecuta una accion.
function validarConfirm(r,tipo){
    switch(tipo){
        case 'inscribirtarjeta':
                if(r == true){
                    mostrarpagina('tarjeta');
                }else{
                    validarpagoefectivo();
                }
            break;
        case 'codigomovip':
                if(r == true){
                    var dd = new Array();
                    dd['reserva'] = localStorage['reservaactiva'];
                    mostrarpagina("factura", dd);
                    $('#codigomovip').dialog("close");
                }else{
                    $('.btn_menu').toggleClass('usuario');
                    mostrarpagina("reserva");
                    $('#codigomovip').dialog("close");
                }
            break;
    }
    
}
//funcion quue genera un dialogo para los dispositivos moviles.
function dialogoDevice(mensaje,titulo,tipo,id){
    console.log(tipo);
    if(tipo){
        tipoDevice = tipo;
        idrecibido = id;
        switch(tipo){
            case 'nuevoservicio':
                    navigator.notification.confirm(
                        mensaje,  // mensaje
                        callback, // callback
                        titulo,   // titulo
                        'Aceptar,Ahora no' // nombre de boton
                    );
                break;
            case 'QRexitoso':
                    navigator.notification.confirm(
                        mensaje,  // mensaje
                        callback, // callback
                        titulo,   // titulo
                        'Aceptar' // nombre de boton
                    );
                break;
            case 'llegadaconductor':
                    navigator.notification.confirm(
                        mensaje,  // mensaje
                        callback, // callback
                        titulo,   // titulo
                        'Aceptar' // nombre de boton
                    );
                break;
            case 'llegadaoficina':
                    navigator.notification.confirm(
                        mensaje,  // mensaje
                        callback, // callback
                        titulo,   // titulo
                        'Aceptar,Ahora no' // nombre de boton
                    );
                break;
            case 'inscribirtarjeta':
                    navigator.notification.confirm(
                        mensaje,  // mensaje
                        callback, // callback
                        titulo,   // titulo
                        'Aceptar,Ahora no' // nombre de boton
                    );
                break;
            case 'pagoefectivo':
                    navigator.notification.alert(
                        mensaje,  // mensaje
                        callback, // callback
                        titulo,   // titulo
                        'Aceptar' // nombre de boton
                    );                    
                break;
            case 'codigomovip':
                    navigator.notification.confirm(
                        mensaje,  // mensaje
                        callback, // callback
                        titulo,   // titulo
                        'Aceptar,Ahora no' //Nombre botones 
                    );                    
                break;
            case 'exit':
                    navigator.notification.alert(
                        mensaje,  // mensaje
                        callback, // callback
                        titulo,   // titulo
                        'Aceptar' // nombre de boton
                    );                   
                break;
            case 'tokenizado':
                    navigator.notification.alert(
                        mensaje,  // mensaje
                        null, // callback
                        titulo,   // titulo
                        'Aceptar' // nombre de boton
                    );                   
                break;
            default:
                    console.log('entro a la notificacion por defecto');
                    navigator.notification.alert(
                        mensaje,  // mensaje
                        null,     // callback
                        titulo,   // titulo
                        'Aceptar' // nombre de boton
                    );
                break;
        }
    }
    
}
//funcion callback de la funcion anterior, que valida el tipo de dialogo generado y redirecciona a la funcion correspondiente.
function callback(button){
    switch(tipoDevice){
        case 'nuevoservicio':
                validacionCallback(button);
            break;
        case 'llegadaconductor':
                validacionCallback(button);
            break;
        case 'llegadaoficina':
                validacionCallback(button);
            break;
        case 'QRexitoso':
                validacionCallback(button);
            break;
        case 'inscribirtarjeta':
                validacionCallback(button);
            break;
        case 'pagoefectivo':
                mostrarpagina("reserva");
            break;
        case 'codigomovip':
                validacionCallback(button);
            break;
        case 'exit':
                navigator.app.exitApp();
            break;
    }    
}
//funcion pra dispositivos moviles que valida el resultado de la confirmacion y ejecuta una accion.
function validacionCallback(button){
    switch(tipoDevice){ 
        case 'nuevoservicio':
                if(button == 1){
                    aceptarServicio(idrecibido);
                }else{
                        validarpagoefectivo();
                    }
            break;
        case 'llegadaconductor':
                if(button == 1){
                    generarQR(idrecibido);
                }
            break;
        case 'llegadaoficina':
                if(button == 1){
                    localStorage['idruta']=idrecibido;
                    $.mobile.changePage( $("#calificacion"), "slide", true, true);
                }else{
                    $.mobile.changePage( $("#reserva"), "slide", true, true);
                }
            break;
        case 'QRexitoso':
                if(button == 1){
                    $.mobile.changePage( $("#reserva"), "slide", true, true);
                }
            break;
        case 'inscribirtarjeta':
                if(button == 1){
                    mostrarpagina('tarjeta');
                }else{
                        validarpagoefectivo();
                    }
            break;
        case 'codigomovip':
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
            break
    }    
}

