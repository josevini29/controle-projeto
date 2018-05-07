
export function getDateNowJSON() {
    let data = new Date();
    let dataDesc = data.getFullYear();
    dataDesc += returnValue((data.getMonth() + 1).toString());
    dataDesc += returnValue(data.getDate().toString());
    dataDesc += returnValue(data.getHours().toString());
    dataDesc += returnValue(data.getMinutes().toString());
    dataDesc += returnValue(data.getSeconds().toString());
    return parseInt(dataDesc);
}

function returnValue(valor) {
    return valor.length === 1 ? '0' + valor.toString() : valor.toString();
}

export function formatDateJSONtoBR(data) {
    data = data.toString();
    let dateDesc = "";
    dateDesc += data.substring(6,8) + "/";
    dateDesc += data.substring(4,6) + "/";
    dateDesc += data.substring(2,4) + " ";
    dateDesc += data.substring(8,10) + ":";
    dateDesc += data.substring(10,12);
    return dateDesc;
}