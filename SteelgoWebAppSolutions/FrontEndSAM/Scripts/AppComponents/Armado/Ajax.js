function AjaxJunta(spoolID) {
    loadingStart();
    $('input:radio[name=Muestra]:checked').val();
    $CapturaArmado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token") }).done(function (data) {

        $("#Junta").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function AjaxJuntaModoSpool(spoolID) {
    loadingStart();
    $('input:radio[name=Muestra]:checked').val();
    $CapturaArmado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token") }).done(function (data) {

        $("#Junta").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").dataSource.data(data);
        AjaxCargarReporteJuntas();
        loadingStop();
    });
}


function AjaxObtenerSpoolID() {
    var OrdenTrabajoOrigianl = $("#InputOrdenTrabajo").val();
    $CapturaArmado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.OrdenTrabajo != "") {
            $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
        }
        else {
            $("#InputOrdenTrabajo").val(OrdenTrabajoOrigianl);
            displayNotify("CapturaArmadoMensajeOrdenTrabajoNoEncontrada", "", '1');
        }

        $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
        Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
    });
}

function AjaxObtenerListaTubero() {
    loadingStart();
    if (Cookies.get("Proyecto") != undefined) {
        $CapturaArmado.Armado.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], tipo: 4, token: Cookies.get("token") }).done(function (data) {

            $("#inputTubero").data("kendoComboBox").value("");
            $("#inputTubero").data("kendoComboBox").dataSource.data(data);
            loadingStop();
        });
    }
    else
        loadingStop();
}

function AjaxObtenerListaTaller() {
    loadingStart();
    if (Cookies.get("Proyecto") != undefined) {
        $CapturaArmado.Armado.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], token: Cookies.get("token") }).done(function (data) {
            $("#inputTaller").data("kendoComboBox").value("");
            $("#inputTaller").data("kendoComboBox").dataSource.data(data);
            loadingStop();
        });
    }
    else
        loadingStop();
}

function ObtenerJSonGridArmado() {
    try {
        loadingStart();
        $CapturaArmado.Armado.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = JSON.parse(data);
            var elementoNoEncontrado = false;

            if (ExisteJunta(array[0])) {
                // Proceso validar accion
                for (var i = 0; i < ds._data.length; i++) {
                    if (array[0].SpoolID == ds._data[i].SpoolID && array[0].JuntaID == ds._data[i].JuntaID && ds._data[i].Accion == 3) { //SPOOL JUNTA ACCION
                        ds._data[i].TallerID = array[0].TallerID;
                        ds._data[i].Taller = array[0].Taller;
                        ds._data[i].NumeroUnico1 = array[0].NumeroUnico1;
                        ds._data[i].NumeroUnico1ID = array[0].NumeroUnico1ID;
                        ds._data[i].NumeroUnico2 = array[0].NumeroUnico2;
                        ds._data[i].NumeroUnico2ID = array[0].NumeroUnico2ID;
                        ds._data[i].Tubero = array[0].Tubero;
                        ds._data[i].TuberoID = array[0].TuberoID;
                        ds._data[i].ListaDetalleTrabajoAdicional = array[0].ListaDetalleTrabajoAdicional;
                        ds._data[i].TemplateMensajeTrabajosAdicionales = array[0].TemplateMensajeTrabajosAdicionales;

                        ds._data[i].Accion = 2;

                        if (array[0].FechaArmado != null) {
                            ds._data[i].FechaArmado = new Date(ObtenerDato(array[0].FechaArmado, 1), ObtenerDato(array[0].FechaArmado, 2), ObtenerDato(array[0].FechaArmado, 3));//año, mes, dia
                        }

                        var elementgrid = ds._data.splice(i, 1);
                        ds._data.unshift(elementgrid[0]);

                        displayNotify("",
                        _dictionary.CapturaArmadoMsgExiste[$("#language").data("kendoDropDownList").value()] +
                        array[0].Junta +
                        _dictionary.CapturaArmadoMsgNuevoEnListado[$("#language").data("kendoDropDownList").value()], '0');

                        elementoNoEncontrado = true;
                    }
                }
                if (!elementoNoEncontrado)
                    displayNotify("",
                    _dictionary.CapturaArmadoMsgExiste[$("#language").data("kendoDropDownList").value()] +
                    array[0].Junta +
                    _dictionary.CapturaArmadoMsgExisteListado[$("#language").data("kendoDropDownList").value()], '2');
            }
            else {
                //Proceso insertar elemento
                for (var i = 0; i < array.length; i++) {
                    array[i].NumeroUnico1 = array[i].NumeroUnico1 === "" ? DatoDefaultNumeroUnico1() : array[i].NumeroUnico1;
                    array[i].NumeroUnico2 = array[i].NumeroUnico2 === "" ? DatoDefaultNumeroUnico2() : array[i].NumeroUnico2;
                    if (array[i].FechaArmado != null) {
                        array[i].FechaArmado = new Date(ObtenerDato(array[i].FechaArmado, 1), ObtenerDato(array[i].FechaArmado, 2), ObtenerDato(array[i].FechaArmado, 3));//año, mes, dia
                    }
                    ds.insert(0, array[i]);
                    //$("#Junta").data("kendoComboBox").dataSource.remove($("#Junta").data("kendoComboBox").dataItem($("#Junta").data("kendoComboBox").select()));
                    $("#Junta").val("");
                }

                displayNotify("",
                        _dictionary.CapturaArmadoMsgExiste[$("#language").data("kendoDropDownList").value()] +
                        array[0].Junta +
                        _dictionary.CapturaArmadoMsgNuevoEnListado[$("#language").data("kendoDropDownList").value()], '0');

                //displayNotify("", 'La junta ' + $('#Junta').data("kendoComboBox").value() + ' ya existe en el listado', '2');
                $('#ButtonAgregar').prop("disabled", false);
            }
        });
        $('#ButtonAgregar').prop("disabled", false);
        loadingStop();
    } catch (e) {
        displayNotify("Mensajes_error", e.message, '1');
        $('#ButtonAgregar').prop("disabled", false);
    }
}

