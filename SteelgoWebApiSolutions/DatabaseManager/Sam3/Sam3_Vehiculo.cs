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
    
    public partial class Sam3_Vehiculo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_Vehiculo()
        {
            this.Sam3_FolioAvisoLlegada = new HashSet<Sam3_FolioAvisoLlegada>();
            this.Sam3_Rel_FolioAvisoLlegada_Vehiculo = new HashSet<Sam3_Rel_FolioAvisoLlegada_Vehiculo>();
            this.Sam3_Rel_Vehiculo_Chofer = new HashSet<Sam3_Rel_Vehiculo_Chofer>();
            this.Sam3_Rel_Vehiculo_Transportista = new HashSet<Sam3_Rel_Vehiculo_Transportista>();
        }
    
        public int VehiculoID { get; set; }
        public int TipoVehiculoID { get; set; }
        public string Placas { get; set; }
        public string TarjetaCirculacion { get; set; }
        public string PolizaSeguro { get; set; }
        public string Unidad { get; set; }
        public string Modelo { get; set; }
        public Nullable<int> TractoID { get; set; }
        public bool Activo { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_FolioAvisoLlegada> Sam3_FolioAvisoLlegada { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_FolioAvisoLlegada_Vehiculo> Sam3_Rel_FolioAvisoLlegada_Vehiculo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_Vehiculo_Chofer> Sam3_Rel_Vehiculo_Chofer { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_Vehiculo_Transportista> Sam3_Rel_Vehiculo_Transportista { get; set; }
        public virtual Sam3_TipoVehiculo Sam3_TipoVehiculo { get; set; }
    }
}
