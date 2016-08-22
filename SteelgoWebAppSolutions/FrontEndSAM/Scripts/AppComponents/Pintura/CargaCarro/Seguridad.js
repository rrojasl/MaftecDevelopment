
Cookies.set("home", true, { path: '/' });
Cookies.set("navegacion", "10032", { path: '/' });

var $CargaCarroModel = {
    listContainer: {
        create: "",
        list: "",
        detail: "",
        destroy: ""
    },
    properties: {
        InputCarro: {
            visible: "#InputCarroDiv",
            editable: "#inputCarro",
            required: "#inputCarro",
        },
        InputID: {
            visible: "#InputIDDiv",
            editable: "#InputID",
            required: "#InputID",
        },
        InputNombre: {
            visible: "#InputNombreDiv",
            editable: "#InputNombre",
            required: "#InputNombre",
        },
        InputCarroBacklog: {
            visible: "#InputCarroBackDiv",
            editable: "#inputCarroBacklog",
            required: "#inputCarroBacklog",
        },
        InputProyecto: {
            visible: "#InputProyectoDiv",
            editable: "#inputProyecto",
            required: "#inputProyecto",
        }

    }
};
