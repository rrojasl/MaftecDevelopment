




function EditaWPS(e) {
    var DataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    AsignarValoresItemSeleccionado(e);
    AbrirVentanaModalVista();
};

$("#AgregarWPS").click(function (e) {
    LimpiarControlesParaAgregar();
    VentanaModal();
    $("#windowWPS").show();
});



$('.accionGuardar').click(function (e) {
    var ds = $("#grid").data("kendoGrid").dataSource;
    if (ds._data.length > 0) {
        if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
            opcionHabilitarView(true);
            AjaxGuardarCaptura();
        }
        else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
            opcionHabilitarView(false)
        }
    }
});


function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);

    }
}