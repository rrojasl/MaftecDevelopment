function ObtenerListasPQR() {

    var TipoDato = 1;

    $PQR.PQR.read({ Proyecto: 28, PruebaID: 2, token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#ProcesoSoldaduraRellenoID").data("kendoComboBox").dataSource.data(data[0].ListaProcesosSoldadura);
            $("#ProcesoSoldaduraRaizID").data("kendoComboBox").dataSource.data(data[0].ListaProcesosSoldadura);
            $("#GrupoPMaterialBase1ID").data("kendoComboBox").dataSource.data(data[0].ListaMaterialesBase);
            $("#GrupoPMaterialBase2ID").data("kendoComboBox").dataSource.data(data[0].ListaMaterialesBase);
            $("#CodigoID").data("kendoComboBox").dataSource.data(data[0].ListaCodigos);
        }
    });
};