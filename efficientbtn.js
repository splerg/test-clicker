// Retrieve data from localStorage or set defaults
let clickCount = localStorage.getItem('clickCount') ? parseInt(localStorage.getItem('clickCount')) : 0;
let clickpower = localStorage.getItem('clickpower') ? parseInt(localStorage.getItem('clickpower')) : 1;
let cps = localStorage.getItem('cps') ? parseInt(localStorage.getItem('cps')) : 0;
let autoclickerowned = localStorage.getItem('autoclickerowned') ? parseInt(localStorage.getItem('autoclickerowned')) : 0;
let autoprice = localStorage.getItem('autoprice') ? parseInt(localStorage.getItem('autoprice')) : 10;
let megaautoowned = localStorage.getItem('megaautoowned') ? parseInt(localStorage.getItem('megaautoowned')) : 0;
let megaprice = localStorage.getItem('megaprice') ? parseInt(localStorage.getItem('megaprice')) : 500;
let superautoowned = localStorage.getItem('superautoowned') ? parseInt(localStorage.getItem('superautoowned')) : 0;
let superprice = localStorage.getItem('superprice') ? parseInt(localStorage.getItem('superprice')) : 5000;

// DOM Elements
let sitetitle = document.getElementById("sitetitle");
let clickscounter = document.getElementById("clickcounter");
let mainbtn = document.getElementById("mainclicker");
let cpscounter = document.getElementById("cps");
let clickpowerlabel = document.getElementById("clickpower");
let abbreviation = ["", "m", "b", "t", "qa", "qi", "sx", "sp", "oc", "no", "dc"];

// Autoclickers
let Autoclicker = document.getElementById("Autoclicker");
let Megaclicker = document.getElementById("Megaclicker");
let Superclicker = document.getElementById("Superclicker");

// Upgrades
let clickupg = document.getElementById("basicupgrade");
let clickupgprice = 5000;
let clickupgpower = 1;
let basiclabel = document.getElementById("basiclabel");
let simpleupg = document.getElementById("simpleupgrade");
let simpleupgprice = 10000;
let simpleupgpower = 2;
let simplelabel = document.getElementById("simplelabel");

// Update the displayed values from localStorage
clickscounter.textContent = "Clicks: " + numberWithCommas(clickCount);
cpscounter.textContent = "CPS: " + cps;
clickpowerlabel.textContent = "Click Power: " + clickpower;
autolabel.textContent = " - Costs: " + autoprice + " (Owned: " + autoclickerowned + ")";
megalabel.textContent = " - Costs: " + megaprice + " (Owned: " + megaautoowned + ")";
superlabel.textContent = " - Costs: " + superprice + " (Owned: " + superautoowned + ")";

// Save data to localStorage when user is leaving the page
window.addEventListener('beforeunload', function () {
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('clickpower', clickpower);
    localStorage.setItem('cps', cps);
    localStorage.setItem('autoclickerowned', autoclickerowned);
    localStorage.setItem('autoprice', autoprice);
    localStorage.setItem('megaautoowned', megaautoowned);
    localStorage.setItem('megaprice', megaprice);
    localStorage.setItem('superautoowned', superautoowned);
    localStorage.setItem('superprice', superprice);
});

// Formatting numbers with commas
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

// Main button click event
mainbtn.onclick = () => {
    clickCount += clickpower;
    clickscounter.textContent = "Clicks: " + numberWithCommas(clickCount);
    localStorage.setItem('clickCount', clickCount);
}

// Autoclicker Buy
buyAutoClick = (auto, price, autoownedVar, clickadd, label) => {
    auto.onclick = () => {
        if (clickCount >= price) {
            clickCount -= price;
            clickscounter.textContent = "Clicks: " + numberWithCommas(clickCount);
            autoownedVar++;
            cps += clickadd;
            cpscounter.textContent = "CPS: " + cps;
            price += Math.round(price / 100 * 10);
            label.textContent = " - Costs: " + price + " (Owned: " + autoownedVar + ")";

            // Save updated values to localStorage
            localStorage.setItem('clickCount', clickCount);
            localStorage.setItem('cps', cps);
            localStorage.setItem(label.getAttribute('id').includes('auto') ? 'autoclickerowned' : 'megaautoowned', autoownedVar);
            localStorage.setItem(label.getAttribute('id').includes('auto') ? 'autoprice' : 'megaprice', price);
        }
    }
}

buyAutoClick(Autoclicker, autoprice, autoclickerowned, autopower, autolabel);
buyAutoClick(Megaclicker, megaprice, megaautoowned, megapower, megalabel);
buyAutoClick(Superclicker, superprice, superautoowned, superpower, superlabel);

// Click Upgrades
buyClickUpgrade = (upg, upgprice, upgpower, upglabel) => {
    upg.onclick = () => {
        if (clickCount >= upgprice && clickCount - upgprice > 0) {
            clickCount -= upgprice;
            clickscounter.textContent = "Clicks: " + numberWithCommas(clickCount);
            clickpower += upgpower;
            upg.disabled = true;
            upglabel.textContent = "Owned!";
            clickpowerlabel.textContent = "Click Power: " + clickpower;

            // Save updated values to localStorage
            localStorage.setItem('clickCount', clickCount);
            localStorage.setItem('clickpower', clickpower);
        }
    }
}

buyClickUpgrade(clickupg, clickupgprice, clickupgpower, basiclabel);
buyClickUpgrade(simpleupg, simpleupgprice, simpleupgpower, simplelabel);

// Auto-clicking function
cps_click = () => {
    clickCount += cps;
    clickscounter.textContent = "Clicks: " + numberWithCommas(clickCount);
    sitetitle.textContent = numberWithCommas(clickCount) + " Clicks - Clicker Game";
    localStorage.setItem('clickCount', clickCount);
}

setInterval(cps_click, 1000);
