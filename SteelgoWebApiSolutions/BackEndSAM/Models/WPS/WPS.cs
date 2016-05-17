
using System.Collections.Generic;

namespace BackEndSAM.Models.WPS
{
    public class WPS
    {
        public int Accion { get; set; }
        public int WPSID { get; set; }
        public string WPSNombre { get; set; }
        public int PQRRaizId { get; set; }
        public string NombrePQRRaiz { get; set; }
        public int PQRRellenoId { get; set; }
        public string NombrePQRRelleno { get; set; }
        public int GrupoPId { get; set; }
        public string GrupoP { get; set; }
        public int PWHTId { get; set; }
        public string PWHT { get; set; }
        public string EspesorMaximoRaiz { get; set; }
        public string EspesorMinimoRaiz { get; set; }
        public string EspesorMaximoRelleno { get; set; }
        public string EspesorMinimoRelleno { get; set; }

        public int GrupoPIdRaiz { get; set; }
        public int PWHTRaiz { get; set; }
        public List<PQR> listadoRellenoPQR { get; set; }
        public List<PQR> listadoRaizPQR { get; set; }
        public List<PQR> listadoGrupoP { get; set; }
    }

    public class Captura
    {
        public List<WPSGuardar> ListaDetalles { get; set; }
    }
    public class WPSGuardar
    {
        public int Accion { get; set; }
        public int WPSId { get; set; }
        public string WPSNombre { get; set; }
        public int PQRRaizId { get; set; }
        public int PQRRellenoId { get; set; }
        public int GrupoPId { get; set; }
        public int PWHTId { get; set; }
        public int EspesorMaximoRaiz { get; set; }
        public int EspesorMinimoRaiz { get; set; }
        public int EspesorMaximoRelleno { get; set; }
        public int EspesorMinimoRelleno { get; set; }
    }

}
