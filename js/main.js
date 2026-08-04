const iocField = document.getElementById("ioc");
const kqlField = document.getElementById("kql");

iocField.addEventListener("input", updateKQL)


function updateKQL(e) {
    // kqlField.value = e.target.value;
    if (isIpv4Address(e.target.value)) {
        kqlField.value = "IPv4";
    }
    else if (isIpv6Address(e.target.value)) {
        kqlField.value = "IPv6";
    }
    else if (isMD5(e.target.value)) {
        kqlField.value = "MD5";
    }
    else if (isSHA1(e.target.value)) {
        kqlField.value = "SHA1";
    }
    else if (isSHA256(e.target.value)) {
        kqlField.value = "SHA256";
    }
    else if (isDomain(e.target.value)) {
        kqlField.value = "Domain";
    }
    else if (isURL(e.target.value)) {
        kqlField.value = "URL";
    }
    else if (isEmail(e.target.value)) {
        kqlField.value = "Email";
    }
    else {
        kqlField.value = "";
    }
}

function refang(input) {
    return input
        .replace(/http:\/\//g, "hxxp://")
        .replace(/https:\/\//g, "hxxps://")
        .replace(/\[\.\]/g, ".")
        .replace(/\[@\]/g, "@")
}

function isIpv4Address(input) {
    const regexpIpv4 = /^(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)){3}$/
    return regexpIpv4.test(refang(input))
}

function isIpv6Address(input) {
    const regexIpv6 = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
    return regexIpv6.test(refang(input))
}

function isMD5(input) {
    const regexMD5 = /^[0-9a-fA-F]{32}$/
    return regexMD5.test(refang(input))
}

function isSHA1(input) {
    const regexSHA1 = /^[0-9a-fA-F]{40}$/
    return regexSHA1.test(refang(input))
}

function isSHA256(input) {
    const regexSHA256 = /^[0-9a-fA-F]{64}$/
    return regexSHA256.test(refang(input))
}

function isDomain(input) {
    const regexDomain = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/i;
    return regexDomain.test(refang(input))
}

function isURL(input) {
    const regexUrl = /^https?:\/\/(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}(?::\d{1,5})?(?:\/[^\s]*)?$/i;
    return regexUrl.test(refang(input))
}

function isEmail(input) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/i;
    return regexEmail.test(refang(input))
}