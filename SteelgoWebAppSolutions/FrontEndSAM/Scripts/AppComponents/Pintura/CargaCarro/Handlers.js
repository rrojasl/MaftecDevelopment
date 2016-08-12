var windowNewCarriage;
function SuscribirEventos() {
    SuscribirEventoCambiarVista();
    SuscribirEventoSpoolID();
    SuscribirEventoChangeRadioTipoListado();
    SuscribirEventoCarro();
    SuscribirEventoAgregar();
    SuscribirEventoGuardar();
    SuscribirEventoCerrarMedioTransporte();
    SuscribirEventoGuardarCrearMedioTransporte();
    SuscribirEventoCerrarCrearMedioTransporte();
    SuscribirEventoProyecto();
    suscribirEventoCarroBacklog();
    SuscribirEventoCuadrante();
};

function SuscribirEventoCambiarVista() { 
    $('#styleEscritorio').click(function () {
        $("#styleEscritorio").addClass("active");
        $("#stylePatio").removeClass("active");
        
        $("#inputProyecto").data("kendoComboBox").value("");
        $("#inputCarroBacklog").data("kendoComboBox").value("");
        $("#labelM22").text("");
        $("#labelToneladas2").text("");
        $("#grid[nombre='grid-backlog']").data('kendoGrid').dataSource.data([]);

        $("#contenedorPrincipalCargaCarro").hide();
        $("#contenedorPrincipalCargaCarroBacklog").show();
    });
    $('#stylePatio').click(function () {
        $("#styleEscritorio").removeClass("active");
        $("#stylePatio").addClass("active");

        $("#inputProyecto").data("kendoComboBox").value("");
        $("#chkCerrar2").attr("checked", false);
        $("#labelM2").text("");
        $("#labelToneladas").text("");
        $("#inputCarro").data("kendoComboBox").value("");
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").dataSource.data([]);
        $("#InputID").data("kendoComboBox").value("");
        $("#grid").data('kendoGrid').dataSource.data([]);

        $("#contenedorPrincipalCargaCarro").show();
        $("#contenedorPrincipalCargaCarroBacklog").hide();
        
    });

   
}

function SuscribirEventoGuardarCrearMedioTransporte() {
    $('#btnGuardarCrearMedioTransporte').click(function (e) {
        AjaxGuardarNuevoCarro();
    });
    $('#InputNombre').keydown(function (e) {
        if ($('#InputNombre').val() != "") {
            if (e.keyCode == 13) {
                AjaxGuardarNuevoCarro();
            }
        }
        
    });

    
}

function SuscribirEventoCerrarCrearMedioTransporte() {
    $('#btnCerrarVentanaCrearMedioTransporte').click(function (e) {
        $("#inputCarro").data("kendoComboBox").value("");
        $("#inputCarroBacklog").data("kendoComboBox").value("");
        $("#InputNombre").val("");
        windowNewCarriage.close();
    });
}

