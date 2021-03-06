﻿var NombreCorrecto = false;
function obtenerPQRAjax() {
    $PQR.PQR.read({ token: Cookies.get("token"), TipoAccion: 1 }).done(function (data) {
        $("#PQRRaizNombre").data("kendoComboBox").dataSource.data(data);
        $("#PQRRellenoNombre").data("kendoComboBox").dataSource.data(data);
    });
}

function AjaxExisteWPS(varGuardar) {
    if ($('#NomnreWPS').val() != "" && $('#NomnreWPS').val() != undefined && $('#NomnreWPS').val() != null) {
        var WPSID = $("#WPSID").val() == "0" ? 0 : $("#WPSID").val();
        loadingStart();
        $WPS.WPS.read({WPSID: WPSID, NombreWPSValida: $('#NomnreWPS').val(), token: Cookies.get("token") }).done(function (data) {
            if (data.ReturnMessage[0] != "OK") {
                //displayNotify("", "El Nombre del WPS ya existe", '2');
                NombreCorrecto = false;
            }
            else {
                NombreCorrecto = true;
            }
            AjaxGuardar(varGuardar);
            loadingStop();
        });
    }
}


function AjaxGuardar(tipoGuardar) {
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
        displayNotify("WPSMensajeErrorNombreMandatorio", "", '1');
    }
    else if ($("#PQRRaizNombre").data("kendoComboBox").dataItem($("#PQRRaizNombre").data("kendoComboBox").select()) == undefined) {
        correcto = false;
        displayNotify("WPSMensajeErrorPQRRaiz", "", '1');
    }
    else if ($("#PQRRellenoNombre").data("kendoComboBox").dataItem($("#PQRRellenoNombre").data("kendoComboBox").select()) == undefined) {
        correcto = false;
        displayNotify("WPSMensajeErrorPQRRelleno", "", '1');
    }
    else if (!ContieneGruposMaterialBase($("#PQRRaizNombre").data("kendoComboBox").dataItem($("#PQRRaizNombre").data("kendoComboBox").select()).GrupoPMaterialBase1,$("#PQRRaizNombre").data("kendoComboBox").dataItem($("#PQRRaizNombre").data("kendoComboBox").select()).GrupoPMaterialBase2, $("#PQRRellenoNombre").data("kendoComboBox").dataItem($("#PQRRellenoNombre").data("kendoComboBox").select()).GrupoPMaterialBase1, $("#PQRRellenoNombre").data("kendoComboBox").dataItem($("#PQRRellenoNombre").data("kendoComboBox").select()).GrupoPMaterialBase2)) {
        correcto = false;
        displayNotify("WPSMensajeErrorGrupoP", "", '1');
    }
    else if ($('#PWHRelleno').is(':checked') != $('#PWHRaiz').is(':checked')) {
        correcto = false;
        displayNotify("WPSMensajeErrorPWHT", "", '1');
    }
    else if ($('#PREHEATRelleno').is(':checked') != $('#PREHEATRaiz').is(':checked')) {
        correcto = false;
        displayNotify("WPSMensajeErrorPREHEAT", "", '1');
    }
    else if (!NombreCorrecto ) {
        correcto = false;
        displayNotify("WPSMensajeErrorNombreRepetido", "", "2");
    }


    ListaDetalles[0].Accion = $("#WPSID").val() == "0" ? 1: 2;
    ListaDetalles[0].WPSId = $("#WPSID").val() == "0"? 0:  $("#WPSID").val();
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
                if (data.ReturnMessage[1] != undefined) {
                    $("#WPSID").val(data.ReturnMessage[1]);
                }
                displayNotify("CapturaMensajeGuardadoExitoso", "", '0');
                if (tipoGuardar == 1) {
                    Limpiar();
                }
                else {
                    opcionHabilitarView(true, "FieldSetView");
                }
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