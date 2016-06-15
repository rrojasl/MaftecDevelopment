/********************************************/
/********************************************/
/*********                          *********/
/*********    API Manager           *********/
/*********                          *********/
/********************************************/
/********************************************/

/****************************/
/*    Global Variables      */
/****************************/

//LOCALHOST BASE URL's

// URLS Definity first
//------------------------------------------------
//var $BackEndSAMUri = 'http://10.15.2.12:8080';
//var $SecuritySAMUri = 'http://10.15.2.12:8081';
//var $MessagesSAMUri = 'http://10.15.2.12:8082';
//var $SearchSAMUri = 'http://192.168.1.7:60921';
//var $FilesSAMUri = 'http://192.168.1.7:60921';

var $BackEndSAMUri = 'http://localhost:60960';
var $SecuritySAMUri = 'http://localhost:60921';
var $MessagesSAMUri = 'http://localhost:60417';
var $SearchSAMUri = 'http://localhost:61066';
var $FilesSAMUri = 'http://localhost:60971';
//------------------------------------------------

//DEVELOPMENT Steelgo BASE URL's
//var $BackEndSAMUri = 'http://newm.samaltamira.net:9071';
//var $SecuritySAMUri = 'http://newm.samaltamira.net:9074';
//var $MessagesSAMUri = 'http://newm.samaltamira.net:9073';
//var $SearchSAMUri = 'http://newm.samaltamira.net:9075';
//var $FilesSAMUri = 'http://newm.samaltamira.net:9072';

//Local host
//var $BackEndSAMUri = 'http://localhost:60960';
//var $SecuritySAMUri = 'http://localhost:60921';
//var $MessagesSAMUri = 'http://localhost:60966';
//var $SearchSAMUri = 'http://localhost:60921';
//var $SearchSAMUri2 = 'http://10.15.10.185:8089';
//var $FilesSAMUri = 'http://localhost:60921';

//Combos Base URL
var $DocumentoAvisoLlegadaUploadFiles = $BackEndSAMUri + "/backendsam/api/DocumentoAvisoLlegada?folioAvisoLlegadaID=";
var $DocumentoPermisoAduana = $BackEndSAMUri + "/backendsam/api/DocumentoPermisoAduana";
var $DocumentoPaseSalidaUploadFiles = $BackEndSAMUri + "/backendsam/api/DocumentoPaseSalida?folioAvisoLlegada=";
var $DocumentoLlegadaMaterialUploadFiles = $BackEndSAMUri + "/backendsam/api/DocumentoFolioAvisoEntrada?folioAvisoEntradaID=";
var $DocumentoIncidenciasUploadFiles = $BackEndSAMUri + "/backendsam/api/DocumentoIncidencia?incidenciaID=";
var $URLItemCode = $BackEndSAMUri + '/backendsam/api/ItemCode?';
var $URLColada = $BackEndSAMUri + '/backendsam/api/Colada?';
var $URLItemCodeSteelgo = $BackEndSAMUri + '/backendsam/api/ObtenerRelacionItemCodeSteelgo?';
var $UrlTipoUso = $BackEndSAMUri + '/backendsam/api/TipoUso?';

//Definity first
var $UrlDummyDespacho = $BackEndSAMUri + '/backendsam/api/DummyDespacho?';
var $UrlNumerosUnicos = $BackEndSAMUri + '/backendsam/api/NumerosUnicos?';
var $UrlNumerosUnicosDespacho = $BackEndSAMUri + '/backendsam/api/NumeroUnico?';
var $UrlImpresionDocumental = $BackEndSAMUri + '/backendsam/api/ImpresionDocumental?';
var $UrlNoPickingTicket = $BackEndSAMUri + '/backendsam/api/PickingTicket?';
var $UrlNoEmpleado= $BackEndSAMUri + '/backendsam/api/Entrega?';
var $UrlReportingServices = "http://mtysqldev-v01:8082/Reports_Sam3/";
var $UrlOrdenTrabajoSpool = $BackEndSAMUri + '/backendsam/api/OrdenTrabajoSpool?';
var $UrlNumerosUnicosPreDespacho = $BackEndSAMUri + '/backendsam/api/PreDespacho?';
var $DiametrosCatalogos = $BackEndSAMUri + '/backendsam/api/Diametros?';
var $UrlOrdenTrabajo = $BackEndSAMUri + '/backendsam/api/OrdenTrabajo?';
var $UrlMaterialSpool = $BackEndSAMUri + '/backendsam/api/MaterialSpool?';
var $CatalogoEspesor = $BackEndSAMUri + '/backendsam/api/Espesor?';
var $MTR = $BackEndSAMUri + '/backendsam/api/MTR?';

