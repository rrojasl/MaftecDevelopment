﻿
function AjaxJunta(spoolID) {
    loadingStart();
    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token"), proceso: 2 }).done(function (data) {
        if (Error(data)) {
            $("#Junta").data("kendoComboBox").value("");
            $("#Junta").data("kendoComboBox").dataSource.data(data)
        }
        loadingStop();
    });
}


function AjaxJuntaModoSpool(spoolID) {
    loadingStart();
    
    
    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token"), proceso: 2 }).done(function (data) {
        if (Error(data)) {
            $("#Junta").data("kendoComboBox").value("");
            $("#Junta").data("kendoComboBox").dataSource.data(data);
        }
        loadingStop();
        AjaxCargarReporteJuntas();
    });
}


function AjaxColada() {
    loadingStart();
    if (Cookies.get("proyecto") != undefined) {
        $CatalogosGenerales.CatalogosGenerales.read({ proyectoid: Cookies.get("proyecto").split('°')[0], token: Cookies.get("token"), proceso: 2 }).done(function (data) {
            if (Error(data)) {
                $("#inputColada").data("kendoComboBox").value("");
                $("#inputColada").data("kendoComboBox").dataSource.data(data)
            }
            loadingStop();
        });
    }
}

//function AjaxWPS() {
//    loadingStart();
//    $WPS.WPS.read({ TipoDato: 1, token: Cookies.get("token") }).done(function (data) {
//        if (Error(data)) {
//            $("#inputWPS").data("kendoComboBox").value("");
//            $("#inputWPS").data("kendoComboBox").dataSource.data(data)
//        }
//        loadingStop();
//    });
//}

//function AjaxPQR() {
//    loadingStart();
//    $PQR.PQR.read({ TipoDato: 1, token: Cookies.get("token") }).done(function (data) {
//        if (Error(data)) {
//            $("#inputPQR").data("kendoComboBox").value("");
//            $("#inputPQR").data("kendoComboBox").dataSource.data(data)
//        }
//        loadingStop();
//    });
//}


function AjaxObtenerListaTaller() {
    loadingStart();
    if (Cookies.get("Proyecto") != undefined) {
        $Taller.Taller.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], token: Cookies.get("token") }).done(function (data) {
            if (Error(data)) {
                $("#inputTaller").data("kendoComboBox").value("");
                $("#inputTaller").data("kendoComboBox").dataSource.data(data);
            }
            loadingStop();
        });
    }
}


function AjaxObtenerListaProcesos() {
    loadingStart();
    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#inputProcesoRelleno").data("kendoDropDownList").value("");
            $("#inputProcesoRaiz").data("kendoDropDownList").value("");
            $("#inputProcesoRaiz").data("kendoDropDownList").setDataSource(data);
            $("#inputProcesoRelleno").data("kendoDropDownList").setDataSource(data);
        }
        loadingStop();
    });
}


