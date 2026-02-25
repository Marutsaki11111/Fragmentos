let tiempo = 0;
const texto = document.getElementById("texto");
const sidebar = document.getElementById("sidebar");
const toggleMenu = document.getElementById("toggleMenu");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
const imagenHistoria = document.getElementById("imagenHistoria");
const canvas = document.getElementById("ambientCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.imageSmoothingEnabled = true;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let modoActual = "prologo";
let estrellas = [];
let particulas = [];
let particulasMateria = [];
let estrellasMoldean = [];
let particulasTierra = [];
let nubesPolvo = [];
let intensidadTemblor = 0;
let estrellasNoSeQuedo = [];
let particulasNoSeQuedo = [];
let ondasLago = 0;
let estructurasNoSeQuedo = [];
let estructuraRota;
let entidadesFila = [];
let protagonistaMargen = null;
let glitchOffset = 0;
let engranesFondo = [];
let engranesMedio = [];
let engranesFrente = [];
let vaporIndustrial = [];
let chispas = [];
let cintaOffset = 0;

function iniciarEstrellas(cantidad = 150) {
    estrellas = [];

    for (let i = 0; i < cantidad; i++) {
        estrellas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.2 + 0.05,
            alpha: Math.random()
        });
    }
}

function iniciarMoldean(cantidad = 400) {

    estrellasMoldean = [];

    for (let i = 0; i < cantidad; i++) {

        estrellasMoldean.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            baseAlpha: Math.random() * 0.8 + 0.2,
            size: Math.random() * 2 + 0.5,
            twinkleSpeed: Math.random() * 2 + 0.5,
            blur: Math.random() * 4 + 2
        });
    }
}

function iniciarMateria(cantidad = 120) {

    particulasMateria = [];

    for (let i = 0; i < cantidad; i++) {
        particulasMateria.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2,
            alpha: Math.random() * 0.4 + 0.1
        });
    }
}

function iniciarTierra(cantidad = 120) {

    particulasTierra = [];

    for (let i = 0; i < cantidad; i++) {
        particulasTierra.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedY: Math.random() * 0.2 + 0.05,
            alpha: Math.random() * 0.4 + 0.1
        });
    }
}

function iniciarNubesTierra(cantidad = 4) {

    nubesPolvo = [];

    for (let i = 0; i < cantidad; i++) {

        nubesPolvo.push(crearNubeTierra());
    }
}

function crearNubeTierra() {

    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radioBase: Math.random() * 300 + 250,
        fase: Math.random() * Math.PI * 2,
        velocidad: Math.random() * 0.001 + 0.0005,
        alphaMax: Math.random() * 0.12 + 0.08,
        tiempoVida: 0,
        duracion: Math.random() * 2000 + 1500
    };
}

function iniciarNoSeQuedo() {

    estrellasNoSeQuedo = [];
    particulasNoSeQuedo = [];

    // Estrellas suaves (solo arriba)
    for (let i = 0; i < 120; i++) {
        estrellasNoSeQuedo.push({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height * 0.5),
            size: Math.random() * 1.5,
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    // Partículas grandes suspendidas
    for (let i = 0; i < 40; i++) {
        particulasNoSeQuedo.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 2,
            speed: Math.random() * 0.1 + 0.05,
            alpha: Math.random() * 0.15 + 0.05
        });
    }

    // Estructuras flotantes lejanas
for (let i = 0; i < 12; i++) {

    estructurasNoSeQuedo.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.6),
        width: Math.random() * 120 + 60,
        height: Math.random() * 300 + 150,
        alpha: Math.random() * 0.15 + 0.05,
        drift: Math.random() * 0.05 + 0.01,
        tipo: Math.floor(Math.random() * 3),
        escala: Math.random() * 0.5 + 0.5
    });
    }

    let estructuraRota = {
    x: canvas.width * 0.7,
    y: canvas.height * 0.35,
    width: 140,
    height: 260,
    fragmentos: []
};

for (let i = 0; i < 20; i++) {
    estructuraRota.fragmentos.push({
        x: 0,
        y: 0,
        speedY: Math.random() * 0.3 + 0.1,
        drift: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.4 + 0.2
    });
    }

    
}

function iniciarMargen() {

    entidadesFila = [];

    const centroX = canvas.width / 2;
    const horizonte = canvas.height * 0.5;

    // Crear fila en perspectiva
    for (let i = 0; i < 25; i++) {

        let profundidad = i / 25;

        entidadesFila.push({
            x: centroX,
            y: horizonte + profundidad * 200,
            escala: 1 - profundidad * 0.7,
            alpha: 0.8 - profundidad * 0.6
        });
    }

    // Protagonista desplazado
    protagonistaMargen = {
        x: canvas.width * 0.25,
        y: horizonte + 120,
        width: 20,
        height: 60
    };
}

function iniciarPiezas() {

    engranesFondo = [];
    engranesMedio = [];
    engranesFrente = [];
    vaporIndustrial = [];
    chispas = [];

    // Engranes fondo (muy grandes, muy lentos)
    for (let i = 0; i < 5; i++) {
        engranesFondo.push(crearEngrane(200, 400, 0.001));
    }

    // Engranes medios
    for (let i = 0; i < 6; i++) {
        engranesMedio.push(crearEngrane(120, 220, 0.002));
    }

    // Engranes frente
    for (let i = 0; i < 4; i++) {
        engranesFrente.push(crearEngrane(60, 120, 0.004));
    }

    // Vapor
    for (let i = 0; i < 6; i++) {
        vaporIndustrial.push(crearVapor());
    }
}

function render() {

    requestAnimationFrame(render);

    tiempo += 0.01;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (modoActual) {

        case "prologo":
            renderPrologo();
            break;

        case "moldean":
            renderMoldean();
            break;

        case "materia":
            renderMateria();
            break;

        case "tierra":
            renderTierra();
            break;

        case "noSeQuedo":
            renderNoSeQuedo();
            break;

        case "margen":
            renderMargen();
            break;

        case "piezas":
            renderPiezas();
            break;

        case "todoSiguio":
            renderTodoSiguio();
            break;

        case "conversacion":
            renderConversacion();
            break;

        case "noIntentarlo":
            renderNoIntentarlo();
            break;
    }
}

function renderPrologo() {

    // Fondo respirando suave real
    let gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.1,
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.9
    );

    let brillo = 15 + Math.sin(tiempo) * 5;

    gradient.addColorStop(0, `rgb(${brillo},${brillo},${brillo+10})`);
    gradient.addColorStop(1, "#000");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Estrellas suaves
    estrellas.forEach(star => {

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

        let alpha = star.alpha + Math.sin(tiempo * 2 + star.x) * 0.2;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();

        star.y -= star.speed;

        if (star.y < 0) {
            star.y = canvas.height;
            star.x = Math.random() * canvas.width;
        }
    });
}

function renderMateria() {

    // === FONDO BASE PROFUNDO ===
    let gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.1,
        canvas.width / 2,
        canvas.height / 2,
        canvas.height * 0.9
    );

    let base = 25 + Math.sin(tiempo * 0.5) * 10;

    gradient.addColorStop(0, `rgb(${base}, ${base+15}, ${base+40})`);
    gradient.addColorStop(1, `rgb(10,15,25)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // === ONDAS ORGÁNICAS PROFUNDAS ===
    ctx.globalCompositeOperation = "lighter";

    for (let i = 0; i < 4; i++) {

        let offset = i * 100;

        ctx.beginPath();

        for (let x = 0; x <= canvas.width; x += 8) {

            let y =
                canvas.height / 2 +
                Math.sin((x * 0.002) + tiempo + i) * 120 +
                Math.cos((x * 0.004) + tiempo * 0.5 + i) * 60 +
                Math.sin(tiempo * 0.3 + i) * 40;

            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(120,150,255,0.05)`;
        ctx.stroke();
    }

    ctx.globalCompositeOperation = "source-over";


    // === DISTORSIÓN SUTIL TIPO FLUIDO ===
    ctx.globalAlpha = 0.08;

    for (let i = 0; i < 6; i++) {

        let x = canvas.width / 2 + Math.sin(tiempo * 0.4 + i) * 300;
        let y = canvas.height / 2 + Math.cos(tiempo * 0.3 + i) * 200;

        let radius = 500 + Math.sin(tiempo + i) * 120;

        let blob = ctx.createRadialGradient(x, y, 0, x, y, radius);
        blob.addColorStop(0, "rgba(180,200,255,0.3)");
        blob.addColorStop(1, "transparent");

        ctx.fillStyle = blob;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.globalAlpha = 1;


    // === PARTÍCULAS MICROSCÓPICAS SUSPENDIDAS ===
    // === PARTÍCULAS REALES MATERIA ===
particulasMateria.forEach(p => {

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200,220,255,${p.alpha})`;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
});
}

function renderMoldean() {

    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    const maxDist = Math.sqrt(centroX * centroX + centroY * centroY);

    // === FONDO NEGRO PROFUNDO ===
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // === ESTRELLAS EN TODO EL ESPACIO ===
    estrellasMoldean.forEach(star => {

        let dx = star.x - centroX;
        let dy = star.y - centroY;
        let distancia = Math.sqrt(dx * dx + dy * dy);

        // Atenuación radial fuerte
        let fade = 1 - (distancia / maxDist);
        if (fade < 0) fade = 0;

        // Más brillo cerca del centro
        let centroBoost = Math.pow(fade, 2);

        // Titileo suave
        let twinkle = Math.sin(tiempo * star.twinkleSpeed) * 0.3 + 0.7;

        let alphaFinal = star.baseAlpha * centroBoost * twinkle;

        ctx.save();

        ctx.globalAlpha = alphaFinal;
        ctx.shadowBlur = star.blur + centroBoost * 8;
        ctx.shadowColor = "rgba(180,200,255,0.9)";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;

        // Estrella tipo cruz mística
        ctx.beginPath();
        ctx.moveTo(star.x - star.size, star.y);
        ctx.lineTo(star.x + star.size, star.y);
        ctx.moveTo(star.x, star.y - star.size);
        ctx.lineTo(star.x, star.y + star.size);
        ctx.stroke();

        ctx.restore();
    });


    // === NÚCLEO OSCURO CENTRAL (AGUJERO) ===
    let nucleo = ctx.createRadialGradient(
        centroX,
        centroY,
        0,
        centroX,
        centroY,
        canvas.height * 0.25
    );

    nucleo.addColorStop(0, "rgba(0,0,0,1)");
    nucleo.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = nucleo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // === HALO MÍSTICO SUAVE ALREDEDOR ===
    let halo = ctx.createRadialGradient(
        centroX,
        centroY,
        canvas.height * 0.15,
        centroX,
        centroY,
        canvas.height * 0.45
    );

    halo.addColorStop(0, "rgba(60,80,200,0.15)");
    halo.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // === VIGNETTE FUERTE EN BORDES ===
    let vignette = ctx.createRadialGradient(
        centroX,
        centroY,
        canvas.height * 0.4,
        centroX,
        centroY,
        canvas.height * 0.9
    );

    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,1)");

    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderTierra() {

    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;

    // === LATIDO SUBTERRÁNEO ===
    intensidadTemblor = Math.sin(tiempo * 0.8) * 2;

    ctx.save();
    ctx.translate(
        Math.sin(tiempo * 3) * 0.5,
        intensidadTemblor * 0.5
    );

    // === FONDO PROFUNDO ===
    let gradient = ctx.createRadialGradient(
        centroX,
        centroY,
        50,
        centroX,
        centroY,
        canvas.height * 0.9
    );

    gradient.addColorStop(0, "#4b2f1d");
    gradient.addColorStop(0.4, "#24150d");
    gradient.addColorStop(1, "#0a0705");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // === PULSO ORGÁNICO CENTRAL ===
    // === RESPIRACIÓN DESDE ABAJO ===

let pulsoAltura = 300 + Math.sin(tiempo * 0.8) * 40;

let pulso = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height,          // empieza abajo
    0,
    canvas.width / 2,
    canvas.height,
    pulsoAltura
);

pulso.addColorStop(0, "rgba(255,170,100,0.25)");
pulso.addColorStop(0.4, "rgba(150,90,50,0.15)");
pulso.addColorStop(1, "rgba(0,0,0,0)");

ctx.fillStyle = pulso;
ctx.fillRect(0, 0, canvas.width, canvas.height);

    // === RAÍCES VIVAS ===

    // === POLVO PESADO CAYENDO ===
    particulasTierra.forEach(p => {

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,130,90,${p.alpha})`;
        ctx.fill();

        p.y += p.speedY;

        if (p.y > canvas.height) {
            p.y = 0;
            p.x = Math.random() * canvas.width;
        }
    });


    // === NUBES DE POLVO DINÁMICAS ===
    
    

    // === NUBES ORGÁNICAS REALES ===

