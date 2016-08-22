IniciarCapturaPinturaCarga();
function IniciarCapturaPinturaCarga() {
    SuscribirEventos();
    setTimeout(function () { AjaxCargarCuadrante(0); }, 2400);   
}

function changeLanguageCall() {
    AjaxObtenerListaProyectos();
    CargarGrid();
    CargarGridBacklog();
    AjaxCargarCamposPredeterminados(); 
    document.title = _dictionary.PinturaHeaderCargaCarro[$("#language").data("kendoDropDownList").value()];
}
 
function IniciarBacklog() {
    CargarGridBacklog();   
}

function CargarGrid() {
    //var options = {
    //    cell_height: 80,
    //    vertical_margin: 10
    //};

    //$('.grid-stack').gridstack(options);

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
                        ColorPintura: { type: "string", editable: false },
                        CuadranteMedioTransporte: { type: "string", editable: false },
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
            serverSorting: false,
            aggregate: [
                {field: "Area", aggregate: "sum"},
                {field: "Peso", aggregate: "sum"}
            ]
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
            { field: "SpoolJunta", title: _dictionary.PinturaCargaSpool[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px"},
            { field: "SistemaPintura", title: _dictionary.PinturaCargaBackLogSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px"},
            { field: "ColorPintura", title: _dictionary.PinturaCargaBackLogColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px"},
            { field: "CuadranteMedioTransporte", title: _dictionary.PinturaCargaBackLogQuadrant[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px", footerTemplate: "<div style='text-align:right; width:120px;'></div>" },
            { field: "Area", type: 'number', title: _dictionary.PinturaCargaBackLogM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", format: "{0:n2}", attributes: { style: "text-align:right;" }, aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>" },
            { field: "Peso", type: 'number', title: _dictionary.PinturaCargaBackLogPeso[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", format: "{0:n2}", attributes: { style: "text-align:right;" }, aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>" },
            { command: { text: _dictionary.PinturaDescargaDescarga[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: _dictionary.tituloDescargar[$("#language").data("kendoDropDownList").value()], width: "50px", attributes: { style: "text-align:center;" } }
        ]
    });
    CustomisaGrid($("#grid"));

}


function eliminarCaptura(e) {
    e.preventDefault(); 
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
         
        if (dataItem.Accion != 1) {
            windowDownload = $("#windowDownload").kendoWindow({
                iframe: true,
                title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                },
                actions: [
                    "Close"
                ],
            }).data("kendoWindow");

            $("#inputCuadrantePopup").data("kendoComboBox").value(dataItem.CuadranteID);
            $("#inputCuadrantePopup").data("kendoComboBox").trigger("change");

            windowDownload.open().center();

            $("#btnDescargar").click(function (handler) {
                var dataSource = $("#grid").data("kendoGrid").dataSource;
                if ($("#inputCuadrantePopup").data("kendoComboBox").value() != "") {
                    if (dataItem.Accion === 1)
                    { dataSource.remove(dataItem); }
                    else {
                        dataItem.CuadranteID = $("#inputCuadrantePopup").data("kendoComboBox").value();
                        dataItem.Accion = 3;
                    }

                    dataSource.sync();

                    ImprimirAreaTonelada();
                    windowDownload.close();
                } else {
                    displayNotify("PinturaCargaCuadrante", '', '1');
                }
            });

            $("#btnCerrarPopup").click(function () {
                windowDownload.close();
            });
        }
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
                        CuadranteMedioTransporte: { type: "string", editable: false },
                        NombreMedioTransporte: { type: "string", editable: false },
                        Metros2: { type: "number", editable: false },
                        Peso: { type: "number", editable: false },
                        Seleccionado: { type: "boolean", editable: false }
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
            aggregate: [
                {field: "Metros2", aggregate: "sum"},
                {field: "Peso", aggregate: "sum"}
            ]
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
            { field: "OrdenImportancia", title: _dictionary.PinturaCargaBackLogOrdenImportancia[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "88px", attributes: { style: "text-align:right;" } },
            { field: "SpoolJunta", title: _dictionary.PinturaCargaBackLogSpool[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "SistemaPintura", title: _dictionary.PinturaCargaBackLogSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "135px" },
            { field: "Color", title: _dictionary.PinturaCargaBackLogColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "CuadranteMedioTransporte", title: _dictionary.PinturaCargaBackLogQuadrant[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "Metros2", title: _dictionary.PinturaCargaBackLogM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", width: "95px", attributes: { style: "text-align:right;" }, aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>" },
            { field: "Peso", title: _dictionary.PinturaCargaBackLogPeso[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", width: "95px", attributes: { style: "text-align:right;" }, aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>" },
            { field: "NombreMedioTransporte", title: _dictionary.PinturaCargaBackLogCarro[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "Seleccionado", title: _dictionary.PinturaCargaBackLogSeleccionado[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.CheckBoxFilterPQRContiene[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.CheckBoxFilterPQRNoContiene[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Seleccionado: true }, { Seleccionado: false }]
            }, template: '<input type="checkbox" #= Seleccionado ? "checked=checked" : "" # class="chkbx"  ></input>  ', width: "130px", attributes: { style: "text-align:center;" } },
            { command: { text: _dictionary.PinturaDescargaDescarga[$("#language").data("kendoDropDownList").value()], click: eliminarCapturaBack }, title: _dictionary.tituloDescargarBack[$("#language").data("kendoDropDownList").value()], width: "70px", attributes: { style: "text-align:center;" } }
        ]
    });

    $("#grid[nombre='grid-backlog'] .k-grid-content").on("change", ":checkbox", function (e) {
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid[nombre='grid-backlog']").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
            
            if (!dataItem.Status) {
                if($(this)[0].checked){
                    dataItem.Seleccionado = true;
                }else{
                    dataItem.Seleccionado = false;
                }                
            } else {
                $(this)[0].checked = true;
            }

            ImprimirAreaToneladaBackLog();
        }
    });
    CustomisaGrid($("#grid[nombre='grid-backlog']"));

};

function eliminarCapturaBack(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        if (dataItem.Accion != 1 && $("#inputCarroBacklog").data("kendoComboBox").value() != "0" && $("#inputCarroBacklog").data("kendoComboBox").value() != "") {
            windowDownload = $("#windowDownload").kendoWindow({
                iframe: true,
                title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                },
                actions: [
                    "Close"
                ],
            }).data("kendoWindow");

            $("#inputCuadrantePopup").data("kendoComboBox").value(dataItem.CuadranteID);
            $("#inputCuadrantePopup").data("kendoComboBox").trigger("change");

            windowDownload.open().center();

            $("#btnDescargar").click(function (handler) {
                var dataSource = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource;
                if ($("#inputCuadrantePopup").data("kendoComboBox").value() != "") {
                    if (dataItem.Accion === 1)
                    {
                        dataSource.remove(dataItem);
                    }
                    else {
                        dataItem.CuadranteID = $("#inputCuadrantePopup").data("kendoComboBox").value();
                        dataItem.Accion = 3;
                    }

                    windowDownload.close();
                    ImprimirAreaToneladaBackLog();
                    dataSource.sync();

                } else {
                    displayNotify("PinturaCargaCuadrante", '', '1');
                }
                
            });

            $("#btnCerrarPopup").click(function () {
                windowDownload.close();
            });
        }
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

function FiltroMostrar(mostrar) {
    var ds = $("#grid").data("kendoGrid").dataSource;

    if (mostrar == 0) {
        var curr_filters = ds.filter().filters;
        if (curr_filters[0].filters != undefined)
            ds.filter(curr_filters[0].filters[0])
        else
            ds.filter(curr_filters[0])
        ds.sync();

        if(ds._data.length>0){
            ImprimirAreaTonelada();
        } else {
            $("#labelM2").text("");
            $("#labelToneladas").text("");
        }
        
    }
    else {

        var curr_filters = ds.filter().filters;
        ds.filter(curr_filters[0])
        ds.sync();
        var filters = ds.filter();
        filters.logic = "or"

        filters.filters.push({ field: "Accion", operator: "eq", value: 2 });
        ds.sync();

        ImprimirAreaTonelada();
    }
}

function FiltroMostrarBack(mostrar) {
    var ds = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource;

    if (mostrar == 0) {
        var curr_filters = ds.filter().filters;
        if (curr_filters[0].filters != undefined)
            ds.filter(curr_filters[0].filters[0])
        else
            ds.filter(curr_filters[0])
        ds.sync();

        ImprimirAreaToneladaBackLog();
    }
    else {

        var curr_filters = ds.filter().filters;
        ds.filter(curr_filters[0])
        ds.sync();
        var filters = ds.filter();
        filters.logic = "or"

        filters.filters.push({ field: "Accion", operator: "eq", value: 2 });
        ds.sync();

        ImprimirAreaToneladaBackLog();
    }
}