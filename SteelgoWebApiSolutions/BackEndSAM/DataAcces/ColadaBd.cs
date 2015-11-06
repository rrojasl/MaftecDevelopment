﻿using BackEndSAM.Models;
using DatabaseManager.Sam2;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces
{
    /// <summary>
    /// Entidad colada
    /// </summary>
    public class ColadaBd
    {
        private static readonly object _mutex = new object();
        private static ColadaBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ColadaBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ColadaBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ColadaBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Genera un nuevo registro de colada
        /// en Sam3, SAm 2 y equivalencia Colada
        /// </summary>
        /// <param name="DatosColada">datos capturados en el modal</param>
        /// <param name="usuario">usuario registrado</param>
        /// <returns>status exito o error</returns>
        public object GuardarColadaPopUp(ColadaJson DatosColada, Sam3_Usuario usuario)
        {
            try
            {
                string error = "";
                TransactionalInformation result = new TransactionalInformation();

                using (SamContext ctx = new SamContext())
                {
                    using (var sam3_tran = ctx.Database.BeginTransaction())
                    {
                        using (Sam2Context ctx2 = new Sam2Context())
                        {
                            using (var sam2_tran = ctx2.Database.BeginTransaction())
                            {
                                if (!ctx.Sam3_Colada.Where(c => c.NumeroColada == DatosColada.NumeroColada 
                                        && c.ProyectoID == DatosColada.ProyectoID 
                                        && c.Activo).AsParallel().Any())
                                {
                                    Colada Sam2Colada = new Colada();
                                    Sam2Colada.FabricanteID = (from eq in ctx.Sam3_EquivalenciaFabricante
                                                               where eq.Activo
                                                               && eq.Sam3_FabricanteID == DatosColada.FabricanteID
                                                               select eq.Sam2_FabricanteID).AsParallel().SingleOrDefault(); 
                                    Sam2Colada.AceroID = (from eq in ctx.Sam3_EquivalenciaAcero
                                                          where eq.Activo
                                                          && eq.Sam3_AceroID ==  DatosColada.AceroID
                                                          select eq.Sam2_AceroID).AsParallel().SingleOrDefault();
                                    Sam2Colada.ProyectoID = (from eq in ctx.Sam3_EquivalenciaProyecto
                                                             where eq.Activo
                                                             && eq.Sam3_ProyectoID == DatosColada.ProyectoID
                                                             select eq.Sam2_ProyectoID).AsParallel().SingleOrDefault(); 
                                    Sam2Colada.NumeroColada = DatosColada.NumeroColada;
                                    Sam2Colada.NumeroCertificado = DatosColada.NumeroCertificado;
                                    Sam2Colada.HoldCalidad = DatosColada.HoldCalidad;
                                    Sam2Colada.FechaModificacion = DateTime.Now;

                                    ctx2.Colada.Add(Sam2Colada);
                                    ctx2.SaveChanges();

                                    
                                        
                                    Sam3_Colada colada = new Sam3_Colada();
                                    colada.FabricanteID = DatosColada.FabricanteID;
                                    colada.AceroID = DatosColada.AceroID;
                                    colada.ProyectoID = DatosColada.ProyectoID;
                                    colada.NumeroColada = DatosColada.NumeroColada;
                                    colada.NumeroCertificado = DatosColada.NumeroCertificado;
                                    colada.HoldCalidad = DatosColada.HoldCalidad;
                                    colada.Activo = true;
                                    colada.UsuarioModificacion = usuario.UsuarioID;
                                    colada.FechaModificacion = DateTime.Now;

                                    ctx.Sam3_Colada.Add(colada);
                                    ctx.SaveChanges();

                                    Sam3_EquivalenciaColada equi = new Sam3_EquivalenciaColada();
                                    equi.Sam2_ColadaID = Sam2Colada.ColadaID;
                                    equi.Sam3_ColadaID = colada.ColadaID;
                                    equi.Activo = true;
                                    equi.FechaModificacion = DateTime.Now;
                                    equi.UsuarioModificacion = usuario.UsuarioID;

                                    ctx.Sam3_EquivalenciaColada.Add(equi);
                                    ctx.SaveChanges();

                                    sam2_tran.Commit();

                                    if (DatosColada.ItemCodeID != null && DatosColada.ItemCodeID > 0)
                                    {
                                        Sam3_Rel_Itemcode_Colada nuevaRel = new Sam3_Rel_Itemcode_Colada();
                                        nuevaRel.Activo = true;
                                        nuevaRel.ColadaID = colada.ColadaID;
                                        nuevaRel.FechaModificacion = DateTime.Now;
                                        nuevaRel.ItemCodeID = DatosColada.ItemCodeID;
                                        nuevaRel.UsuarioModificacion = usuario.UsuarioID;

                                        ctx.Sam3_Rel_Itemcode_Colada.Add(nuevaRel);
                                        ctx.SaveChanges();
                                    }

                                    result.ReturnMessage.Add(colada.ColadaID.ToString());
                                    result.ReturnMessage.Add("Ok");
                                    result.ReturnCode = 200;
                                    result.ReturnStatus = true;
                                    result.IsAuthenicated = true;
                                }
                                else
                                {
                                    error += "Lo numero de colada ya existe.";
                                    Sam3_Colada registroBd = ctx.Sam3_Colada.Where(c => c.NumeroColada == DatosColada.NumeroColada 
                                        && c.ProyectoID == DatosColada.ProyectoID 
                                        && c.Activo).AsParallel().SingleOrDefault();

                                    if (DatosColada.ItemCodeID != null && DatosColada.ItemCodeID > 0 )
                                    {
                                        string codigo = (from it in ctx.Sam3_ItemCode
                                                             where it.ItemCodeID == DatosColada.ItemCodeID
                                                             select it.Codigo).AsParallel().SingleOrDefault();

                                        if (!ctx.Sam3_Rel_Itemcode_Colada.Where(x => x.ColadaID == registroBd.ColadaID
                                                && x.ItemCodeID == DatosColada.ItemCodeID).Any())
                                        {
                                            Sam3_Rel_Itemcode_Colada nuevaRel = new Sam3_Rel_Itemcode_Colada();
                                            nuevaRel.Activo = true;
                                            nuevaRel.ColadaID = registroBd.ColadaID;
                                            nuevaRel.FechaModificacion = DateTime.Now;
                                            nuevaRel.ItemCodeID = DatosColada.ItemCodeID;
                                            nuevaRel.UsuarioModificacion = usuario.UsuarioID;

                                            ctx.Sam3_Rel_Itemcode_Colada.Add(nuevaRel);
                                            ctx.SaveChanges();

                                            

                                            error += string.Format(" Se genero la relacion entre la colada No. {0} y el ItemCode {1}", registroBd.NumeroColada, codigo);
                                        }
                                        else
                                        {
                                            error += string.Format(" Ya existe la relacion entre la colada No. {0} y el ItemCode {1}", registroBd.NumeroColada, codigo);
                                        }
                                    }
                                    else
                                    {
                                        error += "El parametro ItemCodeID no puede ser nulo";
                                    }
                                }
                            } // tran sam2
                        } //using ctx2
                        sam3_tran.Commit();
                    }// tran sam3
                }// using ctx

                if (error != "")
                {
                    result.ReturnMessage.Add(error);
                    result.ReturnCode = 200;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = true;
                }

                return result;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Obtener las coladas por proyecto
        /// Si id es != 0, se elimina la opcion "Sin Colada"
        /// </summary>
        /// <param name="id">id para determinar si se elimina la opcion Sin colada</param>
        /// <returns>lista de ccoladas</returns>
        public object ObtenerColadasPorProyecto(int id, int mostrarOpcion,string texto, Sam3_Usuario usuario, int paginaID, string idioma, int proyectoID = 0 )
        {
            try
            {
                List<Coladas> listColada = new List<Coladas>();
                using (SamContext ctx = new SamContext())
                {
                    if (mostrarOpcion != 0 && (bool)PerfilBd.Instance.VerificarPermisoCreacion(usuario.PerfilID, "Colada", paginaID))
                    {
                        if (idioma == "en-US")
                        {
                            listColada.Add(new Coladas { Nombre = "Add new", ColadaID = 0 });
                        }
                        else
                        {
                            listColada.Add(new Coladas { Nombre = "Agregar Nuevo", ColadaID = 0 });
                        }
                    }
                    List<Coladas> coladas = new List<Coladas>();

                    if (proyectoID > 0)
                    {
                        coladas = (from c in ctx.Sam3_Colada
                                   join p in ctx.Sam3_Proyecto on c.ProyectoID equals p.ProyectoID
                                   where c.Activo && p.Activo
                                   && c.ProyectoID == proyectoID
                                   && c.NumeroColada.Contains(texto)
                                   select new Coladas
                                   {
                                       ColadaID = c.ColadaID,
                                       Nombre = c.NumeroColada
                                   }).AsParallel().ToList();
                    }
                    else
                    {
                        coladas = (from c in ctx.Sam3_Colada
                                   where c.Activo
                                   && c.NumeroColada.Contains(texto)
                                   select new Coladas
                                   {
                                       ColadaID = c.ColadaID,
                                       Nombre = c.NumeroColada
                                   }).AsParallel().ToList();
                    }

                    listColada.AddRange(coladas);

                    if (id != 0)
                    {
                        listColada.RemoveAll(x => x.ColadaID == 1);
                    }
                }
                return listColada;

            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }


        /// <summary>
        /// Obtener las coladas por itemCode
        /// Si id es != 0, se elimina la opcion "Sin Colada"
        /// </summary>
        /// <param name="id">id para determinar si se elimina la opcion Sin colada</param>
        /// <returns>lista de ccoladas</returns>
        public object ObtenerColadasPorItemCode(int id, int mostrarOpcion, Sam3_Usuario usuario, int paginaID, string idioma, string itemCodeID = "")
        {
            try
            {
                List<Coladas> listColada = new List<Coladas>();
                int itemID = string.IsNullOrEmpty(itemCodeID) ? 0 : Convert.ToInt32(itemCodeID);
                using (SamContext ctx = new SamContext())
                {
                    if (mostrarOpcion != 0 && (bool)PerfilBd.Instance.VerificarPermisoCreacion(usuario.PerfilID, "Colada", paginaID))
                    {
                        if (idioma == "en-US")
                        {
                            listColada.Add(new Coladas { Nombre = "Add new", ColadaID = 0 });
                        }
                        else
                        {
                            listColada.Add(new Coladas { Nombre = "Agregar Nuevo", ColadaID = 0 });
                        }
                    }


                    List<Coladas> coladas = (from ric in ctx.Sam3_Rel_Itemcode_Colada
                                             join c in ctx.Sam3_Colada on ric.ColadaID equals c.ColadaID
                                             join it in ctx.Sam3_ItemCode on ric.ItemCodeID equals it.ItemCodeID
                                             where ric.Activo && c.Activo && it.Activo
                                             && ric.ItemCodeID == itemID
                                             select new Coladas
                                             {
                                                 ColadaID = c.ColadaID,
                                                 Nombre = c.NumeroColada
                                             }).AsParallel().Distinct().ToList();


                    listColada.AddRange(coladas);

                    if (id != 0)
                    {
                        listColada.RemoveAll(x => x.ColadaID == 1);
                    }
                }
                return listColada;

            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Obtener las coladas por familiaAcero
        /// Si id es != 0, se elimina la opcion "Sin Colada"
        /// </summary>
        /// <param name="id">id para determinar si se elimina la opcion Sin colada</param>
        /// <returns>lista de ccoladas</returns>
        public object ObtenerColadasPorFamiliAcero(int id, int mostrarOpcion, Sam3_Usuario usuario, int paginaID, string idioma, int familiaAceroID = 0)
        {
            try
            {
                List<Coladas> listColada = new List<Coladas>();
                using (SamContext ctx = new SamContext())
                {
                    if (mostrarOpcion != 0 && (bool)PerfilBd.Instance.VerificarPermisoCreacion(usuario.PerfilID, "Colada", paginaID))
                    {
                        if (idioma == "en-US")
                        {
                            listColada.Add(new Coladas { Nombre = "Add new", ColadaID = 0 });
                        }
                        else
                        {
                            listColada.Add(new Coladas { Nombre = "Agregar Nuevo", ColadaID = 0 });
                        }
                    }

                    List<Coladas> coladas = new List<Coladas>();

                    if (familiaAceroID > 0)
                    {
                        coladas = (from c in ctx.Sam3_Colada
                                   join ac in ctx.Sam3_Acero on c.AceroID equals ac.AceroID
                                   where c.Activo && ac.Activo
                                   && ac.FamiliaAceroID == familiaAceroID
                                   select new Coladas
                                   {
                                       ColadaID = c.ColadaID,
                                       Nombre = c.NumeroColada
                                   }).AsParallel().ToList();
                    }
                    else
                    {
                        coladas = (from c in ctx.Sam3_Colada
                                   where c.Activo
                                   select new Coladas
                                   {
                                       ColadaID = c.ColadaID,
                                       Nombre = c.NumeroColada
                                   }).AsParallel().ToList();
                    }

                    listColada.AddRange(coladas);

                    if (id != 0)
                    {
                        listColada.RemoveAll(x => x.ColadaID == 1);
                    }
                }
                return listColada;

            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
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