$(document).foundation();


// FORMHEADER
var sending = false;
var form = document.getElementById("formHeader");
var cbFalse = document.getElementById("cbFalse");
var cbTrue = document.getElementById("cbTrue");
var checkBox = false;
var userData = {};


function checkForm() {
    if (sending === true)
        return;
    var phone = getData("phone");
    var civ = getData("civilite");
    var nom = getData("nom");
    var prenom = getData("prenom");
    var email = getData("email");
    var cbTrue = getData("cbTrue");

//    console.log("start");
//    console.log("phone = [" + phone + "]");
//    console.log("civ = [" + civ + "]");
//    console.log("nom = [" + nom + "]");
//    console.log("prenom = [" + prenom + "]");
//    console.log("email = [" + email + "]");
//    console.log("cbTrue = [" + cbTrue + "]");
    if (civ && nom && prenom && email && cbTrue === true && checkMark() === true) {
        if (validateEmail(email) === false) {
            document.getElementById("formErrorMsg").innerText = "Addresse E-mail incorrecte";
            return false;
        }
        if (phone && !iti.isValidNumber()) {
            document.getElementById("formErrorMsg").innerText = "Numéro de téléphone incorrect";
            return false;
        }
        $("#formHeaderButton").addClass("disabled");
        sending = true;
        userData.civ = civ;
        userData.nom = nom;
        userData.prenom = prenom;
        userData.phone = phone;
        userData.email = email;
        userData.mark = getMark();
        console.log(userData);
        return true;
    }
    else {

        if (checkMark() === false)
            document.getElementById("formErrorMsg").innerText = "Veuillez mettre une note";
        else if (civ && nom && prenom && email)
            document.getElementById("formErrorMsg").innerText = "Veuillez cocher les conditions";
        else
            document.getElementById("formErrorMsg").innerText = "Veuillez remplir les champs";
        return false;
    }
}

function headerCheckBox(arg) {
    if (arg === false) {
        cbFalse.style.display = "none";
        cbTrue.style.display = "block";
        checkBox = true;
    } else {
        cbFalse.style.display = "block";
        cbTrue.style.display = "none";
        checkBox = false;
    }
}

function getMark() {
    var all = document.getElementsByClassName("number");

    for (var i = 0; i <= 9; i++) {
        if (all[i].getAttribute("selected") === "true")
            return (i + 1);
    }
    return ""
}

function setMark(nb) {
    if (nb > 10)
        return;
    var all = document.getElementsByClassName("number");

    if (all[nb - 1].getAttribute("selected") === "true") {
        all[nb - 1].setAttribute("selected", "false");
        return;
    }
    for (var i = 0; i <= 9; i++) {
        all[i].setAttribute("selected", "false");
    }
    all[nb - 1].setAttribute("selected", "true");
}

function resetMarks() {
    var all = document.getElementsByClassName("number");

    for (var i = 0; i <= 9; i++) {
        all[i].setAttribute("selected", "false");
    }
}

function checkMark() {
    var all = document.getElementsByClassName("number");

    for (var i = 0; i <= 9; i++) {
        if (all[i].getAttribute("selected") === "true")
            return true;
    }
    return false;
}


function validateForm() {
    if (checkForm() === true) {
        sendRequest();
        setThanks();
    }
}

function setThanks() {
    var thanks = document.getElementById("thanks");
    var header = document.getElementById("header");

    header.style.display = "none";
    thanks.style.display = "block";
}

function sendRequest() {
    var data = {};
    data.reveal_lead = {};
    data.woopra = {};
    data.woopra.host = "prometer.io";
    makeCorsRequest(userData);
}


function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

function makeCorsRequest(data) {
    var url = 'https://nps_test.requestcatcher.com/';

     axios.post(url,
         data,
         {
             headers: {
                 "Content-Type":"application/json",
             }
         }
         );
 }