//Steelgo - in House
//ServiciosTecnicos
var $ListadoRequisicion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $AsignarRequisicion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $RequisicionesAsignadas = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $EntregaResultados = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ImpresionPruebas = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ValidacionResultados = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $RevisionEmbarque = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $MedioTransporte = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $LotesCapturaReporte = new $.RestClient($BackEndSAMUri + '/backendsam/api/');


//Pintura
var $CapturaAvance = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $CapturaAvanceIntAcabado = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $CargaCarroBackLog = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $LotesCapturaReporte = new $.RestClient($BackEndSAMUri + '/backendsam/api/');

//Embarque

var $Consulta = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Marcado = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Embarque = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $CargaEmbarque = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ListadoEmbarque = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $CapturaReportePruebas = new $.RestClient($BackEndSAMUri + '/backendsam/api/');

//Planeacion Y Control
var $EmisionOT = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Ciclos = new $.RestClient($BackEndSAMUri + '/backendsam/api/');

//armado
var $CapturaArmado = new $.RestClient($BackEndSAMUri + '/backendsam/api/');

//Catalogos generales
var $CatalogosGenerales = new $.RestClient($BackEndSAMUri + '/backendsam/api/');

////Mediciones Climatologicas
var $MedicionesClimatologicas = new $.RestClient($BackEndSAMUri + '/backendsam/api/');

///Obtener Patios
var $Patios = new $.RestClient($BackEndSAMUri + '/backendsam/api/');

//obtener herramientas de medicion
var $HerramientasPruebas = new $.RestClient($BackEndSAMUri + '/backendsam/api/');

//Base API's
var $BackEndSAM = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
//var $FileManager = new $.RestClient($FilesSAMUri + '/filemanager/api/');
var $MessagesManager = new $.RestClient($MessagesSAMUri + '/messagesmanager/api/');
//var $SearchManager = new $.RestClient($SearchSAMUri + '/searchmanager/api/');
var $SecurityManager = new $.RestClient($SecuritySAMUri + '/securitymanager/api/');
//DetalleAvisoLlegada
var $WPS = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Plana = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Transportista = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Patio = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Proveedor = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $AvisoLlegada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Chofer = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Proyecto = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Camion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Contacto = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $folioEntradaMaterial = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $FiltrosListadoEntradaMaterial = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $FiltrosListadoLlegadaMaterial = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoVehiculo = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Cliente = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoAviso = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $PermisoAutorizado = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $PermisoTramite = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoArchivo = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DocumentoAvisoLlegada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ValidacionFolioConPermisoAduana = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyIncidencias = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DocumentoPaseSalida = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $PaseSalida = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DocumentoFolioAvisoEntrada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $FolioAvisoEntrada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $OrdenDescarga = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ObtenerDatosFolioAvisoEntrada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ObtenerDatosFolioLlegadaMaterial = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoPackingList = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoUso = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ListadoCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ValidarItemCodeNuCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyObtenerColadasPorProyecto = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Familia = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ItemCode = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ItemCodeSteelgo = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Fabricantes = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoAcero = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyColada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyCambiarEstatusCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyOrdenRecepcionFoliosAvisoEntrada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyOrdenRecepcionItemCode = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DummyGridOrdenRecepcion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $OrdenRecepcion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $NumeroUnico = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $OrdenAlmacenaje = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $GenerarOrdenAlmacenaje = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $FoliosCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $CargarGridCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Colada = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $GuardarFolioLlegadaCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $CambiarEstatusCuantificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ComplementarRecepcion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ListadoMateriales = new $.RestClient($BackEndSAMUri + '/backendsam/api/');

// Definity First
var $Almacenaje = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DetalleNumeroUnico = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ListadoMaterialesPorItemCode = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Despacho = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Maquina = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Cortador = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $NumerosUnicos = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Catalogos = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Corte = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $AsociacionICS = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Cedulas = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Clasificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoIncidencia = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $CatalogoICSteelgo = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Incidencia = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DocumentoIncidencia = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $DocumentosCatalogos = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ImpresionDocumental = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Grupo = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $MaterialPendiente = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Entrega = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $NotificacionDeficit = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Usuario = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $RevisionDeficit = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $IncidenciaPaseSalida = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
//var $Busqueda = new $.RestClient($SearchSAMUri2 + '/solr/Steelgo_Search/');
var $PreDespacho = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $GuardarPermisoAduana = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Diametros = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ConvertirSpoolAGranel = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Spool = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $FamiliaAcero = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Proxy = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Reporte = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Espesor = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ValidarCedulas = new $.RestClient($BackEndSAMUri + '/backendsam/api/');

