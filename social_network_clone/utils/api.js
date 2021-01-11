export const getImageFromId = id => `https://unsplash.it/${600}/${600}?image=${id}`;

export const fetchImgs = async () => {
    const resp = await fetch('https://unsplash.it/list');
    const imgs = await resp.json();

    return imgs;
}