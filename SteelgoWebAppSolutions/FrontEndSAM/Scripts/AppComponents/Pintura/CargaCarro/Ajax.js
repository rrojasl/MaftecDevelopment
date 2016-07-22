function AjaxGuardarNuevoCarro() {

    try {
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];

        var index = 0;

        ListaDetalles[index] = { Nombre: "", ClasificacionID: "", PersistenciaID: "", NumeroVecesUsoMaximo: "", PesoMaximo: "", Area: "", ClasificacionMedioTransporteID: "" };
        ListaDetalles[index].Nombre = $("#InputNombre").val();
        ListaDetalles[index].ClasificacionMedioTransporteID = 1;
        ListaDetalles[index].ClasificacionID = 1; //$("#inputClasificacion").val();
        ListaDetalles[index].PersistenciaID = 1; // $("#inputPersistencia").val();
        ListaDetalles[index].NumeroVecesUsoMaximo = 0; //$("#inputNumeroVeces").val();
        ListaDetalles[index].PesoMaximo = 0; //$("#inputPesoMaximo").val();
        ListaDetalles[index].Area = 0; //$("#inputArea").val();


        if (!ValidarDatosNuevoCarro(ListaDetalles[index])) {
            Captura[0].Detalles = ListaDetalles;
            $MedioTransporte.MedioTransporte.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    displayNotify("PinturaGuardarNuevoCarro", "", '1');
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    displayNotify("PinturaErrorGuardarNuevoCarro", "", '2');
                }
                windowNewCarriage.close();
                setTimeout(function () { AjaxPinturaCargaMedioTransporte(); }, 1100);
                loadingStop();
            });
        }
        else {
            loadingStop();
        }
    } catch (e) {
        loadingStop();
        displayNotify("Mensajes_error", e.message, '0');

    }
}

function AjaxPinturaCargaMedioTransporte() {
    loadingStart();

    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), proyectoID: $("#inputProyecto").data("kendoComboBox").value() }).done(function (data) {
        $("#inputCarro").data("kendoComboBox").dataSource.data([]);
        $("#inputCarroBacklog").data("kendoComboBox").dataSource.data([]);
        $("#inputCarro").data("kendoComboBox").value("");
        $("#inputCarroBacklog").data("kendoComboBox").value("");
        if (data.length > 0) {
            data.unshift({ MedioTransporteID: -1, NombreMedioTransporte: _dictionary.PinturaCargaAgregarNuevoCarro[$("#language").data("kendoDropDownList").value()] });

            $("#inputCarro").data("kendoComboBox").dataSource.data(data);
            $("#inputCarroBacklog").data("kendoComboBox").dataSource.data(data);
        }
        loadingStop();
    });
}

function AjaxObtenerCatalogoClasificacion() {
    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), idCatalogo: 0 }).done(function (data) {
        if (data.length > 0) {
            $("#inputClasificacion").data("kendoComboBox").text("");
            $("#inputClasificacion").data("kendoComboBox").dataSource.data(data);
        } else {
            $("#inputClasificacion").data("kendoComboBox").text("");
        };

        loadingStop();
    });
}

function AjaxObtenerCatalogoPersistencia() {
    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), idCatalogo: 1 }).done(function (data) {

        if (data.length > 0) {
            $("#inputPersistencia").data("kendoComboBox").value("");
            $("#inputPersistencia").data("kendoComboBox").dataSource.data(data);
        } else {
            $("#inputPersistencia").data("kendoComboBox").value("");
        };
        loadingStop();
    });
}

function AjaxCargarCamposPredeterminados() {
    loadingStart();
    $MedioTransporte.MedioTransporte.read({ predeterminado: "", token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.Vista == "Escritorio") {
            $('input:radio[name=TipoVista]:nth(0)').attr('checked', true);
            $('input:radio[name=TipoVista]:nth(1)').attr('checked', false);
            $("#styleEscritorio").addClass("active");
            $("#stylePatio").removeClass("active");
            $("#contenedorPrincipalCargaCarro").show();
            $("#contenedorPrincipalCargaCarroBacklog").hide();
            $("#chkCerrar2").attr("checked", false);
        }
        else if (data.Vista == "Patio") {
            $('input:radio[name=TipoVista]:nth(0)').attr('checked', false);
            $('input:radio[name=TipoVista]:nth(1)').attr('checked', true);
            $("#styleEscritorio").addClass("active");
            $("#stylePatio").removeClass("active");
            $("#contenedorPrincipalCargaCarro").hide();
            $("#contenedorPrincipalCargaCarroBacklog").show();
            $("#chkCerrar").attr("checked", false);
        }

        if (data.Opcion == "Spool") {
            $('input:radio[name=PinturaCargaTipoSeleccion]:nth(0)').attr('checked', true).trigger("change");
        }
        else if (data.Opcion == "Codigo") {
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(1)').attr('checked', true).trigger("change");
        }
        loadingStop();
    });

}

