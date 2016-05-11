using BackEndSAM.Models.Embarque.CargaEmbarque;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.CatalogosGeneralesBD
{
    public class ContactosBD
    {
        private static readonly object _mutex = new object();
        private static ContactosBD _instance;

        public static ContactosBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ContactosBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoContactos(int proyecto)
        {
            try
            {
                List<Contactos> listaColada = new List<Contactos>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Contactos_Result> result = ctx.Sam3_Steelgo_Get_Contactos().ToList();
                    foreach (Sam3_Steelgo_Get_Contactos_Result item in result)
                    {
                        listaColada.Add(new Contactos
                        {
                            ContactoID = item.ContactoID,
                            Nombre = item.Nombre
                        });
                    }
                    return listaColada;
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