function IniciarCapturaSC() {

    SuscribirEventos();


}
IniciarCapturaSC();
function AsignarEncabezados() {
    $("#lblSoldador").text(_dictionary.SoldadorCertificacionCodigoObrero[$("#language").data("kendoDropDownList").value()]);
    $("#lblNombrePQR").text(_dictionary.SoldadorCertificacionNombrePQR[$("#language").data("kendoDropDownList").value()]);
    $("#lblProcesoSoldaduraPQR").text(_dictionary.SoldadorCertificacionProcesoSoldaduraPQR[$("#language").data("kendoDropDownList").value()]);
    $("#lblFechaInicioCertificado").text(_dictionary.SoldadorCertificacionFechaInicioCertificado[$("#language").data("kendoDropDownList").value()]);
    $("#lblFechaFinCertificado").text(_dictionary.SoldadorCertificacionFechaFinCertificado[$("#language").data("kendoDropDownList").value()]);
    $("#lblPasosSoldadura").text(_dictionary.SoldadorCertificacionPasosSoldadura[$("#language").data("kendoDropDownList").value()]);
    $("#lblCedulaTuboPQR").text(_dictionary.SoldadorCertificacionCedulaTuboPQR[$("#language").data("kendoDropDownList").value()]);
    $("#lblEspesorMinimo").text(_dictionary.SoldadorCertificacionEspesorMinimo[$("#language").data("kendoDropDownList").value()]);
    $("#lblEspesorMaximo").text(_dictionary.SoldadorCertificacionEspesorMaximo[$("#language").data("kendoDropDownList").value()]);
    $("#lblDiametroCalificado").text(_dictionary.SoldadorCertificacionDiametroCalificadoPQR[$("#language").data("kendoDropDownList").value()]);
    $("#lblTipoPrueba").text(_dictionary.SoldadorCertificacionTipoDePruebaPQR[$("#language").data("kendoDropDownList").value()]);
    $("#lblPosicionPQR").text(_dictionary.SoldadorCertificacionPosicionPQR[$("#language").data("kendoDropDownList").value()]);

    $("#inputFechaInicioCertificado").data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });
    $("#inputFechaFinCertificado").data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });

    AjaxNuevoSoldadorCertificacion();
}

function limpiarCaptura() {
    $("#inputSoldador").val('');
    $("#inputNombrePQR").data("kendoComboBox").select(0);
    $("#inputPasosSoldadura").data("kendoNumericTextBox").value('0.0');
    $("#inputCedulaTuboPQR").val('');
    $("#inputFechaInicioCertificado").val('');
    $("#inputFechaFinCertificado").val('');
    $("#inputEspesorMinimo").data("kendoNumericTextBox").value('0.0');
    $("#inputEspesorMaximo").data("kendoNumericTextBox").value('0.0');
    $("#inputDiametroCalificado").data("kendoNumericTextBox").value('0.0');
    $("#inputTipoPrueba").data("kendoComboBox").select(0);
    $("#inputPosicionPQR").val('');
    $("#inputProcesoSol").data("kendoComboBox").select(0);
    $("#inputFechaInicioCertificado").val('');
    $("#inputFechaFinCertificado").val('');
    $("#inputPosicionPQR").data("kendoNumericTextBox").value('0.0');
}

function ValidarFecha(control, valor) {
    var fecha = kendo.toString(valor, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));
    if (fecha == null) {
        control.value('');
        return false;
    }
    return true;
}

function startChange() {

    var startDate = $("#inputFechaInicioCertificado").data("kendoDatePicker").value(),
     endDate = $("#inputFechaFinCertificado").data("kendoDatePicker").value(),
    end = $("#inputFechaFinCertificado").data("kendoDatePicker"),
    start = $("#inputFechaInicioCertificado").data("kendoDatePicker");

    if (startDate) {
        startDate = new Date(startDate);
        startDate.setDate(startDate.getDate());
        end.min(startDate);
    }
    else if (endDate) {
        start.max(new Date(endDate));
    } else {
        endDate = new Date();
        start.max(endDate);
        end.min(endDate);
    }
}

function endChange() {

    var endDate = $("#inputFechaFinCertificado").data("kendoDatePicker").value(),
    startDate = $("#inputFechaInicioCertificado").data("kendoDatePicker").value(),
    end = $("#inputFechaFinCertificado").data("kendoDatePicker"),
    start = $("#inputFechaInicioCertificado").data("kendoDatePicker");

    if (endDate) {
        endDate = new Date(endDate);
        endDate.setDate(endDate.getDate());
        start.max(endDate);
    }
    else if (startDate) {
        end.min(new Date(startDate));
    } else {
        endDate = new Date();
        start.max(endDate);
        end.min(endDate);
    }
}



function changeLanguageCall() {
    AsignarEncabezados();
    limpiarCaptura();
    //document.title = _dictionary.CapturaArmadoArmadoSpool[$("#language").data("kendoDropDownList").value()];
}


function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false;
}