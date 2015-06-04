//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatabaseManager.Sam2
{
    using System;
    using System.Collections.Generic;
    
    public partial class CorteSpoolHistorico
    {
        public int CorteSpoolHistoricoID { get; set; }
        public int SpoolHistoricoID { get; set; }
        public int CorteSpoolID { get; set; }
        public int SpoolID { get; set; }
        public int ItemCodeID { get; set; }
        public int TipoCorte1ID { get; set; }
        public int TipoCorte2ID { get; set; }
        public string EtiquetaMaterial { get; set; }
        public string EtiquetaSeccion { get; set; }
        public decimal Diametro { get; set; }
        public string InicioFin { get; set; }
        public Nullable<int> Cantidad { get; set; }
        public string Observaciones { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
        public string SpoolNombre { get; set; }
        public string ItemCodeCodigo { get; set; }
        public string ItemCodeDescripcionEspanol { get; set; }
        public string ItemCodeDescripcionIngles { get; set; }
        public string TipoCorte1Codigo { get; set; }
        public string TipoCorte2Codigo { get; set; }
    
        public virtual SpoolHistorico SpoolHistorico { get; set; }
    }
}
