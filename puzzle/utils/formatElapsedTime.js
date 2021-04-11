const formatNum = (number, pad = false) => {
    const numbStr = number.toString();

    if(!pad) return numbStr;

    return numbStr.length < 2 ? `0${numbStr}` : numbStr;
}

export default function formatElapsedTime(elapsed){

    const sec = elapsed % 60;
    const min = Math.floor((elapsed / 60) % 60);
    const hours = Math.floor(elapsed / 60 /  60);

    const parts = [
        hours > 0 && formatNum(hours),
        (hours > 0 || min > 0) && formatNum(min, hours > 0),
        formatNum(sec, hours > 0 || min > 0),
    ];

    return parts.filter(x => x !== false).join(':');
}
