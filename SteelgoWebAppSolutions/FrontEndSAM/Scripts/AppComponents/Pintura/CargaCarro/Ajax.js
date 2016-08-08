﻿function AjaxGuardarNuevoCarro() {

    try {
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];

        var index = 0;

        ListaDetalles[index] = { Nombre: "", ClasificacionID: "", PersistenciaID: "", NumeroVecesUsoMaximo: "", PesoMaximo: "", Area: "", ClasificacionMedioTransporteID: "" };
        ListaDetalles[index].Nombre = $("#InputNombre").val();
        ListaDetalles[index].ClasificacionMedioTransporteID = 1;
        ListaDetalles[index].ClasificacionID = 1;
        ListaDetalles[index].PersistenciaID = 1; 
        ListaDetalles[index].NumeroVecesUsoMaximo = 0;
        ListaDetalles[index].PesoMaximo = 0; 
        ListaDetalles[index].Area = 0;


        if (!ValidarDatosNuevoCarro(ListaDetalles[index])) {
            Captura[0].Detalles = ListaDetalles;
            $MedioTransporte.MedioTransporte.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    windowNewCarriage.close();
                    setTimeout(function () { AjaxPinturaCargaMedioTransporte(); }, 1100);
                   displayNotify("PinturaGuardarNuevoCarro", "", '0');
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    displayNotify("PinturaErrorGuardarNuevoCarro", "", '2');
                }
                
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
            
            data.splice(1, 0, { MedioTransporteID: -1, NombreMedioTransporte: _dictionary.PinturaCargaAgregarNuevoCarro[$("#language").data("kendoDropDownList").value()] });
            $("#inputCarro").data("kendoComboBox").dataSource.data(data);
            $("#inputCarroBacklog").data("kendoComboBox").dataSource.data(data);
            

            if ($("#InputNombre").val() != "") {
                var newCar;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].NombreMedioTransporte == $("#InputNombre").val()) {
                        newCar = data[i];
                    }
                }
                
                if ($("#styleEscritorio").hasClass("active")) {                    
                    $("#inputCarro").data("kendoComboBox").value(newCar.MedioTransporteID);
                    $("#inputCarro").data("kendoComboBox").trigger("change");
                } else {
                    $("#inputCarroBacklog").data("kendoComboBox").value(newCar.MedioTransporteID);
                    $("#inputCarroBacklog").data("kendoComboBox").trigger("change");
                    AjaxCargarSpoolBacklog(false, newCar.MedioTransporteCargaID);
                }                
                $("#InputNombre").val("");
            }
        }
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
        }
        else if (data.Vista == "Patio") {
            $("#styleEscritorio").removeClass("active");
            $("#stylePatio").addClass("active");
            $('input:radio[name=TipoVista]:nth(0)').attr('checked', false);
            $('input:radio[name=TipoVista]:nth(1)').attr('checked', true);            
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

function AjaxAgregarCarga() {

    if ($("#inputProyecto").data("kendoComboBox").value() != "-1" && $("#inputProyecto").data("kendoComboBox").value() != "") {
    if ($("#inputCarro").data("kendoComboBox").value() != "-1" && $("#inputCarro").data("kendoComboBox").value() != "") {

        if ((ObtenerTipoConsulta() == 1 && $("#InputID").data("kendoComboBox").value() !="") || (ObtenerTipoConsulta() == 2 && $("#inputCodigo").val() != "")) {
            loadingStart();

            Captura = [];
            Captura[0] = { Detalles: "" };
            ListaDetalles = [];

            var index = 0;

            ListaDetalles[index] = { TipoConsulta: "", OrdenTrabajoSpoolID: "", Codigo: "" };
            ListaDetalles[index].TipoConsulta = ObtenerTipoConsulta();

            switch (ListaDetalles[index].TipoConsulta) {
                case 1: 
                    ListaDetalles[index].OrdenTrabajoSpoolID = $("#InputID").val();
                    ListaDetalles[index].Codigo = 0;
                    break;
                case 2:
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
                                if (array[i].NombreMedioTransporte == "") {

                                    if (array[i].ProyectoID == parseInt($("#inputProyecto").data("kendoComboBox").value())) {
                                        ds.insert(0, array[i]);
                                        displayNotify("", _dictionary.PinturaAgregaCargaExito[$("#language").data("kendoDropDownList").value()] + array[i].SpoolJunta, '0');
                                    } else {
                                        displayNotify("PinturaCargaCarroSpoolProyectoEquivocado", "", '1');
                                    }
                                } else {
                                    displayNotify("", _dictionary.PinturaCargaSpoolCargadoEnCarro[$("#language").data("kendoDropDownList").value()] + array[i].NombreMedioTransporte, "1");
                                }

                            }
                            else {
                                if (array[i].NombreMedioTransporte == "") {
                                    if (array[i].ProyectoID == ds._data[0].ProyectoID) {
                                        if (array[i].SistemaPintura == ds._data[0].SistemaPintura) {
                                            ds.insert(0, array[i]);
                                            displayNotify("", _dictionary.PinturaAgregaCargaExito[$("#language").data("kendoDropDownList").value()] + array[i].SpoolJunta, '0');
                                        } else {
                                            displayNotify("PinturaCargaBackLogMensajeErrorServicioPintura", "", "1");
                                        }
                                    } else {
                                        displayNotify("PinturaCargaCarroSpoolProyectoDiferente", "", '1');
                                    }
                                }
                                else {
                                    displayNotify("", _dictionary.PinturaCargaSpoolCargadoEnCarro[$("#language").data("kendoDropDownList").value()] + array[i].NombreMedioTransporte, "1");
                                    
                                }
                            }
                        } else {
                            displayNotify("", _dictionary.PinturaCargaSpoolCargadoEnCarro[$("#language").data("kendoDropDownList").value()] + array[i].NombreMedioTransporte, "1");
                            //Cambiar Mensaje
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
    } else {
        displayNotify("PinturaSeleccionarProyecto", "", '2');
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
                    ds.add(array[i]);
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
            ListaGuardarDetalles = [];


            for (index = 0; index < arregloCaptura.length; index++) {
                ListaGuardarDetalles[index] = { SpoolID: "", MedioTransporteCargaID: $("#inputCarro").attr("mediotransporteid"), Accion: "" };
                ListaGuardarDetalles[index].Accion = arregloCaptura[index].Accion;
                ListaGuardarDetalles[index].SpoolID = arregloCaptura[index].SpoolID;
            }

            Captura[0].Detalles = ListaGuardarDetalles;

                var disponible = 1;
                if ($('#chkCerrar2').is(':checked')) {
                    disponible = 0;
                }
                var medioTransporteID = $("#inputCarro").data("kendoComboBox").value();
                var medioTransporteCargaID = $("#inputCarro").attr("mediotransporteid")
                $MedioTransporte.MedioTransporte.create(Captura[0], {
                    token: Cookies.get("token"), lenguaje: $("#language").val(), medioTransporteID: medioTransporteID,
                    medioTransporteCargaID: medioTransporteCargaID, cerrar: disponible
                }).done(function (data) {

                    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                        if (disponible == 0) {
                            Limpiar();
                            displayNotify("PinturaCerrarCarro", "", '0');
                        } else {
                            if (!guardarYNuevo) {
                                opcionHabilitarView(true, "FieldSetView");
                                $("#grid").data("kendoGrid").dataSource.sync();
                            } else {
                                Limpiar();
                            }
                            displayNotify("PinturaGuardarGuardar", "", '0');
                        }

                    } else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                        displayNotify("PinturaGuardarErrorGuardar", "", '2');
                    }
                    loadingStop();
                });
        }
        else {
            loadingStop();
            displayNotify("DimensionalVisualMensajeNoHayDatosPorGuardar", "", '2');

        }
    } catch (e) {
        loadingStop();
        displayNotify("", _dictionary.Mensajes_error[$("#language").data("kendoDropDownList").value()] + e.message, '2');

    }
};

