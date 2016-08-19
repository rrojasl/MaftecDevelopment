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
    SuscribirEventoMostrarSpool();
    SuscribirEventoCheckCerrarCarro();
};

function SuscribirEventoCambiarVista() { 
    $('#styleEscritorio').click(function () {
        $("#styleEscritorio").addClass("active");
        $("#stylePatio").removeClass("active");
        
        $("#inputProyecto").data("kendoComboBox").value("");
        
        $("#inputCarroBacklog").data("kendoComboBox").dataSource.data([]);
        $("#inputCarroBacklog").data("kendoComboBox").value("");
        
        $("#chkCerrar").attr("checked", false);
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
        $("#inputCarro").data("kendoComboBox").dataSource.data([]);
        $("#inputCarro").data("kendoComboBox").value("");

        $("#chkCerrar2").attr("checked", false);
        $("#labelM2").text("");
        $("#labelToneladas").text("");
        
        

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
        //$("#inputCarroBacklog").data("kendoComboBox").value("");
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
            
            $("#inputCarro").data("kendoComboBox").dataSource.data([]);
            $("#inputCarro").data("kendoComboBox").value("");
            
            $("#inputCarroBacklog").data("kendoComboBox").dataSource.data([]);
            $("#inputCarroBacklog").data("kendoComboBox").value("");
            
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
                    $("#InputID").val('');

                    AjaxPinturaCargaMedioTransporte();

                    if ($("#styleEscritorio").hasClass("active")) {
                        AjaxCargarSpoolBacklog(false, 0);
                    }
                }
            } else {
                $("#inputProyecto").data("kendoComboBox").value("");
            }
        }
        
    });

    $('#inputProyecto').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13 ) {
            
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
            var ds = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource;
            AjaxSubirSpool(ds._data, true);
        }
        else if ($("#stylePatio").hasClass("active"))
        {
            ajaxGuardar($("#grid").data("kendoGrid").dataSource._data, true);
            
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
        $("input[name='Muestra']").attr("disabled", true);
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
        $("input[name='Muestra']").attr("disabled", false);
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
        $("input[name='Muestra']").attr("disabled", true);
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
        $("input[name='Muestra']").attr("disabled", false);
        $("#inputCarroBacklog").data("kendoComboBox").enable(true);
        $("#chkCerrar").attr("disabled", false);
        $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

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
        $("#InputOrdenTrabajo").val('');
        $("#InputID").val('');
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
        $("#inputCodigo").val('');

    });

    $('input:radio[name=PinturaCargaTipoSeleccion]:nth(1)').change(function () {
        $("#InputIDDiv").hide();
        $("#divCodigo").show();
        $("#InputOrdenTrabajo").val('');
        $("#InputID").data("kendoComboBox").dataSource.data([]);
        $("#InputID").value('');
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
        change: function (e) {  
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                $('#inputCarro').attr("mediotransporteid", dataItem.MedioTransporteCargaID);
                $('#inputCarro').attr("mediotransportecerrado", dataItem.CarroCerrado);
                $("#grid").data('kendoGrid').dataSource.data([]);
                if (dataItem.MedioTransporteID != "0") {
                    if (dataItem.MedioTransporteID == "-1") {
                        $("#InputNombre").val("");
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
                            }
                        }).data("kendoWindow");
                        $("#divNuevoMedioTransporte").data("kendoWindow").title(_dictionary.CrearNuevoCarro[$("#language").data("kendoDropDownList").value()]);
                        $("#divNuevoMedioTransporte").data("kendoWindow").center().open();
                    }
                    else {
                        AjaxObtenerDetalleCarroCargado(dataItem.MedioTransporteCargaID);
                    }
                 }

                $("#chkCerrar2").attr("checked", false);
                $("#InputOrdenTrabajo").val('');
                $("#InputID").data("kendoComboBox").dataSource.data([]);
                $("#InputID").val('');
            }
            else {
                $("#inputCarro").val('');
            }
        }
    });
}
function suscribirEventoCarroBacklog() {
    $("#inputCarroBacklog").kendoComboBox({
        dataTextField: "NombreMedioTransporte",
        dataValueField: "MedioTransporteID",
        suggest: true,
        filter: "contains",
        delay: 10,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                $('#inputCarroBacklog').attr("mediotransporteid", dataItem.MedioTransporteCargaID);
                $('#inputCarroBacklog').attr("mediotransportecerrado", dataItem.CarroCerrado);
                $("#grid[nombre='grid-backlog']").data('kendoGrid').dataSource.data([]);
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
                            $("#inputCarroBacklog").data("kendoComboBox").value("");
                        }
                    }).data("kendoWindow");
                    $("#divNuevoMedioTransporte").data("kendoWindow").title(_dictionary.CrearNuevoCarro[$("#language").data("kendoDropDownList").value()]);
                    $("#divNuevoMedioTransporte").data("kendoWindow").center().open();
                }
                else {

                    AjaxCargarSpoolBacklog(false, dataItem.MedioTransporteID);
                }
                $("#chkCerrar").attr("checked", false);
                $("#InputOrdenTrabajo").val('');
                $("#InputID").data("kendoComboBox").dataSource.data([]);
                $("#InputID").val('');
            } else {
                $("#inputCarroBacklog").val('');
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
            if ($('#InputID').data("kendoComboBox").value() != undefined) {
                AjaxAgregarCarga();
            }
            else {
                $("#InputID").data("kendoComboBox").value("");
                displayNotify("NoExisteSpoolID", '', '2');
            }
        }
    });

};

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

function SuscribirEventoMostrarSpool() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        if ($("#styleEscritorio").hasClass("active")) {
            FiltroMostrarBack(0);
            
        }
        else if ($("#stylePatio").hasClass("active")) {
            
            FiltroMostrar(0);
        }

    });

    $('input:radio[name=Muestra]:nth(1)').change(function () {
        if ($("#styleEscritorio").hasClass("active")) {

            FiltroMostrarBack(1);
            
        }
        else if ($("#stylePatio").hasClass("active")) {

            FiltroMostrar(1);

        }

    });
}

function SuscribirEventoCheckCerrarCarro() {
    $('#chkCerrar, #chkCerrar2').change(function () {
        var checked = $(this)[0].checked;
        if ($("#styleEscritorio").hasClass("active")) {
            if ($("#inputCarroBacklog").data("kendoComboBox").value() != "" &&
                $("#inputCarroBacklog").data("kendoComboBox").value() != "0") {

                var ds = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource;

                if (ds._data.length > 0) {
                    if ($("#inputCarroBacklog")) {
                        $(this)[0].checked = true;

                    }
                }
            }
        }
        else if ($("#stylePatio").hasClass("active")) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            if(ds._data.length>0 && $("#inputCarro").data("kendoComboBox").value()!=""){
                if ($("#inputCarro").attr("mediotransportecerrado")) {
                    $(this)[0].checked = true;
                }
            }
         
        }
    });
}

function Limpiar() {
    $("#inputProyecto").val('');
    $("#inputCarro").data("kendoComboBox").dataSource.data([]);
    $("#inputCarro").val('');
    $("#inputCarroBacklog").data("kendoComboBox").dataSource.data([]);
    $("#inputCarroBacklog").val('');
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