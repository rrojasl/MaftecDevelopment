function CargaInicial() {
    ConvertirCombos();
    setTimeout(function () { ObtenerListasPQR() }, 500);
};

CargaInicial();

function ConvertirCombos() {

    $("#EspesorRelleno").kendoNumericTextBox({
        format: "#.0000",
        decimals: 4,
        min: 0
    });

    $("#EspesorRaiz").kendoNumericTextBox({
        format: "#.0000",
        decimals: 4,
        min: 0
    });

    $("#ProcesoSoldaduraRellenoID").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        autoBind: false,
        dataTextField: "Codigo",
        dataValueField: "ProcesoSoldaduraID",
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
        },
        change: function (e) {
            if ($('#ProcesoSoldaduraRellenoID').data("kendoComboBox").dataItem($("#ProcesoSoldaduraRellenoID").data("kendoComboBox").select()).Codigo == "N/A") {
                $('#EspesorRelleno').data("kendoNumericTextBox").value("0");
                $("#EspesorRelleno").data("kendoNumericTextBox").readonly(true);
                $("#EspesorRelleno").data("kendoNumericTextBox").enable(false);
                $("#EspesorRelleno").data("kendoNumericTextBox").wrapper.find(".k-numeric-wrap").find(".k-select").hide();

            } else {
                $("#EspesorRelleno").data("kendoNumericTextBox").readonly(false);
                $("#EspesorRelleno").data("kendoNumericTextBox").enable(true);
                $("#EspesorRelleno").data("kendoNumericTextBox").wrapper.find(".k-numeric-wrap").find(".k-select").show();
            }

            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#EspesorRelleno").data("kendoComboBox").value("");
            }
        }
    });

    $("#ProcesoSoldaduraRellenoID").blur(function (e) {
        if ($("#ProcesoSoldaduraRellenoID").data("kendoComboBox").dataItem($("#ProcesoSoldaduraRellenoID").data("kendoComboBox").select()) == undefined) {
            $("#ProcesoSoldaduraRellenoID").val("");
            $("#ProcesoSoldaduraRellenoID").data("kendoComboBox").text("");
        }
    });

    $("#ProcesoSoldaduraRaizID").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        autoBind: false,
        dataTextField: "Codigo",
        dataValueField: "ProcesoSoldaduraID",
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
        },
        change: function (e) {
            if ($('#ProcesoSoldaduraRaizID').data("kendoComboBox").dataItem($("#ProcesoSoldaduraRaizID").data("kendoComboBox").select()).Codigo == "N/A") {
                $('#EspesorRaiz').data("kendoNumericTextBox").value("0");
                $("#EspesorRaiz").data("kendoNumericTextBox").readonly(true);
                $("#EspesorRaiz").data("kendoNumericTextBox").enable(false);
                $("#EspesorRaiz").data("kendoNumericTextBox").wrapper.find(".k-numeric-wrap").find(".k-select").hide();
            } else {
                $("#EspesorRaiz").data("kendoNumericTextBox").wrapper.find(".k-numeric-wrap").find(".k-select").show();
                $("#EspesorRaiz").data("kendoNumericTextBox").readonly(false);
                $("#EspesorRaiz").data("kendoNumericTextBox").enable(true);
            }
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#EspesorRelleno").data("kendoComboBox").value("");
            }
        }
    });

    $("#ProcesoSoldaduraRaizID").blur(function (e) {
        if ($("#ProcesoSoldaduraRaizID").data("kendoComboBox").dataItem($("#ProcesoSoldaduraRaizID").data("kendoComboBox").select()) == undefined) {
            $("#ProcesoSoldaduraRaizID").val("");
            $("#ProcesoSoldaduraRaizID").data("kendoComboBox").text("");
        }
    });

    $("#GrupoPMaterialBase1ID").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        autoBind: false,
        dataTextField: "GrupoP",
        dataValueField: "GrupoPID",
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
            var PQRIDBuscar = dataItem.PQRID;
        },
    });

    $("#GrupoPMaterialBase1ID").blur(function (e) {
        if ($("#GrupoPMaterialBase1ID").data("kendoComboBox").dataItem($("#GrupoPMaterialBase1ID").data("kendoComboBox").select()) == undefined) {
            $("#GrupoPMaterialBase1ID").val("");
            $("#GrupoPMaterialBase1ID").data("kendoComboBox").text("");
        }
    });

    $("#GrupoPMaterialBase2ID").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        autoBind: false,
        dataTextField: "GrupoP",
        dataValueField: "GrupoPID",
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
            var PQRIDBuscar = dataItem.PQRID;
        },
    });

    $("#GrupoPMaterialBase2ID").blur(function (e) {
        if ($("#GrupoPMaterialBase2ID").data("kendoComboBox").dataItem($("#GrupoPMaterialBase2ID").data("kendoComboBox").select()) == undefined) {
            $("#GrupoPMaterialBase2ID").val("");
            $("#GrupoPMaterialBase2ID").data("kendoComboBox").text("");
        }
    });

    $("#CodigoID").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        autoBind: false,
        dataTextField: "Especificacion",
        dataValueField: "CodigoAsmeID",
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
        },
    });

    $("#CodigoID").blur(function (e) {
        if ($("#CodigoID").data("kendoComboBox").dataItem($("#CodigoID").data("kendoComboBox").select()) == undefined) {
            $("#CodigoID").val("");
            $("#CodigoID").data("kendoComboBox").text("");
        }
    });
};

function Limpiar() {
    $('#NombreId').val("");
    document.getElementById("chkPreheat").checked = false;
    document.getElementById("chkPwht").checked = false;
    $('#EspesorRelleno').data("kendoNumericTextBox").value("");
    $('#EspesorRaiz').data("kendoNumericTextBox").value("");
    $('#ProcesoSoldaduraRellenoID').data("kendoComboBox").value("");
    $('#ProcesoSoldaduraRaizID').data("kendoComboBox").value("");
    $('#GrupoPMaterialBase1ID').data("kendoComboBox").value("");
    $('#GrupoPMaterialBase2ID').data("kendoComboBox").value("");
    $('#AporteID').val("");
    $('#MezclaID').val("");
    $('#RespaldoID').val("");
    $('#GrupoFID').val("");
    $('#CodigoID').data("kendoComboBox").value("");
    $("#PQRID").val("0");
};