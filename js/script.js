let clicks = 0;
let cans = 0;

const BarkNoise = document.getElementById("BarkNoise");
const CanSound = document.getElementById("CanSound");
const EnormNoBullshit = document.getElementById("EnormNoBullshit");

const tracker = document.querySelector(".hondje");
let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;
const speed = 0.02;

document.addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

function animate() {
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;

    let mirror = posX > mouseX ? "scaleX(-1)" : "scaleX(1)";

    tracker.style.transform = `translate(${posX}px, ${posY}px) ${mirror}`;

    requestAnimationFrame(animate);
}

document.getElementById("openPopup").addEventListener("click", function () {
    clicks++;
    BarkNoise.play();

    if (clicks === 3) {
        if (confirm("Ik ben moe, kun je mijn energy blikjes vinden?")) {
            Yes();
        }
        clicks = 0;
    }
});

function Yes() {
    document.body.classList.toggle("custom-cursor");
    document.querySelector(".hondje").style.opacity = "100";
    animate();
    //DogGif.classList.add('animate-right');
    LogoBlank.classList.remove('hidden');
    EnergyCanCreative.classList.remove('hidden');
    EnergyCanLogo.classList.remove('hidden');
    EnergyCanSocial.classList.remove('hidden');
}

function Completed() {
    EnormNoBullshit.classList.remove('hidden');

    const requestFs = (el) => {
        if (el.requestFullscreen) return el.requestFullscreen();
        if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
        if (el.msRequestFullscreen) return el.msRequestFullscreen();
        return Promise.resolve();
    };

    const exitFs = () => {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
            if (document.exitFullscreen) return document.exitFullscreen();
            if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
            if (document.msExitFullscreen) return document.msExitFullscreen();
        }
        return Promise.resolve();
    };

    const cleanup = () => {
        EnormNoBullshit.pause();
        exitFs().finally(() => {
            EnormNoBullshit.removeEventListener("ended", handleEnded);
            EnormNoBullshit.removeEventListener("click", handleClickToClose);
            document.removeEventListener("keydown", handleEscToClose);
            EnormNoBullshit.remove();
            console.log("Video removed after playing.");
        });
    };

    const handleEnded = () => cleanup();
    const handleClickToClose = () => cleanup();
    const handleEscToClose = (e) => {
        if (e.key === "Escape") cleanup();
    };

    EnormNoBullshit.addEventListener("ended", handleEnded);
    EnormNoBullshit.addEventListener("click", handleClickToClose);
    document.addEventListener("keydown", handleEscToClose, { once: true });

    requestFs(EnormNoBullshit).finally(() => {
        EnormNoBullshit.play();
    });
};

document.getElementById("EnergyCanCreative").addEventListener("click", function () {
    this.remove();
    cans++;
    CanSound.play();
    if (cans < 3) {
        alert("We don't talk about it");
    } else {
        Completed();
    }
});

document.getElementById("EnergyCanLogo").addEventListener("click", function () {
    this.remove();
    cans++;
    CanSound.play();
    if (cans < 3) {
        alert("Focus op het sociale aspect");
    } else {
        Completed();
    }
});

document.getElementById("EnergyCanSocial").addEventListener("click", function () {
    this.remove();
    cans++;
    CanSound.play();
    if (cans < 3) {
        alert("Wees creatief");
    } else {
        Completed();
    }
});