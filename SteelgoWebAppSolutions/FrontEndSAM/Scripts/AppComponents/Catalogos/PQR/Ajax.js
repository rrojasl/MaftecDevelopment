
function LlenaGridAjax() {

    var TipoDato = 1;

    $PQR.PQR.read({TipoDato: TipoDato, Proyecto: 28, PruebaID: 2, Especificacion: null, Codigo: null, token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            resultadoJson = data;
            if (resultadoJson.length > 0) {
                $("#grid").data("kendoGrid").dataSource.data(resultadoJson);
            } else {
                $("#grid").data("kendoGrid").dataSource.data([]);
            };
        }
    });
};


//function EliminaPQRAjax(e) {
//    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
//    $PQR.PQR.update({}, { TipoDeDato: 4, PQRID: dataItem.PQRID, token: Cookies.get("token") }).done(function (data) {
//        loadingStart();
//        LlenarGridPQR();
//        loadingStop();
//    });
//};


//function AjaxActualizaSoldadoresRaiz(ProcesoSoldaduraID, tipoJunta, diametro, espesor, cedula) {
//    loadingStart();
//    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token"), procesoSoldaduraID: ProcesoSoldaduraID, tipoJunta: tipoJunta, diametro: diametro, espesor: espesor, cedula: cedula, proceso: 1, idProyecto: Cookies.get("Proyecto").split('°')[0] }).done(function (data) {
//        if (Error(data)) {
//            ItemSeleccionado.ListadoRaiz = data;
//        }
//        loadingStop();
//    });
//}

//function AjaxActualizaSoldadoresRelleno(ProcesoSoldaduraID, tipoJunta, diametro, espesor, cedula) {
//    loadingStart();
//    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token"), procesoSoldaduraID: ProcesoSoldaduraID, tipoJunta: tipoJunta, diametro: diametro, espesor: espesor, cedula: cedula, proceso: 0, idProyecto: Cookies.get("Proyecto").split('°')[0] }).done(function (data) {
//        if (Error(data)) {
//            ItemSeleccionado.ListadoRelleno = data;
//        }
//        loadingStop();
//    });
//}