nubesPolvo.forEach((nube, index) => {

    nube.tiempoVida++;

    // Progreso normalizado (0 → 1)
    let progreso = nube.tiempoVida / nube.duracion;

    // Fade natural tipo campana (aparece lento, desaparece lento)
    let fade = Math.sin(progreso * Math.PI);

    // Movimiento flotante lento multidireccional
    nube.x += Math.sin(tiempo * 0.3 + nube.fase) * 0.2;
    nube.y += Math.cos(tiempo * 0.2 + nube.fase) * 0.15;

    // Radio orgánico pulsante
    let radio =
        nube.radioBase +
        Math.sin(tiempo * 0.4 + nube.fase) * 40;

    let grad = ctx.createRadialGradient(
        nube.x,
        nube.y,
        0,
        nube.x,
        nube.y,
        radio
    );

    grad.addColorStop(0, `rgba(170,130,90,${fade * nube.alphaMax})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Reinicio cuando termina su ciclo
    if (nube.tiempoVida >= nube.duracion) {
        nubesPolvo[index] = crearNubeTierra();
    }

});


    ctx.restore();
}

function renderNoSeQuedo() {

    const mitad = canvas.height / 2;

    // ===== 1️⃣ FONDO PROFUNDO =====

    let fondo = ctx.createLinearGradient(0, 0, 0, canvas.height);
    fondo.addColorStop(0, "#05070c");
    fondo.addColorStop(0.6, "#0b1020");
    fondo.addColorStop(1, "#02040a");

    ctx.fillStyle = fondo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // ===== 2️⃣ ESTRELLAS SUPERIORES =====

    estrellasNoSeQuedo.forEach(star => {

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,200,255,${star.alpha})`;
        ctx.fill();
    });


    // ===== 3️⃣ NEBLINA AZUL LENTA =====

    let neblina = ctx.createRadialGradient(
        canvas.width / 2,
        mitad * 0.6,
        0,
        canvas.width / 2,
        mitad * 0.6,
        canvas.width * 0.8
    );

    neblina.addColorStop(0, "rgba(80,120,255,0.08)");
    neblina.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = neblina;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


 // ===== ESTRUCTURAS FLOTANTES CINEMATOGRÁFICAS =====

ctx.save();
ctx.filter = "blur(3px)";

estructurasNoSeQuedo.forEach((e, index) => {

    ctx.globalAlpha = e.alpha;

    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.scale(e.escala, e.escala);

    ctx.strokeStyle = "rgba(170,200,255,0.35)";
    ctx.lineWidth = 1.5;

    // DISTORSIÓN SUTIL
    ctx.transform(
        1,
        0,
        Math.sin(tiempo * 0.1 + index) * 0.05,
        1,
        0,
        0
    );

    if (e.tipo === 0) {
        // Marco roto
        ctx.beginPath();
        ctx.moveTo(-e.width/2, -e.height/2);
        ctx.lineTo(e.width/2, -e.height/2);
        ctx.moveTo(-e.width/2, -e.height/2);
        ctx.lineTo(-e.width/2, e.height/2);
        ctx.stroke();
    }

    if (e.tipo === 1) {
        // Columna incompleta
        ctx.beginPath();
        ctx.moveTo(0, -e.height/2);
        ctx.lineTo(0, e.height/4);
        ctx.stroke();
    }

    if (e.tipo === 2) {
        // Escalones incompletos
        for (let i = 0; i < 4; i++) {
            ctx.strokeRect(
                -e.width/3,
                -e.height/2 + i * 50,
                e.width/1.5,
                8
            );
        }
    }

    ctx.restore();

    // Movimiento flotante ultra lento
    e.y += Math.sin(tiempo * 0.1 + index) * 0.05;

});

ctx.restore();

// ===== ESTRUCTURA QUE SE DESINTEGRA =====

if (estructuraRota) {

    ctx.save();
    ctx.translate(estructuraRota.x, estructuraRota.y);

    ctx.strokeStyle = "rgba(200,220,255,0.4)";
    ctx.strokeRect(
        -estructuraRota.width/2,
        -estructuraRota.height/2,
        estructuraRota.width,
        estructuraRota.height
    );

    estructuraRota.fragmentos.forEach(f => {

        ctx.beginPath();
        ctx.arc(
            f.x,
            f.y,
            2,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(180,200,255,${f.alpha})`;
        ctx.fill();

        f.y += f.speedY;
        f.x += f.drift;

        if (f.y > estructuraRota.height/2) {
            f.y = -estructuraRota.height/2;
            f.x = 0;
        }
    });

    ctx.restore();
}


// ===== REFLEJO DE ESTRUCTURAS =====

ctx.save();
ctx.scale(1, -1);
ctx.globalAlpha = 0.15;
ctx.filter = "blur(4px)";

estructurasNoSeQuedo.forEach(e => {

    ctx.strokeStyle = "rgba(120,150,255,0.2)";
    ctx.lineWidth = 1;

    ctx.strokeRect(
        e.x - e.width/2,
        -(e.y + e.height/2 + mitad),
        e.width,
        e.height
    );
});

ctx.restore();

    // ===== 4️⃣ PARTÍCULAS SUSPENDIDAS =====

    particulasNoSeQuedo.forEach(p => {

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150,180,255,${p.alpha})`;
        ctx.fill();

        p.y -= p.speed;

        if (p.y < 0) {
            p.y = canvas.height;
            p.x = Math.random() * canvas.width;
        }
    });


    // ===== 5️⃣ REFLEJO TIPO LAGO =====

    ctx.save();
    ctx.scale(1, -1);
    ctx.globalAlpha = 0.25;

    ctx.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        mitad,
        0,
        -canvas.height,
        canvas.width,
        mitad
    );

    ctx.restore();


    // ===== 6️⃣ ONDAS SUAVES =====

    ondasLago += 0.002;

    for (let i = 0; i < 6; i++) {

        ctx.beginPath();

        for (let x = 0; x <= canvas.width; x += 10) {

            let y = mitad + Math.sin(x * 0.01 + ondasLago + i) * 5;

            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.strokeStyle = "rgba(120,150,255,0.05)";
        ctx.lineWidth = 1;
        ctx.stroke();
    }


    // ===== 7️⃣ VIÑETA OSCURA =====

    let vignette = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.2,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
    );

    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.6)");

    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderMargen() {

    const centroX = canvas.width / 2;
    const horizonte = canvas.height * 0.4;

    // ===== 1️⃣ FONDO PROFUNDO =====

    let fondo = ctx.createLinearGradient(0, 0, 0, canvas.height);
    fondo.addColorStop(0, "#181a20");
    fondo.addColorStop(1, "#242832");

    ctx.fillStyle = fondo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    // ===== 2️⃣ SUELO EN PERSPECTIVA REAL =====

    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;

    for (let i = -8; i <= 8; i++) {

        ctx.beginPath();
        ctx.moveTo(centroX + i * 80, canvas.height);
        ctx.lineTo(centroX, horizonte);
        ctx.stroke();
    }

    // Líneas horizontales del suelo
    for (let i = 1; i <= 8; i++) {

        let y = canvas.height - i * 60;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }


    // ===== 3️⃣ FILA CORRECTA (AVANZA HACIA EL FILTRO) =====

    for (let i = 0; i < 20; i++) {

        let profundidad = i / 20;

        let y = canvas.height - profundidad * (canvas.height - horizonte);
        let escala = 1 - profundidad * 0.8;
        let alpha = 0.7 - profundidad * 0.5;

        ctx.save();
        ctx.translate(centroX, y);
        ctx.scale(escala, escala);
        ctx.globalAlpha = alpha;

        ctx.fillStyle = "#cfd2d6";
        ctx.fillRect(-8, -40, 16, 60);

        ctx.restore();
    }


    // ===== 4️⃣ EL FILTRO (DISTORSIÓN REAL) =====

    let anchoFiltro = 60;
    let altoFiltro = 160;

    let desplazamiento = Math.sin(tiempo * 8) * 1.5;

    ctx.save();
    ctx.translate(centroX + desplazamiento, horizonte - 40);

    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 2;

    // Marco principal
    ctx.strokeRect(-anchoFiltro/2, -altoFiltro/2, anchoFiltro, altoFiltro);

    // Distorsión interna tipo interferencia
    for (let i = 0; i < 10; i++) {

        ctx.beginPath();
        ctx.moveTo(
            -anchoFiltro/2,
            -altoFiltro/2 + i * 15 + Math.sin(tiempo * 10 + i) * 2
        );
        ctx.lineTo(
            anchoFiltro/2,
            -altoFiltro/2 + i * 15
        );
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.stroke();
    }

    ctx.restore();


    // ===== 5️⃣ EL MARGEN (DESVIACIÓN REAL DEL SUELO) =====

    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(0, 0, canvas.width * 0.3, canvas.height);

    // Protagonista diferente
    ctx.save();

    let xProta = canvas.width * 0.18;
    let yProta = canvas.height - 180;

    ctx.translate(xProta, yProta);

    ctx.fillStyle = "rgba(220,220,220,0.9)";
    ctx.beginPath();
    ctx.moveTo(0, -50);
    ctx.lineTo(15, 0);
    ctx.lineTo(-15, 0);
    ctx.closePath();
    ctx.fill();

    ctx.restore();


    // ===== 6️⃣ VIÑETA PROFUNDA =====

    let vignette = ctx.createRadialGradient(
        centroX,
        horizonte,
        50,
        centroX,
        horizonte,
        canvas.width
    );

    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.7)");

    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function crearEngrane(minSize, maxSize, speed) {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * (maxSize - minSize) + minSize,
        dientes: 12 + Math.floor(Math.random() * 10),
        rot: Math.random() * Math.PI,
        speed: speed * (Math.random() > 0.5 ? 1 : -1)
    };
}

