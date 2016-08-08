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
    
    public partial class Sam3_ProyectoConfiguracion
    {
        public int ProyectoID { get; set; }
        public string PrefijoNumeroUnico { get; set; }
        public string PrefijoOrdenTrabajo { get; set; }
        public byte DigitosNumeroUnico { get; set; }
        public byte DigitosOrdenTrabajo { get; set; }
        public Nullable<int> ToleranciaCortes { get; set; }
        public string AnguloBisel { get; set; }
        public decimal CuadroTubero { get; set; }
        public decimal CuadroRaiz { get; set; }
        public decimal CuadroRelleno { get; set; }
        public Nullable<System.Guid> UsuarioModifica { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public byte[] VersionRegistro { get; set; }
        public bool ActualizaLocalizacion { get; set; }
        public string CorreoPeqKgEsp { get; set; }
        public Nullable<int> DigitosFolioPreparacion { get; set; }
        public Nullable<bool> ManejaReserva { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public bool Activo { get; set; }
        public int DigitosOrdeAlmacenaje { get; set; }
        public int DigitosFolioDescarga { get; set; }
        public int DigitosFolioAvisollegada { get; set; }
        public int GigitosFolioPaseSalida { get; set; }
        public int DigitosFolioOrdenRecepcion { get; set; }
        public int DigitosFolioCuantifiacion { get; set; }
        public int DigitosFolioOrdenAlmacenaje { get; set; }
        public int DigitosFolioPermisoAduana { get; set; }
        public int TipoUsoID { get; set; }
        public bool RequiereTipoPackingList { get; set; }
    
        public virtual Sam3_TipoUso Sam3_TipoUso { get; set; }
    }
}
