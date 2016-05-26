function SuscribirEventos() {
    suscribirEventoGuardar();
}


function suscribirEventoGuardar() {
    
    $("#Guardar").click(function () {
        if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            ValidarInformacionEnviada();
        }
        else {
            opcionHabilitarView(false, "FieldSetView");
        }
    });

    $("#GuardarPie").click(function (e) {
        if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            ValidarInformacionEnviada();
        }
        else {
            opcionHabilitarView(false, "FieldSetView")
        }
    });

    
    

    
}




function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $('#botonGuardar').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#CapturaSoldaduraGuardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $('#botonGuardar').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#CapturaSoldaduraGuardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}