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

                                      GrupoPRaiz = WPS.GrupoMaterialBase1RaizU + " " + WPS.GrupoMaterialBase1RaizD,
                                      GrupoPRelleno = WPS.GrupoMaterialBase1RellenoU + " " + WPS.GrupoMaterialBase1RellenoD,

                                      PWHTRaizId = Convert.ToInt32(WPS.PWHTId),
                                      PWHTRaiz = WPS.PWHT,
                                      PWHTRellenoId = Convert.ToInt32(WPS.PWHTId),
                                      PWHTRelleno = WPS.PWHT,

                                      PREHEATRaizId = Convert.ToInt32(WPS.PREHEATId),
                                      PREHEATRaiz = WPS.PREHEAT,
                                      PREHEATRellenoId = Convert.ToInt32(WPS.PREHEATId),
                                      PREHEATRelleno = WPS.PREHEAT,

                                      GrupoMaterialBase1RaizD = WPS.GrupoMaterialBase1RaizD,
                                      GrupoMaterialBase1RaizDID = WPS.GrupoMaterialBase1RaizDID.GetValueOrDefault(),
                                      GrupoMaterialBase1RaizU = WPS.GrupoMaterialBase1RaizU,
                                      GrupoMaterialBase1RaizUID = WPS.GrupoMaterialBase1RaizUID.GetValueOrDefault(),
                                      GrupoMaterialBase1RellenoD = WPS.GrupoMaterialBase1RellenoD,
                                      GrupoMaterialBase1RellenoDID = WPS.GrupoMaterialBase1RellenoDID.GetValueOrDefault(),
                                      GrupoMaterialBase1RellenoU = WPS.GrupoMaterialBase1RellenoU,
                                      GrupoMaterialBase1RellenoUID = WPS.GrupoMaterialBase1RellenoUID.GetValueOrDefault(),

                                      EspesorMaximo = WPS.EspesorMaximo.GetValueOrDefault(),
                                      EspesorMinimo= WPS.EspesorMinimo,

                                      listadoRaizPQR = (List<Models.WPS.PQR>)ObtenerListadoPQRActivos(1, 28, 2, null, null),
                                      listadoRellenoPQR = (List<Models.WPS.PQR>)ObtenerListadoPQRActivos(1, 28, 2, null, null),
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

        public object ObtenerListadoPQRActivos(int TipoAccion, int proyecto, int pruebaID, string especificacion, string codigo)
        {
            try
            {
                List<Models.WPS.PQR> listaPQR = new List<Models.WPS.PQR>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Soldadura_GET_PQR_WPS_Result> listaPQRJson = ctx.Sam3_Soldadura_GET_PQR_WPS("").ToList();
                    listaPQR.Add(new Models.WPS.PQR());
                    foreach (Sam3_Soldadura_GET_PQR_WPS_Result item in listaPQRJson)
                    {
                        listaPQR.Add(
                            new Models.WPS.PQR
                            {
                                PQRID = item.PQRID,
                                Nombre = item.Nombre,
                                PREHEAT = Convert.ToInt32(item.PREHEAT),
                                PWHT = Convert.ToInt32(item.PWHT),
                                EspesorRaiz = Decimal.ToDouble(item.EspesorRaiz.GetValueOrDefault()),
                                EspesorRelleno = Decimal.ToDouble(item.EspesorRelleno),
                                GrupoPMaterialBase1 = item.GrupoPMaterialBase1.GetValueOrDefault(),
                                GrupoPMaterialBase1Nombre = item.GrupoPMaterialBase1Nombre,
                                GrupoPMaterialBase2 = item.GrupoPMaterialBase2.GetValueOrDefault(),
                                GrupoPMaterialBase2Nombre = item.GrupoPMaterialBase2Nombre,
                                ProcesoSoldaduraRaizID = item.ProcesoSoldaduraRaizID.GetValueOrDefault(),
                                ProcesoSoldaduraRellenoID = item.ProcesoSoldaduraRellenoID,
                                CodigoRaiz = item.CodigoRaiz,
                                CodigoRelleno = item.CodigoRelleno,
                            });
                    }
                    
                    return listaPQR;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ValidarExisteWPS(string nombre)
        {

            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjectParameter op = new ObjectParameter("Retorna", typeof(string));
                    op.Value = null;
                    var oMyString = new ObjectParameter("Retorna", typeof(string));
                    var res = ctx.Sam3_Soldadura_WPS_Existe(nombre, oMyString);
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