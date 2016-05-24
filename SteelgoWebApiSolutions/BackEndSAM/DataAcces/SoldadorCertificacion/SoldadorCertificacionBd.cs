﻿using DatabaseManager.Sam3;
using BackEndSAM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SecurityManager.Api.Models;
using System.Data.Entity.Core.Objects;
using BackEndSAM.Models.SoldadorCertificacion;
using SecurityManager.TokenHandler;
using System.Data;

namespace BackEndSAM.DataAcces
{
    public class SoldadorCertificacionBd
    {
        private static readonly object _mutex = new object();
        private static SoldadorCertificacionBd _instance;


        public static SoldadorCertificacionBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new SoldadorCertificacionBd();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerSoldadorCertificacion(int TipoDato, string Lenguaje)
        {

            using (SamContext ctx = new SamContext())
            {

                List<CedulaTuboCalificado> listaCedulaTuboCalificado = (from LCedulaTuboCalificado in ctx.Sam3_Soldadura_Get_CedulaTuboCalificado()
                                                                        select new CedulaTuboCalificado
                                                                        {
                                                                            CedulaTuboCalificadoDesc = LCedulaTuboCalificado.CedulaTuboCalificadoDesc,
                                                                            CedulaTuboCalificadoID = LCedulaTuboCalificado.CedulaTuboCalificadoID.ToString()
                                                                        }).AsParallel().ToList();
                listaCedulaTuboCalificado.Insert(0, new CedulaTuboCalificado());
                List<TipoProcesosSoldadura> listaTipoProcesosSoldadura = (from lTPS in ctx.Sam3_Soldadura_Get_TipoProcesoSoldadura()
                                                                          select new TipoProcesosSoldadura
                                                                          {
                                                                              TipoProcesoSoldaduraID = lTPS.TipoProcesoSoldaduraID.ToString(),
                                                                              TipoProcesoSoldaduraDesc = lTPS.TipoProcesoSoldaduraDesc
                                                                          }).AsParallel().ToList();
                listaTipoProcesosSoldadura.Insert(0,new TipoProcesosSoldadura());
                List<TipoPrueba> listaTipoPrueba = (from lTPS in ctx.Sam3_Soldadura_Get_TipoPrueba()
                                                    select new TipoPrueba
                                                    {
                                                        TipoPruebaID = lTPS.TipoPruebaID.ToString(),
                                                        TipoDePrueba = lTPS.Nombre
                                                    }).AsParallel().ToList();
                listaTipoPrueba.Insert(0, new TipoPrueba());
                List<SoldadorCertificacion> data = (from SC in ctx.Sam3_Soldadura_SoldadorCertificacion(Lenguaje)
                                                    select new SoldadorCertificacion
                                                    {
                                                        Accion = 2,
                                                        SoldadorCertificacionID = SC.SoldadorCertificacionID,
                                                        ObreroID = SC.OBREROID,
                                                        CodigoObrero = SC.CodigoObrero,
                                                        PQRID = SC.PQRID,
                                                        NombrePQR = SC.NombrePQR,
                                                        ProcesoSoldaduraID = Convert.ToInt32(SC.ProcesoSoldaduraID),
                                                        ProcesoSoldadura = SC.ProcesoSoldadura,
                                                        ListaTipoProcesosSoldadura = listaTipoProcesosSoldadura,
                                                        FechaInicioCertificado = SC.FechaInicioCertificado,
                                                        FechaFinCertificado = SC.FechaFinCertificado,
                                                        PasosSoldadura = Convert.ToString(SC.PasosSoldadura),
                                                        CedulaTuboCalificadoID = SC.CedulaTuboCalificadoID.GetValueOrDefault(),
                                                        CedulaTuboCalificado = SC.CedulaTuboCalificado,
                                                        ListaCedulaTuboCalificado = listaCedulaTuboCalificado,
                                                        EspesorMinimo = Convert.ToString(SC.EspesorMinimo),
                                                        EspesorMaximo = Convert.ToString(SC.EspesorMaximo),
                                                        DiametroCalificado = Convert.ToString(SC.DiametroCalificado),
                                                        TipoDePruebaID = Convert.ToInt32(SC.TipoDePruebaID),
                                                        TipoDePrueba = SC.TipoPrueba,
                                                        ListaTipoPrueba = listaTipoPrueba,
                                                        Posicion = Convert.ToInt32(SC.Posicion)
                                                    }).AsParallel().ToList();
                return data;


            }

        }

        

        
        public object AgregarSoldadorCertificacion(DataTable dtSoldadorCertificacion, Sam3_Usuario usuario,string lenguaje)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    ObjetosSQL _SQL = new ObjetosSQL();
                    string[,] parametro = { { "@Usuario", usuario.UsuarioID.ToString() }, { "@Lenguaje", lenguaje } };

                    _SQL.Ejecuta(Stords.GUARDARSOLDADORCERTIFICACION, dtSoldadorCertificacion, "@Tabla", parametro);

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

    public object ObtenerTipoPruebas(int TipoDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<SoldadorCertificacion> data = (from SC in ctx.Sam3_Soldadura_TipoPruebas(TipoDato)
                                                    select new SoldadorCertificacion
                                                    {
                                                        TipoDePruebaID = SC.TipoPruebaID,
                                                        TipoDePrueba = SC.TipoPrueba
                                                    }).AsParallel().ToList();
                return data;
            }




        }

        public object ObtenerPosicion(int TipoDeDato)
        {

            using (SamContext ctx = new SamContext())
            {

                List<SoldadorCertificacion> data = (from SC in ctx.Sam3_Soldadura_CertificacionPosicion(TipoDeDato)
                                                    select new SoldadorCertificacion
                                                    {
                                                        PosicionID = SC.PosicionID,
                                                        Posicion = Convert.ToInt32(SC.Posicion)

                                                    }).AsParallel().ToList();
                return data;
            }




        }


    }
}