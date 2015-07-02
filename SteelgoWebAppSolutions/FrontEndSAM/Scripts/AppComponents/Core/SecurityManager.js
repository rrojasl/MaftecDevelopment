﻿/********************************************/
/********************************************/
/*********                          *********/
/*********    Security Manager      *********/
/*********                          *********/
/********************************************/
/********************************************/

/****************************/
/*    Global Variables      */
/****************************/

//Add all global variables for your partial view here

/****************************/
/*    Document Ready        */
/****************************/

//Method to be called on the document ready and contains all the pertinent code for a partial view
function securityManagerToBeExecutedOnDocumentReady() {
    //CODE
}

/****************************/
/*    Global Functions      */
/****************************/

//Method to change the visibility, editability and required attributes of the elements
function applySecurityPolicy() {
    //Block the screen
    loadingStart();

    //If this page its not the login page
    if (Cookies.get("navegacion") != "1") {

        //Execute REST Petition to obtain the user access
        $BackEndSAM.perfil.read({}, { token: Cookies.get("token"), paginaID: Cookies.get("navegacion") }).done(function (data) {
            //Retrieve the context menu definition**
            $contextMenu = {};

            //Retrieve the side menu definition
            generateSideMenu(data);

            //Generate Side Menu
            generateSideMenuDOMElements(0, 0, $(".main-menu"));

            //Retrieve the QuickLinks definition**
            $quickLinks = {};

            //Generate QuickLinks**
            generateQuickLinks();

            //Retrieve the obtained data
            generateReturnOFSecurityCheck(data);

            //Update the token cookie
            if (typeof data.token != undefined && data.token != null && data.token.length > 0) {
                Cookies.set("token", data.token, { path: '/' });
            }

            //Apply Security
            applySecurity();
            loadingStop();
            $("#language").data("kendoDropDownList").trigger("change");
        });
    } else {
        //Apply Security
        applySecurity();
        loadingStop();
    }

}

//Method to update the visibility, required and editable attributes of all elements
function applySecurity() {
    //Obtain the entity list from the $authorizationModel
    var key, entityDefinition, entitySecurity;
    var securityNotFound = true;
    var authorizationModelKeys = Object.keys($authorizationModel);

    //For each entity available for the current page
    for (key in $authorizationModel) {
        //It the page contains the key to be threated
        if ($authorizationModel.hasOwnProperty(key)) {
            //obtain the entity definition
            entityDefinition = $authorizationModel[key];
            if (returnOfSecurityCheck.hasOwnProperty(key)) {
                entitySecurity = returnOfSecurityCheck[key];
                securityNotFound = false;
            }
            applySecurityPolicyForEntity(entityDefinition, entitySecurity, securityNotFound);
            applySecurityPolicyForProperties(entityDefinition, entitySecurity, securityNotFound);
        }
    }
}

//Method to apply the security policy in the entity
//create :: applies to new item buttons
//list :: applies to grids, combos, multiselect, autocompletes
//detail :: applies to show details buttons
//destroy :: applies to remove item buttons
function applySecurityPolicyForEntity(entityDefinition, entitySecurity, securityNotFound) {
    var entityCreationPermission = false;
    var entityListPermission = false;
    var entityDetailPermission = false;
    var entityDestroyPermission = false;

    if (securityNotFound == false) {
        if (entitySecurity.hasOwnProperty("create")) {
            entityCreationPermission = entitySecurity["create"];
        }

        if (entitySecurity.hasOwnProperty("list")) {
            entityListPermission = entitySecurity["list"];
        }

        if (entitySecurity.hasOwnProperty("detail")) {
            entityDetailPermission = entitySecurity["detail"];
        }

        if (entitySecurity.hasOwnProperty("destroy")) {
            entityDestroyPermission = entitySecurity["destroy"];
        }
    }

    if (entityDefinition.hasOwnProperty("listContainer")) {
        if (entityDefinition["listContainer"].hasOwnProperty("create") && entityDefinition.listContainer["create"] != null && entityDefinition.listContainer["create"].length > 0) {
            if (entityCreationPermission == false) {
                $(entityDefinition.listContainer["create"]).css("display", "none");
            }
        }

        if (entityDefinition["listContainer"].hasOwnProperty("list") && entityDefinition.listContainer["list"] != null && entityDefinition.listContainer["list"].length > 0) {
            if (entityListPermission == false) {
                $(entityDefinition.listContainer["list"]).css("display", "none");
            }
        }

        if (entityDefinition["listContainer"].hasOwnProperty("detail") && entityDefinition.listContainer["detail"] != null && entityDefinition.listContainer["detail"].length > 0) {
            if (entityDetailPermission == false) {
                if ($(entityDefinition.listContainer["detail"]).is("a")) {
                    $(entityDefinition.listContainer["detail"]).click(function (e) {
                        e.preventDefault();
                    });
                } else {
                    $(entityDefinition.listContainer["detail"]).css("display", "none");
                }
                
            }
        }

        if (entityDefinition["listContainer"].hasOwnProperty("destroy") && entityDefinition.listContainer["destroy"] != null && entityDefinition.listContainer["destroy"].length > 0) {
            if (entityDestroyPermission == false) {
                $(entityDefinition.listContainer["destroy"]).css("display", "none");
            }
        }
    }
}

