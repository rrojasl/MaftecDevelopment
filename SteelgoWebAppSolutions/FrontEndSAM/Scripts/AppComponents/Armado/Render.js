﻿function RenderComboBoxTaller(container, options) {
    var dataItem;
    $('<input  data-text-field="Nombre" data-value-field="TallerID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaTaller,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                if (dataItem != undefined) {
                    options.model.Taller = dataItem.Nombre;
                    options.model.TallerID = dataItem.TallerID;
                }

            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Taller = dataItem.Nombre;
                    options.model.TallerID = dataItem.TallerID;
                }
                else {
                    // options.model.Taller = ObtenerDescCorrectaTaller(options.model.ListaTaller, options.model.TallerID);
                    options.model.Taller = "";
                    options.model.TallerID = "";
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

function ObtenerDescCorrectaTaller(lista, TallerID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].TallerID == TallerID)
            return lista[i].Nombre;
    }
    return "";
}

function RenderDatePicker(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input   data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDatePicker({
            max: new Date(),
            change: function () {
                var value = this.value();
                options.model.FechaArmado = value;
            }
        }
        );

}

function RenderComboBoxTubero(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input  data-text-field="Codigo" data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaTubero,
            template: "<i class=\"fa fa-#=data.Codigo.toLowerCase()#\"></i> #=data.Codigo#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                if (dataItem != undefined) {
                    options.model.Tubero = dataItem.Codigo;
                    options.model.TuberoID = dataItem.ObreroID;
                }
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Tubero = dataItem.Codigo;
                    options.model.TuberoID = dataItem.ObreroID;
                }
                else {
                    //    options.model.Tubero = ObtenerDescCorrectaTubero(options.model.ListaTubero, options.model.TuberoID);
                    options.model.Tubero = "";
                    options.model.TuberoID = "";
                }
                //    this.data('kendoComboBox').select(options.model.TuberoID)
                //$("#MyComboBox").data("kendoComboBox").value(id);
                // $("#grid").data("kendoGrid").dataSource.sync();
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

