var nombreaplicacion = 'CHETO';
//funcio que loguea en el sistema
function login(){
    try{
        $('.cargando').show();
        if(document.getElementById("username").value == "" || document.getElementById("password").value == ""){
            $('.cargando').hide();
            alerta("Campos incompletos, por favor ingrese los datos faltantes",nombreaplicacion);
        }else{
            var y = '{"login" : [ "'+document.getElementById("username").value+'"] , "password" : [ "'+ hex_sha1(document.getElementById("password").value)+'"] }';
            var url = "http://" + direccionservidor + "web/app.php/userapi/ingreso";
            console.log(y);
            var objeto=$.ajax({
                type: "POST",
                url: url,
                data: y,
                cache: false,
                success: function()
                {
                    var json = JSON.parse(objeto.responseText);
                    if(json[0].error == ""){
                        
                        //$('#footer').show();
                        //Guarda datos de usuario
                        localStorage['idusuario'] = json[0].id;
                        localStorage['rol'] = json[0].rol;
                        localStorage['token'] = json[0].token;
                        localStorage['convenio'] = json[0].convenio;
                        localStorage['telefono'] = json[0].telefono;
                        //window.location.reload();
                        if(localStorage['rol'] == 3){
                            //alert('rol = 3');
                            $('.cargando').hide();
                            //$.mobile.changePage( "main.html#home", { transition: "fade", changeHash: true }, true, true);
                            console.log(json[0].carro);
                            localStorage['conductor'] = json[0].conductor;
                            var contadorcarros = 0;
                            var formaselect = document.getElementById('selectcarroconduce');
                            var html = "";
                            while(json[0].carro[contadorcarros + '~1'] != null && json[0].carro[contadorcarros + '~1'] != undefined)
                            {
                              html += "<option value ='" + json[0].carro[contadorcarros + '~1'] + "'>" + json[0].carro[contadorcarros + '~2'] + "</option>";
                              contadorcarros++;
                            }
                            console.log(contadorcarros);
                            $(formaselect).html(html);
                            $('.cargando').show();
                            if(contadorcarros == 1){
                                console.log('entro a contadorcarros');
                              seleccionarcarroconduce();
                             // mostrarpagina("home");
                            }else if(contadorcarros==0){
                                alerta("El vehiculo con el que desea ingresar esta siendo utilizado por otro conductor", nombreaplicacion); 
                                $('.cargando').hide();
                                localStorage.clear();
                                sessionStorage.clear();                                
                                //navigator.notification.alert("El vehiculo con el que desea ingresar esta siendo utilizado por otro conductor", null, nombreaplicacion, "Aceptar");
                            }else{
                                $.mobile.changePage( "main.html#seleccionarcarro", { transition: "fade", changeHash: true }, true, true);
                                //mostrarpagina("seleccioncarro");
                            }
                        }else{
                            $('.cargando').hide();
                            $.mobile.changePage( "main.html#reserva", { transition: "fade", changeHash: true }, true, true);
                            localStorage['email'] = json[0].email;
                            $('.cargando').hide();
                            console.log('se mostrara alerta');
                            //la funcion alerta valida el tipo de dispositivo que se usa y muestra la alerta o la confirmacion segun sea el caso.
                            alerta("Desea inscribir una tarjeta de cr\u00E9dito",nombreaplicacion,'inscribirtarjeta');
        //                   navigator.notification.confirm(
        //                                "Desea inscribir una tarjeta de cr\u00E9dito",
        //                                 function(button){
        //                                if(button == 1)
        //                                    {
        //                                  
        //                                  mostrarpagina('tarjeta');
        //                                    }
        //                                    else
        //                                        {
        //                             validarpagoefectivo();
        //                                     }
        //                                         },
        //                                nombreaplicacion,
        //                              'Aceptar,Ahora no'
        //                                  );
                        accionesPasajero();
                        }
                        //alerta('se registrara el movil',nombreaplicacion,'Aceptar');
                        if(navigator.platform == 'Win32'){
                            console.log('aqui deberia de registrar el dispositivo para las notificaciones.');
                        }else{
                            registerdevice();
                        }                       
                        //opensocket();
                    }else{
                        $('.cargando').hide();
                        if(navigator.platform == 'Win32'){
                            alert('Usuario o contrase\u00F1a incorrectos ,verifique may\u00Fasculas y min\u00Fasculas", null, nombreaplicacion, "Aceptar');
                        }else{
                            navigator.notification.alert("Usuario o contrase\u00F1a incorrectos ,verifique may\u00Fasculas y min\u00Fasculas", null, nombreaplicacion, "Aceptar");
                        }
                  }
                },error: function(err){
                    if(navigator.platform == 'Win32'){
                        alert('Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente ' + err +'');
                    }else{
                      navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente " + err , null, nombreaplicacion, "Aceptar");
                      $('.cargando').toggleClass('active');
                  }
                }
            });
        }
    }catch(err){
        console.log(err);
    }
}

