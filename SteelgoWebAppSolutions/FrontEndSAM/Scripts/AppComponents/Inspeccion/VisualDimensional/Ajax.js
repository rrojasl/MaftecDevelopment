var TipoObrero = "Inspector Visual Dimensional";
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
    loadingStart();
    $Inspeccion.Inspeccion.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), id: spoolID, sinCaptura: 1, token: Cookies.get("token"), todos: 1 }).done(function (data) {
        if (Error(data)) {
            limpiarJuntaMultiselect();
            $("#ListaJuntas").data("kendoMultiSelect").dataSource.data(data);
            loadingStop();
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
    loadingStart();

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
        loadingStop();
        deshabilitaSpool();
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
                    if (array[i].FechaInspeccion != null) {
                        array[i].FechaInspeccion = new Date(ObtenerDato(array[i].FechaInspeccion, 1), ObtenerDato(array[i].FechaInspeccion, 2), ObtenerDato(array[i].FechaInspeccion, 3));//año, mes, dia
                    }
                    ds.add(array[i]);
                }
            }
            if (array.length > 0)
                displayNotify("", _dictionary.DimensionalVisualMensajeJuntasAgregadas[$("#language").data("kendoDropDownList").value()] + jointsAdded, '0');
            loadingStop();
        });
    } catch (e) {
        displayNotify("Mensajes_error", e.message, '2');
    }
}

