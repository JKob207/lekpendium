export function pad(value) //formating timer time
{
    let valString = value + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}