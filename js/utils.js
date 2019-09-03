function hideOverflow() {
    document.getElementsByTagName("BODY")[0].style.overflow = "hidden";
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function hasData(id) {
    var input = document.getElementById(id);
    return !(input.value === "");
}

function getData(id) {
    var input = document.getElementById(id);
    if (id === "cbTrue")
        return input.style.display === "block";
    if (id === "form_phone")
        return input_phone.getNumber();
    return input.value;
}

function setData(id, data) {
    var input = document.getElementById(id);
    var re1 = /\[/;
    var re2 = /]/;

    if (!data)
        return;
    if (data.search(re1) === 0)
        data = data.replace('[', '');
    if (data.search(re2) === data.length - 1)
        data = data.replace(']', '');
    input.value = data;
}