using DatabaseManager.Sam3;
using System.Collections.Generic;

namespace BackEndSAM.Models.GenerarRequisicion
{
    public class Pruebas
    {
        public int PruebasID { get; set; }
        public string Clave { get; set; }
        public string Nombre { get; set; }
    }
    public class JsonRequisicion
    {
        public int Accion { get; set; }
        public string Clasificacion { get; set; }
        public int PruebasClasificacionID { get; set; }
        public string Cuadrante { get; set; }
        public int Prioridad { get; set; }
        public string Proyecto { get; set; }
        public int ProyectoID { get; set; }
        public int PruebasID { get; set; }
        public int PruebaElementoID { get; set; }
        public int JuntaSpoolID { get; set; }
        public int IdentificadorForaneo { get; set; }
        public int PruebasProyectoID { get; set; }
        public string NumeroControl { get; set; }
        public string EtiquetaJunta { get; set; }
        public int JuntaTrabajoID { get; set; }
        public bool Agregar { get; set; }
        public int RequisicionPruebaElementoID { get; set; }
        public int RequisicionID { get; set; }
        public string Folio { get; set; }
        public List<Sam3_Steelgo_Get_Calsificaciones_Result> listaClasificaciones { get; set; }
        public int SpoolID { get; set; }
        public decimal Diametro { get; set; }
        public decimal Espesor { get; set; }
        public string Cedula { get; set; }
        public string TipoJunta { get; set; }
        public string NombrePrueba { get; set; }
        public int CodigoAsmeID { get; set; }
        public List<Sam3_Cat_PQR_ListaCodigos_Result> listaCodigo { get; set; }
    }
    public class IdOrdenTrabajo
    {
        public string OrdenTrabajo { get; set; }
        public List<IDS> idStatus { get; set; }
    }

    public class IDS
    {
        public string Status { get; set; }
        public string IDValido { get; set; }
        public int Valor { get; set; }
        public string Proyecto { get; set; }
        public int ProyectoID { get; set; }
    }

    public class CamposPredeterminados
    {
        public string Fecha { get; set; }
        public string Muestra { get; set; }
        public string FormatoFecha { get; set; }
    }

    public class Captura
    {
        public Captura() {
            Folio = "";
            PruebasID = 0;
            ProyectoID = 0;
            CodigoAsmeID = 0;
            Observacion = "";
            RequisicionID = 0;
        }
        public string Folio { get; set; }
        public List<DetalleGuardarJson> listaRequisiciones { get; set; }
        public string Observacion { get; set; }
        public int PruebasID { get; set; }
        public int RequisicionID { get; set; }
        public int ProyectoID { get; set; }
        public int CodigoAsmeID { get; set; }
    }
    public class DetalleGuardarJson
    {
        public int Accion { get; set; }
        public int RequisicionJuntaSpoolID { get; set; }
        public int JuntaSpoolID { get; set; }
        public int RequisicionID { get; set; }
        public string ClasificacionPND { get; set; }
        public int ClasificacionPNDID { get; set; }
    }
    public class Proyecto
    {
        public Proyecto()
        {
            Nombre = "";
            ProyectoID = 0;
        }
        public string Nombre { get; set; }
        public int ProyectoID { get; set; }
    }
}
