function RenderComboBoxProcesoSoldadura(container, options) {
    var dataItem;
    $('<input  data-text-field="TipoProcesoSoldaduraDesc" data-value-field="TipoProcesoSoldaduraID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaTipoProcesosSoldadura,
            template: "<i class=\"fa fa-#=data.TipoProcesoSoldaduraDesc.toLowerCase()#\"></i> #=data.TipoProcesoSoldaduraDesc#",

            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.ProcesoSoldadura = dataItem.TipoProcesoSoldaduraDesc;
                    options.model.ProcesoSoldaduraID = dataItem.TipoProcesoSoldaduraID;
                }
                else {
                    // options.model.Taller = ObtenerDescCorrectaTaller(options.model.ListaTaller, options.model.TallerID);
                    options.model.ProcesoSoldadura = "";
                    options.model.ProcesoSoldaduraID = null;
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


}


function RenderComboBoxCedulaTuboCalificado(container, options) {
    var dataItem;
    $('<input  data-text-field="CedulaTuboCalificadoDesc" data-value-field="CedulaTuboCalificadoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaCedulaTuboCalificado,
            template: "<i class=\"fa fa-#=data.CedulaTuboCalificadoDesc#\"></i> #=data.CedulaTuboCalificadoDesc#",

            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.CedulaTuboCalificado = dataItem.CedulaTuboCalificadoDesc;
                    options.model.CedulaTuboCalificadoID = dataItem.CedulaTuboCalificadoID;
                }
                else {
                    // options.model.Taller = ObtenerDescCorrectaTaller(options.model.ListaTaller, options.model.TallerID);
                    options.model.CedulaTuboCalificado = "";
                    options.model.CedulaTuboCalificadoID = null;
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


}


function RenderComboBoxTipoPrueba(container, options) {
    var dataItem;
    $('<input  data-text-field="TipoDePrueba" data-value-field="TipoDePruebaID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaTipoPrueba,
            template: "<i class=\"fa fa-#=data.TipoDePrueba.toLowerCase()#\"></i> #=data.TipoDePrueba#",

            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.TipoDePrueba = dataItem.TipoDePrueba;
                    options.model.TipoDePruebaID = dataItem.TipoPruebaID;
                }
                else {
                    // options.model.Taller = ObtenerDescCorrectaTaller(options.model.ListaTaller, options.model.TallerID);
                    options.model.TipoDePrueba = "";
                    options.model.TipoDePruebaID = null;
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


}

function RenderFechaInicio(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var fecha = kendo.toString(options.model.FechaFinCertificado, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));
    if (fecha == null) {
        $("#FechaArmado").data("kendoDatePicker").value('');
    }
    $('<input   data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDatePicker({
            change: function () {
                var value = this.value();
                options.model.FechaInicioCertificado = value;
            },
            max: new Date(ObtenerDato(fecha, 1), ObtenerDato(fecha, 2), ObtenerDato(fecha, 3))
        });
}

function RenderFechaFin(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var fecha = kendo.toString(options.model.FechaInicioCertificado, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));
    if (fecha == null) {
        $("#FechaArmado").data("kendoDatePicker").value('');
    }
    $('<input   data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDatePicker({
            change: function () {
                var value = this.value();
                options.model.FechaFinCertificado = value;
            },
            min: new Date(ObtenerDato(fecha, 1), ObtenerDato(fecha, 2), ObtenerDato(fecha, 3))
        });
}

function renderNoPasos(container, options) {
    $('<input   data-bind="value:' + options.field + '"/>')
    .appendTo(container)
        .kendoNumericTextBox({
            change: function () {
                if (options.model.PasosSoldadura >= 3 && options.model.EspesorMinimo >= 0.5) {
                    options.model.EspesorMaximo = '999999999999.0';
                    $("#grid").data("kendoGrid").dataSource.sync();
                    displayNotify("", "El espesor maximo es ilimitado", '0');
                }
            }
        });
}

function renderEmin(container, options) {
    $('<input   data-bind="value:' + options.field + '"/>')
    .appendTo(container)
        .kendoNumericTextBox({
            change: function () {
                if (options.model.PasosSoldadura >= 3 && options.model.EspesorMinimo >= 0.5) {
                    options.model.EspesorMaximo = '999999999999.0';
                    $("#grid").data("kendoGrid").dataSource.sync();
                    displayNotify("", "El espesor maximo es ilimitado", '0');
                }
            }
        });
}
