import {uuid} from "./main.js";

const randomIntFromInterval = (min, max)=> { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default (s, n) => {
    let sides = s || 20;
    const id = uuid();
    const diceHistory = [];
    let name = n || sides + 'ed dice';

    const roll = () =>{
        let r = randomIntFromInterval(1,sides);
        diceHistory.unshift(r);
        return r;
    }

    const clearHistory = ()=>{
        diceHistory.splice(0,diceHistory.length)
    }

    const displayElement = (parent)=>{
        let showHistory = false;
        let root = document.createElement('div');

        let html = `
            <div id='${id}' class='diceHolder'>
                <div class='diceHeader'>
                    <label>1 - ${sides}</label>
                    <span class='remove'> X </span>
                </div>
                <div class='diceName'>${name}</div>
                <button class= 'rollDiceButton'>Roll Dice</button>
                <div class='currentRoll'> - </div>
                <div class='historyHeader'><span>Dice History</span><span class='historyToggle'> v </span></div>
                <div class="diceHistory" style='display:none'>
                </div>
            </div>
        `;
        root.innerHTML = html;
        parent.appendChild(root);

        let current = root.querySelector('.currentRoll');

        let rollButton = root.querySelector('.rollDiceButton');
        rollButton.addEventListener('click', ()=>{
            console.log('clicked')
            rollButton.setAttribute('disabled', true);
            root.querySelector('.diceHistory').innerHTML = diceHistory
                    .map(h=>`<div class='historyItem'>${h}</div>`)
                    .join('');

            let r = roll();

            let ticks = 0;
            let inter = setInterval(()=>{
                current.innerHTML = `<span class='rolling'>${randomIntFromInterval(1, sides)}</span>`;                                    
                if(ticks > 15){
                    clearInterval(inter)
                    finish()
                }
                ticks += 1;
            },100);

            let finish = () =>{
                current.innerHTML = r;
                rollButton.disabled = false;
            }
        })

        let remove = root.querySelector('.remove');
        remove.addEventListener('click', ()=>{
            root.remove()
        });

        let historyToggle = root.querySelector('.historyHeader');
        historyToggle.addEventListener('click', ()=>{
            showHistory = showHistory ? false:true;
            root.querySelector('.diceHistory').setAttribute('style', `display:${showHistory?'block':'none'}`)
            root.querySelector('.historyToggle').innerHTML = showHistory ? ' ^ ' : ' v '
        });
    }

    return {sides, diceHistory, roll, clearHistory, displayElement}
}