function dibujarEngrane(e, color) {

    ctx.save();
    ctx.translate(e.x, e.y);
    ctx.rotate(e.rot);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    for (let i = 0; i < e.dientes; i++) {

        let angle = (i / e.dientes) * Math.PI * 2;
        let x1 = Math.cos(angle) * e.radius;
        let y1 = Math.sin(angle) * e.radius;
        let x2 = Math.cos(angle) * (e.radius + 20);
        let y2 = Math.sin(angle) * (e.radius + 20);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(0, 0, e.radius, 0, Math.PI * 2);
    ctx.stroke();

    // Núcleo metálico
    ctx.beginPath();
    ctx.arc(0, 0, e.radius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(60,60,60,0.6)";
    ctx.fill();
    ctx.restore();
}

function crearVapor() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 200 + 100,
        alpha: Math.random() * 0.1 + 0.05,
        speed: Math.random() * 0.2 + 0.05
    };
}

function renderPiezas() {

    // Vibración sutil global
    ctx.save();
    ctx.translate(
        Math.sin(tiempo * 4) * 0.5,
        Math.cos(tiempo * 3) * 0.5
    );

    // Fondo oscuro metálico
    let grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, "#1a1a1a");
    grad.addColorStop(1, "#0e0e0e");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Luces cenitales industriales
    for (let i = 0; i < 3; i++) {

    let x = canvas.width * (0.2 + i * 0.3);

    let gradLuz = ctx.createRadialGradient(
        x, 0, 0,
        x, canvas.height * 0.6, 400
    );

    gradLuz.addColorStop(0, "rgba(255,220,150,0.08)");
    gradLuz.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradLuz;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // ===== ENGRANES FONDO =====
    ctx.save();
    ctx.translate(Math.sin(tiempo) * 0.1, 0); // micro desplazamiento fondo

    engranesFondo.forEach(e => {
        e.rot += e.speed;
        dibujarEngrane(e, "rgba(120,110,100,0.15)");
    });

    ctx.restore();

    // ===== ENGRANES FRENTE =====
    ctx.save();
    ctx.translate(Math.sin(tiempo) * 0.6, 0); // aún más desplazamiento

    engranesFrente.forEach(e => {
        e.rot += e.speed;
        dibujarEngrane(e, "rgba(180,150,120,0.5)");
    });

    ctx.restore();

    // ===== CINTA TRANSPORTADORA =====

    cintaOffset += 2;
    if (cintaOffset > 80) cintaOffset = 0;

    ctx.fillStyle = "#222";
    ctx.fillRect(0, canvas.height * 0.75, canvas.width, 80);

    ctx.fillStyle = "#333";

    for (let i = -1; i < canvas.width / 80; i++) {
        ctx.fillRect(i * 80 - cintaOffset, canvas.height * 0.75, 60, 80);
    }

    // ===== ENGRANES FRENTE =====
    engranesFrente.forEach(e => {
        e.rot += e.speed;
        dibujarEngrane(e, "rgba(180,150,120,0.5)");
    });


    // ===== VAPOR =====
    vaporIndustrial.forEach(v => {

        ctx.beginPath();
        let gradV = ctx.createRadialGradient(
            v.x, v.y, 0,
            v.x, v.y, v.size
        );

        gradV.addColorStop(0, `rgba(200,200,200,${v.alpha})`);
        gradV.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradV;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        v.y -= v.speed;

        if (v.y < -200) {
            v.y = canvas.height + 100;
            v.x = Math.random() * canvas.width;
        }
    });


    // ===== CHISPAS OCASIONALES =====

    if (Math.random() < 0.05) {
        chispas.push({
            x: Math.random() * canvas.width,
            y: canvas.height * 0.7,
            life: 30
        });
    }

    chispas.forEach((c, i) => {

        ctx.fillStyle = "orange";
        ctx.fillRect(c.x, c.y, 3, 3);

        c.y += 2;
        c.life--;

        if (c.life <= 0) chispas.splice(i, 1);
    });

    let sombraInferior = ctx.createLinearGradient(
    0,
    canvas.height * 0.6,
    0,
    canvas.height
    );

    sombraInferior.addColorStop(0, "rgba(0,0,0,0)");
    sombraInferior.addColorStop(1, "rgba(0,0,0,0.6)");

    ctx.fillStyle = sombraInferior;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.restore();
}

let musicaIniciada = false;

document.addEventListener("click", () => {

    if (!musicaIniciada) {

        bgMusic.src = historias[historiaActual].musica;
        bgMusic.loop = true;
        bgMusic.volume = 0.4;
        bgMusic.muted = false;

        bgMusic.play().then(() => {
            musicaIniciada = true;
            musicBtn.textContent = "🔊";
        }).catch(err => {
            console.log("Error al iniciar música:", err);
        });
    }

}, { once: true });

/* ===== PEGA TUS HISTORIAS AQUÍ ===== */

