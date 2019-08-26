$(document).foundation();


// FORMHEADER
var formOpened = false;
var form = document.getElementById("formHeader");
var cbFalse = document.getElementById("cbFalse");
var cbTrue = document.getElementById("cbTrue");
var checkBox = false;


function checkForm() {
    var civ = document.getElementById("civilite");
    var nom = document.getElementById("nom");
    var prenom = document.getElementById("prenom");
    var email = document.getElementById("email");
    var cbTrue = document.getElementById("cbTrue");
    if (civ && civ.value && nom && nom.value && prenom && prenom.value && email && email.value && cbTrue.style.display === "block" && checkMark() === true)
        return true;
    else {
        if (checkMark() === false)
            document.getElementById("formErrorMsg").innerText = "Veuillez mettre une note";
        else if (civ && civ.value && nom && nom.value && prenom && prenom.value && email && email.value)
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

function setMark(nb) {
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
    if (checkForm() === false) {
        return false;
    } else {
    }
}