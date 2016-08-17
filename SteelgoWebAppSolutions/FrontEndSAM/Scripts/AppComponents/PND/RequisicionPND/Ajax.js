//var CampoFechaDimensionalPredeterminada = 2047;

function ajaxObtenerTipoPruebas() {
    var proyecto = parseInt($("#Proyecto").val());
    $Pruebas.Pruebas.read({ token: Cookies.get("token"), proyectoID: proyecto, lenguaje: $("#language").val() }).done(function (data) {
        //$("#tipoPrueba").data("kendoComboBox").value("");
        $("#tipoPrueba").data("kendoComboBox").dataSource.data(data);
    });
}

function ajaxObtenerTipoPruebasRequisicionEdicion() {
    loadingStart();
    var proyecto = parseInt($("#Proyecto").val());
    $Pruebas.Pruebas.read({ token: Cookies.get("token"), proyectoID: proyecto, lenguaje: $("#language").val() }).done(function (data) {
        //$("#tipoPrueba").data("kendoComboBox").value("");
        $("#tipoPrueba").data("kendoComboBox").dataSource.data(data);
        $("#tipoPrueba").data("kendoComboBox").value(pruebasID);
        ajaxObtenerJuntasSoldadas(pruebasID);
        loadingStop();
    });
}

function ajaxRequisicion() {
    loadingStart();
    if (requisicionID != 0) {
        $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), requisicionID: requisicionID }).done(function (data) {
            //var NewDate = kendo.toString(data[0].FechaRequisicion, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
            //endRangeDate.val(NewDate);
            requisicionID = data[0].RequisicionID;
            EstatusID = data[0].EstatusID;
            pruebasID = data[0].PruebasID;
            ProyectoNombre = data[0].Nombre;
            ProyectoID = data[0].ProyectoID;
            PruebaNombre = data[0].Prueba;
            $("#Folio").text(data[0].Folio);
            $("#Proyecto").data("kendoComboBox").value(data[0].proyectoID);
            loadingStop();

        });
    }
    else {
        requisicionID = 0;
        EstatusID = 1;
        $("#Folio").text("Sin asignar");
        //$("#Fecha").data("kendoDatePicker").value("");
        loadingStop();
    }

}

function AjaxObtenerSpoolID() {
    var OrdenTrabajoOriginal = $("#InputOrdenTrabajo").val();
    var proyectoID = $("#Proyecto").data("kendoComboBox")._selectedValue;
    var proyectoName = $("#Proyecto").data("kendoComboBox")._prev;
    $GenerarRequisicion.GenerarRequisicion.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            for (i = data.idStatus.length - 1; i >= 0; i--) {
                if (data.idStatus[i].ProyectoID != proyectoID)
                    data.idStatus.splice(i, 1);
            }
            if (data.idStatus.length == 0) {
                data.OrdenTrabajo = "";
                $("#InputOrdenTrabajo").val("");
                displayNotify("", _dictionary.GenerarRequisicionExisteJunta1[$("#language").data("kendoDropDownList").value()] + OrdenTrabajoOriginal + _dictionary.GenerarRequisicionExisteJunta2[$("#language").data("kendoDropDownList").value()] + proyectoName, '1');
            }
            else if (data.OrdenTrabajo != "") {
                $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
            }
            else {
                $("#InputOrdenTrabajo").val(OrdenTrabajoOriginal);
                displayNotify("CapturaArmadoMensajeOrdenTrabajoNoEncontrada", "", '1');
            }

            $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
            Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
        }
    });
}

function ajaxObtenerProyectos() {
    $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token") }).done(function (data) {
        $("#Proyecto").data("kendoComboBox").value("");
        $("#Proyecto").data("kendoComboBox").dataSource.data(data);
    });
}

function ajaxObtenerJuntasSoldadas(ProyectoID) {
    loadingStart();

    $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token"), proyectoID: ProyectoID, pruebaID: $("#tipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#tipoPrueba").data("kendoComboBox").value(), requisicionID: $("#listaFolio").data("kendoComboBox").value() == "" ? 0 : $("#listaFolio").data("kendoComboBox").value(), todos: $('input:radio[name=Muestra]:checked').val(), lenguaje: $("#language").val() }).done(function (data) {
        if ($("#listaFolio").data("kendoComboBox").value() != "" && $("#listaFolio").data("kendoComboBox").value() != "0" && $("#listaFolio").data("kendoComboBox").value() != 0) {
            $("#Proyecto").data("kendoComboBox").value(data[0].ProyectoID);

            if ($("#tipoPrueba").data("kendoComboBox").dataSource.data().length == 0) {
                $Pruebas.Pruebas.read({ token: Cookies.get("token"), proyectoID: data[0].ProyectoID, lenguaje: $("#language").val() }).done(function (result) {
                    //$("#tipoPrueba").data("kendoComboBox").value("");
                    $("#tipoPrueba").data("kendoComboBox").dataSource.data(result);

                    $("#tipoPrueba").data("kendoComboBox").value(data[0].PruebasID);
                });
            } else
                $("#tipoPrueba").data("kendoComboBox").value(data[0].PruebasID);
        }

        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }

        var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;

        var ds = $("#grid").data("kendoGrid").dataSource;
        ds = jsonGridArmado;

        loadingStop();
    });
}

