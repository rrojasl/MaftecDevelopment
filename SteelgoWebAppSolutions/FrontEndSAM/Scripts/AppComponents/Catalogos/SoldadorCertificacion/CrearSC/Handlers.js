function SuscribirEventos()
{
    SuscribirEventoNomprePQR();
    SuscribirEventoProcesoSoldadura();
    SuscribirEventoNumeroPasos();
    SuscribirEventoEspesorMinimo();
    SuscribirEventoEspesorMaximo();
    SuscribirEventoDiametroCertificado();
    SuscribirEventoTipoPrueba();
}


function SuscribirEventoTipoPrueba() {
    $("#inputTipoPrueba").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        autoBind: false,
        template: "<i class=\"fa fa-#=data.TipoDePrueba.toLowerCase()#\"></i> #=data.TipoDePrueba#",

        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputPosicionPQR").data("kendoComboBox").select(0);
            }
        }
    });
}

function SuscribirEventoDiametroCertificado() {
    $("#inputDiametroCalificado").kendoNumericTextBox({
       
        decimals: 3
    });
}

function SuscribirEventoEspesorMaximo() {
    $("#inputEspesorMaximo").kendoNumericTextBox({
       
        decimals: 3
    });
}


function SuscribirEventoEspesorMinimo() {
    $("#inputEspesorMinimo").kendoNumericTextBox({
       
        decimals: 3
    });
}

function SuscribirEventoNumeroPasos()
{
    $("#inputPasosSoldadura").kendoNumericTextBox({
       
        decimals: 3
    });
}

function SuscribirEventoProcesoSoldadura()
{
    $("#inputProcesoSol").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        autoBind: false,
        
        template: "<i class=\"fa fa-#=data.TipoProcesoSoldaduraDesc.toLowerCase()#\"></i> #=data.TipoProcesoSoldaduraDesc#",

        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputProcesoSol").data("kendoComboBox").select(0);
            }
        }
    });
}

function SuscribirEventoNomprePQR()
{
    $("#inputNombrePQR").kendoComboBox({
        dataTextField: "PQR",
        dataValueField: "PQRID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        delay: 10,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputNombrePQR").data("kendoComboBox").select(0);
            }

        }
    });

}