function AjaxObtenerSpoolID() {
    $CapturaArmado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
        $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
        Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
    });
}


function AjaxObtenerListaProyectos() {
    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token") }).done(function (data) {

        $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
        $("#inputProyecto").data("kendoComboBox").dataSource.data(data);
    });
}


function AjaxCerrarCarro() {

    loadingStart();
    var haySpoolsEnElMedioDeTransporte = $("#grid").data("kendoGrid").dataSource._data;

    var ListaDetalles = [];

    ListaDetalles[0] = { MedioTransporteID: $('#inputCarro').attr("mediotransporteid"), CerrarCarro: 0 };

    if (haySpoolsEnElMedioDeTransporte.length > 0) {
        if ($("#inputCarro").val() != "-1") {
            $MedioTransporte.MedioTransporte.update(ListaDetalles[0], { token: Cookies.get("token") }).done(function (data) {

                displayNotify("PinturaCerrarCarro", "", '1');

                Limpiar();
                loadingStop();
            });
        }
        else {
            loadingStop();
            displayNotify("ErrorGuardarAntesElCarro", "", '2');
        }
    }
    else {
        loadingStop();
        displayNotify("PinturaCargaNoHaySpoolsEnElCarro", "", '2');
    }
}

function AjaxAgregarCarga() {
    if ($("#inputCarro").data("kendoComboBox").value() != "-1" && $("#inputCarro").data("kendoComboBox").value() != "") {
        if (ObtenerTipoConsulta() == 1 && $("#InputID").val() > -1 || ObtenerTipoConsulta() == 2 && $("#inputCodigo").val() != "") {
            loadingStart();

            Captura = [];
            Captura[0] = { Detalles: "" };
            ListaDetalles = [];

            var index = 0;

            ListaDetalles[index] = { TipoConsulta: "", OrdenTrabajoSpoolID: "", Codigo: "" };
            ListaDetalles[index].TipoConsulta = ObtenerTipoConsulta();
            switch (ListaDetalles[index].TipoConsulta) {
                case 1: //spool
                    ListaDetalles[index].OrdenTrabajoSpoolID = $("#InputID").val();
                    ListaDetalles[index].Codigo = 0;
                    break;//paquete
                case 2://codigo
                    ListaDetalles[index].OrdenTrabajoSpoolID = 0;
                    ListaDetalles[index].Codigo = $("#inputCodigo").val();
                    break;
                case -1:
                    ListaDetalles[index].OrdenTrabajoSpoolID = 0;
                    ListaDetalles[index].Codigo = 0;
                    break;

            }

            $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), TipoConsulta: ListaDetalles[index].TipoConsulta, OrdenTrabajoSpoolID: ListaDetalles[index].OrdenTrabajoSpoolID, Codigo: ListaDetalles[index].Codigo, lenguaje: $("#language").val(), medioTransporteID: $("#inputCarro").val() }).done(function (data) {

                var ds = $("#grid").data("kendoGrid").dataSource;                
                var carDataSourceSelected = $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select())
                var array = data;

                if (array.length > 0) {

                    for (var i = 0; i < array.length; i++) {
                        if (!validarInformacion(array[i])) {
                            if (ds._data.length == 0) {

                                if (array[i].ProyectoID == parseInt($("#inputProyecto").data("kendoComboBox").value()))
                                    ds.add(array[i]);
                                else
                                    displayNotify("PinturaCargaCarroSpoolProyectoEquivocado", "", '1');

                            }
                            else {
                                if (array[i].NombreMedioTransporte == "") {
                                    if (array[i].ProyectoID == ds._data[0].ProyectoID)
                                        ds.add(array[i]);
                                    else
                                        displayNotify("PinturaCargaCarroSpoolProyectoDiferente", "", '1');
                                }
                                else {
                                    displayNotify("PinturaCargaSpoolCargadoEnCarro", "" + array[i].NombreMedioTransporte, "1");// "" + array[i].NombreMedioTransporte,                                     
                                    console.log("Modificar texto");
                                }
                            }
                        }
                    }

                    ImprimirAreaTonelada();
                } else
                    displayNotify("PinturaCargaSpoolNoEncontrado", "", '2');


                loadingStop();
            });
        }
        else {
            if (ObtenerTipoConsulta() == 1) {
                displayNotify("PinturaCargaSeleccionaSpool", "", '2');
            }
            else {
                displayNotify("PinturaCargaSeleccionaCodigo", "", '2');
            }
        }
    }
    else {
        displayNotify("PinturaSeleccionarCarro", "", '2');
    }
}

