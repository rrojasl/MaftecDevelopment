function AjaxNuevoSoldadorCertificacion() {

    $SoldadorCertificacion.SoldadorCertificacion.read({ token: Cookies.get("token"), Lenguaje: $("#language").val(), idSoldadorCertificacion: 0 }).done(function (data) {
        if (Error(data)) {
            $("#inputTipoPrueba").data("kendoComboBox").dataSource.data(data.ListaTipoPrueba);
            $("#inputProcesoSol").data("kendoComboBox").dataSource.data(data.ListaTipoProcesosSoldadura);
            $("#inputNombrePQR").data("kendoComboBox").dataSource.data(data.ListaPQR);
        }
    });
}