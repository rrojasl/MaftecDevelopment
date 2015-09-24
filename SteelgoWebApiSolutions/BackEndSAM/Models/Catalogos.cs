﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class Catalogos
    {
        public string Nombre { get; set; }
    }

    public class CatalogoPatio
    {
        public string PatioID { get; set; }
        public string Nombre { get; set; }
        public string Propietario { get; set; }
        public string Descripcion { get; set; }
    }

    public class CatalogoChofer
    {
        public string Nombre { get; set; }
        public string TransportistaNombre { get; set; }
    }
    
    public class CatalogoTransportista
    {
        public string Contacto { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
    }

    public class CatalogoTracto
    {
        public string Placas { get; set; }
        public string TarjetaCirculacion { get; set; }
        public string PolizaSeguro { get; set; }
    }

    public class CatalogoPlana
    {
        public string TractoID { get; set; }
        public string Placas { get; set; }
        public string Unidad { get; set; }
        public string Modelo { get; set; }
    }

    public class CatalogoProveedor
    {
        public string Contacto { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
    }

    public class CatalogoAcero
    {
        public string FamiliaAcero { get; set; }
        public string Nomenclatura { get; set; }
        public string VerificadoPorCalidad { get; set; }

    }

    public class CatalogoColadas
    {
        public string Fabricante { get; set; }
        public string Acero { get; set; }
        public string Proyecto { get; set; }
        public string NumeroColada { get; set; }
        public string NumeroCertificado { get; set; }
        public string HoldCalidad { get; set; }
    }

    public class CatalogoFamiliaMaterial
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
    }

    public class CatalogoFamiliaAcero
    {
        public string FamiliaMaterial { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string VerificadoPorCalidad { get; set; }
    }

    public class CatalogoFabricante
    {
        public string Contacto { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
    }
}