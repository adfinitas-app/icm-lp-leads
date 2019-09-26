$(document).foundation();

// FORMHEADER
var sending = false;
var formOpened = false;
var form = document.getElementById("formHeader");
var formC = document.getElementById("formHeaderContainer");
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
    formC.style.marginTop = "-20px";
    $('#formHeaderButton').attr("onclick", "showQuestions();");
}

function checkForm() {
    if (sending === true)
        return;
    var phone = iti.getNumber();
    var civ = getData("civilite");
    var nom = getData("nom");
    var prenom = getData("prenom");
    var email = getData("email");
    var cbTrue = getData("cbTrue");

    if (civ && nom && prenom && email && cbTrue === true) {
        if (validateEmail(email) === false) {
            document.getElementById("formErrorMsg").innerText = "Addresse E-mail incorrecte";
            return false;
        }
        if (phone && !iti.isValidNumber()) {
            document.getElementById("formErrorMsg").innerText = "Numéro de téléphone incorrect";
            return false;
        }
        $("#formHeaderButton").addClass("disabled");
        userData.civ = civ;
        userData.nom = nom;
        userData.prenom = prenom;
        if (phone) {
            userData.phone = phone;
            userData.hasPhone = true;
        } else {
            userData.phone = "";
            userData.hasPhone = false;
        }
        userData.email = email;
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
    if (checkForm() === false) {
        return;
    }
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    screen = 'question1';
    document.getElementById("header").style.display = "none";
    document.getElementById("question1").style.display = "block";
}


// QUESTIONS
var questionTexts = ["Pensez-vous qu’il sera possible de guérir des pathologies comme la maladie d’Alzheimer par exemple d’ici 10 ans&nbsp;?",
    "Des personnes de votre entourage sont-elles touchées par une pathologie du système nerveux comme la maladie d’Alzheimer, la maladie de Parkinson, la sclérose en plaques, l’épilepsie, une tumeur cérébrale, un AVC, la maladie de Charcot, un traumatisme de la moelle épinière&nbsp;.&nbsp;.&nbsp;.&nbsp;?",
    'D’après-vous, l’ICM est-il le mieux placé <br class="show-for-large"> pour parvenir à guérir ces maladies&nbsp;?'
];
var scroll = 0;
var questionBg = ["../assets/bGQ1.png", "../assets/bgQ2.png", "../assets/bgQ3.png"];
var questionIndex = 1;
var questionContainer = document.getElementById("question" + questionIndex);
var answerContainer = document.getElementById("answer");
var thanksContainer = document.getElementById("thanks");
var answerText = document.getElementById("answerText");
var questionText = document.getElementById("questionText");
var questionNb = document.getElementById("questionNb");
var errorMsg = "Veuillez choisir une réponse";
var answerTxt = [
    "Comme vous, les plus éminents chercheurs de l'Institut du Cerveau et de la Moelle épinière ont de grands espoirs quant à la guérison de ces maladies ainsi que de l’ensemble des maladies du cerveau dans un futur proche.",
    'Comme vous, de nombreuses personnes craignent que ce ne soit pas possible. <br class="show-for-large"> Pourtant, sachez que les plus éminents chercheurs de l\'Institut du Cerveau et de la Moelle épinière ont de grands espoirs quant à la guérison de ces maladies ainsi que de l’ensemble des maladies du cerveau dans un futur proche.'
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
    screen = 'answer';
    $(document).bind('mousewheel', function(e) {
        scroll++;
        if (scroll === 1) {
    //        scrollWhy();
        }
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

function putTrackingPixel() {
    document.getElementById("pixelTracking").innerHTML = "<!-- Offer Conversion: ICM - Enquête -->\n" +
        "<img src=\"https://orixamedia.go2cloud.org/SLbOhttps://orixamedia.go2cloud.org/SLbO" +
        "\" width=\"1\" height=\"1\" />\n" +
        "<!-- // End Offer Conversion -->"
}

function changeQuestion(answer) {
    if (checkAnswer() === false && questionIndex > 1 && answer === false) {
        setErrorMsg();
        return;
    }
    if (questionIndex === 2 && answer === false) {
        setAnswer();
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        return;
    } else if (questionIndex === 2 && answer === true)
        hideAnswer();
    if (questionIndex === 4) {
        questionContainer.style.display = "none";
        thanksContainer.style.display = "block";
        validateForm();
        return;
    }
    if (questionIndex === 2)
        $("#questionText").parent().addClass('large-9 medium-11');
    questionText.innerHTML = questionTexts[questionIndex - 1];
    questionNb.innerText = questionIndex;
    questionContainer.setAttribute("id", "question" + questionIndex);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    if (questionIndex !== 1)
        screen = "question" + questionIndex;
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

function validateForm() {
    if (checkForm() === true) {
        putTrackingPixel();
        sendRequest();
    }
}

function sendRequest() {
    var data = {
        "iraiser": {
            "email": userData.email,
            "origin": "OTHER",
            "originName": "QICM",
            "originCampaign": "adfinitas_leads",
            "originCampaignId": "1",
            "optinEmail": "true",
            "language": "fr_FR",
            "gender": userData.civ === "Monsieur" ? "M" : "F",
            "lastName": userData.nom,
            "firstName": userData.prenom,
            "phone": userData.phone,
            "optinMail": "true",
            "optinPhone": userData.hasPhone === true ? "true" : "false",
            "segments": "QICM_2019",
            "creationDate": Date.now().toString(),
            "reservedFields": {
                "QICM_questionAlzheimer": userData.questions[0].toUpperCase(),
                "QICM_questionEntourage": userData.questions[1].toUpperCase(),
                "QICM_ICM": userData.questions[2].toUpperCase(),
                "MD5": md5(userData.email)
            }
        }
    };
  //  makeCorsRequest(userData);
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
    //var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/cd989e97-becb-41fe-a329-889cbcba2d78/webhook/cabf136b-ca19-4383-bb37-aacb4983ea4e';
    var body = JSON.stringify(data);

    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);

    /*
         axios.post(url,
     body,
     {
         headers: {
             "Content-Type":"application/json",
         }
     }
     );
     */
}