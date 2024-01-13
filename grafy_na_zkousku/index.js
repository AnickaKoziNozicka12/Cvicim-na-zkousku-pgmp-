let hodnoty = [];

function Zadat_rok(){
    let rok = document.getElementById("rok").value;

    if (!isNaN(rok) && rok > 0){
        document.getElementById("nadpis").innerHTML = "Počet přijatých studentů FPE od začátku roku " + rok;

        document.getElementById("odeslat_button").disabled = false;
        document.getElementById("pocet").disabled = false;

        document.getElementById("rok").disabled = true;
        document.getElementById("zadani").disabled = true;
    }
    else{
        alert("Zadejte rok našeho letopoču v číslovkách!");
    }
}

function Pridat(){
    let cislo = document.getElementById("pocet").value;


    if (isNaN(cislo) && cislo > 0){
        alert("Zadejte kladné číslo.")
    }
    else{
        hodnoty.push(cislo);

        let max = Math.max(...hodnoty);
        let min = Math.min(...hodnoty);
 
        document.getElementById("hodnoty").innerHTML = "Zdrojová čísla: " + hodnoty.join(", ");
        document.getElementById("minimum").innerHTML = "Minimim: " + min;
        document.getElementById("maximum").innerHTML = "Maximum: " + max;
        prumer();
    }
    
}

function prumer(){
    let suma = 0;

    for (let o = 0; o < hodnoty.length; o++) {
        suma += Number(hodnoty[o]);
    }

    let pocet = hodnoty.length;

    let prumer1 = suma/pocet;
    
    document.getElementById("prumer").innerHTML= "Pruměrná hodnota je: " + prumer1;
}

function obdelnik(barvicka, x, sirka, vyska){
    var c = document.getElementById("platno");
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = barvicka;
    ctx.fillRect(x, 150, sirka, vyska);
    ctx.stroke();
}

function Sloupcovy(){
    let barva = true;
    let delka_pole = hodnoty.length;
    let x = 0;

    var c = document.getElementById("platno");
    var ctx = c.getContext("2d");

    ctx.clearRect(0, 0, 500, 250);
    
    for(let i = 0; i < hodnoty.length; i++){
        
        let sirka = 300/delka_pole;
        let vyska_mezi = -hodnoty[i];
        let vyska = Number(vyska_mezi); 
        let vyska_max = -150;
        
        let max = Math.max(...hodnoty);
        let min = Math.min(...hodnoty);

        if (hodnoty[i] == max){
            var c = document.getElementById("platno");
            var ctx = c.getContext("2d");

            obdelnik("green", x, sirka, vyska_max);
        }
        else if (hodnoty[i] == min){
            var c = document.getElementById("platno");
            var ctx = c.getContext("2d");

            vyska_final = (vyska/max)*150;

            obdelnik("red", x, sirka, vyska_final);
        }
       else if(barva == true){
            var c = document.getElementById("platno");
            var ctx = c.getContext("2d");
            vyska_final = (vyska/max)*150;
            obdelnik("pink", x, sirka, vyska_final);
    
            barva = false;
        }
        else if(barva == false){
            var c = document.getElementById("platno");
            var ctx = c.getContext("2d");
            vyska_final = (vyska/max)*150;
            obdelnik("blue", x, sirka, vyska_final);
    
            barva = true;
        }
        x = x + sirka;        
    }
}

function Spojnicovy(){
    let start = 10;
    
    const c = document.getElementById("platno");
    const ctx = c.getContext("2d");
   
    ctx.clearRect(0, 0, 500, 250);

    for (let k = 0; k < hodnoty.length; k++){
        let y = hodnoty[k];
        let Y = Number(y);

        ctx.beginPath();
        // Define a start Point
        ctx.moveTo(start, Y);
        // Define an end Point
        ctx.lineTo(start+20, Number(hodnoty[k+1]));
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(start, Y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "pink";
        ctx.fill();
        ctx.stroke(); 
        
        start = start + 20;
    }
}

function Prolnuty(){
    ctx.clearRect(0, 0, 500, 250);
    
    Sloupcovy();
    Spojnicovy();    
}
