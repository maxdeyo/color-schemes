export function rgbToHex(r, g, b) {
    let hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    hex = hex.slice(0, 6);
    return hex
}

export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


//suggested algorithm based on w3 specs at https://www.w3.org/TR/AERT/#color-contrast
export function setContrast(r, g, b){
    const brightness = Math.round(((parseInt(r) * 299) +
                      (parseInt(g) * 587) +
                      (parseInt(b) * 114)) / 1000);
    return (brightness > 125) ? 'black' : 'white';
}

export function hexSetContrast(hex){
    let rgb = hexToRgb(hex);
    return setContrast(rgb.r, rgb.g, rgb.b);
}