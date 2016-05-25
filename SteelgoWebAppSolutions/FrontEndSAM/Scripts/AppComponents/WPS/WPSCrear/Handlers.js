function suscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoNombreWPS();
}

suscribirEventos();


function suscribirEventoGuardar() {
    $('.accionGuardar').click(function (e) {
        AjaxGuardar();
    });
}



function suscribirEventoNombreWPS() {
    $("#NomnreWPS").blur(function (e) {
        AjaxExisteWPS();
    });

    $("#NomnreWPS").keyup(function (e) {
        $('#NomnreWPS').val( $('#NomnreWPS').val().toUpperCase());
    });
}