const historias = {
    prologo: {
    texto: `
    <h2>Antes de despertar</h2>

    <p>No sé bien por qué escribo esto.</p>

    <p>No es valentía. No es claridad.</p>

    <p>Es más bien que ya no supe qué hacer con todo lo que se me queda dentro.</p>

    <p>Estoy aquí, existiendo, pero no de la forma en que se supone que debería sentirse.</p>

    <p>No siento futuro en el cuerpo.</p>

    <p>No me reconozco talento, ni rumbo, ni una razón clara para seguir avanzando más allá del simple hecho de que el día llega y yo lo atravieso.</p>

    <p>Hay un cansancio que no se va durmiendo.<br>
    Un desgaste que no tiene causa única.<br>
    Solo se acumula.</p>

    <p>A veces siento que no debería estar aquí.</p>

    <p>No como deseo de desaparecer, sino como una certeza extraña:</p>

    <blockquote>
    como si alguien me hubiera puesto en el mundo esperando que yo eligiera algo,<br>
    y yo no fui capaz.
    </blockquote>

    <p>Este libro no busca respuestas.<br>
    No las tengo.</p>

    <p>Tampoco busca esperanza, aunque a veces se le parezca desde lejos.</p>

    <p>Son fragmentos de cosas que no me acompañan cuando despierto,<br>
    pero que siguen pesando igual.</p>

    <p>Sueños, recuerdos deformados, escenas inventadas para decir lo que no sé nombrar de otra forma.</p>

    <p>Versiones mías que no funcionan, que dudan, que observan desde afuera.</p>

    <p>Aquí no siempre soy humano.<br>
    A veces soy vacío.<br>
    A veces materia sin forma.<br>
    A veces solo una presencia cansada mirando cómo el mundo sigue sin mí.</p>

    <p>Si alguien lee esto, no le debo explicaciones.</p>

    <p>Esto no es para entenderse, ni para mejorar, ni para sanar.</p>

    <p>Es para dejar constancia de que estuve aquí,<br>
    aunque no supiera para qué.</p>

    <p>Si sigo escribiendo, quizá no sea porque tenga un propósito,<br>
    sino porque, incluso roto,</p>

    <p><em>algo en mí todavía no se rinde del todo.</em></p>

    <p><strong>Y eso es lo único que tengo.</strong></p>
    `,
    imagen: "assets/prologo.png",
    musica:  "audio/prologo.mp3"
    },
    materia: {
    texto: `
    <h2>Materia sin instrucción</h2>

    <p>Tengo veintidós años, o algo que se parece a eso cuando se mide el tiempo en cifras. Es una edad que suele venir acompañada de expectativas ajenas, comienzos, decisiones, impulsos que deberían sentirse naturales. En mí no ocurre nada de eso. El número existe. Yo también. No necesariamente juntos.</p>

    <p>Existo de una forma continua, casi automática. No recuerdo un momento exacto en el que haya decidido hacerlo. A veces tengo la impresión de haber sido colocado aquí, como una pieza provisional, como algo que aún no ha recibido instrucciones claras. No me siento producto de una elección propia, sino de una posibilidad que nadie terminó de cerrar.</p>

    <p>Mi forma es humanoide.<br>
    No por identidad, sino por costumbre.</p>

    <p>Si alguien me observara con atención, notaría que no hay variaciones en mí. Todo es del mismo tono: gris, opaco, uniforme. No hay marcas, ni rasgos que destaquen. En ciertos momentos, ese gris se oscurece hasta rozar el negro, como el vacío entre cuerpos celestes: no agresivo, no amenazante, solo inmenso y silencioso. No absorbo la luz por completo, pero tampoco la reflejo. La dejo pasar, como si no me perteneciera.</p>

    <p>No siento que me falten partes.<br>
    <em>Siento que me falta intención.</em></p>

    <p>Durante los últimos meses, pensar se volvió una tarea pesada. No difícil, solo interminable. Los pensamientos no avanzan; giran. Vuelven sobre sí mismos con ligeras variaciones, como si intentaran convencerme de algo que no termino de comprender. No me atacan. Me desgastan. Me dejan cansado antes incluso de intentar responder.</p>

    <p>Vivo al día. No como principio filosófico, sino como límite funcional. El hoy es manejable. El mañana requiere una energía que no tengo. Me muevo por inercia: levantarme, cumplir con lo mínimo, existir lo suficiente como para que el día termine. No hay épica en eso. Tampoco derrota. Es simplemente lo que ocurre.</p>

    <p>Hubo una cercanía alguna vez.<br>
    No la nombro.</p>

    <p>No porque duela demasiado, sino porque hacerlo no cambia su ausencia. No es una herida abierta, sino un espacio que quedó mal acomodado. Un lugar donde algo encajaba de forma natural y ahora no. No pienso en ello constantemente. Aun así, su forma sigue ahí, insinuada, como una marca que el tiempo no se molesta en borrar del todo.</p>

    <p>En uno de esos momentos de quietud prolongada, me detengo frente a una superficie que refleja. No es un espejo en el sentido estricto; es más bien un plano pulido, indefinido, que devuelve una imagen sin intención. Me observo.</p>

    <p>Veo la figura gris frente a mí.<br>
    Me veo estar.</p>

    <p>No hay expresión clara en el rostro. Los rasgos están ahí, pero no transmiten nada concreto. Los ojos parecen abiertos, pero no atentos. No hay tristeza explícita, ni rabia, ni deseo. Solo una neutralidad espesa, como si alguien hubiera pausado algo en medio de su desarrollo.</p>

    <p>Observo mi postura: ligeramente encorvada, no por peso físico, sino por costumbre. Los hombros caídos no indican derrota, solo cansancio acumulado. Los brazos cuelgan sin propósito definido. No sostienen nada. No buscan nada.</p>

    <p>Me pregunto si debería reconocerme.<br>
    No lo hago.</p>

    <p>La figura en el reflejo parece correcta desde un punto de vista técnico: tiene forma, volumen, coherencia. Y sin embargo, se siente provisional, como un borrador que alguien olvidó revisar. No está rota. No está incompleta. Simplemente no está decidida.</p>

    <p>Al mirarme así, no siento rechazo.<br>
    Tampoco pertenencia.</p>

    <p>Es como observar un objeto familiar cuya función se ha perdido con el tiempo. Sabes que estuvo ahí por una razón, pero ya no recuerdas cuál. Y aun así, no lo tiras. Lo mantienes cerca, por si acaso.</p>

    <p>No ostento ningún talento visible. No hay una habilidad que justifique mi permanencia, ni una cualidad que me distinga del fondo. No soy excepcional en ningún sentido claro. Y eso, más que doler, desconcierta. Porque el mundo parece construido alrededor de funciones, de usos, de elecciones constantes. Yo me limito a estar entre ellas, sin asumir ninguna del todo.</p>

    <p>A veces pienso que alguien esperaba que eligiera algo. Un camino, una identidad, una versión final de mí mismo. Tal vez esa era la intención: dejarme aquí, sin instrucciones, para ver qué hacía con eso. Pero elegir requiere una convicción mínima, una sensación de posibilidad. La mía está suspendida, no anulada, solo en pausa.</p>

    <p>No me siento roto.<br>
    <strong>Me siento sin activar.</strong></p>

    <p>Así que permanezco. En este estado intermedio. Observando. Respirando. Existiendo lo suficiente como para no desaparecer, pero no tanto como para afirmar que estoy viviendo de una manera completa.</p>

    <p>Si esto es estar perdido, no se parece al caos.<br>
    Se parece más a una espera sin objeto.</p>

    <p><em>Y por ahora, eso es todo lo que soy capaz de sostener.</em></p>
    `,
    imagen: "assets/materia.png",
    musica: null
    },
    moldean: {
    texto: `
    <h2>Los que moldean y se ausentan</h2>

    <p>No recuerdo el momento exacto en que fui creado.</p>

    <p>Solo tengo la certeza de que no fue un acto consciente, sino una consecuencia.</p>

    <p>Mi forma esta vez no es gris.<br>
    Es negra, completamente negra, como un vacío pulido, sin bordes definidos.</p>

    <p>Pero si alguien se acerca lo suficiente —si se atreve— puede notar pequeños puntos de luz incrustados en mí, diminutos, irregulares, como estrellas que no saben si pertenecen al cielo o a un error en la materia.</p>

    <p>No brillan con fuerza.<br>
    <em>Persisten.</em></p>

    <p>Estoy de pie en un espacio amplio, sin paredes claras. El suelo parece sólido, pero no transmite calor ni frío. A lo lejos hay figuras. No son personas del todo; son moldes en movimiento, manos que aparecen y desaparecen, voces que no siempre terminan sus frases.</p>

    <p>Fui hecho por más de uno.</p>

    <p>Eso se nota en las uniones mal selladas de mi forma, en las zonas donde el negro es más espeso, como si alguien hubiera presionado demasiado la arcilla y otro hubiera soltado antes de tiempo.</p>

    <p>Uno de ellos se fue pronto.</p>

    <p>No hay dramatismo en su ausencia, solo un espacio vacío donde debería haber continuidad. Nadie lo nombra. Nadie explica. Simplemente ya no está. El molde quedó incompleto, pero siguieron adelante como si eso no importara.</p>

    <p>El otro creador permanece, aunque no siempre presente.</p>

    <p>Lo siento como una fuerza que va y viene, cansada, fragmentada. A veces me observa desde lejos; otras, pasa a través de mí sin notarme, como si yo fuera parte del mobiliario del mundo. Su creación no fue abandono, fue desgaste.</p>

    <p>Crecí en los intervalos.<br>
    En los huecos entre su llegada y su partida. En las horas silenciosas donde nadie ajustaba mi forma, donde nadie corregía mis grietas.</p>

    <p>Aprendí a sostenerme solo porque no había manos disponibles.</p>

    <p>Las figuras a mi alrededor hablan de normas, de caminos, de estructuras ya trazadas. Pero ninguna se detiene a enseñarme cómo caminar sobre ellas. Así que observo. Repito. Improviso. Me equivoco en silencio.</p>

    <p>Todo lo que incorporo lo hago copiando sombras.<br>
    Todo lo que sé lo aprendí mirándome sobrevivir.</p>

    <p>Las pequeñas estrellas dentro de mí no son regalos.</p>

    <p>Son restos. Fragmentos de intentos, de curiosidad no acompañada, de noches largas donde tuve que explicarme el mundo a mí mismo porque nadie más tenía tiempo. No iluminan el camino, pero me recuerdan que algo dentro aún reacciona.</p>

    <p>A veces me pregunto si mi falta de propósito nació ahí.</p>

    <p>No en un evento concreto, sino en la suma de ausencias bienintencionadas. En la idea de que existir era suficiente, aunque nadie explicara para qué.</p>

    <p>No odio a quienes me moldearon.<br>
    Tampoco los idealizo.</p>

    <p>Los observo como se observa una fuerza natural: una tormenta que pasa, una sequía que obliga a adaptarse. Ellos hicieron lo que pudieron. Yo hice lo que tuve que hacer.</p>

    <p>Ahora estoy aquí.</p>

    <p>Negro como el espacio profundo, lleno de pequeños puntos que no se apagan del todo. No sé si son promesas o simples reflejos de lo que nunca se dijo.</p>

    <p>Pero sigo de pie.</p>

    <p>No porque alguien me sostenga, sino porque aprendí a endurecerme donde faltaron manos.</p>

    <p>Y aunque no lo entienda del todo,<br>
    aunque no sepa qué se espera de mí,</p>

    <p><em>algo en esas estrellas insiste en permanecer.</em></p>

    <p>Como si, incluso en el descuido,<br>
    algo hubiera quedado sin querer…</p>

    <p><strong>vivo.</strong></p>
    `,
    imagen: "assets/moldean.jpg",
    musica: null
    },
    tierra: {
    texto: `
    <h2>La que aguardaba bajo la tierra</h2>

    <p>La vi por primera vez sin aviso, como se descubren ciertas verdades: cuando ya no queda energía para ignorarlas.</p>

    <p>Emergía de la tierra con una lentitud solemne, como si el tiempo se plegara a su paso. Su cuerpo, humanoide en esencia, estaba modelado en barro oscuro, en tierra húmeda que conservaba un pulso propio. No caminaba. Se deslizaba. La mitad inferior de su forma permanecía fundida con el suelo, atravesándolo sin romperlo, como si la tierra no fuera obstáculo, sino extensión de sí misma.</p>

    <p>Tenía dos brazos humanos, largos y firmes, capaces de un gesto cuidadoso o de una fuerza incuestionable. Desde su espalda nacían seis extremidades más, tres a cada lado, semejantes a patas de araña: articuladas, precisas, extendiéndose con un equilibrio extraño pero natural. No parecían añadidas; eran parte de un diseño antiguo, necesario.</p>

    <p>Su cabeza estaba cubierta por una capucha pesada, hecha del mismo barro que su cuerpo. Caía opaca, cerrada, ocultando por completo su rostro. No transmitía amenaza, sino reserva. Como si no todos tuvieran derecho a mirarla de frente.</p>

    <p>No parecía oscura.<br>
    <em>Parecía consciente.</em></p>

    <p>Había gente alrededor, aunque su presencia se sentía difusa, casi irrelevante. Voces que murmuraban, figuras que observaban demasiado. Algunos se acercaban con curiosidad torpe, otros con burla abierta, como si necesitaran provocar algo para confirmar que aquello era real.</p>

    <p>La tocaban con palabras.<br>
    La empujaban con gestos.</p>

    <p>Ella soportaba en silencio. No se movía, no reaccionaba de inmediato. Pero cuando la insistencia cruzaba un límite invisible, respondía. No con furia, sino con firmeza. Con la violencia justa de la tierra cuando se cansa de ser herida. Nadie podía decir que no había sido advertido.</p>

    <p>Yo observaba todo desde cierta distancia.</p>

    <p>No sentía miedo, sino una inquietud profunda, difícil de nombrar. Era la primera vez que la veía, y aun así algo en mí reconocía su presencia como importante, como si mi atención le perteneciera desde antes de entender por qué. No podía apartar la mirada.</p>

    <p>Mientras la observaba, el cansancio que llevaba tiempo arrastrando se hizo más evidente. No era físico: era un agotamiento mental, denso, persistente. Pensamientos que giraban sobre sí mismos sin llegar a ningún lugar, la sensación constante de estar fuera de sitio, de no encajar del todo en ninguna parte. Y allí estaba ella, emergiendo del suelo con una firmeza silenciosa, incomprensible y serena, como si perteneciera a un orden distinto del mundo, uno que no exigía explicaciones.</p>

    <p>Su sola presencia contrastaba con el ruido que llevaba dentro.</p>

    <p>Sin darme cuenta del momento exacto, la distancia entre nosotros comenzó a reducirse. No tomé una decisión consciente; simplemente avancé. Como si quedarme donde estaba ya no fuera una opción.</p>

    <p>No fue valentía.<br>
    <strong>Fue necesidad.</strong></p>

    <p>Avancé despacio, esperando algún gesto de rechazo, alguna señal de advertencia. No hubo ninguna. Ella no se volvió hacia mí de inmediato. Permaneció inmóvil, como si supiera que debía ser yo quien diera el último paso.</p>

    <p>Cuando estuve lo suficientemente cerca, levantó ligeramente la cabeza. La capucha seguía cubriendo su rostro, pero sentí su atención posarse sobre mí con un peso suave, casi cuidadoso.</p>

    <p>Entonces comprendí lo que buscaba.</p>

    <p>No palabras.<br>
    No respuestas.<br>
    <strong>Un abrazo.</strong></p>

    <p>No lo pedí. No hice ningún gesto explícito. Y aun así, ella se inclinó hacia mí, aceptando sin resistencia, como si ese momento hubiera estado aguardando desde que la vi emerger de la tierra.</p>

    <p>Sus brazos humanos me rodearon primero, firmes, cálidos. Luego, una a una, las extremidades de su espalda se cerraron también, envolviéndome con cuidado. No me atrapaban: me sostenían. Era más grande que yo, y su cuerpo de barro transmitía una calidez inesperada, como tierra que ha absorbido el sol durante todo el día.</p>

    <p><em>Respiré.</em></p>

    <p>El ruido del mundo se apagó. Las voces, las miradas, los juicios ajenos se volvieron lejanos, irrelevantes. Aun así, sabía que otros observaban, incapaces de comprender lo que ocurría. Como si aquello fuera incorrecto. Como si no tuviera sentido.</p>

    <p>Pero no tenía que tenerlo.</p>

    <p>En ese abrazo sentí entendimiento sin palabras. Melancolía compartida. Un cariño fraternal que no exigía explicaciones. La paz breve y honesta de sentirse, aunque fuera por un instante, en el lugar correcto.</p>

    <p>Fue entonces cuando ocurrió.</p>

    <p>Mientras descansaba contra ella, la capucha se desplazó apenas. No fue intencional. No fue una revelación completa. Solo un descuido breve, permitido por la cercanía.</p>

    <p><strong>Vi su rostro.</strong></p>

    <p>No era monstruoso.<br>
    No era ajeno.</p>

    <p>Sus facciones, formadas también de barro y tierra, eran suaves, serenas. Había en ellas un cansancio antiguo y una ternura contenida, una expresión profundamente humana. Sus ojos reflejaban algo que reconocí de inmediato: comprensión. No duró más que un segundo. Lo suficiente.</p>

    <p>Luego la capucha volvió a caer.</p>

    <p>No hizo falta más.</p>

    <p>Cuando se separó, no dijo nada.<br>
    Yo tampoco.</p>

    <p>Se deslizó de nuevo hacia la tierra, fundiéndose con ella como si siempre hubiera pertenecido allí. El suelo se cerró a su paso sin dejar rastro. Yo quedé de pie, solo otra vez, pero distinto. No curado. No completo.</p>

    <p><strong>Menos perdido.</strong></p>

    <p><em>Y por ahora, eso era suficiente.</em></p>
    `,
    imagen: "assets/tierra.jpg",
    musica: null
    },
    noSeQuedo: {
    texto: `
    <h2>Lo que no se quedó</h2>

    <p>Yo era una sombra.</p>

    <p>No una oscuridad absoluta, sino una figura incompleta, como si el mundo hubiera decidido dibujarme y luego detenerse a mitad del trazo. Mi cuerpo no tenía volumen; era una silueta plana, negra, ligeramente ondulante, como humo denso que hubiera aprendido a tomar forma humana. No tenía rostro, pero sentía. No tenía ojos, pero veía. Todo en mí parecía existir por inercia.</p>

    <p>El suelo bajo mis pies no era suelo. Era una extensión lisa y oscura, similar al vidrio negro, que reflejaba estrellas que no estaban en el cielo. Cada paso que daba producía ondas lentas, como si caminara sobre un lago quieto hecho de noche. El aire era espeso, cargado de una luz suave y azulada que no provenía de ningún punto específico. No había sol, ni luna, ni sombra proyectada: todo estaba iluminado de manera uniforme, irreal.</p>

    <p>A lo lejos, estructuras imposibles flotaban suspendidas: fragmentos de escaleras que no llevaban a ningún sitio, puertas abiertas sin paredes, restos de habitaciones sin techo. Era un mundo construido con pedazos de algo que alguna vez fue real, pero que ahora solo existía como recuerdo deformado.</p>

    <p><strong>Ella estaba allí.</strong></p>

    <p>No apareció; simplemente estaba. Su figura contrastaba con la mía de inmediato. Mientras yo era ausencia, ella era presencia. Su forma era humanoide, pero no completamente sólida. Estaba compuesta de una luz cálida, dorada y tenue, como la de una lámpara encendida en una habitación vacía. Su cuerpo parecía respirar, expandiéndose y contrayéndose lentamente, como si el entorno dependiera de su existencia para mantenerse estable.</p>

    <p>Su rostro era reconocible, aunque no idéntico al que recordaba. No era una copia exacta, sino una síntesis: sus rasgos suavizados, sin imperfecciones, sin tensión. Sus ojos no miraban con reproche ni con tristeza; miraban con cansancio profundo, de ese que no se queja porque ya ha aceptado demasiado. Su cabello flotaba suavemente, como si estuviera sumergida en agua tibia.</p>

    <p>La distancia entre nosotros era corta, pero insalvable.</p>

    <p>No había barreras visibles, ni muros, ni abismos. Sin embargo, algo en el aire mismo me decía que no podía acercarme más. No era una prohibición externa, era un límite interno. Yo lo entendía. Siempre lo entendí.</p>

    <p>Entre ambos flotaba algo invisible pero pesado: todo lo que no supimos resolver juntos. No se manifestaba como objetos ni palabras, sino como una vibración constante, una tensión que hacía temblar el espacio. Allí estaban las conversaciones inconclusas, los silencios mal elegidos, los días en los que estuve sin estar, los momentos en los que quise ayudar pero no supe cómo hacerlo sin invadir.</p>

    <p>La culpa se adhería a mí como una segunda sombra.</p>

    <p>No me gritaba. No me castigaba. Simplemente estaba ahí, recordándome cada instante en el que mi cansancio mental me volvió distante, cada vez que ella necesitó más de mí y yo solo pude ofrecer fragmentos. Sabía que había intentado cambiar. Sabía que había hecho lo que me pidió. Pero también sabía que, a veces, el daño ya está hecho cuando uno empieza a reaccionar.</p>

    <p>Ella no me reprochó nada.</p>

    <p><em>Eso fue lo que más dolió.</em></p>

    <p>Su silencio no era indiferencia; era comprensión. Y comprender no siempre sana. A veces solo confirma que ya no hay marcha atrás. En su postura había una serenidad frágil, como la de alguien que ha tomado una decisión difícil no por falta de amor, sino por exceso de carga.</p>

    <p>El mundo alrededor parecía reaccionar a su presencia. La luz se volvía más suave cuando ella respiraba. Las estructuras flotantes se mantenían estables mientras estaba allí. Yo sentía, con una claridad dolorosa, que ella era el centro de ese espacio onírico. Que, sin ella, todo comenzaría a deshacerse.</p>

    <p><strong>Quise hablar.</strong></p>

    <p>Las palabras se agolpaban en mí como ecos sin salida. Quise decirle que aún podíamos hacerlo mejor. Que yo estaba aprendiendo. Que no debía cargar sola con todo. Que no me importaba el peso si podía sostenerlo a su lado. Que no estaba de acuerdo con su decisión, pero la respetaba. Que mi mundo se había derrumbado el instante en que me lo dijo.</p>

    <p><strong>No dije nada.</strong></p>

    <p>Porque incluso en ese sueño entendí algo: decirlo ahora no cambiaría nada. No sería justo para ella. No sería honesto conmigo.</p>

    <p>Entonces apareció otra figura.</p>

    <p>No emergió del suelo ni descendió del cielo. Simplemente se manifestó a mi lado, como si siempre hubiera estado allí y yo recién pudiera verla. Su forma era distinta a la de ella y a la mía. No era luz ni sombra absoluta. Era un cuerpo definido, de tonos suaves y estables, como una estatua viva hecha de materia tranquila.</p>

    <p>No irradiaba calor ni oscuridad.<br>
    <em>Irradiaba presencia.</em></p>

    <p>Su rostro no era nítido, pero transmitía atención genuina. Sus ojos no juzgaban ni interrogaban. Solo observaban. Se colocó a mi lado sin tocarme, respetando mi forma quebrada. No miró a ella. Me miró a mí. Y en esa mirada había algo que no había sentido en mucho tiempo: permiso para caer sin romperme del todo.</p>

    <p>No habló.<br>
    No hacía falta.</p>

    <p>Su función no era reemplazar nada. No ocupaba el lugar de nadie. Era compañía en el sentido más puro: estar sin exigir, sostener sin arreglar. Su presencia no borraba el dolor, pero impedía que me disolviera por completo en él.</p>

    <p>Ella comenzó a alejarse.</p>

    <p>No caminó. No se dio la vuelta. Simplemente su luz empezó a atenuarse, como una estrella que se apaga lentamente sin explotar. Antes de desaparecer del todo, su figura cambió apenas. La tensión en su postura se suavizó. No era felicidad lo que vi. Era alivio. El alivio de alguien que ha dejado una carga demasiado pesada.</p>

    <p><em>Eso me atravesó.</em></p>

    <p>Sentí el ardor en el alma con una intensidad limpia, sin dramatismo. Un dolor que no se queja porque entiende. La esperanza quedó, sí, pero era pequeña, casi invisible. No como una promesa, sino como una posibilidad remota que decidí no perseguir. No por resignación, sino por respeto.</p>

    <p>Cuando ella se fue, el mundo empezó a deshacerse.</p>

    <p>Las estructuras flotantes se fragmentaron en polvo luminoso. El suelo negro perdió su reflejo estrellado. La luz azulada se apagó lentamente, dejando todo en una penumbra uniforme. Yo seguía siendo una sombra. Vacía. Cansada.</p>

    <p><strong>Pero no estaba solo.</strong></p>

    <p>La figura a mi lado permaneció. No me sostuvo. No me habló. Simplemente se quedó, mientras el sueño se apagaba y yo despertaba con esa calma falsa que engaña durante el día y arde durante la noche.</p>

    <p>Finalmente me desperte desconcertado, volteé hacia un lado como buscando a esa primer persona, queriendo creer que todo fue solo un mal sueño, <strong>pero solo una cosa desperto conmigo ese dia.</strong></p>

    <em>El dolor.</em></p>
    `,
    imagen: "assets/noSeQuedo.jpg",
    musica: null
    },
    margen: {
    texto: `
    <h2>El Margen</h2>

    <p>El lugar no necesitaba nombre.<br>
    Existía porque debía existir.</p>

    <p>No era antiguo ni nuevo: simplemente estaba. Un espacio suspendido en una penumbra uniforme, sin cielo ni suelo definidos, donde la luz parecía venir de ningún lado y de todos a la vez. Allí se extendía la fila.</p>

    <p><strong>Una fila interminable.</strong></p>

    <p>Entidades alineadas una tras otra, avanzando con una paciencia resignada. Algunas tenían forma humana, otras apenas conservaban rasgos reconocibles: almas, presencias, conciencias desnudas. Todas compartían algo esencial: se parecían entre sí. No en rostro, no en historia, sino en pertenencia. El lugar las aceptaba incluso antes de que llegaran al frente.</p>

    <p><strong>Yo estaba ahí.</strong><br>
    Y lo sabía.</p>

    <p>No como intuición vaga ni presentimiento poético: lo sabía con una claridad incómoda, directa, imposible de discutir. Sabía que no pertenecía a ese lugar del mismo modo que uno sabe cuándo entra a una habitación donde no fue invitado. No hacía falta que nadie lo dijera. Bastaba existir.</p>

    <p>Mi yo simbólico no tenía forma definida como los demás.<br>
    No era exactamente humano, ni del todo etéreo. Era una sombra compacta, oscura, pero no vacía. Dentro de mí había movimiento, grietas de luz apagada, como si algo hubiese querido tomar forma y se hubiera detenido a medio camino. No emitía brillo. No reflejaba nada.</p>

    <p><em>Y eso se notaba.</em></p>

    <p>En la fila, las otras entidades evitaban mirarme directamente. No por miedo, sino por incomodidad. Como cuando algo rompe la armonía de un patrón que nadie cuestiona. Algunas se desplazaban apenas hacia adelante cuando yo avanzaba, marcando distancia sin necesidad de palabras. Otras me observaban con curiosidad contenida, intentando descifrar qué hacía yo ahí.</p>

    <p>Yo tampoco lo sabía del todo.<br>
    Solo sabía que llevaba mucho tiempo esperando.</p>

    <p>El avance era lento. Dolorosamente lento.</p>

    <p>Cada paso parecía costar años. Cada intervalo entre uno y otro se alargaba como si el tiempo mismo se diluyera en la espera. Pero nadie abandonaba la fila. Nadie se iba. Porque llegar al final significaba algo. Significaba ser aceptado. Significaba existir con permiso.</p>

    <p><strong>Ahí nacía la esperanza.</strong></p>

    <p>No una esperanza ingenua, sino una construida a fuerza de espera. De repetirme que si había llegado tan lejos, si había soportado tanto, entonces debía haber un lugar para mí. Que el tiempo invertido no podía ser inútil. Que nadie espera tanto para nada.</p>

    <p><strong>Al frente de la fila estaba el Filtro.</strong></p>

    <p>No tenía forma estable. A veces parecía una superficie traslúcida suspendida en el aire; otras, una distorsión, como si la realidad se plegara sobre sí misma. No emitía sonido ni luz propia. Simplemente respondía.</p>

    <p>Cuando una entidad llegaba a él, el proceso era breve.<br>
    El Filtro la tocaba —o algo parecido a tocar— y el espacio reaccionaba. El aire se abría. La entidad avanzaba y desaparecía más allá, aceptada, integrada, continuada.</p>

    <p>Cuando llegó mi turno, el silencio se volvió absoluto.</p>

    <p>No un silencio solemne.<br>
    <em>Un silencio incómodo.</em></p>

    <p>Las entidades detrás de mí se detuvieron. Las de adelante ya no estaban. Por primera vez, estuve solo en la fila. Frente al Filtro. Expuesto.</p>

    <p>No sentí miedo.<br>
    <strong>Sentí confirmación.</strong></p>

    <p>El Filtro me recorrió de inmediato. No con curiosidad, no con duda. Su contacto fue frío, preciso, definitivo. Mi forma oscura vibró apenas, como si algo en mí intentara responder y no encontrara cómo.</p>

    <p>El espacio reaccionó mal.</p>

    <p>El aire se tensó.<br>
    La luz se fragmentó.<br>
    La fila, detrás de mí, retrocedió un paso completo.</p>

    <p><strong>Yo era el elemento discordante.</strong></p>

    <p>No hubo juicio moral.<br>
    No hubo castigo.</p>

    <p>Solo una reacción automática, como un sistema rechazando un cuerpo extraño.</p>

    <p>El Filtro se retiró de mí con una rapidez quirúrgica. Y entonces ocurrió lo inevitable: el lugar me señaló.</p>

    <p>El suelo bajo mi forma se desvió, no hacia adelante, sino hacia un costado. Una zona lateral, sin fila, sin avance, sin propósito.</p>

    <p><strong>Un margen.</strong></p>

    <p><strong>El exilio.</strong></p>

    <p>No fue violento.<br>
    Fue correcto.</p>

    <p>Las otras entidades evitaron mirarme mientras avanzaban de nuevo. La fila se reorganizó como si yo nunca hubiera estado ahí. Como si mi espera, mi tiempo, mi esperanza, no hubieran existido.</p>

    <p>Y fue ahí donde dolió de verdad.</p>

    <p>No en el rechazo, porque ya lo sabía.<br>
    No en la exclusión, porque la había sentido desde el inicio.</p>

    <p><strong>Dolió en la espera.</strong></p>

    <p>En haber permanecido tanto tiempo creyendo que la paciencia podía convertirse en pertenencia. En haberle dado a la esperanza un lugar que no merecía. En entender que no importa cuánto aguantes, cuánto esperes, cuánto te adaptes: algunas cosas simplemente no son aceptadas.</p>

    <p>Me quedé ahí, en el margen, viendo cómo la fila seguía avanzando.<br>
    Viendo cómo otros eran recibidos.<br>
    Viendo cómo la existencia continuaba sin necesitarme.</p>

    <p>Y aun así…<br>
    aun entonces…</p>

    <p>una parte mínima, casi ridícula, seguía preguntándose si quizá, con suficiente tiempo, algo cambiaría.</p>

    <p><strong>Esa fue la última mentira.</strong></p>

    <p>Porque la esperanza no muere cuando te rechazan.<br>
    <em>Muere cuando entiendes que nunca hubo un lugar para ti desde el principio.</em></p>
    `,
    imagen: "assets/margen.png",
    musica: null
    },
    piezas: {
    texto: `
    <h2>Las piezas no descansan</h2>

    <p>El mundo era una fábrica.</p>

    <p>No una que alguien hubiera construido, sino una que ya estaba ahí antes de que existiera la idea de construir. No tenía inicio ni final visibles. Se extendía en todas direcciones como una ciudad infinita de hierro, vapor y movimiento. Columnas gigantes sostenían techos imposibles que se perdían en la altura, atravesados por tuberías que respiraban humo caliente y aceitoso. El suelo vibraba constantemente, como si algo colosal caminara debajo de todo.</p>

    <p><strong>Nada estaba quieto.</strong></p>

    <p>Engranes del tamaño de edificios giraban con una lentitud implacable, encajando unos con otros con una precisión aterradora. Cintas transportadoras cruzaban el espacio cargando piezas, cuerpos, fragmentos de algo que alguna vez pudo ser humano. Brazos mecánicos bajaban y subían en ciclos eternos, ensamblando, ajustando, corrigiendo desviaciones mínimas.</p>

    <p>Todo tenía un ritmo.<br>
    Todo obedecía.</p>

    <p><strong>Yo estaba dentro de la fábrica.</strong></p>

    <p>No como visitante.<br>
    No como observador.<br>
    <em>Como parte del mecanismo.</em></p>

    <p>Mi forma era indefinida, erosionada por el uso. Tenía algo de humano, lo suficiente para recordar que alguna vez lo fui, pero mi cuerpo estaba adaptado a una función concreta. Estaba anclado a una pieza central: un engrane de tamaño mediano, ni crucial ni ornamental. Uno más. Uno que giraba porque debía girar.</p>

    <p>Cada vuelta era idéntica a la anterior.</p>

    <p>No había relojes, pero el tiempo se sentía en el desgaste. En el rechinar constante de los metales. En la capa de grasa negra que cubría todo, incluida mi propia superficie. No sabía cuánto llevaba ahí. Tal vez siempre había estado. Tal vez había llegado sin darme cuenta, un día cualquiera, haciendo lo mismo que hacía todos los días.</p>

    <p>Mover.<br>
    Empujar.<br>
    Ajustar.<br>
    <strong>Repetir.</strong></p>

    <p>A mi alrededor, otros.</p>

    <p>Algunos parecían personas deformadas por la función: cuerpos doblados, extremidades alargadas para alcanzar palancas lejanas, rostros inexpresivos con ojos apagados. Otros ya no tenían nada de humano; eran solo formas útiles, siluetas que encajaban perfectamente en su tarea.</p>

    <p>Nadie hablaba.<br>
    No porque estuviera prohibido, sino porque no era necesario.</p>

    <p>El ruido lo llenaba todo. Un estruendo constante, profundo, que no se podía ignorar ni acostumbrar del todo. Era el sonido de algo que funciona sin preguntarse por qué.</p>

    <p><strong>Empecé a cansarme.</strong></p>

    <p>No de un día en específico.<br>
    No de una tarea en particular.</p>

    <p>Era el cansancio de saber que mañana sería exactamente igual. Que incluso si algo cambiaba en mi pequeño entorno, el sistema completo seguiría avanzando sin notarlo. El cansancio de no recordar cuándo fue la última vez que algo tuvo sentido.</p>

    <p>Un día —si es que ahí existían los días— decidí no girar.</p>

    <p>Fue un acto mínimo. Casi insignificante. Apenas una resistencia leve al movimiento que me atravesaba. Sentí de inmediato la presión. El engrane al que estaba unido vibró con mayor fuerza, como si el sistema intentara corregirme.</p>

    <p><strong>Insistí.</strong></p>

    <p>Por un instante, imaginé que todo se detendría. Que el error se propagaría. Que alguien, algo, notaría mi ausencia funcional.</p>

    <p><strong>No ocurrió.</strong></p>

    <p>El engrane siguió girando.<br>
    Otra pieza absorbió la carga.<br>
    El ruido no cambió.</p>

    <p>Lo intenté de nuevo, esta vez con más fuerza. Mi cuerpo crujió. Partes de mí comenzaron a desprenderse: recuerdos sin forma, fragmentos de voluntad, pequeñas certezas que se rompían al contacto con el metal.</p>

    <p>El sistema no me castigó.</p>

    <p><em>Eso habría implicado que le importaba.</em></p>

    <p>Simplemente se adaptó.</p>

    <p>Comprendí entonces que no era imprescindible. Que nunca lo había sido. Que mi existencia allí no sostenía nada que no pudiera sostenerse sin mí.</p>

    <p>La impotencia no fue inmediata.<br>
    Llegó despacio, como una verdad que se acomoda.</p>

    <p><strong>Intenté salir.</strong></p>

    <p>Me forcé fuera del engrané, arrancándome de la función que me definía. El dolor apareció, real, punzante, pero era preferible al movimiento eterno. Caí entre plataformas, rodé por conductos, me golpeé contra superficies calientes y frías indistintamente.</p>

    <p>Cuando logré detenerme, miré hacia atrás.</p>

    <p><strong>Mi lugar ya estaba ocupado.</strong></p>

    <p>Una nueva pieza —similar, funcional, perfectamente adecuada— giraba donde yo había estado. Nadie había detenido la fábrica para reemplazarme. Nadie había tenido que pensar demasiado.</p>

    <p>Desde el suelo, observé el conjunto completo.</p>

    <p>Miles de niveles.<br>
    Millones de movimientos.<br>
    Una maquinaria tan vasta que mi ausencia era invisible.</p>

    <p>Quise gritar, pero mi voz fue absorbida por el ruido.<br>
    Quise destruir algo, pero nada dependía de mí.</p>

    <p>La fábrica no era malvada.<br>
    No era cruel.<br>
    No tenía intención.</p>

    <p><strong>Eso era lo peor.</strong></p>

    <p>Seguí ahí, sentado entre restos de piezas gastadas, viendo cómo el mundo avanzaba sin despeinarse. Entendí que podía irme, romperme, desaparecer por completo… y el sistema seguiría funcionando con la misma eficacia.</p>

    <p>El cansancio se volvió pesado.</p>

    <p>No el cansancio del esfuerzo,<br>
    sino el de saber que nada de lo que haga altera el curso de las cosas.</p>

    <p><strong>Las piezas no descansan.</strong><br>
    El sistema no se detiene.</p>

    <p>Y yo…<br>
    <em>solo fui una refacción más.</em></p>
    `,
    imagen: "assets/piezas.jpg",
    musica: null
    },
    todoSiguio: {
    texto: `
    <h2>El día que todo siguió, menos yo</h2>

    <p>No hubo un estruendo.<br>
    No hubo un derrumbe visible.</p>

    <p><strong>Fue una conversación.</strong></p>

    <p>Nada extraordinario. Dos personas sentadas frente a frente. Una voz que temblaba lo suficiente como para notarse, pero no lo suficiente como para romperse. Palabras que no gritaban, pero que ya no podían seguir guardándose.</p>

    <p>Ahí entendí.</p>

    <p>No porque me atacaran.<br>
    No porque me señalaran con rabia.</p>

    <p>Sino porque me pusieron frente a algo que yo ya sabía y no quería mirar.</p>

    <p><strong>Estaba desconectado.</strong></p>

    <p>No distraído.<br>
    No cansado solamente.<br>
    <em>Desconectado.</em></p>

    <p>Había estado funcionando en automático durante meses. Cumpliendo. Respondiendo. Haciendo lo mínimo necesario para que nada explotara. Pensé que eso era suficiente. Pensé que mientras no hubiera conflictos abiertos, todo estaba bajo control.</p>

    <p><strong>Pero no estaba ahí.</strong></p>

    <p>Me dijeron, con una claridad dolorosa, que no me sentían presente. Que algo en mí estaba lejos, incluso cuando mi cuerpo estaba sentado enfrente. Que mis respuestas eran correctas, pero vacías. Que mis intentos eran lógicos, pero fríos.</p>

    <p>Y no pude defenderme.</p>

    <p><em>Porque era verdad.</em></p>

    <p>En ese momento algo hizo clic dentro de mí. No un clic de solución. Un clic de caída. Fue como si de repente me quitaran el filtro que me permitía no darme cuenta. Todo lo que había estado evitando sentir se alineó frente a mí.</p>

    <p><strong>No estaba viviendo.</strong><br>
    Estaba sobreviviendo en modo bajo consumo.</p>

    <p>Intenté reaccionar. Intenté explicar. Intenté prometer cambios inmediatos. Y lo hice. Cambié conductas. Ajusté actitudes. Escuché más. Hablé más. Hice todo lo que estaba en mis manos.</p>

    <p>Pero lo que estaba roto no era una acción.<br>
    <em>Era la conexión.</em></p>

    <p>Y eso no se arregla apretando más fuerte.</p>

    <p>Después de esa conversación, el mundo no se detuvo. Siguió igual. Las calles seguían llenas. Las redes seguían moviéndose. Las personas seguían con sus rutinas. Pero dentro de mí algo quedó suspendido.</p>

    <p>Me volví consciente de cada gesto que hacía. De cada palabra. De cada silencio. Todo empezó a sentirse calculado. Forzado. Como si tuviera que reaprender a ser una persona desde cero.</p>

    <p>Y en esa hiperconciencia me perdí más.</p>

    <p>Intenté pedir ayuda.<br>
    No pude.</p>

    <p>No porque no tuviera a quién acudir, sino porque cuando todo se puso sobre la mesa, me dio vergüenza admitir que yo mismo no sabía qué me estaba pasando. ¿Cómo explicas que estás desconectado de tu propia vida? ¿Cómo dices “algo en mí se apagó” sin sonar dramático o irresponsable?</p>

    <p>Me lo guardé.<br>
    Seguí intentando mejorar en silencio.</p>

    <p>Pero mientras más intentaba forzar la conexión, más artificial se volvía. Las emociones no regresaban por obligación. El afecto no se reactivaba por disciplina. Y cada pequeño fallo se sentía amplificado.</p>

    <p>Ahí fue cuando entendí la parte más cruda:</p>

    <p><strong>No era que el mundo se hubiera detenido.<br>
    Yo me había quedado atrás.</strong></p>

    <p>Las personas que amo necesitaban presencia real. Necesitaban sentirme ahí. Yo ofrecía intención. Y la intención, cuando no se siente, no alcanza.</p>

    <p>Me di cuenta demasiado tarde de que llevaba tiempo ausente sin haberme ido físicamente.</p>

    <p><strong>Ese fue el punto de inflexión.</strong></p>

    <p>No un grito.<br>
    No un portazo.<br>
    Una verdad dicha con calma.</p>

    <p><em>Y esa calma fue lo que más dolió.</em></p>

    <p>Desde entonces, vivo con la sensación de haber fallado en el momento exacto en que debía estar más despierto. No por maldad. No por desamor. Sino por agotamiento acumulado que nunca supe manejar.</p>

    <p>El día que todo siguió, menos yo, no fue espectacular. Fue íntimo. Fue humano. Fue una conversación que me mostró que no basta con estar vivo para estar presente.</p>

    <p>Y aunque intenté volver, aunque hice lo posible por reconectarme, algo ya había cambiado.</p>

    <p>No fue que el mundo avanzara sin mí.</p>

    <p><strong>Fue darme cuenta de que, mientras intentaba sostenerlo todo,<br>
    me había soltado a mí mismo.</strong></p>
    `,
    imagen: "assets/todoSiguio.jpg",
    musica: null
    },
    conversacion: {
    texto: `
    <h2>La conversación que nunca ocurrió</h2>

    <p>Hay un lugar donde las palabras que no se dijeron se quedan flotando.</p>

    <p>No es un sueño exactamente.<br>
    No es un recuerdo.</p>

    <p>Es una habitación sin paredes, sin techo, donde las voces existen antes de ser pronunciadas.</p>

    <p><strong>Estoy ahí.</strong></p>

    <p>Frente a mí no hay una sola persona. Hay varias presencias, cada una reconocible, aunque no del todo visible. No necesitan rostro. Sé quiénes son por lo que me provocan.</p>

    <p><strong>Primero está ella.</strong></p>

    <p>No la veo con claridad, pero siento el peso exacto de su existencia. Está a una distancia corta, como aquella vez. La misma serenidad. La misma decisión firme que yo respeté aunque por dentro me estuviera desmoronando.</p>

    <p>Esta vez puedo hablar.</p>

    <p>Las palabras se agolpan en mi garganta como si llevaran meses esperando salir.</p>

    <p>Quiero decirle que no fue falta de amor.<br>
    Que nunca dejó de ser mi mundo.<br>
    Que estaba cansado, sí, pero no ausente por elección.<br>
    Que debí haber luchado más fuerte.<br>
    Que debí haberle pedido que se quedara.</p>

    <p>Quiero decirle que me tragaba el orgullo, que me arrodillaba si era necesario, que estaba dispuesto a aprender lo que hiciera falta, que no quería perderla.</p>

    <p>Pero cuando intento hablar, mi voz sale débil. No porque no tenga fuerza, sino porque ya no tiene destino.</p>

    <p>Las palabras existen…<br>
    pero no llegan.</p>

    <p>No porque alguien las bloquee.<br>
    Sino porque el momento en que podían cambiar algo ya pasó.</p>

    <p>Ella no me reprocha nada.</p>

    <p><em>Eso lo hace más difícil.</em></p>

    <p>Hay algo en su presencia que dice: lo sé.<br>
    Y también dice: ya no importa.</p>

    <p>Tragué esas palabras en su momento por respeto. Por entender que su decisión no era un ataque, sino una forma de sobrevivir a lo que ella misma estaba cargando. Me convencí de que amarla también era dejarla ir.</p>

    <p>Pero el cuerpo no entiende tanto de dignidad.<br>
    <strong>El cuerpo quería suplicar.</strong></p>

    <p>La habitación cambia apenas.</p>

    <p>Las luces bajan un poco, y siento sus presencias.</p>

    <p><strong>Mi familia.</strong></p>

    <p>No están alineados frente a mí. No es una escena dramática. Están dispersos, como si estuvieran ocupados en sus propias vidas. Como siempre ha sido.</p>

    <p>Quiero pedirles perdón.</p>

    <p>Perdón por no ser el hijo que merecen.<br>
    Por no ser el nieto que llena de orgullo.<br>
    Por no ser el hermano firme que sostiene cuando hace falta.</p>

    <p>Quiero decirles que no es falta de cariño. Que no es indiferencia. Que a veces simplemente no sé cómo ser mejor de lo que soy. Que llevo tiempo intentando mejorar y no siento que avance lo suficiente como para devolverles todo lo que han hecho por mí.</p>

    <p>Pero nuestra familia nunca fue de palabras abiertas.<br>
    No crecimos sentándonos a decir lo que duele.<br>
    <em>Crecimos cumpliendo.</em></p>

    <p>Intento hablarles.<br>
    La voz me pesa.</p>

    <p>No porque no quiera decirlo, sino porque no sé cómo empezar sin romper una dinámica que lleva años sosteniéndose en el silencio. No quiero incomodar. No quiero abrir algo que nadie pidió abrir.</p>

    <p>Entonces la siento a ella.</p>

    <p><strong>Mi mejor amiga.</strong></p>

    <p>Su presencia es distinta. No está distante. Está cerca. Siempre lo ha estado. Es la única frente a la que siento que podría decir todo sin medir cada palabra.</p>

    <p>Y aun así me quedo corto.</p>

    <p>Quiero pedirle perdón también.</p>

    <p>Por no estar siempre a la altura de lo que ella me ha dado.<br>
    Por no poder ser el amigo que necesita en todos sus momentos.<br>
    Por recibir tanto apoyo cuando me rompí… y devolver solo fragmentos.</p>

    <p>Quiero decirle que la admiro. Que su fuerza me ha sostenido más veces de las que puedo contar. Que, aunque a veces me pierdo en mis propios conflictos, no dejo de valorar lo que hace por mí.</p>

    <p>Esta vez sí hablo.</p>

    <p>Pero mi voz no es épica. No es el discurso perfecto que imaginé en noches largas.</p>

    <p>Es torpe. Vulnerable. Humana.</p>

    <p>Y ella escucha.</p>

    <p>No necesita que sea perfecto. Nunca lo necesitó.</p>

    <p><em>Y eso me duele más.</em></p>

    <p>Porque yo sí me exijo perfección.</p>

    <p>La habitación comienza a desvanecerse lentamente. Las presencias se vuelven más difusas. Las palabras que logré pronunciar no se evaporan, pero tampoco cambian nada.</p>

    <p>Y ahí es cuando lo siento.</p>

    <p><strong>Una mierda.</strong></p>

    <p>Pesada. Directa. Sin metáforas elegantes.</p>

    <p>Porque entiendo que esa habitación no es un segundo intento. Es solo el lugar donde reconozco lo que ya no puedo modificar.</p>

    <p>No puedo regresar a esa conversación.<br>
    No puedo volver a ese día y decir lo que me guardé.<br>
    No puedo abrir espacios que ya cerraron.</p>

    <p>Y no es que me estén castigando.<br>
    Es que el tiempo no retrocede.</p>

    <p>Lo que me toca es quedarme con todo esto.</p>

    <p>Con las palabras no dichas.<br>
    Con las disculpas que quedaron en la garganta.<br>
    Con el amor que no defendí en voz alta.<br>
    Con el agradecimiento que no expresé cuando debía.</p>

    <p><strong>Y apechugar.</strong></p>

    <p>No como mártir.<br>
    No como víctima.</p>

    <p>Como alguien que entiende que las decisiones y los silencios también tienen consecuencias.</p>

    <p>La habitación desaparece por completo.</p>

    <p>Me quedo solo.</p>

    <p><strong>Con todo lo que no dije.</strong></p>

    <p>Y aun así… aun con ese peso, aun con esa frustración cruda, hay algo pequeño que no se extingue del todo.</p>

    <p><em>Una esperanza mínima.</em></p>

    <p>No de volver atrás.<br>
    No de reescribir la historia.</p>

    <p>Sino de que quizá, algún día, en algún momento menos cargado, pueda decir al menos una palabra de todas esas conversaciones que nunca ocurrieron.</p>

    <p>Aunque sea una.<br>
    Aunque llegue tarde.<br>
    Aunque no cambie nada.</p>

    <p><strong>Porque a veces no se trata de corregir el pasado.</strong></p>

    <p>Se trata de no volver a callar cuando el momento vuelva a presentarse.</p>

    <p>Y si ese momento no llega…</p>

    <p>al menos sabré que lo sentí.</p>

    <p><em>Y que fue real.</em></p>
    `,
    imagen: "assets/conversacion.jpg",
    musica: null
    },
    noIntentarlo: {
    texto: `
    <h2>No voy a intentarlo más</h2>

    <p>Si te soy honesto, ya no quiero mejorar.</p>

    <p>No lo digo en un arranque.<br>
    No es una frase dramática para llamar la atención.</p>

    <p>Es algo que he venido masticando en silencio durante mucho tiempo.</p>

    <p><strong>Estoy cansado.</strong></p>

    <p>Cansado de estar en constante proceso de corrección.<br>
    Cansado de analizar cada error como si fuera una señal de que todavía no soy suficiente.<br>
    Cansado de sentir que siempre hay algo que arreglar en mí.</p>

    <p>He intentado mejorar.</p>

    <p>Intenté ser más presente.<br>
    Intenté comunicar mejor.<br>
    Intenté no desconectarme cuando me sentía abrumado.<br>
    Intenté no ser una carga.<br>
    Intenté sostener a los demás mientras aprendía a sostenerme.</p>

    <p>Y aun así, las cosas se rompieron igual.<br>
    Las personas se fueron igual.<br>
    Las distancias crecieron igual.<br>
    Los errores aparecieron igual.</p>

    <p>Entonces empecé a preguntarme algo que me daba miedo admitir:</p>

    <p><strong>¿Y si no importa cuánto lo intente?</strong></p>

    <p>No lo digo con rabia.<br>
    Lo digo con agotamiento.</p>

    <p>He leído. He reflexionado. He pedido perdón cuando correspondía. He reconocido fallos. He intentado cambiar patrones que me hacían daño y que podían hacerle daño a otros.</p>

    <p>Pero nunca parece suficiente.</p>

    <p>Siempre hay una versión mejor que debería alcanzar.<br>
    Siempre hay una forma más madura de reaccionar.<br>
    Siempre hay una expectativa que no termino de cumplir.</p>

    <p>Y llega un punto en el que mejorar deja de sentirse como crecimiento…<br>
    <em>y empieza a sentirse como persecución.</em></p>

    <p><strong>Estoy cansado de perseguirme.</strong></p>

    <p>Cansado de intentar convertirme en alguien que tal vez no soy.</p>

    <p>Hay días en los que siento que todo este esfuerzo por ser mejor no me está construyendo. Me está desgastando. Como si estuviera lijando una superficie que nunca queda lisa.</p>

    <p>Y te lo digo así, directo:</p>

    <p><strong>Ya no quiero intentarlo más.</strong></p>

    <p>No quiero despertarme pensando en qué parte de mí tengo que corregir hoy.<br>
    No quiero medir cada palabra para asegurarme de que estoy siendo suficientemente empático, suficientemente fuerte, suficientemente estable.<br>
    No quiero vivir como proyecto en reparación constante.</p>

    <p>Tal vez no soy la mejor versión posible.<br>
    Tal vez no soy extraordinario.<br>
    Tal vez siempre voy a tener partes torcidas.</p>

    <p>Y quizá eso es lo que hay.</p>

    <p>Si te lo estoy contando a ti es porque sé que no me vas a escuchar como si estuviera rindiéndome ante la vida. Sabes que lo he intentado. Sabes que no me quedé cruzado de brazos esperando que todo se arreglara solo.</p>

    <p><strong>Lo intenté de verdad.</strong></p>

    <p>Y eso es lo que duele.</p>

    <p>Porque cuando das lo que puedes y aún así no basta, algo dentro se empieza a romper.</p>

    <p>No de golpe.<br>
    No con ruido.<br>
    <em>Se rompe en silencio.</em></p>

    <p>Empieza a perder sentido el esfuerzo. Empieza a sentirse inútil la lucha. Empieza a crecer la idea de que tal vez el problema no es que no lo intente lo suficiente… sino que simplemente soy así.</p>

    <p>Y tal vez no hay nada más que hacer.</p>

    <p>No quiero seguir desgastándome para encajar en una versión ideal que siempre está un paso más adelante. No quiero seguir creyendo que si mejoro lo suficiente voy a evitar perder a alguien, o evitar fallar, o evitar decepcionar.</p>

    <p>Porque ya entendí algo:</p>

    <p><strong>No existe esa garantía.</strong></p>

    <p>Puedes mejorar y aun así fallar.<br>
    Puedes esforzarte y aun así perder.<br>
    Puedes cambiar y aun así no ser suficiente para alguien.</p>

    <p>Entonces, ¿para qué me destruyo intentando alcanzar algo que no me promete nada?</p>

    <p>Quizá esto suena oscuro.<br>
    Quizá suena como abandono.<br>
    Pero se siente más como una demolición interna controlada.</p>

    <p>Estoy cansado de construirme sobre expectativas que no sé si son mías o de los demás.<br>
    Estoy cansado de sostener una versión mejorada que nunca termina de estabilizarse.</p>

    <p>Si tengo que quedarme como estoy —con mis fallas, con mis límites, con mis desconexiones ocasionales— entonces que sea así.</p>

    <p><strong>Prefiero aceptar mis grietas que seguir rompiéndome intentando sellarlas todas.</strong></p>

    <p>Y si eso significa que algunas personas no van a quedarse, que algunas cosas no van a funcionar, que algunas versiones de mi vida no se van a cumplir…</p>

    <p><em>Al menos no me estaré mintiendo.</em></p>

    <p><strong>No voy a intentarlo más.</strong></p>

    <p>No voy a seguir puliéndome hasta quedarme sin forma.<br>
    No voy a seguir empujándome hasta vaciarme por completo.</p>

    <p>Si algo en mí quiere cambiar algún día, que cambie porque nace de adentro.<br>
    No porque esté huyendo de perder algo otra vez.</p>

    <p><strong>Estoy cansado.</strong></p>

    <p>Y esta vez no voy a pelear contra ese cansancio.</p>
    `,
    imagen: "assets/noIntentarlo.jpg",
    musica: null
    }
};

