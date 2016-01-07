﻿using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.DataAcces.PinturaBD.CargaCarroBackLogBD
{
    public class CargaCarroBackLogBD
    {
        private static readonly object _mutex = new object();
        private static CargaCarroBackLogBD _instance;

        public static CargaCarroBackLogBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new CargaCarroBackLogBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerCarro()
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Steelgo_Get_Area_Result> result = ctx.Sam3_Steelgo_Get_Area().ToList();
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