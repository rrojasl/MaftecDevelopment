﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace BackEndSAM.Models.Armado
{
    public class CapturaArmado
    {
        public string NumeroControl { get; set; }
        public string Junta { get; set; }

        public string FechaControl { get; set; }

        public string Tubero { get; set; }

        public string Taller { get; set; }

    }

    public class IdOrdenTrabajo
    {
        public string OrdenTrabajo { get; set; }
        public List<IDS> idStatus { get; set; }
    }

    public class IDS
    {
        public string Status { get; set; }

        public string IDValido { get; set; }

        public int Valor { get; set; }

        public string Proyecto { get; set; }

        public int ProyectoID { get; set; }
        public int HabilitadoHoldFecha { get; set; }
    }

    public class CamposPredeterminados
    {
        public string FechaArmado { get; set; }

        public string Muestra { get; set; }

        public string Llena { get; set; }

        public string FormatoFecha { get; set; }

        public string TipoCaptura { get; set; }

    }



    public class DetalleDatosJson
    {
        public int Accion { get; set; }
        public int JuntaTrabajoID { get; set; }
        public int JuntaArmadoID { get; set; }
        public int IDProyecto { get; set; }
        public string Proyecto { get; set; }
        public string IdOrdenTrabajo { get; set; }
        public string OrdenTrabajo { get; set; }
        public string IdVal { get; set; }
        public string IdText { get; set; }
        public string SpoolID { get; set; }
        public string JuntaID { get; set; }
        public string Junta { get; set; }
        public int TipoJuntaID { get; set; }
        public string FechaArmado { get; set; }
        public string TuberoID { get; set; }
        public string Tubero { get; set; }
        public List<Tubero> ListaTubero { get; set; }
        public string TallerID { get; set; }
        public string Taller { get; set; }
        public List<Taller> ListaTaller { get; set; }
        public string TipoJunta { get; set; }
        public string Diametro { get; set; }
        public string Cedula { get; set; }
        public string Localizacion { get; set; }
        public string FamiliaAcero { get; set; }
        public string NumeroUnico1ID { get; set; }
        public string NumeroUnico1 { get; set; }
        public string NumeroUnico2ID { get; set; }
        public string NumeroUnico2 { get; set; }
        public string TemplateMensajeTrabajosAdicionales { get; set; }
        public List<NumeroUnico> ListaNumerosUnicos1 { get; set; }
        public List<NumeroUnico> ListaNumerosUnicos2 { get; set; }
        public string SinCaptura { get; set; }
        public List<DetalleTrabajoAdicional> ListaDetalleTrabajoAdicional { get; set; }
        public List<TrabajosAdicionalesXJunta> listadoTrabajosAdicionalesXJunta { get; set; }
        public string DetalleJunta { get; set; }

    }



    public class Taller
    {
        public int TallerID { get; set; }
        public string Nombre { get; set; }

        public Taller()
        {
            TallerID = 0;
            Nombre = "";
        }
    }

    public class Tubero
    {
        public int ObreroID { get; set; }
        public string Codigo { get; set; }

        public Tubero()
        {
            ObreroID = 0;
            Codigo = "";
        }
    }

    public class NumeroUnico
    {
        public int NumeroUnicoID { get; set; }
        public string Clave { get; set; }

        public int EtiquetaMaterial { get; set; }

        public string Etiqueta { get; set; }

        public string JuntasEncontradas { get; set; }

        public NumeroUnico()
        {
            NumeroUnicoID = 0;
            Clave = "";
            EtiquetaMaterial = 0;
            Etiqueta = "";
            JuntasEncontradas = "";

        }
    }
    public class DetalleTrabajoAdicional
    {
        [Key]
        public int IdTrabajoAdicional { get; set; }
        public int Accion { get; set; }
        public int ArmadoTrabajoAdicionalID { get; set; }
        public int JuntaArmadoID { get; set; }
        public int TrabajoAdicionalID { get; set; }
        public string TrabajoAdicional { get; set; }
        public int ObreroID { get; set; }
        public string Tubero { get; set; }
        public string Observacion { get; set; }
    }

    public class TrabajosAdicionalesXJunta
    {
        public int TrabajoAdicionalID { get; set; }
        public string NombreCorto { get; set; }
        public string SignoInformativo { get; set; } //para saber si 
    }

    public class Captura
    {
        public List<DetalleGuardarJson> Detalles { get; set; }
    }

    public class CapturaJuntas
    {
        public List<DetalleDatosJson> Detalles { get; set; }
    }
    public class DetalleGuardarJson
    {
        public int Accion { get; set; }
        public string IdVal { get; set; }
        public string JuntaID { get; set; }
        public int TipoJuntaID { get; set; }
        public string Junta { get; set; }
        public string Localizacion1 { get; set; }
        public string Localizacion2 { get; set; }
        public int JuntaArmadoID { get; set; }
        public int JuntaTrabajoID { get; set; }
        public string NumeroUnico1ID { get; set; }
        public string NumeroUnico2ID { get; set; }
        public string TallerID { get; set; }
        public string TuberoID { get; set; }
        public string FechaArmado { get; set; }
        public string FechaReporte { get; set; }

        public List<DetalleGuardarTrabajoAdicional> ListaDetalleTrabajoAdicional { get; set; }



    }

    public class DetalleGuardarTrabajoAdicional
    {

        public int Accion { get; set; }
        public string JuntaID { get; set; }
        public int ArmadoTrabajoAdicionalID { get; set; }
        public int JuntaArmadoID { get; set; }
        public int TrabajoAdicionalID { get; set; }
        public int ObreroID { get; set; }
        public string Observacion { get; set; }
    }
}