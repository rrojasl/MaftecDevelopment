﻿function SuscribirEventos() {
    SuscribirEventoCuadrante();
    SuscribirEventoPintor();
    SuscribirEventoLote();
    SuscribirEventoFecha();
    SuscribirEventoMostrar();
    SuscribirEventoGuardar();
    SuscribirEventoComponenteComposicion();
    SuscribirEventoColor();
    SuscribirEventoSistemaPintura();

};

function SuscribirEventoCuadrante() {
    $('#inputCuadrante').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID ",
        suggest: true,
        index: 3
    });
}


function SuscribirEventoPintor() {
    var detallePintoresSeleccionados;

    $('#inputPintor').kendoMultiSelect({
        dataTextField: "Pintor",
        dataValueField: "ObreroID",
        suggest: true,
        index: 3,
        autoBind: false,
        animation: {
            close: {
                effects: "fadeOut zoom:out",
                duration: 300
            },
            open: {
                effects: "fadeIn zoom:in",
                duration: 300
            }
        },
        change: function (e) {
            //------------------modelo del pintor---------------------

            detallePintoresSeleccionados = e.sender._dataItems;
            //--------------------------------------------------------


        },
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaPintor(detallePintoresSeleccionados);
        }
    });
}

function SuscribirEventoLote() {
    $('#inputLote').kendoComboBox({
        dataTextField: "NumeroLote",
        dataValueField: "LotePinturaID ",
        suggest: true,
        index: 3
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaLote();
        }
    });
}

function SuscribirEventoComponenteComposicion() {
    $('#inputPinturaComponenteComposicion').kendoComboBox({
        dataTextField: "Componente",
        dataValueField: "ComponenteID",
        suggest: true,
        index: 3
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaComponenteComposicion();
        }
    });
}

function SuscribirEventoSistemaPintura() {
    $('#inputSistemaPintura').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "SistemaPinturaID",
        suggest: true,
        index: 3,
        change: function () {
            AjaxComponenteComposicion();
        }

    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaSistemaPintura();
        }
    });
}

function SuscribirEventoFecha() {
    $("#inputFechaCapturaAvanceIntAcabado").kendoDatePicker({
        max: new Date()
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaFecha();
        }
    });
}
 
function SuscribirEventoMostrar() {
    $("#btnMostrar").click(function () {
        var _cuadranteId = $("#inputCuadrante").val();
        if (_cuadranteId != "") {
            var _paso;

            if ($("input:radio[name='PasoTipo']:checked").val() == "intermedio") {
                _paso = 3;
            }
            else if ($("input:radio[name='PasoTipo']:checked").val() == "acabado") {
                _paso = 4;
            }
            AjaxMostrarCapturaAvanceIntAcabado(_cuadranteId, _paso);
        }
        else {
            displayMessage("ErrorCapturaAvanceIntAcabadoSeleccionarCuadrante", '', '2');
        }
    });
}

function SuscribirEventoGuardar() {
    $("#Guardar, #GuardarPie, #Guardar1, #btnGuardar").click(function () {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var _pasoId;
        if ($("input:radio[name='PasoTipo']:checked").val() == "intermedio") {
            _pasoId = 3;
        }
        else if ($("input:radio[name='PasoTipo']:checked").val() == "acabado") {
            _pasoId = 4;
        }

        AjaxGuardarCaptura(ds._data, _pasoId);
    });

    $("").click(function () {

    });
}

function SuscribirEventoColor() {
    $('#inputColor').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ColorID",
        suggest: true,
        index: 3
    });
    $('#inputColor').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            PlanchaColor();
        }
    });
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $(".botonDeplegaMenu").attr("disabled", true);
     
        $("#InputCuadrante").data("kendoComboBox").enable(false);
        $("#InputColor").data("kendoComboBox").enable(false);
        $("#InputFechaCapturaAvanceIntAcabado").data("kendoComboBox").enable(false);
        $("#InputPintor").data("kendoComboBox").enable(false);
        $("#InputSistemaPintura").data("kendoComboBox").enable(false);
        $("#InputPinturaComponenteComposicion").data("kendoComboBox").enable(false);
        
        $("#Guardar").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $(".botonDeplegaMenu").attr("disabled", true);
        $("#InputCuadrante").data("kendoComboBox").enable(true);
        $("#InputColor").data("kendoComboBox").enable(true);
        $("#InputFechaCapturaAvanceIntAcabado").data("kendoComboBox").enable(true);
        $("#InputPintor").data("kendoComboBox").enable(true);
        $("#InputSistemaPintura").data("kendoComboBox").enable(true);
        $("#InputPinturaComponenteComposicion").data("kendoComboBox").enable(true);

        $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function Limpiar() {
    $("#InputCuadrante").val("");
    $("#InputColor").val("");
    $("#InputFechaCapturaAvanceIntAcabado").val("");
    $("#InputPintor").val("");
    $("#InputSistemaPintura").val("");
    $("#InputPinturaComponenteComposicion").val(""); 
    //AjaxObtenerCuadrante(); 
    //setTimeout(function () { AjaxObtenerLote(); }, 2000);
    //setTimeout(function () { AjaxObtenerColor(); }, 2500);
    //setTimeout(function () { AjaxObtenerPintores(); }, 3000);
    //setTimeout(function () { AjaxSistemaPintura(); }, 3500);
    $("#grid").data('kendoGrid').dataSource.data([]);
}
