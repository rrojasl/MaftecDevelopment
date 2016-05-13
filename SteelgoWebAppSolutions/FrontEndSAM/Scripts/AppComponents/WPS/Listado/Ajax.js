function ObtenerJSONParaGrid() {
    loadingStart();
    $WPS.WPS.read({ TipoDato: 1, token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#grid").data('kendoGrid').dataSource.data([]);
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = data;
                for (var i = 0; i < array.length; i++) {
                    ds.add(array[i]);
                }
        }
        loadingStop();
    });
};



function EliminaWPSAjax(dataItem) {
    
    if (confirm(_dictionary.WPSMensajeEliminar[$("#language").data("kendoDropDownList").value()])) {
        loadingStart();
        $WPS.WPS.update({}, { TipoDeDato: 4, WPSIdentificador: dataItem.WPSID, token: Cookies.get("token") }).done(function (data) {
            if (data.ReturnMessage == 'OK') {
                ObtenerJSONParaGrid();
            } else {

            };
            loadingStop();
        });
    }
};