function ImprimirAreaTonelada() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var array = ds._data;
    var totalAreaCargada = 0;
    var totalToneladasCargadas = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i]["Accion"] == 1 || array[i]["Accion"] == 2) {
            totalAreaCargada += parseFloat(array[i]["Area"], 10);
            totalToneladasCargadas += parseFloat(array[i]["Peso"], 10);
        }
    }

    $("#labelM2").text(totalAreaCargada.toFixed(2));
    $("#labelToneladas").text(totalToneladasCargadas.toFixed(4));
    return totalAreaCargada;
}

function ImprimirAreaToneladaBackLog() {
    var ds = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource;
    var array = ds._data;
    var totalAreaCargada = 0;
    var totalToneladasCargadas = 0;
    for (var i = 0; i < array.length; i++) {
        if ((array[i]["Accion"] == 1 || array[i]["Accion"] == 2) && array[i].Seleccionado) {
            totalAreaCargada += parseFloat(array[i]["Metros2"], 10);
            totalToneladasCargadas += parseFloat(array[i]["Peso"], 10);
        }
    }

    $("#labelM22").text(totalAreaCargada.toFixed(2));
    $("#labelToneladas2").text(totalToneladasCargadas.toFixed(4));
    return totalAreaCargada;
}



function SumarArea() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var array = ds._data;
    var totalAreaCargada = 0;
    for (var i = 0; i < array.length; i++) {
        totalAreaCargada += parseFloat(array[i]["Area"]);
    }

    return totalAreaCargada;
}

function SumarAreaBacklog() {
    var grid = $("#grid[nombre='grid-backlog']").data("kendoGrid");

    var sel = $("input:checked", grid.tbody).closest("tr");

    var detalle = [];
    $.each(sel, function (idx, spool) {
        var item = grid.dataItem(spool);
        detalle.push(item);
    });

    var totalAreaCargada = 0;
    for (var i = 0; i < detalle.length; i++) {
        totalAreaCargada += parseFloat(detalle[i]["Metros2"]);
    }

    return totalAreaCargada;
}

function SumarToneladaBacklog() {
    var grid = $("#grid[nombre='grid-backlog']").data("kendoGrid");

    var sel = $("input:checked", grid.tbody).closest("tr");

    var detalle = [];
    $.each(sel, function (idx, spool) {
        var item = grid.dataItem(spool);
        detalle.push(item);
    });

    var totalToneladasCargadas = 0;
    for (var i = 0; i < detalle.length; i++) {
        totalToneladasCargadas += parseFloat(detalle[i]["Peso"]);

    }

    return totalToneladasCargadas;
}

