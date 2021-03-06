﻿using BackEndSAM.Models.GenerarRequisicion;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Linq;

namespace BackEndSAM.DataAcces
{
    public class GenerarRequisicionBD
    {
        private static readonly object _mutex = new object();
        private static GenerarRequisicionBD _instance;


        public static GenerarRequisicionBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new GenerarRequisicionBD();
                    }
                }
                return _instance;
            }
        }

        public object getRequisicion(string lenguaje, int requisicionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_Requisicion_Result> result = ctx.Sam3_ServiciosTecnicos_Get_Requisicion(lenguaje,requisicionID).ToList();
                    return result;
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

        public object getNuevaJunta(int juntaTrabajoID, int proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_JuntasXPruebaNuevo_Result> result = ctx.Sam3_ServiciosTecnicos_Get_JuntasXPruebaNuevo(juntaTrabajoID, proyectoID).ToList();
                    return result;
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

        public object getPruebaProyectoID(int pruebaID, int requisicionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjectResult<int?> result = ctx.Sam3_Steelgo_Get_PruebaProyectoID(pruebaID, requisicionID);
                    int ret = int.Parse( result.FirstOrDefault().Value.ToString());
                    return ret;
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

        public object getListaTipoPrueba(string lenguaje, int proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_SteelGo_Get_Pruebas_Result> result = ctx.Sam3_SteelGo_Get_Pruebas(proyectoID, lenguaje).ToList();
                    return result;
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

        public object getListaProyectos()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Proyecto> listaProyectos = new List<Proyecto>();
                    listaProyectos.Add(new Proyecto());
                    List<Sam3_SteelGo_Get_Proyectos_Result> result = ctx.Sam3_SteelGo_Get_Proyectos().ToList();
                    foreach(Sam3_SteelGo_Get_Proyectos_Result item in result)
                    {
                        listaProyectos.Add(new Proyecto
                        {
                            Nombre = item.Nombre,
                            ProyectoID = item.ProyectoID
                        });
                    }
                    return listaProyectos.OrderBy(x => x.Nombre).ToList<Proyecto>();
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

        public object getListaRequisiciones(string lenguaje, int ProyectoID, int PruebaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Captura> listaRequisiciones = new List<Captura>();
                    listaRequisiciones.Add(new Captura());
                    List<Sam3_ServiciosTecnicos_Get_Requisiciones_Result> result = ctx.Sam3_ServiciosTecnicos_Get_Requisiciones(lenguaje, ProyectoID, PruebaID).ToList();
                    foreach (Sam3_ServiciosTecnicos_Get_Requisiciones_Result item in result)
                    {
                        listaRequisiciones.Add(new Captura
                        {
                            Folio = item.Folio,
                            Observacion = item.Observacion,
                            PruebasID = item.PruebasProyectoID.GetValueOrDefault(),
                            RequisicionID = item.RequisicionID
                        });
                    }
                    return listaRequisiciones.OrderBy(x => x.Folio).ToList<Captura>();
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

        public object getJuntaApta(int todos, int ordenTrabajoSpoolID, int proceso)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_JuntaSpool_Result> result = ctx.Sam3_Steelgo_Get_JuntaSpool(todos,ordenTrabajoSpoolID,proceso).ToList();
                    return result;
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

        public List<Sam3_ServiciosTecnicos_Get_JuntasXPrueba_Result> getDetalleJuntas(int proyectoID, int pruebaID, int RequisicionID, int todos, string lenguaje)
        {
            List<Sam3_ServiciosTecnicos_Get_JuntasXPrueba_Result> listaResult = null;
            try
            {
                using (SamContext ctx = new SamContext())
                {
                     listaResult = ctx.Sam3_ServiciosTecnicos_Get_JuntasXPrueba(proyectoID, pruebaID, RequisicionID, todos, lenguaje).ToList();
                    return listaResult;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;
                return listaResult;
            }
        }

        public List<Sam3_Cat_PQR_ListaCodigos_Result> getListaCodigos(int proyectoID, int pruebaID, string especificacion, string codigo)
        {
            List<Sam3_Cat_PQR_ListaCodigos_Result> listaResult = null;
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    listaResult = ctx.Sam3_Cat_PQR_ListaCodigos(proyectoID, pruebaID, especificacion, codigo).ToList();
                    return listaResult;
                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;
                return listaResult;
            }
        }

        public object getListaClasificaciones(int pruebaProyectoID, string lenguaje)
            {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Calsificaciones_Result> listaResult = ctx.Sam3_Steelgo_Get_Calsificaciones(pruebaProyectoID, lenguaje).ToList();
                    return listaResult;
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

        public object ObtenerValorFecha(Sam3_Usuario usuario, string lenguaje, int idCampoPredeterminado)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    var oMyString = new ObjectParameter("Retorna", typeof(string));
                    var result = ctx.Sam3_Steelgo_Get_CampoPredeterminado(idCampoPredeterminado, lenguaje, oMyString);
                    var data = oMyString.Value.ToString();

                    //ObjectParameter objectParameter = new ObjectParameter("Retorna", typeof(String));


                    return data;
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

        public object InsertarGenerarRequisicion(DataTable dtDetalleRequisicion, Sam3_Usuario usuario, string lenguaje, int requisicionID, int proyectoID, int pruebasID, string observacion, int codigoAsmeID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    //ctx.Sam3_Armado_JuntaArmado()
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje }, { "@RequisicionID",requisicionID.ToString() }, { "@ProyectoID", proyectoID.ToString() }, { "@PruebaID", pruebasID.ToString() }, { "@Observacion", observacion==null?"": observacion }, { "@CodigoAsmeID",codigoAsmeID.ToString() } };
                    DataTable dt = _SQL.Tabla(Stords.GUARDARGENERARREQUISICICION, dtDetalleRequisicion, "@Tabla", parametro);

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok"+"|"+dt.Rows[0][0].ToString());
                    result.ReturnCode = 200;
                    result.ReturnStatus = true;
                    result.IsAuthenicated = true;

                    return result;
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

    }
}