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
    
    public partial class Sam3_NumeroUnico
    {
        public Sam3_NumeroUnico()
        {
            this.Sam3_NumeroUnicoCorte = new HashSet<Sam3_NumeroUnicoCorte>();
            this.Sam3_NumeroUnicoMovimiento = new HashSet<Sam3_NumeroUnicoMovimiento>();
            this.Sam3_NumeroUnicoSegmento = new HashSet<Sam3_NumeroUnicoSegmento>();
            this.Sam3_PinturaNumeroUnico = new HashSet<Sam3_PinturaNumeroUnico>();
            this.Sam3_RequisicionNumeroUnicoDetalle = new HashSet<Sam3_RequisicionNumeroUnicoDetalle>();
            this.Sam3_Rel_OrdenAlmacenaje_NumeroUnico = new HashSet<Sam3_Rel_OrdenAlmacenaje_NumeroUnico>();
            this.Sam3_Rel_Incidencia_NumeroUnico = new HashSet<Sam3_Rel_Incidencia_NumeroUnico>();
            this.Sam3_Despacho = new HashSet<Sam3_Despacho>();
            this.Sam3_PreDespacho = new HashSet<Sam3_PreDespacho>();
            this.Sam3_Rel_NumeroUnico_RelFC_RelB = new HashSet<Sam3_Rel_NumeroUnico_RelFC_RelB>();
            this.Sam3_OrdenTrabajoMaterial = new HashSet<Sam3_OrdenTrabajoMaterial>();
            this.Sam3_OrdenTrabajoMaterial1 = new HashSet<Sam3_OrdenTrabajoMaterial>();
            this.Sam3_OrdenTrabajoMaterial2 = new HashSet<Sam3_OrdenTrabajoMaterial>();
            this.Sam3_OrdenTrabajoMaterial3 = new HashSet<Sam3_OrdenTrabajoMaterial>();
        }
    
        public int NumeroUnicoID { get; set; }
        public int ProyectoID { get; set; }
        public Nullable<int> ItemCodeID { get; set; }
        public Nullable<int> ColadaID { get; set; }
        public Nullable<int> ProveedorID { get; set; }
        public Nullable<int> FabricanteID { get; set; }
        public Nullable<int> TipoCorte1ID { get; set; }
        public Nullable<int> TipoCorte2ID { get; set; }
        public string Estatus { get; set; }
        public string Factura { get; set; }
        public string PartidaFactura { get; set; }
        public string OrdenDeCompra { get; set; }
        public string PartidaOrdenDeCompra { get; set; }
        public decimal Diametro1 { get; set; }
        public decimal Diametro2 { get; set; }
        public string Cedula { get; set; }
        public string NumeroUnicoCliente { get; set; }
        public bool MarcadoAsme { get; set; }
        public bool MarcadoGolpe { get; set; }
        public bool MarcadoPintura { get; set; }
        public string PruebasHidrostaticas { get; set; }
        public bool TieneDano { get; set; }
        public string Rack { get; set; }
        public string Observaciones { get; set; }
        public string CampoLibreRecepcion1 { get; set; }
        public string CampoLibreRecepcion2 { get; set; }
        public string CampoLibreRecepcion3 { get; set; }
        public string CampoLibreRecepcion4 { get; set; }
        public string CampoLibreRecepcion5 { get; set; }
        public string CampoLibre1 { get; set; }
        public string CampoLibre2 { get; set; }
        public string CampoLibre3 { get; set; }
        public string CampoLibre4 { get; set; }
        public string CampoLibre5 { get; set; }
        public bool EsVirtual { get; set; }
        public Nullable<int> RecepcionID { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public string Prefijo { get; set; }
        public int Consecutivo { get; set; }
        public string EstatusFisico { get; set; }
        public string EstatusDocumental { get; set; }
        public Nullable<int> TipoUsoID { get; set; }
        public Nullable<int> MTRID { get; set; }
    
        public virtual Sam3_Colada Sam3_Colada { get; set; }
        public virtual Sam3_Fabricante Sam3_Fabricante { get; set; }
        public virtual Sam3_ItemCode Sam3_ItemCode { get; set; }
        public virtual Sam3_Proveedor Sam3_Proveedor { get; set; }
        public virtual Sam3_Proyecto Sam3_Proyecto { get; set; }
        public virtual Sam3_Recepcion Sam3_Recepcion { get; set; }
        public virtual Sam3_TipoCorte Sam3_TipoCorte { get; set; }
        public virtual Sam3_TipoCorte Sam3_TipoCorte1 { get; set; }
        public virtual ICollection<Sam3_NumeroUnicoCorte> Sam3_NumeroUnicoCorte { get; set; }
        public virtual ICollection<Sam3_NumeroUnicoMovimiento> Sam3_NumeroUnicoMovimiento { get; set; }
        public virtual ICollection<Sam3_NumeroUnicoSegmento> Sam3_NumeroUnicoSegmento { get; set; }
        public virtual ICollection<Sam3_PinturaNumeroUnico> Sam3_PinturaNumeroUnico { get; set; }
        public virtual ICollection<Sam3_RequisicionNumeroUnicoDetalle> Sam3_RequisicionNumeroUnicoDetalle { get; set; }
        public virtual Sam3_NumeroUnico Sam3_NumeroUnico1 { get; set; }
        public virtual Sam3_NumeroUnico Sam3_NumeroUnico2 { get; set; }
        public virtual ICollection<Sam3_Rel_OrdenAlmacenaje_NumeroUnico> Sam3_Rel_OrdenAlmacenaje_NumeroUnico { get; set; }
        public virtual ICollection<Sam3_Rel_Incidencia_NumeroUnico> Sam3_Rel_Incidencia_NumeroUnico { get; set; }
        public virtual Sam3_NumeroUnicoInventario Sam3_NumeroUnicoInventario { get; set; }
        public virtual ICollection<Sam3_Despacho> Sam3_Despacho { get; set; }
        public virtual ICollection<Sam3_PreDespacho> Sam3_PreDespacho { get; set; }
        public virtual ICollection<Sam3_Rel_NumeroUnico_RelFC_RelB> Sam3_Rel_NumeroUnico_RelFC_RelB { get; set; }
        public virtual ICollection<Sam3_OrdenTrabajoMaterial> Sam3_OrdenTrabajoMaterial { get; set; }
        public virtual ICollection<Sam3_OrdenTrabajoMaterial> Sam3_OrdenTrabajoMaterial1 { get; set; }
        public virtual ICollection<Sam3_OrdenTrabajoMaterial> Sam3_OrdenTrabajoMaterial2 { get; set; }
        public virtual ICollection<Sam3_OrdenTrabajoMaterial> Sam3_OrdenTrabajoMaterial3 { get; set; }
        public virtual Sam3_TipoUso Sam3_TipoUso { get; set; }
        public virtual Sam3_MTR Sam3_MTR { get; set; }
    }
}
