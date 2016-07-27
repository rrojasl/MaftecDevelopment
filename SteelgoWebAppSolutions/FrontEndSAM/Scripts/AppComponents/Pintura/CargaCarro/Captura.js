
//----------------------------------------CargaCarro---------------------------------------------------------------
IniciarCapturaPinturaCarga();
function IniciarCapturaPinturaCarga() {
    SuscribirEventos();
    
}

function changeLanguageCall() {
    $("#inputCarro").data("kendoComboBox").text("");
    $("#inputCarroBacklog").data("kendoComboBox").text("");
    AjaxObtenerCatalogoClasificacion();
    AjaxObtenerCatalogoPersistencia();
    AjaxObtenerListaProyectos();
        CargarGrid();
        AjaxCargarCamposPredeterminados();  
 
    document.title = _dictionary.PinturaHeaderCargaCarro[$("#language").data("kendoDropDownList").value()];
}
 
function IniciarBacklog() {
    $("#inputCarro").data("kendoComboBox").text("");
    $("#inputCarroBacklog").data("kendoComboBox").text("");
    $("#inputPesoMaximo2").val('');
    $("#inputArea2").val('');
    CargarGridBacklog();
    AjaxCargarCamposPredeterminadosBacklog();
    AjaxCargarSpool(false, 0);
    AjaxObtenerCatalogoClasificacion();
    AjaxObtenerCatalogoPersistencia();
}

function LimpiarCarro() {
    $("#inputMedioTransporte").val('');
    $("#inputNumeroVeces").val('');
    $("#inputPesoMaximo").val('');
    $("#inputArea").val('');

}

