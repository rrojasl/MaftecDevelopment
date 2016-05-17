
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
    CargarGrid();
    ObtenerJSONParaGrid();
};

function CargarGrid() {

    $("#grid").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        WPSNombre: { type: "string", editable: true },
                        NombrePQRRaiz: { type: "string", editable: true },
                        NombrePQRRelleno: { type: "string", editable: true },
                        GrupoP: { type: "string", editable: true },
                        PWHT: { type: "string",editable: false },
                        EspesorMaximoRaiz: { type: "string", editable:false},
                        EspesorMinimoRaiz: { type: "string", editable: false },
                        EspesorMaximoRelleno: { type: "string", editable: false },
                        EspesorMinimoRelleno: { type: "string", editable: false },
                    }
                }
            },
            pageSize: 20,
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
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [

                    
                    { field: "WPSNombre", title: _dictionary.WPSNombre[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
                    { field: "NombrePQRRaiz", title: _dictionary.WPSPQRRAIZ[$("#language").data("kendoDropDownList").value()], filterable: true, width: "120px", editor: RenderComboBoxPQRRaiz },
                    { field: "NombrePQRRelleno", title: _dictionary.WPSPQRRelleno[$("#language").data("kendoDropDownList").value()], filterable: true, width: "120px", editor: RenderComboBoxPQRRelleno },
                    { field: "GrupoP", title: _dictionary.WPSPQRGrupoP[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px", editor: RenderComboBoxGrupoP },
                    { field: "PWHT", title: _dictionary.WPSPWHT[$("#language").data("kendoDropDownList").value()], filterable: true, width: "90px" },

                    { field: "EspesorMaximoRaiz", title: _dictionary.WPSEspesorMaximoRaiz[$("#language").data("kendoDropDownList").value()], filterable: true, width: "125px" },
                    { field: "EspesorMinimoRaiz", title: _dictionary.WPSEspesorMinimoRaiz[$("#language").data("kendoDropDownList").value()], filterable: true, width: "125px" },
                    { field: "EspesorMaximoRelleno", title: _dictionary.WPSEspesorMaximoRelleno[$("#language").data("kendoDropDownList").value()], filterable: true, width: "145px" },
                    { field: "EspesorMinimoRelleno", title: _dictionary.WPSEspesorMinimoRelleno[$("#language").data("kendoDropDownList").value()], filterable: true, width: "145px" },
                    { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: EliminaWPS }, title: _dictionary.tituloEliminar[$("#language").data("kendoDropDownList").value()], width: "50px" },
                    { command: { text: _dictionary.botonDetalle[$("#language").data("kendoDropDownList").value()], click: EditaWPS }, title: _dictionary.tituloEditar[$("#language").data("kendoDropDownList").value()], width: "50px" }
        ],
    });
    CustomisaGrid($("#grid"));
};




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




