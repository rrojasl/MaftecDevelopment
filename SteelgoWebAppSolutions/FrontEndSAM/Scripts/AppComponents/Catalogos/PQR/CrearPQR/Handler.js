function suscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoBlur();
}

suscribirEventos();

function suscribirEventoBlur() {
    $("#NombreId").blur(function (e) {
        AjaxExistePQR();
    });
}

function suscribirEventoGuardar() {
    $('.accionGuardar').click(function (e) {
        AjaxGuardar();
    });
}