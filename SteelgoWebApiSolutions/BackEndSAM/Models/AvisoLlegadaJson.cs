﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackEndSAM.Models
{
    public class AvisoLlegadaJson
    {
        public int FolioAvisoLlegadaID { get; set; }
        public string Factura { get; set; }
        public string FechaRecepcion { get; set; }
        public string OrdenCompra { get; set; }
        public TractoAV Tracto { get; set; }
        public List<ProyectosAV> Proyectos { get; set; }
        public List<TransportistaAV> Transportista { get; set; }
        public List<ProveedorAV> Proveedor { get; set; }
        public List<PlanaAV> Plana { get; set; }
        public List<PatioAV> Patio { get; set; }
        public List<ChoferAV> Chofer { get; set; }
        public List<ArchivosAV> Archivos { get; set; }
        public List<PermisoAduanaAV> PermisoAduana { get; set; }
        public List<PaseSalidaAV> PaseSalida { get; set; }

        public AvisoLlegadaJson()
        {
            Proyectos = new List<ProyectosAV>();
            Transportista = new List<TransportistaAV>();
            Proveedor = new List<ProveedorAV>();
            Plana = new List<PlanaAV>();
            Patio = new List<PatioAV>();
            Chofer = new List<ChoferAV>();
            Archivos = new List<ArchivosAV>();
            PermisoAduana = new List<PermisoAduanaAV>();
            PaseSalida = new List<PaseSalidaAV>();
            Tracto = new TractoAV();
        }
    }

    public class TractoAV
    {
        public string VehiculoID { get; set; }
        public string Placas { get; set; }
    }

    public class ProyectosAV
    {
        public int ProyectoID { get; set; }
    }

    public class TransportistaAV
    {
        public int TransportistaID { get; set; }
        public string Nombre { get; set; }
    }

    public class ProveedorAV
    {
        public int ProveedorID { get; set; }
        public string Nombre { get; set; }
    }

    public class PlanaAV
    {
        public int PlanaID { get; set; }
    }

    public class PatioAV
    {
        public int PatioID { get; set; }
        public string Nombre { get; set; }
    }

    public class ChoferAV
    {
        public int ChoferID { get; set; }
        public string Nombre { get; set; }
    }

    public class ArchivosAV
    {
        public int ArchivoID { get; set; }
        public string Nombre { get; set; }
        public string Extension { get; set; }
        public string TipoArchivo { get; set; }
    }

    public class PermisoAduanaAV
    {
        public bool PermisoAutorizado { get; set; }
        public bool PermisoTramite { get; set; }
        public string NumeroPermiso { get; set; }
        public List<ArchivoAutorizadoAV> ArchivoAutorizado { get; set; }
        public string FechaAutorizacion { get; set; }
        public string FechaGeneracion { get; set; }
        
        public PermisoAduanaAV()
        {
            ArchivoAutorizado = new List<ArchivoAutorizadoAV>();
        }
    }

    public class ArchivoAutorizadoAV
    {
        public int ArchivoID { get; set; }
        public string Nombre { get; set; }
        public string Extension { get; set; }
    }

    public class PaseSalidaAV
    {
        public bool PaseSalidaEnviado { get; set; }
        public List<ArchivosPaseSalida> Archivos { get; set; }

        public PaseSalidaAV()
        {
            Archivos = new List<ArchivosPaseSalida>();
        }
    }

    public class ArchivosPaseSalida
    {
        public string Nombre { get; set; }
        public string Extension { get; set; }
        public string ArchivoID { get; set; }
    }


}
