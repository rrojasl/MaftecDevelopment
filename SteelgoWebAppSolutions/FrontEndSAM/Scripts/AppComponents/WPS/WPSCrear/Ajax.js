
function obtenerPQRAjax() {
    $PQR.PQR.read({ token: Cookies.get("token"), TipoAccion: 1 }).done(function (data) {
        $("#PQRRaizNombre").data("kendoComboBox").dataSource.data(data);
        $("#PQRRellenoNombre").data("kendoComboBox").dataSource.data(data);
    });
}

function AjaxExisteWPS() {
    if ($('#NomnreWPS').val() != "" && $('#NomnreWPS').val() != undefined && $('#NomnreWPS').val() != null) {
        loadingStart();
        $WPS.WPS.read({ NombreWPSValida: $('#NomnreWPS').val(), token: Cookies.get("token") }).done(function (data) {
            if (data.ReturnMessage[0] != "OK") {
                displayNotify("", "El Nombre del WPS ya existe", '2');
            }
            loadingStop();
        });
    }
}


function AjaxGuardar() {
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    var correcto = true;

    ListaDetalles[0] = {
        Accion: "",
        WPSId: "",
        WPSNombre: "",
        PQRRaizId: "",
        PQRRellenoId: "",
        GrupoPId: "",
        PWHTId: "",
        PREHEAT: "",
        EspesorMaximoRaiz: "",
        EspesorMinimoRaiz: "",
        EspesorMaximoRelleno: "",
        EspesorMinimoRelleno: "",
        ProyectoID: ""
    };

    if ($('#NomnreWPS').val() == "" || $('#NomnreWPS').val() == undefined || $('#NomnreWPS').val() == null) {
        correcto = false;
        displayNotify("", "El nombre del WPS es mandatorio", '1');
    }
    else if ($("#PQRRaizNombre").data("kendoComboBox").dataItem($("#PQRRaizNombre").data("kendoComboBox").select()) == undefined) {
        correcto = false;
        displayNotify("", "El PQR de Raiz no es correcto", '1');
    }
    else if ($("#PQRRellenoNombre").data("kendoComboBox").dataItem($("#PQRRellenoNombre").data("kendoComboBox").select()) == undefined) {
        correcto = false;
        displayNotify("", "El PQR de Relleno no es correcto", '1');
    }
    else if (ContieneGruposMaterialBase($("#PQRRaizNombre").data("kendoComboBox").dataItem($("#PQRRaizNombre").data("kendoComboBox").select()).GrupoPMaterialBase1 + " " + $("#PQRRaizNombre").data("kendoComboBox").dataItem($("#PQRRaizNombre").data("kendoComboBox").select()).GrupoPMaterialBase2, $("#PQRRellenoNombre").data("kendoComboBox").dataItem($("#PQRRellenoNombre").data("kendoComboBox").select()).GrupoPMaterialBase1, $("#PQRRellenoNombre").data("kendoComboBox").dataItem($("#PQRRellenoNombre").data("kendoComboBox").select()).GrupoPMaterialBase2)) {
        correcto = false;
        displayNotify("", "El Grupo P debe coincidir", '1');
    }
    else if ($('#PWHRelleno').is(':checked') != $('#PWHRaiz').is(':checked')) {
        correcto = false;
        displayNotify("", "El PWHT debe ser igual para los PQR", '1');
    }
    else if ($('#PREHEATRelleno').is(':checked') != $('#PREHEATRaiz').is(':checked')) {
        correcto = false;
        displayNotify("", "El preheat debe ser igual para los PQR", '1');
    }
    
    

    ListaDetalles[0].Accion = 1;
    ListaDetalles[0].WPSId = 0;
    ListaDetalles[0].WPSNombre = $('#NomnreWPS').val();
    ListaDetalles[0].PQRRaizId = $('#PQRRaizNombre').data("kendoComboBox").value();
    ListaDetalles[0].PQRRellenoId = $('#PQRRellenoNombre').data("kendoComboBox").value();
    ListaDetalles[0].PWHTId = $('#PREHEATRelleno').is(':checked') ? 1 : 0;
    ListaDetalles[0].PREHEAT = $('#PWHRelleno').is(':checked') ? 1 : 0;
    ListaDetalles[0].EspesorMaximoRaiz = $('#EspesorMaximoRaiz').text();
    ListaDetalles[0].EspesorMinimoRaiz = $('#EspesorMinimoRaiz').text();
    ListaDetalles[0].EspesorMaximoRelleno = $('#EspesorMaximoRelleno').text();
    ListaDetalles[0].EspesorMinimoRelleno = $('#EspesorMinimoRelleno').text();


    Captura[0].Detalles = ListaDetalles;




    if (Captura[0].Detalles.length > 0 && correcto) {
        loadingStart();
        $WPS.WPS.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
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