//Method to apply the security policy in the entity properties
//Iterate over all properties of an entity
//visible :: applies to containers of a properties, divs with labels and inpunts, etc inside
//editable :: applies to inputs, combos, autocompletes
//required :: applies to inputs, combos, autocompletes, add class "security_required" use this class to validate before submit actions
function applySecurityPolicyForProperties(entityDefinition, entitySecurity, securityNotFound) {
    if (entityDefinition.hasOwnProperty("properties")) {
        for (key in entityDefinition["properties"]) {
            var propertyViewPermission = false;
            var propertyEditPermission = false;
            var propertyRequiredPermission = false;

            if (securityNotFound == false) {
                if (entitySecurity.hasOwnProperty("properties")) {
                    if (entitySecurity.properties.hasOwnProperty(key)) {
                        if (entitySecurity.properties[key].hasOwnProperty("visible")) {
                            propertyViewPermission = entitySecurity.properties[key]["visible"];
                        }

                        if (entitySecurity.properties[key].hasOwnProperty("editable")) {
                            propertyEditPermission = entitySecurity.properties[key]["editable"];
                        }

                        if (entitySecurity.properties[key].hasOwnProperty("required")) {
                            propertyRequiredPermission = entitySecurity.properties[key]["required"];
                        }
                    }
                }
            }

            if (entityDefinition.properties.hasOwnProperty(key)) {
                if (entityDefinition.properties[key].hasOwnProperty("visible") && entityDefinition.properties[key]["visible"] != null && entityDefinition.properties[key]["visible"].length > 0) {
                    if (propertyViewPermission == false) {
                        $(entityDefinition.properties[key]["visible"]).css("display", "none");
                    }
                }

                if (entityDefinition.properties[key].hasOwnProperty("editable") && entityDefinition.properties[key]["editable"] != null && entityDefinition.properties[key]["editable"].length > 0) {
                    if (propertyEditPermission == false) {
                        $(entityDefinition.properties[key]["editable"]).prop('disabled', true);
                        if ($(entityDefinition.properties[key]["required"]).closest('div').hasClass("k-multiselect")) {
                            $(entityDefinition.properties[key]["required"]).data("kendoMultiSelect").enable(false);

                        } /*else if ($(entityDefinition.properties[key]["required"]).closest('div').find('span').hasClass("k-combobox")) {
                            $(entityDefinition.properties[key]["required"]).data("combobox").enable(false);

                        } else if ($(entityDefinition.properties[key]["required"]).closest('div').find('span').hasClass("k-dropdownlist")) {
                            $(entityDefinition.properties[key]["required"]).data("dropdownlist").enable(false);
                            
                        }*/ else {
                            $(entityDefinition.properties[key]["required"]).closest('div').find('span').children('span').children('input').prop('disabled', true);
                            $(entityDefinition.properties[key]["required"]).closest('div').find('span').children('span').children('span').remove();
                        }
                        
                    }
                }

                if (entityDefinition.properties[key].hasOwnProperty("required") && entityDefinition.properties[key]["required"] != null && entityDefinition.properties[key]["required"].length > 0) {
                    if (propertyRequiredPermission == true) {
                        $(entityDefinition.properties[key]["required"]).addClass("security_required");
                        $(entityDefinition.properties[key]["required"]).closest('div').find('label').addClass("security_required");
                    }
                }
            }
        }
    }
}