function AjaxGuardar(jSonCaptura) {
    Captura = [];
    Captura[0] = { Detalles: "" };
    var existRowEmpty = false;
    inspeccionDimensional = [];

    Juntas = [];

    // Elementos del grid
    ListaDetalleGuardarInspeccionVisual = []
    for (index = 0; index < jSonCaptura.length; index++) {
        $('tr[data-uid="' + jSonCaptura[index].uid + '"] ').css("background-color", "#ffffff");

        ListaDetalleGuardarInspeccionVisual[index] = { Accion: "", OrdenTrabajoSpoolID: "", TipoJuntaID: "", EtiquetaJunta: "", EtiquetaMaterial1: "", EtiquetaMaterial2: "", DefectosID: "", InspectorID: "", FechaInspeccion: "", JuntaTrabajoID: "", ResultadoID: "", TallerID: "", NumeroUnico1ID: "", NumeroUnico2ID: "", InspeccionVisualID: "" };
        ListaDetalleGuardarInspeccionVisual[index].Accion = jSonCaptura[index].Accion;
        ListaDetalleGuardarInspeccionVisual[index].OrdenTrabajoSpoolID = jSonCaptura[index].OrdenTrabajoSpoolID;
        ListaDetalleGuardarInspeccionVisual[index].TipoJuntaID = jSonCaptura[index].TipoJuntaID;
        ListaDetalleGuardarInspeccionVisual[index].EtiquetaJunta = jSonCaptura[index].Junta;
        ListaDetalleGuardarInspeccionVisual[index].EtiquetaMaterial1 = jSonCaptura[index].EtiquetaMaterial1;
        ListaDetalleGuardarInspeccionVisual[index].EtiquetaMaterial2 = jSonCaptura[index].EtiquetaMaterial2;
        ListaDetalleGuardarInspeccionVisual[index].DefectosID = jSonCaptura[index].DefectosID;
        ListaDetalleGuardarInspeccionVisual[index].InspectorID = jSonCaptura[index].InspectorID;
        ListaDetalleGuardarInspeccionVisual[index].FechaInspeccion = jSonCaptura[index].FechaInspeccion == null ? "" : kendo.toString(jSonCaptura[index].FechaInspeccion, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();
        ListaDetalleGuardarInspeccionVisual[index].JuntaTrabajoID = jSonCaptura[index].JuntaTrabajoID;
        ListaDetalleGuardarInspeccionVisual[index].ResultadoID = jSonCaptura[index].ResultadoID;
        ListaDetalleGuardarInspeccionVisual[index].TallerID = jSonCaptura[index].TallerID;
        ListaDetalleGuardarInspeccionVisual[index].NumeroUnico1ID = jSonCaptura[index].NumeroUnico1ID;
        ListaDetalleGuardarInspeccionVisual[index].NumeroUnico2ID = jSonCaptura[index].NumeroUnico2ID;
        ListaDetalleGuardarInspeccionVisual[index].InspeccionVisualID = jSonCaptura[index].InspeccionVisualID;

        if ((ListaDetalleGuardarInspeccionVisual[index].TallerID == "" || ListaDetalleGuardarInspeccionVisual[index].TallerID == "0" ||
            ListaDetalleGuardarInspeccionVisual[index].ResultadoID == "" || ListaDetalleGuardarInspeccionVisual[index].ResultadoID == "0" ||
            ((ListaDetalleGuardarInspeccionVisual[index].DefectosID == "" || ListaDetalleGuardarInspeccionVisual[index].DefectosID == "0" || ListaDetalleGuardarInspeccionVisual[index].DefectosID == null) && ListaDetalleGuardarInspeccionVisual[index].ResultadoID == 2) ||
            ListaDetalleGuardarInspeccionVisual[index].InspectorID == "" || ListaDetalleGuardarInspeccionVisual[index].InspectorID == "0" ||
            ListaDetalleGuardarInspeccionVisual[index].FechaInspeccion == "" || ListaDetalleGuardarInspeccionVisual[index].FechaInspeccion == "0"
            //ListaDetalleGuardarInspeccionVisual[index].NumeroUnico1ID == "" || ListaDetalleGuardarInspeccionVisual[index].NumeroUnico1ID == "0" ||
            //ListaDetalleGuardarInspeccionVisual[index].NumeroUnico2ID == "" || ListaDetalleGuardarInspeccionVisual[index].NumeroUnico2ID == "0"
            ) && (ListaDetalleGuardarInspeccionVisual[index].Accion == 1 || ListaDetalleGuardarInspeccionVisual[index].Accion == 2)) {

            ListaDetalleGuardarInspeccionVisual[index].Accion = 4;
            ListaDetalleGuardarInspeccionVisual[index].Estatus = 0;
            $('tr[data-uid="' + jSonCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
            existRowEmpty = true;
            ListaDetalleGuardarInspeccionVisual.pop();
        }
    }

    //Guardado módulo Dimensional
    if ($('input:radio[name=ResultadoDimensional]:checked').val() != undefined
        && $("#inputInspector").data("kendoComboBox").dataItem($("#inputInspector").data("kendoComboBox").select()) != undefined
        && String(endRangeDate.val()).trim() != ""
        && (($("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()).TIPO != "NoEspecificarJunta" && $("#ListaJuntas").data("kendoMultiSelect")._dataItems.length > 0) ||
            ($("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()).TIPO == "NoEspecificarJunta" && $("#ListaJuntas").data("kendoMultiSelect")._dataItems.length == 0))) {

        if (($('input:radio[name=ResultadoDimensional]:checked').val() == "Rechazado" && $("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()).DefectoID != 0)
            || ($('input:radio[name=ResultadoDimensional]:checked').val() == "Aprobado" && $("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()).DefectoID == 0)) {

            if ($('input:radio[name=ResultadoDimensional]:checked').val() != undefined) {
                if ($("#inputInspector").data("kendoComboBox").dataItem($("#inputInspector").data("kendoComboBox").select()) != undefined) {
                    inspeccionDimensional[0] = { Lenguaje: "", InspeccionDimensionalID: "", OrdenTrabajoSpoolID: "", FechaInspeccion: "", ResultadoID: "", ObreroID: "", DefectoID: "", ListaDetalleGuardarInspeccionVisual: "", ListaJuntas: "" }
                    inspeccionDimensional[0].Lenguaje = $("#language").val();
                    inspeccionDimensional[0].InspeccionDimensionalID = $("#InspeccionDimensionalID").val();
                    inspeccionDimensional[0].OrdenTrabajoSpoolID = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor;
                    inspeccionDimensional[0].FechaInspeccion = kendo.toString(new Date(), String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();
                    inspeccionDimensional[0].ResultadoID = $('input:radio[name=ResultadoDimensional]:checked').val() == "Aprobado" ? 1 : 2;
                    inspeccionDimensional[0].ObreroID = $("#inputInspector").data("kendoComboBox").dataItem($("#inputInspector").data("kendoComboBox").select()).ObreroID;
                    inspeccionDimensional[0].DefectoID = $("#inputDefecto").data("kendoComboBox").select() <= 0 ? null : $("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()).DefectoID;
                    inspeccionDimensional[0].ListaDetalleGuardarInspeccionVisual = ListaDetalleGuardarInspeccionVisual;

                    if ($("#ListaJuntas").data("kendoMultiSelect")._dataItems.length > 0) {
                        for (var r = 0; r < $("#ListaJuntas").data("kendoMultiSelect")._dataItems.length; r++) {
                            Juntas[r] = { Accion: "", OrdenTrabajoSpoolID: "", DefectoID: "", JuntaID: "" }
                            Juntas[r].DefectoID = $("#inputDefecto").data("kendoComboBox").select() <= 0 ? null : $("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()).DefectoID;
                            Juntas[r].JuntaID = $("#ListaJuntas").data("kendoMultiSelect")._dataItems[r].JuntaID;

                            if (listadoJuntasInicialGlobal.length == 0) {
                                Juntas[r].Accion = 1;
                            }
                            else {
                                var existeJunta = false;
                                for (var indexLista = 0; indexLista < listadoJuntasInicialGlobal.length; indexLista++) {
                                    if (listadoJuntasInicialGlobal[indexLista].JuntaID == $("#ListaJuntas").data("kendoMultiSelect")._dataItems[r].JuntaID) {
                                        existeJunta = true;
                                    }
                                }
                                if (existeJunta)
                                    Juntas[r].Accion = 2;
                                else Juntas[r].Accion = 1;
                            }

                            Juntas[r].OrdenTrabajoSpoolID = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor;
                        }

                        var dataItemsMultiSelect = $("#ListaJuntas").data("kendoMultiSelect")._dataItems;

                        for (var indexAccion3 = 0; indexAccion3 < listadoJuntasInicialGlobal.length; indexAccion3++) {
                            var existeJuntaGlobal = false;
                            for (var indexMultiSelect = 0; indexMultiSelect < dataItemsMultiSelect.length; indexMultiSelect++) {
                                if (listadoJuntasInicialGlobal[indexAccion3].JuntaID == dataItemsMultiSelect[indexMultiSelect].JuntaID) {
                                    existeJuntaGlobal = true;
                                }
                            }
                            if (!existeJuntaGlobal) {
                                Juntas.push({
                                    Accion: 3,
                                    OrdenTrabajoSpoolID: $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor,
                                    DefectoID: $("#inputDefecto").data("kendoComboBox").select() <= 0 ? null : $("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()).DefectoID,
                                    JuntaID: listadoJuntasInicialGlobal[indexAccion3].JuntaID
                                });
                            }
                        }
                        inspeccionDimensional[0].ListaJuntas = Juntas;
                        Captura[0].Detalles = inspeccionDimensional;
                    }
                    else
                        inspeccionDimensional[0].ListaJuntas = undefined;
                }
                else {
                    displayNotify("DimensionalVisualMensajeErrorInspector", "", '1');
                    opcionHabilitarView(false, "FieldSetView");
                    deshabilitaSpool();
                }
            }
            else {
                displayNotify("DimensionalVisualMensajeErrorResultado", "", '1');
                opcionHabilitarView(false, "FieldSetView");
                deshabilitaSpool();
            }
        }
        else {
            displayNotify("DimensionalVisualMensajeDefectoRechazado", "", '1');
            opcionHabilitarView(false, "FieldSetView");
            deshabilitaSpool();
        }
    }
    else if ($('input:radio[name=ResultadoDimensional]:checked').val() != undefined) {
        displayNotify("DimensionalVisualMensajeErrorDimensional", "", '1');
        opcionHabilitarView(false, "FieldSetView");
        deshabilitaSpool();
    }
    //Guardado módulo Dimensional
    if (inspeccionDimensional.length != 0 && inspeccionDimensional[0].ListaDetalleGuardarInspeccionVisual.length > 0) {
        if (validaTaller(inspeccionDimensional[0].ListaDetalleGuardarInspeccionVisual)) {
            if (validaDefectos(inspeccionDimensional[0].ListaDetalleGuardarInspeccionVisual)) {
                if (validaResultado(inspeccionDimensional[0].ListaDetalleGuardarInspeccionVisual)) {
                    if (validaInspector(inspeccionDimensional[0].ListaDetalleGuardarInspeccionVisual)) {
                        //if (validaNumeroUnico1(inspeccionDimensional[0].ListaDetalleGuardarInspeccionVisual)) {
                        //    if (validaNumeroUnico2(inspeccionDimensional[0].ListaDetalleGuardarInspeccionVisual)) {
                        Captura[0].Detalles = inspeccionDimensional;
                        //loadingStart();
                        //$Inspeccion.Inspeccion.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                        //    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                        //        mensaje = "Se guardo correctamente la informacion" + "-0";
                        //        displayNotify("CapturaMensajeGuardadoExitoso", "", '0');
                        //        AjaxobtenerDetalleDimensional($("#InputID").val());
                        //        AjaxObtenerJSonGrid();
                        //    }
                        //    else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                        //        mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
                        //        displayNotify("CapturaMensajeGuardadoErroneo", "", '2');
                        //        opcionHabilitarView(false, "FieldSetView");
                        //    }
                        //    loadingStop();
                        //    var newDataSource = $("#grid").data("kendoGrid").dataSource;
                        //});
                        //    }
                        //    else {
                        //        displayNotify("DimensionalVisualMensajeErrorNumeroUnico2", "", '2');
                        //        opcionHabilitarView(false, "FieldSetView");
                        //        deshabilitaSpool();
                        //    }
                        //}
                        //else {
                        //    displayNotify("DimensionalVisualMensajeErrorNumeroUnico1", "", '2');
                        //    opcionHabilitarView(false, "FieldSetView");
                        //    deshabilitaSpool();
                        //}
                    }
                    else {
                        displayNotify("DimensionalVisualMensajeErrorInspector", "", '2');
                        opcionHabilitarView(false, "FieldSetView");
                        deshabilitaSpool();
                    }
                }
                else {
                    displayNotify("DimensionalVisualMensajeErrorResultado", "", '2');
                    opcionHabilitarView(false, "FieldSetView");
                    deshabilitaSpool();
                }
            }
            else {
                displayNotify("DimensionalVisualMensajeErrorDefectos", "", '2');
                opcionHabilitarView(false, "FieldSetView");
                deshabilitaSpool();
            }
        }
        else {
            displayNotify("DimensionalVisualMensajeErrorTaller", "", '2');
            opcionHabilitarView(false, "FieldSetView");
            deshabilitaSpool();
        }
    }

    if (inspeccionDimensional.length != 0 || ListaDetalleGuardarInspeccionVisual.length != 0) {
        if (inspeccionDimensional.length == 0) {
            inspeccionDimensional[0] = { Lenguaje: "", InspeccionDimensionalID: 0, OrdenTrabajoSpoolID: 0, FechaInspeccion: "", ResultadoID: 0, ObreroID: 0, DefectoID: 0, ListaDetalleGuardarInspeccionVisual: "", ListaJuntas: "" };
        } else if (ListaDetalleGuardarInspeccionVisual == 0) {
            ListaDetalleGuardarInspeccionVisual[0] = { Accion: 0, OrdenTrabajoSpoolID: 0, TipoJuntaID: "", EtiquetaJunta: "", EtiquetaMaterial1: "", EtiquetaMaterial2: "", DefectosID: 0, InspectorID: 0, FechaInspeccion: "", JuntaTrabajoID: 0, ResultadoID: 0, TallerID: 0, NumeroUnico1ID: 0, NumeroUnico2ID: 0, InspeccionVisualID: 0 };
        }
        if (inspeccionDimensional[0].ListaJuntas == undefined || inspeccionDimensional[0].ListaJuntas.length == 0) {
            inspeccionDimensional[0].ListaJuntas = { Accion: 0, OrdenTrabajoSpoolID: "", DefectoID: "", JuntaID: "" };
        }

        inspeccionDimensional[0].ListaDetalleGuardarInspeccionVisual = ListaDetalleGuardarInspeccionVisual;
        Captura[0].Detalles = inspeccionDimensional;

        loadingStop();
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

        ventanaConfirm.content(_dictionary.CapturaAvanceIntAcabadoMensajePreguntaGuardado[$("#language").data("kendoDropDownList").value()] +
            "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

        if (existRowEmpty) {
            ventanaConfirm.open().center();

            $("#yesButton").click(function () {
                loadingStart();
                $Inspeccion.Inspeccion.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                        $("#grid").data('kendoGrid').dataSource.data([]);
                        displayNotify("CapturaMensajeGuardadoExitoso", "", '0');
                        AjaxobtenerDetalleDimensional($("#InputID").val());
                        AjaxObtenerJSonGrid();
                    }
                    else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                        displayNotify("CapturaMensajeGuardadoErroneo", "", '2');
                        opcionHabilitarView(false, "FieldSetView");
                        deshabilitaSpool();

                    }
                    loadingStop();
                });

                ventanaConfirm.close();
            });

            $("#noButton").click(function () {
                ventanaConfirm.close();
            });
        }
        else {
            loadingStart();
            $Inspeccion.Inspeccion.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    displayNotify("CapturaMensajeGuardadoExitoso", "", '0');
                    AjaxobtenerDetalleDimensional($("#InputID").val());
                    AjaxObtenerJSonGrid();
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    displayNotify("CapturaMensajeGuardadoErroneo", "", '2');
                    opcionHabilitarView(false, "FieldSetView");
                    deshabilitaSpool();

                }
                loadingStop();
            });
        }
    }
    else {
        displayNotify("DimensionalVisualMensajeNoHayDatosPorGuardar", "", '1');
        opcionHabilitarView(false, "FieldSetView");
        deshabilitaSpool();
    }
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
        if (ListaDetalleGuardar[i] == undefined || ListaDetalleGuardar[i].TallerID == null) {
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
        if (ListaDetalleGuardar[i].InspectorID == "") {
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
