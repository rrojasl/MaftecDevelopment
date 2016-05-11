function CargarGridPopUp() {

    $("#windowPopUp").kendoWindow({
        width: "600px",
        title: "About Alvar Aalto",
        visible: false,
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
        close: onClose
    });
};