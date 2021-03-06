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
    
    public partial class JuntaCampo
    {
        public JuntaCampo()
        {
            this.JuntaCampo1 = new HashSet<JuntaCampo>();
            this.JuntaCampoArmado1 = new HashSet<JuntaCampoArmado>();
            this.JuntaCampoInspeccionVisual1 = new HashSet<JuntaCampoInspeccionVisual>();
            this.JuntaCampoReportePND = new HashSet<JuntaCampoReportePND>();
            this.JuntaCampoReporteTT = new HashSet<JuntaCampoReporteTT>();
            this.JuntaCampoRequisicion = new HashSet<JuntaCampoRequisicion>();
            this.JuntaCampoSoldadura1 = new HashSet<JuntaCampoSoldadura>();
        }
    
        public int JuntaCampoID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public int JuntaSpoolID { get; set; }
        public string EtiquetaJunta { get; set; }
        public Nullable<bool> ArmadoAprobado { get; set; }
        public Nullable<bool> SoldaduraAprobada { get; set; }
        public Nullable<bool> InspeccionVisualAprobada { get; set; }
        public Nullable<int> JuntaCampoArmadoID { get; set; }
        public Nullable<int> JuntaCampoSoldaduraID { get; set; }
        public Nullable<int> JuntaCampoInspeccionVisualID { get; set; }
        public Nullable<int> VersionJunta { get; set; }
        public Nullable<int> JuntaCampoAnteriorID { get; set; }
        public bool JuntaFinal { get; set; }
        public Nullable<int> UltimoProcesoID { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual aspnet_Users aspnet_Users { get; set; }
        public virtual ICollection<JuntaCampo> JuntaCampo1 { get; set; }
        public virtual JuntaCampo JuntaCampo2 { get; set; }
        public virtual JuntaCampoArmado JuntaCampoArmado { get; set; }
        public virtual JuntaCampoInspeccionVisual JuntaCampoInspeccionVisual { get; set; }
        public virtual JuntaCampoSoldadura JuntaCampoSoldadura { get; set; }
        public virtual JuntaSpool JuntaSpool { get; set; }
        public virtual OrdenTrabajoSpool OrdenTrabajoSpool { get; set; }
        public virtual UltimoProceso UltimoProceso { get; set; }
        public virtual ICollection<JuntaCampoArmado> JuntaCampoArmado1 { get; set; }
        public virtual ICollection<JuntaCampoInspeccionVisual> JuntaCampoInspeccionVisual1 { get; set; }
        public virtual ICollection<JuntaCampoReportePND> JuntaCampoReportePND { get; set; }
        public virtual ICollection<JuntaCampoReporteTT> JuntaCampoReporteTT { get; set; }
        public virtual ICollection<JuntaCampoRequisicion> JuntaCampoRequisicion { get; set; }
        public virtual ICollection<JuntaCampoSoldadura> JuntaCampoSoldadura1 { get; set; }
    }
}