function AjaxCargarCamposPredeterminados() {
    loadingStart();

    //$ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoFechaDimensionalPredeterminada }).done(function (data) {
    //    var NewDate = kendo.toString(data, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
    //    endRangeDate.val(NewDate);
    //});

    $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.Muestra == "Sincaptura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
            //$('input:radio[name=Muestra]:nth(1)').removeAttr('checked');
        }
        else if (data.Muestra == "Todos") {
            //$('input:radio[name=Muestra]:nth(0)').removeAttr('checked');
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
        loadingStop();
        cargaInicialRequisicionEditar();
    });

    AjaxListaRequisiciones(0);
};

function AjaxJunta(spoolID) {
    loadingStart();
    $CapturasRapidas.CapturasRapidas.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token"), proceso: 3 }).done(function (data) {
        if (Error(data)) {
            $("#Junta").data("kendoComboBox").value("");
            $("#Junta").data("kendoComboBox").dataSource.data(data);
            loadingStop();
        }
    });
}

function AjaxListaRequisiciones(proyectoID) {
    $GenerarRequisicion.GenerarRequisicion.read({ lenguaje: $("#language").val(), token: Cookies.get("token"), ProyectoID: proyectoID, PruebaID: $("#tipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#tipoPrueba").data("kendoComboBox").value() }).done(function (data) {
        if (Error(data)) {
            $("#listaFolio").data("kendoComboBox").value("");
            $("#listaFolio").data("kendoComboBox").dataSource.data(data);
        }
    });
}

function AjaxGuardarCaptura(arregloCaptura, tipoGuardar) {
    Captura = [];
    Captura[0] = {
        Folio: "",
        PruebasID: "",
        ProyectoID: "",
        Observacion: "",
        RequisicionID: "",
        listaRequisiciones: ""
    };
    ListaDetalles = [];


    var cont = 0;
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].Agregar == true) {

            ListaDetalles[cont] = {
                Accion: "",
                JuntaSpoolID: "",
                RequisicionID: "",
                RequisicionJuntaSpoolID: "",
                ClasificacionPND: "",
                ClasificacionPNDID: ""
            };

            ListaDetalles[cont].Accion = arregloCaptura[index].Accion;
            ListaDetalles[cont].JuntaSpoolID = arregloCaptura[index].JuntaSpoolID;
            ListaDetalles[cont].RequisicionID = $("#listaFolio").data("kendoComboBox").value() == "" ? 0 : $("#listaFolio").data("kendoComboBox").value();
            ListaDetalles[cont].RequisicionJuntaSpoolID = 0;
            ListaDetalles[cont].ClasificacionPND = arregloCaptura[index].Clasificacion;
            ListaDetalles[cont].ClasificacionPNDID = 0;
            cont++;
        }

    }

    if (ListaDetalles.length != 0) {
        Captura[0].listaRequisiciones = ListaDetalles;
        //Captura[0].Folio = $("#listaFolio").data("kendoComboBox").value() == "" ? 0 : $("#listaFolio").data("kendoComboBox").value();
        //Captura[0].FechaRequisicion = $("#Fecha").val();
        Captura[0].Observacion = "";
        Captura[0].ProyectoID = $("#Proyecto").data("kendoComboBox").value();
        Captura[0].EstatusID = EstatusID;
        Captura[0].RequisicionID = $("#listaFolio").data("kendoComboBox").value() == "" ? 0 : $("#listaFolio").data("kendoComboBox").value();
        Captura[0].PruebasID = $("#tipoPrueba").data("kendoComboBox").value();

        loadingStart();
        $GenerarRequisicion.GenerarRequisicion.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0].split('|')[0] == "Ok") {
                //mensaje = "Se guardo correctamente la informacion" + "-0";
                if (tipoGuardar == 1) {
                    Limpiar();
                    opcionHabilitarView(false, "FieldSetView");
                    requisicionID = 0;

                }
                else {
                    requisicionID = data.ReturnMessage[0].split('|')[1];
                    ajaxObtenerJuntasSoldadas($("#Proyecto").data("kendoComboBox").value());
                    opcionHabilitarView(true, "FieldSetView");


                }
                ajaxRequisicion();
                displayNotify("CapturaSoldaduraMensajeGuardadoExitoso", "", "0");
                loadingStop();

            }
            else  /*(data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") */ {
                //mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
                displayNotify("CapturaMensajeGuardadoErroneo", "", '1');
                loadingStop();

            }

        });
    }
    else {
        displayNotify("MensajeSeleccioneRequisiciones", "", "1");
    }
}

