﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class CuantificacionListado
    {
        public string ItemCode { get; set; }
        public string BultoID { get; set; }
        public string Descripcion { get; set; }
        public decimal? D1 { get; set; }
        public decimal? D2 { get; set; }
        public int ItemCodeSteelgo { get; set; }
        public string Familia { get; set; }
        //public int FamiliaID { get; set; }
        public int FamiliaMaterialID { get; set; }
        public string Cedula { get; set; }
        public string TipoAcero { get; set; }
        //public int ColadaID { get; set; }
        public string Colada { get; set; }
        public int? Cantidad { get; set; }
        public decimal Peso { get; set; }
        public int TipoMaterial { get; set; }
        public int? MM { get; set; }
        public string Detallar { get; set; }
        public string TieneNU { get; set; }
        public bool TieneError { get; set; }
    }
}