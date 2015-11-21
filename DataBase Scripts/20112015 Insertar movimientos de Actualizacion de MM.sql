begin tran
begin try

INSERT INTO [dbo].[Sam3_TipoMovimiento]
           ([EsEntrada]
           ,[EsTransferenciaProcesos]
           ,[ApareceEnSaldos]
           ,[DisponibleMovimientosUI]
           ,[Nombre]
           ,[NombreIngles]
           ,[Descripcion]
           ,[Activo]
           ,[UsuarioModificacion]
           ,[FechaModificacion])
     VALUES
           (1
           ,0
           ,0
           ,0
           ,'Aumento de Inventario por Actualizaci�n MM'
           ,'Inventory increased by Update MM'
           ,'Actualizacion de MM Complemento de recepci�n'
           ,1
           ,1
           ,GETDATE())

INSERT INTO [dbo].[Sam3_TipoMovimiento]
           ([EsEntrada]
           ,[EsTransferenciaProcesos]
           ,[ApareceEnSaldos]
           ,[DisponibleMovimientosUI]
           ,[Nombre]
           ,[NombreIngles]
           ,[Descripcion]
           ,[Activo]
           ,[UsuarioModificacion]
           ,[FechaModificacion])
     VALUES
           (0
           ,0
           ,0
           ,0
           ,'Reducci�n de Inventario por Actualizaci�n MM'
           ,'Update Inventory reduction by MM'
           ,'Actualizacion de MM Complemento de recepci�n'
           ,1
           ,1
           ,GETDATE())

commit tran
end try
begin catch
	rollback tran
end catch