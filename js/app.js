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
var mark = 0;
var first = true;
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
            userData.hasPhone = "true";
        } else {
            userData.phone = "";
            userData.hasPhone = "false";
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
    validateForm();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    screen = 'question1';
    document.getElementById("header").style.display = "none";
    document.getElementById("question1").style.display = "block";
}


// QUESTIONS
var questionTexts = ["Pensez-vous qu’il sera possible de guérir des pathologies comme la maladie d’Alzheimer par exemple d’ici 10 ans&nbsp;?",
    "Des personnes de votre entourage sont-elles touchées par une pathologie du système nerveux comme la maladie d’Alzheimer, la maladie de Parkinson, la sclérose en plaques, l’épilepsie, une tumeur cérébrale, un AVC, la maladie de Charcot, un traumatisme de la moelle épinière&nbsp;.&nbsp;.&nbsp;.&nbsp;?",
    'Saviez-vous que l\'Institut du Cerveau et de la Moelle épinière, qui réunit patients, médecins et chercheurs au cœur de l’Hôpital de la Pitié-Salpêtrière, est un centre de renommée mondiale en mesure de faire progresser la recherche sur les maladies qui s’attaquent au cerveau&nbsp;?'
];
var scroll = 0;
var questionBg = ["../assets/bGQ1.png", "../assets/bgQ2.png", "../assets/bgQ3.png"];
var questionIndex = 1;
var questionContainer = document.getElementById("question" + questionIndex);
var answerContainer = document.getElementById("answer");
var thanksContainer = document.getElementById("thanks");
var noteContainer = document.getElementById("note");
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
        "<img src=\"https://orixamedia.go2cloud.org/SLbO" +
        "\" width=\"1\" height=\"1\" />\n" +
        "<!-- // End Offer Conversion -->" +
        "<img height=\"1\" width=\"1\" style=\"display:none\"\n" +
        "  src=\"https://www.facebook.com/tr?id=1089525207882561&ev=LeadOK&noscript=1\"\n" +
        "/>";
    document.getElementById("script1").innerHTML = "if(sessionStorage.getItem(\"idMbz\") && sessionStorage.getItem(\"maild5\") && sessionStorage.getItem(\"idcampagne\")){\n" +
        "            (function () {\n" +
        "                var ZTR = document.createElement('script');\n" +
        "                ZTR.src = ((location.protocol === 'https:') ? 'https:' : 'http:') + '//prz.mesopinions.com/tracking/add?idcampagne='+sessionStorage.getItem(\"idcampagne\")+'&md5='+sessionStorage.getItem(\"maild5\")+'&idmindbaz='+sessionStorage.getItem(\"idMbz\")+'&client=icm';\n" +
        "                var ZTRtag = document.getElementsByTagName('script')[0];\n" +
        "                ZTRtag.parentNode.insertBefore(ZTR, ZTRtag); }())\n" +
        "        }";
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
        noteContainer.style.display = "block";
        questionIndex++;
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
    if (first === false) {
        sendRequest(first);
    }
    if (checkForm() === true && first === true) {
        putTrackingPixel();
        sendRequest(first);
        first = false;
    }
}

