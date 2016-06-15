function SuscribirEventos() {
    SuscribirEventoSoldador();
    SuscribirEventoNomprePQR();
    SuscribirEventoProcesoSoldadura();
    SuscribirEventoNumeroPasos();
    SuscribirEventoEspesorMinimo();
    SuscribirEventoEspesorMaximo();
    SuscribirEventoDiametroCertificado();
    SuscribirEventoTipoPrueba();
    SuscriborEventoPosicion();
    SuscribirEventoFechaVigenciaInicio();
    SuscribirEventoFechaVigenciaFin();
    suscribirEventoGuardarNuevoSoldadorCertificacion();
}

function SuscribirEventoSoldador() {
    $("#inputSoldador").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        autoBind: false,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputSoldador").data("kendoComboBox").text("");
            }
        }
    });
    
};

function SuscriborEventoPosicion() {
    $("#inputPosicionPQR").kendoNumericTextBox({
        format: "#",
        min: 0,
        value: "0"
    });
}

function SuscribirEventoFechaVigenciaInicio() {
    $("#inputFechaInicioCertificado").kendoDatePicker({

        //format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]

        change: function (e) {
            if (ValidarFecha(this, e.sender._value))
                startChange();
        }
    });

    $("#inputFechaInicioCertificado").blur(function (e) {

        if (ValidarFecha($("#inputFechaInicioCertificado").data("kendoDatePicker"), $("#inputFechaInicioCertificado").data("kendoDatePicker").value()))
            startChange();
    });

}

function SuscribirEventoFechaVigenciaFin() {
    $("#inputFechaFinCertificado").kendoDatePicker({

        //format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
        change: function (e) {
            if (ValidarFecha(this, e.sender._value))
                endChange();
        }
    });

    $("#inputFechaFinCertificado").blur(function (e) {
        if (ValidarFecha($("#inputFechaFinCertificado").data("kendoDatePicker"), $("#inputFechaFinCertificado").data("kendoDatePicker").value()))
            endChange();
    });


}

function SuscribirEventoTipoPrueba() {
    $("#inputTipoPrueba").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        dataTextField: "TipoDePrueba",
        dataValueField: "TipoPruebaID",
        autoBind: false,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputTipoPrueba").data("kendoComboBox").text("");
            }
        }
    });
}

function SuscribirEventoDiametroCertificado() {
    $("#inputDiametroCalificado").kendoNumericTextBox({
        format: "#.0000 mm",
        min: 0,
        value: "0",
        decimals: 3
    });
}

function SuscribirEventoEspesorMaximo() {
    $("#inputEspesorMaximo").kendoNumericTextBox({
        format: "#.0000",
        min: 0,
        value: "0",
        decimals: 3,

    });
    $("#inputEspesorMaximo").data("kendoNumericTextBox").readonly()
}


function SuscribirEventoEspesorMinimo() {
    $("#inputEspesorMinimo").kendoNumericTextBox({
        format: "#.0000",
        min: 0,
        value: "0",
        decimals: 3
    });

    $("#inputEspesorMinimo").blur(function (e) {
        if (parseFloat($("#inputPasosSoldadura").kendoNumericTextBox().val()) >= 3.0 && parseFloat($("#inputEspesorMinimo").kendoNumericTextBox().val()) >= 13) {
            $("#inputEspesorMaximo").data("kendoNumericTextBox").value('999999999999.0');
        }
        else {
            $("#inputEspesorMaximo").data("kendoNumericTextBox").value(parseFloat($("#inputEspesorMinimo").kendoNumericTextBox().val()) * 2);
        }
    });
}

function SuscribirEventoNumeroPasos() {
    $("#inputPasosSoldadura").kendoNumericTextBox({
        format: "#",
        min: 0,
        value: "0",
        decimals: 0
    });
    $("#inputPasosSoldadura").blur(function (e) {
        if (parseFloat($("#inputPasosSoldadura").kendoNumericTextBox().val()) >= 3.0 && parseFloat($("#inputEspesorMinimo").kendoNumericTextBox().val()) >= 13) {
            $("#inputEspesorMaximo").data("kendoNumericTextBox").value('999999999999.0');
        }
        else {
            $("#inputEspesorMaximo").data("kendoNumericTextBox").value(parseFloat($("#inputEspesorMinimo").kendoNumericTextBox().val()) * 2);
        }
    });

}

function SuscribirEventoProcesoSoldadura() {
    $("#inputProcesoSol").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        autoBind: false,
        dataTextField: "TipoProcesoSoldaduraDesc",
        dataValueField: "TipoProcesoSoldaduraID",

        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputProcesoSol").data("kendoComboBox").text("");
            }
        }
    });

}

function SuscribirEventoNomprePQR() {
    $("#inputNombrePQR").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PQRID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        delay: 10,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputNombrePQR").data("kendoComboBox").text("");
            }

        }
    });

}

function suscribirEventoGuardarNuevoSoldadorCertificacion() {
    

    $('.accionGuardar').click(function () {
        if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            ValidarInformacionNuevoSoldadorCertificacion(0);
        }
        else {
            HabilitarCapturaNuevoSoldadorCertificacioon(false, "FieldSetView");
        }
    });

    $('.accionGuardarYNuevo').click(function () {
        if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            ValidarInformacionNuevoSoldadorCertificacion(1);
        }
    });
}