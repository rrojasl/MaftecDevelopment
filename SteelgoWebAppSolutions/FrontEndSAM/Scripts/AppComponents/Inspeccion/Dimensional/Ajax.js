var TipoObrero = "Inspector Visual Dimensional";
var TipoConsultaObrero = 2;
var TipoPrueba = "Inspección dimensional";
var CampoFechaPredeterminada = 24;
var CampoResultadoPredetrminado = 25;
var CampoLlenadoPredeterminado = 26;

function AjaxObtenerListaInspector() {
    loadingStart();
    $Obrero.Obrero.read({ idProyecto: 0, tipo: TipoConsultaObrero, token: Cookies.get("token"), TipoObrero: TipoObrero }).done(function (data) {
        $("#inputInspector").data("kendoComboBox").value("");
        $("#inputInspector").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
   
}
function AjaxObtenerListaDefectos() {
    $Defectos.Defectos.read({ lenguaje: $("#language").val(), TipoPrueba: TipoPrueba, token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        $("#inputDefecto").data("kendoComboBox").value("");
        $("#inputDefecto").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}
function AjaxCargaCamposPredetrminados() {
    $InspeccionDimensional.InspeccionDimensional.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoFechaPredeterminada }).done(function (data) {
        var NewDate = kendo.toString(data.Fecha, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        endRangeDate.val(NewDate);
    
        if (data.Resultado == "Aprobado") {
            $('input#ResultadoDimensionalAprobado[name="ResultadoDimensional"]').click();
        }
        else if (data.Resultado == "Rechazado") {
            
            $('input#ResultadoDimensionalRechazado[name="ResultadoDimensional"]').click();
            
        }
        else {
            $('input#ResultadoDimensionalAprobado[name="ResultadoDimensional"]').click();
        }
    
        if (data.Llena == "Todos") {
            $('input:radio[name=LLena]:nth(0)').trigger("click");
            //$('input:radio[name=LLena]:nth(1)').attr('checked', false);
            $("input:radio[name=LLena]:checked").change();
           
        }
        else if (data.Llena == "Vacios") {
            //$('input:radio[name=LLena]:nth(0)').attr('checked', false);
            $('input:radio[name=LLena]:nth(1)').trigger("click");
            $("input:radio[name=LLena]:checked").change();
           
        }
        else {
            //$('input:radio[name=LLena]:nth(0)').attr('checked', false);
            $('input:radio[name=LLena]:nth(1)').trigger("click");
            $("input:radio[name=LLena]:checked").change();
           
        }

        if (data.Muestra == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
        else if (data.Muestra == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }        


    });
}
function AjaxObtenerSpoolID() {
    try {

        loadingStart();
        $CapturasRapidas.CapturasRapidas.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
           
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
    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: 'todos', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        
        if (data.ListaDetalleDimensional.length == 0) {
           
            $("#InspeccionDimensionalID").val("0")

        }
        else {
            $("#InspeccionDimensionalID").val(data.ListaDetalleDimensional[0].InspeccionDimensionalID);

        }
        loadingStop();
    });
}

function AjaxObtenerJSonGrid() {

    if (ExisteJunta()) {        
        try {
            loadingStart();
            $InspeccionDimensional.InspeccionDimensional.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), token: Cookies.get("token"), Lenguaje: $("#language").val() }).done(function (data) {                
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = JSON.parse(data);
                if (array.length > 0) {
                    for (var i = 0; i < array.length; i++) {                      
                        array[i].NumeroUnico1 = array[i].NumeroUnico1 == "" ? DatoDefaultNumeroUnico1() : array[i].NumeroUnico1;
                        array[i].NumeroUnico2 = array[i].NumeroUnico2 == "" ? DatoDefaultNumeroUnico2() : array[i].NumeroUnico2;
                        if (array[i].FechaInspeccion != null) {
                            array[i].FechaInspeccion = new Date(ObtenerDato(array[i].FechaInspeccion, 1), ObtenerDato(array[i].FechaInspeccion, 2), ObtenerDato(array[i].FechaInspeccion, 3));//año, mes, dia
                        }
                        ds.add(array[i]);
                        displayNotify("", _dictionary.DimensionalSpool[$("#language").data("kendoDropDownList").value()] + array[i].OrdenTrabajoSpool, '0');
                    }
                   
                }
                else {

                }
                loadingStop();
            });

        } catch (e) {         
            displayNotify("Mensajes_error", e.message, '2');
          
        }

    }
    else {
       // displayNotify("InspeccionDimensionalAdvertencia", "", '1');
        loadingStop();
    }
   

}

