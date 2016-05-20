
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

function AjaxGuardarListado() {
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    var correcto = true;
    var arregloCaptura = $("#grid").data("kendoGrid").dataSource._data;
    for (index = 0; index < arregloCaptura.length; index++) {
        ListaDetalles[index] = {
            PqrID: "",
            PqrNombre: "",
            Pwht: "",
            PreHeat: "",
            EspesorRelleno: "",
            EspesorRaiz: "",
            ProcesoSoldaduraRelleno: "",
            ProcesoSoldaduraRaiz: "",
            NumeroP: "",
            GrupoMaterialesBase1: "",
            GrupoMaterialesBase2: "",
            Aporte: "",
            Mezcla: "",
            Respaldo: "",
            GrupoF: "",
            Codigo: "",
            Accion: "",
            Estatus: 1
        };

        if ((arregloCaptura[index].Nombre == "" || $('#NombreId').val() == undefined || $('#NombreId').val() == null) ||
             arregloCaptura[index]) {
            correcto = false;
            displayNotify("", "El nombre del WPS es mandatorio", '1');
        }
        else if ($('#ProcesoSoldaduraRellenoID').data("kendoComboBox").dataItem($("#ProcesoSoldaduraRellenoID").data("kendoComboBox").select()) == undefined) {
            correcto = false;
            displayNotify("", "El proceso de soldadura de relleno debe coincidir", '1');
        }
        else if ($('#ProcesoSoldaduraRaizID').data("kendoComboBox").dataItem($("#ProcesoSoldaduraRaizID").data("kendoComboBox").select()) == undefined) {
            correcto = false;
            displayNotify("", "El proceso de soldadura de raiz debe coincidir", '1');
        }
        else if ($('#GrupoPMaterialBase1ID').data("kendoComboBox").dataItem($("#GrupoPMaterialBase1ID").data("kendoComboBox").select()) == undefined) {
            correcto = false;
            displayNotify("", "El campo Grupo Materiales Base 1 debe coincidir", '1');
        }
        else if ($('#GrupoPMaterialBase2ID').data("kendoComboBox").dataItem($("#GrupoPMaterialBase2ID").data("kendoComboBox").select()) == undefined) {
            correcto = false;
            displayNotify("", "El campo Grupo Materiales Base 2 debe coincidir", '1');
        }
        else if ($('#CodigoID').data("kendoComboBox").dataItem($("#CodigoID").data("kendoComboBox").select()) == undefined) {
            correcto = false;
            displayNotify("", "El campo código debe coincidir", '1');
        }

        ListaDetalles[0].PQRID = 0;
        ListaDetalles[0].Nombre = $('#NombreId').val();
        ListaDetalles[0].PWHT = $('#chkPwht').is(':checked') ? 1 : 0;
        ListaDetalles[0].PREHEAT = $('#chkPreHeat').is(':checked') ? 1 : 0;;
        ListaDetalles[0].EspesorRelleno = $("#EspesorRelleno").val();
        ListaDetalles[0].EspesorRaiz = $("#EspesorRaiz").val();
        ListaDetalles[0].ProcesoSoldaduraRellenoID = $("#ProcesoSoldaduraRellenoID").data("kendoComboBox").value();
        ListaDetalles[0].ProcesoSoldaduraRaizID = $("#ProcesoSoldaduraRaizID").data("kendoComboBox").value();
        ListaDetalles[0].NumeroP = $("#NumeroPID").val();
        ListaDetalles[0].GrupoPMaterialBase1 = $("#GrupoPMaterialBase1ID").data("kendoComboBox").value();
        ListaDetalles[0].GrupoPMaterialBase2 = $("#GrupoPMaterialBase2ID").data("kendoComboBox").value();
        ListaDetalles[0].Aporte = $("#AporteID").val();
        ListaDetalles[0].Mezcla = $("#MezclaID").val();
        ListaDetalles[0].Respaldo = $("#RespaldoID").val();
        ListaDetalles[0].GrupoF = $("#GrupoFID").val();
        ListaDetalles[0].Codigo = $("#CodigoID").data("kendoComboBox").value();
        ListaDetalles[0].Accion = 1;
    }
    Captura[0].Detalles = ListaDetalles;

    if (Captura[0].Detalles.length > 0 && correcto) {
        loadingStart();
        $PQR.PQR.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
                displayNotify("CapturaMensajeGuardadoExitoso", "", '0');
                loadingStop();
            }
            else  /*(data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") */ {
                //mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
                displayNotify("CapturaMensajeGuardadoErroneo", "", '2');
                loadingStop();

            }
        });
    }
}


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