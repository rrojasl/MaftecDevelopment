function RenderComboBoxProveedor(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="Nombre" data-value-field="ProveedorID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaProveedor,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                
                if (dataItem != undefined) {
                    options.model.ProveedorID = dataItem.ProveedorID;
                    options.model.Proveedor = dataItem.Nombre;
                    options.model.ListaTurnoLaboral = [];
                    if(dataItem.Nombre != "")
                        options.model.ListaTurnoLaboral = obtenerTurnoLaboralProveedor(options.model.ListaTurnoLaboralTotal, dataItem.ProveedorID);

                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                    if (options.model.Accion == 4)
                        options.model.Accion = 2;
                    $("#grid").data("kendoGrid").dataSource.sync();

                }
                else
                {
                    options.model.ProveedorID = 0;
                    options.model.Proveedor = "";
                    options.model.ListaTurnoLaboral = [];

                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                }
                    //options.model.Proveedor = ObtenerDescCorrectaProveedor(options.model.ListaProveedor, options.model.ProveedorID);

            },
                dataBound: function () {
                    $(this.items()).each(function (index, item) {
                        var model =options.model.ListaProveedor[index];
                        $(item).attr("title", "" + replaceAll(model.Capacidad, '°', '\n') + "");
                    });
                }
        }
      );
    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
};

function obtenerTurnoLaboralProveedor(lista, ProveedorID) {
    var listaFinalTurnoLaboral = [];
    listaFinalTurnoLaboral[0] = { TurnoLaboralID: "", ProveedorID: "", Turno: "" };
    var cont = 1;
    listaFinalTurnoLaboral[0].TurnoLaboralID = 0;
    listaFinalTurnoLaboral[0].ProveedorID = 0;
    listaFinalTurnoLaboral[0].Turno = "";
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ProveedorID == ProveedorID) {
            listaFinalTurnoLaboral[cont] = lista[i];
            cont++;
        }
    }

    return listaFinalTurnoLaboral;
}


function RenderComboBoxHerramientaPrueba(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="HerramientadePrueba" data-value-field="HerramientadePruebaID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaHerramientaPrueba,
            template: "<i class=\"fa fa-#=data.HerramientadePrueba.toLowerCase()#\"></i> #=data.HerramientadePrueba#",
           
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                
                if (dataItem != undefined) {
                    options.model.HerramientadePruebaID = dataItem.HerramientadePruebaID;
                    options.model.HerramientadePrueba = dataItem.HerramientadePrueba;
                }
                else {
                    options.model.HerramientadePruebaID = 0;
                    options.model.HerramientadePrueba = "";
                }

            },
            dataBound: function () {
                $(this.items()).each(function (index, item) {
                    var model = options.model.ListaHerramientaPrueba[index];
                    $(item).attr("title", "" + model.DescHerramientaPrueba +' '+ model.Modelo + "");

                });
            }
        }
      );

    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
};



function RenderComboBoxTurnoLaboral(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="Turno" data-value-field="TurnoLaboralID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaTurnoLaboral,
            template: "<i class=\"fa fa-#=data.Turno.toLowerCase()#\"></i> #=data.Turno#",
            
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                
                if (dataItem != undefined) {
                    options.model.TurnoLaboralID = dataItem.TurnoLaboralID;
                    options.model.TurnoLaboral = dataItem.Turno;
                }
                else{
                    options.model.TurnoLaboralID = 0;
                    options.model.TurnoLaboral = "";
                }

            }
        }
      );

    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
};



function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false
}