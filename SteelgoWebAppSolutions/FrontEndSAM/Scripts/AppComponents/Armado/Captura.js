﻿
var endRangeDate;
var listadoJsonCaptura;
var anteriorlongitudTrabajosAdicionales;
var actuallongitudTrabajosAdicionales;

IniciarCapturaArmado();

function IniciarCapturaArmado() {
    CargarFechaArmado();
    asignarProyecto();
    SuscribirEventos();
};

function asignarProyecto() {
    $("#InputOrdenTrabajo").val(Cookies.get('Proyecto') == undefined ? '' : 'R');
    $("#LabelProyecto").text('Proyecto :' + (Cookies.get('Proyecto') == undefined ? 'No hay ningun proyecto' : Cookies.get('Proyecto')));
}

function CargarFechaArmado() {

    endRangeDate = $("#FechaArmado").kendoDatePicker({
        format: "dd-MM-yyyy"
        //change: deshabilitarFechasFuturo
    }).data("kendoDatePicker");

    //if ($("#language").val() == 'es-MX')
    //    endRangeDate.format = "dd-MM-yyyy";
    //else {
    //    endRangeDate.format = "MM-dd-yyyy";
    //}

    $CapturaArmado.Armado.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        loadingStart();
        console.log("fecha nueva" + data.FechaArmado);

        var from = data.FechaArmado.split("-");

        if (new Date(data.FechaArmado) <= new Date())
            $("#FechaArmado").data("kendoDatePicker").value(data.FechaArmado);
        else
            $("#FechaArmado").data("kendoDatePicker").value(new Date());

        if (data.Muestra) {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', true);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', false);
        }
        else {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', false);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', true);
        }
        loadingStop();
    });
};

function deshabilitarFechasFuturo() {
    alert('entra')
    return endRangeDate.max(new Date())
};

function obtenerFormatoFecha(d) {
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    var horaActual = new Date();
    return curr_date + "-" + curr_month + "-" + curr_year;

};



function DatoDefaultNumeroUnico1() {
    //var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;

    //var cantidadJuntasSinNumeroUnico1;

    //cantidadJuntasSinNumeroUnico1 = 0;

    //var arrayItemsJunta = $("#Junta").data("kendoComboBox").dataSource._data;

    //var arrayNumerosUnicos1;

    //var estaAsignado;
    //for (var i = 0; i < jsonGridArmado.length; i++) {
    //    if (jsonGridArmado[i].IdOrdenTrabajo + '-' + jsonGridArmado[i].IdVal == ($("#InputOrdenTrabajo").val() + '-' + $("#InputID").val()) && jsonGridArmado[i].JuntaID != $("#Junta").val()) {
    //        cantidadJuntasSinNumeroUnico1++;
    //        arrayNumerosUnicos1 = jsonGridArmado[i].ListaNumerosUnicos1;
    //    }
    //}

    //if (($("#Junta").data("kendoComboBox").dataSource._data.length - cantidadJuntasSinNumeroUnico1) == 1) {
    //    for (var n = 0; n < arrayNumerosUnicos1.length; n++) {
    //        for (var i = 0; i < jsonGridArmado.length; i++) {
    //            if (jsonGridArmado[i].IdOrdenTrabajo + '-' + jsonGridArmado[i].IdVal == ($("#InputOrdenTrabajo").val() + '-' + $("#InputID").val()) && jsonGridArmado[i].JuntaID != $("#Junta").val() && arrayNumerosUnicos1[n].Clave == jsonGridArmado[i].NumeroUnico1) {
    //                estaAsignado = true;
    //                break;
    //            }
    //        }
    //        if (!estaAsignado) {
    //            return arrayNumerosUnicos1[n].Clave;
    //        }
    //        else
    //            estaAsignado = false;
    //    }
    //    return "";
    //}
    //else
    //    return "";
}

