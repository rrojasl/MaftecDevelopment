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
    
    public partial class Sam3_Obrero
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_Obrero()
        {
            this.Sam3_InspeccionDimensional = new HashSet<Sam3_InspeccionDimensional>();
            this.Sam3_InspeccionVisual = new HashSet<Sam3_InspeccionVisual>();
            this.Sam3_JuntaArmado = new HashSet<Sam3_JuntaArmado>();
            this.Sam3_JuntaArmadoTrabajoAdicional = new HashSet<Sam3_JuntaArmadoTrabajoAdicional>();
            this.Sam3_JuntaSoldaduraSoldado = new HashSet<Sam3_JuntaSoldaduraSoldado>();
            this.Sam3_JuntaSoldaduraTrabajoAdicional = new HashSet<Sam3_JuntaSoldaduraTrabajoAdicional>();
            this.Sam3_PinturaSpool_Obrero = new HashSet<Sam3_PinturaSpool_Obrero>();
            this.Sam3_ObreroUbicacion = new HashSet<Sam3_ObreroUbicacion>();
            this.Sam3_SoldadorCertificacion = new HashSet<Sam3_SoldadorCertificacion>();
        }
    
        public int ObreroID { get; set; }
        public int TipoObreroID { get; set; }
        public string Codigo { get; set; }
        public string NumeroEmpleado { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> IdentificadorMigra { get; set; }
        public Nullable<int> UsuarioID { get; set; }
        public string Nombre { get; set; }
        public string ApPaterno { get; set; }
        public string ApMaterno { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_InspeccionDimensional> Sam3_InspeccionDimensional { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_InspeccionVisual> Sam3_InspeccionVisual { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_JuntaArmado> Sam3_JuntaArmado { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_JuntaArmadoTrabajoAdicional> Sam3_JuntaArmadoTrabajoAdicional { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_JuntaSoldaduraSoldado> Sam3_JuntaSoldaduraSoldado { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_JuntaSoldaduraTrabajoAdicional> Sam3_JuntaSoldaduraTrabajoAdicional { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_PinturaSpool_Obrero> Sam3_PinturaSpool_Obrero { get; set; }
        public virtual Sam3_TipoObrero Sam3_TipoObrero { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_ObreroUbicacion> Sam3_ObreroUbicacion { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_SoldadorCertificacion> Sam3_SoldadorCertificacion { get; set; }
    }
}
