﻿function SuscribirEventos() {
    SuscribirEventoSpoolID();
    SuscribirEventosJunta();
    suscribirEventoAgregar();
    suscribirEventoGuardar();

    SuscribirEventoTubero();
    SuscribirEventoTaller();
    SuscribeEventosTipoCaptura();
    suscribirEventoChangeRadio();
    suscribirEventoChangeRadioTipoListado();
    SuscribirEventoMuestraJunta();
    GuardarDetalleAdicional();
    SuscribirEventoPlanchar();
    SuscribirEventoCancelarAdicionales();
    suscribirEventoAdicionales();
};

function suscribirEventoAdicionales() {

    $(document).on('click', '.botonAdicionales', function (e) {
        e.preventDefault();

        if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

            var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
            LlenarGridPopUp(dataItem);
        }
    });
}

function SuscribirEventoCancelarAdicionales() {
    $("#CancelarTrabajosAdicionales").click(function (e) {
        e.preventDefault();
        
        $("#windowGrid").data("kendoWindow").close();
    });
}


function SuscribirEventoPlanchar() {
    $("#ButtonPlanchar").click(function (e) {
        e.preventDefault();
        if ($("#grid").data("kendoGrid").dataSource._data.length > 0) {

            if ($('input:radio[name=LLena]:checked').val() == undefined) {
                MensajesSteelGO('LLenadoMasivo', '');
            }
            else if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                windowTemplate = kendo.template($("#windowTemplate").html());

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

                ventanaConfirm.content(_dictionary.CapturaMensajeArmadoPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                             "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

                ventanaConfirm.open().center();

                $("#yesButton").click(function (handler) {
                    plancharTodo();
                    ventanaConfirm.close();
                });
                $("#noButton").click(function (handler) {
                    ventanaConfirm.close();
                });
            }
            else {
                plancharTodo();
            }
        }
    });
}

function plancharTodo() {
    if ($("#inputTubero").data("kendoComboBox").dataItem($("#inputTubero").data("kendoComboBox").select()) != undefined) {
        PlanchaTubero();
    }
    if ($("#inputTaller").data("kendoComboBox").dataItem($("#inputTaller").data("kendoComboBox").select()) != undefined) {
        PlanchaTaller();
    }
    if ($("#FechaArmado").val() != "") {
        PlanchaFecha();
    }
}

function GuardarDetalleAdicional() {
    $('#GuardarTrabajosAdicionales').click(function () {
        var trabajosCorrectos = true;
        var ds = $("#gridPopUp").data("kendoGrid").dataSource;

        for (var i = 0; i < ds._data.length; i++) {
            if (ds._data[i].TrabajoAdicional == "" && ds._data[i].Accion != 3)
                trabajosCorrectos = false;
        }
        if (trabajosCorrectos) {
            modeloRenglon.ListaDetalleTrabajoAdicional = ds._data;
            $("#windowGrid").data("kendoWindow").close();
            $("#grid").data("kendoGrid").dataSource.sync();
        }
        else {
            displayNotify('CapturaArmadoTrabajoMandatorio', '', '2');
        }

    });
}

function SuscribeEventosTipoCaptura() {
    $("#presentationReporte").addClass("active");

    $('#aReporte').click(function () {
        $("#presentationReporte").addClass("active");
        $("#presentationReporteListado").removeClass("active");

    });
    $('#aListado').click(function () {
        $("#presentationReporteListado").addClass("active");
        $("#presentationReporte").removeClass("active");

    });
}

function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        if ($("#InputID").val() != "" && $("#inputordentrabajo").val() != "") {
            AjaxJunta($("#InputID").val());
        }
        FiltroMostrar(0);
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        if ($("#InputID").val() != "" && $("#InputOrdenTrabajo").val() != "") {
            AjaxJunta($("#InputID").val());
        }
        FiltroMostrar(1);
    });

}



function EventoGuardar() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
        AjaxGuardarCaptura(ds._data, 0);
    }
    else if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0082[$("#language").data("kendoDropDownList").value()])
        opcionHabilitarView(false, "FieldSetView")
}

