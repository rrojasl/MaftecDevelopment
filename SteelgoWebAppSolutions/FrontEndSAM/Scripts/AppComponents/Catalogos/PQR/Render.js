function RenderComboBoxProcesoSoldaduraRaiz(container, options) {
    loadingStart();
    var dataItem;
    $('<input data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="Codigo" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                suggest: true,
                delay: 10,
                filter: "contains",
                autoBind: false,
                dataSource: options.model.ListaProcesosSoldadura,
                template: "<i class=\"fa fa-#=data.Codigo#\"></i> #=data.Codigo#",
                select: function (e) {
                    dataItem = this.dataItem(e.item.index());
                    options.model.Codigo = dataItem.Codigo,
                    options.model.ProcesoSoldaduraRaizID = dataItem.procesoSoldaduraRaizID
                },
                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    if (dataItem != undefined) {
                        options.model.Codigo = dataItem.Codigo,
                        options.model.ProcesoSoldaduraRaizID = dataItem.procesoSoldaduraRaizID
                    }
                    else {
                        options.model.Codigo = "";
                        options.model.ProcesoSoldaduraRaizID = "";
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
    loadingStop();
}

function ObtenerDescCorrectaSoldaduraRaiz(lista, procesoSoldaduraRaizID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ProcesoSoldaduraID == procesoSoldaduraRaizID)
            return lista[i].Codigo;
    }
    return "";
}


function RenderComboBoxProcesoSoldaduraRelleno(container, options) {
    loadingStart();
    var dataItem;
    $('<input data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="Codigo" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                suggest: true,
                delay: 10,
                filter: "contains",
                autoBind: false,
                dataSource: options.model.ListaProcesosSoldadura,
                template: "<i class=\"fa fa-#=data.Codigo#\"></i> #=data.Codigo#",
                select: function (e) {
                    dataItem = this.dataItem(e.item.index());
                    options.model.Codigo = dataItem.Codigo;
                    options.model.ProcesoSoldaduraRellenoID = dataItem.ProcesoSoldaduraID;
                },
                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    if (dataItem != undefined) {
                        options.model.Codigo = dataItem.Codigo;
                        options.model.ProcesoSoldaduraRellenoID = dataItem.ProcesoSoldaduraID;
                        //AjaxActualizaSoldadoresRelleno(dataItem.ProcesoSoldaduraID, ItemSeleccionado.TipoJunta, ItemSeleccionado.Diametro, ItemSeleccionado.Espesor, ItemSeleccionado.Cedula);
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
    loadingStop();
}

function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false;
}