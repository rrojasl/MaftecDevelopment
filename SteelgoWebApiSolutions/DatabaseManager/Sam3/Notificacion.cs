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
    using System.Xml.Serialization;
    [Serializable]
    public partial class Notificacion
    {
        public int NotificacionID { get; set; }
        public int UsuarioIDReceptor { get; set; }
        public Nullable<int> UsuarioIDEmisor { get; set; }
        public Nullable<int> TipoNotificacionID { get; set; }
        public string Mensaje { get; set; }
        public System.DateTime FechaEnvio { get; set; }
        public System.DateTime FechaRecepcion { get; set; }
        public Nullable<bool> EstatusLectura { get; set; }
        public Nullable<int> EntidadID { get; set; }
        public Nullable<bool> Activo { get; set; }
    
        [XmlIgnoreAttribute]
        public virtual Entidad Entidad { get; set; }
         [XmlIgnoreAttribute]
        public virtual TipoNotificacion TipoNotificacion { get; set; }
         [XmlIgnoreAttribute]
        public virtual Usuario Usuario { get; set; }
         [XmlIgnoreAttribute]
        public virtual Usuario Usuario1 { get; set; }
    }
}
