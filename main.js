import dice from "./dice.js"
const cont = document.getElementById('diceContainer');
const diceList = [];

const clearError = ()=>{
    document.getElementById('error').innerHTML = "";
    document.getElementById('error').setAttribute('style', 'display:none');
}
const error = (message) =>{
    document.getElementById('error').innerHTML = message;
    document.getElementById('error').setAttribute('style', 'display:block');
}

const addDice = ()=>{
    let selector = document.getElementById('diceNumber');
    let sides = Number(selector.value);
    if(sides == 0) {
        error('No Number of Sides Selected');
        return;
    }
    clearError()
    let newDice = dice(sides);
    diceList.push(newDice);
    let parent = document.getElementById('diceContainer');
    newDice.displayElement(parent);

    selector.value = 0;
}

const addStandard = () =>{
    clearError();
    document.getElementById('diceNumber').value = 0;
    diceList.splice(0, diceList.length)
    let parent = document.getElementById('diceContainer');

    diceList.push(dice(4,'D&D d4'))
    diceList.push(dice(6,'D&D d6'))
    diceList.push(dice(8,'D&D d8'))
    diceList.push(dice(10,'D&D d10'))
    diceList.push(dice(10,'D&D precent(%)'))
    diceList.push(dice(12,'D&D d12'))
    diceList.push(dice(20,'D&D d20'))

    diceList.forEach(d=>d.displayElement(parent))
}

document.getElementById('addDice').addEventListener('click', addDice);
document.getElementById('addStandard').addEventListener('click', addStandard);

export const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};