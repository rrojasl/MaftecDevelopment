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
    
    public partial class Sam3_OrdenAlmacenaje
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_OrdenAlmacenaje()
        {
            this.Sam3_Rel_Incidencia_OrdenAlmacenaje = new HashSet<Sam3_Rel_Incidencia_OrdenAlmacenaje>();
            this.Sam3_Rel_OrdenAlmacenaje_NumeroUnico = new HashSet<Sam3_Rel_OrdenAlmacenaje_NumeroUnico>();
        }
    
        public int OrdenAlmacenajeID { get; set; }
        public int Folio { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public bool Activo { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<int> Rel_Proyecto_Entidad_Configuracion_ID { get; set; }
        public Nullable<int> Consecutivo { get; set; }
    
        public virtual Sam3_Rel_Proyecto_Entidad_Configuracion Sam3_Rel_Proyecto_Entidad_Configuracion { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_Incidencia_OrdenAlmacenaje> Sam3_Rel_Incidencia_OrdenAlmacenaje { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_OrdenAlmacenaje_NumeroUnico> Sam3_Rel_OrdenAlmacenaje_NumeroUnico { get; set; }
    }
}