function suscribirEventoGuardar() {
    $('#btnGuardar').click(function (e) {
        EventoGuardar();
    });

    $("#Guardar").click(function () {
        EventoGuardar();
    });

    $('#btnGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data, 1)

    });

    $("#GuardarPie").click(function (e) {
        EventoGuardar();
    });

    $('#btnGuardarPie').click(function (e) {
        EventoGuardar();
    });

    $('#btnGuardarYNuevoPie').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data, 1)
    });
}


function Limpiar() {

    $("#InputOrdenTrabajo").val("");


    $("#InputID").data("kendoComboBox").value("");

    $("#Junta").data("kendoComboBox").dataSource.data([]);

    //var radioButtons = document.getElementsByName('Muestra');

    //for (var x = 0; x < radioButtons.length; x++) {
    //    if (radioButtons[x].checked) {
    //        radioButtons[x].checked = false;

    //    }
    //}

    $("#FechaArmado").data("kendoDatePicker").value("");
    $("#Junta").data("kendoComboBox").value("");
    $("#inputTubero").data("kendoComboBox").value("");

    $("#inputTaller").data("kendoComboBox").value("");

    //var radioButtonsLLena = document.getElementsByName('LLena');

    //for (var x = 0; x < radioButtonsLLena.length; x++) {
    //    if (radioButtonsLLena[x].checked) {
    //        radioButtonsLLena[x].checked = false;

    //    }
    //}
    $("#grid").data('kendoGrid').dataSource.data([]);

    $("#grid").data('kendoGrid').dataSource.sync();
    opcionHabilitarView(false, "FieldSetView");
}



function suscribirEventoAgregar() {
    $('#ButtonAgregar').click(function (e) {
        if ($('input:radio[name=TipoAgregado]:checked').val() != undefined) {
            if ($('input:radio[name=Muestra]:checked').val() != undefined) {
                if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
                    if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()) != undefined) {
                        $('#ButtonAgregar').prop("disabled", true);

                        AjaxCargarReporteJuntas();

                    }
                    else
                        displayNotify("NoExisteSpoolID", '', '2');
                }
                else {
                    if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado" && $("#Junta").val() != "") {
                        if ($("#Junta").data("kendoComboBox").dataItem($("#Junta").data("kendoComboBox").select()) != undefined) {
                            if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()) != undefined) {
                                $('#ButtonAgregar').prop("disabled", true);

                                ObtenerJSonGridArmado();
                            }
                            else
                                displayNotify("NoExisteSpoolID", '', '2');

                        }
                        else {
                            if ($('input:radio[name=Muestra]:checked').val() == "Todos" && $("#Junta").val() != "") {
                                displayNotify("CapturaArmadoNoExisteSpool", "", '2');
                            }
                            else
                                displayNotify("CapturaArmadoNoExisteLista", "", '1');
                        }
                    }
                    else
                        displayNotify("JuntaSinSeleccionar", "", '2');
                }
            }
            else {
                MensajesSteelGO('radioMostrar', '')
            }
        }
        else {
            MensajesSteelGO('radioTipoAgregado', '')
        }
    });
}

function SuscribirEventoTubero() {
    $('#inputTubero').kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputTubero").data("kendoComboBox").value("");
            }
        }
    });
    $('#inputTubero').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputTubero").data("kendoComboBox").dataItem($("#inputTubero").data("kendoComboBox").select()) != undefined) {

                //PlanchaTubero();
            }
            else
                $("#inputTubero").data("kendoComboBox").value("");
        }

    });
}

function SuscribirEventoTaller() {
    $('#inputTaller').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TallerID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputTaller").data("kendoComboBox").value("");
            }
        }
    });
    $('#inputTaller').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputTaller").data("kendoComboBox").dataItem($("#inputTaller").data("kendoComboBox").select()) != undefined) {
                //PlanchaTaller();
            }
            else {
                $("#inputTaller").data("kendoComboBox").value("");
            }

        }
    });
}

