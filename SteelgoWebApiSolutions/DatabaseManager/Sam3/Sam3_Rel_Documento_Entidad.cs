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
    
    public partial class Sam3_Rel_Documento_Entidad
    {
        public int TipoDocumentoID { get; set; }
        public Nullable<int> EntidadID { get; set; }
        public Nullable<int> RepositorioID { get; set; }
        public Nullable<int> UsuarioID { get; set; }
        public string Identificador { get; set; }
        public Nullable<System.DateTime> FechaSubida { get; set; }
        public Nullable<bool> Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        public virtual Sam3_Entidad Sam3_Entidad { get; set; }
        public virtual Sam3_Repositorio Sam3_Repositorio { get; set; }
        public virtual Sam3_TipoDocumento Sam3_TipoDocumento { get; set; }
    }
}
