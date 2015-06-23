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

namespace BackEndSAM.DataAcces
{
    public class TractoBd
    {
        private static readonly object _mutex = new object();
        private static TractoBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private TractoBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static TractoBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new TractoBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoTractos(string esAvisoEntrada)
        {
            try
            {
                List<TractoAV> lstCamiones = new List<TractoAV>();

                if (int.Parse(esAvisoEntrada) == 1)
                {
                    lstCamiones.Add(new TractoAV { VehiculoID = "0", Placas = "Agregar nuevo" });
                }

                using (SamContext ctx = new SamContext())
                {
                    List<TractoAV> result = (from r in ctx.Sam3_Vehiculo
                                           where r.Activo && r.TipoVehiculoID == 1
                                             select new TractoAV
                                           {
                                               VehiculoID = r.VehiculoID.ToString(),
                                               Placas = r.Placas
                                           }).AsParallel().ToList();

                    lstCamiones.AddRange(result);

                    return lstCamiones;
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

        public object InsertarTracto(VehiculoJson cambios, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Vehiculo nuevoCamion = new Sam3_Vehiculo();
                    nuevoCamion.Activo = true;
                    nuevoCamion.FechaModificacion = DateTime.Now;
                    nuevoCamion.Placas = cambios.Placas;
                    nuevoCamion.PolizaSeguro = cambios.PolizaSeguro;
                    nuevoCamion.TarjetaCirculacion = cambios.TarjetaCirculacion;
                    nuevoCamion.UsuarioModificacion = usuario.UsuarioID;

                    ctx.Sam3_Vehiculo.Add(nuevoCamion);
                    ctx.SaveChanges();

                    Sam3_Rel_Vehiculo_Chofer nuevoRegistroChofer = new Sam3_Rel_Vehiculo_Chofer();
                    nuevoRegistroChofer.VehiculoID = nuevoCamion.VehiculoID;
                    nuevoRegistroChofer.Activo = true;
                    nuevoRegistroChofer.ChoferID = Convert.ToInt32(cambios.ChoferID);
                    nuevoRegistroChofer.FechaModificacion = DateTime.Now;
                    nuevoRegistroChofer.UsuarioModificacion = usuario.UsuarioID;

                    ctx.Sam3_Rel_Vehiculo_Chofer.Add(nuevoRegistroChofer);

                    Sam3_Rel_Vehiculo_Transportista transportista = new Sam3_Rel_Vehiculo_Transportista();
                    transportista.Activo = true;
                    transportista.FechaModificacion = DateTime.Now;
                    transportista.TransportistaID = Convert.ToInt32(cambios.TransportistaID);
                    transportista.VehiculoID = nuevoCamion.VehiculoID;
                    transportista.UsuarioModificacion = usuario.UsuarioID;

                    ctx.Sam3_Rel_Vehiculo_Transportista.Add(transportista);

                    ctx.SaveChanges();

                    return new Camion { Placas = nuevoCamion.Placas, CamionID = nuevoCamion.VehiculoID.ToString() };
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

        public object ActualizarTracto(VehiculoJson cambios, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    return null;
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

        public object EliminarTracto(int vehiculoID, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    Sam3_Vehiculo camion = ctx.Sam3_Vehiculo.Where(x => x.VehiculoID == vehiculoID).AsParallel().SingleOrDefault();
                    camion.Activo = false;
                    camion.FechaModificacion = DateTime.Now;
                    camion.UsuarioModificacion = usuario.UsuarioID;

                    ctx.SaveChanges();

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
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

    }//Fin clase
}