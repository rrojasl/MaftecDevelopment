﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BackEndSAM.DataAcces;
using SecurityManager.Api.Models;

namespace BackEndSAM.Utilities
{
    public class Conversiones
    {

        private static readonly object _mutex = new object();
        private static Conversiones _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private Conversiones()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static Conversiones Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new Conversiones();
                    }
                }
                return _instance;
            }
        }

        public string FormatearCadenasdeElementos(string cadena)
        {
            try
            {
                string resultado = "";
                string[] elemntos = cadena.Split(',').ToArray();
                int digitos = Convert.ToInt32(elemntos[1]);
                int consecutivo = Convert.ToInt32(elemntos[2]);
                string formato = "D" + digitos.ToString();
                resultado = elemntos[0].Trim() + consecutivo.ToString(formato).Trim() + elemntos[3].Trim();
                return resultado;
            }
            catch (Exception ex)
            {
                return "";
            }
        }
    }
}