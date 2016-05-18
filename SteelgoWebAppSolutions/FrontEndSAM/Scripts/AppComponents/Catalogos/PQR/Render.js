function RenderComboBoxProcesoSoldaduraRaiz(container, options) {
    loadingStart();
    var dataItem;
    $('<input data-text-field="CodigoRaiz" id=' + options.model.uid + ' data-value-field="CodigoRaiz" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                suggest: true,
                delay: 10,
                filter: "contains",
                autoBind: false,
                dataSource: options.model.ListadoProcesoSoldadura,
                template: "<i class=\"fa fa-#=data.CodigoRaiz#\"></i> #=data.CodigoRaiz#",
                select: function (e) {
                    dataItem = this.dataItem(e.item.index());
                    options.model.procesoSoldaduraRaiz = dataItem.Codigo,
                    options.model.procesoSoldaduraRaizID = dataItem.ProcesoSoldaduraID
                },
                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    if (dataItem != undefined) {
                        options.model.procesoSoldaduraRaiz = dataItem.Codigo
                        options.model.procesoSoldaduraRaizID = dataItem.ProcesoSoldaduraID
                    }
                    else {
                        options.model.procesoSoldaduraRaiz = "";
                        options.model.procesoSoldaduraRaizID = "";
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
    $('<input data-text-field="CodigoRelleno" id=' + options.model.uid + ' data-value-field="CodigoRelleno" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                suggest: true,
                delay: 10,
                filter: "contains",
                autoBind: false,
                dataSource: options.model.ListadoProcesoSoldadura,
                template: "<i class=\"fa fa-#=data.CodigoRelleno#\"></i> #=data.CodigoRelleno#",
                select: function (e) {
                    dataItem = this.dataItem(e.item.index());
                    options.model.procesoSoldaduraRelleno = dataItem.Codigo;
                    options.model.procesoSoldaduraRellenoID = dataItem.ProcesoSoldaduraID;
                },
                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    if (dataItem != undefined) {
                        options.model.procesoSoldaduraRelleno = dataItem.Codigo;
                        options.model.procesoSoldaduraRellenoID = dataItem.ProcesoSoldaduraID;
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