function ObtenerDescCorrectaTubero(lista, TuberoID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ObreroID == TuberoID)
            return lista[i].Codigo;
    }
    return "";
}
function RenderComboBoxNumeroUnico1(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;
    var textAnterior;
    $('<input  data-text-field="Clave" data-value-field="NumeroUnicoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaNumerosUnicos1,
            template: "<i class=\"fa fa-#=data.Clave#\"></i> #=data.Clave#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                //options.model.NumeroUnico1 = String(dataItem.Clave);
                //options.model.NumeroUnico1ID = dataItem.NumeroUnicoID;
                textAnterior = e.sender._prev;
            }
            ,
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.Etiqueta!="") {
                    //options.model.NumeroUnico1 = String(dataItem.Clave);
                    //options.model.NumeroUnico1ID = dataItem.NumeroUnicoID;
                    AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    options.model.NumeroUnico1 = "";
                    options.model.NumeroUnico1ID = null;
                    $("#grid").data("kendoGrid").dataSource.sync();
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

function RenderComboBoxNumeroUnico2(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;
    var textAnterior;
    $('<input  data-text-field="Clave" data-value-field="NumeroUnicoID" data-bind="value:' + options.field + '"/>')
         .appendTo(container)
         .kendoComboBox({
             suggest: true,
             delay: 10,
             filter: "contains",
             autoBind: false,
             dataSource: options.model.ListaNumerosUnicos2,
             template: "<i class=\"fa fa-#=data.Clave#\"></i> #=data.Clave#",
             select: function (e) {
                 dataItem = this.dataItem(e.item.index());
                 //options.model.NumeroUnico2 = String(dataItem.Clave);
                 //options.model.NumeroUnico2ID = dataItem.NumeroUnicoID;
                 textAnterior = e.sender._prev;
             },
             change: function (e) {
                 dataItem = this.dataItem(e.sender.selectedIndex);
                 if (dataItem != undefined && dataItem.Etiqueta != "") {
                     //options.model.NumeroUnico2 = String(dataItem.Clave);
                     //options.model.NumeroUnico2ID = dataItem.NumeroUnicoID;
                     AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                     $("#grid").data("kendoGrid").dataSource.sync();
                 }
                 else {
                     options.model.NumeroUnico2 = "";
                     options.model.NumeroUnico2ID = null;
                     $("#grid").data("kendoGrid").dataSource.sync();
                 }

             },
         }).closest('.k-widget').keydown(function (e) {
             //if (e.keyCode == 13) {
             //    var event = $.Event("keydown", { keyCode: 9 });
             //    dataItem = $(e.target)[0].textContent;
             //    if (dataItem == "") {
             //        $(e.target).trigger(event);
             //    }
             //}
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

function grid_saveChanges(e) {
    if (!confirm("Are you sure you want to save all changes?")) {
        e.preventDefault();
    }
}

function RenderGridDetalle(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta

    


    $('<div name=' + options.model.SpoolID + '' + options.model.Junta + '/>')
  .appendTo(container)
  .kendoGrid({

      dataSource: {
          // batch: true,
          data: options.model.ListaDetalleTrabajoAdicional,
          schema: {
              model: {
                  fields: {

                      Accion: { type: "int", editable: false },
                      ArmadoTrabajoAdicionalID: { type: "string", editable: false },
                      JuntaArmadoID: { type: "int", editable: false },
                      TrabajoAdicionalID: { type: "int", editable: false },
                      TrabajoAdicional: { type: "string", editable: true },
                      ObreroID: { type: "int", editable: false },
                      Tubero: { type: "int", editable: false },
                      Observacion: { type: "string", editable: true }
                  }
              }
          }, filter: {
              logic: "or",
              filters: [
                { field: "Accion", operator: "eq", value: 1 },
                { field: "Accion", operator: "eq", value: 2 },
                  { field: "Accion", operator: "eq", value: 0 },
                  { field: "Accion", operator: "eq", value: undefined }
              ]
          }


      },

      selectable: true,
      dataBinding: function (e) {
          
      },
      edit: function (e) {
      },
      change: function (e) {

          ItemSeleccionadoAnidado = this.dataSource.view()[this.select().index()];

          var dataSource = this.dataSource;
          var filters = dataSource.filter();
          var allData = dataSource.data();
          var query = new kendo.data.Query(allData);
          var data = query.filter(filters).data;


          actuallongitudTrabajosAdicionales = data.length;;
          options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales";
          // if (ItemSeleccionado.JuntaArmadoID != 0)
          //     ItemSeleccionado.Accion = 2;

      },
      columns: [
        { field: "TrabajoAdicional", title: 'Trabajo', editor: RenderComboBoxTrabajoAdicional, filterable: true, width: "100px" },
        { field: "Observacion", title: 'Observacion', filterable: true, width: "100px" },
        {
            command: {
                name: "",
                title: "",
                text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                click: function (e) {
                    e.preventDefault();

                    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                    if (confirm(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
                        var dataSource = this.dataSource;

                        if (dataItem.JuntaArmadoID == "1" || dataItem.JuntaArmadoID == undefined)
                            dataSource.remove(dataItem);

                        dataItem.Accion = 3;



                        var filters = dataSource.filter();
                        var allData = dataSource.data();
                        var query = new kendo.data.Query(allData);
                        var data = query.filter(filters).data;

                        actuallongitudTrabajosAdicionales = data.length;

                        options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales"

                        this.dataSource.sync();
                    }

                    ///////////////////


                    //////////////////




                }
            }, width: "99px"
        }
      ], saveChanges: function (e) {
          if (!confirm("Are you sure you want to save all changes?")) {
              e.preventDefault();
          }
      },
      editable: true,
      navigatable: true,
      toolbar: [{ name: "create" }]
  });






}

function RenderComboBoxTrabajoAdicional(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta 

   

    $('<input required data-text-field="NombreCorto" id=' + options.model.uid + ' data-value-field="NombreCorto" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: true,
            dataSource: ItemSeleccionado.listadoTrabajosAdicionalesXJunta,
            template: '<span class="#: data.SignoInformativo #">#: data.NombreCorto #</span>',
            select: function (e) {
                //dataItem = this.dataItem(e.item.index());
                //options.model.TrabajoAdicionalID = dataItem.TrabajoAdicionalID;
                //options.model.TrabajoAdicional = dataItem.NombreCorto;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                if (dataItem != undefined) {
                    options.model.TrabajoAdicionalID = dataItem.TrabajoAdicionalID;
                    options.model.TrabajoAdicional = dataItem.NombreCorto;
                    //$("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    options.model.TrabajoAdicionalID = 0;
                    options.model.TrabajoAdicional = "";
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

function renderEnlaceEditar(container, options) {
    $('<a  id=' + options.model.uid + ' "><span >' + _dictionary.ValidacionResultadosEnlaceEditar[$("#language").data("kendoDropDownList").value()] + '</span></a>')
        .appendTo(container)
        .click(function () {
            LlenarGridPopUp(options.model)
        });

}