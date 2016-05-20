function RenderComboBoxProcesoSoldaduraRaiz(container, options) {
    loadingStart();
    var dataItem;
    $("#ProcesoSoldaduraRaizID").appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaProcesosSoldadura,
            template: "<i class=\"fa fa-#=data.Codigo#\"></i> #=data.Codigo#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.CodigoRaiz = dataItem.Codigo,
                options.model.ProcesoSoldaduraRaizID = dataItem.procesoSoldaduraRaizID
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.CodigoRaiz = dataItem.Codigo,
                    options.model.ProcesoSoldaduraRaizID = dataItem.procesoSoldaduraRaizID
                }
                else {
                    options.model.CodigoRaiz = "";
                    options.model.ProcesoSoldaduraRaizID = 0;
                }
            }
        });
    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });

    $("#ProcesoSoldaduraRaizID").blur(function (e) {
        if ($("#ProcesoSoldaduraRaizID").val() == undefined) {
            $("#ProcesoSoldaduraRaizID").value("");
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
                    options.model.CodigoRelleno = dataItem.Codigo;
                    options.model.ProcesoSoldaduraRellenoID = dataItem.ProcesoSoldaduraID;
                },
                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    if (dataItem != undefined) {
                        options.model.CodigoRelleno = dataItem.Codigo;
                        options.model.ProcesoSoldaduraRellenoID = dataItem.ProcesoSoldaduraID;
                        //AjaxActualizaSoldadoresRelleno(dataItem.ProcesoSoldaduraID, ItemSeleccionado.TipoJunta, ItemSeleccionado.Diametro, ItemSeleccionado.Espesor, ItemSeleccionado.Cedula);
                    }
                    else
                    {
                        options.model.CodigoRelleno = "";
                        options.model.ProcesoSoldaduraRellenoID = 0;
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

function RenderComboBoxMaterialesBase1(container, options) {
    loadingStart();
    var dataItem;
    $('<input data-text-field="GrupoP" id=' + options.model.uid + ' data-value-field="GrupoP" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                suggest: true,
                delay: 10,
                filter: "contains",
                autoBind: false,
                dataSource: options.model.ListaMaterialesBase,
                template: "<i class=\"fa fa-#=data.GrupoP#\"></i> #=data.GrupoP#",
                select: function (e) {
                    dataItem = this.dataItem(e.item.index());
                    options.model.GrupoPMaterialBase1 = dataItem.GrupoPID,
                    options.model.GrupoPMaterialBase1Nombre = dataItem.GrupoP
                },
                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    if (dataItem != undefined) {
                        options.model.GrupoPMaterialBase1 = dataItem.GrupoPID,
                        options.model.GrupoPMaterialBase1Nombre = dataItem.GrupoP
                    }
                    else {
                        options.model.GrupoPMaterialBase1 = 0;
                        options.model.GrupoPMaterialBase1Nombre = "";
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

function RenderComboBoxMaterialesBase2(container, options) {
    loadingStart();
    var dataItem;
    $('<input data-text-field="GrupoP" id=' + options.model.uid + ' data-value-field="GrupoP" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                suggest: true,
                delay: 10,
                filter: "contains",
                autoBind: false,
                dataSource: options.model.ListaMaterialesBase,
                template: "<i class=\"fa fa-#=data.GrupoP#\"></i> #=data.GrupoP#",
                select: function (e) {
                    dataItem = this.dataItem(e.item.index());
                    options.model.GrupoPMaterialBase2 = dataItem.GrupoPID,
                    options.model.GrupoPMaterialBase2Nombre = dataItem.GrupoP
                },
                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    if (dataItem != undefined) {
                        options.model.GrupoPMaterialBase2 = dataItem.GrupoPID,
                        options.model.GrupoPMaterialBase2Nombre = dataItem.GrupoP
                    }
                    else {
                        options.model.GrupoPMaterialBase2 = 0;
                        options.model.GrupoPMaterialBase2Nombre = "";
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

function RenderComboBoxCodigo(container, options) {
    loadingStart();
    var dataItem;
    $('<input data-text-field="Especificacion" id=' + options.model.uid + ' data-value-field="Especificacion" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                suggest: true,
                delay: 10,
                filter: "contains",
                autoBind: false,
                dataSource: options.model.ListaCodigos,
                template: "<i class=\"fa fa-#=data.Especificacion#\"></i> #=data.Especificacion#",
                select: function (e) {
                    dataItem = this.dataItem(e.item.index());
                    options.model.CodigoID = dataItem.CodigoAsmeID,
                    options.model.Codigo = dataItem.Especificacion
                },
                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    if (dataItem != undefined) {
                        options.model.CodigoID = dataItem.CodigoAsmeID,
                        options.model.Codigo = dataItem.Especificacion
                    }
                    else {
                        options.model.CodigoID = 0;
                        options.model.Codigo = "";
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