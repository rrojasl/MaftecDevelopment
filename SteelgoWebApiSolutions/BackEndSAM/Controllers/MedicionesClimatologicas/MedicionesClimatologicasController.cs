﻿using BackEndSAM.DataAcces.HerramientasPruebasBD;
using BackEndSAM.DataAcces.MedicionesClimatologicasBD;
using BackEndSAM.Models.MedicionesClimatologicas;
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

namespace BackEndSAM.Controllers.MedicionesClimatologicas
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MedicionesClimatologicasController : ApiController
    {
        public object Post(CondicionClimatologica condiciones, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CondicionesClimatologicasBD.Instance.IngresarCondicionesClimatologicas(condiciones, usuario, "");
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(" ");
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

        public object Get(string token, int condicionClimaticaID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);

            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CondicionesClimatologicasBD.Instance.ObtenerCondicionClimatica(condicionClimaticaID);
            }
            else
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add("No Econtrado");
                result.ReturnCode = 401;
                result.ReturnStatus = false;
                result.IsAuthenicated = false;
                return result;
            }
        }

    }
}
