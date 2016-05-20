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
                    if (Boolean(options.model.PWHTRellenoId) != dataItem.PWHT) {
                        displayNotify("", "El PWHT, no coincide", "1");
                    }
                    if (ContieneGruposMaterialBase(dataItem.GrupoPMaterialBase1 + " " + dataItem.GrupoPMaterialBase2, options.model.GrupoMaterialBase1RellenoUID, options.model.GrupoMaterialBase1RellenoDID)) {
                        displayNotify("", "El Grupo P, no coincide", "1");
                    }
                    if (Boolean(options.model.PREHEATRellenoId) != dataItem.PREHEAT) {
                        displayNotify("", "El PREHEAT, no coincide", "1");
                    }
                    options.model.PWHTRaiz = dataItem.PWHT == true ? "SI" : "NO";
                    options.model.PWHTRaizId = dataItem.PWHT == true ? 1 : 0;
                    options.model.GrupoMaterialBase1RaizUID = dataItem.GrupoPMaterialBase1;
                    options.model.GrupoMaterialBase1RaizU = dataItem.GrupoPMaterialBase1Nombre;
                    options.model.GrupoMaterialBase1RaizDID = dataItem.GrupoPMaterialBase2;
                    options.model.GrupoMaterialBase1RaizD = dataItem.GrupoPMaterialBase2Nombre;
                    options.model.GrupoPRaiz = dataItem.GrupoPMaterialBase1Nombre + " " + dataItem.GrupoPMaterialBase2Nombre;
                    options.model.PREHEATRaiz = dataItem.PREHEAT == true ? "SI" : "NO";
                    options.model.PREHEATRaizId = dataItem.PREHEAT == true ? 1 : 0;
                    options.model.EspesorMaximoRaiz = dataItem.CodigoRaiz.trim() != "Gmaw STT" ? (parseFloat(dataItem.EspesorRaiz) <= 1.5 ? (parseFloat(dataItem.EspesorRaiz) * 2) : 8) : parseFloat(dataItem.EspesorRaiz) * 1.1;

                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    options.model.NombrePQRRaiz = "";
                    options.model.PQRRaizId = 0;
                    options.model.PWHTRaiz = "";
                    options.model.PWHTRaizId = 0;
                    options.model.GrupoMaterialBase1RaizUID = 0;
                    options.model.GrupoMaterialBase1RaizU = "";
                    options.model.GrupoMaterialBase1RaizDID = 0;
                    options.model.GrupoMaterialBase1RaizD = "";
                    options.model.PREHEATRaiz = "";
                    options.model.PREHEATRaizId = 0;
                    options.model.EspesorMaximoRaiz = 0;
                    $("#grid").data("kendoGrid").dataSource.sync();

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

                    if (Boolean(options.model.PWHTRaizId) != dataItem.PWHT) {
                        displayNotify("", "El PWHT, no coincide", "1");
                    }
                    if (ContieneGruposMaterialBase(dataItem.GrupoPMaterialBase1 + " " + dataItem.GrupoPMaterialBase2, options.model.GrupoMaterialBase1RaizUID, options.model.GrupoMaterialBase1RaizDID)) {
                        displayNotify("", "El Grupo P, no coincide", "1");
                    }
                    if (Boolean(options.model.PREHEATRaizId) != dataItem.PREHEAT) {
                        displayNotify("", "El PREHEAT, no coincide", "1");
                    }
                    options.model.PWHTRelleno = dataItem.PWHT == true ? "SI" : "NO";
                    options.model.PWHTRellenoId = dataItem.PWHT == true ? 1 : 0;
                    options.model.GrupoMaterialBase1RellenoUID = dataItem.GrupoPMaterialBase1;
                    options.model.GrupoMaterialBase1RellenoU = dataItem.GrupoPMaterialBase1Nombre;
                    options.model.GrupoMaterialBase1RellenoDID = dataItem.GrupoPMaterialBase2;
                    options.model.GrupoMaterialBase1RellenoD = dataItem.GrupoPMaterialBase2Nombre;
                    options.model.GrupoPRelleno = dataItem.GrupoPMaterialBase1Nombre +" "+ dataItem.GrupoPMaterialBase2Nombre;
                    options.model.PREHEATRelleno = dataItem.PREHEAT == true ? "SI" : "NO";
                    options.model.PREHEATRellenoId = dataItem.PREHEAT == true ? 1 : 0;
                    options.model.EspesorMaximoRelleno = parseFloat(dataItem.EspesorRelleno) <= 1.5 ? (parseFloat(dataItem.EspesorRelleno) * 2) : 8;
                    
                    $("#grid").data("kendoGrid").dataSource.sync();

                }
                else {
                    options.model.PWHTRelleno = "";
                    options.model.PWHTRellenoId = 0;
                    options.model.GrupoMaterialBase1RellenoUID = 0;
                    options.model.GrupoMaterialBase1RellenoU = "";
                    options.model.GrupoMaterialBase1RellenoDID = 0;
                    options.model.GrupoMaterialBase1RellenoD = "";
                    options.model.PREHEATRelleno = "";
                    options.model.PREHEATRellenoId =  0;
                    options.model.EspesorMaximoRelleno = 0;
                    $("#grid").data("kendoGrid").dataSource.sync();
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
function RendercomboBoxProyecto(container, options) {
    var dataItem;
    var valores;
    $('<input  data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaProyectos,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                if (dataItem != undefined) {
                    options.model.Proyecto = dataItem.Nombre;
                    options.model.ProyectoID = dataItem.ProyectoID;
                }
                else {

                }
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Proyecto = dataItem.Nombre;
                    options.model.ProyectoID = dataItem.ProyectoID;
                }
                else {

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
}


function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false;
}


function ContieneGruposMaterialBase(itemAcomparar,Base1, Base2) {
    
    var arrayCombinacion = [];
    
    arrayCombinacion[0] = Base1 + " " + Base2;
    arrayCombinacion[1] = Base2 + " " + Base1;

    for (var i = 0; i < arrayCombinacion.length; i++) {
        if (arrayCombinacion[i] == itemAcomparar) {
            return false;
        }
    }
    return true;
}