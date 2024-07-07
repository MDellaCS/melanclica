export function initializeUpgrade1(priceDisplay, qtdDisplay, velDisplay) {

    console.log("\n\nCriando Up1\n");

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let price = parseInt(localStorage.getItem("price1")) || 10;
    let qtd = parseInt(localStorage.getItem("qtd1")) || 0;

    priceDisplay.innerText = price;
    qtdDisplay.innerText = qtd;

    console.log("Melancias: " + melancias + "\nPreço: " + price + "\nQuantidade: " + qtd);
}

let upgrade1IntervalId;

export function applyUpgrade1(priceDisplay, qtdDisplay, velDisplay) {

    console.log("\n\nComprando Up1\n");

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let price = parseInt(localStorage.getItem("price1")) || 10;
    let qtd = parseInt(localStorage.getItem("qtd1")) || 0;
    let contador = document.getElementById('contador');

    if (melancias >= price) {
        localStorage.setItem("melancias", (melancias -= price));
        contador.innerText = parseInt(localStorage.getItem("melancias"));
        price = Math.ceil(price * 1.2);
        priceDisplay.innerText = price;
        qtdDisplay.innerText = ++qtd;
        localStorage.setItem("price1", price);
        localStorage.setItem("qtd1", qtd);

        console.log("Melancias: " + melancias + "\nPreço: " + price + "\nQuantidade: " + qtd);

        if (upgrade1IntervalId) {
            clearInterval(upgrade1IntervalId);
        }

        let vel = (1000 / (5000 / qtd)).toFixed(2);

        upgrade1IntervalId = setInterval(() => {
            melancias = parseInt(localStorage.getItem("melancias"));
            localStorage.setItem("melancias", (melancias + 1));
            contador.innerText = parseInt(localStorage.getItem("melancias"));
        }, 5000 / qtd);

        velDisplay.innerText = vel;

    } else {
        console.log("Melancias insuficientes para Up1");
    }
}