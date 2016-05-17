function RenderComboBoxPQRRaiz(container, options) {
    loadingStart();
    var dataItem;
    $('<input data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="PQRID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.listadoRaizPQR,
            template: "<i class=\"fa fa-#=data.Nombre#\"></i> #=data.Nombre#",
            select: function (e) {

                dataItem = this.dataItem(e.item.index());
                options.model.NombrePQRRaiz = dataItem.Nombre;
                options.model.PQRRaizId = dataItem.PQRID;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.NombrePQRRaiz = dataItem.Nombre;
                    options.model.PQRRaizId = dataItem.PQRID;

                }
                else {
                    //options.model.NumeroColada = ObtenerDescCorrectaColada(ItemSeleccionado.ListaColada, options.model.ColadaID);

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



function RenderComboBoxPQRRelleno(container, options) {
    loadingStart();
    var dataItem;
    $('<input data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="PQRID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.listadoRellenoPQR,
            template: "<i class=\"fa fa-#=data.Nombre#\"></i> #=data.Nombre#",
            select: function (e) {

                dataItem = this.dataItem(e.item.index());
                options.model.NombrePQRRelleno = dataItem.Nombre;
                options.model.PQRRellenoId = dataItem.PQRID;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.NombrePQRRelleno = dataItem.Nombre;
                    options.model.PQRRellenoId = dataItem.PQRID;

                }
                else {
                    //options.model.NumeroColada = ObtenerDescCorrectaColada(ItemSeleccionado.ListaColada, options.model.ColadaID);

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

//function RenderComboBoxGrupoP(container, options) {
//    loadingStart();
//    var dataItem;
//    $('<input data-text-field="GrupoMaterialBase1" id=' + options.model.uid + ' data-value-field="GrupoMaterialBase1" data-bind="value:' + options.field + '"/>')
//        .appendTo(container)
//        .kendoComboBox({
//            suggest: true,
//            delay: 10,
//            filter: "contains",
//            autoBind: false,
//            dataSource: options.model.listadoGrupoP,
//            template: "<i class=\"fa fa-#=data.GrupoMaterialBase1#\"></i> #=data.GrupoMaterialBase1#",
//            select: function (e) {
//                dataItem = this.dataItem(e.item.index());
//                options.model.GrupoP = dataItem.GrupoMaterialBase1;
//                options.model.GrupoPId = dataItem.GrupoMaterialBase1PID;
//            },
//            change: function (e) {
//                dataItem = this.dataItem(e.sender.selectedIndex);
//                if (dataItem != undefined) {
//                    options.model.GrupoP = dataItem.GrupoMaterialBase1;
//                    options.model.GrupoPId = dataItem.GrupoMaterialBase1PID;
//                }
//                else {
//                    //options.model.NumeroColada = ObtenerDescCorrectaColada(ItemSeleccionado.ListaColada, options.model.ColadaID);
//                }
//            }
//        }
//        );
//    $(".k-combobox").parent().on('mouseleave', function (send) {
//        var e = $.Event("keydown", { keyCode: 27 });
//        var item = $(this).find(".k-combobox")[0];
//        if (item != undefined) {
//            if (!tieneClase(item)) {
//                $(container).trigger(e);
//            }
//        }
//    });
//    loadingStop();
//}



function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false;
}