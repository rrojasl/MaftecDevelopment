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
    
    public partial class Wps
    {
        public Wps()
        {
            this.JuntaCampoSoldadura = new HashSet<JuntaCampoSoldadura>();
            this.JuntaCampoSoldadura1 = new HashSet<JuntaCampoSoldadura>();
            this.JuntaSoldadura = new HashSet<JuntaSoldadura>();
            this.JuntaSoldadura1 = new HashSet<JuntaSoldadura>();
            this.Wpq = new HashSet<Wpq>();
            this.WpsProyecto = new HashSet<WpsProyecto>();
        }
    
        public int WpsID { get; set; }
        public string Nombre { get; set; }
        public int MaterialBase1ID { get; set; }
        public Nullable<int> MaterialBase2ID { get; set; }
        public int ProcesoRaizID { get; set; }
        public int ProcesoRellenoID { get; set; }
        public Nullable<decimal> EspesorRaizMaximo { get; set; }
        public Nullable<decimal> EspesorRellenoMaximo { get; set; }
        public bool RequierePwht { get; set; }
        public bool RequierePreheat { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual aspnet_Users aspnet_Users { get; set; }
        public virtual FamiliaAcero FamiliaAcero { get; set; }
        public virtual FamiliaAcero FamiliaAcero1 { get; set; }
        public virtual ICollection<JuntaCampoSoldadura> JuntaCampoSoldadura { get; set; }
        public virtual ICollection<JuntaCampoSoldadura> JuntaCampoSoldadura1 { get; set; }
        public virtual ICollection<JuntaSoldadura> JuntaSoldadura { get; set; }
        public virtual ICollection<JuntaSoldadura> JuntaSoldadura1 { get; set; }
        public virtual ProcesoRaiz ProcesoRaiz { get; set; }
        public virtual ProcesoRelleno ProcesoRelleno { get; set; }
        public virtual ICollection<Wpq> Wpq { get; set; }
        public virtual ICollection<WpsProyecto> WpsProyecto { get; set; }
    }
}
