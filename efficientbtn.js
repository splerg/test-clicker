//variables
let clicks = localStorage.getItem('clickCount') ? parseInt(localStorage.getItem('clickCount')) : 0;
let sitetitle = document.getElementById("sitetitle");
let clickscounter = document.getElementById("clickcounter");
let mainbtn = document.getElementById("mainclicker");
let cpscounter = document.getElementById("cps");
let clickpowerlabel = document.getElementById("clickpower");
let abbreviation = ["", "m", "b", "t", "qa", "qi", "sx", "sp", "oc", "no", "dc"];

//Autoclickers
let Autoclicker = document.getElementById("Autoclicker");
let Megaclicker = document.getElementById("Megaclicker");
let Superclicker = document.getElementById("Superclicker");

//Upgrades
let clickupg = document.getElementById("basicupgrade");
let clickupgprice = 5000;
let clickupgpower = 1;
let basiclabel = document.getElementById("basiclabel");
let simpleupg = document.getElementById("simpleupgrade");
let simpleupgprice = 10000;
let simpleupgpower = 2;
let simplelabel = document.getElementById("simplelabel")

//upgrade variables
let autoclickerowned = 0;
let autoprice = 10;
let autopower = 1;
let autolabel = document.getElementById("autolabel")
let megaautoowned = 0;
let megaprice = 500;
let megapower = 5;
let megalabel = document.getElementById("megalabel")
let superautoowned = 0;
let superprice = 5000;
let superpower = 100;
let superlabel = document.getElementById("superlabel")

let cps = 0;
let clickpower = 1;

window.addEventListener('beforeunload', function () {
    localStorage.setItem('clickCount', clickCount);
});

//Formatting
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

//main button
mainbtn.onclick = () => {
    clicks += clickpower;
    clickscounter.textContent = ("Clicks: " + numberWithCommas(clicks));
}

//Autoclicker Buy
buyAutoClick = (auto, price, autoowned, clickadd, label) => {
    auto.onclick = () => {
        if (clicks - price >= 0) {
            clicks -= price;
            clickscounter.textContent = ("Clicks: " + numberWithCommas(clicks));
            autoowned += 1;
            cps += clickadd;
            cpscounter.textContent = ("CPS: " + cps);
            price = (price += Math.round(price/100*10));
            label.textContent = (" - Costs: "+ price +" (Owned: " + autoowned + ")");
        }
    }
}

buyAutoClick(Autoclicker, autoprice, autoclickerowned, autopower, autolabel);
buyAutoClick(Megaclicker, megaprice, megaautoowned, megapower, megalabel);
buyAutoClick(Superclicker, superprice, superautoowned, superpower, superlabel);

//Click Upgrades
buyClickUpgrade = (upg, upgprice, upgpower, upglabel) => {
    upg.onclick = () => {
        if (clicks >= upgprice && clicks - upgprice > 0) {
            clicks -= upgprice;
            clickscounter.textContent = ("Clicks: " + numberWithCommas(clicks));
            clickpower += upgpower;
            upg.disabled = true;
            upglabel.textContent = ("Owned!");
            clickpowerlabel.textContent = ("Click Power: " + clickpower)
        }
    }
}

buyClickUpgrade(clickupg, clickupgprice, clickupgpower, basiclabel);
buyClickUpgrade(simpleupg, simpleupgprice, simpleupgpower, simplelabel);

//Autoclicking
cps_click = () => {
    clicks += cps;
    clickscounter.textContent = ("Clicks: " + numberWithCommas(clicks));
    sitetitle.textContent = (numberWithCommas(clicks) + " Clicks - Clicker Game");
}

setInterval(cps_click, 1000)
