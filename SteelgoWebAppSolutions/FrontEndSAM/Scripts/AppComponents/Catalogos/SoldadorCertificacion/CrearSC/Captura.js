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
    
    $("#inputSoldador").data("kendoComboBox").select(0);
    $("#inputNombrePQR").data("kendoComboBox").select(0);
    $("#inputPasosSoldadura").data("kendoNumericTextBox").value('');
    $("#inputCedulaTuboPQR").data("kendoComboBox").select(0);
    $("#inputFechaInicioCertificado").val('');
    $("#inputFechaFinCertificado").val('');
    $("#inputEspesorMinimo").data("kendoNumericTextBox").value('');
    $("#inputEspesorMaximo").data("kendoNumericTextBox").value('');
    $("#inputDiametroCalificado").data("kendoNumericTextBox").value('');
    $("#inputTipoPrueba").data("kendoComboBox").select(0);
    $("#inputPosicionPQR").val('');
    $("#inputProcesoSol").data("kendoComboBox").select(0);
    $("#inputFechaInicioCertificado").val('');
    $("#inputFechaFinCertificado").val('');
    $("#inputPosicionPQR").data("kendoNumericTextBox").value('');
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

function HabilitarCapturaNuevoSoldadorCertificacioon(valor, name)
{

    if (valor) {
        //$('#FieldSetView').find('*').attr('disabled', true);

        $("#inputSoldador").data("kendoComboBox").enable(false);
        $("#inputNombrePQR").data("kendoComboBox").enable(false);
        $("#inputTipoPrueba").data("kendoComboBox").enable(false);
        $("#inputProcesoSol").data("kendoComboBox").enable(false);
        $("#inputFechaInicioCertificado").data("kendoDatePicker").enable(false);
        $("#inputFechaFinCertificado").data("kendoDatePicker").enable(false);

        $("#inputPasosSoldadura").data("kendoNumericTextBox").wrapper.find(".k-numeric-wrap").find(".k-select").hide();
        $("#inputEspesorMinimo").data("kendoNumericTextBox").wrapper.find(".k-numeric-wrap").find(".k-select").hide();
        $("#inputPosicionPQR").data("kendoNumericTextBox").wrapper.find(".k-numeric-wrap").find(".k-select").hide();
        $("#inputDiametroCalificado").data("kendoNumericTextBox").wrapper.find(".k-numeric-wrap").find(".k-select").hide();
        $("#inputPasosSoldadura").data("kendoNumericTextBox").enable(false);
        $("#inputEspesorMinimo").data("kendoNumericTextBox").enable(false);
        $("#inputPosicionPQR").data("kendoNumericTextBox").enable(false);
        $("#inputDiametroCalificado").data("kendoNumericTextBox").enable(false);
        $("#inputCedulaTuboPQR").data("kendoComboBox").enable(false);

        $('#botonGuardar').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar2').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $('#CapturaGuardarPie').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardarPiePagina").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        
    }
    else {
        //$('#FieldSetView').find('*').attr('disabled', false);
        $("#inputSoldador").data("kendoComboBox").enable(true);
        $("#inputNombrePQR").data("kendoComboBox").enable(true);
        $("#inputTipoPrueba").data("kendoComboBox").enable(true);
        $("#inputProcesoSol").data("kendoComboBox").enable(true);
        $("#inputCedulaTuboPQR").data("kendoComboBox").enable(true);
        
        $("#inputPasosSoldadura").data("kendoNumericTextBox").wrapper.find(".k-numeric-wrap").find(".k-select").show();
        $("#inputEspesorMinimo").data("kendoNumericTextBox").wrapper.find(".k-numeric-wrap").find(".k-select").show();
        $("#inputPosicionPQR").data("kendoNumericTextBox").wrapper.find(".k-numeric-wrap").find(".k-select").show();
        $("#inputDiametroCalificado").data("kendoNumericTextBox").wrapper.find(".k-numeric-wrap").find(".k-select").show();
        $("#inputPasosSoldadura").data("kendoNumericTextBox").enable(true);
        $("#inputEspesorMinimo").data("kendoNumericTextBox").enable(true);
        $("#inputPosicionPQR").data("kendoNumericTextBox").enable(true);
        $("#inputDiametroCalificado").data("kendoNumericTextBox").enable(true);
        

        $("#inputFechaInicioCertificado").data("kendoDatePicker").enable(true);
        $("#inputFechaFinCertificado").data("kendoDatePicker").enable(true);

        $('#botonGuardar').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar2').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#CapturaGuardarPie').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardarPiePagina").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function ValidarInformacionNuevoSoldadorCertificacion(tipo) {
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    
    var index = 0;

        ListaDetalles[index] = {
            SoldadorCertificacionID: "",
            Accion: "",
            ObreroID: "",
            PQRID: "",
            ProcesoSoldaduraID: "",
            TipoDePruebaID: "",
            Posicion: "",
            FechaInicioCertificado: "",
            FechaFinCertificado: "",
            DiametroCalificado: "",
            EspesorMinimo: "",
            EspesorMaximo: "",
            PasosSoldadura: "",
            Estatus: 1
        };


        if (
            ($("#inputSoldador").data("kendoComboBox").select() == -1) ||
            ($("#inputSoldador").val() == '') ||
            ($("#inputCedulaTuboPQR").data("kendoComboBox").select() <= 0) ||
            ($("#inputCedulaTuboPQR").val() == '') ||
            ($("#inputNombrePQR").data("kendoComboBox").select() == -1) ||
            ($("#inputSoldador").val() == '') ||
            (parseFloat($("#inputPasosSoldadura").data("kendoNumericTextBox").value()) == 0.0) ||
            ($("#inputPasosSoldadura").data("kendoNumericTextBox").value() == null) ||
            ($("#inputPasosSoldadura").val() == '') ||
            ($("#inputFechaInicioCertificado").val() == '') ||
            ($("#inputFechaFinCertificado").val() == '') ||
            (parseFloat($("#inputEspesorMinimo").data("kendoNumericTextBox").value()) == 0.0) ||
            ($("#inputEspesorMinimo").val() == "") ||
            (parseFloat($("#inputEspesorMaximo").data("kendoNumericTextBox").value()) == 0.0) ||
            ($("#inputEspesorMaximo").val() == "") ||
            (parseFloat($("#inputDiametroCalificado").data("kendoNumericTextBox").value()) == 0.0) ||
            ($("#inputTipoPrueba").data("kendoComboBox").select() == -1) ||
            ($("#inputTipoPrueba").val() == "") ||
            (parseFloat($("#inputPosicionPQR").data("kendoNumericTextBox").value()) == 0.0) ||
            ($("#inputPosicionPQR").data("kendoNumericTextBox").value() == null) ||
            ($("#inputProcesoSol").data("kendoComboBox").select() == -1) ||
            ($("#inputProcesoSol").val() == "")
           ) {

            if (parseFloat($("#inputPasosSoldadura").data("kendoNumericTextBox").value()) <= 0)
                displayNotify("CapturaSoldadorCertificacionNoPasosMsg", "", '2');
            else if (parseFloat($("#inputEspesorMinimo").data("kendoNumericTextBox").value()) <= 0)
                displayNotify("CapturaSoldadorEspesorMsg", "", '2');
            else if (parseFloat($("#inputDiametroCalificado").data("kendoNumericTextBox").value()) <= 0)
                displayNotify("CapturaSoldadorCertificacionDiametroMsg", "", '2');
            else if (parseFloat($("#inputPosicionPQR").data("kendoNumericTextBox").value()) <= 0)
                displayNotify("CapturaSoldadorCertificacionPosicionMsg", "", '2');
            else
                displayNotify("MensajeCamposIncorrector", "", '2');
            ListaDetalles[index].Estatus = 0;
        }
        else if ((parseFloat($("#inputEspesorMinimo").data("kendoNumericTextBox").value()) > parseFloat($("#inputEspesorMaximo").data("kendoNumericTextBox").value()))) {
            displayNotify("SoldadorCertificacionMensajeErrorEspesor", "", '2');
            ListaDetalles[index].Estatus = 0;
        }

        
    Captura[0].Detalles = ListaDetalles;


    if (!ExistRowEmpty(ListaDetalles)) {

       // ListaDetalles[index].SoldadorCertificacionID =;
        ListaDetalles[index].Accion = 1;
        ListaDetalles[index].ObreroID = $("#inputSoldador").val();
        ListaDetalles[index].PQRID = $("#inputNombrePQR").val();
        ListaDetalles[index].ProcesoSoldaduraID = $("#inputProcesoSol").val();
        ListaDetalles[index].TipoDePruebaID = $("#inputTipoPrueba").val();
        ListaDetalles[index].Posicion = $("#inputPosicionPQR").val();
        ListaDetalles[index].FechaInicioCertificado = $("#inputFechaInicioCertificado").val().trim();
        ListaDetalles[index].FechaFinCertificado =$("#inputFechaFinCertificado").val().trim();
        ListaDetalles[index].DiametroCalificado = $("#inputDiametroCalificado").val();
        ListaDetalles[index].EspesorMinimo = $("#inputEspesorMinimo").val();
        ListaDetalles[index].EspesorMaximo = $("#inputEspesorMaximo").val();
        ListaDetalles[index].PasosSoldadura = $("#inputPasosSoldadura").val();

        if (Captura[0].Detalles.length > 0) {
            AjaxValidarExisteSoldadorCertificacion(Captura[0], tipo)
        }
    }



}