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
    
    public partial class Sam3_Rel_Vehiculo_Transportista
    {
        public int Rel_Vehiculo_Transportista_ID { get; set; }
        public int VehiculoID { get; set; }
        public int TransportistaID { get; set; }
        public bool Activo { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
    
        public virtual Sam3_Transportista Sam3_Transportista { get; set; }
        public virtual Sam3_Vehiculo Sam3_Vehiculo { get; set; }
    }
}