function AjaxObtenerDetalleCarroCargado(MedioTransporteID) {
    loadingStart();

    $MedioTransporte.MedioTransporte.read({ idMedioTransporteCarga: MedioTransporteID, token: Cookies.get("token"), lenguaje: $("#language").val(), statusCarga: 0 }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        $("#labelM2").text('');
        $("#labelToneladas").text('');
        var ds = $("#grid").data("kendoGrid").dataSource;

        var carDataSourceSelected = $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select())
        var array = data;
        
        if (array.length > 0) {

            for (var i = 0; i < array.length; i++) {
                if (!validarInformacion(array[i])) {
                    if (carDataSourceSelected.AreaPermitidoMedioTransporte > (SumarArea() + array[i].Area))
                        if (carDataSourceSelected.PesoMaximoPermitido > (SumarTonelada() + array[i].Peso)) {
                            ds.add(array[i]);
                        }
                        else {
                            displayNotify("PinturaCargaSpoolToneladaSuperiorPermididoCarro", "", '2');
                        }
                    else {
                        displayNotify("PinturaCargaSpoolAreaSuperiorPermididoCarro", "", '2');
                    }

                }
            }

            ImprimirAreaTonelada();
        }


        loadingStop();
    });
}

function SumarTonelada() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var array = ds._data;
    var totalToneladasCargadas = 0;
    for (var i = 0; i < array.length; i++) {
        totalToneladasCargadas += parseFloat(array[i]["Peso"]);

    }

    return totalToneladasCargadas;
}

function ajaxGuardar(arregloCaptura, guardarYNuevo) {
    try {
        var guardadoExitoso = false;
        var mediosDeTransporteEnElGrid = $("#grid").data("kendoGrid").dataSource._data;
        if (mediosDeTransporteEnElGrid.length > 0) {
            loadingStart();
            Captura = [];
            Captura[0] = { Detalles: "" };
            ListaDetalles = [];



            for (index = 0; index < arregloCaptura.length; index++) {
                ListaDetalles[index] = { SpoolID: "", MedioTransporteCargaID: $("#inputCarro").val(), Accion: "" };
                ListaDetalles[index].Accion = arregloCaptura[index].Accion;
                ListaDetalles[index].SpoolID = arregloCaptura[index].SpoolID;
            }

            Captura[0].Detalles = ListaDetalles;
            var disponible = 1;
            if ($('#chkCerrar2').is(':checked')) {
                disponible = 0;
            }

            $MedioTransporte.MedioTransporte.create(Captura[0], {
                token: Cookies.get("token"),
                lenguaje: $("#language").val(),
                medioTransporteID: $('#inputCarro').attr("mediotransporteid"),
                cerrar: disponible
            }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    displayNotify("PinturaGuardarGuardar", "", '0');
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    displayNotify("PinturaGuardarErrorGuardar", "", '2');
                }

                $("#grid").data("kendoGrid").dataSource.sync();

                if (!guardarYNuevo) {
                    opcionHabilitarView(true, "FieldSetView");
                }
                    
                loadingStop();
            });
        }
        else {
            loadingStop();
            displayNotify("PinturaCargaNoHaySpoolsEnElCarro", "", '2');

        }
    } catch (e) {
        loadingStop();
        displayNotify("Mensajes_error", e.message, '0');

    }
};

function AjaxSubirSpool(listaSpool, guardarYNuevo) {
    var contSave = 0;
    var medioTransporteID;
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    ListaGuardarDetalles = [];

    if ($('#inputCarroBacklog').attr("mediotransporteid") != undefined) {
        for (var index = 0 ; index < listaSpool.length; index++) {
            if (listaSpool[index].Seleccionado && !listaSpool[index].Status) {
                ListaDetalles[contSave] = {
                    Spool: "",
                    SistemaPintura: "",
                    Peso: "",
                    Area: ""
                };

                ListaGuardarDetalles[contSave] = {
                    Accion: listaSpool[index].Accion,
                    SpoolID: "",
                    MedioTransporteCargaID: $('#inputCarroBacklog').val()
                };

                ListaDetalles[contSave].Spool = listaSpool[index].SpoolID;
                ListaDetalles[contSave].SistemaPintura = listaSpool[index].SistemaPintura;
                ListaDetalles[contSave].Area = listaSpool[index].Metros2;
                ListaDetalles[contSave].Peso = listaSpool[index].Peso;

                ListaGuardarDetalles[contSave].SpoolID = listaSpool[index].SpoolID;
                contSave++;
            }
        }
        var disponible = 1;
        if ($('#chkCerrar').is(':checked')) {
            disponible = 0;
        }
        if (ListaDetalles.length != 0) {
            if (ServicioPinturaCorrecto(ListaDetalles)) {
                if (AreaYPesoPermitido(ListaDetalles)) {
                    MedioTransporteID = $("#inputCarroBacklog").data("kendoComboBox").value();
                    Captura[0].Detalles = ListaGuardarDetalles;

                    loadingStart();

                    console.log("idTransport: " + $('#inputCarro').attr("mediotransporteid"));
                    $MedioTransporte.MedioTransporte.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), medioTransporteID: $('#inputCarroBacklog').attr("mediotransporteid"), cerrar: disponible }).done(function (data) {

                        displayNotify("PinturaCargaBackLogMensajeGuardadoExitoso", "", "0");

                        if (disponible == 0) {
                            AjaxPinturaCargaMedioTransporte();
                            AjaxCargarSpoolBacklog(true, MedioTransporteID);

                        }
                        else {
                            var guardar = false;

                            if (!guardarYNuevo)
                            {
                                guardar = true;
                            }

                            AjaxCargarSpoolBacklog(true, MedioTransporteID);

                        }
                        loadingStop();
                    });
                }
            }
            else {
                displayNotify("PinturaCargaBackLogMensajeErrorServicioPintura", "", "1");
            }
        }
        else {
            displayNotify("PinturaGuardarGuardar", "", "0");
            opcionHabilitarViewBacklog(true, "FieldSetView");

        }

    }
}

