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
        ListaDetalles[index].ClasificacionID = 1;
        ListaDetalles[index].PersistenciaID = 1; 
        ListaDetalles[index].NumeroVecesUsoMaximo = 0;
        ListaDetalles[index].PesoMaximo = 0; 
        ListaDetalles[index].Area = 0;


        if (!ValidarDatosNuevoCarro(ListaDetalles[index])) {
            Captura[0].Detalles = ListaDetalles;
            $MedioTransporte.MedioTransporte.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {                    
                    setTimeout(function () { AjaxPinturaCargaMedioTransporte(); }, 1100);
                    displayNotify("PinturaGuardarNuevoCarro", "", '0');
                    windowNewCarriage.close();
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
   

    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), proyectoID: $("#inputProyecto").data("kendoComboBox").value() }).done(function (data) {
        if (data.length > 0) {
            
            data.splice(1, 0, { MedioTransporteID: -1, NombreMedioTransporte: _dictionary.PinturaCargaAgregarNuevoCarro[$("#language").data("kendoDropDownList").value()] });
            $("#inputCarro").data("kendoComboBox").dataSource.data(data);            
            $("#inputCarroBacklog").data("kendoComboBox").dataSource.data(data);

            $("#inputCarro").data("kendoComboBox").select(0);
            $("#inputCarroBacklog").data("kendoComboBox").select(0);

            //Nuevo Medio Transporte
            if ($("#InputNombre").val() != "") {
                var newCar;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].NombreMedioTransporte == $("#InputNombre").val()) {
                        newCar = data[i];
                    }
                }                
                if ($("#styleEscritorio").hasClass("active")) {
                    $("#inputCarroBacklog").data("kendoComboBox").value(newCar.MedioTransporteID);
                    $("#inputCarroBacklog").data("kendoComboBox").trigger("change");
                } else {
                    $("#inputCarro").data("kendoComboBox").value(newCar.MedioTransporteID);
                    $("#inputCarro").data("kendoComboBox").trigger("change");
                }                
            }
        }
                
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
            $("#contenedorPrincipalCargaCarroBacklog").show();
            $("#contenedorPrincipalCargaCarro").hide();
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

        if (data.Muestra == "sin Captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        } else if (data.Muestra == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
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
    

    if ($("#inputProyecto").data("kendoComboBox").value() != "-1" && $("#inputProyecto").data("kendoComboBox").value() != "" &&
            $("#inputProyecto").data("kendoComboBox").value() != "0") {
        if ($("#inputCarro").data("kendoComboBox").value() != "-1" && $("#inputCarro").data("kendoComboBox").value() != "" &&
            $("#inputCarro").data("kendoComboBox").value() != "0") {

        if ((ObtenerTipoConsulta() == 1 && $("#InputID").data("kendoComboBox").value() !="") || (ObtenerTipoConsulta() == 2 && $("#inputCodigo").val() != "")) {
            loadingStart();
            var proyectoID = parseInt($("#inputProyecto").data("kendoComboBox").value());
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
                            if (array[i].SpoolID != 0) {
                                if (ds._data.length == 0) {
                                    if (array[i].NombreMedioTransporte == "") {

                                        if (array[i].ProyectoID == proyectoID) {
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
                                        if (array[i].ProyectoID == proyectoID) {
                                            if (array[i].SistemaPintura == ds._data[ds._data.length-1].SistemaPintura) {
                                                ds.insert(0, array[i]);
                                                displayNotify("", _dictionary.PinturaAgregaCargaExito[$("#language").data("kendoDropDownList").value()] + array[i].SpoolJunta, '0');
                                            } else {
                                                displayNotify("", _dictionary.PinturaCargaBackLogMensajeErrorServicioPintura[$("#language").data("kendoDropDownList").value()] + ds._data[0].SistemaPintura, "1");
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

                            }
                            
                        } else {
                            displayNotify("", _dictionary.PinturaCargaSpoolCargadoEnCarro[$("#language").data("kendoDropDownList").value()] + array[i].NombreMedioTransporte, "1");
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
    var curr_filters = ds.filter().filters;

    if (ds._data.length > 0) {

        for (var i = 0; i < array.length; i++) {
            if(curr_filters.length>1){
                if (array[i]["Accion"] == 1 || array[i]["Accion"] == 2) {
                    totalAreaCargada += parseFloat(array[i]["Area"], 10);
                    totalToneladasCargadas += parseFloat(array[i]["Peso"], 10);
                }
            } else {
                if (array[i]["Accion"] == 1) {
                    totalAreaCargada += parseFloat(array[i]["Area"], 10);
                    totalToneladasCargadas += parseFloat(array[i]["Peso"], 10);
                }
            }
        }

        totalToneladasCargadas = totalToneladasCargadas / 1000;

        $("#labelM2").css('text-align', 'right');
        $("#labelToneladas").css('text-align', 'right');
        $("#labelM2").text(totalAreaCargada.toFixed(2));
        $("#labelToneladas").text(totalToneladasCargadas.toFixed(2));
    }
    
    return totalAreaCargada;
}

function ImprimirAreaToneladaBackLog() {
    var ds = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource;
    var array = ds._data;
    var totalAreaCargada = 0;
    var totalToneladasCargadas = 0;
    var curr_filters = ds.filter().filters;

    if (ds._data.length > 0) {
        for (var i = 0; i < array.length; i++) {
            if(curr_filters.length>1){                
                if ((array[i]["Accion"] == 1 || array[i]["Accion"] == 2) && array[i].Seleccionado) {
                    totalAreaCargada += parseFloat(array[i]["Metros2"], 10);
                    totalToneladasCargadas += parseFloat(array[i]["Peso"], 10);
                }
            } else {
                if (array[i]["Accion"] == 1 && array[i].Seleccionado) {
                    totalAreaCargada += parseFloat(array[i]["Metros2"], 10);
                    totalToneladasCargadas += parseFloat(array[i]["Peso"], 10);
                }
            }
        }
        totalToneladasCargadas = totalToneladasCargadas / 1000;

        $("#labelM22").css('text-align', 'right');
        $("#labelToneladas2").css('text-align', 'right');
        $("#labelM22").text(totalAreaCargada!=0?totalAreaCargada.toFixed(2):"");
        $("#labelToneladas2").text(totalToneladasCargadas!=0?totalToneladasCargadas.toFixed(2):"");
    }
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

    $MedioTransporte.MedioTransporte.read({ medioTransporteCargaID: 0, medioTransporteID: MedioTransporteID, proyectoID: $("#inputProyecto").data("kendoComboBox").value(), token: Cookies.get("token"), lenguaje: $("#language").val(), todos: 1 }).done(function (data) {
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

            if(array[0].CarroCerrado){
                $("#chkCerrar2")[0].checked = true;
            } else {
                $("#chkCerrar2")[0].checked = false;
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
        var mediosDeTransporteEnElGrid = $("#grid").data("kendoGrid").dataSource._data;
        var carroCerrado = $("#inputCarro").attr("mediotransportecerrado");
        var proyectoID = $("#inputProyecto").data("kendoComboBox").value()!=undefined?$("#inputProyecto").data("kendoComboBox").value():"";
        var medioTransporteID = $("#inputCarro").data("kendoComboBox").value()!=undefined?$("#inputCarro").data("kendoComboBox").value():"";
        var medioTransporteCargaID = $("#inputCarro").attr("mediotransporteid");

        if (proyectoID != "" && proyectoID != "0") {
            if (medioTransporteID != "" && medioTransporteID != "0" && medioTransporteID != "-1") {
                if (mediosDeTransporteEnElGrid.length > 0) {
                    loadingStart();
                    Captura = [];
                    Captura[0] = { Detalles: "" };
                    ListaGuardarDetalles = [];

                    for (index = 0; index < arregloCaptura.length; index++) {
                        ListaGuardarDetalles[index] = { SpoolID: "", MedioTransporteCargaID: 0, Accion: "", CuadranteID: 0 };
                        ListaGuardarDetalles[index].Accion = arregloCaptura[index].Accion;
                        ListaGuardarDetalles[index].SpoolID = arregloCaptura[index].SpoolID;
                        ListaGuardarDetalles[index].CuadranteID = arregloCaptura[index].CuadranteID;
                        ListaGuardarDetalles[index].MedioTransporteCargaID = arregloCaptura[index].MedioTransporteCargaID;
                    }

                    Captura[0].Detalles = ListaGuardarDetalles;

                        var disponible = 1;
                        if ($('#chkCerrar2').is(':checked') && carroCerrado!="false") {
                            disponible = 0;
                        }                
                        $MedioTransporte.MedioTransporte.create(Captura[0], {
                            token: Cookies.get("token"), lenguaje: $("#language").val(), medioTransporteID: medioTransporteID,
                            medioTransporteCargaID: medioTransporteCargaID, cerrar: disponible
                        }).done(function (data) {

                            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                                if (!guardarYNuevo) {
                                    opcionHabilitarView(true, "FieldSetView");

                                    AjaxObtenerDetalleCarroCargado(medioTransporteID);
                                   if(disponible=0){
                                       displayNotify("PinturaCerrarCarro", "", '0');
                                   } else {
                                       displayNotify("PinturaGuardarGuardar", "", '0');
                                   }

                                } else {
                                    Limpiar();
                                    displayNotify("PinturaGuardarGuardar", "", '0');
                                }                            

                            } else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                                displayNotify("PinturaGuardarErrorGuardar", "", '2');
                            }
                            loadingStop();
                        });
                }
                //else {
                //    loadingStop();
                //    displayNotify("DimensionalVisualMensajeNoHayDatosPorGuardar", "", '2');

                //}

            }
        }
    } catch (e) {
        loadingStop();
        displayNotify("", _dictionary.Mensajes_error[$("#language").data("kendoDropDownList").value()] + e.message, '2');

    }
};

function AjaxSubirSpool(listaSpool, guardarYNuevo) {
    var count = 0;
    var contSave = 0;
    var proyectoID = $("#inputProyecto").data("kendoComboBox").value() != undefined ? $("#inputProyecto").data("kendoComboBox").value() : "";
    var medioTransporteID = $("#inputCarroBacklog").data("kendoComboBox").value() != undefined ? $("#inputCarroBacklog").data("kendoComboBox").value() : "";
    var medioTransporteCargaID = $('#inputCarroBacklog').attr("mediotransporteid");
    var carroCerrado = $("#inputCarroBacklog").attr("mediotransportecerrado");

    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    ListaGuardarDetalles = [];
    if (proyectoID != "" && proyectoID != "0") {
        if (medioTransporteID != "" && medioTransporteID != "0" && medioTransporteID != "-1") {
            if (listaSpool.length>0) {
                for (var index = 0 ; index < listaSpool.length; index++) {
                    if (listaSpool[index].Seleccionado) {
                        ListaGuardarDetalles[contSave] = {SpoolID: "", MedioTransporteCargaID: 0, Accion: "", CuadranteID : 0};          
                        ListaGuardarDetalles[contSave].Accion = listaSpool[index].Accion;
                        ListaGuardarDetalles[contSave].SpoolID = listaSpool[index].SpoolID;
                        ListaGuardarDetalles[contSave].CuadranteID = listaSpool[index].CuadranteID;
                        ListaGuardarDetalles[contSave].MedioTransporteCargaID = listaSpool[index].MedioTransporteCargaID;
                        contSave++;
                    }

                    if (listaSpool[index].Seleccionado && listaSpool[index].Accion != 3) {
                        ListaDetalles[count] = { Spool: "", SistemaPintura: "", Seleccionado: ""};
                        ListaDetalles[count].Spool = listaSpool[index].SpoolID;
                        ListaDetalles[count].SistemaPintura = listaSpool[index].SistemaPintura;
                        ListaDetalles[count].Seleccionado = listaSpool[index].Seleccionado;
                        count++;
                    }
                }

                var disponible = 1;
                if ($('#chkCerrar').is(':checked') && carroCerrado=="false") {
                    disponible = 0;
                }
        
                if (ListaDetalles.length > 0) {
                   if (ListaGuardarDetalles.length != 0) {
                    if (ServicioPinturaCorrecto(ListaDetalles)) {            

                            Captura[0].Detalles = ListaGuardarDetalles;

                            loadingStart();                        
                            $MedioTransporte.MedioTransporte.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), medioTransporteID: medioTransporteID, medioTransporteCargaID: medioTransporteCargaID, cerrar: disponible }).done(function (data) {

                                    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {                                
                                   
                                        if (!guardarYNuevo) {
                                            opcionHabilitarViewBacklog(true, "FieldSetView");
                                            AjaxCargarSpoolBacklog(true, medioTransporteID);

                                            if(disponible == 0){
                                                displayNotify("PinturaCerrarCarro", "", '0');
                                            } else {
                                                displayNotify("PinturaGuardarGuardar", "", '0');
                                            }
                                            
                                        } else {
                                            Limpiar();
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
                            displayNotify("", _dictionary.PinturaCargaBackLogMensajeErrorServicioPintura[$("#language").data("kendoDropDownList").value()] + ListaDetalles[0].SistemaPintura, "1");
                        }
                    }
                } else {
                    displayNotify("PinturaCargaBackLogMensajeSeleccionaSpool", "", "1");
                }
            }
        }
    }
}

function AjaxCargarSpoolBacklog(cargarSpoolsDespuesDeCargar, MedioTransporteID) {
    loadingStart();
    var MedioTransporteCargaID = $("#inputCarroBacklog").attr("mediotransporteid");
    if (MedioTransporteID == 0) {
        MedioTransporteCargaID = 0;
    }

   $CargaCarroBackLog.CargaCarroBackLog.read({ medioTransporteCargaID: MedioTransporteCargaID, medioTransporteID: MedioTransporteID, token: Cookies.get("token"), proyectoID: $("#inputProyecto").data("kendoComboBox").value(), todos: 1 }).done(function (data) {
        $("#grid[nombre='grid-backlog']").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource;
        var array = data;
        if (data.length > 0) {
            var localDataSource = new kendo.data.DataSource({
                data: data,
                schema: {
                    model: {
                        fields: {
                            OrdenImportancia: { type: "number", editable: false },
                            SpoolJunta: { type: "string", editable: false },
                            SistemaPintura: { type: "string", editable: false },
                            Color: { type: "string", editable: false },
                            CuadranteMedioTransporte: { type: "string", editable: false },
                            NombreMedioTransporte: { type: "string", editable: false },
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
                serverSorting: false,
                aggregate: [
                    { field: "Metros2", aggregate: "sum" },
                    { field: "Peso", aggregate: "sum" }
                ]
            });

            $("#grid[nombre='grid-backlog']").data("kendoGrid").setDataSource(localDataSource);
            CustomisaGrid($("#grid[nombre='grid-backlog']"));
            if (array[0].CarroCerrado && MedioTransporteID!=0) {
                $("#chkCerrar")[0].checked = true;
            }
            if (cargarSpoolsDespuesDeCargar) {
                opcionHabilitarViewBacklog(true, "FieldSetView");
            }
            ImprimirAreaToneladaBackLog();
        }
        
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

                $("#inputCarroBacklog").data("kendoComboBox").dataSource.data([]);
                $("#inputCarroBacklog").data("kendoComboBox").value("");
                $("#inputCarroBacklog").data("kendoComboBox").dataSource.data(data);

                $("#inputCarroBacklog").data("kendoComboBox").value(medioTransporteId);
                $("#inputCarroBacklog").data("kendoComboBox").trigger("change");
                AjaxCargarSpoolBacklog(true, medioTransporteId);

            } else {
                $("#inputCarro").data("kendoComboBox").dataSource.data([]);
                $("#inputCarro").data("kendoComboBox").value("");

                $("#inputCarro").data("kendoComboBox").dataSource.data(data);

                $("#inputCarro").data("kendoComboBox").value(medioTransporteId);
                $("#inputCarro").data("kendoComboBox").trigger("change");
            }           
        }
    });
}


// ICD Carga el catalogo de Cuadrantes para la descarga de Spools en el carrito
function AjaxCargarCuadrante(area) {
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), AreaID: area }).done(function (data) {
        $("#inputCuadrantePopup").data("kendoComboBox").value("");
        $("#inputCuadrantePopup").data("kendoComboBox").dataSource.data(data);
        
    });
}