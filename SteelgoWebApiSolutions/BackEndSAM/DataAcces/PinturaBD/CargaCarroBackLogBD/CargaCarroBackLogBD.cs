﻿using BackEndSAM.Models.Pintura.CargaCarroBackLog;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.PinturaBD.CargaCarroBackLogBD
{
    public class CargaCarroBackLogBD
    {
        private static readonly object _mutex = new object();
        private static CargaCarroBackLogBD _instance;

        public static CargaCarroBackLogBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CargaCarroBackLogBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoSpool(int medioTransporteCargaID, int medioTransporteID,int  proyectoID, int todos)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                { 
                    List<Sam3_Pintura_Get_SpoolCarroBackLog_Result> result = ctx.Sam3_Pintura_Get_SpoolCarroBackLog(medioTransporteCargaID, medioTransporteID, proyectoID, todos).ToList();
                    List<CargaCarroBackLog> lista = new List<CargaCarroBackLog>();
                    foreach(Sam3_Pintura_Get_SpoolCarroBackLog_Result item in result)
                    {
                        CargaCarroBackLog elemento = new CargaCarroBackLog
                        {
                            Accion = item.StatusCarga.GetValueOrDefault() ? 2 : 1,
                            Metros2 = item.Area.GetValueOrDefault(),
                            Color = item.ColorPintura,
                            CuadranteSpool = item.Cuadrante,
                            CuadranteMedioTransporte = item.StatusCarga.GetValueOrDefault() ? item.NombreMedioTransporte : item.Cuadrante,
                            CuadranteID = item.CuadranteID.GetValueOrDefault(),
                            NombreMedioTransporte = item.NombreMedioTransporte,
                            OrdenImportancia = item.OrdenImportancia.GetValueOrDefault(),
                            Peso = Math.Round(item.Peso.GetValueOrDefault(), 2),
                            ProyectoID = item.ProyectoID,
                            SistemaPintura = item.SistemaPintura,
                            SistemaPinturaID = item.SistemaPinturaID,
                            SpoolID = item.SpoolID,
                            SpoolJunta = item.SpoolJunta,
                            Seleccionado = item.StatusCarga.GetValueOrDefault(),
                            Status = item.StatusCarga.GetValueOrDefault(),
                            CarroCerrado = item.CarroCerrado.GetValueOrDefault(),
                            MedioTransporteCargaID = item.MedioTransporteCargaID.GetValueOrDefault()
                        };
                        lista.Add(elemento);
                    }
                        
                    return lista.OrderByDescending(x => x.Status).ToList<CargaCarroBackLog>();

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


        public object InsertarCargaCarroBackLog(DataTable dtDetalleCaptura, Sam3_Usuario usuario, int medioTransporteID, int cerrar)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@MedioTransporteID", medioTransporteID.ToString() }, { "@Cerrar", cerrar.ToString() } };
                    _SQL.Ejecuta(Stords.GUARDACARGACARROBACKLOG, dtDetalleCaptura , "@Tabla", parametro);

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

        public object ObtenerValorCerrarCarro(Sam3_Usuario usuario, string lenguaje, int idCampoPredeterminado)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {

                    var oMyString = new ObjectParameter("Retorna", typeof(string));
                    var result = ctx.Sam3_Steelgo_Get_CampoPredeterminado(idCampoPredeterminado, lenguaje, oMyString);
                    var data = oMyString.Value.ToString();
                    

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


    }
}