let historiaActual = "prologo";

/* =========================
   CAMBIAR HISTORIA
========================= */

function cambiarMusica(nuevaSrc) {

    let fadeOut = setInterval(() => {

        if (bgMusic.volume > 0.05) {
            bgMusic.volume -= 0.05;
        } else {

            clearInterval(fadeOut);

            bgMusic.pause();
            bgMusic.src = nuevaSrc;
            bgMusic.volume = 0;

            bgMusic.play().then(() => {

                let fadeIn = setInterval(() => {

                    if (bgMusic.volume < 0.4) {
                        bgMusic.volume += 0.05;
                    } else {
                        clearInterval(fadeIn);
                    }

                }, 100);

            }).catch(err => {
                console.log("Error al cambiar música:", err);
            });
        }

    }, 100);
}


function actualizarMusica(id) {

    if (!musicaIniciada) return;

    const nuevaMusica = historias[id].musica;

    // Si no hay música en la nueva historia
    if (!nuevaMusica) {
        bgMusic.pause();
        bgMusic.src = "";
        return;
    }

    // Si ya es la misma música, no hacer nada
    if (bgMusic.src.includes(nuevaMusica)) return;

    cambiarMusica(nuevaMusica);
}

function prepararAmbientacion(id) {

    // 🔥 LIMPIAR TODO SIEMPRE
    estrellas = [];
    particulas = [];
    particulasMateria = [];
    estrellasMoldean = [];
    particulasTierra = [];
    nubesPolvo = [];

    switch (id) {

        case "prologo":
            iniciarEstrellas(200);
            break;

        case "materia":
            iniciarMateria(200);
            break;

        case "moldean":
            iniciarMoldean(400);
            break;

        case "tierra":
            iniciarTierra(160);
            iniciarNubesTierra(5);
            break;

        case "noSeQuedo":
            iniciarNoSeQuedo();
            break;

        case "margen":
            iniciarMargen();
            break;

        case "piezas":
            iniciarPiezas();
            break;

        case "todoSiguio":
            break;

        case "conversacion":
            break;

        case "noIntentarlo":
            break;
    }
}

