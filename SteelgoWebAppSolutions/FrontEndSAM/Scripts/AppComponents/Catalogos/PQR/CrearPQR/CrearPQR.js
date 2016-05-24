﻿
function CargaInicial() {
    ConvertirCombos();
    setTimeout(function () { ObtenerListasPQR() }, 500);
};

CargaInicial();

function ConvertirCombos() {

    $("#ProcesoSoldaduraRellenoID").kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ProcesoSoldaduraID",
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
        },
    });

    $("#ProcesoSoldaduraRellenoID").blur(function (e) {
        if ($("#ProcesoSoldaduraRellenoID").data("kendoComboBox").dataItem($("#ProcesoSoldaduraRellenoID").data("kendoComboBox").select()) == undefined) {
            $("#ProcesoSoldaduraRellenoID").val("");
            $("#ProcesoSoldaduraRellenoID").data("kendoComboBox").text("");
        }
    });

    $("#ProcesoSoldaduraRaizID").kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ProcesoSoldaduraID",
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
        },
    });

    $("#ProcesoSoldaduraRaizID").blur(function (e) {
        if ($("#ProcesoSoldaduraRaizID").data("kendoComboBox").dataItem($("#ProcesoSoldaduraRaizID").data("kendoComboBox").select()) == undefined) {
            $("#ProcesoSoldaduraRaizID").val("");
            $("#ProcesoSoldaduraRaizID").data("kendoComboBox").text("");
        }
    });

    $("#GrupoPMaterialBase1ID").kendoComboBox({
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