function ObtenerJSonGridSoldadura() {
    try {
        
        loadingStart();
        $CapturaSoldadura.Soldadura.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), isReporte: false, lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
            if (Error(data)) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = JSON.parse(data);
                var elementoNoEncontrado = false;

                if (ExisteJunta(array[0])) {
                    // Proceso validar accion
                    for (var j = 0; j < ds._data.length; j++) {
                        if (array[0].SpoolID == ds._data[j].SpoolID && array[0].JuntaID == ds._data[j].JuntaID && ds._data[j].Accion == 3) { //SPOOL JUNTA ACCION
                            ds._data[j].DetalleJunta = array[0].DetalleJunta;
                            ds._data[j].TemplateSoldadoresRaiz = array[0].TemplateSoldadoresRaiz;
                            ds._data[j].TemplateSoldadoresRelleno = array[0].TemplateSoldadoresRelleno;
                            ds._data[j].TipoJuntaID = array[0].TipoJuntaID;
                            ds._data[j].Accion = array[0].Accion;
                            ds._data[j].procesoSoldaduraRaizID = array[0].procesoSoldaduraRaizID;
                            ds._data[j].procesoSoldaduraRellenoID = array[0].procesoSoldaduraRellenoID;
                            ds._data[j].procesoSoldaduraRaiz = array[0].procesoSoldaduraRaiz;
                            ds._data[j].procesoSoldaduraRelleno = array[0].procesoSoldaduraRelleno;
                            ds._data[j].Proyecto = array[0].Proyecto;
                            ds._data[j].IDProyecto = array[0].IDProyecto;
                            ds._data[j].IdOrdenTrabajo = array[0].IdOrdenTrabajo;
                            ds._data[j].OrdenTrabajo = array[0].OrdenTrabajo;
                            ds._data[j].idVal = array[0].idVal;
                            ds._data[j].idText = array[0].idText;
                            ds._data[j].SpoolID = array[0].SpoolID;
                            ds._data[j].JuntaID = array[0].JuntaID;
                            ds._data[j].Junta = array[0].Junta;
                            ds._data[j].TipoJunta = array[0].TipoJunta;
                            ds._data[j].Cedula = array[0].Cedula;
                            ds._data[j].Diametro = array[0].Diametro;
                            ds._data[j].TallerID = array[0].TallerID;
                            ds._data[j].Taller = array[0].Taller;
                            ds._data[j].TemplateTrabajosAdicionales = array[0].TemplateTrabajosAdicionales;
                            ds._data[j].FechaSoldadura = array[0].FechaSoldadura;
                            ds._data[j].listaTrabajosAdicionalesSoldadura = array[0].listaTrabajosAdicionalesSoldadura;
                            ds._data[j].ListaTaller = array[0].ListaTaller;
                            ds._data[j].ListaWPS = array[0].ListaWPS;
                            ds._data[j].ListaCedulas = array[0].ListaCedulas;

                            if (array[0].FechaSoldadura != null) {
                                ds._data[j].FechaSoldadura = new Date(ObtenerDato(array[0].FechaSoldadura, 1), ObtenerDato(array[0].FechaSoldadura, 2), ObtenerDato(array[0].FechaSoldadura, 3));//año, mes, dia
                            }

                            var elementgrid = ds._data.splice(j, 1);
                            ds._data.unshift(elementgrid[0]);

                            displayNotify("",
                            _dictionary.CapturaSoldaduraMsgExiste[$("#language").data("kendoDropDownList").value()] +
                            array[0].Junta +
                            _dictionary.CapturaSoldaduraMsgNuevoEnListado[$("#language").data("kendoDropDownList").value()], '0');

                            elementoNoEncontrado = true;
                        }
                    }
                    if (!elementoNoEncontrado)
                        displayNotify("",
                        _dictionary.CapturaSoldaduraMsgExiste[$("#language").data("kendoDropDownList").value()] +
                        array[0].Junta +
                        _dictionary.CapturaSoldaduraMsgExisteListado[$("#language").data("kendoDropDownList").value()], '2');
                }
                else {
                    //Proceso insertar elemento
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].FechaSoldadura != null) {
                            array[i].FechaSoldadura = new Date(ObtenerDato(array[i].FechaSoldadura, 1), ObtenerDato(array[i].FechaSoldadura, 2), ObtenerDato(array[i].FechaSoldadura, 3));//año, mes, dia
                        }
                       $("#Junta").val("");
                    }

                    

                    $("#Junta").data("kendoComboBox").value("");

                    ds.insert(0, array[0]);

                    
                    if (array.length == 0) {
                        displayNotify("",
                            _dictionary.CapturaSoldaduraJuntaCapturada[$("#language").data("kendoDropDownList").value()], '1');
                    }
                    else {
                        displayNotify("",
                            _dictionary.CapturaSoldaduraMsgExiste[$("#language").data("kendoDropDownList").value()] +
                            array[0].Junta +
                            _dictionary.CapturaSoldaduraMsgNuevoEnListado[$("#language").data("kendoDropDownList").value()], '0');
                    }

                    //displayNotify("", 'La junta ' + $('#Junta').data("kendoComboBox").value() + ' ya existe en el listado', '2');
                    $('#ButtonAgregar').prop("disabled", false);
                }
            }
            loadingStop();
        });
        $('#ButtonAgregar').prop("disabled", false);
    } catch (e) {
        loadingStop();
        displayNotify("Mensajes_error", e.message, '1');
        $('#ButtonAgregar').prop("disabled", false);
    }
}

function ObtenerDato(fecha, tipoDatoObtener) {
    var cultura = $("#language").val();

    switch (tipoDatoObtener) {
        case 1://anho
            return fecha.split('/')[2]
            break;
        case 2://mes
            if (cultura == 'es-MX')
                return fecha.split('/')[1] - 1
            else
                return fecha.split('/')[0] - 1
            break;
        case 3://dia
            if (cultura == 'es-MX')
                return fecha.split('/')[0]
            else
                return fecha.split('/')[1]
            break;
    }
}

