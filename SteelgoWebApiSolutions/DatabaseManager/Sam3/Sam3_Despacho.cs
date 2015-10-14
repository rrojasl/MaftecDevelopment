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
    
    public partial class Sam3_Despacho
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_Despacho()
        {
            this.Sam3_Rel_Incidencia_Despacho = new HashSet<Sam3_Rel_Incidencia_Despacho>();
        }
    
        public int DespachoID { get; set; }
        public int ProyectoID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public int MaterialSpoolID { get; set; }
        public int NumeroUnicoID { get; set; }
        public Nullable<int> SalidaInventarioID { get; set; }
        public string Segmento { get; set; }
        public Nullable<bool> EsEquivalente { get; set; }
        public Nullable<int> Cantidad { get; set; }
        public Nullable<bool> Cancelado { get; set; }
        public Nullable<System.DateTime> FechaDespacho { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> DespachadorID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_Incidencia_Despacho> Sam3_Rel_Incidencia_Despacho { get; set; }
    }
}
