
function changeLanguageCall() {
    document.title = _dictionary.WPSLabelNavegacion[$("#language").data("kendoDropDownList").value()];
    ConvertirCombos();
    setTimeout(function () { obtenerPQRAjax(); AjaxObtenerListaProyectos(); }, 1000);

};


function ConvertirCombos() {
    $("#Proyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            }
            else {

            }
        },
    });

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
                $("#EspesorMaximoRaiz").text(dataItem.CodigoRaiz.trim() != "Gmaw STT" ? (parseFloat(dataItem.EspesorRaiz) <= 1.5 ? (parseFloat(dataItem.EspesorRaiz) * 2) : 8) : parseFloat(dataItem.EspesorRaiz) * 1.1);
                $("#EspesorMinimoRaiz").text("0");
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
                    $("#EspesorMaximoRelleno").text(dataItem.CodigoRaiz.trim() != "Gmaw STT" ? (parseFloat(dataItem.EspesorRaiz) <= 1.5 ? (parseFloat(dataItem.EspesorRaiz) * 2) : 8) : parseFloat(dataItem.EspesorRaiz) * 1.1);
                    $("#EspesorMinimoRelleno").text("0");
                }
            }
        },
    });

};

function AsignarValoresItemSeleccionado(e) {
    var DataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

    var WPSID = DataItem.WPSID;
    $("#WPSID").val(WPSID);

    var NombreWPS = DataItem.WPSNombre;
    $("#NomnreWPS").val(NombreWPS);

    //#region Raices
    var CMBPQRD = $("#PQRRaizNombre").data("kendoComboBox");
    CMBPQRD.value(DataItem.PQRRaizId);



    var CMBGrupoPRAIZ = $("#grupoPRaiz").data("kendoComboBox");
    CMBGrupoPRAIZ.value(DataItem.GrupoPId);


    var pwhRaizValor = DataItem.PWHT;

    if (pwhRaizValor == 'SI') {
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

    var EMINRZ = DataItem.EspesorMinimoRaiz;
    $("#EspesoirMinimoRaiz").val(EMINRZ);
    var EMAXRZ = DataItem.EspesorMaximoRaiz;
    $("#EspesoirMaximoRaiz").val(EMAXRZ);
    //#endregion



    //#region Rellenos
    var CMBPQRD2 = $("#PQRRellenoNombre").data("kendoComboBox");
    CMBPQRD2.value(DataItem.PQRRellenoId);


    var CMBGrupoPRelleno = $("#grupoPRelleno").data("kendoComboBox");
    CMBGrupoPRelleno.value(DataItem.GrupoPId);


    if (pwhRaizValor == 'SI') {
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

    var EMINRLL = DataItem.EspesorMinimoRelleno;
    $("#EspesoirMinimoRelleno").val(EMINRLL);
    var EMAXRLL = DataItem.EspesorMaximoRelleno;
    $("#EspesoirMaximoRelleno").val(EMAXRLL);
    //#endregion

};

function calcularDatosAutomaticosRelleno(PQRSeleccionado_GrupoP, PQRSeleccionado_PWHT) {

    var CMBPQRD = $("#grupoPRelleno").data("kendoComboBox");
    CMBPQRD.value(PQRSeleccionado_GrupoP);




    if (PQRSeleccionado_PWHT == true) {
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



};

function calcularDatosAutomaticosRaiz(PQRSeleccionado_GrupoP, PQRSeleccionado_PWHT) {

    var CMBPQRD = $("#grupoPRaiz").data("kendoComboBox");
    CMBPQRD.value(PQRSeleccionado_GrupoP);

    if (PQRSeleccionado_PWHT == true) {
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

};

function calcularEspesorMaximoRaiz(ProcesoSoldaduraRaiz, EspesorRellenoRaiz) {

    if (ProcesoSoldaduraRaiz == 'Gmaw STT') {
        $("#EspesoirMaximoRaiz").val(1.1);
    }
    else {
        if (EspesorRellenoRaiz > 1.5) {
            $("#EspesoirMaximoRaiz").val(8);
        }
        else {
            var resultado = parseFloat(EspesorRellenoRaiz) * 2;
            $("#EspesoirMaximoRaiz").val(resultado);
        }
    }
};


function calcularEspesorMaximoRelleno(ProcesoSoldaduraRelleno, EspesorRellenoRelleno) {

    if (EspesorRellenoRelleno > 1.5) {
        $("#EspesoirMaximoRelleno").val(8);
    }
    else {
        var resultado = parseFloat(EspesorRellenoRelleno) * 2;
        $("#EspesoirMaximoRelleno").val(resultado);
    }

};