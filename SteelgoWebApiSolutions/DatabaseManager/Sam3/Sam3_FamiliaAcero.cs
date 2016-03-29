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
    
    public partial class Sam3_FamiliaAcero
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_FamiliaAcero()
        {
            this.Sam3_Acero = new HashSet<Sam3_Acero>();
            this.Sam3_ItemCode = new HashSet<Sam3_ItemCode>();
            this.Sam3_Spool = new HashSet<Sam3_Spool>();
            this.Sam3_Spool1 = new HashSet<Sam3_Spool>();
            this.Sam3_JuntaSpool = new HashSet<Sam3_JuntaSpool>();
            this.Sam3_JuntaSpool1 = new HashSet<Sam3_JuntaSpool>();
        }
    
        public int FamiliaAceroID { get; set; }
        public int FamiliaMaterialID { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public bool VerificadoPorCalidad { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Acero> Sam3_Acero { get; set; }
        public virtual Sam3_FamiliaMaterial Sam3_FamiliaMaterial { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_ItemCode> Sam3_ItemCode { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Spool> Sam3_Spool { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Spool> Sam3_Spool1 { get; set; }
        public virtual ICollection<Sam3_JuntaSpool> Sam3_JuntaSpool { get; set; }
        public virtual ICollection<Sam3_JuntaSpool> Sam3_JuntaSpool1 { get; set; }
    }
}
