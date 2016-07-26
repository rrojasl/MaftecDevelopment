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
    
    public partial class Sam3_Usuario
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_Usuario()
        {
            this.Sam3_Incidencia = new HashSet<Sam3_Incidencia>();
            this.Sam3_Incidencia1 = new HashSet<Sam3_Incidencia>();
            this.Sam3_Incidencia2 = new HashSet<Sam3_Incidencia>();
            this.Sam3_Rel_Usuario_Preferencia = new HashSet<Sam3_Rel_Usuario_Preferencia>();
            this.Sam3_Rel_Usuario_Proyecto = new HashSet<Sam3_Rel_Usuario_Proyecto>();
            this.Sam3_Sesion = new HashSet<Sam3_Sesion>();
            this.Sam3_ColaCreacionNumerosUnicos = new HashSet<Sam3_ColaCreacionNumerosUnicos>();
            this.Sam3_UsuariosNotificaciones = new HashSet<Sam3_UsuariosNotificaciones>();
        }
    
        public int UsuarioID { get; set; }
        public int PerfilID { get; set; }
        public string NombreUsuario { get; set; }
        public string ContrasenaHash { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public bool BloqueadoPorAdministracion { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<System.Guid> Sam2UserID { get; set; }
        public Nullable<int> ProveedorID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Incidencia> Sam3_Incidencia { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Incidencia> Sam3_Incidencia1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Incidencia> Sam3_Incidencia2 { get; set; }
        public virtual Sam3_Perfil Sam3_Perfil { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_Usuario_Preferencia> Sam3_Rel_Usuario_Preferencia { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_Usuario_Proyecto> Sam3_Rel_Usuario_Proyecto { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Sesion> Sam3_Sesion { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_ColaCreacionNumerosUnicos> Sam3_ColaCreacionNumerosUnicos { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_UsuariosNotificaciones> Sam3_UsuariosNotificaciones { get; set; }
    }
}
