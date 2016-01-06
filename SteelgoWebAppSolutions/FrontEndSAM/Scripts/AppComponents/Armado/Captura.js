﻿var endRangeDate;
var listadoJsonCaptura;
var anteriorlongitudTrabajosAdicionales;
var actuallongitudTrabajosAdicionales;
var ItemSeleccionado;
var ventanaConfirm;

IniciarCapturaArmado();
function IniciarCapturaArmado() {

    AltaFecha();
    asignarProyecto();
    SuscribirEventos();

}
function asignarProyecto() {
    $("#InputOrdenTrabajo").val(Cookies.get('LetraProyecto') == undefined ? '' : Cookies.get('LetraProyecto'));
    $("#LabelProyecto").text('Proyecto :' + (Cookies.get('Proyecto') == undefined ? 'No hay ningun proyecto' : Cookies.get('Proyecto')));
}
function AltaFecha() {
    endRangeDate = $("#FechaArmado").kendoDatePicker({
        max: new Date()
    });

    endRangeDate.on("keydown", function (e) {
        if (e.keyCode == 13) {
            PlanchaFecha();
        }
    });

}
function ExisteJunta() {
    var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < jsonGridArmado.length; i++) {
        if (jsonGridArmado[i].IdOrdenTrabajo + '-' + jsonGridArmado[i].IdVal == ($("#InputOrdenTrabajo").val() + '-' + $("#InputID").val()) && jsonGridArmado[i].JuntaID === $("#Junta").val()) {
            jsonGridArmado.Accion = 2;
            $("#grid").data("kendoGrid").dataSource.sync();
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
    JsonCaptura[0].IdText = $("#InputID").data("kendoComboBox").text();
    JsonCaptura[0].SpoolID = $("#InputOrdenTrabajo").val() + '-' + $("#InputID").val();
    JsonCaptura[0].JuntaID = $("#Junta").val();
    JsonCaptura[0].Junta = $("#Junta").data("kendoComboBox").text();
    JsonCaptura[0].FechaArmado = $("#FechaArmado").val();
    JsonCaptura[0].TuberoID = $("#inputTubero").val();
    JsonCaptura[0].Tubero = $("#inputTubero").data("kendoComboBox").text();
    JsonCaptura[0].TallerID = $("#inputTaller").val();
    JsonCaptura[0].Taller = $("#inputTaller").data("kendoComboBox").text();
    JsonCaptura[0].SinCaptura = $('input:radio[name=Muestra]:checked').val();

    return JsonCaptura[0];
}
function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        edit: function (e) {
            var input = e.container.find(".k-input");
            var value = input.val();

            anteriorlongitudTrabajosAdicionales = e.model.ListaDetalleTrabajoAdicional.length;

            input.focus(function () {
                console.log(ItemSeleccionado.Accion);
                if (ItemSeleccionado.JuntaArmadoID !== 0)
                { ItemSeleccionado.Accion = 2; }
            });

        },
        change: function () {
            ItemSeleccionado = this.dataSource.view()[this.select().index()];
        },
        dataSource: {
            data: '',
            schema: {
                model: {
                    fields: {
                        Accion: { type: "int", editable: false },
                        JuntaTrabajoID: { type: "int", editable: false },
                        JuntaArmadoID: { type: "int", editable: false },
                        IDProyecto: { type: "int", editable: false },
                        SinCaptura: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        IdOrdenTrabajo: { type: "string", editable: false },
                        OrdenTrabajo: { type: "string", editable: false },
                        IdVal: { type: "string", editable: false },
                        IdText: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        JuntaID: { type: "string", editable: false },
                        Junta: { type: "string", editable: false },
                        TipoJuntaID: { type: "int", editable: false },
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
                        NumeroUnico1ID: { type: "string", editable: true },
                        NumeroUnico1: { type: "string", editable: true },
                        NumeroUnico2ID: { type: "string", editable: true },
                        NumeroUnico2: { type: "string", editable: true },
                        TemplateMensajeTrabajosAdicionales: { type: "string", editable: true },
                        InformacionDetalle: { type: "string", editable: true },
                        DetalleJunta: { type: "string", editable: false }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 }
                ]
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        editable: true,
        filterable: {
            extra: false
        },
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true
        },
        columns: [
            { field: "SpoolID", title: _dictionary.CapturaArmadoHeaderSpool[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px" },
            { field: "Junta", title: _dictionary.CapturaArmadoHeaderJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "94px" },
            { field: "DetalleJunta", title: _dictionary.CapturaArmadoHeaderDetalle[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "FechaArmado", title: _dictionary.CapturaArmadoHeaderFechaArmado[$("#language").data("kendoDropDownList").value()], type: "date", filterable: true, width: "120px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "Tubero", title: _dictionary.CapturaArmadoHeaderTubero[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxTubero, width: "105px" },
            { field: "Taller", title: _dictionary.CapturaArmadoHeaderTaller[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboBoxTaller, width: "105px" },
            { field: "NumeroUnico1", title: _dictionary.CapturaArmadoHeaderNumeroUnico1[$("#language").data("kendoDropDownList").value()], filterable: false, editor: RenderComboBoxNumeroUnico1, width: "135px" },
            { field: "NumeroUnico2", title: _dictionary.CapturaArmadoHeaderNumeroUnico2[$("#language").data("kendoDropDownList").value()], filterable: false, editor: RenderComboBoxNumeroUnico2, width: "135px" },
            { field: "InformacionDetalle", title: _dictionary.CapturaArmadoHeaderAdicionales[$("#language").data("kendoDropDownList").value()], filterable: false, width: "300px", editor: RenderGridDetalle, template: "#:TemplateMensajeTrabajosAdicionales#" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: "", width: "99px" }

        ],
        dataBound: function (e) {
            $(".k-grid input.k-textbox").prop('readonly', true);
            $(".k-grid td .k-button").text('');
            $(".k-grid td:first-child, .k-grid td:last-child").css('text-overflow', 'clip');

        }
    });
}
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
                if (combobox.EtiquetaMaterial == jsonGridArmado[i].ListaNumerosUnicos1[j].EtiquetaMaterial) {
                    jsonGridArmado[i].NumeroUnico1 = combobox.Clave;
                    jsonGridArmado[i].NumeroUnico1ID = combobox.NumeroUnicoID;
                }
            }
            for (var k = 0; k < jsonGridArmado[i].ListaNumerosUnicos2.length; k++) {
                if (combobox.EtiquetaMaterial == jsonGridArmado[i].ListaNumerosUnicos2[k].EtiquetaMaterial) {
                    jsonGridArmado[i].NumeroUnico2 = combobox.Clave;
                    jsonGridArmado[i].NumeroUnico2ID = combobox.NumeroUnicoID;
                }
            }

        }
    }

    //se asigna datos a nivel numero unico siempre y cuando la longitud del total de posibles numeros unicos es 1

    var itemSiguienteMismoMaterial;
    var arrayListaNumerosUnicos;

    if (combobox.Etiqueta == "2")
    { arrayListaNumerosUnicos = rowitem.ListaNumerosUnicos2; }
    else if (combobox.Etiqueta == "1")
    { arrayListaNumerosUnicos = rowitem.ListaNumerosUnicos1; }

    if (arrayListaNumerosUnicos.length - 1 == 1) {
        for (var l = 0; l < arrayListaNumerosUnicos.length; l++) {
            if (combobox.Clave != arrayListaNumerosUnicos[l].Clave) {
                itemSiguienteMismoMaterial = arrayListaNumerosUnicos[l];
                rowitem = BuscarItemSiguienteEnGrid(itemSiguienteMismoMaterial);

                if (rowitem != undefined) {


                    if (posicionSiguiente < arrayListaNumerosUnicos.length) {
                        posicionSiguiente++;
                        AplicarAsignacionAutomaticaNumeroUnico(rowitem[0], textoAnterior, rowitem[1], posicionSiguiente);
                    }
                }
            }
        }
    }

}
function DatoDefaultNumeroUnico1()
{ }
function DatoDefaultNumeroUnico2()
{ }
function BuscarItemSiguienteEnGrid(siguienteItemBuscar) {
    var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;


    //se busca el nuevo item en alguna junta con el mismo EtiquetaMaterial .
    for (var i = 0; i < jsonGridArmado.length; i++) {
        for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos1.length; j++) {
            if (jsonGridArmado[i].ListaNumerosUnicos1[j].Clave == siguienteItemBuscar.Clave && jsonGridArmado[i].ListaNumerosUnicos1[j].EtiquetaMaterial == siguienteItemBuscar.EtiquetaMaterial && jsonGridArmado[i].NumeroUnico1 == undefined)
            { return [jsonGridArmado[i], jsonGridArmado[i].ListaNumerosUnicos1[j]]; }
        }

        for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos2.length; j++) {
            if (jsonGridArmado[i].ListaNumerosUnicos2[j].Clave == siguienteItemBuscar.Clave && jsonGridArmado[i].ListaNumerosUnicos2[j].EtiquetaMaterial == siguienteItemBuscar.EtiquetaMaterial && jsonGridArmado[i].NumeroUnico2 == undefined)
            { return [jsonGridArmado[i], jsonGridArmado[i].ListaNumerosUnicos2[j]]; }
        }
    }

    //se busca el nuevo item en alguna junta con diferente EtiquetaMaterial .
    for (var i = 0; i < jsonGridArmado.length; i++) {
        for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos1.length; j++) {
            if (jsonGridArmado[i].ListaNumerosUnicos1[j].Clave == siguienteItemBuscar.Clave && jsonGridArmado[i].ListaNumerosUnicos1[j].EtiquetaMaterial != siguienteItemBuscar.EtiquetaMaterial)
            { return [jsonGridArmado[i], jsonGridArmado[i].ListaNumerosUnicos1[j]]; }
        }

        for (var j = 0; j < jsonGridArmado[i].ListaNumerosUnicos2.length; j++) {
            if (jsonGridArmado[i].ListaNumerosUnicos2[j].Clave == siguienteItemBuscar.Clave && jsonGridArmado[i].ListaNumerosUnicos2[j].EtiquetaMaterial != siguienteItemBuscar.EtiquetaMaterial)
            { return [jsonGridArmado[i], jsonGridArmado[i].ListaNumerosUnicos2[j]]; }
        }
    }

    //en caso de no encontrar nada
    return undefined;
}
function agregarFila(idGrid) {
    var grid = $("#" + idGrid).data("kendoGrid");

}
function eliminarCaptura(e) {
    e.preventDefault();
    var filterValue = $(e.currentTarget).val();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    var spoolIDRegistro = dataItem.SpoolID;


    windowTemplate = kendo.template($("#windowTemplate").html());

    ventanaConfirm = $("#ventanaConfirm").kendoWindow({
        iframe: true,
        title: _dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()],
        visible: false, //the window will not appear before its .open method is called
        width: "400px",
        height: "200px",
        modal: true
    }).data("kendoWindow");

    ventanaConfirm.content(windowTemplate(this.dataSource, dataItem));

    ventanaConfirm.open().center();

    $("#yesButton").click(function () {
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        dataItem.Accion = 3;

        if (dataItem.JuntaArmadoID === 0)
        { dataSource.remove(dataItem); }

        dataSource.sync();
        ventanaConfirm.close();
    });
    $("#noButton").click(function () {
        ventanaConfirm.close();
    });

}
function changeLanguageCall() {
    endRangeDate.data("kendoDatePicker").setOptions({
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]
    });
    AjaxCargarCamposPredeterminados();
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
}
function PlanchaTubero() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].TuberoID = $("#inputTubero").val();
            data[i].Tubero = $("#inputTubero").data("kendoComboBox").text();
        }
        else {
            if (data[i].Tubero === "" || data[i].Tubero === null || data[i].Tubero === undefined) {
                data[i].TuberoID = $("#inputTubero").val();
                data[i].Tubero = $("#inputTubero").data("kendoComboBox").text();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}
function PlanchaTaller() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].TallerID = $("#inputTaller").val();
            data[i].Taller = $("#inputTaller").data("kendoComboBox").text();
        }
        else {
            if (data[i].Taller === "" || data[i].Taller === null || data[i].Taller === undefined) {
                data[i].TallerID = $("#inputTaller").val();
                data[i].Taller = $("#inputTaller").data("kendoComboBox").text();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}
function PlanchaFecha() {
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var filters = dataSource.filter();
    var allData = dataSource.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    for (var i = 0; i < data.length; i++) {
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            data[i].FechaArmado = String(endRangeDate.val()).trim();
        }
        else {
            if (data[i].FechaArmado === "" || data[i].FechaArmado === null || data[i].FechaArmado === undefined) {
                data[i].FechaArmado = String(endRangeDate.val()).trim();
            }
        }
    }
    $("#grid").data("kendoGrid").dataSource.sync();
}
function ArregloListadoReporte() {
    JsonCaptura = [];
    var lista = $("#Junta").data("kendoComboBox").dataSource._data;

    for (var i = 0; i < lista.length ; i++) {
        JsonCaptura[i] = { IDProyecto: "", Proyecto: "", IdOrdenTrabajo: "", OrdenTrabajo: "", idVal: "", idText: "", SpoolID: "", JuntaID: "", Junta: "", FechaArmado: "", TuberoID: "", Tubero: "", TallerID: "", Taller: "", sinCaptura: "" };
        JsonCaptura[i].IDProyecto = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).ProyectoID;
        JsonCaptura[i].Proyecto = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Proyecto;
        JsonCaptura[i].IdOrdenTrabajo = $("#InputOrdenTrabajo").val();
        JsonCaptura[i].OrdenTrabajo = $("#InputOrdenTrabajo").val();
        JsonCaptura[i].idVal = $("#InputID").val();
        JsonCaptura[i].idText = $("#InputID").data("kendoComboBox").text();
        JsonCaptura[i].SpoolID = $("#InputOrdenTrabajo").val() + '-' + $("#InputID").val();
        JsonCaptura[i].JuntaID = lista[i].JuntaSpoolID;
        JsonCaptura[i].Junta = lista[i].Etiqueta;
        JsonCaptura[i].FechaArmado = $("#FechaArmado").val();
        JsonCaptura[i].TuberoID = $("#inputTubero").val();
        JsonCaptura[i].Tubero = $("#inputTubero").data("kendoComboBox").text();
        JsonCaptura[i].TallerID = $("#inputTaller").val();
        JsonCaptura[i].Taller = $("#inputTaller").data("kendoComboBox").text();
        JsonCaptura[i].sinCaptura = "Todos";
    }
    return JsonCaptura;
}

