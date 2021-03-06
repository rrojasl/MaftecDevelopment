﻿var TipoObrero = "Inspector Visual Dimensional";
var TipoConsultaObrero = 2;
var TipoPruebaDimensional = "Inspección dimensional";
var TipoPruebaVisual = "Inspección visual";
var CampoFechaDimensionalPredeterminada = 4;
var CampoFechaVisualPredeterminada = 16;
var CampoResultadoDimensionalPredeterminada = 18;
var CampoResultadoVisualPredeterminada = 20;
var CampoLlenadoPredeterminada = 22;
var idMostrarInformacion = 1047;
var listadoJuntasInicialGlobal = [];

function AjaxObtenerListaInspector() {
    loadingStart();
    $Obrero.Obrero.read({ idProyecto: 0, tipo: TipoConsultaObrero, token: Cookies.get("token"), TipoObrero: TipoObrero }).done(function (data) {
        $("#inputInspector").data("kendoComboBox").value("");
        $("#inputInspector").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function AjaxObtenerListaTaller() {
    try {
        $CapturaArmado.Armado.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], token: Cookies.get("token") }).done(function (data) {
            $("#inputTaller").data("kendoComboBox").value("");
            $("#inputTaller").data("kendoComboBox").dataSource.data(data);
        });
    }
    catch (e) {
    }
}

function AjaxJunta(spoolID) {
    $Inspeccion.Inspeccion.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), id: spoolID, sinCaptura: 1, token: Cookies.get("token"), todos: 1 }).done(function (data) {
        if (Error(data)) {
            limpiarJuntaMultiselect();
            $("#ListaJuntas").data("kendoMultiSelect").dataSource.data(data);
        }
    });
}

function AjaxObtenerListaInspectorVisual() {
    $Obrero.Obrero.read({ idProyecto: 0, tipo: TipoConsultaObrero, token: Cookies.get("token"), TipoObrero: TipoObrero }).done(function (data) {
        $("#inputInspectorVisual").data("kendoComboBox").value("");
        $("#inputInspectorVisual").data("kendoComboBox").dataSource.data(data)

    });
}

function AjaxObtenerListaDefectosDimensionales() {

    $Defectos.Defectos.read({ lenguaje: $("#language").val(), TipoPrueba: TipoPruebaDimensional, token: Cookies.get("token") }).done(function (data) {
        $("#inputDefecto").data("kendoComboBox").value("");
        $("#inputDefecto").data("kendoComboBox").dataSource.data(data)
    });
}

function AjaxObtenerListaDefectosVisuales() {

    $Defectos.Defectos.read({ lenguaje: $("#language").val(), TipoPrueba: TipoPruebaVisual, token: Cookies.get("token") }).done(function (data) {
        $("#inputDefectosVisual").data("kendoComboBox").value("");
        $("#inputDefectosVisual").data("kendoComboBox").dataSource.data(data)

    });
}

function AjaxCargaCamposPredeterminados() {

    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoFechaDimensionalPredeterminada }).done(function (data) {
        var NewDate = kendo.toString(data, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        endRangeDate.val(NewDate);
    });

    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoFechaVisualPredeterminada }).done(function (data) {
        var NewDate2 = kendo.toString(data, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        endRangeDateV.val(NewDate2);
    });
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoResultadoVisualPredeterminada }).done(function (data) {
        if (data == "Aprobado") {
            $('input:radio[name=ResultadoVisual]:nth(0)').trigger("click");
            //$('input:radio[name=ResultadoVisual]:nth(1)').attr('checked', false);
            $("input:radio[name=ResultadoVisual]:checked").change();

        }
        else if (data == "Rechazado") {
            $('input:radio[name=ResultadoVisual]:nth(0)').attr('checked', false);
            //$('input:radio[name=ResultadoVisual]:nth(1)').trigger("click");
            $("input:radio[name=ResultadoVisual]:checked").change();
        }
    });
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoLlenadoPredeterminada }).done(function (data) {
        if (data == "Todos") {
            $('input:radio[name=LLena]:nth(0)').trigger("click");
            //$('input:radio[name=LLena]:nth(1)').attr('checked', false);
            $("input:radio[name=LLena]:checked").change();

        }
        else if (data == "Vacios") {
            //$('input:radio[name=LLena]:nth(0)').attr('checked', false);
            $('input:radio[name=LLena]:nth(1)').trigger("click");
            $("input:radio[name=LLena]:checked").change();

        }

    });

}

