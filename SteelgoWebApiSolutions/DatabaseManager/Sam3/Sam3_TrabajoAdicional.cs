//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatabaseManager.Sam3
{
    using System;
    using System.Collections.Generic;
    
    public partial class Sam3_TrabajoAdicional
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_TrabajoAdicional()
        {
            this.Sam3_JuntaArmadoTrabajoAdicional = new HashSet<Sam3_JuntaArmadoTrabajoAdicional>();
            this.Sam3_JuntaSoldaduraTrabajoAdicional = new HashSet<Sam3_JuntaSoldaduraTrabajoAdicional>();
        }
    
        public int TrabajoAdicionalID { get; set; }
        public int TipoTrabajoAdicionalID { get; set; }
        public string NombreCorto { get; set; }
        public string NombreExtendido { get; set; }
        public string CuentaContable { get; set; }
        public string SignoInformativo { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_JuntaArmadoTrabajoAdicional> Sam3_JuntaArmadoTrabajoAdicional { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_JuntaSoldaduraTrabajoAdicional> Sam3_JuntaSoldaduraTrabajoAdicional { get; set; }
        public virtual Sam3_TipoTrabajoAdicional Sam3_TipoTrabajoAdicional { get; set; }
    }
}
