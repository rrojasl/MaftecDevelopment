
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10015", { path: '/' });


var $WPSSaveModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {
        NombreWPS: {
            visible: "#DivNombreWPS",
            editable: "#NomnreWPS",
            required: "#NomnreWPS"
        },
        PQRRaiz: {
            visible: "#DivNombrePQRRaiz",
            editable: "#PQRRaizNombre",
            required: "#PQRRaizNombre"
        },
        PQRRelleno: {
            visible: "#DivNombrePQRRelleno",
            editable: "#PQRRellenoNombre",
            required: "#PQRRellenoNombre"
        }
    }
};


var resultadoJson;
var win;

function changeLanguageCall() {
    document.title = _dictionary.WPSLabelNavegacion[$("#language").data("kendoDropDownList").value()];
    CargarGrid();
    ObtenerJSONParaGrid();
};

function CargarGrid() {

    $("#grid").kendoGrid({
        edit: function (e) {

            if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

            } else
                this.closeCell();

        },
        change: function () {
            ItemSeleccionado = this.dataSource.view()[this.select().index()];
        },
        //dataBound: function () {
        //    var myElem = document.getElementById('trParentHeader');
        //    if (myElem == null) {
        //        $("#grid").find("th.k-header").parent().before("<tr id='trParentHeader'>  <th colspan='1' class='k-header'></th>  <th   colspan='2' class='k-header' style='text-align: center;'><span id='WPSPQR'></span></th><th colspan='8' class='k-header'></th> </tr>");
        //    }
        //},
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        WPSNombre: { type: "string", editable: true },
                        NombrePQRRaiz: { type: "string", editable: true },
                        NombrePQRRelleno: { type: "string", editable: true },
                        GrupoP: { type: "string", editable: false },
                        PWHT: { type: "string", editable: false },
                        EspesorMaximoRaiz: { type: "string", editable: false },
                        EspesorMinimoRaiz: { type: "string", editable: false },
                        EspesorMaximoRelleno: { type: "string", editable: false },
                        EspesorMinimoRelleno: { type: "string", editable: false },
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                  { field: "Accion", operator: "eq", value: 4 }
                ]
            },
            pageSize: 50,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        autoHeight: true,
        sortable: true,
        scrollable: true,
        editable: true,
        filterable: {
            extra: false,
        },
        pageable: {
            refresh: false,
            pageSizes: [50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        columnMenu: true,
        reorderable: true,
        columns: [
                    { field: "WPSNombre", title: _dictionary.WPSNombre[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
                    { field: "NombrePQRRaiz", title: _dictionary.WPSPQRRAIZ[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px", editor: RenderComboBoxPQRRaiz },
                    { field: "NombrePQRRelleno", title: _dictionary.WPSPQRRelleno[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px", editor: RenderComboBoxPQRRelleno },
                    { field: "GrupoP", title: _dictionary.WPSPQRGrupoP[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
                    { field: "PWHT", title: _dictionary.WPSPWHT[$("#language").data("kendoDropDownList").value()], filterable: true, width: "90px" },
                    { field: "EspesorMaximoRaiz", title: _dictionary.WPSEspesorMaximoRaiz[$("#language").data("kendoDropDownList").value()], filterable: true, width: "125px" },
                    { field: "EspesorMinimoRaiz", title: _dictionary.WPSEspesorMinimoRaiz[$("#language").data("kendoDropDownList").value()], filterable: true, width: "125px" },
                    { field: "EspesorMaximoRelleno", title: _dictionary.WPSEspesorMaximoRelleno[$("#language").data("kendoDropDownList").value()], filterable: true, width: "145px" },
                    { field: "EspesorMinimoRelleno", title: _dictionary.WPSEspesorMinimoRelleno[$("#language").data("kendoDropDownList").value()], filterable: true, width: "145px" },
                    { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: _dictionary.tituloEliminar[$("#language").data("kendoDropDownList").value()], width: "50px" },
                    //{ command: { text: _dictionary.botonDetalle[$("#language").data("kendoDropDownList").value()], click: EditaWPS }, title: _dictionary.tituloEditar[$("#language").data("kendoDropDownList").value()], width: "50px" }
        ],
    });
    CustomisaGrid($("#grid"));
};

function eliminarCaptura(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));


        windowTemplate = kendo.template($("#windowTemplate").html());

        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
            visible: false, //the window will not appear before its .open method is called
            width: "auto",
            height: "auto",
            modal: true,
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");

        ventanaConfirm.content(_dictionary.WPSMensajeEliminar[$("#language").data("kendoDropDownList").value()] +
                     "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function (handler) {
            var dataSource = $("#grid").data("kendoGrid").dataSource;
            dataItem.Accion = 3;
            dataSource.sync();
            ventanaConfirm.close();
        });
        $("#noButton").click(function (handler) {
            ventanaConfirm.close();
        });
    }

}


function VentanaModal() {
    var modalTitle = "";
    modalTitle = _dictionary.WPSNombre[$("#language").data("kendoDropDownList").value()];
    var window = $("#windowWPS");

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
    $("#windowWPS").show();
};



function LimpiarControlesParaAgregar() {

    $("#WPSID").val(0);
    $("#NomnreWPS").val("");
    $("#PQRRaizNombre").data("kendoComboBox").value("");
    $("#PQRRellenoNombre").data("kendoComboBox").value("");

    $("#grupoPRelleno").data("kendoComboBox").value("");
    $("#PWHRaiz").prop('checked', false);
    $("#EspesoirMaximoRaiz").val(0);
    $("#EspesoirMinimoRaiz").val(0);

    $("#grupoPRaiz").data("kendoComboBox").value("");
    $("#PWHRelleno").prop('checked', false);
    $("#EspesoirMaximoRelleno").val(0);
    $("#EspesoirMinimoRelleno").val(0);
};