function AjaxGuardarCaptura(arregloCaptura, tipoGuardar) {
    loadingStart();
    try {
        var bandera = true, banderaProcesoRaiz = true, banderaProcesoRelleno = true;
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];

        for (index = 0; index < arregloCaptura.length; index++) {
            ListaDetalles[index] = {
                Accion: "", OrdenTrabajoSpoolID: "", JuntaSpoolID: "",
                TipoJuntaID: "", EtiquetaJunta: "", EtiquetaMaterial1: "", EtiquetaMaterial2: "",
                JuntaSoldaduraID: "", NumeroUnico1ID: "", NumeroUnico2ID: "", TallerID: "",
                ProcesoSoldaduraRaizID: "", ProcesoSoldaduraRellenoID: "", FechaSoldadura: "", ListaSoldaduraRaiz: "",
                ListaSoldaduraRelleno: "", ListaDetalleTrabajoAdicional: "", FechaReporte: "", ColadaID: "", Estatus: 1
            };

            var labelFecha = String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""));

            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].OrdenTrabajoSpoolID = arregloCaptura[index].idVal;
            ListaDetalles[index].JuntaSpoolID = arregloCaptura[index].JuntaID;
            ListaDetalles[index].TipoJuntaID = arregloCaptura[index].TipoJuntaID;
            ListaDetalles[index].EtiquetaJunta = arregloCaptura[index].Junta;
            ListaDetalles[index].EtiquetaMaterial1 = arregloCaptura[index].EtiquetaMaterial1;
            ListaDetalles[index].EtiquetaMaterial2 = arregloCaptura[index].EtiquetaMaterial2;
            ListaDetalles[index].JuntaSoldaduraID = arregloCaptura[index].JuntaSoldaduraID;
            ListaDetalles[index].NumeroUnico1ID = arregloCaptura[index].NumeroUnico1ID;
            ListaDetalles[index].NumeroUnico2ID = arregloCaptura[index].NumeroUnico2ID;
            ListaDetalles[index].TallerID = arregloCaptura[index].TallerID;
            ListaDetalles[index].ProcesoSoldaduraRaizID = arregloCaptura[index].procesoSoldaduraRaizID;
            ListaDetalles[index].ProcesoSoldaduraRellenoID = arregloCaptura[index].procesoSoldaduraRellenoID;
            ListaDetalles[index].FechaSoldadura =
                kendo.toString(arregloCaptura[index].FechaSoldadura, labelFecha) == null ? "" :
                kendo.toString(arregloCaptura[index].FechaSoldadura, labelFecha).trim();
            ListaDetalles[index].ColadaID = arregloCaptura[index].ColadaID;

            if (ListaDetalles[index].TallerID == null || ListaDetalles[index].TallerID == "" || ListaDetalles[index].TallerID == undefined)
                bandera = false;
            if (arregloCaptura[index].PermiteTerminadoRaiz) {
                if (ListaDetalles[index].ProcesoSoldaduraRaizID == null || ListaDetalles[index].ProcesoSoldaduraRaizID == "" || ListaDetalles[index].ProcesoSoldaduraRaizID == undefined || ListaDetalles[index].ProcesoSoldaduraRaizID == 0)
                    banderaProcesoRaiz = false;
            }
            if (arregloCaptura[index].PermiteTerminadoRelleno) {
                if (ListaDetalles[index].ProcesoSoldaduraRellenoID == null || ListaDetalles[index].ProcesoSoldaduraRellenoID == "" || ListaDetalles[index].ProcesoSoldaduraRellenoID == undefined || ListaDetalles[index].ProcesoSoldaduraRellenoID == 0)
                    banderaProcesoRelleno = false;
            }

            ListaTrabajosAdicionalesEditados = [];
            for (j = 0; j < arregloCaptura[index].DetalleAdicional.length; j++) {
                ListaTrabajosAdicionalesEditados[j] = {
                    JuntaSpoolID: "", TallerID: "", Accion: "", JuntaID: "", SoldaduraTrabajoAdicionalID: "",
                    JuntaSoldaduraID: "", TrabajoAdicionalID: "", ObreroID: "", Observacion: ""
                }

                if (arregloCaptura[index].DetalleAdicional[j].TrabajoAdicionalID == 0 || arregloCaptura[index].DetalleAdicional[j].ObreroID == 0)
                    ListaTrabajosAdicionalesEditados[j].Accion = 0;
                else
                    ListaTrabajosAdicionalesEditados[j].Accion = arregloCaptura[index].DetalleAdicional[j].Accion;

                ListaTrabajosAdicionalesEditados[j].JuntaID = arregloCaptura[index].DetalleAdicional[j].JuntaID;
                ListaTrabajosAdicionalesEditados[j].SoldaduraTrabajoAdicionalID = arregloCaptura[index].DetalleAdicional[j].SoldaduraTrabajoAdicionalID;
                ListaTrabajosAdicionalesEditados[j].JuntaSoldaduraID = arregloCaptura[index].JuntaSoldaduraID;
                ListaTrabajosAdicionalesEditados[j].JuntaSpoolID = arregloCaptura[index].DetalleAdicional[j].JuntaSpoolID;
                ListaTrabajosAdicionalesEditados[j].TrabajoAdicionalID = arregloCaptura[index].DetalleAdicional[j].TrabajoAdicionalID;
                ListaTrabajosAdicionalesEditados[j].TallerID = arregloCaptura[index].DetalleAdicional[j].TallerID
                ListaTrabajosAdicionalesEditados[j].ObreroID = arregloCaptura[index].DetalleAdicional[j].ObreroID;
                ListaTrabajosAdicionalesEditados[j].Observacion = arregloCaptura[index].DetalleAdicional[j].Observacion;
            }


            //-----------------------------------Comparar lista soldadores--------------------------------------------
            var listaSoldadoresDetalle = arregloCaptura[index].RaizDetalle;
            var listaSoldadoresNueva = arregloCaptura[index].Raiz;
            var listaSoldadoresInicial = arregloCaptura[index].RaizInicial;
            var listaSoldadoresFinal = [];

            if (listaSoldadoresNueva.length == 0) {
                for (var j = 0 ; j < listaSoldadoresInicial.length ; j++) {
                    listaSoldadoresInicial[j].Accion = 3;
                    listaSoldadoresFinal.push(listaSoldadoresInicial[j]);
                }
            }
            else {
                for (var i = 0; i < listaSoldadoresInicial.length; i++) {
                    var banderaSoldadores = false;
                    for (var j = 0 ; j < listaSoldadoresNueva.length ; j++) {
                        if (listaSoldadoresInicial[i].ObreroID == listaSoldadoresNueva[j].ObreroID) {
                            listaSoldadoresFinal.push(listaSoldadoresInicial[i]);
                            banderaSoldadores = true;
                        }
                        if ((listaSoldadoresNueva.length - 1) == j && banderaSoldadores == false) {
                            listaSoldadoresInicial[i].Accion = 3;
                            listaSoldadoresFinal.push(listaSoldadoresInicial[i]);
                        }
                    }
                }
            }

            if (listaSoldadoresInicial.length == 0)
                listaSoldadoresFinal = listaSoldadoresDetalle;
            else {
                for (var i = 0; i < listaSoldadoresNueva.length; i++) {
                    var banderaSoldadores = false;
                    var banderaExisteSoldador = false;
                    for (var j = 0 ; j < listaSoldadoresInicial.length ; j++) {
                        if (listaSoldadoresNueva[i].ObreroID != listaSoldadoresInicial[j].ObreroID)
                            banderaSoldadores = true;
                        else
                            banderaExisteSoldador = true;

                        var soldadorDetalle = $.grep(listaSoldadoresDetalle, function (e) {
                            return e.ObreroID == listaSoldadoresNueva[i].ObreroID;
                        });
                        if(soldadorDetalle.length > 0)
                        if ((listaSoldadoresInicial.length - 1) == j && !banderaExisteSoldador && banderaSoldadores == true && soldadorDetalle[0].Accion == 1)
                            listaSoldadoresFinal.push(soldadorDetalle[0]);
                    }
                }
            }

            ListaSoldadoresEditados = [];

            for (j = 0; j < listaSoldadoresFinal.length; j++) {

                ListaSoldadoresEditados[j] = {
                    Accion: "", JuntaSpoolID: "",
                    SoldaduraTrabajoAdicionalID: "", JuntaSoldaduraID: "",
                    TipoSoldaduraID: "", ObreroID: ""
                };

                ListaSoldadoresEditados[j].Accion = listaSoldadoresFinal[j].Accion;
                ListaSoldadoresEditados[j].JuntaSoldaduraSoldadoID = listaSoldadoresFinal[j].JuntaSoldaduraSoldadoID;
                ListaSoldadoresEditados[j].JuntaSoldaduraID = arregloCaptura[index].JuntaSoldaduraID;
                ListaSoldadoresEditados[j].TipoSoldaduraID = arregloCaptura[index].procesoSoldaduraRaizID;
                ListaSoldadoresEditados[j].ObreroID = listaSoldadoresFinal[j].ObreroID;
                ListaSoldadoresEditados[j].JuntaSpoolID = arregloCaptura[index].JuntaID;

            }


            //-----------------------------------Comparar lista soldadores relleno--------------------------------------------
            var listaRellenoSoldadoresDetalle = arregloCaptura[index].RellenoDetalle;
            var listaRellenoSoldadoresNueva = arregloCaptura[index].Relleno;
            var listaRellenoSoldadoresInicial = arregloCaptura[index].RellenoInicial;
            var listaRellenoSoldadoresFinal = [];

            if (listaRellenoSoldadoresNueva.length == 0) {
                for (var j = 0 ; j < listaRellenoSoldadoresInicial.length ; j++) {
                    listaRellenoSoldadoresInicial[j].Accion = 3;
                    listaRellenoSoldadoresFinal.push(listaRellenoSoldadoresInicial[j]);
                }
            }
            else {
                for (var i = 0; i < listaRellenoSoldadoresInicial.length; i++) {
                    var banderaSoldadoresRelleno = false;
                    for (var j = 0 ; j < listaRellenoSoldadoresNueva.length ; j++) {
                        if (listaRellenoSoldadoresInicial[i].ObreroID == listaRellenoSoldadoresNueva[j].ObreroID) {
                            listaRellenoSoldadoresFinal.push(listaRellenoSoldadoresInicial[i]);
                            banderaSoldadoresRelleno = true;
                        }
                        if ((listaRellenoSoldadoresNueva.length - 1) == j && banderaSoldadoresRelleno == false) {
                            listaRellenoSoldadoresInicial[i].Accion = 3;
                            listaRellenoSoldadoresFinal.push(listaRellenoSoldadoresInicial[i]);
                        }
                    }
                }
            }


            if (listaRellenoSoldadoresInicial.length == 0)
                listaRellenoSoldadoresFinal = listaRellenoSoldadoresDetalle;
            else {
                for (var i = 0; i < listaRellenoSoldadoresNueva.length; i++) {
                    var banderaSoldadoresRelleno = false;
                    var banderaExisteSoldador = false;
                    for (var j = 0 ; j < listaRellenoSoldadoresInicial.length ; j++) {
                        if (listaRellenoSoldadoresNueva[i].ObreroID != listaRellenoSoldadoresInicial[j].ObreroID)
                            banderaSoldadoresRelleno = true;
                        else
                            banderaExisteSoldador = true;

                        var soldadorRellenoDetalle = $.grep(listaRellenoSoldadoresDetalle, function (e) {
                            return e.ObreroID == listaRellenoSoldadoresNueva[i].ObreroID;
                        });

                        if ((listaRellenoSoldadoresInicial.length - 1) == j && !banderaExisteSoldador && banderaSoldadoresRelleno == true && soldadorRellenoDetalle[0].Accion == 1)
                            listaRellenoSoldadoresFinal.push(soldadorRellenoDetalle[0]);
                    }
                }
            }

            ListaRellenoEditados = [];

            for (j = 0; j < listaRellenoSoldadoresFinal.length; j++) {
                ListaRellenoEditados[j] = {
                    Accion: "", JuntaSpoolID: "", SoldaduraTrabajoAdicionalID: "",
                    JuntaSoldaduraID: "", ObreroID: "", TipoSoldaduraID: "",
                };

                if (listaRellenoSoldadoresFinal[j].length > 0) {
                    ListaRellenoEditados[j].Accion = listaRellenoSoldadoresFinal[j].Accion;
                    ListaRellenoEditados[j].JuntaSoldaduraSoldadoID = listaRellenoSoldadoresFinal[j].JuntaSoldaduraSoldadoID;
                    ListaRellenoEditados[j].JuntaSoldaduraID = arregloCaptura[index].JuntaSoldaduraID;
                    ListaRellenoEditados[j].TipoSoldaduraID = arregloCaptura[index].procesoSoldaduraRellenoID;
                    ListaRellenoEditados[j].ObreroID = listaRellenoSoldadoresFinal[j].ObreroID;
                    ListaRellenoEditados[j].JuntaSpoolID = arregloCaptura[index].JuntaID;
                }
                else {
                    ListaRellenoEditados[j].Accion = listaRellenoSoldadoresFinal[j].Accion;
                    ListaRellenoEditados[j].JuntaSoldaduraSoldadoID = listaRellenoSoldadoresFinal[j].JuntaSoldaduraSoldadoID;
                    ListaRellenoEditados[j].JuntaSoldaduraID = arregloCaptura[index].JuntaSoldaduraID;
                    ListaRellenoEditados[j].TipoSoldaduraID = arregloCaptura[index].procesoSoldaduraRellenoID;
                    ListaRellenoEditados[j].ObreroID = listaRellenoSoldadoresFinal[j].ObreroID;
                    ListaRellenoEditados[j].JuntaSpoolID = arregloCaptura[index].JuntaID;
                }
            }

            ListaDetalles[index].ListaSoldaduraRelleno = ListaRellenoEditados;
            ListaDetalles[index].ListaSoldaduraRaiz = ListaSoldadoresEditados;
            ListaDetalles[index].ListaDetalleTrabajoAdicional = ListaTrabajosAdicionalesEditados;

            if (
                   (
                      ListaDetalles[index].ColadaID == "" || ListaDetalles[index].ColadaID == 0 ||
                      ListaDetalles[index].TallerID == "" || ListaDetalles[index].TallerID == "0" ||
                      ListaDetalles[index].ProcesoSoldaduraRaizID == "" || ListaDetalles[index].ProcesoSoldaduraRaizID == 0 ||
                      ListaDetalles[index].ProcesoSoldaduraRellenoID == "" || ListaDetalles[index].ProcesoSoldaduraRellenoID == 0 ||
                      ListaDetalles[index].FechaSoldadura == ""
                   ) && (ListaDetalles[index].Accion != 3 && ListaDetalles[index].Accion != 4)
                  ) {
                if ((ListaDetalles[index].ColadaID == "" || ListaDetalles[index].ColadaID == 0) &&
                      (ListaDetalles[index].TallerID == "" || ListaDetalles[index].TallerID == "0") &&
                      (ListaDetalles[index].ProcesoSoldaduraRaizID == "" || ListaDetalles[index].ProcesoSoldaduraRaizID == 0) &&
                      (ListaDetalles[index].ProcesoSoldaduraRellenoID == "" || ListaDetalles[index].ProcesoSoldaduraRellenoID == 0) &&
                      ListaDetalles[index].FechaSoldadura == "" && ListaDetalles[index].Accion == 2) {
                    ListaDetalles[index].Accion = 4;
                }
                else {

                    if (arregloCaptura[index].PermiteTerminadoRaiz && (ListaDetalles[index].ProcesoSoldaduraRaizID == "" || ListaDetalles[index].ProcesoSoldaduraRaizID == 0)) {
                        ListaDetalles[index].Estatus = 0;
                        $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                    }
                    if (arregloCaptura[index].PermiteTerminadoRelleno && (ListaDetalles[index].ProcesoSoldaduraRellenoID == "" || ListaDetalles[index].ProcesoSoldaduraRellenoID == 0)) {
                        ListaDetalles[index].Estatus = 0;
                        $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                    }
                    if (ListaDetalles[index].ColadaID == "" || ListaDetalles[index].ColadaID == 0 ||
                      ListaDetalles[index].TallerID == "" || ListaDetalles[index].TallerID == "0" ||
                        ListaDetalles[index].FechaSoldadura == ""
                        ) {
                        ListaDetalles[index].Estatus = 0;
                        $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                    }

                }
            }
            else {

            }
        }




        Captura[0].Detalles = ListaDetalles;






        ////        if (bandera) {
        if (!ExistRowEmpty(ListaDetalles)) {
            if (Captura[0].Detalles.length > 0) {
                AjaxEjecutarGuardado(Captura[0], tipoGuardar);
                loadingStart();
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
                    displayNotify("AdverteciaExcepcionGuardado", "", '1');
                }

                ventanaConfirm.close();
            });
            $("#noButton").click(function () {
                ventanaConfirm.close();
            });

        }
       
        loadingStop();
    } catch (e) {
        loadingStop();
        displayNotify("Mensajes_error", e.message, '2');
    }

};