function AjaxObtenerSpoolID() {
    try {
        $CapturasRapidas.CapturasRapidas.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            loadingStart();
            $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
            $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus)
            Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
            loadingStop();

        });
    } catch (e) {
        displayNotify("Mensajes_error", e.message, '2');
    }
}

function AjaxobtenerDetalleDimensional(spoolID) {

    $Inspeccion.Inspeccion.read({ id: spoolID, sinCaptura: 1, token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.ListaDetalleDimensional.length == 0) {
            $("#InspeccionDimensionalID").val("");
            AjaxJunta($("#InputID").val());
        }
        else {
            if (data.ListaDetalleDimensional[0].ResultadoID == 1) {//aprobado
                $('input:radio[name=ResultadoDimensional]:nth(0)').trigger("click");
                //$('input:radio[name=ResultadoDimensional]:nth(1)').attr('checked', false);
                $("input:radio[name=ResultadoDimensional]:checked").change();
            }
            else if (data.ListaDetalleDimensional[0].ResultadoID == 2) {//rechazado
                //$('input:radio[name=ResultadoDimensional]:nth(0)').attr('checked', false);
                $('input:radio[name=ResultadoDimensional]:nth(1)').trigger("click");
                $("input:radio[name=ResultadoDimensional]:checked").change();
            }

            $("#inputDefecto").data("kendoComboBox").value(data.ListaDetalleDimensional[0].DefectoID == 0 ? "" : data.ListaDetalleDimensional[0].DefectoID);
            $("#inputInspector").data("kendoComboBox").value(data.ListaDetalleDimensional[0].ObreroID);
            $("#InspeccionDimensionalID").val(data.ListaDetalleDimensional[0].InspeccionDimensionalID);
            endRangeDate.val(data.ListaDetalleDimensional[0].FechaInspeccion);

            $("#ListaJuntas").data("kendoMultiSelect").dataSource.data([]);
            $("#ListaJuntas").data("kendoMultiSelect").dataSource.data(data.ListaDetalleDimensional[0].ListaJuntas);
            listadoJuntasInicialGlobal = data.ListaDetalleDimensional[0].ListaJuntasSeleccionadas.length > 0 ? data.ListaDetalleDimensional[0].ListaJuntasSeleccionadas : [];
            if (data.ListaDetalleDimensional[0].ListaJuntasSeleccionadas.length > 0) {
                var valores = [];
                for (var i = 0; i < data.ListaDetalleDimensional[0].ListaJuntasSeleccionadas.length; i++) {
                    valores[i] = data.ListaDetalleDimensional[0].ListaJuntasSeleccionadas[i].JuntaID;
                };

                $("#ListaJuntas").data("kendoMultiSelect").value(valores);
            }

            //if ($("#ListaJuntas").data("kendoMultiSelect").value().length > 0) {
            //    AjaxObtenerJSonGrid();
            //}
        }
    });
}

function AjaxObtenerJSonGrid() {
    loadingStart();
    try {
        $Inspeccion.Inspeccion.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), token: Cookies.get("token"), Lenguaje: $("#language").val(), juntasSeleccionadas: $("#ListaJuntas").data("kendoMultiSelect").value().toString() }).done(function (data) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = JSON.parse(data);

            var jointsAdded = [];

            for (var i = 0; i < array.length; i++) {
                if (jointsAdded.indexOf(array[i].Junta) < 0)
                    jointsAdded.push(array[i].Junta);

                if (ExisteJunta(array[i].JuntaID)) {
                    array[i].NumeroUnico1 = array[i].NumeroUnico1 == "" ? DatoDefaultNumeroUnico1() : array[i].NumeroUnico1;
                    array[i].NumeroUnico2 = array[i].NumeroUnico2 == "" ? DatoDefaultNumeroUnico2() : array[i].NumeroUnico2;
                    array[i].NumeroUnico1ID = array[i].NumeroUnico1ID == "" ? 0 : array[i].NumeroUnico1ID;
                    array[i].NumeroUnico2ID = array[i].NumeroUnico2ID == "" ? 0 : array[i].NumeroUnico2ID;
                    if (array[i].FechaInspeccion != null) {
                        array[i].FechaInspeccion = new Date(ObtenerDato(array[i].FechaInspeccion, 1), ObtenerDato(array[i].FechaInspeccion, 2), ObtenerDato(array[i].FechaInspeccion, 3));//año, mes, dia
                    }
                    ds.add(array[i]);
                }
            }
            if (array.length > 0 && !($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit"))
                displayNotify("", _dictionary.DimensionalVisualMensajeJuntasAgregadas[$("#language").data("kendoDropDownList").value()] + jointsAdded, '0');
            deshabilitaSpool();
            loadingStop();
        });
    } catch (e) {
        displayNotify("Mensajes_error", e.message, '2');
    }
}

