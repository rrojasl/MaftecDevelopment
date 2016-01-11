﻿using BackEndSAM.DataAcces.PinturaBD.CapturaAvanceBD;
using BackEndSAM.Models.Pintura.CapturaAvance;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers.PinturaControllers.CapturaAvance
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CapturaAvanceController : ApiController
    {
        [HttpGet]
        public object ObtieneCamposPredeterminados(string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                string fechaShot = (string)CapturaAvanceBD.Instance.ObtenerCamposPredeterminados(usuario, lenguaje, 35);
                string fechaprim = (string)CapturaAvanceBD.Instance.ObtenerCamposPredeterminados(usuario, lenguaje, 36);

                CamposPredeterminados CapturaAvanceCamposPredeterminados = new CamposPredeterminados();

                CapturaAvanceCamposPredeterminados = new CamposPredeterminados
                {
                    FechaShotblast = fechaShot,
                    FechaPrimario = fechaprim
                };

                return CapturaAvanceCamposPredeterminados;
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        [HttpGet]
        public object ObtenerCarrosCargados(string token, string lenguaje, int cargado)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaAvanceBD.Instance.ObtenerMedioTransporteCargado(lenguaje);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        [HttpGet]
        public object ObtenerDetalleCarrosCargados(string token, int medioTransporteCargaID, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaAvanceBD.Instance.ObtenerListaMedioTransporteCargado(medioTransporteCargaID, lenguaje);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        [HttpGet]
        public object ObtenerDetalleSpoolAgregar(string token,int OrdenTrabajoSpoolID, string lenguaje, int shotblasteroID, string shotblastero, int pintorID, string pintor)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaAvanceBD.Instance.ObtenerSpoolNuevo(OrdenTrabajoSpoolID, lenguaje, shotblasteroID, shotblastero, pintorID, pintor);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        [HttpGet]
        public object getObreros(string token, string lenguaje, int tipo, string tipoObrero)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaAvanceBD.Instance.ObtenerObreros(lenguaje,tipo,tipoObrero);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(payload);
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }
    }
}