//funcion que cierra la session
function salir(){
    if(localStorage['rol'] == 3){
        var y = '{ "carro" : ["'+localStorage['carro']+'"],  "userid" : ["'+localStorage['idusuario']+'"] , "token" : ["'+localStorage['token']+'"]}';
        var url = "http://" + direccionservidor + "web/app.php/userapi/salir";
        console.log(y);
        var objeto=$.ajax({
            type: "POST",
            url: url,
            data: y,
            cache: false,
            success: function(){
                var json = JSON.parse(objeto.responseText);
                console.log(json);
                if(json.error == ""){
                localStorage.clear();
                sessionStorage.clear();  
                $.mobile.changePage( "main.html#login", { transition: "slice", changeHash: true }, true, true);
                toogleMenu();
                //$('.section_menu').slideToggle();
                
                //                 setTimeout(function(){window.location.reload(function(){
                //                         alerta('Sesi\u00f3n cerrada exitosamenteeee',nombreaplicacion,'exit');
                //                         mostrarpagina("login");                         
                //                     });
                //                 },160);
                 //navigator.notification.alert("Sesi\u00f3n cerrada exitosamente",function(){navigator.app.exitApp();}, nombreaplicacion, "Aceptar");


                // $('.btn_menu.conductor').unbind('click');
                // $('.btn_menu.conductor').unbind('click');      
                }else{
                    alerta(json.error,nombreaplicacion,'Aceptar');
                ///navigator.notification.alert(json.error, null, nombreaplicacion, "Aceptar");
                }
            },
            error: function(){
                alerta('Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente',nombreaplicacion,'Aceptar');
                //navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente", null, nombreaplicacion, "Aceptar");
                $('.cargando').toggleClass('active');
            }
        });
    }else{
        localStorage.clear();
        sessionStorage.clear(); 
        $.mobile.changePage( "main.html#login", { transition: "slice", changeHash: true }, true, true);
        toogleMenu();
    }
}

//funcio que envia el form del login.
function enviarLogin(tipo,email,nombre,foto,accessToken,uid){
    var datos = null;
    var url = "http://" + direccionservidor + "web/app.php/userapi/ingreso";
    var usuario = email;
    var clave = uid;
    alert(usuario+"--"+clave);
    datos = '{"login" : [ "'+email+'"] , "password" : [ "'+ uid+'"] }';
    var ob1 = $.ajax ({
        url: url,
        type: "POST",
        data: datos,
        success: function(dir) { 
            $('.cargando').hide();
            $.mobile.changePage( "main.html#reserva", { transition: "fade", changeHash: true }, true, true);
            localStorage['email'] = json[0].email;
            $('.cargando').hide();
            console.log('se mostrara alerta');
            //la funcion alerta valida el tipo de dispositivo que se usa y muestra la alerta o la confirmacion segun sea el caso.
            alerta("Desea inscribir una tarjeta de cr\u00E9dito",nombreaplicacion,'inscribirtarjeta'); 
        },
        error: function(dir) {
            validadorDispositivo('fallaLogin','Usuario o contraseña incorrect, intente de nuevo.');
            console.log('error al validar usuario con el servidor: '+dir);
        }
    });   
}
