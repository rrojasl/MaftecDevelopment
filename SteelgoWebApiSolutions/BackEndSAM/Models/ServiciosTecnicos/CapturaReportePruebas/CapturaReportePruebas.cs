using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models.ServiciosTecnicos.CapturaReportePruebas
{
    public class CapturaReportePruebasDetalle
    {
        public int RequisicionPruebaElementoID { get; set; }
        public string SpoolJunta { get; set; }
        public int NumeroPlacas { get; set; }
        public string Tamano { get; set; }
        public string Densidad { get; set; }
        public List<DetallePruebas> listaDetallePruebas { get; set; }
        public List<DetalleDefectosNoRT> listaDefectosNoRT { get; set; }
    }

    public class ReportePruebasCabecera
    {
        public string TipoPrueba { get; set; }
        public string NombrePrueba { get; set; }
        public string Requisicion { get; set; }
        public string HerramientaPrueba { get; set; }
        public string TurnoLaboral { get; set; }
        public string Nombre { get; set; }
    }

    public class DetallePruebas
    {
        public int Accion { get; set; }
        public int RequisicionPruebaElementoID { get; set; }
        public int PruebaElementoResultadoID { get; set; }
        public string Ubicacion { get; set; }
        public int Resultado { get; set; }
        public string Nombre { get; set; }
        public List<Defectos> ListaDefectos { get; set; }
        public List<DetalleDefectos> ListaDetalleDefectos { get; set; }
    }

    public class Defectos
    {
        public Defectos()
        {
            DefectoID = 0;
            Nombre = "";
        }
        public int DefectoID { get; set; }
        public string Nombre { get; set; }
    }

    public class Proveedor    {
        public Proveedor()
        {
            ProveedorID = 0;
            Nombre = "";
        }

        public int ProveedorID { get; set; }
        public string Nombre { get; set; }
    }

    public class Requisicion
    {
        public Requisicion()
        {
            RequisicionID = 0;
            Folio = "";
        }

        public int RequisicionID { get; set; }
        public string Folio { get; set; }
    }


    public class DetalleDefectos
    {
        public int Accion { get; set; }
        public int DefectoID { get; set; }
        public string Nombre { get; set; }
        public Nullable<int> RequisicionPruebaElementoID { get; set; }
        public int PruebaElementoResultadoID { get; set; }
        public int PruebaElementoDefectoID { get; set; }
        public string InicioDefecto { get; set; }
        public string FinDefecto { get; set; }
    }

    public class DetalleDefectosNoRT
    {
        public int Accion { get; set; }
        public int CapturaReporteDefectoNoRTID { get; set; }
        public int CapturaReporteRequisicionID { get; set; }
        public int DefectoID { get; set; }
        public string Nombre { get; set; }
        public List<Defectos> listadoDefectos { get; set; }
    }


    public class Captura
    {
        public List<CapturaRequisicion> ListadoCapturaRequisicion { get; set; }
    }

    public class CapturaRequisicion
    {
        public List<GuardaCaptura> ListaCaptura { get; set; }
        public List<GuardaDefectos> ListaDefectos { get; set; }
    }

    public class GuardaDefectos
    {
        public int Accion { get; set; }
        public int PruebaElementoDefectoID { get; set; }
        public int PruebaElementoResultadoID { get; set; }
        public int DefectoID { get; set; }
        public string InicioDefecto { get; set; }
        public string FinDefecto { get; set; }
        public string Ubicacion { get; set; }
        public int RequisicionPruebaElemento { get; set; }
    }

    public class GuardaCaptura
    {
        public int Accion { get; set; }
        public int RequisicionPruebaElementoID { get; set; }
        public int PruebaElementoResultadoID { get; set; }
        public string Tamano { get; set; }
        public string Densidad { get; set; }
        public string Ubicacion { get; set; }
        public int Resultado { get; set; }
    }

}