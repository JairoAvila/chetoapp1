function abrirPopup(dato){
    $('#'+dato).popup();
    $('#'+dato).popup('open');
}
function cerrarPopup(dato){
    $('#'+dato).popup('close');
}
function limpiarPopup(id1,id2){
    $('#'+id1).empty();
    $('#'+id2).empty();
}


