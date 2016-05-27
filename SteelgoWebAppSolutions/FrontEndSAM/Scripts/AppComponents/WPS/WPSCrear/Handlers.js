function suscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoNombreWPS();
}

suscribirEventos();


function suscribirEventoGuardar() {
    $('.accionGuardar').click(function (e) {
        if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            AjaxGuardar(0);
        }
        else if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo').click(function (e) {
        if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            AjaxGuardar(1);
        }
        else if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
            opcionHabilitarView(false, "FieldSetView")
    });

    
}



function suscribirEventoNombreWPS() {
    $("#NomnreWPS").blur(function (e) {
        AjaxExisteWPS();
    });

    $("#NomnreWPS").keyup(function (e) {
        $('#NomnreWPS').val( $('#NomnreWPS').val().toUpperCase());
    });
}