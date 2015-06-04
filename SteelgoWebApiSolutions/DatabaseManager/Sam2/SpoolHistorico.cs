//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatabaseManager.Sam2
{
    using System;
    using System.Collections.Generic;
    
    public partial class SpoolHistorico
    {
        public SpoolHistorico()
        {
            this.CorteSpoolHistorico = new HashSet<CorteSpoolHistorico>();
            this.JuntaSpoolHistorico = new HashSet<JuntaSpoolHistorico>();
            this.MaterialSpoolHistorico = new HashSet<MaterialSpoolHistorico>();
        }
    
        public int SpoolHistoricoID { get; set; }
        public int SpoolID { get; set; }
        public int ProyectoID { get; set; }
        public int FamiliaAcero1ID { get; set; }
        public Nullable<int> FamiliaAcero2ID { get; set; }
        public string Nombre { get; set; }
        public string Dibujo { get; set; }
        public string Especificacion { get; set; }
        public string Cedula { get; set; }
        public Nullable<decimal> Pdis { get; set; }
        public Nullable<decimal> DiametroPlano { get; set; }
        public Nullable<decimal> Peso { get; set; }
        public Nullable<decimal> Area { get; set; }
        public Nullable<int> PorcentajePnd { get; set; }
        public bool RequierePwht { get; set; }
        public bool PendienteDocumental { get; set; }
        public bool AprobadoParaCruce { get; set; }
        public Nullable<int> Prioridad { get; set; }
        public string Revision { get; set; }
        public string RevisionCliente { get; set; }
        public string Segmento1 { get; set; }
        public string Segmento2 { get; set; }
        public string Segmento3 { get; set; }
        public string Segmento4 { get; set; }
        public string Segmento5 { get; set; }
        public string Segmento6 { get; set; }
        public string Segmento7 { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
        public string SistemaPintura { get; set; }
        public string ColorPintura { get; set; }
        public string CodigoPintura { get; set; }
        public string ProyectoNombre { get; set; }
        public string FamiliaAcero1Nombre { get; set; }
        public string FamiliaAcero2Nombre { get; set; }
        public Nullable<bool> TieneHoldIngenieria { get; set; }
        public Nullable<bool> TieneHoldCalidad { get; set; }
        public Nullable<bool> Confinado { get; set; }
    
        public virtual ICollection<CorteSpoolHistorico> CorteSpoolHistorico { get; set; }
        public virtual ICollection<JuntaSpoolHistorico> JuntaSpoolHistorico { get; set; }
        public virtual ICollection<MaterialSpoolHistorico> MaterialSpoolHistorico { get; set; }
    }
}
