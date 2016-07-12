﻿var endRangeDate;
var ItemSeleccionado;
var pruebasID, ProyectoID;
var requisicionID, pruebaProyID = 0;
var ProyectoNombre = "";
var PruebaNombre = "";
var EstatusID = 1; // Capturada segun tabla Sam3_Estatus
if ($("#idField").val() != null || $("#idField").val() != undefined) {
    requisicionID = $("#idField").val();
}
else
    requisicionID = 0;


IniciarCaptura();

function IniciarCaptura() {
    AltaFecha();
    SuscribirEventos();
};

function changeLanguageCall() {
    endRangeDate.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });
    CargarGrid();
    $("#tipoPrueba").data("kendoComboBox").value("");
    $("#Proyecto").data("kendoComboBox").value("");
    $("#Proyecto").data("kendoComboBox").enable(true);
    $("#tipoPrueba").data("kendoComboBox").enable(true);
    $('#containerDiv').css('display', 'none');
    $('#grid').data('kendoGrid').dataSource.read();
    ajaxRequisicion();

    ajaxObtenerProyectos();
    setTimeout(function () { AjaxCargarCamposPredeterminados() }, 1000);
    document.title = _dictionary.ServiciosTecnicosGenerarRequisicion[$("#language").data("kendoDropDownList").value()];
};


function cargaInicialRequisicionEditar() {
    if (requisicionID != 0) {
        $("#Proyecto").data("kendoComboBox").value(ProyectoID);
        ajaxObtenerTipoPruebasRequisicionEdicion();
    }
}

