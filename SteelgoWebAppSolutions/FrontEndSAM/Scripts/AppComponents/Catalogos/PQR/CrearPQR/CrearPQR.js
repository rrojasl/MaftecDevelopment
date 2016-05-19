
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

    $("#ProcesoSoldaduraRaizID").kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ProcesoSoldaduraID",
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
        },
    });

    $("#GrupoPMaterialBase1ID").kendoComboBox({
        dataTextField: "GrupoP",
        dataValueField: "GrupoPID",
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
            var PQRIDBuscar = dataItem.PQRID;
        },
    });

    $("#GrupoPMaterialBase2ID").kendoComboBox({
        dataTextField: "GrupoP",
        dataValueField: "GrupoPID",
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
            var PQRIDBuscar = dataItem.PQRID;
        },
    });

    $("#CodigoID").kendoComboBox({
        dataTextField: "Especificacion",
        dataValueField: "CodigoAsmeID",
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
        },
    });

};