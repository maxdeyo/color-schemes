export function filterDuplicates(colorArr){
    return colorArr.filter(function(color, x) {
        return colorArr.indexOf(color) == x;
    })
}