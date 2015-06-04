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
    
    public partial class Diametro
    {
        public Diametro()
        {
            this.CostoArmado = new HashSet<CostoArmado>();
            this.CostoProcesoRaiz = new HashSet<CostoProcesoRaiz>();
            this.CostoProcesoRelleno = new HashSet<CostoProcesoRelleno>();
            this.Espesor = new HashSet<Espesor>();
            this.KgTeorico = new HashSet<KgTeorico>();
            this.Peq = new HashSet<Peq>();
        }
    
        public int DiametroID { get; set; }
        public decimal Valor { get; set; }
        public bool VerificadoPorCalidad { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual aspnet_Users aspnet_Users { get; set; }
        public virtual ICollection<CostoArmado> CostoArmado { get; set; }
        public virtual ICollection<CostoProcesoRaiz> CostoProcesoRaiz { get; set; }
        public virtual ICollection<CostoProcesoRelleno> CostoProcesoRelleno { get; set; }
        public virtual ICollection<Espesor> Espesor { get; set; }
        public virtual ICollection<KgTeorico> KgTeorico { get; set; }
        public virtual ICollection<Peq> Peq { get; set; }
    }
}
