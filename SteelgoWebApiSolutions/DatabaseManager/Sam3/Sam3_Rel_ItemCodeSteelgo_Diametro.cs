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
    
    public partial class Sam3_Rel_ItemCodeSteelgo_Diametro
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_Rel_ItemCodeSteelgo_Diametro()
        {
            this.Sam3_Rel_ItemCode_ItemCodeSteelgo = new HashSet<Sam3_Rel_ItemCode_ItemCodeSteelgo>();
        }
    
        public int Rel_ItemCodeSteelgo_Diametro_ID { get; set; }
        public int ItemCodeSteelgoID { get; set; }
        public int Diametro1ID { get; set; }
        public int Diametro2ID { get; set; }
        public bool Activo { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
    
        public virtual Sam3_Diametro Sam3_Diametro { get; set; }
        public virtual Sam3_Diametro Sam3_Diametro1 { get; set; }
        public virtual Sam3_ItemCodeSteelgo Sam3_ItemCodeSteelgo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_ItemCode_ItemCodeSteelgo> Sam3_Rel_ItemCode_ItemCodeSteelgo { get; set; }
    }
}