function ExisteJunta() {
    var jsonGridArmado = $("#grid").data("kendoGrid").dataSource._data;

    for (var i = 0; i < jsonGridArmado.length; i++) {
        if (jsonGridArmado[i].OrdenTrabajoSpool == ($("#InputOrdenTrabajo").val() + '-' + $("#InputID").data("kendoComboBox").text())) {
            if (jsonGridArmado[i].Accion == 3) {
                jsonGridArmado[i].Accion = 2;
                $("#grid").data("kendoGrid").dataSource.sync();
            }
            else
            {

                displayNotify("", _dictionary.DimensionalSpoolExist[$("#language").data("kendoDropDownList").value()] + jsonGridArmado[i].OrdenTrabajoSpool, "1");
            }
        
            return false;
        }
      
    }
    return true;
}


function AjaxGuardar(jSonCaptura, tipoGuardado) {
        Captura = [];
    Captura[0] = { Detalles: "" };
    
    var mensaje = '';
    inspeccionDimensional = [];
    Juntas = [];
    if (InspectorCorrecto(jSonCaptura)) {
        for (index = 0; index < jSonCaptura.length; index++) {
            if (jSonCaptura[index].FechaInspeccion != null && (jSonCaptura[index].InspectorID != 0 && jSonCaptura[index].DefectosID != 0)) {

                inspeccionDimensional[index] = { Accion: "", InspeccionDimensionalID: "", FechaInspeccion: "", ResultadoID: "", Resultado: "", InspectorID: "", Inspector: "", DefectosID: "", Defectos: "", OrdenTrabajoSpoolID: "", ListaJuntas: "" }
                inspeccionDimensional[index].Accion = jSonCaptura[index].Accion;
                inspeccionDimensional[index].InspeccionDimensionalID = jSonCaptura[index].InspeccionDimensionalID;
                inspeccionDimensional[index].OrdenTrabajoSpoolID = jSonCaptura[index].OrdenTrabajoSpoolID;
                inspeccionDimensional[index].ResultadoID = jSonCaptura[index].ResultadoID;
                inspeccionDimensional[index].DefectosID = jSonCaptura[index].DefectosID == "" ? 0 : jSonCaptura[index].DefectosID;
                inspeccionDimensional[index].InspectorID = jSonCaptura[index].InspectorID;
                inspeccionDimensional[index].FechaInspeccion = kendo.toString(jSonCaptura[index].FechaInspeccion, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));
                inspeccionDimensional[index].FechaInspeccion = jSonCaptura[index].FechaInspeccion.trim();

                if (jSonCaptura[index].ListaJuntasSeleccionadas.length > 0) {
                    for (var r = 0; r < jSonCaptura[index].ListaJuntasSeleccionadas.length; r++) {
                        Juntas[r] = { Accion: "", OrdenTrabajoSpoolID: "", DefectoID: "", JuntaID: "" }
                        Juntas[r].DefectoID = jSonCaptura[index].DefectosID == "" ? 0 : jSonCaptura[index].DefectosID;
                        Juntas[r].JuntaID = jSonCaptura[index].ListaJuntasSeleccionadas[r].JuntaID;
                        Juntas[r].Accion = jSonCaptura[index].ListaJuntasSeleccionadas[r].Accion
                        Juntas[r].OrdenTrabajoSpoolID = jSonCaptura[index].OrdenTrabajoSpoolID
                    }
                    inspeccionDimensional[index].ListaJuntas = Juntas;
                }
                else
                    inspeccionDimensional[index].ListaJuntas = undefined;

            }

            else {
                displayNotify("", "Los datos en Blanco no se guardaran", '1');

            }
           

        }

        Captura[0].Detalles = inspeccionDimensional;
        loadingStart();

        if (tipoGuardado == 0)
        {           
            $InspeccionDimensional.InspeccionDimensional.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) { });
                       // AjaxObtenerJSonGrid();
                       //$("#grid").data("kendoGrid").dataSource.data([]);
                
                      displayNotify("CapturaMensajeGuardadoExitoso", "", '0');
         
        }
        else if (tipoGuardado == 1) {
            $InspeccionDimensional.InspeccionDimensional.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {});          
            limpiar();
            AjaxCargaCamposPredetrminados();
            displayNotify("CapturaMensajeGuardadoExitoso", "", '0');
        }
        loadingStop();
        //$InspeccionDimensional.InspeccionDimensional.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        //    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                
        //        $("#grid").data("kendoGrid").dataSource.data([]);
        //        AjaxObtenerJSonGrid();
        //        displayMessage("CapturaMensajeGuardadoExitoso", "", '1');
        //    }
    //        else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
              
    //            displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
    //            opcionHabilitarView(false, "FieldSetView");
    //        }
    //        loadingStop();
    //    });
    }
    //else {
    //    displayMessage("InpeccionDimensionalErrorInspectorMensaje", "", '1');
    //    opcionHabilitarView(false, "FieldSetView");
    //}
}

function InspectorCorrecto(array) {
    for (var i= 0 ; i < array.length ; i++) {
        if (array[i].InspectorID == "" || array[i].InspectorID == undefined || array[i].InspectorID == null) {
            return false;
        }
    }
    return true;
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