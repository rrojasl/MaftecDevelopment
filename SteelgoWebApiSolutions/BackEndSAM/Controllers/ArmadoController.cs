﻿using BackEndSAM.DataAcces;
using BackEndSAM.DataAcces.ArmadoBD;
using BackEndSAM.Models.Armado;
using DatabaseManager.Sam3;
using Newtonsoft.Json;
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
    public class ArmadoController : ApiController
    {
        public object Get(string data)
        {
            //Create a generic return object


            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(/*token*/data, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaArmadoBD.Instance.AgregarDetalleCapturaArmado(usuario);
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
        public object Get(string ordenTrabajo, int tipo, string token)
        {
            //Create a generic return object
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                IdOrdenTrabajo idOrdenTrabajo = new IdOrdenTrabajo();

                List<Sam3_Steelgo_Get_SpoolID_Result> lista = (List<Sam3_Steelgo_Get_SpoolID_Result>)CapturaArmadoBD.Instance.ObtenerIDOrdenTrabajo(usuario, ordenTrabajo, tipo);
                List<IDS> listaAtatus = new List<IDS>();
                if (lista.Count > 0)
                {
                    foreach (var item in lista)
                    {
                        listaAtatus.Add(new IDS { Status = item.status, IDValido = item.ID, Proyecto = item.NombreProyecto, Valor = item.OrdenTrabajoSpoolID, ProyectoID = item.ProyectoID });
                    }

                    idOrdenTrabajo = new IdOrdenTrabajo
                    {
                        OrdenTrabajo = lista[0].OrdenTrabajo,
                        idStatus = listaAtatus
                    };
                }
                else
                {
                    idOrdenTrabajo = new IdOrdenTrabajo
                    {
                        OrdenTrabajo = "",
                        idStatus = listaAtatus
                    };
                };
                return idOrdenTrabajo;

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
        public object ObtieneFecha(string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                IdOrdenTrabajo idOrdenTrabajo = new IdOrdenTrabajo();

                string fecha = (string)CapturaArmadoBD.Instance.ObtenerValorFecha(usuario, lenguaje,4);

                string muestra = (string)CapturaArmadoBD.Instance.ObtenerValorFecha(usuario, lenguaje, 6);


                CamposPredeterminados armadoCamposPredeterminados = new CamposPredeterminados();

                armadoCamposPredeterminados = new CamposPredeterminados
                {
                    FechaArmado = fecha,
                    Muestra = muestra,
                    FormatoFecha = lenguaje == "es-MX" ? "dd/MM/yyyy" : "MM-dd-yyyy"
                };

                return armadoCamposPredeterminados;
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
        public object Get(string JsonCaptura, string token,string lenguaje)
        {
            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                DetalleDatosJson capturaDatosJson = serializer.Deserialize<DetalleDatosJson>(JsonCaptura);
                capturaDatosJson.SinCaptura = capturaDatosJson.SinCaptura == "Todos" ? "1" : "0";
                //string json= serializer.Serialize(CapturaArmadoBD.Instance.ObtenerDetalleArmado(capturaDatosJson, usuario));
                //return json;
                List<DetalleDatosJson> listaDetalleDatos = new List<DetalleDatosJson>();


                List<Sam3_Armado_Get_DetalleJunta_Result> detalle = (List<Sam3_Armado_Get_DetalleJunta_Result>)CapturaArmadoBD.Instance.ObtenerDetalleArmado(capturaDatosJson, usuario, lenguaje);

                List<Sam3_Armado_Get_DetalleTrabajoAdicional_Result> detallaArmadoAdicional = (List<Sam3_Armado_Get_DetalleTrabajoAdicional_Result>)CapturaArmadoBD.Instance.DetallaArmadoAdicional(capturaDatosJson, usuario);

                List<Sam3_Armado_Get_MaterialesSpool_Result> listaNumeroUnicos = (List<Sam3_Armado_Get_MaterialesSpool_Result>)CapturaArmadoBD.Instance.listaNumeroUnicos(capturaDatosJson, usuario);

               
                List<DetalleTrabajoAdicional> listDetalleTrabajoAdicional = GenerarDetalleAdicionalJson(detallaArmadoAdicional, usuario);

                List<NumeroUnico> listNumeroUnico1 = GenerarListaNumerosUnicos(listaNumeroUnicos, 1);

                List<NumeroUnico> listNumeroUnico2 = GenerarListaNumerosUnicos(listaNumeroUnicos, 2);

                List<Sam3_Steelgo_Get_TrabajoAdicional_Result> listaTrabajoAdicionalXJunta = (List<Sam3_Steelgo_Get_TrabajoAdicional_Result>)CapturaArmadoBD.Instance.listaTrabajosAdicionalesXJunta(usuario);

                List<TrabajosAdicionalesXJunta> listaDetalleAdicionalXJuntaConvertida = listaTrabajoAdicionalXJunta.ConvertAll(new Converter<Sam3_Steelgo_Get_TrabajoAdicional_Result, TrabajosAdicionalesXJunta>(DetalleTrabajoAdicionalXJuntaResultToDetalleTrabajoAdicionalXJunta));


                foreach (Sam3_Armado_Get_DetalleJunta_Result item in detalle)
                {
                    //item.TipoJunta
                    DetalleDatosJson detalleDatos = new DetalleDatosJson
                    {
                        Accion = item.JuntaArmadoID == null ? 1 : 2,
                        JuntaTrabajoID = 0,
                        JuntaArmadoID =item.JuntaArmadoID==null? 0 : int.Parse(item.JuntaArmadoID.ToString()),
                        IDProyecto = capturaDatosJson.IDProyecto,
                        Proyecto = capturaDatosJson.Proyecto,
                        IdOrdenTrabajo = capturaDatosJson.IdOrdenTrabajo,
                        OrdenTrabajo = capturaDatosJson.OrdenTrabajo,
                        IdVal = capturaDatosJson.IdVal,
                        IdText = capturaDatosJson.IdText,
                        SpoolID = capturaDatosJson.OrdenTrabajo + "-" + capturaDatosJson.IdText,
                        JuntaID = capturaDatosJson.JuntaID,
                        Junta = capturaDatosJson.Junta,
                        TipoJunta = item.TipoJunta,
                        Diametro = item.Diametro.ToString(),
                        Cedula = item.Cedula,
                        FechaArmado = item.FechaArmado == null ? capturaDatosJson.FechaArmado : item.FechaArmado.ToString(),
                        TipoJuntaID = item.TipoJuntaID,
                        TuberoID = item.Tubero == null ? capturaDatosJson.TuberoID : item.ObreroID.ToString(),
                        Tubero = item.Tubero == null ? capturaDatosJson.Tubero : item.Tubero,
                        TallerID = item.TallerID == null ? capturaDatosJson.TallerID : item.TallerID.ToString(),
                        Taller = item.Taller == null ? capturaDatosJson.Taller : item.Taller,
                        Localizacion = item.Localizacion,
                        FamiliaAcero = item.FamiliaAcero,
                        NumeroUnico1 = item.NumeroUnico1ID == null ? (listNumeroUnico1.Count == 1 ? listNumeroUnico1[0].Clave : "") : item.Clave1.ToString(),
                        NumeroUnico2 = item.NumeroUnico2ID == null ? (listNumeroUnico2.Count == 1 ? listNumeroUnico2[0].Clave : "") : item.Clave2.ToString(),
                        TemplateMensajeTrabajosAdicionales = item.TabajosAdicionales,
                        ListaNumerosUnicos1 = listNumeroUnico1,
                        ListaNumerosUnicos2 = listNumeroUnico2,
                        ListaTaller = ObtenerListaTaller((List<Sam3_SteelGo_Get_Taller_Result>)CapturaArmadoBD.Instance.ObtenerTallerXPoryecto(usuario, capturaDatosJson.IDProyecto)),
                        ListaTubero = ObtenerListaTubero((List<Sam3_Steelgo_Get_Obrero_Result>)CapturaArmadoBD.Instance.ObtenerTuberoXProyecto(usuario, capturaDatosJson.IDProyecto, 4)),
                        ListaDetalleTrabajoAdicional = listDetalleTrabajoAdicional,
                        listadoTrabajosAdicionalesXJunta = listaDetalleAdicionalXJuntaConvertida,
                        SinCaptura = capturaDatosJson.SinCaptura,
                        NumeroUnico1ID = item.NumeroUnico1ID == null ? (listNumeroUnico1.Count == 1 ? listNumeroUnico1[0].NumeroUnicoID.ToString() : "") : item.NumeroUnico1ID.ToString(),
                        NumeroUnico2ID= item.NumeroUnico1ID == null ? (listNumeroUnico1.Count == 1 ? listNumeroUnico1[0].NumeroUnicoID.ToString() : "") : item.NumeroUnico2ID.ToString()
                    };
                    listaDetalleDatos.Add(detalleDatos);
                }

                return serializer.Serialize(listaDetalleDatos);

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
        private List<Tubero> ObtenerListaTubero(List<Sam3_Steelgo_Get_Obrero_Result> listaTubero)
        {
            List<Tubero> listaTuberos = new List<Tubero>();
            foreach (Sam3_Steelgo_Get_Obrero_Result item in listaTubero)
            {
                Tubero tubero = new Tubero
                {
                    ObreroID = item.ObreroID,
                    Codigo = item.Codigo
                };
                listaTuberos.Add(tubero);
            }
            return listaTuberos;
        }
        private List<Taller> ObtenerListaTaller(List<Sam3_SteelGo_Get_Taller_Result> listaTaller)
        {
            List<Taller> listaTalleres = new List<Taller>();
            foreach (Sam3_SteelGo_Get_Taller_Result item in listaTaller)
            {
                Taller taller = new Taller
                {
                    TallerID = item.TallerID,
                    Nombre = item.Nombre
                };
                listaTalleres.Add(taller);
            }
            return listaTalleres;
        }
        public List<NumeroUnico> GenerarListaNumerosUnicos(List<Sam3_Armado_Get_MaterialesSpool_Result> listaNumerosUnicos, int numeroSeleccionado)
        {
            List<NumeroUnico> numerosUnicos = new List<NumeroUnico>();

            foreach (Sam3_Armado_Get_MaterialesSpool_Result item in listaNumerosUnicos)
            {
                if (int.Parse(item.Etiqueta.ToString()) == numeroSeleccionado)
                {
                    NumeroUnico numeroUnico = new NumeroUnico
                    {

                        NumeroUnicoID = item.NumeroUnicoID,
                        Clave = item.Clave,
                        EtiquetaMaterial = int.Parse(item.EtiquetaMaterial.ToString()),
                        Etiqueta = item.Etiqueta

                    };
                    numerosUnicos.Add(numeroUnico);
                }

            }

            return numerosUnicos;
        }
        public static TrabajosAdicionalesXJunta DetalleTrabajoAdicionalXJuntaResultToDetalleTrabajoAdicionalXJunta(Sam3_Steelgo_Get_TrabajoAdicional_Result trabajoAdicionalXjunta)
        {
            return new TrabajosAdicionalesXJunta
            {
                NombreCorto = trabajoAdicionalXjunta.NombreCorto,
                SignoInformativo = trabajoAdicionalXjunta.SignoInformativo,
                TrabajoAdicionalID = trabajoAdicionalXjunta.TrabajoAdicionalID
            };
        }
        public List<DetalleTrabajoAdicional> GenerarDetalleAdicionalJson(List<Sam3_Armado_Get_DetalleTrabajoAdicional_Result> listaTrabajoAdicional, Sam3_Usuario usuario)
        {
            List<DetalleTrabajoAdicional> listaDetalleAdicional = new List<DetalleTrabajoAdicional>();

            if (listaTrabajoAdicional.Count == 0)
            {
                DetalleTrabajoAdicional detalleAdicional = new DetalleTrabajoAdicional
                {
                    Accion = 1,
                    Observacion ="",
                    ArmadoTrabajoAdicionalID = 0,
                    JuntaArmadoID = 0,
                    ObreroID = 0,
                    TrabajoAdicional ="",
                    TrabajoAdicionalID = 0,
                    Tubero = ""
                };
                listaDetalleAdicional.Add(detalleAdicional);
            }
            else
            {
                foreach (Sam3_Armado_Get_DetalleTrabajoAdicional_Result item in listaTrabajoAdicional)
                {
                    DetalleTrabajoAdicional detalleAdicional = new DetalleTrabajoAdicional
                    {
                        Accion = item.JuntaArmadoID == 0 ? 1 : 2,
                        Observacion = item.Observacion,
                        ArmadoTrabajoAdicionalID = item.ArmadoTrabajoAdicionalID,
                        JuntaArmadoID = item.JuntaArmadoID,
                        ObreroID = item.ObreroID,
                        TrabajoAdicional = item.TrabajoAdicional,
                        TrabajoAdicionalID = item.TrabajoAdicionalID,
                        Tubero = item.Tubero
                    };
                    listaDetalleAdicional.Add(detalleAdicional);
                }
            }
            
            return listaDetalleAdicional;
        }
        public object Get(string ordenTrabajo, string id, string sinCaptura, string token)
        {

            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaArmadoBD.Instance.ObtenerJuntasXSpoolID(usuario, ordenTrabajo, id, sinCaptura == "Todos" ? 1 : 0);
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
        public object Get(int idProyecto, int tipo, string token)
        {

            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaArmadoBD.Instance.ObtenerTuberoXProyecto(usuario, idProyecto, tipo);
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
        public object Get(int idProyecto, string token)
        {

            string payload = "";
            string newToken = "";
            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);
                return CapturaArmadoBD.Instance.ObtenerTallerXPoryecto(usuario, idProyecto);
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
        public object Post(Captura listaCapturaArmado, string token, string lenguaje)
        {
            string payload = "";
            string newToken = "";

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            // DetalleDatosJson[] ejemplo = serializer.Deserialize<DetalleDatosJson[]>(capturaArmado);


            bool tokenValido = ManageTokens.Instance.ValidateToken(token, out payload, out newToken);
            if (tokenValido)
            {
                foreach (DetalleGuardarJson item in listaCapturaArmado.Detalles)
                {
                    foreach (DetalleGuardarTrabajoAdicional detalleTrabajoAdicional in item.ListaDetalleTrabajoAdicional)
                    {
                        detalleTrabajoAdicional.JuntaID = detalleTrabajoAdicional.JuntaID == null ? item.JuntaID : detalleTrabajoAdicional.JuntaID;
                        detalleTrabajoAdicional.ObreroID = detalleTrabajoAdicional.ObreroID==0? int.Parse(item.TuberoID) : detalleTrabajoAdicional.ObreroID;
                        
                    }
                    item.FechaReporte = "";
                }
                Sam3_Usuario usuario = serializer.Deserialize<Sam3_Usuario>(payload);


                DataTable TabajosAdicionales=null;

                foreach (DetalleGuardarJson item in listaCapturaArmado.Detalles)
                {
                    if(TabajosAdicionales==null)
                    TabajosAdicionales = ArmadoController.ToDataTable(item.ListaDetalleTrabajoAdicional);
                    else
                    TabajosAdicionales.Merge(ArmadoController.ToDataTable(item.ListaDetalleTrabajoAdicional));
                    
                }

               

                DataTable dtDetalleCaptura = ArmadoController.ToDataTable(listaCapturaArmado.Detalles);
                dtDetalleCaptura.Columns.Remove("ListaDetalleTrabajoAdicional");
                return CapturaArmadoBD.Instance.InsertarCapturaArmado(dtDetalleCaptura, TabajosAdicionales, usuario,lenguaje);
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