function CargarGrid() {
    $("#grid").kendoGrid({
        edit: function (e) {

            if ($('#botonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },
        dataSource: {
            data: '',
            schema: {
                model: {
                    fields: {
                        Proyecto: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Prioridad: { type: "number", editable: false },
                        Clasificacion: { type: "string", editable: false },
                        Requisicion: { type: "string", editable: false },
                        SpoolID: { type: "number", editable: false },
                        EtiquetaJunta: { type: "string", editable: false },
                        Diametro: { type: "number", editable: false },
                        Espesor: { type: "number", editable: false },
                        Cedula: { type: "string", editable: false },
                        TipoJunta: { type: "string", editable: false },
                        NombrePrueba: {type: "string", editable: false},

                        RequisicionJuntaSpoolID: {type: "number", editable: false},
                        JuntaTrabajoID: {type: "number", editable: false},
                        CodigoAplicar: { type: "string", editable: false },
                        observacion: { type: "string", editable: false },
                        Folio: { type: "string", editable: false },
                        Agregar: { type: "boolean", editable: false },
                        NumeroControl: { editable: false }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        editable: true,
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "Proyecto", title: _dictionary.GenerarRequisicionProyecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "170px" },
            { field: "Cuadrante", title: _dictionary.GenerarRequisicionCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "Prioridad", title: _dictionary.GenerarRequisicionPrioridad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "90px", attributes: { style: "text-align:right;" } },
            { field: "Clasificacion", title: _dictionary.GenerarRequisicionClasificacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxClasificacion, width: "90px" },
            { field: "Folio", title: _dictionary.ServiciosTecnicosFolio[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "80px" },
            { field: "NumeroControl", title: _dictionary.GenerarRequisicionNumControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "EtiquetaJunta", title: _dictionary.JuntaGrid[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "70px", attributes: { style: "text-align:right;" } },
            { field: "Diametro", title: _dictionary.WPSLabelDiametro[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "80px", attributes: { style: "text-align:right;" } },
            { field: "Espesor", title: _dictionary.GenerarRequisicionEspesor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "100px", attributes: { style: "text-align:right;" } },
            { field: "Cedula", title: _dictionary.CapturaSoldaduraCedula[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "TipoJunta", title: _dictionary.ServiciosTecnicosTipoJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "NombrePrueba", title: _dictionary.GenerarRequisicionNombrePrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            {
                field: "Agregar", title: _dictionary.ServiciosTecnicosAgregar[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.CheckBoxFilterPQRContiene[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.CheckBoxFilterPQRNoContiene[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: Agregar' #= Agregar ? checked='checked' : '' #/>", width: "100px"
            },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: cancelarCaptura }, width: "50px", title: _dictionary.tituloEliminar[$("#language").data("kendoDropDownList").value()] }
        ],
        dataBound: function (a) {
            $(".ob-paid").bind("change", function (e) {
                if ($('#botonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                    var grid = $("#grid").data("kendoGrid"),
                        dataItem = grid.dataItem($(e.target).closest("tr"));
                    if (dataItem.Folio == "" && e.target.checked == true) {
                        dataItem.Agregar = true;
                    }
                    else {
                        dataItem.Agregar = false;
                    }
                }
                else
                    $("#grid").data("kendoGrid").closeCell();
                //$("#grid").data("kendoGrid").dataSource.sync();
            });
        }
    });
    CustomisaGrid($("#grid"));
};

function AltaFecha() {

    endRangeDate = $("#Fecha").kendoDatePicker({
        max: new Date(),
    });
    $("#Fecha").data("kendoDatePicker").enable(false);
}


function ExisteJunta() {
    var jsonGrid = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < jsonGrid.length; i++) {
        if (jsonGrid[i].JuntaTrabajoID == $("#Junta").data("kendoComboBox").value()) {

            $("#grid").data("kendoGrid").dataSource.sync();
            return false;
        }
    }
    return true;
}

function AgregarJuntaNueva() {
    if (ExisteJunta()) {
        loadingStart();
        AjaxObtenerJunta();
    }
    else {
        displayNotify("GenerarRequisicionMensajeJuntaAgregada", "", '1');
    }
}





function ValidaFormatoFecha(FechaValidar, Idioma) {

    //Valida que el formato de la fecha sea correcto (2-2-4)
    var bool;
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((String(FechaValidar).trim().match(RegExPattern)) && (FechaValidar != '')) {

        if (Idioma == 'es-MX') {

            if (existeFechaMexicoFormato(FechaValidar) && existeFechaMexico(FechaValidar)) {
                bool = true;
            }
            else {
                bool = false
            }
        }
        else if (Idioma == 'en-US') {

            if (existeFechaEUFormato(FechaValidar) && existeFechaEU(FechaValidar)) {
                bool = true;
            }
            else {
                bool = false
            }

        }
    } else {

        bool = false;
    }
    return bool;

}

function cancelarCaptura(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

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

        ventanaConfirm.content(_dictionary.ServiciosTecnicosElm[$("#language").data("kendoDropDownList").value()] +
                     "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function () {

            var dataSource = $("#grid").data("kendoGrid").dataSource;
            dataItem.Accion = 3;
            $("#grid").data("kendoGrid").dataSource.sync();

            ventanaConfirm.close();
        });
        $("#noButton").click(function () {
            ventanaConfirm.close();
        });
    }
};

function existeFechaMexicoFormato(fecha) {
    var fechaf = fecha.split("/");
    var d = fechaf[0];
    var m = fechaf[1];
    var y = fechaf[2];

    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();


}

function existeFechaMexico(FechaValidar) {
    var fechaf = FechaValidar.split("/");
    var day = FechaValidar[0];
    var month = FechaValidar[1];
    var year = FechaValidar[2];
    var date = new Date(year, month, '0');
    if ((day - 0) > (date.getDate() - 0)) {
        return false;
    }
    return true;
}

function existeFechaEUFormato(fecha) {
    var fechaf = fecha.split("/");
    var d = fechaf[1];
    var m = fechaf[0];
    var y = fechaf[2];

    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}

function existeFechaEU(FechaValidar) {
    var fechaf = FechaValidar.split("/");
    var day = FechaValidar[1];
    var month = FechaValidar[0];
    var year = FechaValidar[2];
    var date = new Date(year, month, '0');
    if ((day - 0) > (date.getDate() - 0)) {
        return false;
    }
    return true;
}

function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false;
}