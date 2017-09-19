var num = '';
var diasrecogida = new Array();
var y = [];
var latSalida,longSalida,latLlegada,longLlegada,horaentrada,diarecogida,otrosDias,cordSalida,cordLlegada,userid,horacompleta;

function obtenerDatosReserva(){
    latSalida = $('#latitudsalida').val();
    longSalida = $('#longitudsalida').val();
    latLlegada = $('#latitudllegada').val();
    longLlegada = $('#longitudllegada').val();
    horaentrada = $('#horaentrada').val();
    diarecogida = $('#diarecogida').val();
    otrosDias = $('#diasrecogida').val();
    cordSalida = latSalida+', '+longSalida;
    cordLlegada = latLlegada+', '+longLlegada;
    userid = localStorage.idusuario;
    horacompleta = '2017-01-01 '+horaentrada+':00';
    y = {userid : ""+userid+"", aksalida: ""+cordSalida+"", akllegada: ""+cordLlegada+"", npasajeros: 2, horaentradaoficina: ""+horacompleta+"",diasrecogida: []};
};

function enviarReserva(){
    obtenerDatosReserva();
    //console.log(diasrecogida);
    if(diasrecogida.length == 0){
        var dia = $('.diasrecogida').val(); 
        diasrecogida = [{dia: ""+dia+"","pasajeros": 1}];
        //console.log(diasrecogida);
    }
    console.log(diasrecogida);
    //var y = '{"userid" : "'+userid+'", "aksalida": "'+cordSalida+'", "akllegada": "'+cordLlegada+'", "npasajeros": 2, "horaentradaoficina": "'+horacompleta+'","diasrecogida": "'+diasrecogida+'"}';
    
    var url = "http://" + direccionservidor + "web/app.php/movilapi/reservasmovil";
    y.diasrecogida.push(diasrecogida);
    var datos = JSON.stringify(y);
    console.log(datos);
    console.log(url);
    console.log(y);
    var objeto=$.ajax
    ({
      type: "POST",
      url: url,
      data: datos,
      cache: false,
      success: function()
      {
          var json = JSON.parse(objeto.responseText);
          //var json = objeto.responseText;
          console.log(json);
          //alert(json.error);
          if(json.error == "")
            {
              alert('exitoso');
              //navigator.notification.alert("Parada guardada con \u00e9xito" , null, nombreaplicacion, "Aceptar"); 
            }
            else
            {
                alert('error');
              //navigator.notification.alert(json.error , null, nombreaplicacion, "Aceptar");
            }
      },
      error: function()
      {
          navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente" , null, nombreaplicacion, "Aceptar");
          $('.cargando').toggleClass('active');

      }
    });
}
//funcion que ingresa el numeor uno en la cantidad de pasajeros cuando selecciono un dia de recogida
function numCero(check,num){    
    obtenerDatosReserva();     
    console.log(y);
    var cuentacheck = '';
    if( $('#'+check).prop('checked') ) { 
        //diasrecogida = [];
        //alert('Seleccionado: '+num);
        $('#'+num).text(1);
        $("input:checkbox:checked").each(function(e) {
            cuentacheck = e;
        });
        
        console.log(cuentacheck);
        console.log(diasrecogida);
        if(cuentacheck == 1){
            //diasrecogida = [];
            for(var i= 0; i < diasrecogida.length; i++){
                var numpas = diasrecogida[i]['pasajeros'];
                var diarec = diasrecogida[i]['dia'];
                var indice = i;
                console.log('indice: '+indice+' numeropasajeros: '+numpas+' dias: '+diarec);
            }
            console.log('check = 1');
            $("input:checkbox:checked").each(function(e) {
                var valor = $(this).val();
                console.log(e);
                console.log(diasrecogida);
                //console.log(diasrecogida.e.dia);
                //if(valor == diasrecogida[e]['dia']){console.log(valor)}
                if(indice != e){
                    var res = {dia: ""+valor+"","pasajeros": 1};
                    diasrecogida.push(res);
                    console.log(diasrecogida);
                }
            });
        }else{
            console.log('check != 1');
            var valor = $('#'+check).val();
            var res = {dia: ""+valor+"","pasajeros": 1};
            diasrecogida.push(res);        
        }
        console.log(diasrecogida);
//        $("input:checkbox:checked").each(function(e) {
//            var valor = $(this).val();
//            console.log(e);
//            console.log(diasrecogida);
//            //console.log(diasrecogida.e.dia);
//            //if(valor == diasrecogida[e]['dia']){console.log(valor)}
//            var res = {dia: ""+valor+"","pasajeros": 1};
//             diasrecogida.push(res);
//             console.log(diasrecogida);
//        });
    }else{
        alert('no seleccionado num: '+num);
        var check = $('#'+check).val();
        $('#'+num).text(0);
        for(var i = 0; i<diasrecogida.length; i++){            
            console.log(diasrecogida[i]['dia']+' -- '+check);
            if(diasrecogida[i]['dia'] == check){
                console.log('quitando');
                diasrecogida.splice(i,1);
            }
        }        
        //console.log('quitar');
    }
    console.log(diasrecogida);    
    y.diasrecogida.push(diasrecogida);    
    console.log(y);
    //y = '{"userid" : "'+userid+'", "aksalida": "'+cordSalida+'", "akllegada": "'+cordLlegada+'", "npasajeros": 2, "horaentradaoficina": "'+horacompleta+'", "diasrecogida": "'+[]+'"}';
    //console.log(diasrecogida);
}
//funcion que adiciona cantidad de pasajeros al oprimir mas o menos
function cantidadPasajeros(tipo,id,check){
    obtenerDatosReserva(); 
    //alert(id);
    //console.log(id);
    num = $('#'+id).text();  
    //alert(num);
    num = parseInt(num);
    //console.log(num);
    //console.log(tipo);
    if(tipo == 'mas'){
         num += 1;
    }else if(tipo == 'menos'){
         num -= 1;
    } 
    //console.log(num);
    if(num < 0 ){
        num = 0;
    }
    console.log(diasrecogida);    
    //alert(check);
    if( $('#'+check).prop('checked') ) {
        //alert('Seleccionado');
        console.log(diasrecogida.length);
        var fecha = $('#'+check).val();
        $('#'+id).text(num);        
        if(diasrecogida.length > 0){
            for(var i = 0; i<diasrecogida.length; i++){            
                console.log(diasrecogida[i]['dia']+' -- '+fecha);
                if(diasrecogida[i]['dia'] == fecha){
                    console.log('operacion');
                    console.log(diasrecogida[i]['pasajeros']);
                    console.log(num);
                    diasrecogida[i]['pasajeros'] = num;
                    if(num == 0){
                        alert('num0 #'+check);
                        $('#'+check).prop('checked',false);
                        diasrecogida.splice(i,1);
                    }
                    //diasrecogida.splice(i,1);
                }
            }            
        }else{
            console.log('entro');
            num = 2
            var res = {dia: ""+fecha+"","pasajeros": ""+num+""};
            diasrecogida.push(res);            
            console.log(diasrecogida);
        }
    }else{
        
        //alert('no seleccionado');
    }
    y.diasrecogida.push(diasrecogida);
    console.log(diasrecogida);
    console.log(y);
}
//funcion que me carga los siguientes 7 dias que puedo recoger un pasajero.
function diasRecogidas(){
    $('#diasrecogidas').empty();
    var fecharecogida = $('#diarecogida').val();
    console.log(fecharecogida);
    var arraydiarecogida = fecharecogida.split('-');
    var diarecogidaint = parseInt(arraydiarecogida[2]);
    var mesrecogidaint = parseInt(arraydiarecogida[1]);
    var anorecogidaint = parseInt(arraydiarecogida[0]);
    var diarecogidastr = arraydiarecogida[2];
    var mesrecogidastr = arraydiarecogida[1];
    var anorecogidastr = arraydiarecogida[0];
    var contenido = '';
    var pasajeros = '';
    var diassiguientes = '';
    var diarecogidastr = '';
    var nuevomes = '';
    var dias=[31,29,31,30,31,30,31,31,30,31,30,31];
    for(var j=0; j<dias.length; j++){
        if(mesrecogidaint-1 == j){
           var maximodia = dias[j]; 
        }
    }
    console.log(maximodia);
    for(var i=0; i<7; i++){       
        diassiguientes = diarecogidaint++;
        if(diassiguientes == maximodia){
            diarecogidaint = 1;
            nuevomes = i+1;
        }
        console.log(nuevomes+' == '+i);
        console.log('mesactual: '+mesrecogidastr);
        if(nuevomes === i){ 
            mesrecogidastr = mesrecogidaint+1;
            mesrecogidastr = '0'+mesrecogidastr.toString();
            console.log('cambio mes: '+mesrecogidastr);
        }
        if(diassiguientes <= 9){
           diarecogidastr = '0'+diassiguientes.toString();
        }else{           
            diarecogidastr = diassiguientes.toString();
        }
        console.log(diarecogidastr);
        var mas = '"mas"';
        var menos = '"menos"';
        var buscado = '"numero'+diassiguientes+'"';
        var checkbox = '"dia'+diassiguientes+'"';
        contenido += "<input type='checkbox' class='diasrecogida' name='dia"+diassiguientes+"' id='dia"+diassiguientes+"' value='"+diarecogidastr+"-"+mesrecogidastr+"-"+anorecogidastr+"' onclick='numCero(this.id,"+buscado+")'>"+diarecogidastr+"";    
        pasajeros += "<div class='vistalineal btnes_tot_pasajeros'><div class='vistalineal' id='mas"+diassiguientes+"' onclick='cantidadPasajeros("+mas+","+buscado+","+checkbox+");'><img src='img/iconos/mas.png' alt='mas'/></div><div class='vistalineal numero' id='numero"+diassiguientes+"'>0</div><div class='vistalineal menos' id='menos"+diassiguientes+"' onclick='cantidadPasajeros("+menos+","+buscado+","+checkbox+");'><img src='img/iconos/menos.png' alt='mas'/></div></div>";
    }
    $('#diasrecogidas').append(contenido);
    $('#totalpasajeros').append(pasajeros);
    var primerdia = "#dia"+arraydiarecogida[2];
    var primernum = "#numero"+arraydiarecogida[2];
    console.log(primerdia);
    console.log(primernum);
    $(primerdia).prop('checked', true);
    $(primernum).text(1);
    //console.log(arraydiarecogida[2]);
}
//funcion que encoge el mapa cuando voy a hacer la reserva.
function enviarReserva(){
    obtenerDatosReserva();
    //console.log(diasrecogida);
    if(diasrecogida.length == 0){
        var dia = $('.diasrecogida').val(); 
        diasrecogida = [{dia: ""+dia+"","pasajeros": 1}];
        //console.log(diasrecogida);
    }
    console.log(diasrecogida);
    //var y = '{"userid" : "'+userid+'", "aksalida": "'+cordSalida+'", "akllegada": "'+cordLlegada+'", "npasajeros": 2, "horaentradaoficina": "'+horacompleta+'","diasrecogida": "'+diasrecogida+'"}';
    
    var url = "http://" + direccionservidor + "web/app.php/movilapi/reservasmovil";
    y.diasrecogida.push(diasrecogida);
    var datos = JSON.stringify(y);
    console.log(datos);
    console.log(url);
    console.log(y);
    var objeto=$.ajax
    ({
      type: "POST",
      url: url,
      data: datos,
      cache: false,
      success: function()
      {
          var json = JSON.parse(objeto.responseText);
          //var json = objeto.responseText;
          console.log(json);
          //alert(json.error);
          if(json.error == "")
            {
              alert('exitoso');
              //navigator.notification.alert("Parada guardada con \u00e9xito" , null, nombreaplicacion, "Aceptar"); 
            }
            else
            {
                alert('error');
              //navigator.notification.alert(json.error , null, nombreaplicacion, "Aceptar");
            }
      },
      error: function()
      {
          navigator.notification.alert("Ocurri\u00f3 un error al conectarse con el servidor, valide su conexion e int\u00e9ntelo nuevamente" , null, nombreaplicacion, "Aceptar");
          $('.cargando').toggleClass('active');

      }
    });
}



