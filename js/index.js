const IMAGES = ['img/heart.png', 'img/diamond.png', 'img/club.png', 'img/spade.png'];
const POSITION = [
    [0, 0], [50, 0], [100, 0], [150, 0], [200, 0], [250, 0],
    [0, 50], [50, 50], [100, 50], [150, 50], [200, 50], [250, 50],
    [0, 100], [50, 100], [100, 100], [150, 100], [200, 100], [250, 100],
    [0, 150], [50, 150], [100, 150], [150, 150], [200, 150], [250, 150],
    [0, 200], [50, 200], [100, 200], [150, 200], [200, 200], [250, 200],
    [0, 250], [50, 250], [100, 250], [150, 250], [200, 250], [250, 250],
    [0, 300], [50, 300], [100, 300], [150, 300], [200, 300], [250, 300]
];

const SUITS_ARR = [];
const DEL_ARR = [];

let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

POSITION.forEach(item => {
    let img = new Image();
    let rand = ~~(Math.random() * 3);
    SUITS_ARR.push(rand);
    img.src = IMAGES[rand];
    img.onload = () => context.drawImage(img, item[0], item[1]);
});

async function goRight(i) {
    if (SUITS_ARR[i + 1] === SUITS_ARR[i] && POSITION[i + 1][1] === POSITION[i][1]) {
        let index = i + 1;
        let test = DEL_ARR.some(item => item === index);
        if (!test) {
            DEL_ARR.push(index);
            await goBottom(index);
            await goTop(index);
            await goRight(index);
        }
    }
}

async function goLeft(i) {
    if (SUITS_ARR[i - 1] === SUITS_ARR[i] && POSITION[i - 1][1] === POSITION[i][1]) {
        let index = i - 1;
        let test = DEL_ARR.some(item => item === index);
        if (!test) {
            DEL_ARR.push(index);
            await goTop(index);
            await goBottom(index);
            await goLeft(index);
        }
    }
}

async function goBottom(i) {
    if (SUITS_ARR[i + 6] === SUITS_ARR[i]) {
        let index = i + 6;
        let test = DEL_ARR.some(item => item === index);
        if (!test) {
            DEL_ARR.push(index);
            await goLeft(index);
            await goRight(index);
            await goBottom(index);
        }
    }
}

async function goTop(i) {
    if (SUITS_ARR[i - 6] === SUITS_ARR[i]) {
        let index = i - 6;
        let test = DEL_ARR.some(item => item === index);
        if (!test) {
            DEL_ARR.push(index);
            await goRight(index);
            await goLeft(index);
            await goTop(index);
        }
    }
}

async function searchSuits(index) {
    DEL_ARR.push(index);
    await goTop(index);
    await goRight(index);
    await goLeft(index);
    await goBottom(index);
}

function deleteSuits() {
    DEL_ARR.forEach(item => {
        let coordination = POSITION[item];
        context.clearRect(coordination[0], coordination[1], 50, 50);
    })
}

canvas.onclick = async (e) => {
    let searchItem = POSITION.find(item => {
        if (item[0] < e.offsetX && item[0] + 50 > e.offsetX && item[1] < e.offsetY && item[1] + 50 > e.offsetY) {
            return item;
        }
    });
    let index = POSITION.indexOf(searchItem);
    await searchSuits(index);
    await deleteSuits();
};