function SuscribirEventoProyecto() {

    $('#inputProyecto').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID ",
        suggest: true,
        filter: "contains",
        index: 3,
        delay:10,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                $("#grid").data('kendoGrid').dataSource.data([]);
                $("#grid[nombre='grid-backlog']").data('kendoGrid').dataSource.data([]);
                if (dataItem.ProyectoID != 0){
                
                    $("#labelM2").text('');
                    $("#labelToneladas").text('');
                    $("#labelM22").text('');
                    $("#labelToneladas2").text('');
                    $("#chkCerrar").attr("checked", false);
                    $("#chkCerrar2").attr("checked", false);
                    $("#InputOrdenTrabajo").val("");
                    $("#InputID").data("kendoComboBox").dataSource.data([]);
                    $("#InputID").data("kendoComboBox").value("");

                    AjaxPinturaCargaMedioTransporte();

                    if ($("#styleEscritorio").hasClass("active")){
                        AjaxCargarSpoolBacklog(false, $('#inputCarroBacklog').attr("mediotransporteid"));
                    }
                    
                }
            } else {
                $("#inputProyecto").data("kendoComboBox").value("");

            }
        },
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            if (dataItem != undefined && dataItem.ProyectoID != 0) {
                $("#grid").data('kendoGrid').dataSource.data([]);
                if ($("#grid[nombre='grid-backlog']").data('kendoGrid') != undefined) {
                    $("#grid[nombre='grid-backlog']").data('kendoGrid').dataSource.data([]);
                }
                
                $("#labelM2").text('');
                $("#labelToneladas").text('');
                $("#labelM22").text('');
                $("#labelToneladas2").text('');
                $("#chkCerrar").attr("checked", false);
                $("#chkCerrar2").attr("checked", false);
                $("#InputOrdenTrabajo").val("");
                $("#InputID").data("kendoComboBox").dataSource.data([]);
                $("#InputID").data("kendoComboBox").value("");
                AjaxCargarSpoolBacklog(false, $('#inputCarroBacklog').attr("mediotransporteid"));
            }
            else {
                $("#inputProyecto").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoCerrarMedioTransporte() {
    $('#btnCerrarCarro, #btnCerrarCarro1').click(function (e) {
        AjaxCerrarCarro();
    });
}

function SuscribirEventoAgregar() {
    $('#btnAgregar').click(function (e) { 
            AjaxAgregarCarga();  
    });
}
 
function SuscribirEventoGuardar() { 
    $('#btnGuardarYNuevo,#btnGuardarYNuevo1').click(function (e) {       
        if ($("#styleEscritorio").hasClass("active")) {
            
                ajaxGuardar($("#grid").data("kendoGrid").dataSource._data, true);
        }
        else if ($("#stylePatio").hasClass("active"))
        {
                var ds = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource;
                AjaxSubirSpool(ds._data, true);
        }        
    });

    $('#Guardar, #btnGuardar, #GuardarPie, #Guardar1').click(function (e) {
        e.stopPropagation();
         
        if ($("#styleEscritorio").hasClass("active")) {

            if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                var ds = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource;
                AjaxSubirSpool(ds._data, false);
            }
            else if ($('#Guardar').text() == _dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]) {
                SetDisabledBooleanEnGrid(false);
                opcionHabilitarViewBacklog(false, "FieldSetView");

            }
        }
        else if ($("#stylePatio").hasClass("active")) {

            if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                ajaxGuardar($("#grid").data("kendoGrid").dataSource._data, false);

            }
            else if ($('#Guardar').text() == _dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]) {
                opcionHabilitarView(false, "FieldSetView")
            } 
            
        } 
    });
};

function opcionHabilitarView(valor, name) {
    var $menu = $('.save-group');

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $(".addedSectionInLine").find('*').attr("disabled", true);
        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#styleEscritorio").attr("disabled", true);
        $("#stylePatio").attr("disabled", true);
        $("#inputCarro").data("kendoComboBox").enable(false);
        $("#chkCerrar2").attr("disabled", true);

        $("#btnAgregar").attr("disabled", true);
        $("#Guardar").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $("#GuardarPie").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $(".addedSectionInLine").find('*').attr("disabled", false);
        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("#styleEscritorio").attr("disabled", false);
        $("#stylePatio").attr("disabled", false);
        $("#inputCarro").data("kendoComboBox").enable(true);
        $("#chkCerrar2").attr("disabled", false);

        $("#btnAgregar").attr("disabled", false);
        $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#GuardarPie").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function opcionHabilitarViewBacklog(valor, name) {
    var $menu = $('.save-group');

    if (valor) {
        $(".addedSectionInLine").find('*').attr("disabled", true);
        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#styleEscritorio").attr("disabled", true);
        $("#stylePatio").attr("disabled", true);
        $("#inputCarroBacklog").data("kendoComboBox").enable(false);
        $("#chkCerrar").attr("disabled", true);
        $("#Guardar").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.PinturaCargaEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $(".addedSectionInLine").find('*').attr("disabled", false);
        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("#styleEscritorio").attr("disabled", false);
        $("#stylePatio").attr("disabled", false);
        $("#inputCarroBacklog").data("kendoComboBox").enable(true);
        $("#chkCerrar").attr("disabled", false);
        $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

//Valida el tipo de busqueda de un spool a agregar...
function ObtenerTipoConsulta() {
    var radioButtonsLLena = document.getElementsByName('PinturaCargaTipoSeleccion');

    for (var x = 0; x < radioButtonsLLena.length; x++) {
        if (radioButtonsLLena[x].checked) {
            return (x + 1);
        }
    }
    return -1;
}

function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        delay:10,
        select: function (e) {

            dataItem = this.dataItem(e.item.index());

            if (dataItem.Status != "1") {
                e.preventDefault();
                $("#InputID").val("");
                displayNotify("Mensajes_error", dataItem.Status, '1');

            }
            else {
                $("#InputID").val(dataItem.IDValido);
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);
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

                }
            }
            else
                displayNotify("NoExisteSpoolID", '', '2');
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                AjaxObtenerSpoolID();
            } catch (e) {
                displayNotify("Mensajes_error", e.message, '0');
            }
        } else {
            $("#InputOrdenTrabajo").val("");
            displayNotify("CapturaArmadoMensajeOrdenTrabajo", "", '1');
        }
    });

    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource();
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();

        }
        else if (e.keyCode == 40){
            $("#InputID").data("kendoComboBox").select();
        }
        else if (e.keyCode == 13) { 
            AjaxAgregarCarga(); 
        }
    });
    $("#InputID").blur(function () {
        $("#InputID").data("kendoComboBox").trigger("change");
    });

};

