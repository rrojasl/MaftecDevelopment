function suscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoBlur();
}

suscribirEventos();

function suscribirEventoBlur() {
    $("#NombreId").blur(function (e) {
        AjaxExistePQR();
    });
}

function suscribirEventoGuardar() {
    $('.accionGuardar').click(function (e) {
        if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
            AjaxGuardar(0);
            opcionHabilitarView(true);
        }
        else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
            opcionHabilitarView(false);
        }
    });

    $('#btnGuardarYNuevo').click(function (e) {
        if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            AjaxGuardar(1);
        }
        else if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });
}

function opcionHabilitarView(valor, name) {
    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#NombreId").attr('disabled', true);
        $("#chkPreheat").prop('disabled', true);
        $("#chkPwht").prop('disabled', true);
        $("#EspesorRelleno").data("kendoNumericTextBox").enable(false);
        $("#EspesorRaiz").data("kendoNumericTextBox").enable(false);
        $("#ProcesoSoldaduraRellenoID").data("kendoComboBox").enable(false);
        $("#ProcesoSoldaduraRaizID").data("kendoComboBox").enable(false);
        $("#NumeroPID").attr('disabled', true);
        $("#GrupoPMaterialBase1ID").data("kendoComboBox").enable(false);
        $("#GrupoPMaterialBase2ID").data("kendoComboBox").enable(false);
        $("#AporteID").attr('disabled', true);
        $("#MezclaID").attr('disabled', true);
        $("#RespaldoID").attr('disabled', true);
        $("#GrupoFID").attr('disabled', true);
        $("#CodigoID").attr('disabled', true);
        $('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#NombreId").attr('disabled', false);
        $("#chkPreheat").prop('disabled', false);
        $("#chkPwht").prop('disabled', false);
        $("#EspesorRelleno").data("kendoNumericTextBox").enable(true);
        $("#EspesorRaiz").data("kendoNumericTextBox").enable(true);
        $("#ProcesoSoldaduraRellenoID").data("kendoComboBox").enable(true);
        $("#ProcesoSoldaduraRaizID").data("kendoComboBox").enable(true);
        $("#NumeroPID").attr('disabled', false);
        $("#GrupoPMaterialBase1ID").data("kendoComboBox").enable(true);
        $("#GrupoPMaterialBase2ID").data("kendoComboBox").enable(true);
        $("#AporteID").attr('disabled', false);
        $("#MezclaID").attr('disabled', false);
        $("#RespaldoID").attr('disabled', false);
        $("#GrupoFID").attr('disabled', false);
        $("#CodigoID").attr('disabled', false);
        $('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}