//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatabaseManager.Sam3
{
    using System;
    using System.Collections.Generic;
    
    public partial class Sam3_EstatusOrden
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_EstatusOrden()
        {
            this.Sam3_OrdenTrabajo = new HashSet<Sam3_OrdenTrabajo>();
        }
    
        public int EstatusOrdenID { get; set; }
        public string Nombre { get; set; }
        public string NombreIngles { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_OrdenTrabajo> Sam3_OrdenTrabajo { get; set; }
    }
}
