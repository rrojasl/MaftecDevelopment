﻿function changeLanguageCall() {
    CargarGrid();
    $("#Area").data("kendoComboBox").value("");
    $("#Cuadrante").data("kendoComboBox").value("");
    AjaxCargarArea();
};


function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "string", editable: false },
                        Paso: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Traveler: { type: "int", editable: false },
                        Detalle: { type: "int", editable: false }
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
        columns: [
            { field: "SpoolID", title: _dictionary.EmbarqueConsultaSpoolID[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Paso", title: _dictionary.EmbarqueConsultaPaso[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Cuadrante", title: _dictionary.EmbarqueConsultaCuadrante[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Traveler", title: _dictionary.EmbarqueConsultaTraveler[$("#language").data("kendoDropDownList").value()], filterable: true, template: "<a>" + _dictionary.EmbarqueConsultaVer[$("#language").data("kendoDropDownList").value()] + "</a>" },
            { field: "Detalle", title: _dictionary.EmbarqueConsultaDetalle[$("#language").data("kendoDropDownList").value()], filterable: true, template: "<a>"+_dictionary.EmbarqueConsultaLinkShop[$("#language").data("kendoDropDownList").value()]+"</a>" }
        ]
    });
};