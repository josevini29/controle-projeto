export function isPropried(obj, propried) {
    for (let prop in obj) {
        if (prop === propried) {
            return true;
        }
    }
    return false;
}

export function getTaskStatus(status) {
    switch (status) {
        case 1:
            return "Desenvolvimento";
        case 2:
            return "Finalizado";
        default:
            return "Undefined";
    }
}

export function getProjectStatus(status) {
    switch (status) {
        case 1:
            return "Desenvolvimento";
        case 2:
            return "Implantado";
        default:
            return "Undefined";
    }
}