function sendRequest(first) {
    var mdEmail = md5(userData.email);
    var data;
    var date = Date.now()
    if (first === true) {
        data = {
            "reveal_lead": {
                "source": getUrlParam("utm_source") !== null ? getUrlParam("utm_source") :  "DIRECT",
                "contacts": [
                    {
                        "app_id": "icm-institute.org",
                        "campaign": getUrlParam("utm_campaign") !== null ? getUrlParam("utm_campaign") : "2019-AUTRE-GRANDE-ENQUETE",
                        "medium": getUrlParam("utm_medium") !== null ? getUrlParam("utm_medium") : "ORGANIC",
                        "interface": "LP-CLIENT",
                        "email": userData.email,
                        "firstname": userData.prenom,
                        "lastname": userData.nom,
                        "gender": userData.civ === "Monsieur" ? "M" : "F",
                        "phone": userData.phone,
                        "emailMD5": md5(userData.email)
                    }
                ]
            },
            "woopra": {
                "host": "prometer.io",	// Nom du projet dans Woopra.
                /* Variables de configuration de la fiche utilisateur, préfixe : "cv_" */
                "cv_firstname": userData.prenom,
                "cv_lastname": userData.nom,
                "cv_name": userData.prenom + " " + userData.nom,
                "cv_email": userData.email,
                "cv_civility": userData.civ === "Monsieur" ? "Monsieur" : "Madame",
                "cv_gender": userData.civ === "Monsieur" ? "M" : "F",
                "cv_phone": userData.phone,
                "cv_email_md5": md5(userData.email),
                /* Variables de l'événement, : préfixe : "ce_" */
                "event": "adfinitas_leads",
                "ce_phone": userData.phone,
                "ce_app_id": "icm-institute.org",
                "ce_gender": userData.civ === "Monsieur" ? "M" : "F",
                "ce_email": userData.email,
                "ce_interface": "LP-CLIENT",
                "ce_email_md5": md5(userData.email),
                "ce_campaign_name": getUrlParam("utm_campaign") !== null ? getUrlParam("utm_campaign") : "2019-AUTRE-GRANDE-ENQUETE",
                "ce_campaign_source": getUrlParam("utm_source") !== null ? getUrlParam("utm_source") : "DIRECT",
                "ce_campaign_medium": getUrlParam("utm_medium") !== null ? getUrlParam("utm_medium") : "ORGANIC"
            },
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
                "optinPhone": userData.hasPhone,
                "segments": "QICM_2019",
                "creationDate": date.toString(),
                "civility": userData.civ === "Monsieur" ? "Mr" : "Miss",
                "reservedFields": {
                    "MD5": mdEmail
                }
            },
        };
    } else {
        data = {
            "iraiser": {
                "email": userData.email,
                "origin": "OTHER",
                "originName": "QICM",
                "originCampaign": "adfinitas_leads",
                "originCampaignId": "1",
                "optinEmail": "true",
                "reservedFields": {
                    "QICM_questionAlzheimer": userData.questions[0].toUpperCase(),
                    "QICM_questionEntourage": userData.questions[1].toUpperCase(),
                    "QICM_ICM": userData.questions[2].toUpperCase()
                }
            }
        };
        makeCorsRequest(data);
        /*Data for the mark*/
        data = {
            "reveal_nps": {
                "source": getUrlParam("utm_source") !== null ? getUrlParam("utm_source") :  "DIRECT",
                "contacts": [
                    {
                        "app_id": "icm-institute.org",
                        "campaign": getUrlParam("utm_campaign") !== null ? getUrlParam("utm_campaign") : "2019-AUTRE-GRANDE-ENQUETE",
                        "medium": getUrlParam("utm_medium") !== null ? getUrlParam("utm_medium") : "ORGANIC",
                        "interface": "LP-CLIENT",
                        "email": userData.email,
                        "firstname": userData.prenom,
                        "lastname": userData.nom,
                        "gender": userData.civ === "Monsieur" ? "M" : "F",
                        "phone": userData.phone,
                        "emailMD5": md5(userData.email),
                        "note": getMark()
                    }
                ]
            },
            "woopra": {
                "host": "prometer.io",	// Nom du projet dans Woopra.
                /* Variables de configuration de la fiche utilisateur, préfixe : "cv_" */
                "cv_firstname": userData.prenom,
                "cv_lastname": userData.nom,
                "cv_name": userData.prenom + " " + userData.nom,
                "cv_email": userData.email,
                "cv_civility": userData.civ === "Monsieur" ? "Monsieur" : "Madame",
                "cv_gender": userData.civ === "Monsieur" ? "M" : "F",
                "cv_note": getMark(),
                "cv_phone": userData.phone,
                "cv_email_md5": md5(userData.email),
                /* Variables de l'événement, : préfixe : "ce_" */
                "event": "adfinitas_nps",
                "ce_phone": userData.phone,
                "ce_app_id": "icm-institute.org",
                "ce_gender": userData.civ === "Monsieur" ? "M" : "F",
                "ce_note": getMark(),
                "ce_email": userData.email,
                "ce_interface": "LP-CLIENT",
                "ce_email_md5": md5(userData.email),
                "ce_campaign_name": getUrlParam("utm_campaign") !== null ? getUrlParam("utm_campaign") : "2019-AUTRE-GRANDE-ENQUETE",
                "ce_campaign_source": getUrlParam("utm_source") !== null ? getUrlParam("utm_source") : "DIRECT",
                "ce_campaign_medium": getUrlParam("utm_medium") !== null ? getUrlParam("utm_medium") : "ORGANIC"
            },
            "iraiser": {
                "email": userData.email,
                "contactExternalScore": getMark(),
                "origin": "OTHER",
                "originName": "QICM",
                "originCampaign": "adfinitas_leads",
                "originCampaignId": "1",
                "segments": "QICM_2019",
                "language": "fr_FR",
                "optinEmail": "true",
                "optinMail": "true",
                "optinPhone": userData.hasPhone,
                "firstName": userData.prenom,
                "lastName": userData.nom,
                "gender": userData.civ === "Monsieur" ? "M" : "F",
                "phone": userData.phone,
                "creationDate": date.toString(),
                "civility": userData.civ === "Monsieur" ? "Mr" : "Miss",
                "reservedFields": {
                    "MD5": mdEmail
                }
            },
        };
    }
    makeCorsRequest(data);
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
    var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/cd989e97-becb-41fe-a329-889cbcba2d78/webhook/cabf136b-ca19-4383-bb37-aacb4983ea4e';
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

function getMark() {
    var all = document.getElementsByClassName("number");

    for (var i = 0; i <= 9; i++) {
        if (all[i].getAttribute("selected") === "true")
            return (i + 1);
    }
    return ""
}

function checkBeforeValidate() {
    if (checkMark() == false) {
        document.getElementById("formErrorMsgNote").innerText = "Veuillez mettre une note";
        return;
    }
    mark = getMark();
    noteContainer.style.display = "none";
    thanksContainer.style.display = "block";
    validateForm();
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