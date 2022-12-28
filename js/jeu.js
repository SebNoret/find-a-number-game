/*
 *	fichier contenant l'objet partie à instancier
 *
 *
 */

// function Partie() {
//propriétés de l'objet partie
// this.nbEssais = 0;
// this.resultat = false;
// this.solution = 0;
// this.message = "";
//setter de la propriété nbrEssais
// this.ajouterEssais = function (essais) {
//   this.nbEssais = essais;
// };
//méthode utilisée pour générer le nombre à découvir de manière aléatoire
// this.genereNombre = function () {
//   this.solution = Math.floor(Math.random() * 100) + 1;
// };
//méthode utilisée pour tester lma raponse du joueur
// this.testerProposition = function (proposition) {
//   var reponse = 3;
//   if (
//     isNaN(proposition) ||
//     proposition < 0 ||
//     proposition > 100 ||
//     proposition === ""
//   ) {
//     reponse = 2;
//   } else if (proposition > this.solution) {
//     reponse = 1;
//     this.nbEssais -= 1;
//   } else if (proposition < this.solution) {
//     reponse = -1;
//     this.nbEssais -= 1;
//   } else {
//     this.resultat = true;
//     reponse = 0;
//   }
//   return reponse;
// };
//methode determenant le message à envoyer en fonction de la reponse du joueur
// this.jouer = function (reponse) {
//   if (this.nbEssais > 0) {
//     var passe = this.testerProposition(reponse);
//     if (passe === 2) {
//       this.message = "Il faut entrer un nombre entre 1 et 100";
//     } else if (passe === -1) {
//       this.message =
//         'Le nombre que vous avez proposez est <span style=" color: #1d184d; font-style: italic;">&nbsp;trop petit&nbsp;!</span>';
//     } else if (passe === 1) {
//       this.message =
//         'Le nombre que vous avez proposez est <span style=" color: #1d184d; font-style: italic;">&nbsp;trop grand&nbsp;!</span>';
//     } else if (passe === 0) {
//       this.message =
//         "Bravo vous avez trouvé la bonne réponse: " +
//         '<span style=" color: #1d184d; font-style: italic;">&nbsp;' +
//         this.solution +
//         "</span>" +
//         "!";
//     }
//   } else {
//     this.message =
//       "Vous avez perdu. Le nombre à trouver était : " +
//       '<span style=" color: #1d184d; font-style: italic;">&nbsp;' +
//       this.solution +
//       " !</span>";
//     this.nbEssais = -1;
//   }
// };
// }

class Partie {
  constructor() {
    this.nbEssais = 0;

    this.resultat = false;

    this.solution = 0;

    this.message = "";
  }
  ajouterEssais(essais) {
    this.nbEssais = essais;
  }
  genereNombre() {
    this.solution = Math.floor(Math.random() * 100) + 1;
  }
  testerProposition(proposition) {
    let reponse = 3;

    if (
      isNaN(proposition) ||
      proposition < 0 ||
      proposition > 100 ||
      proposition === ""
    ) {
      reponse = 2;
    } else if (proposition > this.solution) {
      reponse = 1;
      this.nbEssais -= 1;
    } else if (proposition < this.solution) {
      reponse = -1;
      this.nbEssais -= 1;
    } else {
      this.resultat = true;
      reponse = 0;
    }
    return reponse;
  }
  jouer(reponse) {
    if (this.nbEssais > 0) {
      var passe = this.testerProposition(reponse);

      if (passe === 2) {
        this.message = "Il faut entrer un nombre entre 1 et 100";
      } else if (passe === -1) {
        this.message =
          'Le nombre que vous avez proposez est <span style=" color: #1d184d; font-style: italic;">&nbsp;trop petit&nbsp;!</span>';
      } else if (passe === 1) {
        this.message =
          'Le nombre que vous avez proposez est <span style=" color: #1d184d; font-style: italic;">&nbsp;trop grand&nbsp;!</span>';
      } else if (passe === 0) {
        this.message =
          "Bravo vous avez trouvé la bonne réponse: " +
          '<span style=" color: #1d184d; font-style: italic;">&nbsp;' +
          this.solution +
          "</span>" +
          "!";
      }
    } else {
      this.message =
        "Vous avez perdu. Le nombre à trouver était : " +
        '<span style=" color: #1d184d; font-style: italic;">&nbsp;' +
        this.solution +
        " !</span>";

      this.nbEssais = -1;
    }
  }
}
export default Partie;
