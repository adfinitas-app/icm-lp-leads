$(document).foundation();

// FORMHEADER
var formOpened = false;
var form = document.getElementById("formHeader");
var cbFalse = document.getElementById("cbFalse");
var cbTrue = document.getElementById("cbTrue");
var checkBox = false;
var userData = {};
userData.questions = ["", "", ""];

function openForm() {
    if (formOpened === true)
        return;
    form.style.display = "block";
    form.style.paddingLeft = "74px !important";
    formOpened = true;
    $('#formHeaderButton').attr("onclick", "hideOverflow(); showQuestions();");
}

function checkForm() {
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
    if (civ && nom && prenom && email && cbTrue === true) {
        if (validateEmail(email) === false) {
            document.getElementById("formErrorMsg").innerText = "Addresse E-mail incorrecte";
            return false;
        }
        if (phone && !iti.isValidNumber()) {
            document.getElementById("formErrorMsg").innerText = "Numéro de téléphone incorrect";
            return false;
        }
        userData.civ = civ;
        userData.nom = nom;
        userData.prenom = prenom;
        userData.phone = phone;
        userData.email = email;
        console.log(userData);
        return true;
    }
    else {
        if (civ && nom && prenom && email)
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

function showQuestions() {
    if (checkForm() === false)
        return;
    document.getElementById("header").style.display = "none";
    document.getElementById("question1").style.display = "block";
}


// QUESTIONS
var questionTexts = ["Pensez-vous qu’il sera possible de guérir des pathologies comme la maladie d’Alzheimer par exemple d’ici 10 ans ?",
    "Des personnes de votre entourage sont-elles touchées par une pathologie du système nerveux comme la maladie d’Alzheimer, la maladie de Parkinson, la sclérose en plaques, l’épilepsie, une tumeur cérébrale, un AVC, la maladie de Charcot... ?",
    'D’après-vous, l’ICM est-il le mieux placé <br class="show-for-large"> pour parvenir à guérir ces maladies ?'
];
var questionBg = ["../assets/bgQ1.png", "../assets/bgQ2.png", "../assets/bgQ3.png"];
var questionIndex = 1;
var questionContainer = document.getElementById("question" + questionIndex);
var answerContainer = document.getElementById("answer");
var thanksContainer = document.getElementById("thanks");
var answerText = document.getElementById("answerText");
var questionText = document.getElementById("questionText");
var questionNb = document.getElementById("questionNb");
var errorMsg = "Veuillez choisir une réponse";
var answerTxt = [
    "Comme vous, les plus éminents chercheurs de l’ICM ont de grands espoirs quant à la guérison de ces maladies ainsi que de l’ensemble des maladies du cerveau dans un futur proche.",
    'Comme vous, de nombreuses personnes craignent que ce ne soit pas possible. <br class="show-for-large"> Pourtant, sachez que les plus éminents chercheurs de l’ICM ont de grands espoirs quant à la guérison de ces maladies ainsi que de l’ensemble des maladies du cerveau dans un futur proche.'
];

$(document).ready(function() {changeQuestion()});

function checkAnswer() {
    var btn = document.getElementsByClassName("yesNoButton");
    return btn[0].getAttribute("selected") === "true" || btn[1].getAttribute("selected") === "true";
}

function setErrorMsg() {
    var txt = document.getElementById("errorMsg");
    txt.innerText = errorMsg;
}

function setAnswer() {
    var i = 0;
    var button = document.getElementsByClassName("yesNoButton");
    questionContainer.style.display = "none";
    if (button[0].getAttribute("selected") === "true")
        answerText.innerHTML = answerTxt[0];
    else
        answerText.innerHTML = answerTxt[1];
    answerContainer.style.display = "block";
    $(document).bind('mousewheel', function(e) {
        i++;
        if (i === 1)
            scrollWhy();
    });}

function hideAnswer() {
    questionContainer.style.display = "block";
    answerContainer.style.display = "none";
}

function getQAnswer() {
    var button = document.getElementsByClassName("yesNoButton");

    if (button[1].getAttribute("selected") === "true")
        return "non";
    else
        return "oui";
}

function fillUserData() {
    var value = getQAnswer();
    userData.questions[questionIndex - 2] = value;
}

function changeQuestion(answer) {
    if (checkAnswer() === false && questionIndex > 1 && answer === false) {
        setErrorMsg();
        return;
    }
    if (questionIndex === 2 && answer === false) {
        setAnswer();
        return;
    } else if (questionIndex === 2 && answer === true)
        hideAnswer();
    if (questionIndex === 4) {
        questionContainer.style.display = "none";
        thanksContainer.style.display = "block";
        return;
    }
    if (questionIndex === 2)
        $("#questionText").parent().addClass('large-8 medium-10');
    questionText.innerHTML = questionTexts[questionIndex - 1];
    questionNb.innerText = questionIndex;
    questionContainer.setAttribute("id", "question" + questionIndex);
    questionIndex++;
}

function checkYesNoButtons(nb, type) {
    var all = document.getElementsByClassName("yesNoButton");
    var yes = all[nb * 2];
    var no = all[(nb * 2) + 1];
    document.getElementById("errorMsg").innerText = "";
    if (type === "yes") {
        if (yes.getAttribute("selected") === "true")
            yes.setAttribute("selected", "false");
        else {
            yes.setAttribute("selected", "true");
            no.setAttribute("selected", "false");
        }
    } else {
        if (no.getAttribute("selected") === "true")
            no.setAttribute("selected", "false");
        else {
            no.setAttribute("selected", "true");
            yes.setAttribute("selected", "false");
        }
    }
}

function resetYesNoBtn() {
    var all = document.getElementsByClassName("yesNoButton");
    all[0].setAttribute("selected", "false");
    all[1].setAttribute("selected", "false");
}

// Answer

function scrollWhy() {
    var check = document.getElementById("check");
    var aTxt = document.getElementById('answerText').parentElement;
    var aArr = document.getElementById('answerArrow').parentElement;
    var wPart = document.getElementById("why");
    var wpos = $("#whyPart").position();
    var tpos = $("#answerText").parent().position();
    var apos = $("#answerArrow").parent().position();
    var scale = 1;
    aTxt.style.position = "absolute";
    wPart.style.position = "absolute";
    aArr.style.position = "absolute";
    aTxt.style.top = tpos.top + "px";
    wPart.style.top = wpos.top + "px";
    aArr.style.top = apos.top + "px";
    aTxt.style.transform = "scale(" + scale - 0.01 + ")";
    var inter = setInterval(function () {
        aTxt.style.top = parseInt(aTxt.style.top) - 10 + 'px';
        aTxt.style.transform = "scale(" + scale - 0.01 + ")";
        aArr.style.top = parseInt(aArr.style.top) - 10 + 'px';
        if (parseInt(wPart.style.top) > check.offsetHeight - 50) {
            wPart.style.top = parseInt(wPart.style.top) - 10 + 'px';
        }
    }, 8);
    setTimeout(function () {clearInterval(inter);aTxt.style.display = "none";
        aArr.style.display = "none";
    }, 1000);
}