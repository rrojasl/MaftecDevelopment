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
    
    public partial class Sam3_Catalogos
    {
        public Sam3_Catalogos()
        {
            this.Sam3_Rel_Catalogos_Documento = new HashSet<Sam3_Rel_Catalogos_Documento>();
            this.Sam3_TipoArchivo_Catalogo = new HashSet<Sam3_TipoArchivo_Catalogo>();
        }
    
        public int CatalogoID { get; set; }
        public string CatalogoNombre { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        public virtual ICollection<Sam3_Rel_Catalogos_Documento> Sam3_Rel_Catalogos_Documento { get; set; }
        public virtual ICollection<Sam3_TipoArchivo_Catalogo> Sam3_TipoArchivo_Catalogo { get; set; }
    }
}