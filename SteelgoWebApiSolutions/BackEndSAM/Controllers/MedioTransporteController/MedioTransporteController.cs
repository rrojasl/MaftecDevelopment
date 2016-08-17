using BackEndSAM.DataAcces.PinturaBD.MedioTransporteBD;
using BackEndSAM.Models.Pintura.MedioTransporte;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using SecurityManager.TokenHandler;
using System.Data;
using System.Collections.Generic;
using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using System;

namespace BackEndSAM.Controllers.MedioTransporteController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MedioTransporteController : ApiController
    {
        //Obtener campos predeterminados
        [HttpGet]
        public object ObtieneCamposPredeterminados(string predeterminado, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                string vista = (string)MedioTransporteBD.Instance.ObtenerCampoPredeterminado(usuario, lenguaje, 46);
                string opcion = (string)MedioTransporteBD.Instance.ObtenerCampoPredeterminado(usuario, lenguaje, 34);
                string muestra = (string)MedioTransporteBD.Instance.ObtenerCampoPredeterminado(usuario, lenguaje, 2048);

                CamposPredeterminados medioTransporteCamposPredeterminados = new CamposPredeterminados();

                medioTransporteCamposPredeterminados = new CamposPredeterminados
                {
                    Vista = vista,
                    Opcion = opcion,
                    Muestra = muestra
                };

                return medioTransporteCamposPredeterminados;
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

        public object Get(string token, string lenguaje, int proyectoID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return MedioTransporteBD.Instance.ObtenerMedioTransporte(lenguaje, proyectoID);
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
        public object getProyectos(string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return MedioTransporteBD.Instance.obtenerListaProyectos();
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


        //obtiene el detalle
        public object Get(string token, int TipoConsulta, int OrdenTrabajoSpoolID, string Codigo, string lenguaje, int medioTransporteID)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return MedioTransporteBD.Instance.ObtieneDetalle(medioTransporteID, TipoConsulta, OrdenTrabajoSpoolID, Codigo, lenguaje);
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

        //Guarda la carga
        public object Post(Captura listaCaptura, string token, string lenguaje, int medioTransporteID, int medioTransporteCargaID, int cerrar)
        { 
            string payload = "";
            string newToken = "";
            DataTable dtDetalleCaptura = new DataTable();
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                dtDetalleCaptura = ToDataTable(listaCaptura.Detalles);
                return MedioTransporteBD.Instance.GuardarMedioTransporte(dtDetalleCaptura, usuario, lenguaje, medioTransporteID, medioTransporteCargaID, cerrar);
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

        public object Get(int medioTransporteCargaID, int medioTransporteID,int proyectoID, string token, string lenguaje, int todos)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return MedioTransporteBD.Instance.ObtenerMedioTransporteDetalleCargado(medioTransporteCargaID, medioTransporteID,lenguaje, proyectoID, todos);
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

        //Guarda la descarga
        public object Post(CapturaDescarga listaCaptura, int medioTransporteCargaID, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtDetalleCaptura = ArmadoController.ToDataTable(listaCaptura.Detalles);
                return MedioTransporteBD.Instance.GuardarDescarga(dtDetalleCaptura, usuario.UsuarioID, medioTransporteCargaID,lenguaje);
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

        //obtiene los catalogos de clasificacion y persistencia
        public object Get(string token, int idCatalogo)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                if (idCatalogo == 0)
                    return MedioTransporteBD.Instance.ObteneCatalogoClasificacion();
                else
                    return MedioTransporteBD.Instance.ObtenerCatalogoPersistencia();
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

        public object Post(CapturaNuevoMedioTransporte listaCaptura, string token)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DataTable dtNuevoMedioTransporte = ArmadoController.ToDataTable(listaCaptura.Detalles);
                return MedioTransporteBD.Instance.GuardarNuevoMedioTransporte(dtNuevoMedioTransporte, usuario.UsuarioID);
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

        [HttpPut]
        public object CerrarCarro(CerrarMedioTransporte medioTransporte, string token)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);

                return MedioTransporteBD.Instance.CierraCarro(usuario, medioTransporte.MedioTransporteID, medioTransporte.MedioTransporteCargaID, medioTransporte.CerrarCarro);
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
    }
}

