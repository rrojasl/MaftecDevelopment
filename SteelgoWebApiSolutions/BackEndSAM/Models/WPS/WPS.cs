
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

        public int GrupoPRellenoId { get; set; }
        public string GrupoPRelleno { get; set; }
        public int GrupoPRaizId { get; set; }
        public string GrupoPRaiz { get; set; }
        
        public int PWHTRaizId { get; set; }
        public string PWHTRaiz { get; set; }
        public int PWHTRellenoId { get; set; }
        public string PWHTRelleno { get; set; }

        public int PREHEATRellenoId { get; set; }
        public string PREHEATRelleno { get; set; }
        public int PREHEATRaizId { get; set; }
        public string PREHEATRaiz { get; set; }

        public decimal EspesorMaximo { get; set; }
        public decimal EspesorMinimo { get; set; }

        public decimal RaizEspesorRaiz { get; set; }
        public decimal RaizEspesorRelleno { get; set; }
        public decimal RellenoEspesorRaiz { get; set; }
        public decimal RellenoEspesorRelleno { get; set; }
        

        public int GrupoMaterialBase1RaizUID { get; set; }
        public string GrupoMaterialBase1RaizU { get; set; }
        public int GrupoMaterialBase1RaizDID { get; set; }
        public string GrupoMaterialBase1RaizD { get; set; }
        public int GrupoMaterialBase1RellenoUID { get; set; }
        public string GrupoMaterialBase1RellenoU { get; set; }
        public int GrupoMaterialBase1RellenoDID { get; set; }
        public string GrupoMaterialBase1RellenoD { get; set; }

        public List<DetallePQR> listadoRellenoPQR { get; set; }
        public List<DetallePQR> listadoRaizPQR { get; set; }
        public List<DetallePQR> listadoGrupoP { get; set; } 
    }


   

        public class Captura
    {
        public List<WPSGuardar> Detalles { get; set; }
    }
    public class WPSGuardar
    {
        public int Accion { get; set; }
        public int WPSId { get; set; }
        public string WPSNombre { get; set; }
        public int PQRRaizId { get; set; }
        public int PQRRellenoId { get; set; }
        public int PWHTId { get; set; }
        public int PREHEAT { get; set; }
        public double EspesorMaximoRaiz { get; set; }
        public double EspesorMinimoRaiz { get; set; }
        public double EspesorMaximoRelleno { get; set; }
        public double EspesorMinimoRelleno { get; set; }
    }
  
}
