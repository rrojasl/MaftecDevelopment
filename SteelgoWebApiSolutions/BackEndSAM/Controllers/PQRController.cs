using BackEndSAM.DataAcces;
using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace BackEndSAM.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PQRController : ApiController
    {
        //Obtiene el DataSource Para PQR
        public object Get(int TipoDato, int Proyecto, int PruebaID, string Especificacion, string Codigo, string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return PQRBd.Instance.ObtenerListadoPQRActivos(TipoDato, Proyecto, PruebaID, Especificacion, Codigo);
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

        public object Get(int Proyecto, int PruebaID, string token)
        {
            try
            {
                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    return PQRBd.Instance.ObtenerListasPQR(Proyecto, PruebaID);
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

        public object Post(Captura listaCaptura, string token)
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
                    DataTable dtDetalleCaptura = new DataTable();
                    if (listaCaptura.Detalles!= null)
                    {
                        dtDetalleCaptura = ToDataTable(listaCaptura.Detalles);
                    }
                    return PQRBd.Instance.AgregarPQR(dtDetalleCaptura, Usuario);
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

        public static DataTable ToDataTable<T>(List<T> l_oItems)
        {
            DataTable oReturn = new DataTable(typeof(T).Name);
            object[] a_oValues;
            int i;

            //#### Collect the a_oProperties for the passed T
            PropertyInfo[] a_oProperties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            //#### Traverse each oProperty, .Add'ing each .Name/.BaseType into our oReturn value
            //####     NOTE: The call to .BaseType is required as DataTables/DataSets do not support nullable types, so it's non-nullable counterpart Type is required in the .Column definition
            foreach (PropertyInfo oProperty in a_oProperties)
            {
                oReturn.Columns.Add(oProperty.Name, BaseType(oProperty.PropertyType));
            }

            //#### Traverse the l_oItems
            foreach (T oItem in l_oItems)
            {
                //#### Collect the a_oValues for this loop
                a_oValues = new object[a_oProperties.Length];

                //#### Traverse the a_oProperties, populating each a_oValues as we go
                for (i = 0; i < a_oProperties.Length; i++)
                {
                    a_oValues[i] = a_oProperties[i].GetValue(oItem, null);
                }

                //#### .Add the .Row that represents the current a_oValues into our oReturn value
                oReturn.Rows.Add(a_oValues);
            }

            //#### Return the above determined oReturn value to the caller
            return oReturn;
        }
        public static Type BaseType(Type oType)
        {
            //#### If the passed oType is valid, .IsValueType and is logicially nullable, .Get(its)UnderlyingType
            if (oType != null && oType.IsValueType &&
                oType.IsGenericType && oType.GetGenericTypeDefinition() == typeof(Nullable<>)
            )
            {
                return Nullable.GetUnderlyingType(oType);
            }
            //#### Else the passed oType was null or was not logicially nullable, so simply return the passed oType
            else
            {
                return oType;
            }
        }

        ////Llena el DataSource para NumeroP
        //public object Get(int TipoDato, string ConsultaNumeroP, string token)
        //{
        //    try
        //    {
        //        string payload = "";
        //        string newToken = "";
        //        bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //        if (totokenValido)
        //        {
        //            return PQRBd.Instance.ObtenerNumeroP(TipoDato);
        //        }
        //        else
        //        {
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add(payload);
        //            result.ReturnCode = 401;
        //            result.ReturnStatus = false;
        //            result.IsAuthenicated = false;
        //            return result;
        //        }


        //    }
        //    catch (Exception ex)
        //    {


        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;
        //        return result;
        //    }

        //}

        ////Llena el DataSource para ConsultaProcesoSoldadura
        //public object Get(int TipoDato, int ConsultaProcesoSoldadura, string token)
        //{
        //    try
        //    {
        //        string payload = "";
        //        string newToken = "";
        //        bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //        if (totokenValido)
        //        {
        //            return PQRBd.Instance.ObtenerProcesoSoldadura(TipoDato);
        //        }
        //        else
        //        {
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add(payload);
        //            result.ReturnCode = 401;
        //            result.ReturnStatus = false;
        //            result.IsAuthenicated = false;
        //            return result;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;
        //        return result;
        //    }
        //}

        ////Llena el Datasource para GrupoP
        //public object Get(string ConsultaGrupoP, int TipoDato, string token)
        //{
        //    try
        //    {
        //        string payload = "";
        //        string newToken = "";
        //        bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //        if (totokenValido)
        //        {
        //            return PQRBd.Instance.ObtenerGrupoP(TipoDato);
        //        }
        //        else
        //        {
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add(payload);
        //            result.ReturnCode = 401;
        //            result.ReturnStatus = false;
        //            result.IsAuthenicated = false;
        //            return result;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;
        //        return result;
        //    }
        //}

        ////Llena el DataSource para Aporte
        //public object Get(string token, string ConsultaAporte, int TipoDato)
        //{
        //    try
        //    {
        //        string payload = "";
        //        string newToken = "";
        //        bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //        if (totokenValido)
        //        {
        //            return PQRBd.Instance.ObtenerAporte(TipoDato);
        //        }
        //        else
        //        {
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add(payload);
        //            result.ReturnCode = 401;
        //            result.ReturnStatus = false;
        //            result.IsAuthenicated = false;
        //            return result;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;
        //        return result;
        //    }
        //}

        ////Llena el DataSopurce para Mezcla
        //public object Get(string token, int ConsultaMezcla, int TipoDato)
        //{
        //    try
        //    {
        //        string payload = "";
        //        string newToken = "";
        //        bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //        if (totokenValido)
        //        {
        //            return PQRBd.Instance.ObtenerMezcla(TipoDato);
        //        }
        //        else
        //        {
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add(payload);
        //            result.ReturnCode = 401;
        //            result.ReturnStatus = false;
        //            result.IsAuthenicated = false;
        //            return result;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;
        //        return result;
        //    }
        //}

        ////Llena el DataSopurce para Respaldo
        //public object Get(int ConsultaRespaldo, string token, int TipoDato)
        //{
        //    try
        //    {
        //        string payload = "";
        //        string newToken = "";
        //        bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //        if (totokenValido)
        //        {
        //            return PQRBd.Instance.ObtenerRespaldo(TipoDato);
        //        }
        //        else
        //        {
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add(payload);
        //            result.ReturnCode = 401;
        //            result.ReturnStatus = false;
        //            result.IsAuthenicated = false;
        //            return result;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;
        //        return result;
        //    }
        //}


        ////Llena el DataSopurce para GrupoF
        //public object Get(string token, int TipoDato, string var1, string var2)
        //{
        //    try
        //    {
        //        string payload = "";
        //        string newToken = "";
        //        bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //        if (totokenValido)
        //        {
        //            return PQRBd.Instance.ObtenerGrupoF(TipoDato);
        //        }
        //        else
        //        {
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add(payload);
        //            result.ReturnCode = 401;
        //            result.ReturnStatus = false;
        //            result.IsAuthenicated = false;
        //            return result;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;
        //        return result;
        //    }
        //}


        ////Llena El DataSouce para Codigo
        //public object Get(string token, int TipoDato, string var1, string var2, string var3)
        //{
        //    try
        //    {
        //        string payload = "";
        //        string newToken = "";
        //        bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //        if (totokenValido)
        //        {
        //            return PQRBd.Instance.ObtenerCodigo(TipoDato);
        //        }
        //        else
        //        {
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add(payload);
        //            result.ReturnCode = 401;
        //            result.ReturnStatus = false;
        //            result.IsAuthenicated = false;
        //            return result;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;
        //        return result;
        //    }
        //}

        ////Llena El DataSource Para  Espesores de PQR
        //public object Get(string token, int TipoDato, int PQRIDABuscar, string var1)
        //{
        //    try
        //    {
        //        string payload = "";
        //        string newToken = "";
        //        bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //        if (totokenValido)
        //        {
        //            return PQRBd.Instance.ObtenerEspesores(TipoDato, PQRIDABuscar);
        //        }
        //        else
        //        {
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add(payload);
        //            result.ReturnCode = 401;
        //            result.ReturnStatus = false;
        //            result.IsAuthenicated = false;
        //            return result;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;
        //        return result;
        //    }
        //}

        ////Elimina Un PQR (Cambia a estado inactivo en BD)
        //public object Put(int TipoDeDato, int PQRID, string token)
        //{
        //    try
        //    {
        //        string payload = "";
        //        string newToken = "";
        //        bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //        if (totokenValido)
        //        {
        //            JavaScriptSerializer serializer = new JavaScriptSerializer();
        //            Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);
        //            int IdUsuario = Usuario.UsuarioID;
        //            return PQRBd.Instance.EliminaPQR(TipoDeDato, PQRID, IdUsuario);
        //            // return new object();
        //        }
        //        else
        //        {
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add(payload);
        //            result.ReturnCode = 401;
        //            result.ReturnStatus = false;
        //            result.IsAuthenicated = false;
        //            return result;
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;
        //        return result;
        //    }

        //}

        ////Edita PQR Seleccionado
        //public object Put(Sam3_PQR pqr, string token)
        //{
        //    try
        //    {
        //        string payload = "";
        //        string newToken = "";
        //        bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //        if (totokenValido)
        //        {
        //            JavaScriptSerializer serializer = new JavaScriptSerializer();
        //            Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);

        //            return PQRBd.Instance.ActualizaPQR(pqr, Usuario);
        //            // return new object();
        //        }
        //        else
        //        {
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add(payload);
        //            result.ReturnCode = 401;
        //            result.ReturnStatus = false;
        //            result.IsAuthenicated = false;
        //            return result;
        //        }




        //    }
        //    catch (Exception ex)
        //    {


        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;
        //        return result;
        //    }
        //}

        ////Agrega PQR 
        //public object Post(Sam3_PQR Addpqr, string token) {
        //    try
        //    {
        //        string payload = "";
        //        string newToken = "";
        //        bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //        if (totokenValido)
        //        {
        //            JavaScriptSerializer serializer = new JavaScriptSerializer();
        //            Sam3_Usuario Usuario = serializer.Deserialize<Sam3_Usuario>(payload);

        //            return PQRBd.Instance.AgregarPQR(Addpqr, Usuario);
        //            // return new object();
        //        }
        //        else
        //        {
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add(payload);
        //            result.ReturnCode = 401;
        //            result.ReturnStatus = false;
        //            result.IsAuthenicated = false;
        //            return result;
        //        }


        //    }
        //    catch (Exception ex)
        //    {

        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;
        //        return result;
        //    }

        //}

        ////ValidaExistencia PQR
        //public object Get(string nombrePQR, string token, int PQRID, int Accion)
        //{
        //    try
        //    {
        //        string payload = "";
        //        string newToken = "";
        //        bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
        //        if (totokenValido)
        //        {
        //            JavaScriptSerializer serializer = new JavaScriptSerializer();
        //            Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

        //            return PQRBd.Instance.ValidarExistePQR(PQRID, nombrePQR);
        //        }
        //        else
        //        {
        //            TransactionalInformation result = new TransactionalInformation();
        //            result.ReturnMessage.Add(payload);
        //            result.ReturnCode = 401;
        //            result.ReturnStatus = false;
        //            result.IsAuthenicated = false;
        //            return result;
        //        }


        //    }
        //    catch (Exception ex)
        //    {


        //        TransactionalInformation result = new TransactionalInformation();
        //        result.ReturnMessage.Add(ex.Message);
        //        result.ReturnCode = 500;
        //        result.ReturnStatus = false;
        //        result.IsAuthenicated = true;
        //        return result;
        //    }


        //}


        //Obtiene el listado de PQR Activos, (PQRID , NOMBREPQR)
        public object Get(string token, int TipoAccion)
        {
            try
            {

                string payload = "";
                string newToken = "";
                bool totokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
                if (totokenValido)
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                    return PQRBd.Instance.ObtenerListadoPQRActivos(TipoAccion,28,2,null,null);
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
