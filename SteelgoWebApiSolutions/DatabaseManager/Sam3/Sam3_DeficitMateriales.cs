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
    
    public partial class Sam3_DeficitMateriales
    {
        public int DeficitID { get; set; }
        public int OrdenTrabajoID { get; set; }
        public int ItemCodeID { get; set; }
        public Nullable<int> SpoolID { get; set; }
        public int Deficit { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public bool Solucionado { get; set; }
    }
}
