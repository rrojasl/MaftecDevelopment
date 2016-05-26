function suscribirEventos() {
    suscribirEventoGuardar();
}

suscribirEventos();

function suscribirEventoGuardar() {
    $('.accionGuardar').click(function (e) {
        AjaxGuardar();
    });
}