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

function AjaxGuardarCaptura() {

    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    var arregloCaptura = $("#grid").data("kendoGrid").dataSource._data;
    for (index = 0; index < arregloCaptura.length; index++) {
            ListaDetalles[index] = {
                Accion: "",
                WPSId: "",
                WPSNombre: "",
                PQRRaizId: "",
                PQRRellenoId: "",
                GrupoPId: "",
                PWHTId: "",
                EspesorMaximoRaiz: "",
                EspesorMinimoRaiz: "",
                EspesorMaximoRelleno: "",
                EspesorMinimoRelleno: "",
                Estatus: 1
            };

            if ((arregloCaptura[index].GrupoP == "" || arregloCaptura[index].GrupoP == undefined || arregloCaptura[index].GrupoP == null) ||
                (arregloCaptura[index].WPSNombre == "" || arregloCaptura[index].WPSNombre == undefined || arregloCaptura[index].WPSNombre == null) ||
                (arregloCaptura[index].NombrePQRRaiz == "" || arregloCaptura[index].NombrePQRRaiz == undefined || arregloCaptura[index].NombrePQRRaiz == null) ||
                (arregloCaptura[index].NombrePQRRelleno == "" || arregloCaptura[index].NombrePQRRelleno == undefined || arregloCaptura[index].NombrePQRRelleno == null)
                ) {
                ListaDetalles[index].Estatus = 0;
                $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
            }
            

            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].WPSId = arregloCaptura[index].WPSID;
            ListaDetalles[index].WPSNombre = arregloCaptura[index].WPSNombre;
            ListaDetalles[index].PQRRaizId = arregloCaptura[index].PQRRaizId;
            ListaDetalles[index].PQRRellenoId = arregloCaptura[index].PQRRellenoId;
            ListaDetalles[index].GrupoPId = arregloCaptura[index].GrupoPId;
            ListaDetalles[index].EspesorMaximoRaiz = arregloCaptura[index].EspesorMaximoRaiz;
            ListaDetalles[index].EspesorMinimoRaiz = arregloCaptura[index].EspesorMinimoRaiz;
            ListaDetalles[index].EspesorMinimoRelleno = arregloCaptura[index].EspesorMinimoRelleno;
            ListaDetalles[index].EspesorMaximoRelleno = arregloCaptura[index].EspesorMaximoRelleno;
    }

    Captura[0].Detalles = ListaDetalles;
    ArregloGuardado = [];
    var indice = 0;
    for (var i = 0; i < Captura[0].Detalles.length; i++) {
        if (Captura[0].Detalles[i].Estatus == 1) {
            ArregloGuardado[indice] = ListaDetalles[i];
            indice++;
        }
    }

    Captura[0].Detalles = [];
    Captura[0].Detalles = ArregloGuardado;


    loadingStart();
    $WPS.WPS.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
        if (data.ReturnMessage == 'OK') {
            ObtenerJSONParaGrid();
            loadingStop();
        }
    });
};


