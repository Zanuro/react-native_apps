


import uuidv4 from 'uuid/v4';

import capitalize from '../utils/capitalize';

const mapContact = contact => {

    const {
        name, picture, phone, cell, email
    } = contact;

    return {
        id: uuidv4(),
        name: `${capitalize(name.first)} ${capitalize(name.last)}`,
        avatar: picture.large,
        phone,
        cell,
        email,
        favorite: Math.random() >= 0.5,
    };
}


export const fetchContacts = async () => {
    const resp = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio'),
    const contData = await resp.json();

    return contData.results.map(mapContact);
}


export const fetchUserContacts = async () => {
    const resp = await fetch('https://randomuser.me/api/?seed=fullstackio'),
    const usData = await resp.json();

    return mapContact(usData.results[0]);
}

export const fetchRandomCont = async () => {
    const resp = await fetch('https://randomuser.me/api/'),
    const usData = await resp.json();

    return mapContact(usData.results[0]);
}

