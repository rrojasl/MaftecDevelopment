﻿
function changeLanguageCall() {
    SuscribirEventos();
    CargarGrid();
    setTimeout(AjaxObtenerProyectos(), 2000);
    
    
};

function CargarGrid() { 
    $("#grid").kendoGrid({
        edit: function (e) {
            this.closeCell();
        },
        autoBind: true,
        //dataSource: {
        //    data: '',
        //    schema: {
        //        model: {
        //            fields: {
        //                TipoProducto: { type: "string", editable: false },
        //                FamiliaAcero: { type: "string", editable: false },
        //                Acero: { type: "string", editable: false },
        //                FibeLine: { type: "string", editable: false },
        //                CantidadSpools: { type: "number", editable: false },
        //                Peso: { type: "number", editable: false },
        //                Area: { type: "number", editable: false },
        //                CantidadJuntas: { type: "number", editable: false },
        //                Peqs: { type: "number", editable: false }
        //            }
        //        }
        //    },
        //    pageSize: 20,
        //    serverPaging: false,
        //    serverFiltering: false,
        //    serverSorting: false
        //},
        dataSource: [
            { Etapa: "Ingenieria", Clave: "ING" },
            { Etapa: "Materiales", Clave: "MTL" },
            { Etapa: "Fabricacion", Clave: "FAB" },
            { Etapa: "Servicios Técnicos", Clave: "SVT" },
            { Etapa: "Embarque", Clave: "EMB" }
        ],
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
            { field: "Etapa", title: "Etapa", filterable: true },
            { field: "Clave", title: "Clave", filterable: true },
            { field: "CS", title: "CS", filterable: true },
            { field: "CSLOTEMP", title: "CS-LOTEMP", filterable: true },
            { field: "CSA3336", title: "CS-A333-6", filterable: true },
            { field: "CSA672", title: "CS-A672", filterable: true },
            { field: "Inoks", title: "Inoks", filterable: true },
            { field: "InoksSS3xx", title: "Inoks - SS-3xx", filterable: true },
            { field: "Alloy", title: "Alloy", filterable: true },
            { field: "AlloyP9", title: "Alloy-P9", filterable: true },
            { field: "AlloyP11", title: "Alloy-P11", filterable: true },
            { field: "AlloyP22", title: "Alloy-P22", filterable: true },
            { field: "CSPWHT", title: "CS-PWHT", filterable: true },
            { field: "InoksPWHT", title: "Inoks-PWHT", filterable: true },
            { field: "AlloyPWHT", title: "Alloy-PWHT", filterable: true }
        ] 
    });
    OcultarTodasColumnas();
     
}
  
function OcultarColumnas(columnasVisibles) {
    var grid = $("#grid").data("kendoGrid");
    var columnas = grid.columns;

    for (var i = 2; i < columnas.length; i++) {
        for (var j = 0; j < columnasVisibles.length; j++) {
            if (i == columnasVisibles[j]) {
                grid.hideColumn(i);
                break;
            }
        }
    }
}

function OcultarTodasColumnas(columnasVisibles) {
    var grid = $("#grid").data("kendoGrid");
    var columnas = grid.columns;
  
    for (var i = 2; i < columnas.length; i++) {
        grid.hideColumn(i);
    }

    if (columnasVisibles != undefined) { 
        MostrarColumnas(columnasVisibles);
    }
}

function MostrarColumnas(columnasVisibles) {
    var grid = $("#grid").data("kendoGrid");
    var columnas = grid.columns;
    
    for (var i = 2; i < columnas.length; i++) {
        for (var j = 0; j < columnasVisibles.length; j++) {
            if (i == columnasVisibles[j]) { 
                grid.showColumn(i);
                break;
            }
        }
    }
     
}