function SuscribirEventoChangeRadioTipoListado() {

    $('input:radio[name=PinturaCargaTipoSeleccion]:nth(0)').change(function () {
        $("#InputIDDiv").show();
        $("#divCodigo").hide();
        $("#inputCodigo").val("");

    });

    $('input:radio[name=PinturaCargaTipoSeleccion]:nth(1)').change(function () {
        $("#InputIDDiv").hide();
        $("#divCodigo").show();
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").dataSource.data([]);
        $("#InputID").data("kendoComboBox").value("");
    });
}

function SuscribirEventoCarro() { 
    $('#inputCarro').kendoComboBox({
        dataTextField: "NombreMedioTransporte",
        dataValueField: "MedioTransporteID ",
        suggest: true,
        filter: "contains",
        index: 3,
        delay:10,
        select: function (e) { 
            var dataItem = this.dataItem(e.item.index());
            if (dataItem != undefined) {
                $('#inputCarro').attr("mediotransporteid", dataItem.MedioTransporteCargaID);
                $("#grid").data('kendoGrid').dataSource.data([]);
                if (dataItem.MedioTransporteID != "0") {         
                    if (dataItem.MedioTransporteID == "-1") {                        
                        windowNewCarriage = $("#divNuevoMedioTransporte").kendoWindow({
                            modal: true,
                            resizable: false,
                            visible: true,
                            width: "500px",
                            height: "auto",
                            position: {
                                top: "1%",
                                left: "1%"
                            },
                            actions: [
                                "Close"
                            ],
                            close: function () {
                                $("#inputCarro").data("kendoComboBox").value("");
                                $("#InputNombre").val("");
                            }
                        }).data("kendoWindow");
                        $("#divNuevoMedioTransporte").data("kendoWindow").title(_dictionary.CrearNuevoCarro[$("#language").data("kendoDropDownList").value()]);
                        $("#divNuevoMedioTransporte").data("kendoWindow").center().open();
                    }
                    else {
                        $("#inputCarro").val(dataItem.MedioTransporteID);
                        AjaxObtenerDetalleCarroCargado(dataItem.MedioTransporteCargaID);
                    }
                }
                $("#chkCerrar2").attr("checked", false);
                $("#InputOrdenTrabajo").val("");
                $("#InputID").data("kendoComboBox").dataSource.data([]);
                $("#InputID").data("kendoComboBox").value("");
            }
            else {
                $("#inputCarro").data("kendoComboBox").value("");
                displayNotify("NoExisteCarro", '', '2');
            }
                
        },
        change: function (e) {  
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                $('#inputCarro').attr("mediotransporteid", dataItem.MedioTransporteCargaID);
                $("#grid").data('kendoGrid').dataSource.data([]);
                if (dataItem.MedioTransporteID != "0") {
                    if (dataItem.MedioTransporteID == "-1") {
                        windowNewCarriage = $("#divNuevoMedioTransporte").kendoWindow({
                            modal: true,
                            resizable: false,
                            visible: true,
                            width: "500px",
                            height: "auto",
                            position: {
                                top: "1%",
                                left: "1%"
                            },
                            actions: [
                                "Close"
                            ],
                            close: function () {
                                $("#inputCarro").data("kendoComboBox").value("");
                                $("#InputNombre").val("");
                            }
                        }).data("kendoWindow");
                        $("#divNuevoMedioTransporte").data("kendoWindow").title(_dictionary.CrearNuevoCarro[$("#language").data("kendoDropDownList").value()]);
                        $("#divNuevoMedioTransporte").data("kendoWindow").center().open();
                    }
                    else {
                        $("#inputCarro").val(dataItem.MedioTransporteID);
                        AjaxObtenerDetalleCarroCargado(dataItem.MedioTransporteCargaID);
                    }
                 }

                $("#chkCerrar2").attr("checked", false);
                $("#InputOrdenTrabajo").val("");
                $("#InputID").data("kendoComboBox").dataSource.data([]);
                $("#InputID").data("kendoComboBox").value("");
            }
            else {
                $("#inputCarro").data("kendoComboBox").value("");
                displayNotify("NoExisteCarro", '', '2');
            }
        }
    });


   $('#inputCarro').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()) != undefined) {
                
            }
            else {
                $("#inputCarro").data("kendoComboBox").value("");
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
        filter: "contains",
        index: 3,
        delay:10,
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
                }
            }
            else {
                $("#InputID").data("kendoComboBox").value("");
                displayNotify("NoExisteSpoolID", '', '2');
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
                }
            }
            else {
                $("#InputID").data("kendoComboBox").value("");
                displayNotify("NoExisteSpoolID", '', '2');
            }
            $("#chkCerrar").attr("checked", false);
            $("#chkCerrar2").attr("checked", false);
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val()!="") {
            if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
                try {
                    AjaxObtenerSpoolID();
                } catch (e) {
                    displayNotify("Mensajes_error", e.message, '0');
                }
            } else {
                $("#InputOrdenTrabajo").val("");
                displayNotify("CapturaArmadoMensajeOrdenTrabajo", "", '1');
            }
        }        
        
    });


    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource();
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();

        }
        else if (e.keyCode == 40) {
            $("#InputID").data("kendoComboBox").select();
        }
        else if (e.keyCode == 13) {
            if ($('#inputCarro').attr("mediotransporteid") > 0) {
                AjaxAgregarCarga();
            }
            else {
                $("#InputID").data("kendoComboBox").value("");
                displayNotify("NoExisteSpoolID", '', '2');
            } 
        }
    });

};

