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
    
    public partial class Sam3_OrdenTrabajoMaterial
    {
        public int OrdenTrabajoMaterialID { get; set; }
        public int OrdenTrabajoSpoolID { get; set; }
        public int MaterialSpoolID { get; set; }
        public Nullable<int> DespachoID { get; set; }
        public Nullable<int> CorteDetalleID { get; set; }
        public bool TieneInventarioCongelado { get; set; }
        public Nullable<int> NumeroUnicoCongeladoID { get; set; }
        public string SegmentoCongelado { get; set; }
        public Nullable<int> CantidadCongelada { get; set; }
        public bool CongeladoEsEquivalente { get; set; }
        public Nullable<int> NumeroUnicoSugeridoID { get; set; }
        public string SegmentoSugerido { get; set; }
        public bool SugeridoEsEquivalente { get; set; }
        public Nullable<bool> TieneCorte { get; set; }
        public bool TieneDespacho { get; set; }
        public bool DespachoEsEquivalente { get; set; }
        public Nullable<int> NumeroUnicoDespachadoID { get; set; }
        public string SegmentoDespachado { get; set; }
        public Nullable<int> CantidadDespachada { get; set; }
        public bool FueReingenieria { get; set; }
        public bool EsAsignado { get; set; }
        public Nullable<int> NumeroUnicoAsignadoID { get; set; }
        public string SegmentoAsignado { get; set; }
        public bool Activo { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
    
        public virtual Sam3_MaterialSpool Sam3_MaterialSpool { get; set; }
        public virtual Sam3_NumeroUnico Sam3_NumeroUnico { get; set; }
        public virtual Sam3_NumeroUnico Sam3_NumeroUnico1 { get; set; }
        public virtual Sam3_NumeroUnico Sam3_NumeroUnico2 { get; set; }
        public virtual Sam3_NumeroUnico Sam3_NumeroUnico3 { get; set; }
        public virtual Sam3_OrdenTrabajoSpool Sam3_OrdenTrabajoSpool { get; set; }
    }
}
