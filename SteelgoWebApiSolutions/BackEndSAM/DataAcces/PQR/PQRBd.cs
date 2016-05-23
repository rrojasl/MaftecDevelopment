using DatabaseManager.Sam3;
using BackEndSAM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using SecurityManager.Api.Models;
using System.Data.Entity.Core.Objects;
using System.Data;

namespace BackEndSAM.DataAcces
{
    public class PQRBd
    {
        private static readonly object _mutex = new object();
        private static PQRBd _instance;

        public static PQRBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new PQRBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoPQRActivos(int TipoAccion, int proyecto, int pruebaID, string especificacion, string codigo)
        {
            try
            {
                List<PQR> listaPQR = new List<PQR>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Soldadura_PQR_Result> listaPQRJson = ctx.Sam3_Soldadura_PQR(TipoAccion, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null).ToList();

                    foreach(Sam3_Soldadura_PQR_Result item in listaPQRJson)
                    {
                        listaPQR.Add(
                            new PQR {
                                PQRID = item.PQRID,
                                Nombre = item.Nombre,
                                PREHEAT = Convert.ToInt32(item.PREHEAT),
                                PWHT = Convert.ToInt32(item.PWHT),
                                EspesorRaiz = item.EspesorRaiz.GetValueOrDefault(),
                                EspesorRelleno = item.EspesorRelleno,
                                ProcesoSoldaduraRaizID = item.ProcesoSoldaduraRaizID.GetValueOrDefault(),
                                ProcesoSoldaduraRellenoID = item.ProcesoSoldaduraRellenoID,
                                CodigoRaiz = item.CodigoRaiz,
                                CodigoRelleno = item.CodigoRelleno,
                                GrupoPMaterialBase1 = item.GrupoPMaterialBase1.GetValueOrDefault(),
                                GrupoPMaterialBase1Nombre = item.GrupoPMaterialBase1Nombre,
                                GrupoPMaterialBase2 = item.GrupoPMaterialBase2.GetValueOrDefault(),
                                GrupoPMaterialBase2Nombre = item.GrupoPMaterialBase2Nombre,
                                Aporte = item.Aporte,
                                Mezcla = item.Mezcla,
                                Respaldo = item.Respaldo,
                                GrupoF = item.GrupoF,
                                CodigoASMEID = item.CodigoID.GetValueOrDefault(),
                                Codigo = item.Codigo,
                                Accion = 2,
                                ListaProcesosSoldadura = (List<ListaProcesoSoldadura>)obtenerListadoProcesos(TipoAccion),
                                ListaMaterialesBase = (List<ListaMaterialesBase>)obtenerListadoMaterialesBase(TipoAccion),
                                ListaCodigos = (List<ListaCodigos>)obtenerListadoCodigos(proyecto, pruebaID, especificacion, codigo)
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

        internal object ObtenerListasPQR(int proyecto, int pruebaID)
        {
            try
            {
                List<PQR> listaPQR = new List<PQR>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Soldadura_PQR_Result> listaPQRJson = ctx.Sam3_Soldadura_PQR(1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null).ToList();

                    foreach (Sam3_Soldadura_PQR_Result item in listaPQRJson)
                    {
                        listaPQR.Add(
                            new PQR
                            {
                                ListaProcesosSoldadura = (List<ListaProcesoSoldadura>)obtenerListadoProcesos(1),
                                ListaMaterialesBase = (List<ListaMaterialesBase>)obtenerListadoMaterialesBase(1),
                                ListaCodigos = (List<ListaCodigos>)obtenerListadoCodigos(proyecto, pruebaID, null, null)
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

        public object obtenerListadoProcesos(int tipoAccion)
        {
            try
            {
                List<ListaProcesoSoldadura> listaProcesosResult = new List<ListaProcesoSoldadura>();
                listaProcesosResult.Add(new ListaProcesoSoldadura());
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Cat_PQR_ProcesoSoldadura_Result> listadoProcesosSoldadura = ctx.Sam3_Cat_PQR_ProcesoSoldadura(tipoAccion).ToList();

                    foreach (Sam3_Cat_PQR_ProcesoSoldadura_Result item in listadoProcesosSoldadura)
                    {
                        listaProcesosResult.Add(new ListaProcesoSoldadura
                        {
                            ProcesoSoldaduraID = item.ProcesoSoldaduraID,
                            Codigo = item.Codigo
                        });
                    }

                    return listaProcesosResult;
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

        public object obtenerListadoMaterialesBase(int tipoAccion)
        {
            try
            {
                List<ListaMaterialesBase> listaMaterialesResult = new List<ListaMaterialesBase>();
                listaMaterialesResult.Add(new ListaMaterialesBase());
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Cat_PQR_ListaMateriales_Result> listadoMateriales = ctx.Sam3_Cat_PQR_ListaMateriales().ToList();
                    foreach (Sam3_Cat_PQR_ListaMateriales_Result item in listadoMateriales)
                    {
                        listaMaterialesResult.Add(new ListaMaterialesBase
                        {
                            GrupoP = item.GrupoP, 
                            GrupoPID = item.GrupoPID
                        });
                    }

                    return listaMaterialesResult;
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

        public object obtenerListadoCodigos(int proyectoID, int pruebaID, string especificacion, string codigo)
        {
            try
            {
                List<ListaCodigos> listaCodigoResult = new List<ListaCodigos>();
                listaCodigoResult.Add(new ListaCodigos());
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Cat_PQR_ListaCodigos_Result> listaCodigo = ctx.Sam3_Cat_PQR_ListaCodigos(proyectoID, pruebaID, especificacion, codigo).ToList();

                    foreach (Sam3_Cat_PQR_ListaCodigos_Result item in listaCodigo)
                    {
                        listaCodigoResult.Add(new ListaCodigos
                        {
                            Codigo = item.Codigo,
                            CodigoAsmeID = item.CodigoAsmeID,
                            Especificacion = item.Especificacion,
                            TipoPruebaId = item.TipoPruebaId
                        });
                    }

                    return listaCodigoResult;
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

        public object AgregarPQR(DataTable dtDetallePQR, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() } };
                    _SQL.Ejecuta(Stords.GUARDAPQR, dtDetallePQR, "@Tabla", parametro);

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
        //public int ProcesoSoldaduraID { get; private set; }
        //public int NumeroPID { get; private set; }
        //public int GrupoPID { get; private set; }
        //public int AporteID { get; private set; }
        //public int MezclaID { get; private set; }
        //public int RespaldoID { get; private set; }
        //public int GrupoFID { get; private set; }

        //public object ObtenerPQR(int TipoDato)
        //{

        //    using (SamContext ctx = new SamContext())
        //    {

        //        List<PQR> data = (from pqr in ctx.Sam3_Soldadura_PQR(TipoDato, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
        //                          select new PQR
        //                          {
        //                              PQRID = Convert.ToString(pqr.PQRID),
        //                              Nombre = pqr.Nombre,
        //                              PREHEAT = pqr.PREHEAT,
        //                              PWHT = pqr.PWHT,
        //                              EspesorRelleno = Convert.ToString(pqr.EspesorRelleno),
        //                              EspesorRaiz = Convert.ToString(pqr.EspesorRaiz),
        //                              CodigoRelleno = pqr.CodigoRelleno,
        //                              CodigoRaiz = pqr.CodigoRaiz,
        //                              NumeroP = pqr.NumeroP,
        //                              GrupoP = pqr.GrupoP,
        //                              Aporte = pqr.Aporte,
        //                              Mezcla = pqr.Mezcla,
        //                              Respaldo = pqr.Respaldo,
        //                              GrupoF = pqr.GrupoF,
        //                              Codigo = pqr.Codigo,
        //                              ProcesoSoldaduraRellenoID = pqr.ProcesoSoldaduraRellenoID,
        //                              ProcesoSoldaduraRaizID = Convert.ToInt32(pqr.ProcesoSoldaduraRaizID),
        //                              NumeroPID = Convert.ToInt32(pqr.NumeroPID),
        //                              GrupoPID = Convert.ToInt32(pqr.GrupoPID),
        //                              AporteID = Convert.ToInt32(pqr.AporteID),
        //                              MezclaID = Convert.ToInt32(pqr.MezclaID),
        //                              RespaldoID = Convert.ToInt32(pqr.RespaldoID),
        //                              GrupoFID = Convert.ToInt32(pqr.GrupoFID),
        //                              CodigoID = Convert.ToInt32(pqr.CodigoID)
        //                          }).AsParallel().ToList();
        //        return data;
        //    }
        //}

        //public object ObtenerNumeroP(int TipoDato)
        //{
        //    using (SamContext ctx = new SamContext())
        //    {
        //        List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_NumeroP(TipoDato, null, null, null, null)
        //                          select new PQR
        //                          {
        //                              NumeroPID = pqr.NumeroPID,
        //                              NumeroP = pqr.NumeroP
        //                          }).AsParallel().ToList();
        //        return data;
        //    }
        //}


        //public object ObtenerProcesoSoldadura(int TipoDato)
        //{
        //    using (SamContext ctx = new SamContext())
        //    {
        //        List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_ProcesoSoldadura(TipoDato)
        //                          select new PQR
        //                          {
        //                              ProcesoSoldaduraRellenoID = pqr.ProcesoSoldaduraID,
        //                              CodigoRelleno = pqr.Codigo,
        //                          }).AsParallel().ToList();
        //        return data;
        //    }
        //}

        //public object ObtenerGrupoP(int TipoDato)
        //{
        //    using (SamContext ctx = new SamContext())
        //    {
        //        List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_GrupoP(TipoDato, null, null, null)
        //                          select new PQR
        //                          {
        //                              GrupoP = pqr.GrupoP,
        //                              GrupoPID = pqr.GrupoPID

        //                          }).AsParallel().ToList();
        //        return data;
        //    }
        //}


        //public object ObtenerAporte(int TipoDato)
        //{

        //    using (SamContext ctx = new SamContext())
        //    {

        //        List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_Aporte(TipoDato, null, null, null)
        //                          select new PQR
        //                          {
        //                              Aporte = pqr.Aporte,
        //                              AporteID = pqr.AporteID

        //                          }).AsParallel().ToList();
        //        return data;
        //    }




        //}

        //public object ObtenerMezcla(int TipoDato)
        //{

        //    using (SamContext ctx = new SamContext())
        //    {

        //        List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_Mezcla(TipoDato, null, null, null)
        //                          select new PQR
        //                          {
        //                              MezclaID = pqr.MezclaID,
        //                              Mezcla = pqr.Mezcla

        //                          }).AsParallel().ToList();
        //        return data;
        //    }




        //}

        //public object ObtenerRespaldo(int TipoDato)
        //{

        //    using (SamContext ctx = new SamContext())
        //    {

        //        List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_Respaldo(TipoDato, null, null, null)
        //                          select new PQR
        //                          {
        //                              RespaldoID = pqr.RespaldoID,
        //                              Respaldo = pqr.Respaldo

        //                          }).AsParallel().ToList();
        //        return data;
        //    }




        //}

        //public object ObtenerGrupoF(int TipoDato)
        //{

        //    using (SamContext ctx = new SamContext())
        //    {

        //        List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_GrupoF(TipoDato, null, null, null)
        //                          select new PQR
        //                          {
        //                              GrupoFID = pqr.GrupoFID,
        //                              GrupoF = pqr.GrupoF

        //                          }).AsParallel().ToList();
        //        return data;
        //    }




        //}

        //public object ObtenerCodigo(int TipoDato)
        //{

        //    using (SamContext ctx = new SamContext())
        //    {

        //        List<PQR> data = (from pqr in ctx.Sam3_Cat_PQR_Codigo(TipoDato, null, null, null)
        //                          select new PQR
        //                          {
        //                              CodigoID = pqr.CodigoID,
        //                              Codigo = pqr.Codigo

        //                          }).AsParallel().ToList();
        //        return data;
        //    }




        //}

        //public object EliminaPQR(int TipoDeDato, int PQRID, int IdUsuario)
        //{

        //    using (SamContext ctx = new SamContext())
        //    {
        //        var lista = ctx.Sam3_Soldadura_PQR(TipoDeDato, PQRID, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, IdUsuario);
        //        return lista;

        //    }




        //}

        //public object ActualizaPQR(Sam3_PQR pqr, Sam3_Usuario usuario)
        //{

        //    try
        //    {
        //        using (SamContext ctx = new SamContext())
        //        {

        //            ctx.Sam3_Soldadura_PQR(3, pqr.PQRID, pqr.Nombre, pqr.PREHEAT, pqr.PWHT, pqr.EspesorRaiz, pqr.EspesorRelleno, pqr.ProcesoSoldaduraRellenoID, pqr.ProcesoSoldaduraRaizID, pqr.NumeroP, pqr.GrupoPID,0, pqr.Aporte, pqr.Mezcla, pqr.Respaldo, pqr.GrupoF, pqr.Codigo, usuario.UsuarioID);
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add("OK");
        //            result.ReturnCode = 200;
        //            result.ReturnStatus = true;
        //            result.IsAuthenicated = true;

        //            return result;
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        TransactionalInformation lista = new TransactionalInformation();
        //        lista.ReturnMessage.Add(ex.Message);
        //        lista.ReturnCode = 500;
        //        lista.ReturnStatus = false;
        //        lista.IsAuthenicated = true;

        //        return lista;
        //    }

        //}

        //public object AgregarPQR(Sam3_PQR Addpqr, Sam3_Usuario usuario)
        //{

        //    try
        //    {
        //        using (SamContext ctx = new SamContext())
        //        {

        //            ctx.Sam3_Soldadura_PQR(2, null, Addpqr.Nombre, Addpqr.PREHEAT, Addpqr.PWHT, Addpqr.EspesorRaiz, Addpqr.EspesorRelleno, Addpqr.ProcesoSoldaduraRellenoID, Addpqr.ProcesoSoldaduraRaizID, Addpqr.NumeroP, Addpqr.GrupoPID, 0, Addpqr.Aporte, Addpqr.Mezcla, Addpqr.Respaldo, Addpqr.GrupoF, Addpqr.Codigo, usuario.UsuarioID);
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add("OK");
        //            result.ReturnCode = 200;
        //            result.ReturnStatus = true;
        //            result.IsAuthenicated = true;

        //            return result;

        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        TransactionalInformation lista = new TransactionalInformation();
        //        lista.ReturnMessage.Add(ex.Message);
        //        lista.ReturnCode = 500;
        //        lista.ReturnStatus = false;
        //        lista.IsAuthenicated = true;

        //        return lista;
        //    }




        //}

        //public object ValidarExistePQR(int PQRID, string nombre)
        //{

        //    try
        //    {
        //        using (SamContext ctx = new SamContext())
        //        {
        //            ObjectParameter op = new ObjectParameter("Retorna", typeof(string));
        //            op.Value = null;
        //            var oMyString = new ObjectParameter("Retorna", typeof(string));
        //            var res = ctx.Sam3_Soldadura_PQR_Existe(nombre, oMyString, PQRID);
        //            var data = oMyString.Value.ToString();
        //            TransactionalInformation result = new TransactionalInformation();
        //            if (data.Equals("ok"))
        //            {
        //                result.ReturnMessage.Add("OK");
        //            }
        //            else
        //            {
        //                result.ReturnMessage.Add("Error");
        //            }

        //            result.ReturnCode = 200;
        //            result.ReturnStatus = true;
        //            result.IsAuthenicated = true;

        //            return result;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation lista = new TransactionalInformation();
        //        lista.ReturnMessage.Add(ex.Message);
        //        lista.ReturnCode = 500;
        //        lista.ReturnStatus = false;
        //        lista.IsAuthenicated = true;

        //        return lista;
        //    }

        //}

        //public object ObtenerEspesores(int TipoDato, int PQRIDABuscar)
        //{

        //    using (SamContext ctx = new SamContext())
        //    {

        //        List<PQR> data = (from pqr in ctx.Sam3_Soldadura_PQR(TipoDato, PQRIDABuscar, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
        //                          select new PQR
        //                          {
        //                              PQRID = Convert.ToString(pqr.PQRID),
        //                              EspesorRaiz = Convert.ToString(pqr.EspesorRaiz),
        //                              EspesorRelleno = Convert.ToString(pqr.EspesorRelleno),
        //                              GrupoPID = Convert.ToInt32(pqr.GrupoPID),
        //                              PWHT = pqr.PWHT,
        //                              CodigoRaiz = pqr.CodigoRaiz,
        //                              CodigoRelleno = pqr.CodigoRelleno



        //                          }).AsParallel().ToList();
        //        return data;
        //    }




        //}

    }

}
