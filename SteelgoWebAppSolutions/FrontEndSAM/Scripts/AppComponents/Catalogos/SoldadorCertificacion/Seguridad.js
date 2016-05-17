Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10010", { path: '/' });

var $SoldadorCertificacionSaveModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {
        CodigoObrero: {
            visible: "#DivCodigoObrero",
            editable: "#SoldadorCertificacionCargarObreroID",
            required: "#SoldadorCertificacionCargarObreroID"
        },
        NombrePQR: {
            visible: "#DivNombrePQR",
            editable: "#SoldadorCertificacionCargarPQRID",
            required: "#SoldadorCertificacionCargarPQRID"
        },
        ProcesoSoldadura: {
            visible: "#DivProcesoSoldadura",
            editable: "#SoldadorCertificacionProcesoSoldaduraID",
            required: "#SoldadorCertificacionProcesoSoldaduraID"
        },
        TipoDePrueba: {
            visible: "#DivTipoDePrueba",
            editable: "#SoldadorCertificacionTipoDePruebaID",
            required: "#SoldadorCertificacionTipoDePruebaID"
        },
        Posicion: {
            visible: "#DivPosicion",
            editable: "#SoldadorCertificacionPosicionID",
            required: "#SoldadorCertificacionPosicionID"
        },
        FechaInicioCertificado: {
            visible: "#DivFechaInicio",
            editable: "#SoldadorCertificacionFechaInicio",
            required: "#SoldadorCertificacionFechaInicio"
        },
        FechaFinCertificado: {
            visible: "#DivFechaFin",
            editable: "#SoldadorCertificacionFechaFin",
            required: "#SoldadorCertificacionFechaFin"
        },
        CedulaTubo: {
            visible: "#DivCedulaTubo",
            editable: "#SoldadorCertificacionCedulaTuboID",
            required: "#SoldadorCertificacionCedulaTuboID"
        },
        DiametroCalificado: {
            visible: "#DivDiametroCalificado",
            editable: "#SoldadorCertificacionDiametroCalificadoID",
            required: "#SoldadorCertificacionDiametroCalificadoID"
        },
        EspesorMinimo: {
            visible: "#DivEspesorMinimo",
            editable: "#SoldadorCertificacionEspesorMaximoID",
            required: "#SoldadorCertificacionEspesorMaximoID"
        },
        EspesorMaximo: {
            visible: "#DivEspesorMaximo",
            editable: "#SoldadorCertificacionEspesorMinimoID",
            required: "#SoldadorCertificacionEspesorMinimoID"
        },
        PorcentajeJuntasRequiere: {
            visible: "#DivPorcentajeJuntas",
            editable: "#SoldadorCertificacionPorcentajeJuntas",
            required: "#SoldadorCertificacionPorcentajeJuntas"
        }
    }
};