function AjaxCambiarAccionAModificacion() {
    var capturaListado = [];
    capturaListado[0] = { Detalles: "" };
    var listado = ArregloListadoJuntasCapturadas();
    capturaListado[0].Detalles = listado;
    var isReporte = true;

    var listadogrid = $("#grid").data("kendoGrid").dataSource._data;

    $("#grid").data("kendoGrid").dataSource.data([]);

    var differentsJoits = [];
    for (var y = 0; y < listado.length; y++) {
        if (differentsJoits.length == 0) {
            differentsJoits.push(listado[y]);
        }
        else if (differentsJoits[differentsJoits.length - 1].SpoolID != listado[y].SpoolID) {
            differentsJoits.push(listado[y]);
        }
    }

    if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {
        isReporte = false;
        differentsJoits = listado;
    }

    for (var x = 0; x < differentsJoits.length; x++) {

        loadingStart();
        $CapturaSoldadura.Soldadura.read({ JsonCaptura: JSON.stringify(differentsJoits[x]), isReporte: isReporte, lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
            if (Error(data)) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = JSON.parse(data);

                for (var i = 0; i < array.length; i++) {
                    if (array[i].FechaSoldadura != null) {
                        array[i].FechaSoldadura = kendo.toString(array[i].FechaSoldadura, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
                        array[i].FechaSoldadura = new Date(ObtenerDato(array[i].FechaSoldadura, 1), ObtenerDato(array[i].FechaSoldadura, 2), ObtenerDato(array[i].FechaSoldadura, 3));//año, mes, dia
                    }

                    array[i].ListadoProcesoSoldadura.unshift({ Codigo: "", ProcesoSoldaduraID: 0 });

                    ds.add(array[i]);
                }
            }
            loadingStop();
        });
    }
}

