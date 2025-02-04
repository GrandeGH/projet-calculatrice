const ecran = document.getElementById("écran")
let opérande1 = ""
let opérateur = "" // opérateur en attente * + - %
let valeurActuelle = ""
let enAttente = false 

document.querySelector(".boutons").addEventListener("click", function (event) {
    let cible = event.target
    if (cible.classList.contains("nombre")) {
        appendNumber(cible.dataset.value)
    }
    else if (cible.dataset.action === "op") {
        choisirOpérateur(cible.textContent)
    }
    else if (cible.dataset.action === "calculer") {
        calculer()
    }
    else if (cible.dataset.action === "clear") {
        clear()
    }
    else if (cible.dataset.action === "delete") {
        deleteLast()
    }
    else if (cible.dataset.action === "point") {
        addDecimal()
    }
    else if (cible.dataset.action === "plusMoins") {
        toggleSign()
    }
})

function appendNumber(number) {
    if (ecran.textContent === "0" || enAttente) {
        ecran.textContent = number
        enAttente = false
    }
    else {
        ecran.textContent += number
    }
}

function choisirOpérateur(op) {
    if (opérateur !== "") calculer()
    valeurActuelle = ecran.textContent
    opérateur = op
    enAttente = true
}

function calculer() { 
    if (opérateur === "" || enAttente) return
    let secondValue = ecran.textContent
    let result
    switch (opérateur) {
        case "+":
            result = parseFloat(valeurActuelle) + parseFloat(secondValue)
            break;
        case "-":
            result = parseFloat(valeurActuelle) - parseFloat(secondValue)
            break;    
        case "x":
            result = parseFloat(valeurActuelle) * parseFloat(secondValue)
            break;
        case "/":
            result = parseFloat(valeurActuelle) / parseFloat(secondValue)
            break;
        default:
            return;
    }
    ecran.textContent = result
    opérateur = ""
    enAttente = true

}

function clear() { // réinitialiser 
    ecran.textContent = "0"
    opérateur = ""
    opérande1 = ""
    valeurActuelle = ""
}

function deleteLast() { // supprimer le dernier élément 
    ecran.textContent = ecran.textContent.slice(0, -1) || "0"
}

function addDecimal() { // ajouter un point
    if (!ecran.textContent.includes(".")) {
        ecran.textContent += "."
    }
}

function toggleSign() { // changer en plus ou moins
    ecran.textContent = ecran.textContent.startsWith("-")
    ? ecran.textContent.slice(1)
    : "-" + ecran.textContent
}