function AjaxGuardado(jSonCaptura, tipoGuardar) {
    Captura = [];
    Captura[0] = { Detalles: "" };
    var existRowEmpty = false;
    var capturaSinDimensional = false;
    var capturaSinVisual = false;

    inspeccionDimensional = [];

    Juntas = [];

    // Elementos del grid
    ListaDetalleGuardarInspeccionVisual = []

    // Elementos Inspección Dimensional
    inspeccionDimensional[0] = { Accion: "", Lenguaje: "", InspeccionDimensionalID: "", OrdenTrabajoSpoolID: "", FechaInspeccion: "", ResultadoID: "", ObreroID: "", DefectoID: "", ListaDetalleGuardarInspeccionVisual: "", ListaJuntas: "" }
    inspeccionDimensional[0].Lenguaje = $("#language").val();
    inspeccionDimensional[0].InspeccionDimensionalID = $("#InspeccionDimensionalID").val();
    inspeccionDimensional[0].OrdenTrabajoSpoolID = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor;
    inspeccionDimensional[0].FechaInspeccion = kendo.toString(new Date(), String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();

    var ResultadoDimensional = $('input:radio[name=ResultadoDimensional]:checked').val();
    var Defecto = $("#inputDefecto").data("kendoComboBox").select();
    var Inspector = $("#inputInspector").data("kendoComboBox").select();

    if (ResultadoDimensional == "Aprobado") inspeccionDimensional[0].ResultadoID = 1;
    else if (ResultadoDimensional == "Rechazado") inspeccionDimensional[0].ResultadoID = 2;
    else {
        inspeccionDimensional[0].ResultadoID = 0;
        capturaSinDimensional = true;
    }

    if (inspeccionDimensional[0].InspeccionDimensionalID == 0) inspeccionDimensional[0].Accion = 1;
    else inspeccionDimensional[0].Accion = 2;


    if (Defecto > 0) inspeccionDimensional[0].DefectoID = $("#inputDefecto").data("kendoComboBox").dataItem(Defecto).DefectoID;
    else if (ResultadoDimensional == "Rechazado") capturaSinDimensional = true;

    if (Inspector > 0) inspeccionDimensional[0].ObreroID = $("#inputInspector").data("kendoComboBox").dataItem(Inspector).ObreroID;
    else capturaSinDimensional = true;

    if (inspeccionDimensional[0].FechaInspeccion == "") capturaSinDimensional = true;

    // Proceso Juntas Dimensional
    var juntasListado = $("#ListaJuntas").data("kendoMultiSelect")._dataItems;
    if (juntasListado.length > 0) {
        for (var r = 0; r < juntasListado.length; r++) {
            Juntas[r] = { Accion: "", OrdenTrabajoSpoolID: "", DefectoID: "", JuntaID: "" }
            Juntas[r].DefectoID = Defecto > 0 ? $("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()).DefectoID : null;
            Juntas[r].JuntaID = $("#ListaJuntas").data("kendoMultiSelect")._dataItems[r].JuntaID;

            if (listadoJuntasInicialGlobal.length == 0) Juntas[r].Accion = 1;
            else {
                var existeJunta = false;
                for (var indexLista = 0; indexLista < listadoJuntasInicialGlobal.length; indexLista++)
                    if (listadoJuntasInicialGlobal[indexLista].JuntaID == $("#ListaJuntas").data("kendoMultiSelect")._dataItems[r].JuntaID) existeJunta = true;

                if (existeJunta) Juntas[r].Accion = 2;
                else Juntas[r].Accion = 1;
            }

            Juntas[r].OrdenTrabajoSpoolID = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor;
        }

        for (var indexAccion3 = 0; indexAccion3 < listadoJuntasInicialGlobal.length; indexAccion3++) {
            var existeJuntaGlobal = false;
            for (var indexMultiSelect = 0; indexMultiSelect < juntasListado.length; indexMultiSelect++)
                if (listadoJuntasInicialGlobal[indexAccion3].JuntaID == juntasListado[indexMultiSelect].JuntaID) existeJuntaGlobal = true;
            if (!existeJuntaGlobal)
                Juntas.push({
                    Accion: 3,
                    OrdenTrabajoSpoolID: $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor,
                    DefectoID: Defecto > 0 ? $("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()).DefectoID : null,
                    JuntaID: listadoJuntasInicialGlobal[indexAccion3].JuntaID
                });
        }
        inspeccionDimensional[0].ListaJuntas = Juntas;
        Captura[0].Detalles[0] = inspeccionDimensional;
    }
    else inspeccionDimensional[0].ListaJuntas = undefined;

    if (Defecto <= 0 && Inspector <= 0 && juntasListado.length == 0 && inspeccionDimensional[0].InspeccionDimensionalID != 0  ) {
        capturaSinDimensional = false;
        inspeccionDimensional[0].Accion = 3;
    }

    // Finaliza captura datos Dimensional

    // Comienza captura Visual
    for (index = 0; index < jSonCaptura.length; index++) {
        $('tr[data-uid="' + jSonCaptura[index].uid + '"] ').css("background-color", "#ffffff");

        ListaDetalleGuardarInspeccionVisual[index] = { Accion: "", OrdenTrabajoSpoolID: "", TipoJuntaID: "", EtiquetaJunta: "", EtiquetaMaterial1: "", EtiquetaMaterial2: "", DefectosID: "", InspectorID: "", FechaInspeccion: "", JuntaTrabajoID: "", ResultadoID: "", TallerID: "", NumeroUnico1ID: "", NumeroUnico2ID: "", InspeccionVisualID: "" };
        ListaDetalleGuardarInspeccionVisual[index].Accion = jSonCaptura[index].Accion;
        ListaDetalleGuardarInspeccionVisual[index].OrdenTrabajoSpoolID = jSonCaptura[index].OrdenTrabajoSpoolID == null ? 0 : jSonCaptura[index].OrdenTrabajoSpoolID;
        ListaDetalleGuardarInspeccionVisual[index].TipoJuntaID = jSonCaptura[index].TipoJuntaID == null ? 0 : jSonCaptura[index].TipoJuntaID;
        ListaDetalleGuardarInspeccionVisual[index].EtiquetaJunta = jSonCaptura[index].Junta;
        ListaDetalleGuardarInspeccionVisual[index].EtiquetaMaterial1 = jSonCaptura[index].EtiquetaMaterial1;
        ListaDetalleGuardarInspeccionVisual[index].EtiquetaMaterial2 = jSonCaptura[index].EtiquetaMaterial2;
        ListaDetalleGuardarInspeccionVisual[index].DefectosID = jSonCaptura[index].DefectosID == null ? 0 : jSonCaptura[index].DefectosID;
        ListaDetalleGuardarInspeccionVisual[index].ObreroID = (jSonCaptura[index].InspectorID == null || jSonCaptura[index].InspectorID == "") ? 0 : jSonCaptura[index].InspectorID;
        ListaDetalleGuardarInspeccionVisual[index].FechaInspeccion = jSonCaptura[index].FechaInspeccion == null ? " " : kendo.toString(jSonCaptura[index].FechaInspeccion, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();
        ListaDetalleGuardarInspeccionVisual[index].JuntaTrabajoID = jSonCaptura[index].JuntaTrabajoID == null ? 0 : jSonCaptura[index].JuntaTrabajoID;
        ListaDetalleGuardarInspeccionVisual[index].ResultadoID = jSonCaptura[index].ResultadoID == null ? 0 : jSonCaptura[index].ResultadoID;
        ListaDetalleGuardarInspeccionVisual[index].TallerID = jSonCaptura[index].TallerID == null ? 0 : jSonCaptura[index].TallerID;
        ListaDetalleGuardarInspeccionVisual[index].NumeroUnico1ID = jSonCaptura[index].NumeroUnico1ID;
        ListaDetalleGuardarInspeccionVisual[index].NumeroUnico2ID = jSonCaptura[index].NumeroUnico2ID;
        ListaDetalleGuardarInspeccionVisual[index].InspeccionVisualID = jSonCaptura[index].InspeccionVisualID;

        if ((ListaDetalleGuardarInspeccionVisual[index].TallerID == "" || ListaDetalleGuardarInspeccionVisual[index].TallerID == "0" ||
            ListaDetalleGuardarInspeccionVisual[index].ResultadoID == "" || ListaDetalleGuardarInspeccionVisual[index].ResultadoID == "0" ||
            ((ListaDetalleGuardarInspeccionVisual[index].DefectosID == "" || ListaDetalleGuardarInspeccionVisual[index].DefectosID == "0" || ListaDetalleGuardarInspeccionVisual[index].DefectosID == null) && ListaDetalleGuardarInspeccionVisual[index].ResultadoID == 2) ||
            ListaDetalleGuardarInspeccionVisual[index].ObreroID == "" || ListaDetalleGuardarInspeccionVisual[index].ObreroID == "0" ||
            ListaDetalleGuardarInspeccionVisual[index].FechaInspeccion == " " || ListaDetalleGuardarInspeccionVisual[index].FechaInspeccion == "0" ||
            ListaDetalleGuardarInspeccionVisual[index].NumeroUnico1ID == "" || ListaDetalleGuardarInspeccionVisual[index].NumeroUnico1ID == "0" || ListaDetalleGuardarInspeccionVisual[index].NumeroUnico1ID == null ||
            ListaDetalleGuardarInspeccionVisual[index].NumeroUnico2ID == "" || ListaDetalleGuardarInspeccionVisual[index].NumeroUnico2ID == "0" || ListaDetalleGuardarInspeccionVisual[index].NumeroUnico2ID == null
            ) && ListaDetalleGuardarInspeccionVisual[index].Accion != 4) {

            if (ListaDetalleGuardarInspeccionVisual[index].Accion == 2) ListaDetalleGuardarInspeccionVisual[index].Accion = 4;

            ListaDetalleGuardarInspeccionVisual[index].Estatus = 0;
            $('tr[data-uid="' + jSonCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
            existRowEmpty = true;
            //ListaDetalleGuardarInspeccionVisual.pop();
        }
        else if (ListaDetalleGuardarInspeccionVisual[index].Accion == 4) {
            if (!(ListaDetalleGuardarInspeccionVisual[index].TallerID == "" || ListaDetalleGuardarInspeccionVisual[index].TallerID == "0" ||
            ListaDetalleGuardarInspeccionVisual[index].ResultadoID == "" || ListaDetalleGuardarInspeccionVisual[index].ResultadoID == "0" ||
            ((ListaDetalleGuardarInspeccionVisual[index].DefectosID == "" || ListaDetalleGuardarInspeccionVisual[index].DefectosID == "0" || ListaDetalleGuardarInspeccionVisual[index].DefectosID == null) && ListaDetalleGuardarInspeccionVisual[index].ResultadoID == 2) ||
            ListaDetalleGuardarInspeccionVisual[index].ObreroID == "" || ListaDetalleGuardarInspeccionVisual[index].ObreroID == "0" ||
            ListaDetalleGuardarInspeccionVisual[index].FechaInspeccion == " " || ListaDetalleGuardarInspeccionVisual[index].FechaInspeccion == "0" ||
            ListaDetalleGuardarInspeccionVisual[index].NumeroUnico1ID == "" || ListaDetalleGuardarInspeccionVisual[index].NumeroUnico1ID == "0" || ListaDetalleGuardarInspeccionVisual[index].NumeroUnico1ID == null ||
            ListaDetalleGuardarInspeccionVisual[index].NumeroUnico2ID == "" || ListaDetalleGuardarInspeccionVisual[index].NumeroUnico2ID == "0" || ListaDetalleGuardarInspeccionVisual[index].NumeroUnico2ID == null)) {

                ListaDetalleGuardarInspeccionVisual[index].Estatus = 0;
                $('tr[data-uid="' + jSonCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                existRowEmpty = true;
            }
        }
    }

    // Finaliza captura Visual

    // Filtro grid por status
    var ListaDetalleGuardarFiltroStatus = [];
    for (var x = 0; x < ListaDetalleGuardarInspeccionVisual.length; x++)
        if (ListaDetalleGuardarInspeccionVisual[x].Estatus != 0) ListaDetalleGuardarFiltroStatus.push(ListaDetalleGuardarInspeccionVisual[x]);

    if (ListaDetalleGuardarFiltroStatus.length <= 0) capturaSinVisual = true;

    if (inspeccionDimensional.length > 0) inspeccionDimensional[0].ListaDetalleGuardarInspeccionVisual = ListaDetalleGuardarFiltroStatus;
    else capturaSinVisual = true;

    if (inspeccionDimensional[0].ListaJuntas == undefined || inspeccionDimensional[0].ListaJuntas.length == 0) {
        inspeccionDimensional[0].ListaJuntas = [];
        inspeccionDimensional[0].ListaJuntas.push({ Accion: 0, OrdenTrabajoSpoolID: "", DefectoID: "", JuntaID: "" });
        if ($("#inputDefecto").data("kendoComboBox").dataItem(Defecto) != undefined)
            if ($("#inputDefecto").data("kendoComboBox").dataItem(Defecto).TIPO != "NoEspecificarJunta") capturaSinDimensional = true;
    }

    // Asignación de elementos vacios de prueba
    if (capturaSinDimensional)
        Captura[0].Detalles = [{ Lenguaje: "", InspeccionDimensionalID: 0, OrdenTrabajoSpoolID: 0, FechaInspeccion: "", ResultadoID: 0, ObreroID: 0, DefectoID: 0, ListaDetalleGuardarInspeccionVisual: undefined, ListaJuntas: undefined }];
    else Captura[0].Detalles = inspeccionDimensional;

    if (capturaSinVisual)
        ListaDetalleGuardarFiltroStatus[0] = { Accion: 0, OrdenTrabajoSpoolID: 0, TipoJuntaID: "", EtiquetaJunta: "", EtiquetaMaterial1: "", EtiquetaMaterial2: "", DefectosID: 0, ObreroID: 0, FechaInspeccion: "", JuntaTrabajoID: 0, ResultadoID: 0, TallerID: 0, NumeroUnico1ID: 0, NumeroUnico2ID: 0, InspeccionVisualID: 0 };
    else Captura[0].Detalles[0].ListaDetalleGuardarInspeccionVisual = ListaDetalleGuardarFiltroStatus;

    if (capturaSinDimensional && !capturaSinVisual) Captura[0].Detalles[0].ListaDetalleGuardarInspeccionVisual = ListaDetalleGuardarFiltroStatus;

    Captura[0].Detalles[0].ListaJuntas = inspeccionDimensional[0].ListaJuntas;

    windowTemplate = kendo.template($("#windowTemplate").html());
    ventanaConfirm = $("#ventanaConfirm").kendoWindow({
        iframe: true,
        title: _dictionary.CapturaAvanceIntAcabadoMensajeErrorGuardado[$("#language").data("kendoDropDownList").value()],
        visible: false, //the window will not appear before its .open method is called
        width: "auto",
        height: "auto",
        modal: true,
        animation: {
            close: false,
            open: false
        }
    }).data("kendoWindow");

    ventanaConfirm.content(_dictionary.CapturaGuardarInformacionConNumerosUnicos[$("#language").data("kendoDropDownList").value()] +
             "</br><center><button class='btn btn-blue' id='noButton'>Ok</button></center>");

    if (existRowEmpty) {
        ventanaConfirm.open().center();

        //$("#yesButton").click(function () {
        //    loadingStart();
        //    ejecutaGuardado(Captura, capturaSinDimensional, capturaSinVisual, tipoGuardar);

        //    ventanaConfirm.close();
        //});

        $("#noButton").click(function () {
            ventanaConfirm.close();
            opcionHabilitarView(false, "FieldSetView");
        });
    }
    else {
        loadingStart();
        ejecutaGuardado(Captura, capturaSinDimensional, capturaSinVisual, tipoGuardar);
    }
}

function ejecutaGuardado(Captura, guardadoSinInspeccionDimensional, guardadoSinInspeccionVisual, tipoGuardar) {
    if (guardadoSinInspeccionDimensional && guardadoSinInspeccionVisual) {
        displayNotify("DimensionalVisualMensajeNoHayDatosPorGuardar", "", '1');
        loadingStop();
    }
    else $Inspeccion.Inspeccion.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            $("#grid").data('kendoGrid').dataSource.data([]);

            if (!guardadoSinInspeccionDimensional && !guardadoSinInspeccionVisual) {
                displayNotify("CapturaMensajeGuardadoExitoso", "", '0');
            }
            else if (guardadoSinInspeccionDimensional) {
                displayNotify("DimensionalVisualMensajeGuardadoVisual", "", '0');
            }
            else if (guardadoSinInspeccionVisual) {
                displayNotify("DimensionalVisualMensajeGuardadoDimensional", "", '0');
            }
            if (tipoGuardar == 1) {
                opcionHabilitarView(false, "FieldSetView");
                limpiar();
                LimpiarPlanchado();
                habilitaSpool();
            }
            else {
                opcionHabilitarView(true, "FieldSetSetView");
                AjaxobtenerDetalleDimensional($("#InputID").val());
                AjaxObtenerJSonGrid();
            }
        }
        else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
            displayNotify("CapturaMensajeGuardadoErroneo", "", '2');
            opcionHabilitarView(false, "FieldSetView");
            deshabilitaSpool();

        }
        loadingStop();
    });
}

function ObtenerDato(fecha, tipoDatoObtener) {
    var cultura = $("#language").val();

    switch (tipoDatoObtener) {
        case 1://anho
            return fecha.split('/')[2]
            break;
        case 2://mes
            if (cultura = 'es-MX')
                return fecha.split('/')[1]
            else
                return fecha.split('/')[0]
            break;
        case 3://dia
            if (cultura = 'es-MX')
                return fecha.split('/')[0]
            else
                return fecha.split('/')[1]
            break;
    }
}

function validaTaller(ListaDetalleGuardar) {
    for (var i = 0; i < ListaDetalleGuardar.length; i++) {
        if (ListaDetalleGuardar[i] == undefined || ListaDetalleGuardar[i].TallerID == null || ListaDetalleGuardar[i].TallerID == 0) {
            return false;
        }
    }
    return true;
}

function validaDefectos(ListaDetalleGuardar) {
    for (var i = 0; i < ListaDetalleGuardar.length; i++) {
        if (ListaDetalleGuardar[i].DefectosID == null && ListaDetalleGuardar[i].ResultadoID == 2) {
            return false;
        }
    }
    return true;
}

function validaResultado(ListaDetalleGuardar) {
    for (var i = 0; i < ListaDetalleGuardar.length; i++) {
        if (ListaDetalleGuardar[i].ResultadoID == null) {
            return false;
        }
    }
    return true;
}

function validaInspector(ListaDetalleGuardar) {
    for (var i = 0; i < ListaDetalleGuardar.length; i++) {
        if (ListaDetalleGuardar[i].ObreroID == "") {
            return false;
        }
    }
    return true;
}

function validaNumeroUnico1(ListaDetalleGuardar) {
    for (var i = 0; i < ListaDetalleGuardar.length; i++) {
        if (ListaDetalleGuardar[i].NumeroUnico1ID == 0) {
            return false;
        }
    }
    return true;
}

function validaNumeroUnico2(ListaDetalleGuardar) {
    for (var i = 0; i < ListaDetalleGuardar.length; i++) {
        if (ListaDetalleGuardar[i].NumeroUnico2ID == 0) {
            return false;
        }
    }
    return true;
}
