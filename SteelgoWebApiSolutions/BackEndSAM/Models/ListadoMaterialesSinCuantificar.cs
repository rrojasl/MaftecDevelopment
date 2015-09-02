﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEndSAM.Models
{
    public class ListadoMaterialesSinCuantificar
    {
        public string FolioAvisoEntrada { get; set; }
        public string FechaDescarga { get; set; }
        public string Cliente { get; set; }
    }

    /// <summary>
    /// Folios de cuantificacion que no han sido cerrados
    /// </summary>
    public class ListadoPLporCuantificar
    {
        public string Proyecto { get; set; }
        public string FolioAvisoEntrada { get; set; }
        public string FechaDescarga { get; set; }
        public string FechaCreacionPackingList { get; set; }
        public string PackingList { get; set; }
    }

    /// <summary>
    /// ItemCodes que no tienen un relacion con un ItemCodeSteelgo
    /// </summary>
    public class ListadoMTLSinICS
    {
        public string Proyecto { get; set; }
        public string FechaCreacionPackingList { get; set; }
        public string PackingList { get; set; }
        public string CantidadTotalItems { get; set; }
        public string CantidadSinICS { get; set; }
    }

    /// <summary>
    /// Numeros unicos con Orden de recepcion pero sin complemento de recepcion
    /// </summary>
    public class ListadoNUPorRecepcionar
    {
        public string FechaOrdenRecepcion { get; set; }
        public string OrdenRecepcion { get; set; }
        public string CantidadNUEnOrdenRecepcion { get; set; }
        public string CantidadNUSinComplemento { get; set; }
    }

    /// <summary>
    /// Numeros Unicos con orden de almacenaje pero que no se ha registrado el campo Rack
    /// </summary>
    public class ListadoNUSinAlmacenar
    {
        public string FechaOrdenRecepcion { get; set; }
        public string OrdenRecepcion { get; set; }
        public string CantidadNUEnOrdenRecepcion { get; set; }
        public string CantidadNUporAlmacenar { get; set; }
    }

    public class ListadoIncidenciasAbiertas
    {
        public string NumeroUnico { get; set; }
        public string CantidadIncidencias { get; set; }
    }
}