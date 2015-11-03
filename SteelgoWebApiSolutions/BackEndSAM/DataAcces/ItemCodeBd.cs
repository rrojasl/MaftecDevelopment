﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BackEndSAM.Models;
using DatabaseManager.Sam3;
using SecurityManager.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseManager.Sam2;
using System.Transactions;

namespace BackEndSAM.DataAcces
{
    /// <summary>
    /// operaciones sobre la entidad ItemCode
    /// </summary>
    public class ItemCodeBd
    {
        private static readonly object _mutex = new object();
        private static ItemCodeBd _instance;

        /// <summary>
        /// constructor privado para implementar el patron Singleton
        /// </summary>
        private ItemCodeBd()
        {
        }

        /// <summary>
        /// crea una instancia de la clase
        /// </summary>
        public static ItemCodeBd Instance
        {
            get
            {
                lock (_mutex)
                {
                    if (_instance == null)
                    {
                        _instance = new ItemCodeBd();
                    }
                }
                return _instance;
            }
        }

        /// <summary>
        /// Obtiene los item codes para el combo del grid de materiales
        /// Que no tengan orden de Recepcion ni Numeros unicos
        /// </summary>
        /// <param name="tipoPackingListID">tipo Packing List: 1 Tubo, 2 Accesorio</param>
        /// <returns>lista de item codes</returns>
        public object ObtenerItemCode(int tipoPackingListID, Sam3_Usuario usuario, int paginaID, string idioma, int proyectoID)
        {
            try
            {
                List<BackEndSAM.Models.ItemCode> IC = new List<BackEndSAM.Models.ItemCode>();
                List<BackEndSAM.Models.ItemCode> itemCodeS2 = new List<BackEndSAM.Models.ItemCode>();

                using (SamContext ctx = new SamContext())
                {
                    using (DatabaseManager.Sam2.Sam2Context ctx2 = new DatabaseManager.Sam2.Sam2Context())
                    {

                        IC.Add(new BackEndSAM.Models.ItemCode { ItemCodeID = "0", Codigo = "Bulto", D1 = 0, D2 = 0 });

                        //int sam2_ProyectoID = (from eq in ctx.Sam3_EquivalenciaProyecto
                        //                       where eq.Activo && eq.Sam3_ProyectoID == proyectoID
                        //                       select eq.Sam2_ProyectoID).AsParallel().SingleOrDefault();

                        itemCodeS2 = (from ic in ctx.Sam3_ItemCode
                                      join rid in ctx.Sam3_Rel_ItemCode_Diametro on ic.ItemCodeID equals rid.ItemCodeID
                                      join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                      join d2 in ctx.Sam3_Diametro on rid.Diametro2ID equals d2.DiametroID
                                      where ic.Activo && rid.Activo 
                                      && ic.TipoMaterialID == tipoPackingListID
                                      && ic.ProyectoID == proyectoID
                                      select new BackEndSAM.Models.ItemCode
                                      {
                                          ItemCodeID = rid.Rel_ItemCode_Diametro_ID.ToString(),
                                          Codigo = ic.Codigo + "(" + d1.Valor.ToString() + ", " + d2.Valor.ToString() + ")",
                                          D1 = d1.Valor,
                                          D2 = d2.Valor 
                                      }).AsParallel().Distinct().ToList();

                        //si tienen orden de recepcion
                        //List<string> conOR = (from eq in ctx.Sam3_EquivalenciaItemCode
                        //                      join or in ctx.Sam3_Rel_OrdenRecepcion_ItemCode on eq.Sam3_ItemCodeID equals or.ItemCodeID
                        //                      join nu in ctx.Sam3_NumeroUnico on eq.Sam3_ItemCodeID equals nu.ItemCodeID
                        //                      where eq.Activo && or.Activo && nu.Activo
                        //                      select eq.Sam2_ItemCodeID.ToString()).AsParallel().Distinct().ToList();

                        //itemCodeS2 = itemCodeS2.Where(x => !conOR.Contains(x.ItemCodeID)).AsParallel().Distinct().ToList();

                        //itemCodeS2 = itemCodeS2.GroupBy(x => x.ItemCodeID).Select(x => x.First()).ToList();
                    }
                }

                IC.AddRange(itemCodeS2);
                return IC;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(string.Format("Error al obtener los ItemCodes del Proyecto SAM2. {0}", proyectoID));
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Guardar nnuevo Item Code
        /// </summary>
        /// <param name="DatosItemCode">datos capturados por el usuario en el modal</param>
        /// <param name="usuario">usuario registrado</param>
        /// <returns>status exito o error</returns>
        public object GuardarItemCodePopUp(ItemCodeJson DatosItemCode, Sam3_Usuario usuario)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    using (var sam3_tran = ctx.Database.BeginTransaction())
                    {
                        using (Sam2Context ctx2 = new Sam2Context())
                        {
                            using (var sam2_tran = ctx2.Database.BeginTransaction())
                            {
                                //Inserta en Sam 2
                                DatabaseManager.Sam2.ItemCode itemS2 = new DatabaseManager.Sam2.ItemCode();
                                itemS2.ProyectoID = (from eq in ctx.Sam3_EquivalenciaProyecto
                                                     where eq.Activo
                                                     && eq.Sam3_ProyectoID == DatosItemCode.ProyectoID
                                                     select eq.Sam2_ProyectoID).AsParallel().SingleOrDefault();
                                itemS2.TipoMaterialID = DatosItemCode.TipoPackingList;
                                itemS2.Codigo = DatosItemCode.ItemCode;
                                itemS2.ItemCodeCliente = DatosItemCode.ItemCodeCliente;
                                itemS2.DescripcionEspanol = DatosItemCode.Descripcion;
                                itemS2.DescripcionIngles = DatosItemCode.DescripcionIngles;
                                //itemS2.UsuarioModifica = Guid.Parse("42AF3D10-B17A-4776-BD9A-96E9D0F0DCF6");
                                itemS2.FechaModificacion = DateTime.Now;
                                //nuevoIC.VersionRegistro
                                itemS2.Peso = DatosItemCode.Peso;
                                itemS2.DescripcionInterna = DatosItemCode.DescripcionInterna;
                                itemS2.Diametro1 = DatosItemCode.Diametro1;
                                itemS2.Diametro2 = DatosItemCode.Diametro2;
                                itemS2.FamiliaAceroID = (from eq in ctx.Sam3_EquivalenciaFamiliaAcero
                                                         where eq.Activo
                                                         && eq.Sam3_FamiliaAceroID == DatosItemCode.FamiliaID
                                                         select eq.Sam2_FamiliaAceroID).AsParallel().SingleOrDefault();

                                ctx2.ItemCode.Add(itemS2);
                                ctx2.SaveChanges();


                                int diam1 = Convert.ToInt32(DatosItemCode.Diametro1ID);
                                int diam2 = Convert.ToInt32(DatosItemCode.Diametro2ID);
                                bool existeItemCode = ctx.Sam3_ItemCode.Where(x => x.Codigo == DatosItemCode.ItemCode && x.Activo).Any();
                                if (existeItemCode)
                                {
                                    int itemID = ctx.Sam3_ItemCode.Where(x => x.Codigo == DatosItemCode.ItemCode && x.Activo).Select(x => x.ItemCodeID).FirstOrDefault();
                                    if (ctx.Sam3_Rel_ItemCode_Diametro.Where(x => x.ItemCodeID ==itemID
                                                        && x.Diametro1ID == diam1
                                                        && x.Diametro2ID == diam2
                                                        && x.Activo).AsParallel().Any())
                                    {
                                        throw new Exception("El item code ya existe con esos diametros.");
                                    }
                                }

                                //Inserta en Sam 3
                                Sam3_ItemCode itemS3 = new Sam3_ItemCode();
                                itemS3.ProyectoID = DatosItemCode.ProyectoID;
                                itemS3.TipoMaterialID = DatosItemCode.TipoPackingList;//
                                itemS3.Codigo = DatosItemCode.ItemCode;//
                                itemS3.ItemCodeCliente = DatosItemCode.ItemCodeCliente;
                                itemS3.DescripcionEspanol = DatosItemCode.Descripcion;//
                                //itemS3.DescripcionIngles = DatosItemCode.Descripcion;
                                //itemS3.DescripcionInterna = DatosItemCode.Descripcion;
                                //itemS3.Peso = DatosItemCode.Peso;
                                //itemS3.Diametro1 = DatosItemCode.Diametro1;
                                //itemS3.Diametro2 = DatosItemCode.Diametro2;
                                itemS3.FamiliaAceroID = DatosItemCode.FamiliaID;//
                                itemS3.Activo = true;
                                itemS3.UsuarioModificacion = usuario.UsuarioID;
                                itemS3.FechaModificacion = DateTime.Now;
                                //itemS3.Cantidad = DatosItemCode.Cantidad;
                                //itemS3.MM = DatosItemCode.MM;
                                itemS3.ColadaID = DatosItemCode.ColadaID;//
                                itemS3.TipoUsoID = Convert.ToInt32(DatosItemCode.TipoUsoID) == -1 ? 1 : Convert.ToInt32(DatosItemCode.TipoUsoID);
                                ctx.Sam3_ItemCode.Add(itemS3);
                                ctx.SaveChanges();


                                Sam3_Rel_ItemCode_Diametro relItemCodeDiametro = new Sam3_Rel_ItemCode_Diametro();
                                relItemCodeDiametro.ItemCodeID = itemS3.ItemCodeID;
                                relItemCodeDiametro.Diametro1ID = diam1;
                                relItemCodeDiametro.Diametro2ID = diam2;
                                relItemCodeDiametro.UsuarioModificacion = usuario.UsuarioID;
                                relItemCodeDiametro.FechaModificacion = DateTime.Now;
                                relItemCodeDiametro.Activo = true;
                                ctx.Sam3_Rel_ItemCode_Diametro.Add(relItemCodeDiametro);
                                ctx.SaveChanges();

                                //Inserta en equivalencia
                                Sam3_EquivalenciaItemCode equiv = new Sam3_EquivalenciaItemCode();
                                equiv.Sam2_ItemCodeID = itemS2.ItemCodeID;
                                equiv.Sam3_ItemCodeID = itemS3.ItemCodeID;
                                equiv.Activo = true;
                                equiv.UsuarioModificacion = usuario.UsuarioID;
                                equiv.FechaModificacion = DateTime.Now;

                                ctx.Sam3_EquivalenciaItemCode.Add(equiv);
                                ctx.SaveChanges();

                                sam2_tran.Commit();
                            } //tran sam2
                        } //ctx Sam 2
                        sam3_tran.Commit();
                    } //tran sam3
                    TransactionalInformation result = new TransactionalInformation();
                    result.ReturnMessage.Add("Ok");
                    result.ReturnCode = 200;
                    result.ReturnStatus = false;
                    result.IsAuthenicated = true;

                    return result;
                } //ctx sam 3
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        /// <summary>
        /// Obtener el detalle de un item code al seleccionarlo en el grid
        /// </summary>
        /// <param name="itemCode">item code seleccionado</param>
        /// <param name="usuario">usuario actual</param>
        /// <returns>objeto con la informacion del item code</returns>
        public object ObtenerDetalleItemCode(string itemCode)
        {
            try
            {
                using (SamContext ctx = new SamContext())
                {
                    int RelItemID = Convert.ToInt32(itemCode);
                    bool tieneICS = (from it in ctx.Sam3_ItemCode
                                     join riit in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on it.ItemCodeID equals riit.ItemCodeID
                                     join rid in ctx.Sam3_Rel_ItemCode_Diametro on it.ItemCodeID equals rid.ItemCodeID
                                     where it.Activo && riit.Activo && rid.Activo
                                     && rid.Rel_ItemCode_Diametro_ID == RelItemID
                                     select riit).AsParallel().Any();

                    ItemCodeJson detalle = new ItemCodeJson();

                    if (tieneICS)
                    {
                        detalle = (from r in ctx.Sam3_ItemCode
                                   join riit in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo on r.ItemCodeID equals riit.ItemCodeID
                                   join ics in ctx.Sam3_ItemCodeSteelgo on riit.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                   join rid in ctx.Sam3_Rel_ItemCode_Diametro on r.ItemCodeID equals rid.ItemCodeID
                                   join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                   join d2 in ctx.Sam3_Diametro on rid.Diametro2ID equals d2.DiametroID
                                   where r.Activo && riit.Activo && ics.Activo && rid.Activo
                                   && rid.Rel_ItemCode_Diametro_ID == RelItemID
                                   select new ItemCodeJson
                                   {
                                       ItemCodeID = rid.Rel_ItemCode_Diametro_ID,
                                       ItemCode = r.Codigo,
                                       ColadaNombre = (from c in ctx.Sam3_Colada where c.ColadaID == r.ColadaID && c.Activo select c.NumeroColada).FirstOrDefault(),
                                       Cantidad = r.Cantidad,
                                       MM = r.MM, 
                                       Descripcion = ics.DescripcionEspanol,
                                       Diametro1 = d1.Valor,
                                       Diametro2 = d2.Valor, 
                                       FamiliaAcero = (from f in ctx.Sam3_FamiliaAcero where f.FamiliaAceroID == ics.FamiliaAceroID && f.Activo select f.Nombre).FirstOrDefault(), 
                                       Cedula = (from c in ctx.Sam3_Cedula 
                                                 join d in ctx.Sam3_Diametro on c.DiametroID equals d.DiametroID
                                                 where c.Activo && c.CedulaID == ics.CedulaID && d.Activo
                                                 select d.Valor + "-" + c.CedulaA + "-" + c.CedulaB + "-" + c.CedulaC).FirstOrDefault(),
                                       ItemCodeSteelgoID = ics.ItemCodeSteelgoID.ToString(),
                                       ItemCodeSteelgo = ics.Codigo,
                                       TipoAcero = (from rics in ctx.Sam3_Rel_ItemCode_ItemCodeSteelgo
                                                    join itcs in ctx.Sam3_ItemCodeSteelgo on rics.ItemCodeSteelgoID equals ics.ItemCodeSteelgoID
                                                    join it in ctx.Sam3_ItemCode on rics.ItemCodeID equals it.ItemCodeID
                                                    join fa in ctx.Sam3_FamiliaAcero on itcs.FamiliaAceroID equals fa.FamiliaAceroID
                                                    join fm in ctx.Sam3_FamiliaMaterial on fa.FamiliaMaterialID equals fm.FamiliaMaterialID
                                                    where rics.Activo && itcs.Activo && it.Activo
                                                    && rics.ItemCodeID == r.ItemCodeID
                                                    select fm.Nombre).FirstOrDefault(),
                                       ColadaID = r.ColadaID
                                   }).AsParallel().SingleOrDefault();
                    }
                    else
                    {
                        detalle = (from r in ctx.Sam3_ItemCode
                                   join rid in ctx.Sam3_Rel_ItemCode_Diametro on r.ItemCodeID equals rid.ItemCodeID
                                   join d1 in ctx.Sam3_Diametro on rid.Diametro1ID equals d1.DiametroID
                                   join d2 in ctx.Sam3_Diametro on rid.Diametro2ID equals d2.DiametroID
                                   where r.Activo && rid.Activo
                                    && rid.Rel_ItemCode_Diametro_ID == RelItemID
                                   select new ItemCodeJson
                                   {
                                       ItemCodeID = rid.Rel_ItemCode_Diametro_ID,
                                       ItemCode = r.Codigo,
                                       Diametro1 = d1.Valor,
                                       Diametro2 = d2.Valor, 
                                       ColadaNombre = (from c in ctx.Sam3_Colada where c.ColadaID == r.ColadaID && c.Activo select c.NumeroColada).FirstOrDefault(),
                                       Cantidad = r.Cantidad,
                                       MM = r.MM
                                   }).AsParallel().SingleOrDefault();
                    }
                    return detalle;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(ex.Message);
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

        public List<ListadoIncidencias> ListadoIncidencias(int clienteID, int proyectoID, List<int> proyectos, List<int> patios, List<int> Ids)
        {
            try
            {
                List<ListadoIncidencias> listado;
                using (SamContext ctx = new SamContext())
                {
                    List<Sam3_ItemCode> registros = new List<Sam3_ItemCode>();

                    if (proyectoID > 0)
                    {
                        registros = (from it in ctx.Sam3_ItemCode
                                     join p in ctx.Sam3_Proyecto on it.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     where it.Activo && p.Activo && pa.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && p.ProyectoID == proyectoID
                                     && Ids.Contains(it.ItemCodeID)
                                     select it).AsParallel().Distinct().ToList();
                    }
                    else
                    {
                        registros = (from it in ctx.Sam3_ItemCode
                                     join p in ctx.Sam3_Proyecto on it.ProyectoID equals p.ProyectoID
                                     join pa in ctx.Sam3_Patio on p.PatioID equals pa.PatioID
                                     where it.Activo && p.Activo && pa.Activo
                                     && proyectos.Contains(p.ProyectoID)
                                     && patios.Contains(pa.PatioID)
                                     && Ids.Contains(it.ItemCodeID)
                                     select it).AsParallel().Distinct().ToList();
                    }

                    if (clienteID > 0)
                    {
                        int sam3Cliente = (from c in ctx.Sam3_Cliente
                                           where c.Activo && c.Sam2ClienteID == clienteID
                                           select c.ClienteID).AsParallel().SingleOrDefault();
                        registros = (from r in registros
                                     join p in ctx.Sam3_Proyecto on r.ProyectoID equals p.ProyectoID
                                     where p.Activo
                                     && p.ClienteID == sam3Cliente
                                     select r).AsParallel().Distinct().ToList();
                    }

                    listado = (from r in registros
                               join riit in ctx.Sam3_Rel_Incidencia_ItemCode on r.ItemCodeID equals riit.ItemCodeID
                               join inc in ctx.Sam3_Incidencia on riit.IncidenciaID equals inc.IncidenciaID
                               join c in ctx.Sam3_ClasificacionIncidencia on inc.ClasificacionID equals c.ClasificacionIncidenciaID
                               join tpi in ctx.Sam3_TipoIncidencia on inc.TipoIncidenciaID equals tpi.TipoIncidenciaID
                               where riit.Activo && inc.Activo && c.Activo && tpi.Activo
                               select new ListadoIncidencias
                               {
                                   Clasificacion = c.Nombre,
                                   Estatus = inc.Estatus,
                                   TipoIncidencia = tpi.Nombre,
                                   RegistradoPor = (from us in ctx.Sam3_Usuario
                                                    where us.Activo
                                                    && us.UsuarioID == inc.UsuarioID
                                                    select us.Nombre + " " + us.ApellidoPaterno).SingleOrDefault(),
                                   FolioIncidenciaID = inc.IncidenciaID.ToString(),
                                   FechaRegistro = inc.FechaCreacion.ToString()
                               }).AsParallel().Distinct().ToList();

                }
                return listado;
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                return null;
            }
        }

        /// <summary>
        /// Obtiene los diametros
        /// </summary>
        /// <returns>lista de diametros</returns>
        public object ObtenerDiametros(Sam3_Usuario usuario)
        {
            try
            {
                List<ListaCombos> registros = new List<ListaCombos>();

                using (SamContext ctx = new SamContext())
                {
                    registros = (from r in ctx.Sam3_Diametro
                                 where r.Activo
                                 select new ListaCombos
                                 {
                                     id = r.DiametroID.ToString(),
                                     value = r.Valor.ToString()
                                 }).ToList();

                    return registros;
                }
            }
            catch (Exception ex)
            {
                //-----------------Agregar mensaje al Log -----------------------------------------------
                LoggerBd.Instance.EscribirLog(ex);
                //-----------------Agregar mensaje al Log -----------------------------------------------
                TransactionalInformation result = new TransactionalInformation();
                result.ReturnMessage.Add(string.Format("Error al obtener los diametros"));
                result.ReturnCode = 500;
                result.ReturnStatus = false;
                result.IsAuthenicated = true;

                return result;
            }
        }

    }
}