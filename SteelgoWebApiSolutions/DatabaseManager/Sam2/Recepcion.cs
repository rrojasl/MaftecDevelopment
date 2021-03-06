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
    
    public partial class Recepcion
    {
        public Recepcion()
        {
            this.RecepcionNumeroUnico = new HashSet<RecepcionNumeroUnico>();
        }
    
        public int RecepcionID { get; set; }
        public int ProyectoID { get; set; }
        public int TransportistaID { get; set; }
        public System.DateTime FechaRecepcion { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
        public string CampoLibre1 { get; set; }
        public string CampoLibre2 { get; set; }
        public string CampoLibre3 { get; set; }
        public string CampoLibre4 { get; set; }
        public string CampoLibre5 { get; set; }
    
        public virtual aspnet_Users aspnet_Users { get; set; }
        public virtual Proyecto Proyecto { get; set; }
        public virtual Transportista Transportista { get; set; }
        public virtual ICollection<RecepcionNumeroUnico> RecepcionNumeroUnico { get; set; }
    }
}
