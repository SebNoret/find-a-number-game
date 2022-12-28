import View from "./View";

class Model {
  constructor(initialState) {
    this.listeners = [];
    this.state = { ...initialState };
  }

  refresh(newState) {
    this.state = { ...newState };
  }
  setState(obj) {
    this.state = { ...this.state, ...obj };
  }
  getState() {
    return this.state;
  }
  getValue(key) {
    return this.state[key];
  }
}
class App {
  constructor() {
    this.root = document.getElementById("root");

    this.model = new Model(this.init());
    this.view = new View(this.root, this.model);

    this.resultat = false;

    this.selectedNumberOfAttemps = this.selectedNumberOfAttemps.bind(this);

    this.view.handleRadioChange(this.selectedNumberOfAttemps);

    this.view.handleNumberOfChoiceSubmit();

    this.testUserResponse = this.testUserResponse.bind(this);

    this.view.handleResponseSubmit(this.testUserResponse);

    this.init = this.init.bind(this);
    this.view.handleNewGame(this.init);
    this.selectedNumberOfAttemps();
  }
  init() {
    const initialState = {
      message: "A vous de jouer!",
      remainingTries: 0,
      solution: this.generateSolutionNumber(),
      gameEnded: false,
    };
    if (this.model) {
      this.model.refresh(initialState);
    } else {
      return {
        message: "A vous de jouer!",
        remainingTries: 0,
        solution: this.generateSolutionNumber(),
        gameEnded: false,
      };
    }
  }
  generateSolutionNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }
  selectedNumberOfAttemps() {
    const remainingTries = Array.from(this.view.form.choix).filter(
      (radio) => radio.checked
    )[0].value;
    this.model.setState({
      ...this.model.getState(),
      message: `vous disposez de ${remainingTries} pour trouver le nombre caché`,
      remainingTries: remainingTries,
    });
  }

  testUserResponse(userResponse) {
    console.log("state", this.model.getState());
    if (
      isNaN(userResponse) ||
      userResponse < 0 ||
      userResponse > 100 ||
      userResponse === ""
    ) {
      this.model.setState({
        ...this.model.getState,
        message: "Il faut proposer un nombre valide pour jouer.",
      });
      return;
    }
    if (this.model.getState().remainingTries === 1) {
      this.model.setState({
        ...this.model.getState,
        remainingTries: this.model.getValue("remainingTries") - 1,
        message: "Vous avez épuisé tout vos essais",
      });
      this.checkResponse(userResponse);
      return;
    }

    if (userResponse > this.model.getState().solution) {
      this.model.setState({
        ...this.model.getState(),
        remainingTries: this.model.getValue("remainingTries") - 1,
        message: `Le nombre que vous avez proposé est supérieur au nombre recherché
            Il vous reste ${this.model.getValue("remainingTries") - 1} essais`,
      });
      return;
    } else if (userResponse < this.model.getState().solution) {
      this.model.setState({
        ...this.model.getState(),
        remainingTries: this.model.getValue("remainingTries") - 1,
        message:
          "le nombre que vous avez proposé est inférieur au nombre recherché",
      });
      return;
    }
    this.checkResponse(userResponse);
  }

  checkResponse(userResponse) {
    if (Number(userResponse) === this.model.getState().solution) {
      this.model.setState({
        ...this.model.getState,
        message: `Bravo vous avez trouvez le nombre caché
        le nombre a trouver était ${this.model.getValue("solution")}`,
        gameEnded: true,
      });
    } else {
      this.model.setState({
        ...this.model.getState,
        message: `Dommage vous avez échoué
        le nombre a trouver était ${this.model.getValue("solution")} `,
        gameEnded: true,
      });
    }
    return;
  }
}

export default App;
