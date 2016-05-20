
function obtenerPQRAjax() {
    $PQR.PQR.read({ token: Cookies.get("token"), TipoAccion: 1 }).done(function (data) {
        $("#PQRRaizNombre").data("kendoComboBox").dataSource.data(data);
        $("#PQRRellenoNombre").data("kendoComboBox").dataSource.data(data);
    });
}

function AjaxObtenerListaProyectos() {
    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token") }).done(function (data) {

        $("#Proyecto").data("kendoComboBox").dataSource.data([]);
        $("#Proyecto").data("kendoComboBox").dataSource.data(data);
    });
}


function AjaxGuardar() {

}