function AjaxEjecutarGuardado(rows, tipoGuardar) {
    $CapturaSoldadura.Soldadura.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                displayNotify("CapturaMensajeGuardadoExitoso", "", '0');

                if (tipoGuardar == 1) {
                    Limpiar();
                    loadingStop();
                    AjaxCargarCamposPredeterminados();
                }
                else {
                    opcionHabilitarView(true, "FieldSetView");
                    loadingStop();
                    AjaxCambiarAccionAModificacion();
                }
            }
            else {
                loadingStop();
                displayNotify("CapturaMensajeGuardadoErroneo", "", '2');
            }
        }
    });
}

function AjaxCargarReporteJuntas() {
    
    var listadoReporte = ArregloListadoReporte();
    var elementoNoEncontrado = false;

    CapturaJuntas = [];
    CapturaJuntas[0] = { Detalles: "" };
    ListaDetalles = [];

    ListaDetalles = listadoReporte;
    CapturaJuntas[0].Detalles = ListaDetalles;


    if (listadoReporte.length > 0) {
        loadingStart();
        $CapturaSoldadura.Soldadura.read({ JsonCaptura: JSON.stringify(listadoReporte[0]), isReporte: true, lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
            if (Error(data)) {
                var elementosModificados = "";
                var elementosNoModificados = "";
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = JSON.parse(data);
               
                for (var i = 0; i < array.length; i++) {
                    if (!ExisteJuntaEnSpool(array[i])) {
                        ds.insert(0, array[i]);

                        if (array[i].FechaSoldadura != null) {
                            array[i].FechaSoldadura = new Date(ObtenerDato(array[i].FechaSoldadura, 1), ObtenerDato(array[i].FechaSoldadura, 2), ObtenerDato(array[i].FechaSoldadura, 3));//año, mes, dia
                        }
                        elementoNoEncontrado = true;

                        if (elementosModificados != "")
                            elementosModificados += ", " + array[i].Junta;
                        else
                            elementosModificados = array[i].Junta;
                    }
                    else {
                        for (var j = 0; j < ds._data.length; j++) {
                            if (array[i].SpoolID == ds._data[j].SpoolID && array[i].JuntaID == ds._data[j].JuntaID && ds._data[j].Accion == 3) {
                                ds._data[j].DetalleJunta = array[i].DetalleJunta;
                                ds._data[j].TemplateSoldadoresRaiz = array[i].TemplateSoldadoresRaiz;
                                ds._data[j].TemplateSoldadoresRelleno = array[i].TemplateSoldadoresRelleno;
                                ds._data[j].TipoJuntaID = array[i].TipoJuntaID;
                                ds._data[j].Accion = array[i].Accion;
                                ds._data[j].procesoSoldaduraRaizID = array[i].procesoSoldaduraRaizID;
                                ds._data[j].procesoSoldaduraRellenoID = array[i].procesoSoldaduraRellenoID;
                                ds._data[j].procesoSoldaduraRaiz = array[i].procesoSoldaduraRaiz;
                                ds._data[j].procesoSoldaduraRelleno = array[i].procesoSoldaduraRelleno;
                                ds._data[j].Proyecto = array[i].Proyecto;
                                ds._data[j].IDProyecto = array[i].IDProyecto;
                                ds._data[j].IdOrdenTrabajo = array[i].IdOrdenTrabajo;
                                ds._data[j].OrdenTrabajo = array[i].OrdenTrabajo;
                                ds._data[j].idVal = array[i].idVal;
                                ds._data[j].idText = array[i].idText;
                                ds._data[j].SpoolID = array[i].SpoolID;
                                ds._data[j].JuntaID = array[i].JuntaID;
                                ds._data[j].Junta = array[i].Junta;
                                ds._data[j].TipoJunta = array[i].TipoJunta;
                                ds._data[j].Cedula = array[i].Cedula;
                                ds._data[j].Diametro = array[i].Diametro;
                                ds._data[j].TallerID = array[i].TallerID;
                                ds._data[j].Taller = array[i].Taller;
                                ds._data[j].TemplateTrabajosAdicionales = array[i].TemplateTrabajosAdicionales;
                                ds._data[j].FechaSoldadura = array[i].FechaSoldadura;
                                ds._data[j].listaTrabajosAdicionalesSoldadura = array[i].listaTrabajosAdicionalesSoldadura;
                                ds._data[j].ListaTaller = array[i].ListaTaller;
                                ds._data[j].ListaWPS = array[i].ListaWPS;
                                ds._data[j].ListaCedulas = array[i].ListaCedulas;

                                if (array[i].FechaSoldadura != null) {
                                    ds._data[j].FechaSoldadura = new Date(ObtenerDato(array[i].FechaSoldadura, 1), ObtenerDato(array[i].FechaSoldadura, 2), ObtenerDato(array[i].FechaSoldadura, 3));//año, mes, dia
                                }

                                if (elementosModificados != "")
                                    elementosModificados += ", " + array[i].Junta;
                                else
                                    elementosModificados = array[i].Junta;

                                var elementgrid = ds._data.splice(j, 1);
                                ds._data.unshift(elementgrid[0]);

                                elementoNoEncontrado = true;
                            }
                            else if (array[i].SpoolID == ds._data[j].SpoolID && array[i].JuntaID == ds._data[j].JuntaID) {
                                //Elementos no agregados
                                if (elementosNoModificados != "")
                                    elementosNoModificados += ", " + array[i].Junta;
                                else
                                    elementosNoModificados = array[i].Junta;
                            }
                        }

                    }
                }
                $("#grid").data("kendoGrid").dataSource.sync();

                loadingStop();
                $("#InputID").data("kendoComboBox").value("");

                if (elementosModificados != "") {
                    displayNotify("", _dictionary.CapturaSoldaduraMsgExiste[$("#language").data("kendoDropDownList").value()] +
                        elementosModificados + _dictionary.CapturaArmadoMsgNuevoEnReporte[$("#language").data("kendoDropDownList").value()], '0');
                }
                if (elementosNoModificados != "") {
                    displayNotify("", _dictionary.CapturaSoldaduraMsgExiste[$("#language").data("kendoDropDownList").value()] +
                        elementosNoModificados + _dictionary.CapturaArmadoMsgExisteReporte[$("#language").data("kendoDropDownList").value()], '2');
                }
            }
        });
    } else {
        if ($('input:radio[name=Muestra]:checked').val() == "Sin Capturar") {
            displayNotify("CapturaSoldaduraNoExistenJuntasSpool", "", "1");
        } else {
            displayNotify("CapturaSoldaduraNoTieneJuntas", "", "2");
        }
    }
    $('#ButtonAgregar').prop("disabled", false);
}


