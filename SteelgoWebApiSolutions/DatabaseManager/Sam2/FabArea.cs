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
    
    public partial class FabArea
    {
        public FabArea()
        {
            this.JuntaSpool = new HashSet<JuntaSpool>();
            this.JuntaSpoolPendiente = new HashSet<JuntaSpoolPendiente>();
        }
    
        public int FabAreaID { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
    
        public virtual aspnet_Users aspnet_Users { get; set; }
        public virtual ICollection<JuntaSpool> JuntaSpool { get; set; }
        public virtual ICollection<JuntaSpoolPendiente> JuntaSpoolPendiente { get; set; }
    }
}
