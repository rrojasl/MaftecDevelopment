﻿
using BackEndSAM.DataAcces;
using BackEndSAM.Models.SoldadorCertificacion;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Data;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers.SoldadorCertificacion
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SoldadorCertificacionController : ApiController
    {
        //Obtiene DataSource para el Grid
        public object Get(int TipoDato, string token, string Lenguaje, int proyectoID, int patioID)
        {
            try
            {
                string payload = "";
                string newToken = "";
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                if (totokenValido)
                {
                    return SoldadorCertificacionBd.Instance.ObtenerSoldadorCertificacion(TipoDato, Lenguaje,proyectoID, Usuario, patioID);
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

        //Agrega Soldador Certificacion, tipoGuardado se refiere si es nuevo o si es listado.
        public object Post(Captura AddSC, string token, string Lenguaje,int TipoCaptura)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                    DataTable dtDetalleCaptura = ArmadoController.ToDataTable(AddSC.Detalles);
                    return SoldadorCertificacionBd.Instance.AgregarSoldadorCertificacion(dtDetalleCaptura, Usuario, Lenguaje, TipoCaptura);
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
        
        //Obtiene Informacion para genererar un nuevo soldador certificacion.
        public object Get(string token, string Lenguaje,int proyectoID,int patioID)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                    return SoldadorCertificacionBd.Instance.ObtenerNuevoSoldadorCertificacion(proyectoID, Usuario.UsuarioID, patioID);
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

        public object Get(int obreroID, int WPSID, int procesoSoldaduraID, string token, string Lenguaje)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return SoldadorCertificacionBd.Instance.ObtenerIDSoldadorCertificacion(obreroID, WPSID, procesoSoldaduraID, Lenguaje);
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