function SuscribirEventosJunta() {
    $('#Junta').kendoComboBox({
        dataTextField: "Etiqueta",
        dataValueField: "JuntaSpoolID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#Junta").data("kendoComboBox").value("");
            }
        }
    });

    $('#Junta').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputID").data("kendoComboBox").input.focus();
            $("#Junta").val("");
        }
        else if (e.keyCode == 39) {
            $("#ButtonAgregar").focus();
        }
        else if (e.keyCode == 9) {
            if ($("#Junta").data("kendoComboBox").text() == "" && tieneClase(e.currentTarget)) {
                $("#Junta").data("kendoComboBox").select(0);
                ObtenerJSonGridArmado();
            }

            else if (tieneClase(e.currentTarget)) {
                $("#Junta").data("kendoComboBox").select(0);
                ObtenerJSonGridArmado();
            }

        }
        else if (e.keyCode == 13) {
            if ($("#Junta").data("kendoComboBox").dataItem($("#Junta").data("kendoComboBox").select()) != undefined) {
                if ($('input:radio[name=Muestra]:checked').val() != undefined) {
                    if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
                        if ($("#Junta").data("kendoComboBox").select() != -1) {
                            ObtenerJSonGridArmado();
                            $("#Junta").data("kendoComboBox").text("");
                        }
                    }
                    else if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {
                        if ($("#Junta").val() != "") {
                            if ($("#Junta").data("kendoComboBox").select() != -1) {
                                var button = $(this);
                                button.attr('disabled', 'disabled');
                                setTimeout(function () {
                                    button.removeAttr('disabled');
                                }, 500);
                                ObtenerJSonGridArmado();
                            }
                        }
                        else
                            displayNotify("JuntaSinSeleccionar", "", '2');
                    }
                    else {
                        displayNotify("Mensajes_error", "Favor de seleccionar un Tipo de Captura", '2');
                    }
                }
                else {
                    MensajesSteelGO('radioMostrar', '')

                }
            }
            else {
                if ($('input:radio[name=Muestra]:checked').val() == "Todos") {
                    displayNotify("CapturaArmadoNoExisteSpool", "", '2');
                }
                else
                    displayNotify("CapturaArmadoNoExistenJuntasSpool", "", '1');
            }
        }
    });
}



function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        delay: 10,
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
            if (dataItem != undefined) {
                if (dataItem.Status != "1") {
                    e.preventDefault();
                    $("#InputID").val("");
                    displayNotify("Mensajes_error", dataItem.Status, '1');
                }
                else {
                    $("#InputID").val(dataItem.IDValido);
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                    AjaxObtenerListaTubero();
                    AjaxObtenerListaTaller();
                }
            }
        }
        ,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if ($("#InputID").val().length == 1) {
                    $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
                }
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                    AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
                }

                AjaxObtenerListaTubero();
                AjaxObtenerListaTaller();
            }

        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                AjaxObtenerSpoolID();
            } catch (e) {
                displayNotify("Mensajes_error", e.message, '2');

            }
        } else {
            displayNotify("CapturaArmadoMensajeOrdenTrabajo", "", '1');
            //$("#InputOrdenTrabajo").focus();
        }
    });

    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").setDataSource();
        $("#InputID").data("kendoComboBox").setDataSource();
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();
        }
        else if (e.keyCode == 39) {
            $("#Junta").data("kendoComboBox").input.focus();
        }
        else if (e.keyCode == 40 && $("#InputID").data("kendoComboBox").select() != -1) {
            $("#InputID").data("kendoComboBox").select();
            AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
        }
        else if (e.keyCode == 13) {
            if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select(0)) != undefined) {
                if ($('input:radio[name=TipoAgregado]:checked').val() != undefined) {
                    if ($('input:radio[name=Muestra]:checked').val() != undefined) {
                        if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
                            if ($("#InputID").data("kendoComboBox").select() != -1) {
                                AjaxJuntaModoSpool($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);

                                //setTimeout(function () { AjaxCargarReporteJuntas(); }, 500);
                            }
                        }
                    }
                    else {
                        MensajesSteelGO('radioMostrar', '')

                    }
                }
                else {
                    MensajesSteelGO('radioTipoAgregado', '')

                }
            }
            else
                displayNotify("NoExisteSpoolID", '', '2');
        }
        else if (e.keyCode == 9) {
            if (tieneClase(e.currentTarget)) {
                $("#InputID").data("kendoComboBox").select(0);
                AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
            }
            dataItem = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select());
            if (dataItem != undefined) {
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                    AjaxJunta($("#InputID").val());
                    AjaxObtenerListaTubero();
                    AjaxObtenerListaTaller();
                }
            }
        }
    });

    $('#InputID').blur(function (e) {
        var spoollIDValue = $("#InputID").val();
        var listaSpoolID = $("#InputID").data("kendoComboBox").dataSource._data;
        if (listaSpoolID.length > 0) {
            for (var i = 0; i < listaSpoolID.length; i++) {
                var idvalSpoolID = listaSpoolID[i].IDValido + '';
                if (idvalSpoolID.indexOf(spoollIDValue) > 0) {
                    $("#InputID").data("kendoComboBox").select(0);
                    AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
                    break;
                }
            }

        }
    });

};

