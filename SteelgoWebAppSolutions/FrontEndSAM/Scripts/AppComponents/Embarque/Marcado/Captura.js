﻿function changeLanguageCall() {
    CargarGrid();
    $("#Area").data("kendoComboBox").value("");
    $("#Cuadrante").data("kendoComboBox").value("");
    AjaxCargarArea();
    AjaxCampoPredeterminadoImpreso();
    document.title = _dictionary.lblMarcado[$("#language").data("kendoDropDownList").value()];
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
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        NumeroControl: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Traveler: { type: "int", editable: false },
                        Etiquetado: { type: "boolean", editable: false },
                        ConCinta: { type: "boolean", editable: false},
                        ColorCinta: { type: "string", editable: true }
                    }
                }
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        filterable: {
            extra: false
        },
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (!isEditable(fieldName, e.model)) {
                e.preventDefault();
            }
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        filterMenuInit: function (e) {
            if (e.field === "UnitPrice" || e.field === "UnitsInStock") {
                var filterMultiCheck = this.thead.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck")
                filterMultiCheck.container.empty();
                filterMultiCheck.checkSource.sort({ field: e.field, dir: "asc" });

                filterMultiCheck.checkSource.data(filterMultiCheck.checkSource.view().toJSON());
                filterMultiCheck.createCheckBoxes();
            }
        },
        columns: [
            { field: "NumeroControl", title: _dictionary.EmbarqueMarcadoCabeceraSpoolID[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Cuadrante", title: _dictionary.EmbarqueMarcadoCabeceraCuadrante[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Traveler", title: _dictionary.EmbarqueMarcadoCabeceraTraveler[$("#language").data("kendoDropDownList").value()], filterable: false, template: "<a>" + _dictionary.EmbarqueConsultaVer[$("#language").data("kendoDropDownList").value()] + "</a>" },
            { field: "Etiquetado", title: _dictionary.EmbarqueMarcadoCabeceraEtiquetado[$("#language").data("kendoDropDownList").value()], filterable: { multi: true, dataSource: [{ Etiquetado: true }, { Etiquetado: false }] }, template: "<input name='fullyPaid' class='chk-etiquetado' type='checkbox' data-bind='checked: Etiquetado' #= Etiquetado ? checked='checked' : '' #/>" },
            { field: "ConCinta", title: _dictionary.EmbarqueMarcadoCabeceraConCinta[$("#language").data("kendoDropDownList").value()], filterable: true, template: "<input name='fullyPaid' class='chk-conCinta' type='checkbox' data-bind='checked: ConCinta' #= ConCinta ? checked='checked' : '' #/>" },
            { field: "ColorCinta", title: _dictionary.EmbarqueMarcadoCabeceraCinta[$("#language").data("kendoDropDownList").value()], filterable: true, editor: comboBoxColor }
        ]
     });


     $("#grid .k-grid-content").on("change", "input.chk-conCinta", function (e) {
         var grid = $("#grid").data("kendoGrid"),
         dataItem = grid.dataItem($(e.target).closest("tr"));
         if ($(this)[0].checked) {
             dataItem.ConCinta = true;
         }
         else {
             dataItem.ConCinta = false;
             dataItem.ColorCintaID = 0;
             dataItem.ColorCinta = "";
         }
         $("#grid").data("kendoGrid").dataSource.sync();
     });

     $("#grid .k-grid-content").on("change", "input.chk-etiquetado", function (e) {
         var grid = $("#grid").data("kendoGrid"),
         dataItem = grid.dataItem($(e.target).closest("tr"));
         if ($(this)[0].checked) {
             dataItem.Etiquetado = true;
         }
         else {
             dataItem.Etiquetado = false;
         }
         $("#grid").data("kendoGrid").dataSource.sync();
     });
};


function isEditable(fieldName, model) {
    if (fieldName === "ColorCinta") {
        return model.ConCinta !== false;
    }
    return true;
}



