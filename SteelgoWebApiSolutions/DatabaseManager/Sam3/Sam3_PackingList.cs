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
    
    public partial class Sam3_PackingList
    {
        public Sam3_PackingList()
        {
            this.Sam3_FolioPackingList = new HashSet<Sam3_FolioPackingList>();
        }
    
        public int PackingListID { get; set; }
        public int ProyectoID { get; set; }
        public int FolioLlegadaID { get; set; }
        public Nullable<int> Consecutivo { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public int VehiculoID { get; set; }
    
        public virtual ICollection<Sam3_FolioPackingList> Sam3_FolioPackingList { get; set; }
        public virtual Sam3_Proyecto Sam3_Proyecto { get; set; }
        public virtual Sam3_Vehiculo Sam3_Vehiculo { get; set; }
        public virtual Sam3_FolioAvisoEntrada Sam3_FolioAvisoEntrada { get; set; }
    }
}
