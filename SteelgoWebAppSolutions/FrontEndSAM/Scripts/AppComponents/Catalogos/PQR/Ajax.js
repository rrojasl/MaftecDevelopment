
function LlenaGridAjax() {

    var TipoDato = 1;

    $PQR.PQR.read({ TipoDato: TipoDato, Proyecto: 28, PruebaID: 2, Especificacion: null, Codigo: null, token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            resultadoJson = data;
            if (resultadoJson.length > 0) {
                $("#grid").data("kendoGrid").dataSource.data(resultadoJson);
            } else {
                $("#grid").data("kendoGrid").dataSource.data([]);
            };
        }
    });
};

function AjaxGuardarListado() {
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    var correcto = true;
    var pqrModified = '';
    var arregloCaptura = $("#grid").data("kendoGrid").dataSource._data;
    for (index = 0; index < arregloCaptura.length; index++) {
        ListaDetalles[index] = {
            PQRID: "",
            Accion: "",
            Nombre: "",
            PWHT: "",
            PREHEAT: "",
            EspesorRelleno: "",
            EspesorRaiz: "",
            ProcesoSoldaduraRellenoID: "",
            ProcesoSoldaduraRaizID: "",
            NumeroP: "",
            GrupoMaterialesBase1: "",
            GrupoMaterialesBase2: "",
            Aporte: "",
            Mezcla: "",
            Respaldo: "",
            GrupoF: "",
            Especificacion: "",
            Estatus: 1
        };

        if ((arregloCaptura[index].Nombre == "" || arregloCaptura[index].Nombre == undefined || arregloCaptura[index].Nombre == null) ||
            (arregloCaptura[index].Mezcla == "" || arregloCaptura[index].Mezcla == undefined || arregloCaptura[index].Mezcla == null) ||
            (arregloCaptura[index].Mezcla == "" || arregloCaptura[index].Mezcla == undefined || arregloCaptura[index].Mezcla == null) ||
            (arregloCaptura[index].ProcesoSoldaduraRaizID == 0 || arregloCaptura[index].ProcesoSoldaduraRaizID == undefined || arregloCaptura[index].ProcesoSoldaduraRaizID == "" || arregloCaptura[index].ProcesoSoldaduraRaizID == null) ||
            (arregloCaptura[index].ProcesoSoldaduraRellenoID == 0 || arregloCaptura[index].ProcesoSoldaduraRellenoID == undefined || arregloCaptura[index].ProcesoSoldaduraRellenoID == "" || arregloCaptura[index].ProcesoSoldaduraRellenoID == null) ||
            (arregloCaptura[index].GrupoPMaterialBase1 == 0 || arregloCaptura[index].GrupoPMaterialBase1 == undefined || arregloCaptura[index].GrupoPMaterialBase1 == "" || arregloCaptura[index].GrupoPMaterialBase1 == null) ||
            (arregloCaptura[index].GrupoPMaterialBase2 == 0 || arregloCaptura[index].GrupoPMaterialBase2 == undefined || arregloCaptura[index].GrupoPMaterialBase2 == "" || arregloCaptura[index].GrupoPMaterialBase2 == null) ||
            (arregloCaptura[index].CodigoASMEID == 0 || arregloCaptura[index].CodigoASMEID == undefined || arregloCaptura[index].CodigoASMEID == "" || arregloCaptura[index].CodigoASMEID == null) ||
            (arregloCaptura[index].Aporte == "" || arregloCaptura[index].Aporte == undefined || arregloCaptura[index].Aporte == null) ||
            (arregloCaptura[index].Respaldo == "" || arregloCaptura[index].Respaldo == undefined || arregloCaptura[index].Respaldo == null) ||
            (arregloCaptura[index].Mezcla == "" || arregloCaptura[index].Mezcla == undefined || arregloCaptura[index].Mezcla == null) ||
            (arregloCaptura[index].GrupoF == "" || arregloCaptura[index].GrupoF == undefined || arregloCaptura[index].GrupoF == null)) {

            ListaDetalles[index].Estatus = 0;
            $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
        }
        else {
            if (pqrModified.length == 0)
                pqrModified = arregloCaptura[index].Nombre;
            else
                pqrModified += ", " + arregloCaptura[index].Nombre;
        }

        ListaDetalles[index].PQRID = arregloCaptura[index].PQRID;
        ListaDetalles[index].Nombre = arregloCaptura[index].Nombre;
        ListaDetalles[index].PWHT = arregloCaptura[index].PWHT ? 1 : 0;
        ListaDetalles[index].PREHEAT = arregloCaptura[index].PREHEAT ? 1 : 0;
        ListaDetalles[index].EspesorRelleno = arregloCaptura[index].EspesorRelleno;
        ListaDetalles[index].EspesorRaiz = arregloCaptura[index].EspesorRaiz;
        ListaDetalles[index].ProcesoSoldaduraRellenoID = arregloCaptura[index].ProcesoSoldaduraRellenoID;
        ListaDetalles[index].ProcesoSoldaduraRaizID = arregloCaptura[index].ProcesoSoldaduraRaizID;
        ListaDetalles[index].NumeroP = arregloCaptura[index].NumeroP;
        ListaDetalles[index].GrupoPMaterialBase1 = arregloCaptura[index].GrupoPMaterialBase1;
        ListaDetalles[index].GrupoPMaterialBase2 = arregloCaptura[index].GrupoPMaterialBase2;
        ListaDetalles[index].Aporte = arregloCaptura[index].Aporte;
        ListaDetalles[index].Mezcla = arregloCaptura[index].Mezcla;
        ListaDetalles[index].Respaldo = arregloCaptura[index].Respaldo;
        ListaDetalles[index].GrupoF = arregloCaptura[index].GrupoF;
        ListaDetalles[index].Codigo = arregloCaptura[index].CodigoASMEID;
        ListaDetalles[index].Accion = arregloCaptura[index].Accion;
    }
    Captura[0].Detalles = ListaDetalles;

    if (!NombreRepetido(ListaDetalles)) {
        if (!ExistRowEmpty(ListaDetalles)) {
            if (Captura[0].Detalles.length > 0 && correcto) {
                loadingStart();
                $PQR.PQR.create(Captura[0], { token: Cookies.get("token"), accion: 2 }).done(function (data) {
                    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
                        displayNotify("", "Los elementos: " + pqrModified + " han sido modificados correctamente", '0');
                        LlenaGridAjax();
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

            ventanaConfirm.content(_dictionary.CapturaAvanceIntAcabadoMensajePreguntaGuardado[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();


            //RowEmpty($("#grid"));

            $("#yesButton").click(function () {
                loadingStart();
                var pqrModified = '';
                ArregloGuardado = [];
                var indice = 0;
                for (var i = 0; i < Captura[0].Detalles.length; i++) {
                    if (Captura[0].Detalles[i].Estatus == 1) {
                        ArregloGuardado[indice] = ListaDetalles[i];

                        if (pqrModified.length == 0)
                            pqrModified = ListaDetalles[i].Nombre;
                        else
                            pqrModified += "," + ListaDetalles[i].Nombre

                        indice++;
                    }
                }

                Captura[0].Detalles = [];
                Captura[0].Detalles = ArregloGuardado;


                if (Captura[0].Detalles.length > 0) {
                    loadingStart();
                    $PQR.PQR.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
                        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
                            displayNotify("", "Los elementos: " + pqrModified + " han sido modificados correctamente", '0');
                            LlenaGridAjax();
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
    }
    else {
        displayNotify("", "El nombre del PQR no se puede repetir", "2");
        opcionHabilitarView(false);
    }
};