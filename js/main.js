const iocField = document.getElementById("ioc");
const kqlField = document.getElementById("kql");

iocField.addEventListener("input", updateKQL)


function updateKQL(e) {
    kqlField.value = formatCategorizedInput(categorizeInput(e.target.value, regexList), iocCategories);
    // console.log(categorizeInput(e.target.value, regexList));
}

function categorizeInput(input, regexList) {
    const words = (input.match(/\S+/g) || [])
        .map(word => word.replace(/`/g, ""));
    console.log(words)
    const arrays = regexList.map(() => []);
    for (const word of words) {
        regexList.forEach((regex, i) => {
            if (regex.test(refang(word))) {
                arrays[i].push(refang(word));
            }
           // global (/g) or sticky regexes: reset position
            regex.lastIndex = 0;
        });
    }
    return arrays;
}

function formatCategorizedInput(categorizedInput, categories) {
    let output_str = ""
    if (categorizedInput.length !== categories.length) {
        throw new Error('Either too many or too little categories present.');
    }
    for (let i = 0; i < categories.length; i += 1) {
        if (categorizedInput[i].length > 0) {
            let len = categorizedInput[i].length;
            output_str += "let Malicious" + categories[i] + "s = pack_array(\n";
            for (let j = 0; j < len - 1; j += 1) {
                output_str += '    "' + categorizedInput[i][j] + '",\n';
            }
            output_str += '    "' + categorizedInput[i][len - 1] + '"\n);\n';
        }
    }
    return output_str;
}

function refang(input) {
    return input
        .replace(/\[\:\]/g, ":")
        .replace(/hxxp:\/\//g, "http://")
        .replace(/hxxps:\/\//g, "https://")
        .replace(/\[\.\]/g, ".")
        .replace(/\[@\]/g, "@")
}

const regexList = [
    /^(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)){3}$/, // IPv4
    /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/, // Dumb IPv6 (no :: simplification)
    /^[0-9a-fA-F]{32}$/, // MD5
    /^[0-9a-fA-F]{40}$/, // SHA1
    /^[0-9a-fA-F]{64}$/, // SHA256
    /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/i, // Domain
    /^https?:\/\/(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}(?::\d{1,5})?(?:\/[^\s]*)?$/i, // URL
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/i, // Email
]

const iocCategories = [
    "IPv4",
    "IPv6",
    "MD5",
    "SHA1",
    "SHA256",
    "Domain",
    "URL",
    "Email"
]
