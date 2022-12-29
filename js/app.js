import Model from "./Model";
import View from "./View";

class App {
  constructor() {
    this.root = document.getElementById("root");

    this.model = new Model(this.init());
    this.view = new View(this.root, this.model);

    this.selectedNumberOfAttemps = this.selectedNumberOfAttemps.bind(this);
    this.selectedNumberOfAttemps = this.selectedNumberOfAttemps.bind(this);
    this.testUserResponse = this.testUserResponse.bind(this);
    this.init = this.init.bind(this);

    this.view.handleRadioChange(this.selectedNumberOfAttemps);
    this.view.handleNumberOfChoiceSubmit(this.selectedNumberOfAttemps);
    this.view.handleResponseSubmit(this.testUserResponse);
    this.view.handleNewGame(this.init);
  }
  init() {
    const initialState = {
      message: "A vous de jouer!",
      remainingAttempts: 0,
      solution: this.generateSolutionNumber(),
      gameEnded: false,
    };
    if (this.model) {
      this.model.refresh(initialState);
    } else {
      return {
        message: "A vous de jouer!",
        remainingAttempts: 0,
        solution: this.generateSolutionNumber(),
        gameEnded: false,
      };
    }
  }
  generateSolutionNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }
  selectedNumberOfAttemps() {
    const remainingAttempts = Array.from(this.view.form.choix).filter(
      (radio) => radio.checked
    )[0].value;
    this.model.setState({
      ...this.model.getState(),
      message: `vous disposez de ${remainingAttempts} pour trouver le nombre caché`,
      remainingAttempts: remainingAttempts,
    });
  }

  testUserResponse(userResponse) {
    // console.log("state", this.model.getState());
    // test if user response format is valid
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
    // the user has arrived to is last attempt
    if (this.model.getState().remainingAttempts === 1) {
      this.model.setState({
        ...this.model.getState,
        remainingAttempts: this.model.getValue("remainingAttempts") - 1,
        message: "Vous avez épuisé tout vos essais",
      });
      this.compareUserResponseAndSolution(userResponse);
      return;
    }
    // test if the user attempt is lower or greater than the solution
    if (userResponse > this.model.getState().solution) {
      this.model.setState({
        ...this.model.getState(),
        remainingAttempts: this.model.getValue("remainingAttempts") - 1,
        message: `Le nombre que vous avez proposé est supérieur au nombre recherché
            Il vous reste ${
              this.model.getValue("remainingAttempts") - 1
            } essais`,
      });
      return;
    } else if (userResponse < this.model.getState().solution) {
      this.model.setState({
        ...this.model.getState(),
        remainingAttempts: this.model.getValue("remainingAttempts") - 1,
        message: `le nombre que vous avez proposé est inférieur au nombre recherché
            Il vous reste ${
              this.model.getValue("remainingAttempts") - 1
            } essais`,
      });
      return;
    }
    this.compareUserResponseAndSolution(userResponse);
  }

  compareUserResponseAndSolution(userResponse) {
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
