import Partie from "./jeu";

/*
 *	interactions js est le fichier où sont regrouper les diverses fonctions et gestionnaires d'évênements utilisés pour interagir avec l'utilisateur via l'interface HTML
 *
 *
 *
 */

//déclaration des variable faisant référence aux éléments html
const Interactions = () => {
  // var nbrEssais = document.getElementsByName("choix");
  let essaisBtn = document.getElementById("nb_essais");
  let choixNbEssais = document.getElementById("choix_nbr_essais");
  let nbrChoisi = document.getElementById("nbr_choisi");
  let reponse = document.getElementById("reponse");
  let valider = document.getElementById("valider_btn");
  let texte = document.getElementById("aide");
  let rejouer = document.getElementById("rejouer");
  let annonceEssais = document.getElementById("message_essais");

  //fonction récupérant le nombre d'essais choisi par le joueur

  // function verif() {
  //   let nb = 0;

  //   const form = document.getElementById("formulaire");

  //   for (let i = 0; i < form.choix.length; i++) {
  //     if (form.choix[i].checked == true) {
  //       nb = form.choix[i].value;
  //     }
  //   }

  //   return nb;
  // }

  //apparition du bloc où l'on entre un nombre à tester et instanciation de l'objet partie

  essaisBtn.addEventListener("click", function (e) {
    e.preventDefault();
    choixNbEssais.style.display = "none";

    nbrChoisi.style.display = "block";

    reponse.style.display = "block";

    // let tentative = verif();

    // let partie = new Partie();

    // partie.ajouterEssais(tentative);

    // partie.genereNombre();

    texte.innerHTML =
      "Vous disposez de " + partie.nbEssais + " essais pour y parvenir !";

    //gestion de la validation du nombre à tester

    valider.addEventListener("click", function (e) {
      e.preventDefault();

      let prop = reponse.value;

      partie.jouer(prop);

      texte.innerHTML = partie.message;

      let annonce = "";

      if (partie.nbEssais == 1) {
        annonce = "Il vous reste un seul essai !";
      } else if (partie.nbEssais == 0) {
        annonce = "Vous n'avez plus d'essais disponibles !";
      } else {
        annonce =
          "Il vous reste " +
          '<span style=" color: #1d184d; font-style: italic;">&nbsp;' +
          partie.nbEssais +
          "&nbsp;</span>" +
          " essais.";
      }

      annonceEssais.innerHTML = annonce;

      if (partie.nbEssais == 0) {
        valider.setAttribute("value", "Fin de partie");
      }

      //apparition du bouton rejouer

      if (partie.resultat === true || partie.nbEssais == -1) {
        rejouer.style.display = "block";
        annonceEssais.innerHTML = "";

        rejouer.addEventListener("click", function (e) {
          choixNbEssais.style.display = "block";
          nbrChoisi.style.display = "none";
          reponse.style.display = "none";
          texte.innerHTML = "A vous de jouer!";
          partie = null;
          rejouer.style.display = "none";
          valider.setAttribute("value", "Essayer");
          reponse.value = "";
        });
      }
    });
  });

  //event listeners gérant le changement de couleurs des boutons au clic

  // essaisBtn.addEventListener("mousedown", function (e) {
  //   let btn = e.target;
  //   btn.classList.add("bouton-activer");
  // });

  // essaisBtn.addEventListener("mouseleave", function (e) {
  //   let btn = e.target;
  //   btn.classList.remove("bouton-activer");
  // });

  // valider.addEventListener("mousedown", function (e) {
  //   let btn = e.target;
  //   btn.classList.add("bouton-activer");
  // });

  // valider.addEventListener("mouseup", function (e) {
  //   let btn = e.target;
  //   btn.classList.remove("bouton-activer");
  // });

  // rejouer.addEventListener("mousedown", function (e) {
  //   let btn = e.target;
  //   btn.classList.add("bouton-activer");
  // });

  // rejouer.addEventListener("mouseup", function (e) {
  //   let btn = e.target;
  //   btn.classList.remove("bouton-activer");
  // });
};

export default Interactions;
