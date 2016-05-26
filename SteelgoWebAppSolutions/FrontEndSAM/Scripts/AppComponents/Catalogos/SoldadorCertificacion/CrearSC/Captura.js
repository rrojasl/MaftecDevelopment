function IniciarCapturaSC() {
    setTimeout(function () { AsignarEncabezados(); },10)
    SuscribirEventos();
}
IniciarCapturaSC();
function AsignarEncabezados() {
    $("#lblSoldador").text(_dictionary.SoldadorCertificacionCodigoObrero[$("#language").data("kendoDropDownList").value()]);
    $("#lblNombrePQR").text(_dictionary.SoldadorCertificacionNombrePQR[$("#language").data("kendoDropDownList").value()]);
    $("#lblProcesoSoldaduraPQR").text(_dictionary.SoldadorCertificacionProcesoSoldaduraPQR[$("#language").data("kendoDropDownList").value()]);
    $("#lblFechaInicioCertificado").text(_dictionary.SoldadorCertificacionFechaInicioCertificado[$("#language").data("kendoDropDownList").value()]);
    $("#lblFechaFinCertificado").text(_dictionary.SoldadorCertificacionFechaFinCertificado[$("#language").data("kendoDropDownList").value()]);
    $("#lblPasosSoldadura").text(_dictionary.SoldadorCertificacionPasosSoldadura[$("#language").data("kendoDropDownList").value()]);
    $("#lblCedulaTuboPQR").text(_dictionary.SoldadorCertificacionCedulaTuboPQR[$("#language").data("kendoDropDownList").value()]);
    $("#lblEspesorMinimo").text(_dictionary.SoldadorCertificacionEspesorMinimo[$("#language").data("kendoDropDownList").value()]);
    $("#lblEspesorMaximo").text(_dictionary.SoldadorCertificacionEspesorMaximo[$("#language").data("kendoDropDownList").value()]);
    $("#lblDiametroCalificado").text(_dictionary.SoldadorCertificacionDiametroCalificadoPQR[$("#language").data("kendoDropDownList").value()]);
    $("#lblTipoPrueba").text(_dictionary.SoldadorCertificacionTipoDePruebaPQR[$("#language").data("kendoDropDownList").value()]);
    $("#lblPosicionPQR").text(_dictionary.SoldadorCertificacionPosicionPQR[$("#language").data("kendoDropDownList").value()]);
}

function changeLanguageCall() {
    AsignarEncabezados();
    //document.title = _dictionary.CapturaArmadoArmadoSpool[$("#language").data("kendoDropDownList").value()];
}