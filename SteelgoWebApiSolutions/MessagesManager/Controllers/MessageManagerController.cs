﻿using CommonTools.Libraries.Strings.Security;
using DatabaseManager.Sam3;
using Newtonsoft.Json;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace MessagesManager.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MessageManagerController : ApiController
    {
        Base64Security dataSecurity = new Base64Security();
       
       /// <summary>
       /// Obtiene las notificaciones por ID de usuario
       /// </summary>
       /// <param name="id">ID de usuario</param>
       /// <returns>Notificaciones en formato JSON</returns>
        public object Get(string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
            
                return MessageLibrary.Instance.GetNotificationsByUserID(usuario.UsuarioID);
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

        /// <summary>
        /// Crea el mensaje en la cola de mensajes
        /// </summary>
        /// <param name="objectEncrypted">Mensaje encriptado</param>
        /// <param name="typeMessage">Tipo de Mensaje (1: Bitácora, 2: Notificación)</param>
        public object Post(string token, string objectEncrypted, string typeMessage)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                string message = dataSecurity.Decode(objectEncrypted);
                int typeMsg = Convert.ToInt32(typeMessage);

                return MessageLibrary.Instance.SendMessageToQueue(message, typeMsg, usuario);
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

       /// <summary>
       /// Cambia Estatus Lectura de una Notificación a Leida
       /// </summary>
       /// <param name="id">ID de notificación</param>
        public object Put(string token, int id)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return MessageLibrary.Instance.MarkNotificationAsRead(id);
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
        
        /// <summary>
        /// Marca el mensaje como inactivo
        /// </summary>
        /// <param name="token">Token de la sesion de usuario</param>
        /// <param name="id"> id de notificacion</param>
        /// <returns>estatus 500 OK</returns>
        public object Delete(string token, int id)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
            
                return MessageLibrary.Instance.DeleteMessage(id);
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