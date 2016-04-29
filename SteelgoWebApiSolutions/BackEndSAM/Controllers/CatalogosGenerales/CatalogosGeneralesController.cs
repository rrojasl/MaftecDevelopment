using BackEndSAM.DataAcces;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BackEndSAM.DataAcces.CatalogosGeneralesBD;

namespace BackEndSAM.Controllers.CatalogosGenerales
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CatalogosGeneralesController : ApiController
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="proyectoID"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        [HttpGet]
        public object RetornaListadoColada(int proyectoID, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                return ColadaBD.Instance.ObtenerListadoColada(proyectoID);
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
