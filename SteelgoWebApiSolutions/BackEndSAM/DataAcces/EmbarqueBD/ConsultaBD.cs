using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace BackEndSAM.DataAcces.EmbarqueBD
{
    public class ConsultaBD
    {
        private static readonly object _mutex = new object();
        private static ConsultaBD _instance;

        public static ConsultaBD Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ConsultaBD();
                    }
                }
                return _instance;
            }
        }

        public object ObtenerDatosConsulta(int areaID, int cuadranteID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_Consulta_Result> result = ctx.Sam3_Embarque_Get_Consulta("16","6",areaID, cuadranteID).ToList();
                    return result;

                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public object ObtenerDatosConsulta(String proyectoIdIN, string patioIdIN, int areaID, int cuadranteID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Embarque_Get_Consulta_Result> result = ctx.Sam3_Embarque_Get_Consulta(proyectoIdIN, patioIdIN, areaID, cuadranteID).ToList();
                    return result;

                }
            }
            catch (Exception ex)
            {
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public string ObtenerRelUsuarioProyecto(int usuarioID, out string patiosIN)
        {
            string cad = "";
            List<int> proyectosIds = new List<int>();
            patiosIN = "";
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    IEnumerable<Sam3_Rel_Usuario_Proyecto> relUsuariosProyectos =
                        from e in ctx.Sam3_Rel_Usuario_Proyecto
                        where e.UsuarioID == usuarioID
                        select e;

                    foreach (var relTemp in relUsuariosProyectos)
                    {
                        cad += relTemp.ProyectoID + ",";
                        proyectosIds.Add(relTemp.ProyectoID);
                    }

                    if(cad.Length > 0)
                        cad =  cad.Substring(0, cad.Length - 1);

                    //Patios
                    IEnumerable<Sam3_Proyecto> proyectos =
                        from e2 in ctx.Sam3_Proyecto
                        where (proyectosIds.Contains(e2.ProyectoID))
                        select e2;

                    foreach (var proyTemp in proyectos)
                    {
                        patiosIN += proyTemp.PatioID + ",";
                    }

                    if (patiosIN.Length > 0)
                        patiosIN = patiosIN.Substring(0, patiosIN.Length - 1);
                }
            }
            catch (Exception ex)
            {
                
            }
            return cad;
        }

        public List<Sam3_Get_Areas_Proyecto_Patio_Result> ObtenerAreas(String proyectoIdIN, string patioIdIN)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Get_Areas_Proyecto_Patio_Result> result = ctx.Sam3_Get_Areas_Proyecto_Patio(proyectoIdIN, patioIdIN).ToList();
                    return result;

                }
            }
            catch (Exception ex)
            {
                
                return null;
            }
        }

        public List<Sam3_Get_Cuadrante_Proyecto_Patio_Result> ObtenerCuadrantes(String proyectoIdIN, string patioIdIN, int AreaID)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_Get_Cuadrante_Proyecto_Patio_Result> result = ctx.Sam3_Get_Cuadrante_Proyecto_Patio(proyectoIdIN, patioIdIN, AreaID).ToList();
                    return result;

                }
            }
            catch (Exception ex)
            {

                return null;
            }
        }
    }
}