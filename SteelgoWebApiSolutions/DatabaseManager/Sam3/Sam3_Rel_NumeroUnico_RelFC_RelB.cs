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
    
    public partial class Sam3_Rel_NumeroUnico_RelFC_RelB
    {
        public int Rel_NumeroUnico_RelFC_RelB_ID { get; set; }
        public int NumeroUnicoID { get; set; }
        public Nullable<int> Rel_FolioCuantificacion_ItemCode_ID { get; set; }
        public Nullable<int> Rel_Bulto_ItemCode_ID { get; set; }
        public bool Activo { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public int MM { get; set; }
        public Nullable<int> OrdenRecepcionID { get; set; }
    
        public virtual Sam3_NumeroUnico Sam3_NumeroUnico { get; set; }
        public virtual Sam3_OrdenRecepcion Sam3_OrdenRecepcion { get; set; }
        public virtual Sam3_Rel_Bulto_ItemCode Sam3_Rel_Bulto_ItemCode { get; set; }
        public virtual Sam3_Rel_FolioCuantificacion_ItemCode Sam3_Rel_FolioCuantificacion_ItemCode { get; set; }
    }
}
