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
         public object ObtenerItemCode(int tipoPackingListID)
         {
             try
             {
                 List<ItemCode> IC = new List<ItemCode>();

                 using (SamContext ctx = new SamContext())
                 {
                     IC.Add(new ItemCode { ItemCodeID = "-1", Codigo = "Agregar Nuevo" });
                     IC.Add(new ItemCode { ItemCodeID = "0", Codigo = "Bulto"});

                     List<ItemCode> itemCode = (from ic in ctx.Sam3_ItemCode
                                 where ic.Activo && ic.TipoMaterialID == tipoPackingListID
                                 && !ctx.Sam3_NumeroUnico.Where(c=> c.ItemCodeID == ic.ItemCodeID).Any() 
                                 && !ctx.Sam3_Rel_OrdenRecepcion_ItemCode.Where(c=> c.ItemCodeID == ic.ItemCodeID).Any()
                                 select new ItemCode
                                 {
                                     ItemCodeID = ic.ItemCodeID.ToString(),
                                     Codigo = ic.Codigo
                                 }).AsParallel().ToList();

                     IC.AddRange(itemCode);
                 }

                 return IC;
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
                     Sam3_ItemCode item = new Sam3_ItemCode();
                     item.ProyectoID = DatosItemCode.ProyectoID;//
                     item.TipoMaterialID = DatosItemCode.TipoPackingList;//
                     item.Codigo = DatosItemCode.ItemCode;//
                     item.ItemCodeCliente = DatosItemCode.ItemCodeCliente;
                     item.DescripcionEspanol = DatosItemCode.Descripcion;//
                     //item.DescripcionIngles = DatosItemCode.Descripcion;
                     //item.DescripcionInterna = DatosItemCode.Descripcion;
                     //item.Peso = DatosItemCode.Peso;
                     //item.Diametro1 = DatosItemCode.Diametro1;
                     //item.Diametro2 = DatosItemCode.Diametro2;
                     item.FamiliaAceroID = DatosItemCode.FamiliaID;//
                     item.Activo = true;
                     item.UsuarioModificacion = usuario.UsuarioID;
                     item.FechaModificacion = DateTime.Now;
                     //item.Cantidad = DatosItemCode.Cantidad;
                     //item.MM = DatosItemCode.MM;
                     item.ColadaID = DatosItemCode.ColadaID;//
                     ctx.Sam3_ItemCode.Add(item);
                     ctx.SaveChanges();

                     TransactionalInformation result = new TransactionalInformation();
                     result.ReturnMessage.Add(item.ItemCodeID.ToString());
                     result.ReturnMessage.Add("Ok");
                     result.ReturnCode = 200;
                     result.ReturnStatus = false;
                     result.IsAuthenicated = true;

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
                     int itemCodeID = Int32.Parse(itemCode);
                     ItemCodeJson detalle = (from r in ctx.Sam3_ItemCode
                                             where r.Activo && r.ItemCodeID == itemCodeID
                                             select new ItemCodeJson
                                             {
                                                 ItemCodeID = r.ItemCodeID,
                                                 ItemCode = r.Codigo,
                                                 ColadaNombre = (from c in ctx.Sam3_Colada where c.ColadaID == r.ColadaID select c.NumeroColada).FirstOrDefault(),
                                                 Cantidad = r.Cantidad,
                                                 MM = r.MM
                                             }).AsParallel().SingleOrDefault();
                     return detalle;
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

    }
}