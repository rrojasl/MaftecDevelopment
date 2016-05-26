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

function AjaxGuardar() {
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    var correcto = true;

    ListaDetalles[0] = {
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
        Accion: ""
    };

    if ($('#NombreId').val() == "" || $('#NombreId').val() == undefined || $('#NombreId').val() == null) {
        correcto = false;
        displayNotify("", "El campo nombre del PQR es mandatorio", '1');
    }
    else if ($('#EspesorRelleno').val() == "" || $('#EspesorRelleno').val() == undefined || $('#EspesorRelleno').val() == null) {
        correcto = false;
        displayNotify("", "El campo espesor relleno es mandatorio", '1');
    }
    else if ($('#EspesorRaiz').val() == "" || $('#EspesorRaiz').val() == undefined || $('#EspesorRaiz').val() == null) {
        correcto = false;
        displayNotify("", "El campo espesor raiz es mandatorio", '1');
    }
    else if ($('#ProcesoSoldaduraRellenoID').data("kendoComboBox").dataItem($("#ProcesoSoldaduraRellenoID").data("kendoComboBox").select()) == undefined) {
        correcto = false;
        displayNotify("", "El campo proceso de soldadura de relleno debe coincidir", '1');
    }
    else if ($('#ProcesoSoldaduraRaizID').data("kendoComboBox").dataItem($("#ProcesoSoldaduraRaizID").data("kendoComboBox").select()) == undefined) {
        correcto = false;
        displayNotify("", "El campo proceso de soldadura de raiz debe coincidir", '1');
    }
    else if ($('#NumeroPID').val() == "" || $('#NumeroPID').val() == undefined || $('#NumeroPID').val() == null) {
        correcto = false;
        displayNotify("", "El campo numero P es mandatorio", '1');
    }
    else if ($('#GrupoPMaterialBase1ID').data("kendoComboBox").dataItem($("#GrupoPMaterialBase1ID").data("kendoComboBox").select()) == undefined) {
        correcto = false;
        displayNotify("", "El campo Grupo Materiales Base 1 debe coincidir", '1');
    }
    else if ($('#GrupoPMaterialBase2ID').data("kendoComboBox").dataItem($("#GrupoPMaterialBase2ID").data("kendoComboBox").select()) == undefined) {
        correcto = false;
        displayNotify("", "El campo Grupo Materiales Base 2 debe coincidir", '1');
    }
    else if ($('#AporteID').val() == "" || $('#AporteID').val() == undefined || $('#AporteID').val() == null) {
        correcto = false;
        displayNotify("", "El campo aporte es mandatorio", '1');
    }
    else if ($('#MezclaID').val() == "" || $('#MezclaID').val() == undefined || $('#MezclaID').val() == null) {
        correcto = false;
        displayNotify("", "El campo mezcla es mandatorio", '1');
    }
    else if ($('#RespaldoID').val() == "" || $('#RespaldoID').val() == undefined || $('#RespaldoID').val() == null) {
        correcto = false;
        displayNotify("", "El campo respaldo es mandatorio", '1');
    }
    else if ($('#GrupoFID').val() == "" || $('#GrupoFID').val() == undefined || $('#GrupoFID').val() == null) {
        correcto = false;
        displayNotify("", "El campo grupo F es mandatorio", '1');
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
    ListaDetalles[0].Respaldo= $("#RespaldoID").val();
    ListaDetalles[0].GrupoF = $("#GrupoFID").val();
    ListaDetalles[0].Codigo = $("#CodigoID").data("kendoComboBox").value();
    ListaDetalles[0].Accion = 1;

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

function AjaxExistePQR() {
    if ($('#NombreId').val() != "" && $('#NombreId').val() != undefined && $('#NombreId').val() != null) {
        loadingStart();
        $PQR.PQR.read({ token: Cookies.get("token"), nombre: $('#NombreId').val() }).done(function (data) {
            if (data.ReturnMessage[0] != "OK") {
                displayNotify("", "El Nombre del PQR ya existe", '2');
                $('#NombreId').val("");
                $('#NombreId').focus();
            }
            loadingStop();
        });
    }
}