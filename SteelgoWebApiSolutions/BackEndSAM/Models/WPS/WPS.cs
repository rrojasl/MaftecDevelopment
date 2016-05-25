
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
        

        public int GrupoMaterialBase1RaizUID { get; set; }
        public string GrupoMaterialBase1RaizU { get; set; }
        public int GrupoMaterialBase1RaizDID { get; set; }
        public string GrupoMaterialBase1RaizD { get; set; }
        public int GrupoMaterialBase1RellenoUID { get; set; }
        public string GrupoMaterialBase1RellenoU { get; set; }
        public int GrupoMaterialBase1RellenoDID { get; set; }
        public string GrupoMaterialBase1RellenoD { get; set; }

        public List<PQR> listadoRellenoPQR { get; set; }
        public List<PQR> listadoRaizPQR { get; set; }
        public List<PQR> listadoGrupoP { get; set; }
        public List<Models.Pintura.MedioTransporte.Proyecto> ListaProyectos { get; set; }
    }


    public class PQR 
    {
        public PQR()
        {
            PQRID = 0;
            Nombre = "";
            PREHEAT = 0;
            PWHT = 0;
            EspesorRaiz = 0;
            EspesorRelleno = 0;
            GrupoPMaterialBase1 = 0;
            GrupoPMaterialBase1Nombre = "";
            GrupoPMaterialBase2 = 0;
            GrupoPMaterialBase2Nombre = "";
            ProcesoSoldaduraRaizID = 0;
            ProcesoSoldaduraRellenoID = 0;
            CodigoRaiz = "";
            CodigoRelleno = "";
        }

        //Grid PQR
        public int PQRID { get; set; }
        public string Nombre { get; set; }
        public int PREHEAT { get; set; }
        public int PWHT { get; set; }
        public double EspesorRelleno { get; set; }
        public double EspesorRaiz { get; set; }
        public int GrupoPMaterialBase1 { get; set; }
        public string GrupoPMaterialBase1Nombre { get; set; }
        public int GrupoPMaterialBase2 { get; set; }
        public string GrupoPMaterialBase2Nombre { get; set; }
        public int ProcesoSoldaduraRellenoID { get; set; }
        public int ProcesoSoldaduraRaizID { get; set; }
        public string CodigoRelleno { get; set; }
        public string CodigoRaiz { get; set; }
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
