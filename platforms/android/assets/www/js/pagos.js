var nombreaplicacion = 'CHETO';
function validarpagoefectivo()
{  
    localStorage['tt']="efectivo";
    alerta("Tus servicios se pagar\u00E1n en efectivo",'CHETO','pagoefectivo');
//  navigator.notification.alert("Tus servicios se pagar\u00E1n en efectivo", function(){
//        mostrarpagina("reserva");
//      }, nombreaplicacion, "Aceptar");

//      $('.btn_menu').toggleClass('usuario');
//
//      $('.btn_menu.usuario').click(function(){
//        $('.section_menu.usuario').toggleClass('active');
//        $('.section_content').toggleClass('to_right');
//        
//      });
     
}

function validarTarjeta()
{
  var number = document.getElementById("number").value;
  var name_card = document.getElementById("name_card").value;
  var payer_id = document.getElementById("payer_id").value;
  var exp_month = document.getElementById("exp_month").value;
  var exp_year = document.getElementById("exp_year").value;
  var method = document.getElementById("method").value;
  var cvc = document.getElementById("cvc").value;
  var documento = document.getElementById("document").value;
  var continuar = true;
  if(isNaN(documento) || documento <= 0 || documento.length <5 || documento.length >30)
  {
    alerta("Verifica el n\u00famero de tu documento", nombreaplicacion, "Aceptar");
    continuar = false;
  }

  if(method == 0)
  {
    alerta("Debes indicar la franquicia de tu tarjeta", nombreaplicacion, "Aceptar");
    continuar = false;
  }

  if(method == "AMEX")
  {
    if(cvc.length != 4 || isNaN(cvc))
    {
      alerta("El c\u00f3digo de seguridad(cvc) debe ser un n\u00famero de cuatro d\u00edgitos", nombreaplicacion, "Aceptar");
      continuar = false;
    }
  }
  else
  {
    if(cvc.length != 3 || isNaN(cvc))
    {
      alerta("El c\u00f3digo de seguridad(cvc) debe ser un n\u00famero de tres d\u00edgitos", nombreaplicacion, "Aceptar");
      continuar = false;
    }
  }

  var f = new Date();
  var mes = (f.getMonth() +1);
  var anio =  f.getFullYear();
  if(isNaN(exp_month) || (exp_month.length != 2 && exp_month.length != 1))
  {
    alerta("Verifica el mes de vencimiento", nombreaplicacion, "Aceptar");
    continuar = false;
  }
  else
  {
    if(isNaN(exp_year) || exp_year.length != 4)
    {
      alerta("Verifica el a\u00F1o de vencimiento", nombreaplicacion, "Aceptar");
      continuar = false;
    }
    else
    {
      if(exp_year < anio)
      {
        alerta("La tarjeta ingresada ya expir\u00f3", nombreaplicacion, "Aceptar");
        continuar = false;
      }
      else
      {
        if(exp_year == anio)
        {
          if(exp_month <= mes)
          {
            alerta("La tarjeta ingresada ya expir\u00f3", nombreaplicacion, "Aceptar");
            continuar = false;
          }
        }
      }
    }
  }

  if(isNaN(number))
  {
    alerta("Verifica el n\u00famero de la tarjeta", nombreaplicacion, "Aceptar");
    continuar = false;
  }
  else
  {
    if((method == "VISA" || method == "MASTERCARD") && number.length != 16)
    {
      alerta("Verifica el n\u00famero de la tarjeta", nombreaplicacion, "Aceptar");
      continuar = false;
    }
    if(method == "AMEX" && number.length != 15)
    {
      alerta("Verifica el n\u00famero de la tarjeta", nombreaplicacion, "Aceptar");
      continuar = false;
    }
    if(method == "DINERS" && number.length != 14)
    {
      alerta("Verifica el n\u00famero de la tarjeta", nombreaplicacion, "Aceptar");
      continuar = false;
    }
  }

  if(continuar)
  {
    $('.cargando').toggleClass('active');

    localStorage['mt'] = method;

    payU.setCardDetails({
      number: number,
      name_card: name_card,
      payer_id: payer_id,
      exp_month: exp_month,
      exp_year: exp_year,
      method: method,
      cvc: cvc,
      document: documento
    });

    payU.createToken(responseHandlertarjeta);
  }
}

function responseHandlertarjeta(response)
{
    $('.cargando').hide();

    if(response.error)
    {
        console.log(response.error);
        alerta(response.error, nombreaplicacion, "Aceptar");
    }
    else
    {
        var token = response.token;
        localStorage['tt'] = token;
        alerta("Tus datos fueron guardados correctamente", 'tokenizado', "Aceptar");
        if(document.getElementById("valorartarjeta").value == "0"){
//
//          $('.btn_menu').toggleClass('usuario');
//
//              $('.btn_menu.usuario').click(function(){
//                $('.section_menu.usuario').toggleClass('active');
//                $('.section_content').toggleClass('to_right');
//              });

        }
    }
}