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
            PREHEAT: "",
            EspesorMaximoRaiz: "",
            EspesorMinimoRaiz: "",
            EspesorMaximoRelleno: "",
            EspesorMinimoRelleno: "",
            ProyectoID: "",
            Estatus: 1
        };

        if ((arregloCaptura[index].WPSNombre == "" || arregloCaptura[index].WPSNombre == undefined || arregloCaptura[index].WPSNombre == null) ||
            (arregloCaptura[index].NombrePQRRaiz == "" || arregloCaptura[index].NombrePQRRaiz == undefined || arregloCaptura[index].NombrePQRRaiz == null) ||
            (arregloCaptura[index].NombrePQRRelleno == "" || arregloCaptura[index].NombrePQRRelleno == undefined || arregloCaptura[index].NombrePQRRelleno == null)
           ) {
            ListaDetalles[index].Estatus = 0;
            $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
        }
        else if (ContieneGruposMaterialBase(arregloCaptura[index].GrupoMaterialBase1RaizUID + " " + arregloCaptura[index].GrupoMaterialBase1RaizDID, arregloCaptura[index].GrupoMaterialBase1RellenoUID, arregloCaptura[index].GrupoMaterialBase1RellenoDID)) {
            ListaDetalles[index].Estatus = 0;
            $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
        }
        else if (arregloCaptura[index].PWHTRellenoId != arregloCaptura[index].PWHTRaizId) {
            ListaDetalles[index].Estatus = 0;
            $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
        }
        else if (arregloCaptura[index].PREHEATRellenoId != arregloCaptura[index].PREHEATRaizId) {
            ListaDetalles[index].Estatus = 0;
            $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
        }



        ListaDetalles[index].Accion = arregloCaptura[index].Accion;
        ListaDetalles[index].WPSId = arregloCaptura[index].WPSID;
        ListaDetalles[index].WPSNombre = arregloCaptura[index].WPSNombre;
        ListaDetalles[index].PQRRaizId = arregloCaptura[index].PQRRaizId;
        ListaDetalles[index].PQRRellenoId = arregloCaptura[index].PQRRellenoId;
        ListaDetalles[index].GrupoPId = arregloCaptura[index].GrupoMaterialBase1RaizUID;
        ListaDetalles[index].PWHTId = arregloCaptura[index].PWHTRellenoId;
        ListaDetalles[index].PREHEAT = arregloCaptura[index].PREHEATRellenoId;
        ListaDetalles[index].EspesorMaximoRaiz = arregloCaptura[index].EspesorMaximoRaiz;
        ListaDetalles[index].EspesorMinimoRaiz = arregloCaptura[index].EspesorMinimoRaiz;
        ListaDetalles[index].EspesorMinimoRelleno = arregloCaptura[index].EspesorMinimoRelleno;
        ListaDetalles[index].EspesorMaximoRelleno = arregloCaptura[index].EspesorMaximoRelleno;
        ListaDetalles[index].ProyectoID = arregloCaptura[index].ProyectoID;
    }

    Captura[0].Detalles = ListaDetalles;
    

    
    if (!ExistRowEmpty(ListaDetalles)) {
        if (Captura[0].Detalles.length > 0) {
            loadingStart();
            $WPS.WPS.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
                    displayNotify("CapturaMensajeGuardadoExitoso", "", '0');
                    ObtenerJSONParaGrid();
                    loadingStop();
                }
                else  /*(data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") */ {
                    //mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
                    displayNotify("CapturaMensajeGuardadoErroneo", "", '2');
                    loadingStop();

                }
            });
        }
    }
    else {
        loadingStop();
        windowTemplate = kendo.template($("#windowTemplate").html());

        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.CapturaAvanceIntAcabadoMensajeErrorGuardado[$("#language").data("kendoDropDownList").value()],
            visible: false, //the window will not appear before its .open method is called
            width: "auto",
            height: "auto",
            modal: true,
            animation: {
                close: false,
                open: false
            }
        }).data("kendoWindow");

        ventanaConfirm.content(_dictionary.WPSMensajeCamposIncorrector[$("#language").data("kendoDropDownList").value()] +
            "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();


        //RowEmpty($("#grid"));

        $("#yesButton").click(function () {
            loadingStart();

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


            if (Captura[0].Detalles.length > 0) {
                loadingStart();
                $WPS.WPS.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
                    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
                        displayNotify("CapturaMensajeGuardadoExitoso", "", '0');
                        ObtenerJSONParaGrid();
                        loadingStop();
                    }
                    else  /*(data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") */ {
                        //mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
                        displayNotify("CapturaMensajeGuardadoErroneo", "", '2');
                        loadingStop();

                    }
                });
            }
            else {
                loadingStop();
                displayNotify("AdverteciaExcepcionGuardado", "", '1');
            }

            ventanaConfirm.close();
        });
        $("#noButton").click(function () {
            opcionHabilitarView(false);
            ventanaConfirm.close();
        });

    }

    
};


