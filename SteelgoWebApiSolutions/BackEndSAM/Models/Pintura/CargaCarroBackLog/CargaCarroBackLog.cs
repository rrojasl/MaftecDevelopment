using System.Collections.Generic; 

namespace BackEndSAM.Models.Pintura.CargaCarroBackLog
{
    public class CargaCarroBackLog
    {
        public int Accion { get; set; }
        public string SpoolJunta { get; set; }
        public int OrdenImportancia { get; set; }
        public decimal Peso { get; set; }
        public decimal Metros2 { get; set; }
        public string SistemaPintura { get; set; }
        public string Color { get; set; }
        public int SpoolID { get; set; }
        public int CuadranteID { get; set; }
        public string CuadranteSpool { get; set; }
        public string CuadranteMedioTransporte { get; set; }
        public int ProyectoID { get; set; }
        public string NombreMedioTransporte { get; set; }
        public int SistemaPinturaID { get; set; }
        public bool Seleccionado { get; set; }
        public bool Status { get; set; }
        public bool CarroCerrado { get; set; }
        public int MedioTransporteCargaID { get; set; }
    }

    public class Captura
    {
        public List<SpoolCarga> ListaDetalles { get; set; }
    }

    public class SpoolCarga
    {
        public int Spool { get; set; }
        public int MedioTransporteCargaID { get; set; }
    }

    public class CamposPredeterminadosBacklog
    {
        public string Cerrar { get; set; }
    }

}