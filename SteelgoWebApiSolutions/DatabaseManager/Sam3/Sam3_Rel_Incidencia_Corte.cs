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
    
    public partial class Sam3_Rel_Incidencia_Corte
    {
        public int Rel_Incidencia_Corte_ID { get; set; }
        public int IncidenciaID { get; set; }
        public int CorteID { get; set; }
        public bool Activo { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
    
        public virtual Sam3_Corte Sam3_Corte { get; set; }
        public virtual Sam3_Incidencia Sam3_Incidencia { get; set; }
    }
}