// Definity first
var $DummyAlmacenajeRack = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $SoldadorCertificacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Area = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Cuadrante = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
//

//
// Steelgo In House
var $TipoJunta = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $PQR = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
/****************************/
/*    Document Ready        */
/****************************/

//Method to be called on the document ready and contains all the pertinent code for a partial view
function apiManagerToBeExecutedOnDocumentReady() {
    //CODE
}

/****************************/
/*    Global Functions      */
/****************************/

$BackEndSAM.add('DummyListadoAvisoLlegada');
$BackEndSAM.add('perfil');
$SecurityManager.add('authentication');
$BackEndSAM.add('TipoJunta');
$BackEndSAM.add('ListadoCamposPredeterminados');
$BackEndSAM.add('PQR');
$BackEndSAM.add('SoldadorCertificacion');
$Consulta.add("Consulta");
$Marcado.add("Marcado");
$Area.add("Area");
$Cuadrante.add("Cuadrante");
$Embarque.add("Embarque");
$ListadoEmbarque.add("ListadoEmbarque");
$CapturaReportePruebas.add('CapturaReportePruebas');
$CargaEmbarque.add("CargaEmbarque");
$RevisionEmbarque.add("RevisionEmbarque");
$MedioTransporte.add("MedioTransporte");

//Pintura
$CargaCarroBackLog.add('CargaCarroBackLog');
$CapturaAvanceIntAcabado.add('CapturaAvanceIntAcabado');
$CapturaAvance.add('CapturaAvance');
$LotesCapturaReporte.add('LotesCapturaReporte');

//Planeacion Y Control
$EmisionOT.add('EmisionOT');
$Ciclos.add('Ciclos');

// ServiciosTecnicos
$ListadoRequisicion.add('ListadoRequisicion');
$AsignarRequisicion.add('AsignarRequisicion');
$RequisicionesAsignadas.add('RequisicionesAsignadas');
$EntregaResultados.add('EntregaResultados');
$ImpresionPruebas.add('ImpresionPruebas');
$ValidacionResultados.add('ValidacionResultados');

//captura armado
$CapturaArmado.add('Armado');
//mediciones imatologicas
$MedicionesClimatologicas.add("MedicionesClimatologicas");
$Patios.add("Patios");
$HerramientasPruebas.add("HerramientasPruebas");


//Detalle Aviso Llegada
$Plana.add("Plana");
$WPS.add("WPS");
$Transportista.add("Transportista");
$Patio.add("Patio");
$Proveedor.add("Proveedor");
$AvisoLlegada.add("AvisoLlegada");
$Chofer.add("Chofer");
$Proyecto.add("Proyecto");
$Camion.add("Tracto");
$Contacto.add("Contacto");
$folioEntradaMaterial.add("Listado");
$FiltrosListadoEntradaMaterial.add("AvisoLlegada");
$FiltrosListadoLlegadaMaterial.add("FolioAvisoEntrada");
$TipoVehiculo.add("TipoVehiculo");
$Cliente.add("Cliente");
$TipoAviso.add("TipoAviso");
$PermisoAutorizado.add("PermisoAutorizado");
$TipoArchivo.add("TipoArchivo");
$PermisoTramite.add("PermisoAduana");
$DocumentoAvisoLlegada.add("DocumentoAvisoLlegada");
$ValidacionFolioConPermisoAduana.add("ValidacionFolioConPermisoAduana");
$DummyIncidencias.add("DummyIncidencias")
$DocumentoPaseSalida.add("DocumentoPaseSalida");
$PaseSalida.add("PaseSalida");
$DocumentoFolioAvisoEntrada.add("DocumentoFolioAvisoEntrada");
$FolioAvisoEntrada.add("FolioAvisoEntrada");
$OrdenDescarga.add("OrdenDescarga");
$MessagesManager.add("MessageManager");
$ObtenerDatosFolioAvisoEntrada.add("ObtenerDatosFolioAvisoEntrada");
$ObtenerDatosFolioLlegadaMaterial.add("ObtenerDatosFolioLlegadaMaterial");
$TipoPackingList.add("TipoPackingList");
$TipoUso.add("TipoUso");
$ListadoCuantificacion.add("ListadoCuantificacion");
$ValidarItemCodeNuCuantificacion.add("ValidarItemCodeNuCuantificacion");
$DummyObtenerColadasPorProyecto.add("DummyColadasPorProyecto");
$Familia.add("Familia");
$ItemCode.add("ItemCode");
$ItemCodeSteelgo.add("ItemCodeSteelgo");
$Fabricantes.add("Fabricantes");
$TipoAcero.add("TipoAcero");
$DummyColada.add("DummyColada");
$DummyCambiarEstatusCuantificacion.add("DummyCambiarEstatusCuantificacion");
$DummyOrdenRecepcionFoliosAvisoEntrada.add("DummyOrdenRecepcionFoliosAvisoEntrada");
$DummyOrdenRecepcionItemCode.add("DummyOrdenRecepcionItemCode");
$DummyGridOrdenRecepcion.add("DummyGridOrdenRecepcion");
$OrdenRecepcion.add("OrdenRecepcion");
$NumeroUnico.add("NumeroUnico");
$OrdenAlmacenaje.add("OrdenAlmacenaje");
$GenerarOrdenAlmacenaje.add("GenerarOrdenAlmacenaje");
$FoliosCuantificacion.add("FoliosCuantificacion");
$CargarGridCuantificacion.add("CargarGridCuantificacion");
$Colada.add("Colada");
$GuardarFolioLlegadaCuantificacion.add("GuardarFolioLlegadaCuantificacion");
$CambiarEstatusCuantificacion.add("CambiarEstatusCuantificacion");
$ComplementarRecepcion.add("ComplementarRecepcion");
$ListadoMateriales.add("ListadoMateriales")

