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
    
    public partial class Sam3_TipoArchivo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_TipoArchivo()
        {
            this.Sam3_Rel_FolioAvisoLlegada_Documento = new HashSet<Sam3_Rel_FolioAvisoLlegada_Documento>();
            this.Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo = new HashSet<Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo>();
            this.Sam3_Rel_PermisoAduana_Documento = new HashSet<Sam3_Rel_PermisoAduana_Documento>();
        }
    
        public int TipoArchivoID { get; set; }
        public string Nombre { get; set; }
        public bool Activo { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_FolioAvisoLlegada_Documento> Sam3_Rel_FolioAvisoLlegada_Documento { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo> Sam3_Rel_FolioAvisoLlegada_PaseSalida_Archivo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_PermisoAduana_Documento> Sam3_Rel_PermisoAduana_Documento { get; set; }
    }
}
