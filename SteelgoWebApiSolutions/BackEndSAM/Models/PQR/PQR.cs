using System.Collections.Generic;
using System.Web.Http;

namespace BackEndSAM.Models
{
    public class PQR : ApiController
    {

        //Grid PQR
        public int PQRID { get; set; }
        public string Nombre { get; set; }
        public bool PREHEAT { get; set; }
        public bool PWHT { get; set; }
        public decimal EspesorRelleno { get; set; }
        public decimal EspesorRaiz { get; set; }
        public string CodigoRelleno { get; set; }
        public string CodigoRaiz { get; set; }
        public string NumeroP { get; set; }
        public string Aporte { get; set; }
        public string Mezcla { get; set; }
        public string Respaldo { get; set; }
        public string GrupoF { get; set; }
        public string Codigo { get; set; }
        public string UsuarioModificacion { get; set; }
        public string FechaModificacion { get; set; }

        //Grupo P Materiales base
        public int GrupoPMaterialBase1 { get; set; }
        public int GrupoPMaterialBase1Nombre { get; set; }
        public int GrupoPMaterialBase2 { get; set; }
        public int GrupoPMaterialBase2Nombre { get; set; }


        //ProcesoSoldadura
        public int ProcesoSoldaduraRellenoID { get; set; }
        public int ProcesoSoldaduraRaizID { get; set; }
        
        //Aporte
        public int AporteID { get; set; }

        //Mezcla
        public int MezclaID { get; set; }

        //Respaldo
        public int RespaldoID { get; set; }

        //GrupoF
        public int GrupoFID { get; set; }

        //Codigo
        public int CodigoID { get; set; }

        //ValidaNombre
        public string Existe { get; set; }

        public List<ListaProcesoSoldadura> ListaProcesosSoldadura { get; set; }

        public List<ListaMaterialesBase> ListaMaterialesBase { get; set; }

        public List<ListaCodigos> ListaCodigos { get; set; }
    }

    public class ListaProcesoSoldadura
    {
        public ListaProcesoSoldadura()
        {
            this.ProcesoSoldaduraID = 0;
            this.Codigo = "";
        }

        public int ProcesoSoldaduraID { get; set; }
        public string Codigo { get; set; }
    }

    public class ListaMaterialesBase
    {
        public ListaMaterialesBase()
        {
            GrupoPID = 0;
            GrupoP = "";
        }
        public int GrupoPID { get; set; }
        public string GrupoP { get; set; }
    }

    public class ListaCodigos
    {
        public int ProcesoSoldaduraID { get; set; }
        public string Codigo { get; set; }
    }

    public class Captura
    {
        public List<PQRGuardar> ListaDetalles { get; set; }
    }

    public class PQRGuardar {
        public string PQRID { get; set; }
        public string Nombre { get; set; }
        public bool PREHEAT { get; set; }
        public bool PWHT { get; set; }
        public string EspesorRelleno { get; set; }
        public string EspesorRaiz { get; set; }
        public string CodigoRelleno { get; set; }
        public string CodigoRaiz { get; set; }
        public string NumeroP { get; set; }
        public string GrupoMaterialBase1 { get; set; }
        public string GrupoMaterialBase2 { get; set; }
        public string Aporte { get; set; }
        public string Mezcla { get; set; }
        public string Respaldo { get; set; }
        public string GrupoF { get; set; }
        public string Codigo { get; set; }
        public string UsuarioModificacion { get; set; }
        public string FechaModificacion { get; set; }

        //NumeroP

        public int NumeroPID { get; set; }

        //ProcesoSoldadura

        public int ProcesoSoldaduraRellenoID { get; set; }
        public int ProcesoSoldaduraRaizID { get; set; }

        //Grupop
        public int GrupoMaterialBase1PID { get; set; }
        public int GrupoMaterialBase2PID { get; set; }

        //Aporte
        public int AporteID { get; set; }

        //Mezcla
        public int MezclaID { get; set; }

        //Respaldo
        public int RespaldoID { get; set; }

        //GrupoF
        public int GrupoFID { get; set; }

        //Codigo
        public int CodigoID { get; set; }

        //ValidaNombre
        public string Existe { get; set; }
    }
}