function DatoDefaultNumeroUnico2() {
    //var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;

    //var cantidadJuntasSinNumeroUnico2;

    //cantidadJuntasSinNumeroUnico2 = 0;

    //var arrayItemsJunta = $("#Junta").data("kendoComboBox").dataSource._data;

    //var arrayNumerosUnicos1;
    //var arrayNumerosUnicos2;
    //var estaAsignado;
    //for (var i = 0; i < jsonGridArmado.length; i++) {
    //    if (jsonGridArmado[i].IdOrdenTrabajo + '-' + jsonGridArmado[i].IdVal == ($("#InputOrdenTrabajo").val() + '-' + $("#InputID").val()) && jsonGridArmado[i].JuntaID != $("#Junta").val()) {
    //        cantidadJuntasSinNumeroUnico2++;
    //        arrayNumerosUnicos1=jsonGridArmado[i].ListaNumerosUnicos1;
    //        arrayNumerosUnicos2 = jsonGridArmado[i].ListaNumerosUnicos2;
    //    }
    //}

    //if (($("#Junta").data("kendoComboBox").dataSource._data.length - cantidadJuntasSinNumeroUnico2) == 1) {
    //    for (var n = 0; n < arrayNumerosUnicos2.length; n++) {
    //        for (var i = 0; i < jsonGridArmado.length; i++) {
    //            if (jsonGridArmado[i].IdOrdenTrabajo + '-' + jsonGridArmado[i].IdVal == ($("#InputOrdenTrabajo").val() + '-' + $("#InputID").val()) && jsonGridArmado[i].JuntaID != $("#Junta").val() && arrayNumerosUnicos2[n].Clave ==  jsonGridArmado[i].NumeroUnico2 ) {
    //                estaAsignado = true;
    //                break;
    //            }
    //        }
    //        if (!estaAsignado) {
    //            return arrayNumerosUnicos2[n].Clave;
    //        }
    //        else
    //            estaAsignado = false;
    //    }
    //    return "";
    //}
    //else
    return "";
}

function ExisteJunta() {
    var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < jsonGridArmado.length; i++) {
        if (jsonGridArmado[i].IdOrdenTrabajo + '-' + jsonGridArmado[i].IdVal == ($("#InputOrdenTrabajo").val() + '-' + $("#InputID").val()) && jsonGridArmado[i].JuntaID == $("#Junta").val()) {
            return false;
        }
    }
    return true;
}

function ArregloListadoCaptura() {
    JsonCaptura = [];
    JsonCaptura[0] = { IDProyecto: "", Proyecto: "", IdOrdenTrabajo: "", OrdenTrabajo: "", IdVal: "", IdText: "", SpoolID: "", JuntaID: "", Junta: "", FechaArmado: "", TuberoID: "", Tubero: "", TallerID: "", Taller: "", SinCaptura: "" };
    //combobox.text()
    var fechaArmado = new Date($("#FechaArmado").data("kendoDatePicker").value());
    JsonCaptura[0].IDProyecto = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).ProyectoID;
    JsonCaptura[0].Proyecto = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Proyecto;
    JsonCaptura[0].IdOrdenTrabajo = $("#InputOrdenTrabajo").val();
    JsonCaptura[0].OrdenTrabajo = $("#InputOrdenTrabajo").val();
    JsonCaptura[0].IdVal = $("#InputID").val();
    JsonCaptura[0].IdText = $("#InputID").data("kendoComboBox").text()
    JsonCaptura[0].SpoolID = $("#InputOrdenTrabajo").val() + '-' + $("#InputID").val();
    JsonCaptura[0].JuntaID = $("#Junta").val();
    JsonCaptura[0].Junta = $("#Junta").data("kendoComboBox").text();
    JsonCaptura[0].FechaArmado = obtenerFormatoFecha(fechaArmado);
    JsonCaptura[0].TuberoID = $("#inputTubero").val();
    JsonCaptura[0].Tubero = $("#inputTubero").data("kendoComboBox").text();
    JsonCaptura[0].TallerID = $("#inputTaller").val();
    JsonCaptura[0].Taller = $("#inputTaller").data("kendoComboBox").text();
    JsonCaptura[0].SinCaptura = $('input:radio[name=Muestra]:checked').val();
    return JsonCaptura[0];
};

