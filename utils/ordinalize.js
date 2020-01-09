module.exports = function ordinalize(number){
    number += '';

    if(isNaN(number)) return number;

    if(number.length === 1){
        if (number === '1') return number + "st";
        if (number === '2') return number + "nd";
        if (number === '3') return number + "rd";
        if (number != '1'&& number != '2' && number != '3') return number + "th"
    } else {
        secLast = number[number.length - 2];
        lastLast = number[number.length - 1];
        if (secLast === '1') return number + 'th';
        else {
            if (lastLast === '1') return number + "st";
            if (lastLast === '2') return number + "nd";
            if (lastLast === '3') return number + "rd";
            if (lastLast != '1' && lastLast != '2' && lastLast != '3') return number + "th"
        }
    }
};
