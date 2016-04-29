using BackEndSAM.Models.Soldadura;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.CatalogosGeneralesBD
{
    public class ColadaBD
    {
        private static readonly object _mutex = new object();
        private static ColadaBD _instance;

        public static ColadaBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ColadaBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerListadoColada(int proyecto)
        {
            try
            {
                List<Colada> listaColada = new List<Colada>();

                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Colada_Result> result = ctx.Sam3_Steelgo_Get_Colada(proyecto).ToList();
                    foreach (Sam3_Steelgo_Get_Colada_Result item in result)
                    {
                        listaColada.Add(new Colada
                        {
                            ColadaID = item.ColadaID,
                            NumeroColada = item.NumeroColada
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