function CargarGrid() {
    $("#grid").kendoGrid({
        edit: function (e) { 
            this.closeCell(); 
        },
        dataSource: { 
            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Area: { type: "number", editable: false },
                        Peso: { type: "number", editable: false }
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
        filterable: getGridFilterableMaftec(),
        editable: false,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "SpoolJunta", title: _dictionary.PinturaCargaSpool[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "SistemaPintura", title: _dictionary.PinturaCargaSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "Area", type: 'number', title: _dictionary.PinturaCargaArea[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", attributes: { style: "text-align:right;" } },
            { field: "Peso", type: 'number', title: _dictionary.PinturaCargaPeso[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", attributes: { style: "text-align:right;" } },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: _dictionary.tituloEliminar[$("#language").data("kendoDropDownList").value()], width: "50px", attributes: { style: "text-align:center;" } }
        ]
    });
    CustomisaGrid($("#grid"));

}


function eliminarCaptura(e) {
    e.preventDefault(); 
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
         
        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
            visible: false,
            width: "400px",
            height: "auto",
            modal: true,
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");
          
        ventanaConfirm.content(_dictionary.CapturaAvanceIntAcabadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function (handler) {
            var dataSource = $("#grid").data("kendoGrid").dataSource;
            
            if (dataItem.Accion === 1)
            { dataSource.remove(dataItem); }
            else {
                dataItem.Accion = 3
            }                

            dataSource.sync();

            ImprimirAreaTonelada();
            ventanaConfirm.close();
        });
        $("#noButton").click(function () {
            ventanaConfirm.close();
        });
    }
}

function validarInformacion(row) {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var existe = false;

    for (var i = 0; i < ds._data.length; i++) {
        if (ds._data[i]["SpoolID"] == row.SpoolID && ds._data[i]["Accion"] != 3) {
            existe = true;
            break;
        }
    }
    return existe;
}

function ValidarDatosNuevoCarro(ListaDetalles) {
    var error = false;

    if (ListaDetalles.Nombre == "" || ListaDetalles.Nombre ==  undefined) {
        displayNotify("PinturaCargaCarroMensajeErrorNombreCarro", "", '2');
        error = true;
    }

    return error;
}

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------CargaCarroBackLog-------------------------------------------------
function CargarGridBacklog() {
 
    kendo.ui.Grid.fn.editCell = (function (editCell) {
        return function (cell) {
            cell = $(cell);

            var that = this,
                column = that.columns[that.cellIndex(cell)],
                model = that._modelForContainer(cell),
                event = {
                    container: cell,
                    model: model,
                    preventDefault: function () {
                        this.isDefaultPrevented = true;
                    }
                };

            if (model && typeof this.options.beforeEdit === "function") {
                this.options.beforeEdit.call(this, event);
                if (event.isDefaultPrevented) return;
            }

            editCell.call(this, cell);
        };
    })(kendo.ui.Grid.fn.editCell);
     
    $("#grid[nombre='grid-backlog']").kendoGrid({
        edit: false,
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        OrdenImportancia: { type: "number", editable: false },
                        SpoolJunta: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Nombre: { type: "string", editable: false },
                        Metros2: { type: "number", editable: false },
                        Peso: { type: "number", editable: false },
                        Seleccionado: { type: "bool", editable: false }
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
            serverSorting: false,
        },
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            var modelo = e.model;
        },
        navigatable: true,        
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "OrdenImportancia", title: _dictionary.PinturaCargaBackLogOrdenImportancia[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px", attributes: { style: "text-align:right;" } },
            { field: "SpoolJunta", title: _dictionary.PinturaCargaBackLogSpool[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "SistemaPintura", title: _dictionary.PinturaCargaBackLogSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "Color", title: _dictionary.PinturaCargaBackLogColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "Cuadrante", title: _dictionary.PinturaCargaBackLogQuadrant[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "Metros2", title: _dictionary.PinturaCargaBackLogM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "95px", attributes: { style: "text-align:right;" } },
            { field: "Peso", title: _dictionary.PinturaCargaBackLogPeso[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "95px", attributes: { style: "text-align:right;" } },
            { field: "Nombre", title: _dictionary.PinturaCargaBackLogProyecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "Seleccionado", title: _dictionary.PinturaCargaBackLogSeleccionado[$("#language").data("kendoDropDownList").value()], filterable: false, template: '<input type="checkbox" #= Seleccionado ? "checked=checked" : "" # class="chkbx"  ></input>  ', width: "100px", attributes: { style: "text-align:center;" }},
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCapturaBack }, title: _dictionary.tituloEliminar[$("#language").data("kendoDropDownList").value()], width: "50px", attributes: { style: "text-align:center;" } }
        ]
    });

    $("#grid[nombre='grid-backlog'] .k-grid-content").on("change", ":checkbox", function (e) {
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid[nombre='grid-backlog']").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
            if ($(this)[0].checked) {
                dataItem.Seleccionado = true;
            }
            else {
                if (dataItem.Status) {
                    dataItem.Seleccionado = true;
                    $(this)[0].checked = true;
                }
                else {
                    dataItem.Seleccionado = false;
                }
            }
            ImprimirAreaToneladaBackLog();
            $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource.sync();
        }
        else {
            if ($(this)[0].checked) {
                $(this)[0].checked = false;
            }
            else {
                $(this)[0].checked = true;
            }
        }
    });
    CustomisaGrid($("#grid[nombre='grid-backlog']"));

};

function eliminarCapturaBack(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
            visible: false,
            width: "400px",
            height: "auto",
            modal: true,
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");

        ventanaConfirm.content(_dictionary.CapturaAvanceIntAcabadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function (handler) {
            var dataSource = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource;

            if (dataItem.Accion === 1)
            {
                dataSource.remove(dataItem);
            }
            else {
                dataItem.Accion = 3;
            }               

            dataSource.sync();

            ImprimirAreaToneladaBackLog();
            ventanaConfirm.close();
        });
        $("#noButton").click(function () {
            ventanaConfirm.close();
        });
    }
}

function AjaxCargarCamposPredeterminadosBacklog() {

    loadingStart();
    $CargaCarroBackLog.CargaCarroBackLog.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        if (data.Cerrar == "No") {
            $('#chkCerrar').attr('checked', false);
        }
        else if (data.Cerrar == "Si") {
            $('#chkCerrar').attr('checked', true);
        }

        loadingStop();
    });
}

function AjaxCargarSpool(cargarSpoolsDespuesDeCargar, MedioTransporteCargaID) {
    loadingStart();

    if (MedioTransporteCargaID == 0 && $('#inputCarro').val() != "") MedioTransporteCargaID = $('#inputCarro').val();

    $CargaCarroBackLog.CargaCarroBackLog.read({ medioTransporteID: MedioTransporteCargaID, token: Cookies.get("token") }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;

        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }

        if (cargarSpoolsDespuesDeCargar) {
            opcionHabilitarView(true, "FieldSetView");
        }


        loadingStop();
    });
}