function ArregloListadoJuntasCapturadas() {

    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var data = dataSource._data


    JsonCaptura = [];
    

    for (var i = 0; i < data.length ; i++) {
        JsonCaptura[i] = { IDProyecto: "", Proyecto: "", IdOrdenTrabajo: "", OrdenTrabajo: "", idVal: "", idText: "", SpoolID: "", JuntaID: "", Junta: "", FechaArmado: "", TuberoID: "", Tubero: "", TallerID: "", Taller: "", sinCaptura: "" };
        JsonCaptura[i].IDProyecto = data[i].IDProyecto;
        JsonCaptura[i].Proyecto =data[i].Proyecto;
        JsonCaptura[i].IdOrdenTrabajo = data[i].IdOrdenTrabajo;
        JsonCaptura[i].OrdenTrabajo = data[i].OrdenTrabajo;
        JsonCaptura[i].idVal = data[i].IdVal;
        JsonCaptura[i].idText = data[i].IdText
        JsonCaptura[i].SpoolID = data[i].SpoolID;
        JsonCaptura[i].JuntaID = data[i].JuntaID;
        JsonCaptura[i].Junta = data[i].Junta;
        JsonCaptura[i].FechaArmado = data[i].FechaArmado;
        JsonCaptura[i].TuberoID = data[i].TuberoID;
        JsonCaptura[i].Tubero = data[i].Tubero;
        JsonCaptura[i].TallerID = data[i].TallerID;
        JsonCaptura[i].Taller = data[i].Taller;
        JsonCaptura[i].sinCaptura = data[i].SinCaptura;
    }
    return JsonCaptura;
}