function cambiarHistoria(id) {

    if (!historias[id]) return;

    historiaActual = id;
    modoActual = id;
    prepararAmbientacion(id);

    // Reset forzado de clases
    texto.classList.remove("fade-in", "fade-out");
    imagenHistoria.classList.remove("fade-in", "fade-out");

    // Forzar reflow para reiniciar animaciones
    void texto.offsetWidth;
    void imagenHistoria.offsetWidth;

    texto.classList.add("fade-out");
    imagenHistoria.classList.add("fade-out");

    setTimeout(() => {

        texto.innerHTML = historias[id].texto;

        // Esperar a que la imagen cargue antes del fade-in
        imagenHistoria.onload = () => {

            imagenHistoria.classList.remove("fade-out");
            imagenHistoria.classList.add("fade-in");

            setTimeout(() => {
                imagenHistoria.classList.remove("fade-in");
            }, 800);
        };

        imagenHistoria.src = historias[id].imagen;

        texto.classList.remove("fade-out");
        texto.classList.add("fade-in");

        setTimeout(() => {
            texto.classList.remove("fade-in");
        }, 800);

       actualizarMusica(id);

    }, 300);

    sidebar.classList.remove("active");
}

/* =========================
   CAMBIAR MÚSICA
========================= */



/* =========================
   ESTADO INICIAL (AL FINAL)
========================= */

texto.innerHTML = historias.prologo.texto;
imagenHistoria.src = historias.prologo.imagen;
document.body.setAttribute("data-tema", "prologo");


/* =========================
   EVENTOS
========================= */


toggleMenu.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

musicBtn.addEventListener("click", () => {

    if (!musicaIniciada) return;

    if (bgMusic.muted) {
        bgMusic.muted = false;
        musicBtn.textContent = "🔊";
    } else {
        bgMusic.muted = true;
        musicBtn.textContent = "🔇";
    }
});

window.addEventListener("load", () => {

    prepararAmbientacion("prologo");
    render();

    bgMusic.src = historias[historiaActual].musica;
    bgMusic.loop = true;
    bgMusic.volume = 0.4;
    bgMusic.muted = true;

    bgMusic.play().catch(err => {
        console.log("Autoplay bloqueado:", err);
    });
});








