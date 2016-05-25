
function changeLanguageCall() {
    document.title = _dictionary.WPSLabelNavegacion[$("#language").data("kendoDropDownList").value()];
    ConvertirCombos();
    setTimeout(function () { obtenerPQRAjax();  }, 1000);

};


function ConvertirCombos() {
   

    $("#PQRRaizNombre").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PQRID",
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if (dataItem.PREHEAT) {
                    var data = kendo.observable({
                        optionCheck: true
                    });
                    kendo.bind($("#PREHEATRaiz"), data);
                } else {
                    var data = kendo.observable({
                        optionCheck: false
                    });
                    kendo.bind($("#PREHEATRaiz"), data);
                }
                if(dataItem.PWHT){
                    var data = kendo.observable({
                        optionCheck: true
                    });
                    kendo.bind($("#PWHRaiz"), data);
                }
                else {
                    var data = kendo.observable({
                        optionCheck: false
                    });
                    kendo.bind($("#PWHRaiz"), data);
                }
                $("#grupoPRaiz").val(dataItem.GrupoPMaterialBase1Nombre + " - " + dataItem.GrupoPMaterialBase2Nombre);
                $("#EspesorMaximoRaiz").text((dataItem.CodigoRaiz.trim() != "Gmaw STT" ? (parseFloat(dataItem.EspesorRaiz) <= 1.5 ? (parseFloat(dataItem.EspesorRaiz) * 2) : 8) : parseFloat(dataItem.EspesorRaiz) * 1.1).toFixed(4));
                $("#EspesorMinimoRaiz").text("0");
            }
            else {
                $("#PQRRaizNombre").data("kendoComboBox").value("");
            }
        }
    });


    $("#PQRRellenoNombre").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PQRID",
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if (dataItem != undefined) {
                    if (dataItem.PREHEAT) {
                        var data = kendo.observable({
                            optionCheck: true
                        });
                        kendo.bind($("#PREHEATRelleno"), data);
                    } else {
                        var data = kendo.observable({
                            optionCheck: false
                        });
                        kendo.bind($("#PREHEATRelleno"), data);
                    }
                    if (dataItem.PWHT) {
                        var data = kendo.observable({
                            optionCheck: true
                        });
                        kendo.bind($("#PWHRelleno"), data);
                    }
                    else {
                        var data = kendo.observable({
                            optionCheck: false
                        });
                        kendo.bind($("#PWHRelleno"), data);
                    }
                    $("#grupoPRelleno").val(dataItem.GrupoPMaterialBase1Nombre + " - " + dataItem.GrupoPMaterialBase2Nombre);
                    $("#EspesorMaximoRelleno").text((parseFloat(dataItem.EspesorRelleno) <= 1.5 ? (parseFloat(dataItem.EspesorRelleno) * 2) : 8).toFixed(4));
                    $("#EspesorMinimoRelleno").text("0");
                }
                else {
                    $("#PQRRellenoNombre").data("kendoComboBox").value("");
                }
            }
        },
    });

};

function ContieneGruposMaterialBase(itemAcomparar, Base1, Base2) {

    var arrayCombinacion = [];

    arrayCombinacion[0] = Base1 + " " + Base2;
    arrayCombinacion[1] = Base2 + " " + Base1;

    for (var i = 0; i < arrayCombinacion.length; i++) {
        if (arrayCombinacion[i] == itemAcomparar) {
            return false;
        }
    }
    return true;
}




function Limpiar() {
    $('#NomnreWPS').val("");
    $('#PQRRaizNombre').data("kendoComboBox").value("");
    $('#PQRRellenoNombre').data("kendoComboBox").value("");
    $('#PREHEATRelleno').is(':checked') ? 1 : 0;
    $('#PWHRelleno').is(':checked') ? 1 : 0;
    $('#EspesorMaximoRaiz').text("");
    $('#EspesorMinimoRaiz').text("");
    $('#EspesorMaximoRelleno').text("");
    $('#EspesorMinimoRelleno').text("");
};