function AjaxSubirSpool(listaSpool, guardarYNuevo) {
    var contSave = 0;
    var medioTransporteID;
    var countSelectedSpool = 0;
    var count = 0;
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    ListaGuardarDetalles = [];

    if (listaSpool.length>0) {
        for (var index = 0 ; index < listaSpool.length; index++) {
            if (listaSpool[index].Seleccionado) {

                ListaGuardarDetalles[contSave] = {SpoolID: "", MedioTransporteCargaID: $('#inputCarroBacklog').attr("mediotransporteid"),
                    Accion: ""
                };          
                ListaGuardarDetalles[contSave].Accion = listaSpool[index].Accion;
                ListaGuardarDetalles[contSave].SpoolID = listaSpool[index].SpoolID;
                contSave++;

            }

            if (listaSpool[index].Seleccionado && listaSpool[index].Accion != 3) {
                ListaDetalles[count] = {
                    Spool: "",
                    SistemaPintura: "",
                    Seleccionado: ""
                };
                ListaDetalles[count].Spool = listaSpool[index].SpoolID;
                ListaDetalles[count].SistemaPintura = listaSpool[index].SistemaPintura;
                ListaDetalles[count].Seleccionado = listaSpool[index].Seleccionado;
                count++;
                ++countSelectedSpool;
            }
        }

        var disponible = 1;
        if ($('#chkCerrar').is(':checked')) {
            disponible = 0;
        }

        if (countSelectedSpool > 0) {
            var MedioTransporteID = $('#inputCarroBacklog').data("kendoComboBox").value();
            var MedioTransporteCargaID = $('#inputCarroBacklog').attr("mediotransporteid");

           if (ListaGuardarDetalles.length != 0) {
            if (ServicioPinturaCorrecto(ListaDetalles)) {            

                    Captura[0].Detalles = ListaGuardarDetalles;

                    loadingStart();

                    $MedioTransporte.MedioTransporte.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), medioTransporteID: MedioTransporteID, medioTransporteCargaID: MedioTransporteCargaID, cerrar: disponible }).done(function (data) {

                            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {                                
                                if (disponible == 0) {
                                    Limpiar();
                                    displayNotify("PinturaCerrarCarro", "", '0');
                                }
                                else {
                                    if (!guardarYNuevo) {
                                        AjaxObtieneMedioTransporteCargado(MedioTransporteID, "Patio");
                                    } else {
                                        Limpiar();
                                    }
                                    displayNotify("PinturaGuardarGuardar", "", '0');
                                }

                            }
                            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                                displayNotify("PinturaGuardarErrorGuardar", "", '2');
                            }
                            loadingStop();
                        });                   
                }
                else {
                    displayNotify("PinturaCargaBackLogMensajeErrorServicioPintura", "", "1");
                }
            }
        } else {
            displayNotify("PinturaCargaBackLogMensajeSeleccionaSpool", "", "1");
        }

    } else {
        displayNotify("DimensionalVisualMensajeNoHayDatosPorGuardar", "", "2");
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
                        Seleccionado: { type: "boolean", editable: false }
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
function AjaxObtieneMedioTransporteCargado(medioTransporteId, tipoVista) {

    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), proyectoID: $("#inputProyecto").data("kendoComboBox").value() }).done(function (data) {
              
        if (data.length > 0) {
            data.splice(1, 0, { MedioTransporteID: -1, NombreMedioTransporte: _dictionary.PinturaCargaAgregarNuevoCarro[$("#language").data("kendoDropDownList").value()] });
            if (tipoVista == "Escritorio") {
                $("#inputCarro").data("kendoComboBox").dataSource.data([]);
                $("#inputCarro").data("kendoComboBox").value("");

                $("#inputCarro").data("kendoComboBox").dataSource.data(data);

                $("#inputCarro").data("kendoComboBox").value(medioTransporteId);
                $("#inputCarro").data("kendoComboBox").trigger("change");
            } else {
                $("#inputCarroBacklog").data("kendoComboBox").dataSource.data([]);
                $("#inputCarroBacklog").data("kendoComboBox").value("");
                $("#inputCarroBacklog").data("kendoComboBox").dataSource.data(data);

                $("#inputCarroBacklog").data("kendoComboBox").value(medioTransporteId);
                $("#inputCarroBacklog").data("kendoComboBox").trigger("change");
                AjaxCargarSpoolBacklog(true, $('#inputCarroBacklog').attr("mediotransporteid"));
            }

            
            
        }
    });
}