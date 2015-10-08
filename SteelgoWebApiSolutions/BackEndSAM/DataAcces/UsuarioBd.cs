﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam3;
using DatabaseManager.EntidadesPersonalizadas;
using BackEndSAM.Utilities;
using System.Web.Script.Serialization;
using BackEndSAM.Models;
using SecurityManager.Api.Models;
using BackEndSAM.Utilities;
using System.Web.Mvc;
using System.Net.Http;
using System.Net;
using System.IO;
using System.Net.Http.Headers;

namespace BackEndSAM.DataAcces
{
    public class UsuarioBd
    {
        private static readonly object _mutex = new object();
        private static UsuarioBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private UsuarioBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static UsuarioBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new UsuarioBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerPatiosYProyectosDeUsuario(int usuarioID, out List<int> proyectos, out List<int> patios)
        {
            try 
            {
                proyectos = new List<int>();
                patios = new List<int>();
                using (SamContext ctx = new SamContext())
                {
                    proyectos = (from r in ctx.Sam3_Rel_Usuario_Proyecto
                                 where r.Activo && r.UsuarioID == usuarioID
                                 select r.ProyectoID).AsParallel().Distinct().ToList();

                    List<int> temp = proyectos;
                    patios = (from r in ctx.Sam3_Proyecto
                              where r.Activo && temp.Contains(r.ProyectoID)
                              select r.PatioID).AsParallel().Distinct().ToList();
                    
                    return true;

                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                proyectos = null;
                patios = null;
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