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
    
    public partial class Sam3_TipoJunta
    {
<<<<<<< HEAD
        public Sam3_TipoJunta()
        {
            this.Sam3_JuntaSpool = new HashSet<Sam3_JuntaSpool>();
        }
    
=======
>>>>>>> Steelgo-InHouse
        public int TipoJuntaID { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public bool VerificadoPorCalidad { get; set; }
<<<<<<< HEAD
        public bool PermiteTerminadoRelleno { get; set; }
        public bool Activo { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
    
        public virtual ICollection<Sam3_JuntaSpool> Sam3_JuntaSpool { get; set; }
=======
        public bool Activo { get; set; }
        public bool PermiteTerminadoRelleno { get; set; }
        public Nullable<bool> PermiteTerminadoRaiz { get; set; }
        public int PermiteSoldadura { get; set; }
        public Nullable<int> UsuarioModificacion { get; set; }
        public Nullable<System.DateTime> FechaModificacion { get; set; }
>>>>>>> Steelgo-InHouse
    }
}