function AjaxObtenerJunta() {
    $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token"), juntaTrabajoID: $("#Junta").data("kendoComboBox").value(), pruebaID: $("#tipoPrueba").data("kendoComboBox").value(), proyectoID: $("#Proyecto").data("kendoComboBox").value() }).done(function (data) {
        if (data.length > 0)
            $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token"), pruebaID: $("#tipoPrueba").data("kendoComboBox").value(), lenguaje: $("#language").val(), pruebasProyectoID: data.PruebasProyectoID }).done(function (result) {
                if (data[0].RequisicionJuntaSpoolID != 0)
                    displayNotify("", "La junta ya se encuentra asignada a una Requisición", '1');
                else {
                    var ds = $("#grid").data("kendoGrid").dataSource;

                    ArregloNuevoRenglon = [];
                    ArregloNuevoRenglon[0] = {
                        Accion: "",
                        Agregar: "",
                        Cedula: "",
                        Clasificacion: "",
                        Cuadrante: "",
                        CuadranteID: "",
                        Diametro: "",
                        Espesor: "",
                        EtiquetaJunta: "",
                        JuntaSpoolID: "",
                        NumeroControl: "",
                        Prioridad: "",
                        Proyecto: "",
                        ProyectoID: "",
                        Requisicion: "",
                        SpoolID: "",
                        TipoJunta: ""
                    };
                    ArregloNuevoRenglon[0].Accion = 1;
                    ArregloNuevoRenglon[0].Agregar = true;
                    ArregloNuevoRenglon[0].Cedula = data[0].Cedula;

                    var clasificacion = ds._view[0].Clasificacion;
                    if (clasificacion.split('-').length > 0)
                        clasificacion = clasificacion.split('-')[0];
                    var tieneClasificacion = false;
                    for (var i = 0; i < data.length && !tieneClasificacion; i++) {
                        if (clasificacion == data[i].ClasificacionPND) {
                            ArregloNuevoRenglon[0].Clasificacion = clasificacion;
                            tieneClasificacion = true;
                        }
                    }
                    if (!tieneClasificacion)
                        ArregloNuevoRenglon[0].Clasificacion = clasificacion + "-M";
                    ArregloNuevoRenglon[0].Cuadrante = data[0].Cuadrante;
                    ArregloNuevoRenglon[0].CuadranteID = data[0].CuadranteID;
                    ArregloNuevoRenglon[0].Diametro = data[0].Diametro;
                    ArregloNuevoRenglon[0].Espesor = data[0].Espesor;
                    ArregloNuevoRenglon[0].EtiquetaJunta = data[0].Etiqueta;
                    ArregloNuevoRenglon[0].JuntaSpoolID = data[0].JuntaSpoolID;
                    ArregloNuevoRenglon[0].NumeroControl = data[0].NumeroControl;
                    ArregloNuevoRenglon[0].Prioridad = data[0].Prioridad;
                    ArregloNuevoRenglon[0].Proyecto = data[0].Proyecto;
                    ArregloNuevoRenglon[0].ProyectoID = data[0].ProyectoID;
                    ArregloNuevoRenglon[0].Requisicion = data[0].RequisicionJuntaSpoolID;
                    ArregloNuevoRenglon[0].SpoolID = data[0].SpoolID;
                    ArregloNuevoRenglon[0].TipoJunta = data[0].TipoJunta;
                    ArregloNuevoRenglon[0].JuntaTrabajoID = data[0].JuntaTrabajoID;

                    ArregloNuevoRenglon[0].Folio = $("#Folio").text();
                    ArregloNuevoRenglon[0].PruebasID = $("#tipoPrueba").data("kendoComboBox").value();
                    ArregloNuevoRenglon[0].RequisicionID = requisicionID;
                    ArregloNuevoRenglon[0].RequisicionPruebaElementoID = 0;
                    ArregloNuevoRenglon[0].listaClasificaciones = result;


                    var juntaEnGrid = false;
                    for (var x = 0; x < ds._data.length && !juntaEnGrid; x++) {
                        if (ds._data[x].JuntaSpoolID == ArregloNuevoRenglon[0].JuntaSpoolID)
                            juntaEnGrid = true;
                    }

                    if (!juntaEnGrid) {
                        ds._data.unshift(ArregloNuevoRenglon[0]);
                        displayNotify("", "La junta " + ArregloNuevoRenglon[0].EtiquetaJunta + " se ha agregado al listado", '0');
                    }
                    else
                        displayNotify("", "La junta "+ArregloNuevoRenglon[0].EtiquetaJunta+" ya existe en el listado", '1');
                    $("#Junta").data("kendoComboBox").value("");
                    AjaxJunta($("#InputID").data("kendoComboBox").value());
                    loadingStop();
                }
            });
        else displayNotify("", "La junta no es apta para entrar en requisición", '1');
    });
}
