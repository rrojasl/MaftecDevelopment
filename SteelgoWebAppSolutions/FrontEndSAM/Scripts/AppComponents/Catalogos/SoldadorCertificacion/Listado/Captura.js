﻿
function CargarGrid() {

    $("#grid").kendoGrid({
        edit: function (e) {
            if ($('#botonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()])
                this.closeCell();
        },
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        CodigoObrero: { type: "string", editable: true },
                        NombrePQR: { type: "string", editable: false },
                        ProcesoSoldadura: { type: "string", editable: true },
                        FechaInicioCertificado: { type: "date", editable: true },
                        FechaFinCertificado: { type: "date", editable: true },
                        PasosSoldadura: { type: "number", editable: true },
                        CedulaTuboCalificado: { type: "string", editable: true },
                        EspesorMinimo: { type: "string", editable: true },
                        EspesorMaximo: { type: "string", editable: false },
                        DiametroCalificado: { type: "number", editable: true },
                        TipoDePrueba: { type: "string" },
                        Posicion: { type: "number" }

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
            pageSize: 50,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [50, 100],
            info: false,
            input: false,
            numeric: true
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "CodigoObrero", title: _dictionary.SoldadorCertificacionCodigoObrero[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "145px" },
            { field: "NombrePQR", title: _dictionary.SoldadorCertificacionNombrePQR[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "ProcesoSoldadura", title: _dictionary.SoldadorCertificacionProcesoSoldaduraPQR[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", editor: RenderComboBoxProcesoSoldadura },
            { field: "FechaInicioCertificado", title: _dictionary.SoldadorCertificacionFechaInicioCertificado[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()], editor: RenderFechaInicio },
            { field: "FechaFinCertificado", title: _dictionary.SoldadorCertificacionFechaFinCertificado[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()], editor: RenderFechaFin },
            { field: "PasosSoldadura", title: _dictionary.SoldadorCertificacionPasosSoldadura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px", editor: renderNoPasos },
            { field: "CedulaTuboCalificado", title: _dictionary.SoldadorCertificacionCedulaTuboPQR[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", editor: RenderComboBoxCedulaTuboCalificado },
            { field: "EspesorMinimo", title: _dictionary.SoldadorCertificacionEspesorMinimo[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px", editor: renderEmin },
            { field: "EspesorMaximo", title: _dictionary.SoldadorCertificacionEspesorMaximo[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "DiametroCalificado", title: _dictionary.SoldadorCertificacionDiametroCalificadoPQR[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "TipoDePrueba", title: _dictionary.SoldadorCertificacionTipoDePruebaPQR[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "145px", editor: RenderComboBoxTipoPrueba },
            { field: "Posicion", title: _dictionary.SoldadorCertificacionPosicionPQR[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px", editor: renderPosicion, format: "{0} °" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: EliminaSoldadorCertificacion }, title: _dictionary.tituloEliminar[$("#language").data("kendoDropDownList").value()], width: "50px" }
        ]
    });
    CustomisaGrid($("#grid"));
};


function EliminaSoldadorCertificacion(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        var PQRIDRegistro = dataItem.PQRID;

        //if (dataItem.RegistrosWPS == 0) {

        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title:  _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
            visible: false, //the window will not appear before its .open method is called
            width: "auto",
            height: "auto",
            modal: true,
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");

        ventanaConfirm.content(_dictionary.SoldadorCertificacionPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()] +
                        "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function () {

            var dataSource = $("#grid").data("kendoGrid").dataSource;
            dataItem.Accion = 3;
            $("#grid").data("kendoGrid").dataSource.sync();

            ventanaConfirm.close();
        });
        $("#noButton").click(function () {
            ventanaConfirm.close();
        });
    }

}


function VentanaModal() {
    var modalTitle = "";
    modalTitle = "Soldador Certificacion";
    var window = $("#windowSoldadorCertificacion");

    if (win == undefined) {

        win = window.kendoWindow({
            actions: "",
            modal: true,
            title: modalTitle,
            resizable: false,
            visible: false,
            width: "50%",
            minWidth: 660,
            position: {
                top: "10%",
                left: "20%"
            }
        }).data("kendoWindow");

    }

    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};


function AbrirVentanaModalVista() {
    VentanaModal();
    $("#windowSoldadorCertificacion").show();
};

function changeLanguageCall() {
    setTimeout(function () { SuscribirEventos(); }, 10)
    setTimeout(function () { CargarGrid(); }, 1000)
    setTimeout(function () { AjaxObtenerJSONGrid(); }, 2000)
};

function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false;
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

function ValidarInformacionEnviada() {
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    var arregloCaptura = $("#grid").data("kendoGrid").dataSource._data;
    for (index = 0; index < arregloCaptura.length; index++) {
        ListaDetalles[index] = {
            SoldadorCertificacionID: "",
            Accion: "",
            ObreroID: "",
            PQRID: "",
            ProcesoSoldaduraID: "",
            TipoDePruebaID: "",
            Posicion: "",
            FechaInicioCertificado: "",
            FechaFinCertificado: "",
            DiametroCalificado: "",
            EspesorMinimo: "",
            EspesorMaximo: "",
            PasosSoldadura: "",
            Estatus: 1
        };

        if (
            (arregloCaptura[index].CodigoObrero == "" || arregloCaptura[index].CodigoObrero == undefined || arregloCaptura[index].CodigoObrero == null) ||
            (arregloCaptura[index].NombrePQR == "" || arregloCaptura[index].NombrePQR == undefined || arregloCaptura[index].NombrePQR == null) ||
            (arregloCaptura[index].ProcesoSoldadura == "" || arregloCaptura[index].ProcesoSoldadura == undefined || arregloCaptura[index].ProcesoSoldadura == null) ||
            (arregloCaptura[index].FechaInicioCertificado == "" || arregloCaptura[index].FechaInicioCertificado == undefined || arregloCaptura[index].FechaInicioCertificado == null) ||
            (arregloCaptura[index].FechaFinCertificado == "" || arregloCaptura[index].FechaFinCertificado == undefined || arregloCaptura[index].FechaFinCertificado == null) ||
            (arregloCaptura[index].PasosSoldadura == "" || arregloCaptura[index].PasosSoldadura == undefined || arregloCaptura[index].PasosSoldadura == null) ||
            //        (arregloCaptura[index].CedulaTuboCalificado == "" || arregloCaptura[index].CedulaTuboCalificado == undefined || arregloCaptura[index].CedulaTuboCalificado == null) ||
            (arregloCaptura[index].EspesorMinimo == "" || arregloCaptura[index].EspesorMinimo == undefined || arregloCaptura[index].EspesorMinimo == null) ||
            (arregloCaptura[index].EspesorMaximo == "" || arregloCaptura[index].EspesorMaximo == undefined || arregloCaptura[index].EspesorMaximo == null) ||
            (arregloCaptura[index].DiametroCalificado == "" || arregloCaptura[index].DiametroCalificado == undefined || arregloCaptura[index].DiametroCalificado == null) ||
            (arregloCaptura[index].TipoDePrueba == "" || arregloCaptura[index].TipoDePrueba == undefined || arregloCaptura[index].TipoDePrueba == null) ||
            (arregloCaptura[index].Posicion == "" || arregloCaptura[index].Posicion == undefined || arregloCaptura[index].Posicion == null)
           ) {
            ListaDetalles[index].Estatus = 0;
            $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
        }

        //el registro esta bien.
        ListaDetalles[index].SoldadorCertificacionID = arregloCaptura[index].SoldadorCertificacionID;
        ListaDetalles[index].Accion = arregloCaptura[index].Accion;
        ListaDetalles[index].ObreroID = arregloCaptura[index].ObreroID;
        ListaDetalles[index].PQRID = arregloCaptura[index].PQRID;
        ListaDetalles[index].ProcesoSoldaduraID = arregloCaptura[index].ProcesoSoldaduraID;
        ListaDetalles[index].TipoDePruebaID = arregloCaptura[index].TipoDePruebaID;
        ListaDetalles[index].Posicion = arregloCaptura[index].Posicion;
        ListaDetalles[index].FechaInicioCertificado = arregloCaptura[index].FechaInicioCertificado == null ? "" : kendo.toString(arregloCaptura[index].FechaInicioCertificado, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();
        ListaDetalles[index].FechaFinCertificado = arregloCaptura[index].FechaFinCertificado == null ? "" : kendo.toString(arregloCaptura[index].FechaFinCertificado, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();
        ListaDetalles[index].DiametroCalificado = arregloCaptura[index].DiametroCalificado;
        ListaDetalles[index].EspesorMinimo = arregloCaptura[index].EspesorMinimo;
        ListaDetalles[index].EspesorMaximo = arregloCaptura[index].EspesorMaximo;
        ListaDetalles[index].PasosSoldadura = arregloCaptura[index].PasosSoldadura;


    }
    Captura[0].Detalles = ListaDetalles;


    if (!ExistRowEmpty(ListaDetalles)) {
        if (Captura[0].Detalles.length > 0) {
            AjaxGuardarInformacion(Captura[0]);
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


        //RowEmpty($("#grid"));

        $("#yesButton").click(function () {

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


            if (Captura[0].Detalles.length > 0) {
                AjaxGuardarInformacion(Captura[0]);
            }
            else {
                displayNotify("AdverteciaExcepcionGuardado", "", '1');
            }

            ventanaConfirm.close();
        });
        $("#noButton").click(function () {
            opcionHabilitarView(false, "FieldSetView");
            ventanaConfirm.close();
        });

    }


}

function startChange(row) {

    var startDate = $("#inputFechaInicioCertificado").data("kendoDatePicker").value(),
     endDate = $("#inputFechaFinCertificado").data("kendoDatePicker").value(),
    end = $("#inputFechaFinCertificado").data("kendoDatePicker"),
    start = $("#inputFechaInicioCertificado").data("kendoDatePicker");

    if (startDate) {
        startDate = new Date(startDate);
        startDate.setDate(startDate.getDate());
        end.min(startDate);
    }
    else if (endDate) {
        start.max(new Date(endDate));
    } else {
        endDate = new Date();
        start.max(endDate);
        end.min(endDate);
    }
}

function endChange(row) {

    var endDate = $("#inputFechaFinCertificado").data("kendoDatePicker").value(),
    startDate = $("#inputFechaInicioCertificado").data("kendoDatePicker").value(),
    end = $("#inputFechaFinCertificado").data("kendoDatePicker"),
    start = $("#inputFechaInicioCertificado").data("kendoDatePicker");

    if (endDate) {
        endDate = new Date(endDate);
        endDate.setDate(endDate.getDate());
        start.max(endDate);
    }
    else if (startDate) {
        end.min(new Date(startDate));
    } else {
        endDate = new Date();
        start.max(endDate);
        end.min(endDate);
    }
}