function AjaxCargarSpoolBacklog(cargarSpoolsDespuesDeCargar, MedioTransporteCargaID) {
    loadingStart();

    if (MedioTransporteCargaID == 0 && $('#inputCarro').val() != "") MedioTransporteCargaID = $('#inputCarro').val();

    $CargaCarroBackLog.CargaCarroBackLog.read({ medioTransporteID: MedioTransporteCargaID, token: Cookies.get("token"), proyectoID: $("#inputProyecto").data("kendoComboBox").value() }).done(function (data) {
        $("#grid[nombre='grid-backlog']").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource;
        var array = data;

        var localDataSource = new kendo.data.DataSource({
            data: data,
            schema: {
                model: {
                    fields: {
                        OrdenImportancia: { type: "number", editable: false },
                        SpoolJunta: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Nombre: { type: "string", editable: false },
                        Metros2: { type: "number", editable: false },
                        Peso: { type: "number", editable: false },
                        Seleccionado: { type: "bool", editable: false }
                    }
                }
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        });

        $("#grid[nombre='grid-backlog']").data("kendoGrid").setDataSource(localDataSource);
        CustomisaGrid($("#grid[nombre='grid-backlog']"));
        if (cargarSpoolsDespuesDeCargar) {
            opcionHabilitarViewBacklog(true, "FieldSetView");
        }

        ImprimirAreaToneladaBackLog();
        loadingStop();
    });
}

function ServicioPinturaCorrecto(ListaDetalles) {
    var sistema;
    for (var i = 0 ; i < ListaDetalles.length ; i++) {
        if (i == 0) {
            sistema = ListaDetalles[0].SistemaPintura;
        }
        if (sistema != ListaDetalles[i].SistemaPintura) {
            return false;
        }
    }
    return true;
}

function AreaYPesoPermitido(ListaDetalles) {
    var carDataSourceSelected = $("#inputCarroBacklog").data("kendoComboBox").dataItem($("#inputCarroBacklog").data("kendoComboBox").select());

    for (var i = 0; i < ListaDetalles.length; i++) {
        if ((carDataSourceSelected.AreaPermitidoMedioTransporte - carDataSourceSelected.AreaMaximoOcupado) > (SumarAreaBacklog())) {
            if ((carDataSourceSelected.PesoMaximoPermitido - carDataSourceSelected.PesoMaximoOcupado) > (SumarToneladaBacklog())) {
                return true;
            }
            else {
                displayNotify("PinturaCargaSpoolToneladaSuperiorPermididoCarro", "", '2');
                return false;
            }
        }
        else {
            displayNotify("PinturaCargaSpoolAreaSuperiorPermididoCarro", "", '2');
            return false;
        }
    }
}

function SetDisabledBooleanEnGrid(deshabilitar) {
    var $grid = $("#grid[nombre='grid-backlog']");

    $("tr", $grid).each(function (index) {
        var $row = $(this);

        var $td = $row.find(':checkbox');

        $td.attr("disabled", deshabilitar);

    });
}
