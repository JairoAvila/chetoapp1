var nombre,apellido,email,foto,accessToken,uid,status;
function fbStatusSuccess(response){
    if(response.status === 'connected'){
        uid = response.authResponse.userID;
        accessToken = response.authResponse.accessToken;
        facebookConnectPlugin.api('/me?fields=email,id,name,picture', ["public_profile"],
        function onSuccess (result) {
         console.log("Result: ");
         console.log(result);
         console.log("uid: "+ uid+accessToken);
         email = result.email;
         nombre = result.name;
         //foto =  result.picture.data.url;
         foto = 'https://graph.facebook.com/'+uid+'/picture?type=large';
         enviarLogin('redes',email,nombre,foto,accessToken,uid);
        }, function onError (error) {
            alert('error '+error);
          console.error("Failed: ", error);
        }
      );
    } else if (response.status === 'not_authorized') {
        alert('usuario logeado en facebook pero no autorizado');
    } else {
        alert('el usuario no esta logeado en facebook');
  }
}
function fbLoginSuccess(response){
    if(response.status === 'connected'){
        facebookConnectPlugin.getLoginStatus(fbStatusSuccess,function(error){
            console.log('error logeo: '+error);
        });
    } else if (response.status === 'not_authorized') {
        alert('usuario logeado en facebook pero no autorizado');
    } else {
        alert('el usuario no esta logeado en facebook');
    }  
}
function loginFacebook(){
    $('.fondo-azul-face').removeClass('fondo-azul-face').addClass('fondo-azul-face-sel');
    facebookConnectPlugin.login(["public_profile","email"], fbLoginSuccess, function(error){
        dialogo('errorface');console.log('error logeo: '+error);
    });
}
function logoutFB(){
    facebookConnectPlugin.logout(function(){console.log('salida exitosa');},function(e){console.log('error');});
}