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
    
    public partial class Sam3_ItemCodeSteelgo
    {
        public Sam3_ItemCodeSteelgo()
        {
            this.Sam3_Rel_ItemCode_ItemCodeSteelgo = new HashSet<Sam3_Rel_ItemCode_ItemCodeSteelgo>();
        }
    
        public int ItemCodeSteelgoID { get; set; }
        public string DescripcionEspanol { get; set; }
        public string DescripcionIngles { get; set; }
        public decimal Peso { get; set; }
        public decimal Diametro1 { get; set; }
        public decimal Diametro2 { get; set; }
        public int FamiliaAceroID { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public int Area { get; set; }
        public string Cedula { get; set; }
    
        public virtual ICollection<Sam3_Rel_ItemCode_ItemCodeSteelgo> Sam3_Rel_ItemCode_ItemCodeSteelgo { get; set; }
    }
}