function CargarGridArmado() {
    $("#grid").kendoGrid({
        autoBind: true,
        autoSync: true,
        edit: function (e) {
            var input = e.container.find(".k-input");
            var value = input.val();
            // alert("entra" +e.model.DetalleAdicional.length);
            anteriorlongitudTrabajosAdicionales = e.model.ListaDetalleTrabajoAdicional.length;
            //input.keyup(function () {
            //    value = input.val();
            //});
            //input.blur(function () {
            //    //$("#log").html(input.attr('name') + " blurred : " + value);
            //    //var a = new Date();
            //    //a = value;
            //    //var day = a.getDay();
            //    //alert(day);
            //    // alert(value);
            //    alert("blur");
            //    alert("sale" + e.model.DetalleAdicional.length);
            //    actuallongitudTrabajosAdicionales = e.model.DetalleAdicional.length;
            //});


        },
        change: function () {
            var dataItem = this.dataSource.view()[this.select().index()];
            alert('ok');
        },
        dataSource: {
            // batch: true,
            data: '',//listadoJsonCaptura,//[{}],
            schema: {
                model: {
                    fields: {
                        Proyecto: { type: "string", editable: false },
                        IdOrdenTrabajo: { type: "string", editable: false },
                        OrdenTrabajo: { type: "string", editable: false },
                        IdVal: { type: "string", editable: false },
                        IdText: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        JuntaID: { type: "string", editable: false },
                        Junta: { type: "string", editable: false },
                        TipoJunta: { type: "string", editable: false },
                        Diametro: { type: "string", editable: false },
                        Cedula: { type: "string", editable: false },
                        FechaArmado: { type: "date", editable: true },
                        TuberoID: { type: "string", editable: true },
                        Tubero: { type: "string", editable: true },
                        TallerID: { type: "string", editable: true },
                        Taller: { type: "string", editable: true },
                        Localizacion: { type: "string", editable: false },
                        FamiliaAcero: { type: "string", editable: false },
                        NumeroUnico1: { type: "string", editable: true },
                        NumeroUnico2: { type: "string", editable: true },
                        TemplateMensajeTrabajosAdicionales: { type: "string", editable: true },
                        InformacionDetalle: { type: "string", editable: true }
                    }
                }
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: false,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "SpoolID", title: _dictionary.CapturaArmadoHeaderSpoolID[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "Junta", title: _dictionary.CapturaArmadoJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
            { field: "TipoJunta", title: _dictionary.CapturaArmadoHeaderTipoJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "Diametro", title: _dictionary.CapturaArmadoHeaderDiametro[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "Cedula", title: _dictionary.CapturaArmadoHeaderCedula[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "FechaArmado", title: _dictionary.CapturaArmadoHeaderFechaArmado[$("#language").data("kendoDropDownList").value()], type: "date", filterable: true, width: "160px", format: "{0:dd-MM-yyyy}" },
            { field: "Tubero", title: _dictionary.CapturaArmadoHeaderTubero[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxTubero, width: "130px" },
            { field: "Taller", title: _dictionary.CapturaArmadoHeaderTaller[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxTaller, width: "130px" },
            { field: "Localizacion", title: _dictionary.CapturaArmadoHeaderLocalizacion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "FamiliaAcero", title: _dictionary.CapturaArmadoHeaderFamiliaAcero[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "NumeroUnico1", title: _dictionary.CapturaArmadoHeaderNumeroUnico1[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxNumeroUnico1, width: "170px" },
            { field: "NumeroUnico2", title: _dictionary.CapturaArmadoHeaderNumeroUnico2[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxNumeroUnico2, width: "170px" },
            { field: "InformacionDetalle", title: _dictionary.CapturaArmadoHeaderAdicionales[$("#language").data("kendoDropDownList").value()], filterable: true, width: "300px", editor: RenderGridDetalle, template: "#:TemplateMensajeTrabajosAdicionales#" },
            { command: { text: _dictionary.ListadoLlegadaMaterial0017[$("#language").data("kendoDropDownList").value()], click: cancelarCaptura }, title: "", width: "99px" }
        ],
        dataBound: function (e) {
            $(".k-grid input.k-textbox").prop('readonly', true);
            $(".k-grid td .k-button").text('');
            $(".k-grid td:first-child, .k-grid td:last-child").css('text-overflow', 'clip');
        }
    });
};

function AddRow(idTable) {
    var row = '';
    row += ' <tr>';
    row += '   <td><input style=" min-height:10px !important; height:auto;" placeholder="bisel" /></td>';
    row += '   <td><input style=" min-height:10px !important; height:auto;" placeholder="5" /></td> ';
    row += '   <td><input type="Button" class="deleteRow"  style=" width:10px; height:10px; background-image:url(../../Content/images/Delete_Grey.png); background-repeat:no-repeat; padding:0; margin:auto; background-position:center;"></td> ';
    row += ' </tr> ';

    $('#' + idTable).append(row);

    SuscribirEventoEliminar(idTable);
}

function AplicarAsignacionAutomaticaNumeroUnico(rowitem, textoAnterior, combobox, posicionSiguiente) {

    var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;


    //se asigna datos a nivel Etiqueta
    for (var i = 0; i < jsonGridArmado.length; i++) {
        if (jsonGridArmado[i].IdOrdenTrabajo + '-' + jsonGridArmado[i].IdVal == (rowitem.IdOrdenTrabajo + '-' + rowitem.IdVal)) {

            for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos1.length; j++) {
                if (combobox.EtiquetaMaterial == jsonGridArmado[i].ListaNumerosUnicos1[j].EtiquetaMaterial)
                    jsonGridArmado[i].NumeroUnico1 = combobox.Clave;
            }
            for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos2.length; j++) {
                if (combobox.EtiquetaMaterial == jsonGridArmado[i].ListaNumerosUnicos2[j].EtiquetaMaterial)
                    jsonGridArmado[i].NumeroUnico2 = combobox.Clave;
            }

        }
    }

    //se asigna datos a nivel numero unico siempre y cuando la longitud del total de posibles numeros unicos es 1

    var itemSiguienteMismoMaterial;
    var arrayListaNumerosUnicos;

    if (combobox.Etiqueta == "2")
        arrayListaNumerosUnicos = rowitem.ListaNumerosUnicos2;
    else if (combobox.Etiqueta == "1")
        arrayListaNumerosUnicos = rowitem.ListaNumerosUnicos1;

    if (arrayListaNumerosUnicos.length - 1 == 1) {
        for (var i = 0; i < arrayListaNumerosUnicos.length; i++) {
            if (combobox.Clave != arrayListaNumerosUnicos[i].Clave) {
                itemSiguienteMismoMaterial = arrayListaNumerosUnicos[i];
                rowitem = BuscarItemSiguienteEnGrid(itemSiguienteMismoMaterial);

                if (rowitem != undefined) {


                    if (posicionSiguiente < arrayListaNumerosUnicos.length) {
                        posicionSiguiente++;
                        AplicarAsignacionAutomaticaNumeroUnico(rowitem[0], textoAnterior, rowitem[1], posicionSiguiente)
                    }
                }
            }
        }
    }

};

function BuscarItemSiguienteEnGrid(siguienteItemBuscar) {
    var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;


    //se busca el nuevo item en alguna junta con el mismo EtiquetaMaterial .
    for (var i = 0; i < jsonGridArmado.length; i++) {
        for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos1.length; j++) {
            if (jsonGridArmado[i].ListaNumerosUnicos1[j].Clave == siguienteItemBuscar.Clave && jsonGridArmado[i].ListaNumerosUnicos1[j].EtiquetaMaterial == siguienteItemBuscar.EtiquetaMaterial && jsonGridArmado[i].NumeroUnico1 == undefined)
                return [jsonGridArmado[i], jsonGridArmado[i].ListaNumerosUnicos1[j]];
        }

        for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos2.length; j++) {
            if (jsonGridArmado[i].ListaNumerosUnicos2[j].Clave == siguienteItemBuscar.Clave && jsonGridArmado[i].ListaNumerosUnicos2[j].EtiquetaMaterial == siguienteItemBuscar.EtiquetaMaterial && jsonGridArmado[i].NumeroUnico2 == undefined)
                return [jsonGridArmado[i], jsonGridArmado[i].ListaNumerosUnicos2[j]];
        }
    }

    //se busca el nuevo item en alguna junta con diferente EtiquetaMaterial .
    for (var i = 0; i < jsonGridArmado.length; i++) {
        for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos1.length; j++) {
            if (jsonGridArmado[i].ListaNumerosUnicos1[j].Clave == siguienteItemBuscar.Clave && jsonGridArmado[i].ListaNumerosUnicos1[j].EtiquetaMaterial != siguienteItemBuscar.EtiquetaMaterial)
                return [jsonGridArmado[i], jsonGridArmado[i].ListaNumerosUnicos1[j]];
        }

        for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos2.length; j++) {
            if (jsonGridArmado[i].ListaNumerosUnicos2[j].Clave == siguienteItemBuscar.Clave && jsonGridArmado[i].ListaNumerosUnicos2[j].EtiquetaMaterial != siguienteItemBuscar.EtiquetaMaterial)
                return [jsonGridArmado[i], jsonGridArmado[i].ListaNumerosUnicos2[j]];
        }
    }

    //en caso de no encontrar nada
    return undefined;
}

function agregarFila(idGrid) {
    var grid = $("#" + idGrid).data("kendoGrid");
    //grid.addRow();
    //$(".k-grid-edit-row").appendTo("#" + idGrid + " tbody");
    alert('se agrego fila');
}

function cancelarCaptura(e) {
    e.preventDefault();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    var spoolIDRegistro = dataItem.SpoolID;
    if (confirm(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        dataSource.remove(dataItem);

    }
};

function changeLanguageCall() {
    CargarGridArmado();
};
