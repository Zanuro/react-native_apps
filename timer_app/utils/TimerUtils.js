import {v4 as uuidv4} from 'uuid';

export const milisecondsToHuman = (ms) => {
    var s = Math.floor((ms / 1000) % 60);
    var m = Math.floor((ms / 1000 / 60) % 60);
    var h = Math.floor(ms / 1000 / 3600);

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s;
    return time;
};


export const newTimer = (attrs = {}) =>  {

    const timer = {
        title: attrs.title || 'Timer',
        project: attrs.project || 'Project',
        timeLimit: attrs.timeLimit || null,
        id: uuidv4(),
        elapsed: 0,
        isRunning: false,
    };

    return timer;
}