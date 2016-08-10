var requisicionID;
var ItemSeleccionado;
var comboDefectos;
var modeloRenglon;
var NumeroPlacasActual;

function changeLanguageCall() {
    CargarGrid();
    CargarGridNoRT();
    CargarGridPopUp();
    $('#grid').data('kendoGrid').dataSource.read();
    $('#gridPopUp').data('kendoGrid').dataSource.read();
    requisicionID = $("#RequisicionID").val();
    AjaxRequisicionDetalle(requisicionID);
    AjaxComboProveedor();
    document.title = _dictionary.CapturaReporteHeader[$("#language").data("kendoDropDownList").value()];
};




function CargarGrid() {
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

    $("#grid").kendoGrid({
        save: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (fieldName == "NumeroPlacas") {
                if (parseInt(e.values.NumeroPlacas) < parseInt(NumeroPlacasActual)) {
                    e.preventDefault();
                }
                else {
                    var longitudActual = e.model.NumeroPlacas == 0 ? 0 : e.model.listaDetallePruebas.length;



                    var longitudNuevos = parseInt(e.values.NumeroPlacas) - longitudActual;
                    if (isNaN(longitudNuevos)) {
                        e.preventDefault();
                    }
                    var ds = e.model.listaDetallePruebas;
                    detallePruebas = [];

                    if (e.model.NumeroPlacas == 0) {
                        ds[0].Accion = 1;
                        ds[0].RequisicionPruebaElementoID = e.model.RequisicionPruebaElementoID;
                        ds[0].PruebaElementoResultadoID = 0;
                        ds[0].Resultado = 1;
                        ds[0].Nombre = "Aceptado";

                        var aux = 0;
                        for (var i = 0 ; i < ds.length; i++) {
                            var res = ds[i].Ubicacion.split("-");
                            if (aux <= res[1]) {
                                aux = parseInt(res[1]);
                            }
                        }
                        ds[0].Ubicacion = aux + "-" + (aux + 1);
                        e.model.NumeroPlacas = longitudNuevos;

                        for (var index = 1; index < longitudNuevos; index++) {

                            detallePruebas[index] = {
                                Accion: "",
                                RequisicionPruebaElementoID: "",
                                PruebaElementoResultadoID: "",
                                Ubicacion: "",
                                Resultado: "",
                                Nombre: "",
                                ListaDefectos: "",
                                ListaDetalleDefectos: ""
                            }
                            detallePruebas[index].Accion = 1;
                            detallePruebas[index].RequisicionPruebaElementoID = e.model.RequisicionPruebaElementoID;
                            detallePruebas[index].PruebaElementoResultadoID = 0;
                            detallePruebas[index].Resultado = 1;
                            detallePruebas[index].Nombre = "Aceptado";

                            var aux = 0;
                            for (var i = 0 ; i < ds.length; i++) {
                                var res = ds[i].Ubicacion.split("-");
                                if (aux <= res[1]) {
                                    aux = parseInt(res[1]);
                                }
                            }
                            if (longitudNuevos == index + 1) {
                                detallePruebas[index].Ubicacion = aux + "-0";
                            }
                            else {
                                detallePruebas[index].Ubicacion = aux + "-" + (aux + 1);
                            }

                            ds.push(detallePruebas[index]);
                        }

                    }
                    else {
                        for (var index = 0; index < longitudNuevos; index++) {

                            detallePruebas[index] = {
                                Accion: "",
                                RequisicionPruebaElementoID: "",
                                PruebaElementoResultadoID: "",
                                Ubicacion: "",
                                Resultado: "",
                                Nombre: "",
                                ListaDefectos: "",
                                ListaDetalleDefectos: ""
                            }
                            detallePruebas[index].Accion = 1;
                            detallePruebas[index].RequisicionPruebaElementoID = e.model.RequisicionPruebaElementoID;
                            detallePruebas[index].PruebaElementoResultadoID = 0;
                            detallePruebas[index].Resultado = 1;
                            detallePruebas[index].Nombre = "Aceptado";

                            var aux = 0;
                            for (var i = 0 ; i < ds.length; i++) {
                                var res = ds[i].Ubicacion.split("-");
                                if (aux <= res[1]) {
                                    aux = parseInt(res[1]);
                                }
                            }
                            if (longitudNuevos == index + 1) {
                                detallePruebas[index].Ubicacion = aux + "-0" ;
                            }
                            else {
                                detallePruebas[index].Ubicacion = aux + "-" + (aux + 1);
                            }
                            

                            ds.push(detallePruebas[index]);
                        }
                    }
                }
            }
        },
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        SpoolJunta: { type: "string", editable: false },
                        NumeroPlacas: { type: "number", editable: true },
                        Densidad: { type: "number", editable: true },
                        Tamano: { type: "number", editable: true },
                        InformacionResultados: { type: "string", editable: true },
                    }
                }
            },
        },
        edit: function (e) {
            if ($('#botonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (fieldName == "NumeroPlacas") {
                NumeroPlacasActual = e.model.NumeroPlacas;
            }
        },
        filterable: getGridFilterableMaftec(),
        columns: [

            { field: "SpoolJunta", title: _dictionary.CapturaReportePruebasHeaderSpoolJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
             { field: "NumeroPlacas", title: _dictionary.CapturaReportePruebasHeaderNumeroPlacas[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "90px", editor: RenderNumeroPlacas, attributes: { style: "text-align:right;" } },
             { field: "Tamano", title: _dictionary.CapturaReportePruebasHeaderTamano[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "90px", editor: RenderTamano, format: "{0:n4}", attributes: { style: "text-align:right;" } },
             { field: "Densidad", title: _dictionary.CapturaReportePruebasHeaderDensidad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "100px", editor: RenderDensidad, format: "{0:n4}", attributes: { style: "text-align:right;" } },
            { field: "InformacionResultados", title: _dictionary.CapturaReportePruebasHeaderDetallePruebas[$("#language").data("kendoDropDownList").value()], filterable: false, width: "500px", editor: RenderGridDetalle, template: "Tiene:  Numero de placas" },

        ],
        
        editable: true,
        navigatable: true,
    });
    CustomisaGrid($("#grid"));
};


function isEditable(fieldName, model) {
    if (fieldName === "NumeroPlacas") {

        return model.NumeroPlacas !== 1;
    }
    return true;
}




function CargarGridNoRT() {
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

    $("#grid[nombre='noRT']").kendoGrid({
       
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        SpoolJunta: { type: "string", editable: false },
                        NumeroPlacas: { type: "number", editable: true },
                        Densidad: { type: "number", editable: true },
                        Tamano: { type: "number", editable: true },
                        InformacionResultados: { type: "string", editable: true },
                    }
                }
            },
        },
        edit: function (e) {
            if ($('#botonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (fieldName == "NumeroPlacas") {
                NumeroPlacasActual = e.model.NumeroPlacas;
            }
        },
        filterable: getGridFilterableMaftec(),
        columns: [

            { field: "SpoolJunta", title: _dictionary.CapturaReportePruebasHeaderSpoolJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
             { field: "Resultado", title: _dictionary.CapturaReportePruebasHeaderNumeroPlacas[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "Defecto", title: _dictionary.CapturaReportePruebasHeaderDetallePruebas[$("#language").data("kendoDropDownList").value()], filterable: false, width: "500px", editor: RenderGridNoRT, template: "Tiene:  Numero de placas" },

        ],
        
        editable: true,
        navigatable: true,
    });
    CustomisaGrid($("#grid[nombre='noRT']"));
};