function Limpiar() {
    $("#inputProyecto").data("kendoComboBox").value("");
    $("#inputCarro").data("kendoComboBox").dataSource.data([]);
    $("#inputCarro").data("kendoComboBox").value("");
    $("#inputCarroBacklog").data("kendoComboBox").dataSource.data([]);
    $("#inputCarroBacklog").data("kendoComboBox").value("");
    $("#labelM2").text("");
    $("#labelM22").text("");
    $("#labelToneladas").text("");
    $("#labelToneladas2").text("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#InputID").data("kendoComboBox").value("");
    $("#InputOrdenTrabajo").val("");
    $('input:radio[name=TipoVista]:nth(0)').attr('checked', true);
    $('input:radio[name=TipoVista]:nth(1)').attr('checked', false);
    $("#grid").data('kendoGrid').dataSource.data([]);
    $("#grid[nombre='grid-backlog']").data('kendoGrid').dataSource.data([]);    
    $("#chkCerrar").attr("checked", false);
    $("#chkCerrar2").attr("checked", false);
    AjaxCargarCamposPredeterminados();
    opcionHabilitarView(false, "")
    opcionHabilitarViewBacklog(false, "");
}



//EventosBacklog

function suscribirEventoCarroBacklog() {

    $("#inputCarroBacklog").kendoComboBox({
        dataTextField: "NombreMedioTransporte",
        dataValueField: "MedioTransporteID",
        suggest: true,
        filter: "contains",
        delay:10,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            if (dataItem != undefined) {
                $('#inputCarroBacklog').attr("mediotransporteid", dataItem.MedioTransporteCargaID);
                $("#grid[nombre='grid-backlog']").data('kendoGrid').dataSource.data([]);

                    if (dataItem.MedioTransporteID == "-1") {
                        LimpiarCarro();
                        windowNewCarriage = $("#divNuevoMedioTransporte").kendoWindow({
                            modal: true,
                            resizable: false,
                            visible: true,
                            width: "500px",
                            height: "auto",
                            position: {
                                top: "1%",
                                left: "1%"
                            },
                            actions: [
                                "Close"
                            ],
                            close: function () {
                                $("#inputCarroBacklog").data("kendoComboBox").value("");
                                $("#InputNombre").val("");
                            }
                        }).data("kendoWindow");
                        $("#divNuevoMedioTransporte").data("kendoWindow").title(_dictionary.CrearNuevoCarro[$("#language").data("kendoDropDownList").value()]);
                        $("#divNuevoMedioTransporte").data("kendoWindow").center().open();
                    }
                    else {

                        AjaxCargarSpoolBacklog(false, dataItem.MedioTransporteCargaID);
                    }
                    $("#chkCerrar").attr("checked", false);
                    $("#InputOrdenTrabajo").val("");
                    $("#InputID").data("kendoComboBox").dataSource.data([]);
                    $("#InputID").data("kendoComboBox").value("");
            } else {
                $("#inputCarroBacklog").data("kendoComboBox").value("");
                displayNotify("NoExisteCarro", '', '2');
            }
        },
        change: function(e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                $('#inputCarroBacklog').attr("mediotransporteid", dataItem.MedioTransporteCargaID);
                $("#grid[nombre='grid-backlog']").data('kendoGrid').dataSource.data([]);
                
                    if (dataItem.MedioTransporteID == "-1") {
                        LimpiarCarro();
                        windowNewCarriage = $("#divNuevoMedioTransporte").kendoWindow({
                            modal: true,
                            resizable: false,
                            visible: true,
                            width: "500px",
                            height: "auto",
                            position: {
                                top: "1%",
                                left: "1%"
                            },
                            actions: [
                                "Close"
                            ],
                            close: function () {
                                $("#inputCarroBacklog").data("kendoComboBox").value("");
                                $("#InputNombre").val("");
                            }
                        }).data("kendoWindow");
                        $("#divNuevoMedioTransporte").data("kendoWindow").title(_dictionary.CrearNuevoCarro[$("#language").data("kendoDropDownList").value()]);
                        $("#divNuevoMedioTransporte").data("kendoWindow").center().open();
                    }
                    else {

                        AjaxCargarSpoolBacklog(false, dataItem.MedioTransporteCargaID);
                    }
                    $("#chkCerrar").attr("checked", false);
                    $("#InputOrdenTrabajo").val("");
                    $("#InputID").data("kendoComboBox").dataSource.data([]);
                    $("#InputID").data("kendoComboBox").value("");
            } else {
                $("#inputCarroBacklog").data("kendoComboBox").value("");
                displayNotify("NoExisteCarro", '', '2');
            }
        }
    });

    $('#inputCarroBacklog').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputCarroBacklog").data("kendoComboBox").dataItem($("#inputCarroBacklog").data("kendoComboBox").select()) != undefined) {

            }
            else {
                $("#inputCarroBacklog").data("kendoComboBox").value("");
            }
        }
    });


}

function SuscribirEventoCuadrante() {
    $('#inputCuadrantePopup').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        change: function () {
            if ($("#inputCuadrantePopup").data("kendoComboBox").dataItem($("#inputCuadrantePopup").data("kendoComboBox").select()) != undefined) {
                
            }
            else {
                $("#inputCuadrantePopup").data("kendoComboBox").value("");
            }
        }
    });
}