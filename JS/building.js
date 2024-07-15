import { createFloatingText } from './createFloatingText.js';
import { buildingConfig } from './buildingConfig.js';

let intervals = {};

export function loadBuildings() {
    const buildingsContainer = document.getElementById('buildings');

    for (let key in buildingConfig) {
        const building = buildingConfig[key];

        let price = parseInt(localStorage.getItem(`${building.name}Price`)) || building.initialPrice;
        let qtd = parseInt(localStorage.getItem(`${building.name}Qtd`)) || 0;

        console.log(building);

        const buildingElement = document.createElement('div');
        buildingElement.classList.add('building');
        buildingElement.id = key;

        buildingElement.innerHTML = `
                <span id="qtd${key}">${qtd}</span> | ${building.name}<br />
                <img id="melanciazinha" src="images/melanciazinha.png"><span id="price${key}">${price}</span><br />
                <span id="vel${key}">0</span> mps
        `;

        buildingsContainer.appendChild(buildingElement);

        document.getElementById(key).addEventListener('click', (event) => {
            applyBuilding(event.clientX, event.clientY, building, key);
        });

        let velDisplay = document.getElementById("vel" + key);
        if (qtd > 0) {
            startBuildingInterval(building, qtd, velDisplay);
        }
    }
}

export function applyBuilding(x, y, buildingConfig, key) {

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let price = parseInt(localStorage.getItem(`${buildingConfig.name}Price`)) || buildingConfig.initialPrice;
    let qtd = parseInt(localStorage.getItem(`${buildingConfig.name}Qtd`)) || 0;
    let contador = document.getElementById('contador');

    let priceDisplay = document.getElementById("price" + key);
    let qtdDisplay = document.getElementById("qtd" + key);
    let velDisplay = document.getElementById("vel" + key);

    if (melancias >= price) {
        localStorage.setItem("melancias", (melancias -= price));
        contador.innerText = parseInt(localStorage.getItem("melancias"));

        price = Math.ceil(price * buildingConfig.priceMultiplier);
        priceDisplay.innerText = price;
        localStorage.setItem(`${buildingConfig.name}Price`, price);

        qtdDisplay.innerText = ++qtd;
        localStorage.setItem(`${buildingConfig.name}Qtd`, qtd);

        let vel = (1000 / (buildingConfig.productionRate / qtd)).toFixed(2);
        velDisplay.innerText = vel;

        startBuildingInterval(buildingConfig, qtd, velDisplay);

    } else {
        createFloatingText(x, y, "Faltam " + (price - melancias) + " melancias para comprar " + buildingConfig.name, "red");
    }
}

function startBuildingInterval(buildingConfig, qtd, velDisplay) {

    if (velDisplay) {
        let vel = (1000 / (buildingConfig.productionRate / qtd)).toFixed(2);
        velDisplay.innerText = vel;
    }

    if (intervals[buildingConfig.name]) {
        clearInterval(intervals[buildingConfig.name]);
    }

    intervals[buildingConfig.name] = setInterval(() => {
        let melancias = parseInt(localStorage.getItem("melancias")) || 0;
        localStorage.setItem("melancias", (melancias + qtd));
        document.getElementById('contador').innerText = parseInt(localStorage.getItem("melancias"));
    }, buildingConfig.productionRate);
}