function AjaxCargarCamposPredeterminados() {

    loadingStart();
    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            var NewDate = kendo.toString(data.FechaSoldadura, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

            endRangeDate.val(NewDate);


            if (data.TipoCaptura == "Reporte") {
                $('input:radio[name=TipoAgregado]:nth(0)').trigger("click");
                //$('input:radio[name=TipoAgregado]:nth(1)').removeAttr('checked');
                $("#styleReporte").addClass("active");
                $("#styleListado").removeClass("active");
                $('input:radio[name=TipoAgregado]:nth(0)').attr('checked', true).trigger("change");
            }
            else if (data.TipoCaptura == "Lista") {
                //$('input:radio[name=TipoAgregado]:nth(0)').removeAttr('checked');
                $('input:radio[name=TipoAgregado]:nth(1)').trigger("click");
                $("#styleListado").addClass("active");
                $("#styleReporte").removeClass("active");
                $('input:radio[name=TipoAgregado]:nth(1)').attr('checked', true).trigger("change");
            }
            //eventoCambioTipoListado();
        }
        loadingStop();
    });

};

function AjaxCargarCamposPredeterminadosCambiaTipoVista() {

    loadingStart();
    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            var NewDate = kendo.toString(data.FechaSoldadura, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

            endRangeDate.val(NewDate);

            if (data.Muestra == "Sincaptura") {
                $('input:radio[name=Muestra]:nth(0)').trigger("click");
                //$('input:radio[name=Muestra]:nth(1)').removeAttr('checked');

            }
            else if (data.Muestra == "Todos") {
                //$('input:radio[name=Muestra]:nth(0)').removeAttr('checked');
                $('input:radio[name=Muestra]:nth(1)').trigger("click");

            }

            if (data.Llena == "Todos") {
                $('input:radio[name=LLena]:nth(0)').trigger("click");
                //$('input:radio[name=LLena]:nth(1)').removeAttr('checked');

            }
            else if (data.Llena == "Vacios") {
                //$('input:radio[name=LLena]:nth(0)').removeAttr('checked');
                $('input:radio[name=LLena]:nth(1)').trigger("click");

            }

            //

        }
        loadingStop();
    });
}


function AjaxActualizaSoldadoresRaiz(ProcesoSoldaduraID, tipoJunta, diametro, espesor, cedula) {
    loadingStart();
    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token"), procesoSoldaduraID: ProcesoSoldaduraID, tipoJunta: tipoJunta, diametro: diametro, espesor: espesor, cedula: cedula, proceso: 1, idProyecto: Cookies.get("Proyecto").split('°')[0] }).done(function (data) {
        if (Error(data)) {
            ItemSeleccionado.ListadoRaiz = data;
        }
        $("#grid").data("kendoGrid").dataSource.sync();
        loadingStop();
    });
}

function AjaxActualizaSoldadoresRelleno(ProcesoSoldaduraID, tipoJunta, diametro, espesor, cedula) {
    loadingStart();
    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token"), procesoSoldaduraID: ProcesoSoldaduraID, tipoJunta: tipoJunta, diametro: diametro, espesor: espesor, cedula: cedula, proceso: 0, idProyecto: Cookies.get("Proyecto").split('°')[0] }).done(function (data) {
        if (Error(data)) {
            ItemSeleccionado.ListadoRelleno = data;
        }
        $("#grid").data("kendoGrid").dataSource.sync();
        loadingStop();
    });
}