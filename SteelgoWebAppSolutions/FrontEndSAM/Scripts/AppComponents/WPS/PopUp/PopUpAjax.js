function obtenerPQRAjax() {
    $PQR.PQR.read({ token: Cookies.get("token"), TipoAccion: 1 }).done(function (data) {
        $("#PQRRaizNombre").data("kendoComboBox").dataSource.data(data);
        $("#PQRRellenoNombre").data("kendoComboBox").dataSource.data(data);
    }
)
};


function obtenerGrupoPAjax() {

    $PQR.PQR.read({ ConsultaGrupoP: "GrupoPID", TipoDato: 1, token: Cookies.get("token") }).done(function (data) {
        $("#grupoPRelleno").data("kendoComboBox").dataSource.data(data);
        $("#grupoPRaiz").data("kendoComboBox").dataSource.data(data);
    });
};

function ObtenerDatosAutomaticosDeRaiz(PQRIDBuscar) {

    $PQR.PQR.read({ token: Cookies.get("token"), TipoDato: 5, PQRIDABuscar: PQRIDBuscar, var1: "valoruno" }).done(function (data) {
        var PQRSeleccionado_GrupoP = data[0].GrupoMaterialBase1PID;
        var PQRSeleccionado_PWHT = data[0].PWHT;
        var ProcesoSoldaduraRaiz = data[0].CodigoRaiz;
        var EspesorRellenoRaiz = data[0].EspesorRaiz;
        calcularDatosAutomaticosRaiz(PQRSeleccionado_GrupoP, PQRSeleccionado_PWHT);
        calcularEspesorMaximoRaiz(ProcesoSoldaduraRaiz, EspesorRellenoRaiz);
    });

};



function ObtenerDatosAutomaticosDeRelleno(PQRIDBuscar) {

    $PQR.PQR.read({ token: Cookies.get("token"), TipoDato: 5, PQRIDABuscar: PQRIDBuscar, var1: "valoruno" }).done(function (data) {
        var PQRSeleccionado_GrupoP = data[0].GrupoMaterialBase2PID;
        var PQRSeleccionado_PWHT = data[0].PWHT;
        var ProcesoSoldaduraRelleno = data[0].CodigoRelleno;
        var EspesorRellenoRelleno = data[0].EspesorRelleno;
        calcularDatosAutomaticosRelleno(PQRSeleccionado_GrupoP, PQRSeleccionado_PWHT);
        calcularEspesorMaximoRelleno(ProcesoSoldaduraRelleno, EspesorRellenoRelleno);
    });
};


function GuardaNuevoWPSAjax(WPSModal) {

    $WPS.WPS.create(WPSModal, { token: Cookies.get("token") }).done(function (data) {
        if (data.ReturnMessage == 'OK') {
            loadingStart();
            $("#windowWPS").data("kendoWindow").close();
            ObtenerJSONParaGrid();
            loadingStop();
        } 
    });
};


function EditaWPSAjax(WPSModal) {

    $WPS.WPS.update(WPSModal, { token: Cookies.get("token"), Lenguaje: $("#language").val() }).done(function (data) {
        if (data.ReturnMessage == 'OK') {
            loadingStart();
            $("#windowWPS").data("kendoWindow").close();
            ObtenerJSONParaGrid();
            loadingStop();
        } 
    });

};

function AjaxGuardarCaptura() {

    Captura = [];
    Captura[0] = { ListaDetalles: "" };
    ListaDetalles = [];

    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].Etiquetado || arregloCaptura[index].ColorCintaID != 0) {

            ListaDetalles[contGuardar] = {
                EmbarqueMarcadoID: "",
                SpoolID: "",
                Impreso: "",
                Etiquetado: "",
                ColorCintaID: ""
            };

        }
    }


    $WPS.WPS.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
        if (data.ReturnMessage == 'OK') {
            loadingStart();
            $("#windowWPS").data("kendoWindow").close();
            ObtenerJSONParaGrid();
            loadingStop();
        }
    });
};