function AjaxEjecutarGuardado(rows, tipoGuardar) {
    $CapturaArmado.Armado.create(rows, { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            displayNotify("CapturaMensajeGuardadoExitoso", "", '0');

            if (tipoGuardar == 1) {
                Limpiar();
                AjaxCargarCamposPredeterminados();
            }
            else {
                opcionHabilitarView(true, "FieldSetView");
                AjaxCambiarAccionAModificacion();
            }
            loadingStop();

        }
        else  /*(data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") */ {
            //mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
            displayNotify("CapturaMensajeGuardadoErroneo", "", '2');
            loadingStop();

        }
    });
}

function AjaxGuardarCaptura(arregloCaptura, tipoGuardar) {
    try {
        var seGuardoCorrectamente = false;
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];




        for (index = 0; index < arregloCaptura.length; index++) {
            try {
                ListaDetalles[index] = { Accion: "", IdVal: "", JuntaID: "", TipoJuntaID: "", Junta: "", Localizacion1: "", Localizacion2: "", JuntaArmadoID: "", JuntaTrabajoID: "", NumeroUnico1ID: "", NumeroUnico2ID: "", TallerID: "", TuberoID: "", FechaArmado: "", ListaDetalleTrabajoAdicional: "", Estatus: 1 };


                ListaDetalles[index].Accion = arregloCaptura[index].Accion;
                ListaDetalles[index].IdVal = arregloCaptura[index].IdVal;
                ListaDetalles[index].JuntaID = arregloCaptura[index].JuntaID;
                ListaDetalles[index].TipoJuntaID = arregloCaptura[index].TipoJuntaID;
                ListaDetalles[index].Junta = arregloCaptura[index].Junta;
                ListaDetalles[index].Localizacion1 = arregloCaptura[index].Localizacion.split('-')[0];
                ListaDetalles[index].Localizacion2 = arregloCaptura[index].Localizacion.split('-')[1];
                ListaDetalles[index].JuntaArmadoID = arregloCaptura[index].JuntaArmadoID;
                ListaDetalles[index].JuntaTrabajoID = arregloCaptura[index].JuntaTrabajoID;
                ListaDetalles[index].NumeroUnico1ID = arregloCaptura[index].NumeroUnico1ID;
                ListaDetalles[index].NumeroUnico2ID = arregloCaptura[index].NumeroUnico2ID;
                ListaDetalles[index].TallerID = arregloCaptura[index].TallerID;
                ListaDetalles[index].TuberoID = arregloCaptura[index].TuberoID;
                ListaDetalles[index].FechaArmado = arregloCaptura[index].FechaArmado == null ? "" : kendo.toString(arregloCaptura[index].FechaArmado, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();

                ListaTrabajosAdicionalesEditados = [];
                for (j = 0; j < arregloCaptura[index].ListaDetalleTrabajoAdicional.length; j++) {

                    ListaTrabajosAdicionalesEditados[j] = { Accion: "", JuntaID: "", ArmadoTrabajoAdicionalID: "", JuntaArmadoID: "", TrabajoAdicionalID: "", ObreroID: "", Observacion: "" };
                    ListaTrabajosAdicionalesEditados[j].Accion = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].Accion;
                    ListaTrabajosAdicionalesEditados[j].JuntaID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].JuntaID;
                    ListaTrabajosAdicionalesEditados[j].ArmadoTrabajoAdicionalID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].ArmadoTrabajoAdicionalID;
                    ListaTrabajosAdicionalesEditados[j].JuntaArmadoID = arregloCaptura[index].JuntaArmadoID;
                    ListaTrabajosAdicionalesEditados[j].TrabajoAdicionalID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].TrabajoAdicionalID;
                    ListaTrabajosAdicionalesEditados[j].ObreroID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].ObreroID;
                    ListaTrabajosAdicionalesEditados[j].Observacion = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].Observacion;
                }

                ListaDetalles[index].ListaDetalleTrabajoAdicional = arregloCaptura[index].ListaDetalleTrabajoAdicional.length == 0 ? undefined : ListaTrabajosAdicionalesEditados;

                if (

               ListaDetalles[index].IdVal == "" ||
               ListaDetalles[index].JuntaID == "" ||
               ListaDetalles[index].TipoJuntaID == "" ||
               ListaDetalles[index].Junta == "" ||
               ListaDetalles[index].Localizacion1 == "" ||
               ListaDetalles[index].Localizacion2 == "" ||
               ListaDetalles[index].NumeroUnico1ID == "" ||
               ListaDetalles[index].NumeroUnico2ID == "" ||
               ListaDetalles[index].TallerID == "" ||
               ListaDetalles[index].TuberoID == "" ||
               ListaDetalles[index].FechaArmado == ""

                   ) {
                    ListaDetalles[index].Estatus = 0;
                }
            } catch (e) {
                loadingStop();
            }
        }
        Captura[0].Detalles = ListaDetalles;

        if (!ExistRowEmpty(ListaDetalles)) {

            if (Captura[0].Detalles.length > 0) {
                AjaxEjecutarGuardado(Captura[0], tipoGuardar);
            }
            else {
                loadingStop();

            }

        }
        else {
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

            ventanaConfirm.open().center();


            RowEmpty($("#grid"));

            $("#yesButton").click(function () {
                loadingStart();

                ArregloGuardado = [];
                var indice = 0;
                for (var i = 0; i < Captura[0].Detalles.length; i++) {
                    if (Captura[0].Detalles[i].Estatus == 1) {
                        ArregloGuardado[indice] = ListaDetalles[i];
                        indice++;
                    }
                }

                Captura[0].Detalles = [];
                Captura[0].Detalles = ArregloGuardado;


                if (ArregloGuardado.length > 0) {
                    AjaxEjecutarGuardado(Captura[0], tipoGuardar);
                }
                else {
                    loadingStop();
                    displayNotify("AlertaAdvertencia", "AdverteciaExcepcionGuardado", "", '1');
                }

                ventanaConfirm.close();
            });
            $("#noButton").click(function () {
                ventanaConfirm.close();
            });

        }

    } catch (e) {
        loadingStop();
        displayNotify("Mensajes_error", e.message, '0');
    }

}

