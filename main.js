const ecran = document.getElementById("écran")
let opérande1 = ""
let opérateur = "" // opérateur en attente * + - %
let valeurActuelle = ""
let enAttente = false //?

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

function clear() {
    ecran.textContent = "0"
    opérateur = ""
    opérande1 = ""
    valeurActuelle = ""
}

function deleteLast() {
    ecran.textContent = ecran.textContent.slice(0, -1) || "0"
}

function addDecimal() {
    if (!ecran.textContent.includes(".")) {
        ecran.textContent += "."
    }
}

function toggleSign() {
    ecran.textContent = ecran.textContent.startsWith("-")
    ? ecran.textContent.slice(1)
    : "-" + ecran.textContent
}

// function afficher(valeur) {
//     écran.textContent = valeur
// }

// document.querySelector(".boutons").addEventListener("click", function (e) {
//    let bouton = e.target //récupère l'élément cliqué
//    let valeurChiffre = bouton.dataset.value // récupère la valeur du chiffre cliqué
//    let action = bouton.dataset.action // récupère les actions comme "op" et "clear"
   
// if (!bouton.dataset.value && !bouton.dataset.action) return

//    if (valeurChiffre) {
//         if (valeurActuelle === "0" || enAttente) {
//             valeurActuelle = valeurChiffre // Remplace l'affichage si c'est 0 ou après un opérateur
//             enAttente = false
//         }
//         else {
//             valeurActuelle += valeurChiffre
//         }
//     }
//     else if (action === "clear") {
//         valeurActuelle = "0"
//         opérande1 = ""
//         opérateur = ""
//         enAttente = false
//     }
//     else if (action === "delete") {
//         valeurActuelle = valeurActuelle.length > 1 ? valeurActuelle.slice(0, -1) : "0" 
//     }
//     else if (action === "op") {
//         if (!enAttente && valeurActuelle !== "") { // évite de remplacer une valeur déjà saisie
//         opérande1 = valeurActuelle
//         opérateur = valeurChiffre
//         enAttente = true
//         }
//     }
//     else if (action === "calculer") { //si on clique sur ""="" 
//         if (opérande1 && opérateur) {
//             valeurActuelle = calculer(opérande1, valeurActuelle, opérateur)
//             opérande1 = ""
//             opérateur = ""
//             enAttente = true
//         }
//     }
//     else if (action === "plusMoins") {
//         valeurActuelle = valeurActuelle.startsWith("-") ? valeurActuelle.slice(1) : "-" + valeurActuelle
//     }
//     else if (action === "point" && !valeurActuelle.includes(".")) { // si on clique sur .
//         valeurActuelle += "."
//     }

//     afficher(valeurActuelle) // mise à jour de l'affiche 
// })

// // Effectue le calcul selon l'opérateur choisi 
// function calculer(nbr1, nbr2, op) {
//     nbr1 = parseFloat(nbr1) // converti en nombre
//     nbr2 = parseFloat(nbr2)

//     switch (op) {
//         case "+": 
//             return (nbr1 + nbr2).toString()
        
//         case "-": 
//             return (nbr1 - nbr2).toString()
            
//         case "/": 
//             if (nbr2 !== 0 ) {
//                 return (nbr1 / nbr2).toString()
//             }
//             else {
//                 return "Erreur"
//             }
            
//         case "*": 
//             return (nbr1 * nbr2).toString()

//         default: 
//             return "0"
//     }
// }
 