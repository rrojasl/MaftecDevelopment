﻿function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
};




function CargarGrid() {


    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                     { TipoPrueba: "RT", Prioridad: "1", Cuadrante: "Cuadrante 1", Proyecto: "ETILENO XXI", Requisicion: "Requisicion 1", SpoolID: "003-4", Junta: "4", Agregar:true },
                     { TipoPrueba: "RT", Prioridad: "Prioridad 2", Cuadrante: "Cuadrante 2", Proyecto: "CROSSOVER PIPING", Requisicion: "Requisicion 2", SpoolID: "004-4", Junta: "5", Agregar: false },
                     { TipoPrueba: "VI", Prioridad: "Prioridad 3", Cuadrante: "Cuadrante 3", Proyecto: "DUPONT ALTAMIRA2", Requisicion: "Requisicion 3", SpoolID: "005-4", Junta: "6", Agregar: false },
                     { TipoPrueba: "Neumática", Prioridad: "Prioridad 4", Cuadrante: "Cuadrante 4", Proyecto: "CB LITORAL", Requisicion: "Requisicion 4", SpoolID: "006-6", Junta: "7", Agregar: false }
            ],
            schema: {
                model: {
                    fields: {
                        TipoPrueba: { type: "string", editable: false },
                        Prioridad: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        Requisicion: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        Junta: { type: "string", editable: false },
                        CodigoAplicar: { type: "string", editable: false },
                        observacion: { type: "string", editable: false },
                        Agregar:{ type: "bool", editable: true }
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
        editable:true,
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
            { field: "TipoPrueba", title: _dictionary.ServiciosTecnicosTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: true},
            { field: "Requisicion", title: _dictionary.ServiciosTecnicosRequisicion[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "SpoolID", title: "Spool - Junta", filterable: true },
             { field: "CodigoAplicar",title: "Codigo a aplicar", filterable: true},
             { field: "observacion", title: "Observacion", filterable: true },
             { field: "Agregar", title: _dictionary.ServiciosTecnicosAgregar[$("#language").data("kendoDropDownList").value()], filterable: true, template: '<input type="checkbox" #= Agregar ? "checked=checked" : "" # disabled="disabled" ></input>' }
            
            

        ]
    });
};

function AgregarCaptura() {
};

function eliminarCaptura() {
};