function AjaxCargarCamposPredeterminados() {


    $CapturaArmado.Armado.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        var NewDate = kendo.toString(data.FechaArmado, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

        endRangeDate.val(NewDate);

        if (data.Muestra == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
            //$('input:radio[name=Muestra]:nth(1)').attr('checked', false);

        }
        else if (data.Muestra == "Todos") {
            //$('input:radio[name=Muestra]:nth(0)').attr('checked', false);
            $('input:radio[name=Muestra]:nth(1)').trigger("click");

        }

        if (data.Llena == "Todos") {
            $('input:radio[name=LLena]:nth(0)').trigger("click");
            //$('input:radio[name=LLena]:nth(1)').attr('checked', false);

        }
        else if (data.Llena == "Vacios") {
            //$('input:radio[name=LLena]:nth(0)').trigger("click");
            $('input:radio[name=LLena]:nth(1)').trigger("click");

        }

        if (data.TipoCaptura == "Reporte") {
            $('input:radio[name=TipoAgregado]:nth(0)').trigger("click");
            //$('input:radio[name=TipoAgregado]:nth(1)').attr('checked', false);
            $("#styleReporte").addClass("active");
            $("#styleListado").removeClass("active");
        }
        else if (data.TipoCaptura == "Lista") {
            //$('input:radio[name=TipoAgregado]:nth(0)').attr('checked', false);
            $('input:radio[name=TipoAgregado]:nth(1)').trigger("click");
            $("#styleListado").addClass("active");
            $("#styleReporte").removeClass("active");
        }

    });

}





