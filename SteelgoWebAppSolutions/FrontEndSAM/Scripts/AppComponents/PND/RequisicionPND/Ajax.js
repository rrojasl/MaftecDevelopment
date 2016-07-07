var CampoFechaDimensionalPredeterminada = 2047;

function ajaxObtenerTipoPruebas() {
    loadingStart();
    var proyecto = parseInt($("#Proyecto").val());
    $Pruebas.Pruebas.read({ token: Cookies.get("token"), proyectoID: proyecto, lenguaje: $("#language").val() }).done(function (data) {
        $("#tipoPrueba").data("kendoComboBox").value("");
        $("#tipoPrueba").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function ajaxObtenerTipoPruebasRequisicionEdicion() {
    loadingStart();
    var proyecto = parseInt($("#Proyecto").val());
    $Pruebas.Pruebas.read({ token: Cookies.get("token"), proyectoID: proyecto, lenguaje: $("#language").val() }).done(function (data) {
        $("#tipoPrueba").data("kendoComboBox").value("");
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
            var NewDate = kendo.toString(data[0].FechaRequisicion, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
            endRangeDate.val(NewDate);
            requisicionID = data[0].RequisicionID;
            EstatusID = data[0].EstatusID;
            pruebasID = data[0].PruebasID;
            ProyectoNombre = data[0].Nombre;
            ProyectoID = data[0].ProyectoID;
            PruebaNombre = data[0].Prueba;
            $("#Folio").text(data[0].Folio);
            $("#Observacion").val(data[0].Observacion);
            $("#Proyecto").data("kendoComboBox").value(data[0].proyectoID);
            loadingStop();

        });
    }
    else {
        requisicionID = 0;
        EstatusID = 1;
        $("#Folio").text("Sin asignar");
        $("#Fecha").data("kendoDatePicker").value("");
        $("#Observacion").val("");
        loadingStop();
    }

}

function AjaxObtenerSpoolID() {
    var OrdenTrabajoOriginal = $("#InputOrdenTrabajo").val();
    var proyectoID = $("#Proyecto").data("kendoComboBox")._selectedValue;
    var proyectoName = $("#Proyecto").data("kendoComboBox")._prev;
    $GenerarRequisicion.GenerarRequisicion.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {   
            for (i = data.idStatus.length-1; i >= 0; i--) {
                if(data.idStatus[i].ProyectoID != proyectoID)
                    data.idStatus.splice(i,1);
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

    $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token"), proyectoID: ProyectoID, todos: $('input:radio[name=Muestra]:checked').val(), lenguaje: $("#language").val(), reqID: requisicionID }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        $('#containerDiv').css('display', 'block');

        var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;
        var tipoPrueba = $("#tipoPrueba").data("kendoComboBox").value();
        for (i = jsonGridArmado.length - 1; i >= 0; i--) {
            if (jsonGridArmado[i].NombrePrueba != tipoPrueba && tipoPrueba != 0)
                jsonGridArmado.splice(i, 1);
        }
        var ds = $("#grid").data("kendoGrid").dataSource;
        ds = jsonGridArmado;

        loadingStop();
    });
}

function AjaxCargarCamposPredeterminados() {
    loadingStart();

    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoFechaDimensionalPredeterminada }).done(function (data) {
        var NewDate = kendo.toString(data, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        endRangeDate.val(NewDate);
    });

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

};

function AjaxJunta(spoolID) {
    loadingStart();
    $CapturasRapidas.CapturasRapidas.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), id: spoolID, sinCaptura: "otros", token: Cookies.get("token"), proceso: 3 }).done(function (data) {
        if (Error(data)) {
            $("#Junta").data("kendoComboBox").value("");
            $("#Junta").data("kendoComboBox").dataSource.data(data);
            loadingStop();
        }
    });
}

function AjaxGuardarCaptura(arregloCaptura, tipoGuardar) {
    Captura = [];
    Captura[0] = {
        listaRequisiciones: "",
        RequisicionID: "",
        Folio: "",
        PruebasID: "",
        FechaRequisicion: "",
        Observacion: "",
        EstatusID: ""
    };
    ListaDetalles = [];


    var cont = 0;
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].Agregar == true) {

            ListaDetalles[cont] = {
                Accion: "",
                RequisicionJuntaSpoolID: "",
                JuntaSpoolID: "",
                RequisicionID: ""
            };

            ListaDetalles[cont].Accion = arregloCaptura[index].Accion;
            ListaDetalles[cont].JuntaSpoolID = arregloCaptura[index].JuntaSpoolID;
            ListaDetalles[cont].RequisicionID = arregloCaptura[index].RequisicionID;
            ListaDetalles[cont].RequisicionJuntaSpoolID = arregloCaptura[index].RequisicionJuntaSpoolID;
            cont++;
        }

    }

    if (ListaDetalles.length != 0) {
        Captura[0].listaRequisiciones = ListaDetalles;
        Captura[0].Folio = $("#Folio").text();
        Captura[0].FechaRequisicion = $("#Fecha").val();
        Captura[0].Observacion = $("#Observacion").val();
        Captura[0].ProyectoID = $("#Proyecto").data("kendoComboBox").value();
        Captura[0].EstatusID = EstatusID;
        Captura[0].RequisicionID = requisicionID;
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
                    ajaxObtenerJuntasSoldadas( $("#Proyecto").data("kendoComboBox").value());
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
        $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token"), pruebaID: $("#tipoPrueba").data("kendoComboBox").value(), lenguaje: $("#language").val(), pruebasProyectoID: data.PruebasProyectoID }).done(function (result) {

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
            ArregloNuevoRenglon[0].Clasificacion = data[0].ClasificacionPND;
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

            var ds = $("#grid").data("kendoGrid").dataSource;
            ds.add(ArregloNuevoRenglon[0]);
            $("#Junta").data("kendoComboBox").value("");
            AjaxJunta($("#InputID").data("kendoComboBox").value());
            loadingStop();
        });
    });
}
