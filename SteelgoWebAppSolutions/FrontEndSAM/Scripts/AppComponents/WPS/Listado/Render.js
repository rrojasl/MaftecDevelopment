﻿function RenderComboBoxPQRRaiz(container, options) {
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
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.Nombre != "") {
                    options.model.NombrePQRRaiz = dataItem.Nombre;
                    options.model.PQRRaizId = dataItem.PQRID;
                    var cadenaError = "";
                    if (Boolean(options.model.PWHTRellenoId) != dataItem.PWHT) {
                        cadenaError += "\n " + _dictionary.WPSMensajeErrorPWHT[$("#language").data("kendoDropDownList").value()];
                    }
                    if (ContieneGruposMaterialBase(dataItem.GrupoPMaterialBase1,dataItem.GrupoPMaterialBase2, options.model.GrupoMaterialBase1RellenoUID, options.model.GrupoMaterialBase1RellenoDID)) {
                        cadenaError += "\n " + _dictionary.WPSMensajeErrorGrupoP[$("#language").data("kendoDropDownList").value()];
                    }
                    if (options.model.PREHEATRellenoId != dataItem.PREHEAT) {
                        cadenaError += "\n " + _dictionary.WPSMensajeErrorPREHEAT[$("#language").data("kendoDropDownList").value()];
                    }
                    if (cadenaError != "") {
                        displayNotify("", cadenaError, "1");
                    }
                        

                    options.model.PWHTRaiz = dataItem.PWHT ;
                    options.model.PWHTRaizId = dataItem.PWHT == true ? 1 : 0;
                    options.model.GrupoMaterialBase1RaizUID = dataItem.GrupoPMaterialBase1;
                    options.model.GrupoMaterialBase1RaizU = dataItem.GrupoPMaterialBase1Nombre;
                    options.model.GrupoMaterialBase1RaizDID = dataItem.GrupoPMaterialBase2;
                    options.model.GrupoMaterialBase1RaizD = dataItem.GrupoPMaterialBase2Nombre;
                    options.model.GrupoPRaiz = dataItem.GrupoPMaterialBase1Nombre + " " + dataItem.GrupoPMaterialBase2Nombre;
                    options.model.PREHEATRaiz = dataItem.PREHEAT == 1? true: false;
                    options.model.PREHEATRaizId = dataItem.PREHEAT;
                    var rootMax = ObtenerEspesorCorrecto((parseFloat(dataItem.EspesorRaiz) + parseFloat(dataItem.EspesorRelleno)), dataItem.PREHEAT, dataItem.CodigoRaiz.trim(), true);
                    var fillMax = ObtenerEspesorCorrecto((parseFloat(options.model.RellenoEspesorRaiz) + parseFloat(options.model.RellenoEspesorRelleno)), dataItem.PREHEAT, dataItem.CodigoRaiz.trim(), false);

                    options.model.EspesorMaximo = rootMax[0].EspesorMaximo > fillMax[0].EspesorMaximo ? rootMax[0].EspesorMaximo : fillMax[0].EspesorMaximo;
                    options.model.EspesorMinimo = rootMax[0].EspesorMinimo < fillMax[0].EspesorMinimo ? rootMax[0].EspesorMinimo : fillMax[0].EspesorMinimo;
                    options.model.RaizEspesorRaiz = parseFloat(dataItem.EspesorRaiz);
                    options.model.RaizEspesorRelleno = parseFloat(dataItem.EspesorRelleno);
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    options.model.NombrePQRRaiz = "";
                    options.model.PWHTRaiz = false;
                    options.model.GrupoMaterialBase1RaizU = "";
                    options.model.GrupoMaterialBase1RaizD = "";
                    options.model.PREHEATRaiz = false;
                    options.model.EspesorMaximo = 0;
                    options.model.EspesorMinimo = 0;
                    options.model.RaizEspesorRaiz = 0;
                    options.model.RaizEspesorRelleno = 0;
                    try {
                        $("#grid").data("kendoGrid").dataSource.sync();
                    }
                    catch (e) {
                    }

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
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.Nombre != "") {
                    options.model.NombrePQRRelleno = dataItem.Nombre;
                    options.model.PQRRellenoId = dataItem.PQRID;
                    var cadenaError = "";
                    if (Boolean(options.model.PWHTRaizId) != dataItem.PWHT) {
                        cadenaError += "\n " + _dictionary.WPSMensajeErrorPWHT[$("#language").data("kendoDropDownList").value()];
                    }
                    if (ContieneGruposMaterialBase(dataItem.GrupoPMaterialBase1,dataItem.GrupoPMaterialBase2, options.model.GrupoMaterialBase1RaizUID, options.model.GrupoMaterialBase1RaizDID)) {
                        cadenaError += "\n " + _dictionary.WPSMensajeErrorGrupoP[$("#language").data("kendoDropDownList").value()];
                    }
                    if (options.model.PREHEATRaizId != dataItem.PREHEAT) {
                        cadenaError += "\n " + _dictionary.WPSMensajeErrorPREHEAT[$("#language").data("kendoDropDownList").value()];
                    }
                    if (cadenaError != "") {
                        displayNotify("", cadenaError, "1");
                    }
                    options.model.PWHTRelleno = dataItem.PWHT;
                    options.model.PWHTRellenoId = dataItem.PWHT == true ? 1 : 0;
                    options.model.GrupoMaterialBase1RellenoUID = dataItem.GrupoPMaterialBase1;
                    options.model.GrupoMaterialBase1RellenoU = dataItem.GrupoPMaterialBase1Nombre;
                    options.model.GrupoMaterialBase1RellenoDID = dataItem.GrupoPMaterialBase2;
                    options.model.GrupoMaterialBase1RellenoD = dataItem.GrupoPMaterialBase2Nombre;
                    options.model.GrupoPRelleno = dataItem.GrupoPMaterialBase1Nombre + " " + dataItem.GrupoPMaterialBase2Nombre;
                    options.model.PREHEATRelleno = dataItem.PREHEAT == 1 ? true: false;
                    options.model.P1REHEATRellenoId = dataItem.PREHEAT;
                    var rootMax = ObtenerEspesorCorrecto((parseFloat(dataItem.EspesorRaiz) + parseFloat(dataItem.EspesorRelleno)), dataItem.PREHEAT, dataItem.CodigoRaiz.trim(), true);
                    var fillMax = ObtenerEspesorCorrecto((parseFloat(options.model.RaizEspesorRaiz) + parseFloat(options.model.RaizEspesorRelleno)), dataItem.PREHEAT, dataItem.CodigoRaiz.trim(), false);

                    options.model.EspesorMaximo = rootMax[0].EspesorMaximo > fillMax[0].EspesorMaximo ? rootMax[0].EspesorMaximo : fillMax[0].EspesorMaximo;
                    options.model.EspesorMinimo = rootMax[0].EspesorMinimo < fillMax[0].EspesorMinimo ? rootMax[0].EspesorMinimo : fillMax[0].EspesorMinimo;
                    options.model.RellenoEspesorRaiz = parseFloat(dataItem.EspesorRaiz);
                    options.model.RellenoEspesorRelleno = parseFloat(dataItem.EspesorRelleno);
                    $("#grid").data("kendoGrid").dataSource.sync();

                }
                else {
                    options.model.NombrePQRRelleno = "";
                    options.model.GrupoMaterialBase1RellenoU = "";
                    options.model.GrupoMaterialBase1RellenoD = "";
                    options.model.PWHTRelleno = false;
                    options.model.PREHEATRelleno = false;
                    options.model.EspesorMaximo = 0;
                    options.model.EspesorMinimo = 0;
                    options.model.RellenoEspesorRaiz = 0;
                    options.model.RellenoEspesorRelleno = 0;
                    try{
                        //$("#grid").data("kendoGrid").dataSource.sync();   
                    }
                    catch (e) {
                    }
                    
                }
             
            }
            
        }
        );
    
    loadingStop();

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


function ContieneGruposMaterialBase(Base1Uno, Base2Uno, Base1Dos, Base2Dos) {

    var arrayCombinacion = [];

    arrayCombinacion[0] = Base1Dos + " " + Base2Dos;
    arrayCombinacion[1] = Base2Dos + " " + Base1Dos;
    arrayCombinacion[2] = Base2Dos + " " + Base2Dos;
    arrayCombinacion[3] = Base1Dos + " " + Base1Dos;

    var arrayCombinacionDos = [];

    arrayCombinacionDos[0] = Base1Uno + " " + Base2Uno;
    arrayCombinacionDos[1] = Base2Uno + " " + Base1Uno;
    arrayCombinacionDos[2] = Base2Uno + " " + Base2Uno;
    arrayCombinacionDos[3] = Base1Uno + " " + Base1Uno;

    for (var i = 0; i < arrayCombinacion.length; i++) {
        for (var j = 0; j < arrayCombinacionDos.length; j++) {
            if (arrayCombinacion[i] == arrayCombinacionDos[j]) {
                return false;
            }
        }
    }
    return true;
}
