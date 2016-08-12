using BackEndSAM.Models.GenerarRequisicion;
using BackEndSAM.Models.ServiciosTecnicos.AsignarRequisicion;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace BackEndSAM.DataAcces.ServiciosTecnicosBD.AsignarRequisicionBD
{
    public class AsignarRequisicionBD
    {
        private static readonly object _mutex = new object();
        private static AsignarRequisicionBD _instance;
        public object ObtenerListaProveedores(string lenguaje, int idPrueba, int ConsultaDetalle)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_Proveedores_Result> result = ctx.Sam3_ServiciosTecnicos_Get_Proveedores(lenguaje, idPrueba).ToList();

                    List<Proveedor> ListadoProveedores = new List<Proveedor>();
                    ListadoProveedores.Add(new Proveedor());
                    if (ConsultaDetalle == 1)
                    {
                        foreach (Sam3_ServiciosTecnicos_Get_Proveedores_Result item in result)
                        {
                            ListadoProveedores.Add(new Proveedor
                            {
                                ProveedorID = item.ProveedorID,
                                Nombre = item.Nombre,
                                Capacidad = item.Capacidad,
                                
                                ListaHerramientaPrueba = (List<HerramientaPrueba>)ObtenerListaHerramientaPruebas(lenguaje, idPrueba, item.ProveedorID),
                                ListaTurnoLaboral = (List<TurnoLaboral>)ObtenerListaTurnoLaboral(lenguaje,item.ProveedorID)
                            });
                        }
                    }
                    else if (ConsultaDetalle == 0)
                    {
                        foreach (Sam3_ServiciosTecnicos_Get_Proveedores_Result item in result)
                        {
                            ListadoProveedores.Add(new Proveedor
                            {
                                ProveedorID = item.ProveedorID,
                                Nombre = item.Nombre,
                                Capacidad = item.Capacidad,
                            });
                        }
                    }

                    return ListadoProveedores;
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
        public static AsignarRequisicionBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new AsignarRequisicionBD();
                    }
                }
                return _instance;
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
                    foreach (Sam3_SteelGo_Get_Proyectos_Result item in result)
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

        public object ObtenerRequisicionAsignacion(string lenguaje, int tipoVista, int idPrueba, int proyectoID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_RequisicionAsignacion_Result> result = ctx.Sam3_ServiciosTecnicos_Get_RequisicionAsignacion(lenguaje, tipoVista,idPrueba,proyectoID).ToList();
                    List<RequisicionAsignacion> ListadoRequisicionAsignacion = new List<RequisicionAsignacion>();



                    foreach (Sam3_ServiciosTecnicos_Get_RequisicionAsignacion_Result item in result)
                    {
                        ListadoRequisicionAsignacion.Add(new RequisicionAsignacion
                        {
                            Accion = item.RequisicionAsignacionID == 0 ? 1 : 2,
                            RequisicionAsignacionID = item.RequisicionAsignacionID,
                            Nombre = item.Nombre,
                            Clave = item.Clave,
                            Observacion = item.Observacion,
                            Fecha = item.Fecha,
                            CantidadJuntas = item.CantidadJuntas,
                            Capacidad = item.Capacidad == 0 ? "" : item.Capacidad.ToString(),
                            JuntasAsignadas = item.JuntasAsignadas.GetValueOrDefault() == 0 ? "" : item.JuntasAsignadas.GetValueOrDefault().ToString(),
                            ProveedorID = item.ProveedorID.GetValueOrDefault(),
                            Proveedor = item.Proveedor == null ? "" : item.Proveedor,
                            RequisicionID = item.RequisicionID,
                            Requisicion = item.Requisicion,
                            ProyectoID = item.ProyectoID.GetValueOrDefault(),
                            ListaProveedor = (List<Proveedor>)ObtenerListaProveedores(lenguaje, item.TipoPruebaID.GetValueOrDefault(), 1),
                            HerramientadePrueba = item.HerramientadePrueba,
                            HerramientadePruebaID = item.HerramientaDePruebaID.GetValueOrDefault(),
                            TurnoLaboral = item.TurnoLaboral,
                            TurnoLaboralID = item.TurnoLaboralID.GetValueOrDefault(),
                            ListaHerramientaPrueba = (List<HerramientaPrueba>)ObtenerListaHerramientaPruebas(lenguaje, item.TipoPruebaID.GetValueOrDefault(), item.ProveedorID.GetValueOrDefault()),
                            ListaHerramientaPruebaProveedorPrueba = (List<HerramientaPrueba>)ObtenerListaHerramientaPruebas(lenguaje, item.TipoPruebaID.GetValueOrDefault(), item.ProveedorID.GetValueOrDefault()),
                            ListaTurnoLaboral =  (List<TurnoLaboral>)ObtenerListaTurnoLaboral(lenguaje, item.ProveedorID.GetValueOrDefault()),
                            ListaTurnoLaboralTotal = (List<TurnoLaboral>)ObtenerListaTurnoLaboral(lenguaje, 0),
                            ListadoDetalleJuntasRequisicion = (List<JsonRequisicion>)getDetalleJuntas(item.ProyectoID.GetValueOrDefault(),1,item.RequisicionID,lenguaje)
                        });
                    }

                    return ListadoRequisicionAsignacion;
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
        public object ObtenerListaHerramientaPruebas(string lenguaje, int idPrueba, int idProveedor)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_SteelGo_Get_HerramientasDePrueba_Result> result = ctx.Sam3_SteelGo_Get_HerramientasDePrueba(lenguaje, idPrueba).ToList();

                    List<HerramientaPrueba> ListadoHerramientaPrueba = new List<HerramientaPrueba>();
                    ListadoHerramientaPrueba.Add(new HerramientaPrueba());
                    foreach (Sam3_SteelGo_Get_HerramientasDePrueba_Result item in result)
                    {
                        ListadoHerramientaPrueba.Add(new HerramientaPrueba
                        {
                            DescHerramientaPrueba = item.DescHerramientaPrueba,
                            HerramientadePruebaID = item.HerramientaDePruebaID,
                            Modelo = item.Modelo,
                            HerramientadePrueba = item.Nombre
                        });
                    }

                    return ListadoHerramientaPrueba;
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
        public object ObtenerListaTurnoLaboral(string lenguaje, int ProveedorID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ServiciosTecnicos_Get_TurnoLaboral_Result> result = ctx.Sam3_ServiciosTecnicos_Get_TurnoLaboral(lenguaje,ProveedorID).ToList();

                    List<TurnoLaboral> ListadoTurnoLaboral = new List<TurnoLaboral>();
                    if(ProveedorID != 0)
                    {
                        ListadoTurnoLaboral.Add(new TurnoLaboral());
                    }

                    foreach (Sam3_ServiciosTecnicos_Get_TurnoLaboral_Result item in result)
                    {
                        ListadoTurnoLaboral.Add(new TurnoLaboral
                        {
                            Turno = item.Turno,
                            TurnoLaboralID = item.TurnoLaboralID,
                            ProveedorID = item.ProveedorID,
                            Capacidad = item.Capacidad.GetValueOrDefault(),
                            JuntasAsignadas = item.JuntasAsignadas
                        });
                    }
                    return ListadoTurnoLaboral;
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

        public List<Sam3_ServiciosTecnicos_Get_DetalleJuntasXRequisicion_Result> getDetalleJuntasRequisicion( int reqID, string lenguaje)
        {
            List<Sam3_ServiciosTecnicos_Get_DetalleJuntasXRequisicion_Result> listaResult = null;
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    listaResult = ctx.Sam3_ServiciosTecnicos_Get_DetalleJuntasXRequisicion( reqID,lenguaje).ToList();
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

        public object getDetalleJuntas(int proyectoID, int todos, int requisicionID, string lenguaje)
        {
            List<Sam3_ServiciosTecnicos_Get_DetalleJuntasXRequisicion_Result> listaResult = null;
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    listaResult = ctx.Sam3_ServiciosTecnicos_Get_DetalleJuntasXRequisicion(requisicionID,lenguaje).ToList();
                    List<JsonRequisicion> listaJson = new List<JsonRequisicion>();
                    List<Sam3_ServiciosTecnicos_Get_DetalleJuntasXRequisicion_Result> lista = AsignarRequisicionBD.Instance.getDetalleJuntasRequisicion(requisicionID, lenguaje);
                    foreach (Sam3_ServiciosTecnicos_Get_DetalleJuntasXRequisicion_Result item in lista)
                    {
                        JsonRequisicion elemento;
                        try
                        {
                            elemento = new JsonRequisicion
                            {
                                Accion = 1,
                                Agregar = false,
                                Clasificacion = item.ClasificacionPND,
                                Cuadrante = item.Cuadrante,
                                EtiquetaJunta = item.Etiqueta,
                                JuntaTrabajoID = item.JuntaTrabajoID,
                                Folio = item.Folio,
                                NumeroControl = item.NumeroControl,
                                SpoolID = item.SpoolID,
                                Cedula = item.Cedula,
                                Diametro = item.Diametro,
                                Espesor = item.Espesor.GetValueOrDefault(),
                                TipoJunta = item.TipoJunta,
                                Prioridad = item.Prioridad.GetValueOrDefault(),
                                Proyecto = item.Proyecto,
                                ProyectoID = item.ProyectoID,
                                PruebasID = item.TipoPruebaID,
                                NombrePrueba = item.NombrePrueba
                            };
                        }
                        catch (Exception ex)
                        {
                            throw;
                        }
                        listaJson.Add(elemento);
                    }
                    return listaJson;
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

        public object InsertarCaptura(DataTable dtDetalleCaptura, Sam3_Usuario usuario, string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje } };
                    _SQL.Ejecuta(Stords.GUARDARCAPTURAREQUISICIONASIGNACION, dtDetalleCaptura, "@AsignarRequisicion", parametro);
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
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