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
    
    public partial class Sam3_Rel_FolioAvisoLlegada_Documento
    {
        public int Rel_FolioAvisoLlegada_DocumentoID { get; set; }
        public int FolioAvisoLlegadaID { get; set; }
        public int DocumentoID { get; set; }
        public string Nombre { get; set; }
        public string Extencion { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<System.Guid> DocGuid { get; set; }
        public string Url { get; set; }
        public int TipoArchivoID { get; set; }
        public string ContentType { get; set; }
    
        public virtual Sam3_FolioAvisoLlegada Sam3_FolioAvisoLlegada { get; set; }
        public virtual Sam3_TipoArchivo Sam3_TipoArchivo { get; set; }
    }
}
