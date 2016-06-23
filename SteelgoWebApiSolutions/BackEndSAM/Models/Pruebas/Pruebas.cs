
namespace BackEndSAM.Models.Pruebas
{
    public class Pruebas
    {
        public Pruebas()
        {
            PruebasID = 0;
            Clave = "";
            Nombre = "";
        }

        public int PruebasID { get; set; }
        public string Clave { get; set; }
        public string Nombre { get; set; }
    }
}