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

       
    }
}