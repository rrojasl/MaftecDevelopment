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
    
    public partial class Sam3_JuntaArmadoTrabajoAdicional
    {
        public int ArmadoTrabajoAdicionalID { get; set; }
        public int JuntaArmadoID { get; set; }
        public int TrabajoAdicionalID { get; set; }
        public int ObreroID { get; set; }
        public string Observacion { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
    
        public virtual Sam3_JuntaArmado Sam3_JuntaArmado { get; set; }
        public virtual Sam3_Obrero Sam3_Obrero { get; set; }
        public virtual Sam3_TrabajoAdicional Sam3_TrabajoAdicional { get; set; }
    }
}