function SuscribirEventoEliminar(idtable) {
    $("#" + idtable + " .deleteRow").on("click", function () {
        var td = $(this).parent();
        var tr = td.parent();
        //change the background color to red before removing
        tr.css("background-color", "#FF3700");

        tr.fadeOut(400, function () {
            tr.remove();
        });
    });
};


function eventoCambioTipoListado() {

    if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
        $("#JuntaDiv").css('display', 'none');
        $("#MuestraDiv").css('display', 'block');
        Limpiar();
        AjaxCargarCamposPredeterminadosOcultaJunta();
    }
    else if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {
        $("#JuntaDiv").css('display', 'block');
        $("#MuestraDiv").css('display', 'block');
        Limpiar();
        AjaxCargarCamposPredeterminadosOcultaJunta();
    }
}

function suscribirEventoChangeRadioTipoListado() {

    $('input:radio[name=TipoAgregado]:nth(0)').change(function () {
        $("#grid").data("kendoGrid").dataSource.data([]);
        eventoCambioTipoListado();
    });
    $('input:radio[name=TipoAgregado]:nth(1)').change(function () {
        $("#grid").data("kendoGrid").dataSource.data([]);
        eventoCambioTipoListado();
    });
}


function SuscribirEventoMuestraJunta() {

    if ($('input:radio[name=TipoAgregado]').val() == "Reporte") {
        $("#JuntaDiv").hide();
        // $("#MuestraDiv").hide();
    }
    else if ($('input:radio[name=TipoAgregado]').val() == "Listado") {
        $("#JuntaDiv").show();
        // $("#MuestraDiv").show();
    }
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $('#divLlenadoMasivo').find('*').attr('disabled', true);
        $('#InputOrdenTrabajo').css('opacity', '0.6');
        $("#InputID").data("kendoComboBox").enable(false);
        $("#Junta").data("kendoComboBox").enable(false);
        $("#inputTubero").data("kendoComboBox").enable(false);
        $("#inputTaller").data("kendoComboBox").enable(false);
        $("#FechaArmado").data("kendoDatePicker").enable(false);
        $('#botonGuardar').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#DetalleAvisoLlegada0017").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $('#ButtonPlanchar').attr('disabled', true);
        $("#GuardarPie").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardarPiePagina').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $('#divLlenadoMasivo').find('*').attr('disabled', false);
        $('#InputOrdenTrabajo').css('opacity', '1');
        $("#InputID").data("kendoComboBox").enable(true);
        $("#Junta").data("kendoComboBox").enable(true);
        $("#inputTubero").data("kendoComboBox").enable(true);
        $("#inputTaller").data("kendoComboBox").enable(true);
        $("#FechaArmado").data("kendoDatePicker").enable(true);
        $('#botonGuardar').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#DetalleAvisoLlegada0017").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#ButtonPlanchar').attr('disabled', false);
        $("#GuardarPie").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardarPiePagina').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}