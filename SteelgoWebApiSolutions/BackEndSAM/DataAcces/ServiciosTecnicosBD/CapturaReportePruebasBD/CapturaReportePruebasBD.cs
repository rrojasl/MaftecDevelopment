﻿using BackEndSAM.Models.ServiciosTecnicos.CapturaReportePruebas;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.ServiciosTecnicosBD.CapturaReportePruebasBD
{
    public class CapturaReportePruebasBD
    {
        private static readonly object _mutex = new object();
        private static CapturaReportePruebasBD _instance;


        public static CapturaReportePruebasBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CapturaReportePruebasBD();
                    }
                }
                return _instance;
            }
        }


        public object getRequisicionDetalle(string lenguaje, int requisicionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result> result = ctx.Sam3_ServiciosTecnicos_Get_RequisicionDetalle(requisicionID,lenguaje).ToList();
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

        public object getRequisicionesXProveedor(string lenguaje, int proveedorID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Requisicion> listadoRequisiciones = new List<Requisicion>();
                    listadoRequisiciones.Add(new Requisicion());
                    List<Sam3_ServiciosTecnicos_Get_RequisicionesAsignadasProveedor_Result> result = ctx.Sam3_ServiciosTecnicos_Get_RequisicionesAsignadasProveedor(lenguaje,proveedorID).ToList();
                    foreach (Sam3_ServiciosTecnicos_Get_RequisicionesAsignadasProveedor_Result item in result)
                    {
                        listadoRequisiciones.Add(new Requisicion
                        { 
                            Folio = item.Folio,
                            RequisicionID = item.RequisicionID
                        });
                    }
                    return listadoRequisiciones;
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


        public object getProveedorXUsuario(int usuarioID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Proveedor> ListaProveedor = new List<Proveedor>();
                    ListaProveedor.Add(new Proveedor());
                    List<Sam3_Steelgo_Get_ProveedoresXUsuario_Result> result = ctx.Sam3_Steelgo_Get_ProveedoresXUsuario(lenguaje,usuarioID).ToList();
                    foreach (Sam3_Steelgo_Get_ProveedoresXUsuario_Result item  in result)
                    {
                        ListaProveedor.Add(new Proveedor {
                            Nombre = item.Nombre,
                            ProveedorID = item.ProveedorID
                        });
                    }
                    return ListaProveedor;
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

        public object getReportePruebasDetalle(int requisicionID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_ReportePruebasDetalle_Result> result = ctx.Sam3_ServiciosTecnicos_Get_ReportePruebasDetalle(requisicionID).ToList();
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

        public object getPruebasDefectosDetalle(int requisicionPruebaElementoID, string lenguaje, int requisicionID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int tipoPrueba = 0;
                    List<Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result> listaTipoPrueba = (List<Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result>)getListadoTipoPrueba(requisicionID, lenguaje);

                    foreach (Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result item in listaTipoPrueba)
                    {
                        tipoPrueba = item.TipoPruebaID;
                    }
                    List<DetallePruebas> lista = new List<DetallePruebas>();
                    List<Sam3_ServiciosTecnicos_Get_PruebasResultadoDetalle_Result> result = ctx.Sam3_ServiciosTecnicos_Get_PruebasResultadoDetalle(requisicionPruebaElementoID,lenguaje).ToList();

                    List<Defectos> listaDefectos= (List<Defectos>)getListadoDefectos(lenguaje, tipoPrueba);
                    if (result.Count > 0)
                    {
                        foreach (Sam3_ServiciosTecnicos_Get_PruebasResultadoDetalle_Result item in result)
                        {
                            DetallePruebas elemento = new DetallePruebas
                            {
                                Accion = 2,
                                PruebaElementoResultadoID = item.CapturaReportePlacaID,
                                Ubicacion = item.Ubicacion,
                                Resultado = item.Resultado == true ? 1 : 0,
                                Nombre = item.Nombre,
                                RequisicionPruebaElementoID = item.CapturaReporteRequisicionID,
                                ListaDetalleDefectos = (List<DetalleDefectos>)getListaDetalleDefectos(item.CapturaReportePlacaID, lenguaje),
                                ListaDefectos = listaDefectos
                            };
                            lista.Add(elemento);
                        }
                    }
                    else
                    {
                        DetallePruebas elemento = new DetallePruebas
                        {
                            Accion = 1,
                            PruebaElementoResultadoID = 0,
                            Ubicacion = "",
                            Resultado = 0,
                            Nombre = "",
                            RequisicionPruebaElementoID = 0,
                           
                            ListaDefectos = listaDefectos
                        };
                        lista.Add(elemento);
                    }
                    return lista;
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

        public object getListaDetalleDefectos(int PruebaElementoResultadoID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<DetalleDefectos> lista = new List<DetalleDefectos>();
                    List<Sam3_ServiciosTecnicos_Get_DefectosEditarValidacionResultados_Result> result = ctx.Sam3_ServiciosTecnicos_Get_DefectosEditarValidacionResultados(PruebaElementoResultadoID).ToList();
                    foreach(Sam3_ServiciosTecnicos_Get_DefectosEditarValidacionResultados_Result item in result)
                    {
                        DetalleDefectos elemento = new DetalleDefectos
                        {
                            PruebaElementoDefectoID = item.CapturaReportePlacaID,
                            Accion = 2,
                            DefectoID = item.DefectoID,
                            Nombre = item.Nombre,
                            InicioDefecto = item.Inicio,
                            FinDefecto = item.Fin
                        };
                        lista.Add(elemento);
                    }
                    return lista;
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

        public object getListadoDefectos(string lenguaje, int tipoPrueba)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServTec_Get_DefectosTipoPrueba_Result> result = ctx.Sam3_ServTec_Get_DefectosTipoPrueba(lenguaje, tipoPrueba).ToList();
                    List<Defectos> lista = new List<Defectos>();
                    foreach (Sam3_ServTec_Get_DefectosTipoPrueba_Result item in result)
                    {
                        Defectos objeto = new Defectos
                        {
                            DefectoID = item.DefectoID,
                            Nombre = item.Nombre
                        };
                        lista.Add(objeto);
                    }
                    return lista;
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
        public object getListadoTipoPrueba(int requisicionID, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_RequisicionDetalle_Result> result = ctx.Sam3_ServiciosTecnicos_Get_RequisicionDetalle(requisicionID, lenguaje).ToList();
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

        public object InsertarCaptura(DataTable dtDetalleCaptura,DataTable dtDefectos, Sam3_Usuario usuario, string lenguaje,int reqID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    //ctx.Sam3_Armado_JuntaArmado()
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje }, { "@requisicionID", reqID.ToString() } };
                    _SQL.Ejecuta(Stords.GUARDACAPTURAREPORTEPRUEBAS, dtDetalleCaptura, "@TablaReportePruebas", dtDefectos, "@Tabla", parametro);

                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnMessage.Add("xd");
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