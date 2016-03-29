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
    
    public partial class Sam3_ItemCode
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sam3_ItemCode()
        {
<<<<<<< HEAD
            this.Sam3_MaterialSpool = new HashSet<Sam3_MaterialSpool>();
            this.Sam3_NumeroUnico = new HashSet<Sam3_NumeroUnico>();
            this.Sam3_ColaCreacionNumerosUnicos = new HashSet<Sam3_ColaCreacionNumerosUnicos>();
            this.Sam3_Rel_Incidencia_ItemCode = new HashSet<Sam3_Rel_Incidencia_ItemCode>();
            this.Sam3_Rel_ItemCode_Diametro = new HashSet<Sam3_Rel_ItemCode_Diametro>();
            this.Sam3_Rel_Itemcode_Colada = new HashSet<Sam3_Rel_Itemcode_Colada>();
            this.Sam3_CorteSpool = new HashSet<Sam3_CorteSpool>();
            this.Sam3_MTR = new HashSet<Sam3_MTR>();
=======
            this.Sam3_ColaCreacionNumerosUnicos = new HashSet<Sam3_ColaCreacionNumerosUnicos>();
            this.Sam3_Rel_Incidencia_ItemCode = new HashSet<Sam3_Rel_Incidencia_ItemCode>();
            this.Sam3_Rel_Bulto_ItemCode = new HashSet<Sam3_Rel_Bulto_ItemCode>();
            this.Sam3_Rel_FolioCuantificacion_ItemCode = new HashSet<Sam3_Rel_FolioCuantificacion_ItemCode>();
            this.Sam3_Rel_ItemCode_ItemCodeSteelgo = new HashSet<Sam3_Rel_ItemCode_ItemCodeSteelgo>();
            this.Sam3_Rel_OrdenRecepcion_ItemCode = new HashSet<Sam3_Rel_OrdenRecepcion_ItemCode>();
            this.Sam3_MaterialSpool = new HashSet<Sam3_MaterialSpool>();
>>>>>>> Steelgo-InHouse
        }
    
        public int ItemCodeID { get; set; }
        public int ProyectoID { get; set; }
        public int TipoMaterialID { get; set; }
        public string Codigo { get; set; }
        public string ItemCodeCliente { get; set; }
        public string DescripcionEspanol { get; set; }
        public string DescripcionIngles { get; set; }
        public Nullable<decimal> Peso { get; set; }
        public string DescripcionInterna { get; set; }
        public Nullable<int> FamiliaAceroID { get; set; }
        public bool Activo { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> Cantidad { get; set; }
        public Nullable<int> MM { get; set; }
        public bool TieneComplementoRecepcion { get; set; }
        public string EstatusFisico { get; set; }
        public string EstatusDocumental { get; set; }
        public int TipoUsoID { get; set; }
    
        public virtual Sam3_Colada Sam3_Colada { get; set; }
        public virtual Sam3_FamiliaAcero Sam3_FamiliaAcero { get; set; }
<<<<<<< HEAD
        public virtual Sam3_Proyecto Sam3_Proyecto { get; set; }
        public virtual Sam3_TipoMaterial Sam3_TipoMaterial { get; set; }
        public virtual ICollection<Sam3_MaterialSpool> Sam3_MaterialSpool { get; set; }
        public virtual ICollection<Sam3_NumeroUnico> Sam3_NumeroUnico { get; set; }
        public virtual Sam3_TipoUso Sam3_TipoUso { get; set; }
        public virtual ICollection<Sam3_ColaCreacionNumerosUnicos> Sam3_ColaCreacionNumerosUnicos { get; set; }
        public virtual ICollection<Sam3_Rel_Incidencia_ItemCode> Sam3_Rel_Incidencia_ItemCode { get; set; }
        public virtual ICollection<Sam3_Rel_ItemCode_Diametro> Sam3_Rel_ItemCode_Diametro { get; set; }
        public virtual ICollection<Sam3_Rel_Itemcode_Colada> Sam3_Rel_Itemcode_Colada { get; set; }
        public virtual ICollection<Sam3_CorteSpool> Sam3_CorteSpool { get; set; }
        public virtual ICollection<Sam3_MTR> Sam3_MTR { get; set; }
=======
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_ColaCreacionNumerosUnicos> Sam3_ColaCreacionNumerosUnicos { get; set; }
        public virtual Sam3_TipoUso Sam3_TipoUso { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_Incidencia_ItemCode> Sam3_Rel_Incidencia_ItemCode { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_Bulto_ItemCode> Sam3_Rel_Bulto_ItemCode { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_FolioCuantificacion_ItemCode> Sam3_Rel_FolioCuantificacion_ItemCode { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_ItemCode_ItemCodeSteelgo> Sam3_Rel_ItemCode_ItemCodeSteelgo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_Rel_OrdenRecepcion_ItemCode> Sam3_Rel_OrdenRecepcion_ItemCode { get; set; }
        public virtual Sam3_Proyecto Sam3_Proyecto { get; set; }
        public virtual Sam3_TipoMaterial Sam3_TipoMaterial { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Sam3_MaterialSpool> Sam3_MaterialSpool { get; set; }
>>>>>>> Steelgo-InHouse
    }
}
