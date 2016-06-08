﻿function AjaxNuevoSoldadorCertificacion() {
   
    $SoldadorCertificacion.SoldadorCertificacion.read({ token: Cookies.get("token"), Lenguaje: $("#language").val(), proyectoID: 1, patioID: 1 /*Cookies.get("Proyecto").split('°')[0]*/ }).done(function (data) {
        if (Error(data)) {
            $("#inputSoldador").data("kendoComboBox").dataSource.data(data.ListaObrero);
            $("#inputTipoPrueba").data("kendoComboBox").dataSource.data(data.ListaTipoPrueba);
            $("#inputProcesoSol").data("kendoComboBox").dataSource.data(data.ListaTipoProcesosSoldadura);
            $("#inputNombrePQR").data("kendoComboBox").dataSource.data(data.ListaPQR);
        }
    });
}


function AjaxGuardarInformacion(detalle,tipo) {
    loadingStart();
    $SoldadorCertificacion.SoldadorCertificacion.create(detalle, { token: Cookies.get("token"), Lenguaje: $("#language").val() }).done(function (data) {
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            
            displayNotify("CapturaMensajeGuardadoExitoso", "", '0');
            
            if (tipo == 1)
                limpiarCaptura();
            else if(tipo == 0)
                 HabilitarCapturaNuevoSoldadorCertificacioon(true, "FieldSetView");

            loadingStop();
        }
        else {
            displayNotify("CapturaMensajeGuardadoErroneo", "", '2');
            loadingStop();
        }
    });
}

function AjaxValidarExisteSoldadorCertificacion(detalle,tipo) {
    loadingStart();
    $SoldadorCertificacion.SoldadorCertificacion.read({ obreroID: detalle.Detalles[0].ObreroID, pqrID: detalle.Detalles[0].PQRID, token: Cookies.get("token"), Lenguaje: $("#language").val() }).done(function (existe) {
      
            detalle.Detalles[0].SoldadorCertificacionID = existe;

            if (existe == 0)
                AjaxGuardarInformacion(detalle, tipo);
            else {
                loadingStop();
                // displayNotify("SoldadorPQRExistente", "", '2');

                ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                    iframe: true,
                    title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                    visible: false, //the window will not appear before its .open method is called
                    width: "auto",
                    height: "auto",
                    modal: true,
                    animation: {
                        close: false,
                        open: false
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.SoldadorPQRExistente[$("#language").data("kendoDropDownList").value()] +
                             "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

                ventanaConfirm.open().center();

                $("#yesButton").click(function (handler) {
                    detalle.Detalles[0].Accion = 2;
                    AjaxGuardarInformacion(detalle, tipo);
                    ventanaConfirm.close();
                });
                $("#noButton").click(function (handler) {
                    ventanaConfirm.close();
                });
            }
        
    });
}