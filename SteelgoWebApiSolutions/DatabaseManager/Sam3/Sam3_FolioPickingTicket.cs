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
    
    public partial class Sam3_FolioPickingTicket
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_FolioPickingTicket()
        {
            this.Sam3_Entrega = new HashSet<Sam3_Entrega>();
        }
    
        public int FolioPickingTicketID { get; set; }
        public int TipoMaterialID { get; set; }
        public int DespachoID { get; set; }
        public Nullable<int> usuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public bool Activo { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Entrega> Sam3_Entrega { get; set; }
        public virtual Sam3_TipoMaterial Sam3_TipoMaterial { get; set; }
    }
}
