using DatabaseManager.Sam3;
using BackEndSAM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SecurityManager.Api.Models;
using System.Data.Entity.Core.Objects;
using BackEndSAM.Models.WPS;
using SecurityManager.TokenHandler;
using System.Data;
using BackEndSAM.DataAcces.PinturaBD.MedioTransporteBD;

namespace BackEndSAM.DataAcces
{
    public class WPSBd
    {


        private static readonly object _mutex = new object();
        private static WPSBd _instance;


        public static WPSBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new WPSBd();
                    }
                }
                return _instance;
            }
        }


        public object ObtenerWPS(int TipoDato, Sam3_Usuario usuario)
        {

            using (SamContext ctx = new SamContext())
            {
                List<WPS> data = (from WPS in ctx.Sam3_Soldadura_WPS(TipoDato, null, null, null, null, null, null, null, null, null, null, null, null, null)
                                            select new WPS
                                            {
                                                Accion = 2,
                                                WPSID = WPS.WPSID,
                                                WPSNombre = WPS.WPSNombre,

                                                PQRRaizId = Convert.ToInt32(WPS.PQRRaizId),
                                                NombrePQRRaiz = WPS.NombrePQRRaiz,
                                                PQRRellenoId = Convert.ToInt32(WPS.PQRRellenoId),
                                                NombrePQRRelleno = WPS.NombrePQRRelleno,

                                                GrupoPRaizId = Convert.ToInt32(WPS.GrupoPId),
                                                GrupoPRaiz = WPS.GrupoP,
                                                GrupoPRellenoId = Convert.ToInt32(WPS.GrupoPId),
                                                GrupoPRelleno = WPS.GrupoP,

                                                PWHTRaizId = Convert.ToInt32(WPS.PWHTId),
                                                PWHTRaiz = WPS.PWHT,
                                                PWHTRellenoId = Convert.ToInt32(WPS.PWHTId),
                                                PWHTRelleno = WPS.PWHT,

                                                PREHEATRaizId = Convert.ToInt32(WPS.PREHEATId),
                                                PREHEATRaiz = WPS.PREHEAT,
                                                PREHEATRellenoId = Convert.ToInt32(WPS.PREHEATId),
                                                PREHEATRelleno = WPS.PREHEAT,

                                                EspesorMaximoRaiz = WPS.EspesorMaximoRaiz.GetValueOrDefault(),
                                                EspesorMinimoRaiz = WPS.EspesorMinimoRaiz,
                                                EspesorMaximoRelleno = WPS.EspesorMaximoRelleno.GetValueOrDefault(),
                                                EspesorMinimoRelleno = WPS.EspesorMinimoRelleno,
                                                Proyecto = WPS.Proyecto,
                                                ProyectoID = WPS.ProyectoID,

                                                listadoRaizPQR = (List<PQR>)PQRBd.Instance.ObtenerListadoPQRActivos(1,28,2,null,null),
                                                listadoRellenoPQR = (List<PQR>)PQRBd.Instance.ObtenerListadoPQRActivos(1, 28, 2, null, null),
                                                ListaProyectos = (List<Models.Pintura.MedioTransporte.Proyecto>)MedioTransporteBD.Instance.obtenerListaProyectos()
                                            }).AsParallel().ToList();
                return data;


            }


        }





        public object EliminaWPS(int TipoDeDato, int WPSIdentificador, int IdUsuario)
        {

            using (SamContext ctx = new SamContext())
            {
                ObjectResult<Sam3_Soldadura_WPS_Result> ColeccionObjetResult = ctx.Sam3_Soldadura_WPS(TipoDeDato, null, null, null, null, null, null, null, null, null, null, null, IdUsuario, WPSIdentificador);

                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add("OK");
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
                


            }




        }



        public object AgregarWPS(DataTable dtDetalleWPS, Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {

                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() } };
                    _SQL.Ejecuta(Stords.GUARDAWPS, dtDetalleWPS, "@Tabla", parametro);


                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("OK");
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;

                }
            }
            catch (Exception ex)
            {

                TransactionalInformation lista = new TransactionalInformation();
                lista.ReturnMessage.Add(ex.Message);
                lista.ReturnCode = 500;
                lista.ReturnStatus = false;
                lista.IsAuthenicated = true;

                return lista;
            }




        }



        public object EditaWPS(WPS AddWPS, string Lenguaje,  Sam3_Usuario usuario)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {

                    //ObjectResult<Sam3_Soldadura_WPS_Result> ColeccionObjetResult = ctx.Sam3_Soldadura_WPS(3, AddWPS.WPSNombre, AddWPS.PQRRaizId, AddWPS.PQRRellenoId, AddWPS.GrupoPIdRaiz, AddWPS.GrupoPIdRaiz, Convert.ToBoolean(AddWPS.PWHTRaiz), Convert.ToBoolean(AddWPS.PWHTRaiz), AddWPS.EspesorMaximoRelleno, AddWPS.EspesorMinimoRelleno, AddWPS.EspesorMaximoRaiz, AddWPS.EspesorMinimoRaiz, usuario.UsuarioID, AddWPS.WPSID);

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("OK");
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch (Exception ex)
            {

                TransactionalInformation lista = new TransactionalInformation();
                lista.ReturnMessage.Add(ex.Message);
                lista.ReturnCode = 500;
                lista.ReturnStatus = false;
                lista.IsAuthenicated = true;

                return lista;
            }

        }


        public object ValidarExisteWPS(int WPSID, string nombre)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjectParameter op = new ObjectParameter("Retorna", typeof(string));
                    op.Value = null;
                    var oMyString = new ObjectParameter("Retorna", typeof(string));
                    var res = ctx.Sam3_Soldadura_WPS_Existe(nombre, oMyString, WPSID);
                    var data = oMyString.Value.ToString();
                    TransactionalInformation result = new TransactionalInformation();
                    if (data.Equals("ok"))
                    {
                        result.ReturnMessage.Add("OK");
                    }
                    else
                    {
                        result.ReturnMessage.Add("Error");
                    }

                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation lista = new TransactionalInformation();
                lista.ReturnMessage.Add(ex.Message);
                lista.ReturnCode = 500;
                lista.ReturnStatus = false;
                lista.IsAuthenicated = true;

                return lista;
            }

        }


    }
}