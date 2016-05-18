Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10007", { path: '/' });

var resultadoJson;

function changeLanguageCall() {
    CargarGrid();
    LlenarGridPQR();
};



function LlenarGridPQR() {
    LlenaGridAjax();
}


function CargarGrid() {

    $("#grid").kendoGrid({
        dataSource: {
            data: resultadoJson,
            schema: {
                model: {
                    fields: {
                        PQRID: { type: "string" },
                        Nombre: { type: "string", editable: true },
                        PREHEAT: { type: "string", editable: true },
                        PWHT: { type: "string", editable: true},
                        EspesorRelleno: {type: "string", editable: true},
                        EspesorRaiz: { type: "string", editable: true },
                        CodigoRelleno: { type: "string", editable: true},
                        CodigoRaiz: { type: "string", editable: true},
                        NumeroP: { type: "string", editable: true},
                        GrupoP: {type: "string", editable: true},
                        Aporte: { type: "string" },
                        Mezcla: { type: "string" },
                        Respaldo: { type: "string" },
                        GrupoF: { type: "string" },
                        Codigo: { type: "String" },

                        ProcesoSoldaduraRellenoID: { type: "int" },
                        ProcesoSoldaduraRaizID: { type: "int" },
                        NumeroPID: { type: "int" },
                        GrupoPID: { type: "int" },
                        AporteID: { type: "int" },
                        MezclaID: { type: "int" },
                        RespaldoID: { type: "int" },
                        GrupoFID: { type: "int" },
                        CodigoID: { type: "int" },
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
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
                     { width: "110px", field: "Nombre", title: _dictionary.lblPQRNombre[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
                    { width: "120px", field: "PREHEAT", title: _dictionary.lblPQRPREHEAT[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { width: "100px", field: "PWHT", title: _dictionary.lblPQRPWHT[$("#language").data("kendoDropDownList").value()], filterable: true },
                    { width: "120px", field: "EspesorRaiz", title: _dictionary.lblPQREspesorRaiz[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec() },
                    { width: "120px", field: "EspesorRelleno", title: _dictionary.lblPQREspesorRelleno[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec() },
                    { width: "120px", field: "CodigoRaiz", title: _dictionary.lblPQRProcesoSoldaduraRaiz[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: RenderComboBoxProcesoSoldaduraRaiz },
                    { width: "120px", field: "CodigoRelleno", title: _dictionary.lblPQRProcesoSoldaduraRelleno[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px", editor: RenderComboBoxProcesoSoldaduraRelleno },
                    { width: "120px", field: "NumeroP", title: _dictionary.lblPQRNumeroP[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
                    { width: "120px", field: "GrupoP", title: _dictionary.WPSPQRGrupoP[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
                    { width: "120px", field: "Aporte", title: _dictionary.lblPQRAporte[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
                    { width: "120px", field: "Mezcla", title: _dictionary.lblPQRMezcla[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
                    { width: "120px", field: "Respaldo", title: _dictionary.lblPQRRespaldo[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
                    { width: "120px", field: "GrupoF", title: _dictionary.lblPQRGrupoF[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
                    { width: "120px", field: "Codigo", title: _dictionary.lblPQRCodigo[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
                    { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: EliminarPQR }, width: "90px", title: "ELM" }
        ],
        dataBound: function (e) {
            $(".k-grid input.k-textbox").prop('readonly', true);
            $(".k-grid td .k-button").text('');
            $(".k-grid td:first-child, .k-grid td:last-child").css('text-overflow', 'clip');
        }
    });
    CustomisaGrid($("#grid"));
};



function VentanaModal() {
    var modalTitle = "";
    modalTitle = "PQR";
    var window = $("#windowPQR");
    var win = window.kendoWindow({
        actions: "",
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: false,
        width: "50%%",
        minWidth: 660,
        position: {
            top: "10%",
            left: "20%"
        }
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};

function LimpiaControles() {
    $('#NombreId').val('');
    $('#EspesorRelleno').val('');
    $('#EspesorRaiz').val('');
    $('#chkPreheat').prop('checked', false);
    $('#chkPwht').prop('checked', false);

    $('#ProcesoSoldaduraRellenoID').data("kendoComboBox").value("");
    $('#ProcesoSoldaduraRaizID').data("kendoComboBox").value("");
    $('#NumeroPID').data("kendoComboBox").value("");
    $('#GrupoPMaterialBase1ID').data("kendoComboBox").value("");
    $('#AporteID').data("kendoComboBox").value("");
    $('#MezclaID').data("kendoComboBox").value("");
    $('#RespaldoID').data("kendoComboBox").value("");
    $('#GrupoFID').data("kendoComboBox").value("");
    $('#CodigoID').data("kendoComboBox").value("");
};

function LLenaControles(e) {
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

    $("#IdPQR").val(dataItem.PQRID)

    $("#NombreId").val(dataItem.Nombre)

    var ChkPreheat = dataItem.PREHEAT;
    if (ChkPreheat == true) {

        var data = kendo.observable({
            optionCheck: true
        });
        kendo.bind($("#chkPreheat"), data);
    }
    else {

        var data = kendo.observable({
            optionCheck: false
        });
        kendo.bind($("#chkPreheat"), data);
    }

    $("#EspesorRelleno").val(dataItem.EspesorRelleno);
    $("#EspesorRaiz").val(dataItem.EspesorRaiz);

    var ChkPWHT = dataItem.PWHT;
    if (ChkPWHT == true) {

        var data = kendo.observable({
            optionCheckPWHT: true
        });
        kendo.bind($("#chkPwht"), data);
    }
    else {

        var data = kendo.observable({
            optionCheckPWHT: false
        });
        kendo.bind($("#chkPwht"), data);
    }

    var CMBProcesoSoldaduraRelleno = $("#ProcesoSoldaduraRellenoID").data("kendoComboBox");
    CMBProcesoSoldaduraRelleno.value(dataItem.ProcesoSoldaduraRellenoID);


    var CMBProcesoSoldaduraRAIZ = $("#ProcesoSoldaduraRaizID").data("kendoComboBox");
    CMBProcesoSoldaduraRAIZ.value(dataItem.ProcesoSoldaduraRaizID);


    var CMBNumeroP = $("#NumeroPID").data("kendoComboBox");
    CMBNumeroP.value(dataItem.NumeroPID);

    var GrupoPMaterialBase1ID = $("#GrupoPMaterialBase1ID").data("kendoComboBox");
    GrupoPMaterialBase1ID.value(dataItem.GrupoMaterialBase1PID);

    var CMBAporte = $("#AporteID").data("kendoComboBox");
    CMBAporte.value(dataItem.AporteID);

    var CMBMezcla = $("#MezclaID").data("kendoComboBox");
    CMBMezcla.value(dataItem.MezclaID);

    var CMBRespaldo = $("#RespaldoID").data("kendoComboBox");
    CMBRespaldo.value(dataItem.RespaldoID);

    var CMBGrupoFID = $("#GrupoFID").data("kendoComboBox");
    CMBGrupoFID.value(dataItem.GrupoFID)

    var CMBCodigoID = $("#CodigoID").data("kendoComboBox");
    CMBCodigoID.value(dataItem.CodigoID)

};