//Definity First
$Almacenaje.add("Almacenaje");
$DetalleNumeroUnico.add("DetalleNumeroUnico");
$ListadoMaterialesPorItemCode.add("ListadoMaterialesPorItemCode");
$Despacho.add("Despacho");
$Maquina.add("Maquina");
$Cortador.add("Cortador");
$NumerosUnicos.add("NumerosUnicos");
$Catalogos.add("AdministracionCatalogos");
$Corte.add("Corte")
$AsociacionICS.add("AsociacionICS");
$Cedulas.add("Cedulas");
$Clasificacion.add("Clasificacion");
$TipoIncidencia.add("TipoIncidencia");
$CatalogoICSteelgo.add("CatalogoICSteelgo");
$Incidencia.add("Incidencia");
$DocumentoIncidencia.add("DocumentoIncidencia");
$DocumentosCatalogos.add("DocumentosCatalogos");
$ImpresionDocumental.add("ImpresionDocumental");
$Grupo.add("Grupo");
$MaterialPendiente.add("MaterialPendiente");
$Entrega.add("Entrega");
$NotificacionDeficit.add("NotificacionDeficit");
$Usuario.add("Usuario");
$RevisionDeficit.add("RevisionDeficit");
$IncidenciaPaseSalida.add("IncidenciaPaseSalida");
//$Busqueda.add("select");
$PreDespacho.add("PreDespacho");
$GuardarPermisoAduana.add("DocumentoPermisoAduana");
$Diametros.add("Diametros");
$ConvertirSpoolAGranel.add("ConvertirSpoolAGranel");
$Spool.add("Spool");
$FamiliaAcero.add("FamiliaAcero");
$Proxy.add("Proxy");
$Reporte.add("Reporte");
$Espesor.add("Espesor");
$ValidarCedulas.add("ValidarCedulas");

//Steelgo in House
$DummyAlmacenajeRack.add("DummyAlmacenajeRack");
$CatalogosGenerales.add("CatalogosGenerales");

$TipoJunta.add("TipoJunta");
$PQR.add("PQR");
$SoldadorCertificacion.add("SoldadorCertificacion");

//#region Declaracion
//#region Catalogos
var $TrabajoAdicional = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoTrabajoAdicional = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $TipoObrero = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Obrero = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ObreroUbicacion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Defectos = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $ListadoCamposPredeterminados = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Taller = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Pruebas = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
//#endregion
//#region Capturas rapidas
var $CapturasRapidas = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $CapturaSoldadura = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $Inspeccion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $InspeccionDimensional = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
var $GenerarRequisicion = new $.RestClient($BackEndSAMUri + '/backendsam/api/');
//#endregion

//#endregion


//#region Asignacion
//Catalogos
$TrabajoAdicional.add("ListadoTrabajosAdicionales");
$TipoTrabajoAdicional.add("TipoTrabajoAdicional");
$TipoObrero.add("TipoObrero");
$Obrero.add("Obrero");
$ObreroUbicacion.add("ObreroUbicacion");
$Defectos.add("Defectos");
$ListadoCamposPredeterminados.add("ListadoCamposPredeterminados");
$Taller.add("Taller");
$Pruebas.add("Pruebas");
//#endregion
//#region Capturas rapidas
$CapturasRapidas.add("CapturasRapidas");
$CapturaSoldadura.add("Soldadura");
$Inspeccion.add("Inspeccion");
$InspeccionDimensional.add("InspeccionDimensional");
$GenerarRequisicion.add("GenerarRequisicion");
//#endregion
//#endregion