//Method to hide elements if im in home
function hideElements() {
    if (Cookies.get("home") != null && Cookies.get("home") == "true" &&
            Cookies.get("navegacion") != null && Cookies.get("navegacion") == "1") {
        $(".sidebar").css("display", "none");
        $(".logo").css("display", "none");
        $(".search-bar").css("display", "none");
        $(".notifications").css("display", "none");
        $(".logged-user").css("display", "none");
        $(".content-container").removeClass("topbar");
        $(".breadcrumb-container").css("display", "none");
    }
}

//Method to autogenerate a cookie
function autoCookies(correctCredentials) {
    if (Cookies.get("user") == null && Cookies.get("token") == null) {
        if (correctCredentials) {
            createUserSession("YWRtaW4", "Q2hlbHNlYTEwMiE");
        } else {
            createUserSession("ZZZtaW4", "ZZZlbHNlYTEwMiE");
        }
    }
}

//Method to autogenerate a cookie
function authenticate(username, password) {
    if (Cookies.get("user") == null && Cookies.get("token") == null) {
        createUserSession(encrypt(username), encrypt(password));
    } else {
        validateCredentials();
    }
}

function createUserSession(username, password) {
    //Create Login
    loadingStart();
    $SecurityManager.authentication.create({}, { username: username, password: password }).done(function (data) {
        if (data.IsAuthenicated) {
            Cookies.set("home", false, { path: '/' });
            Cookies.set("user", username, { path: '/' });
            Cookies.set("token", data.ReturnMessage[0], { path: '/' });
            //RedirectToLanding
            document.location.href = $homeURI;
        } else {
            loadingStop();
        }
    });
}

function removeUserSession() {
    if (Cookies.get("user") != null && Cookies.get("token") != null) {
        $SecurityManager.authentication.destroy({}, { username: Cookies.get("user"), token: Cookies.get("token") }).done(function (data) {
            if (!data.IsAuthenicated) {
                Cookies.set("LogOut", true, { path: "/" });
                Cookies.remove("user", { path: '/' });
                Cookies.remove("token", { path: '/' });
                Cookies.remove("home", { path: '/' });
                validateCredentials();
            }
        });
    }
}

function validateCredentials() {
    if (Cookies.get("home") != null && Cookies.get("home") == "false" && Cookies.get("user") != null && Cookies.get("token") != null) {
        loadingStart();
        var request = $SecurityManager.authentication.read({ username: Cookies.get("user"), token: Cookies.get("token") });
        request.done(function (data) {
            if (data.IsAuthenicated) {
                Cookies.set("home", false, { path: '/' });
            } else {
                //RedirectToHomePage
                Cookies.remove("user", { path: '/' });
                Cookies.remove("token", { path: '/' });
                displayMessage("notificationslabel0001", "", '2');
                document.location.href = '/';
            }
            loadingStop();
        });
        request.error(function (data) {
            Cookies.remove("user", { path: '/' });
            Cookies.remove("token", { path: '/' });
            displayMessage("notificationslabel0002", "", '2');
            document.location.href = '/';
            loadingStop();
        });
        request.fail(function (data) {
            Cookies.remove("user", { path: '/' });
            Cookies.remove("token", { path: '/' });
            displayMessage("notificationslabel0003", "", '2');
            document.location.href = '/';

            loadingStop();
        });

    } else {
        if (Cookies.get("home") != null && Cookies.get("home") == "false") {
            //RedirectToHomePage
            document.location.href = '/';
            displayMessage("notificationslabel0004", "", '2');

        } else if (Cookies.get("home") != null && Cookies.get("home") == "true"
                    && Cookies.get("user") != null
                    && Cookies.get("token") != null
                    && Cookies.get("navegacion") != null && Cookies.get("navegacion") == "1") {
            document.location.href = $homeURI;
        } else if (Cookies.get("navegacion") != null && Cookies.get("navegacion") != "1"
                    && Cookies.get("LogOut") != null) {
            Cookies.remove("LogOut", { path: '/' });
            displayMessage("notificationslabel0005", "", '2');
            document.location.href = '/';
        }
    }
}