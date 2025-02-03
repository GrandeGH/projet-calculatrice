let écran = document.getElementById("écran")
let opérande1 = ""
let opérateur = "" // opérateur en attente * + - %
let valeurActuelle = "0"
let enAttente = false //?

function afficher(valeur) {
    écran.textContent = valeur
}

document.querySelector(".boutons").addEventListener("click", function (e) {
   let bouton = e.target //récupère l'élément cliqué
   let valeurChiffre = bouton.dataset.value // récupère la valeur du chiffre cliqué
   let action = bouton.dataset.action // récupère les actions comme "op" et "clear"
   
   if (valeurChiffre) {
        if (valeurActuelle === "0" || enAttente) {
            valeurActuelle = valeurChiffre // Remplace l'affichage si c'est 0 ou après un opérateur
            enAttente = false
        }
        else {
                valeurActuelle += valeurChiffre
        }
    }
    else if (action === "clear") {
        valeurActuelle = "0"
        opérande1 = ""
        opérateur = ""
    }
    else if (action === "delete") {
        valeurActuelle = valeurActuelle.length > 1 ? valeurActuelle.slice(0, -1) : "0" 
    }
    else if (action === "op") {
        if (!enAttente) { // évite de remplacer une valeur déjà saisie
        opérande1 = valeurActuelle
        opérateur = bouton.dataset.value
        enAttente = true
        }
    }
    else if (action === "calculer") { //si on clique sur = 
        if (opérande1 && opérateur && !enAttente) {
            valeurActuelle = calculer(opérande1, valeurActuelle, opérateur)
            opérande1 = ""
            opérateur = ""
            enAttente = true
        }
    }
    else if (action === "plusMoins") {
        valeurActuelle = valeurActuelle.startsWith("-") ? valeurActuelle.slice(1) : "-" + valeurActuelle
    }
    else if (action === "point" && !valeurActuelle.includes(".")) { // si on clique sur .
        valeurActuelle += "."
    }

    afficher(valeurActuelle) // mise à jour de l'affiche 
})

// Effectue le calcul selon l'opérateur choisi 
function calculer(nbr1, nbr2, op) {
    nbr1 = parseFloat(nbr1) // converti en nombre
    nbr2 = parseFloat(nbr2)

    switch (op) {
        case "+": 
            return (nbr1 + nbr2).toString()
        
        case "-": 
            return (nbr1 - nbr2).toString()
            
        case "/": 
            if (nbr2 !== 0 )
                return (nbr1 / nbr2).toString()
            else {
                return "Erreur"
            }
            
        case "*": 
            return (nbr1 * nbr2).toString()

        default: 
            return "0"
    }
}
 