function AjaxCargarCamposPredeterminadosOcultaJunta() {

    loadingStart();
    $CapturaArmado.Armado.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        var NewDate = kendo.toString(data.FechaArmado, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

        endRangeDate.val(NewDate);

        if (data.Muestra == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
            //$('input:radio[name=Muestra]:nth(1)').attr('checked', false);

        }
        else if (data.Muestra == "Todos") {
            //$('input:radio[name=Muestra]:nth(0)').attr('checked', false);
            $('input:radio[name=Muestra]:nth(1)').trigger("click");

        }

        if (data.Llena == "Todos") {
            $('input:radio[name=LLena]:nth(0)').trigger("click");
            //$('input:radio[name=LLena]:nth(1)').attr('checked', false);

        }
        else if (data.Llena == "Vacios") {
            //$('input:radio[name=LLena]:nth(0)').trigger("click");
            $('input:radio[name=LLena]:nth(1)').trigger("click");

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

function AjaxCargarReporteJuntas() {
    var listadoReporte = ArregloListadoReporte();
    var elementoNoEncontrado = false;
    for (var x = 0; x < listadoReporte.length; x++) {

        loadingStart();
        $CapturaArmado.Armado.read({ JsonCaptura: JSON.stringify(listadoReporte[x]), lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var lInicialGrid = ds._data.length;
            var array = JSON.parse(data);


            for (var i = 0; i < array.length; i++) {
                if (!ExisteJuntaEnSpool(array[i])) {
                    ds.insert(0, array[i]);

                    if (array[i].FechaArmado != null) {
                        array[i].FechaArmado = new Date(ObtenerDato(array[i].FechaArmado, 1), ObtenerDato(array[i].FechaArmado, 2), ObtenerDato(array[i].FechaArmado, 3));//año, mes, dia
                    }
                    elementoNoEncontrado = true;

                    displayNotify("",
                                _dictionary.CapturaArmadoMsgExiste[$("#language").data("kendoDropDownList").value()] +
                                array[i].Junta +
                                _dictionary.CapturaArmadoMsgNuevoEnReporte[$("#language").data("kendoDropDownList").value()], '0');
                }
                else {
                    for (var j = 0; j < ds._data.length; j++) {
                        if (array[i].SpoolID == ds._data[j].SpoolID && array[i].JuntaID == ds._data[j].JuntaID && ds._data[j].Accion == 3) {

                            ds._data[j].TallerID = array[i].TallerID;
                            ds._data[j].Taller = array[i].Taller;
                            ds._data[j].NumeroUnico1 = array[i].NumeroUnico1;
                            ds._data[j].NumeroUnico1ID = array[i].NumeroUnico1ID;
                            ds._data[j].NumeroUnico2 = array[i].NumeroUnico2;
                            ds._data[j].NumeroUnico2ID = array[i].NumeroUnico2ID;
                            ds._data[j].Tubero = array[i].Tubero;
                            ds._data[j].TuberoID = array[i].TuberoID;
                            ds._data[j].ListaDetalleTrabajoAdicional = array[i].ListaDetalleTrabajoAdicional;
                            ds._data[j].TemplateMensajeTrabajosAdicionales = array[i].TemplateMensajeTrabajosAdicionales;

                            ds._data[j].Accion = 2;

                            if (array[i].FechaArmado != null) {
                                ds._data[j].FechaArmado = new Date(ObtenerDato(array[i].FechaArmado, 1), ObtenerDato(array[i].FechaArmado, 2), ObtenerDato(array[i].FechaArmado, 3));//año, mes, dia
                            }

                            var elementgrid = ds._data.splice(j, 1);
                            ds._data.unshift(elementgrid[0]);

                            displayNotify("",
                                _dictionary.CapturaArmadoMsgExiste[$("#language").data("kendoDropDownList").value()] +
                                ds._data[i].Junta +
                                _dictionary.CapturaArmadoMsgNuevoEnReporte[$("#language").data("kendoDropDownList").value()], '0');

                            elementoNoEncontrado = true;
                        }
                    }
                }
                if (!elementoNoEncontrado)
                displayNotify("",
                                _dictionary.CapturaArmadoMsgExiste[$("#language").data("kendoDropDownList").value()] +
                                array[i].Junta +
                                _dictionary.CapturaArmadoMsgExisteReporte[$("#language").data("kendoDropDownList").value()], '2');
            }
            $("#grid").data("kendoGrid").dataSource.sync();

            loadingStop();

            
                
            
        });
        
    }
  
    $('#ButtonAgregar').prop("disabled", false);
   
}

function AjaxCambiarAccionAModificacion() {
    var listado = ArregloListadoJuntasCapturadas();

    $("#grid").data("kendoGrid").dataSource.data([]);

    for (var i = 0; i < listado.length; i++) {

        loadingStart();
        $CapturaArmado.Armado.read({ JsonCaptura: JSON.stringify(listado[i]), lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = JSON.parse(data);
            for (var i = 0; i < array.length; i++) {
                if (array[i].FechaArmado != null) {
                    array[i].FechaArmado = new Date(ObtenerDato(array[i].FechaArmado, 1), ObtenerDato(array[i].FechaArmado, 2), ObtenerDato(array[i].FechaArmado, 3));//año, mes, dia
                }
                ds.add(array[i]);
            }
            loadingStop();
        });
    }
}