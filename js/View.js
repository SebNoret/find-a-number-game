class View {
  constructor(documentRoot, model) {
    this.documentRoot = documentRoot;
    this.model = model;

    this.render();

    this.numTriesBtn = document.getElementById("number-tries-btn");
    this.radioGroup = document.getElementById("radio-form-group");
    this.responseWrapper = document.getElementById("response-wrapper");
    this.reponse = document.getElementById("reponse");
    this.responseBtn = document.getElementById("response-btn");
    this.texte = document.getElementById("aide");
    this.rejouer = document.getElementById("rejouer");
    this.annonceEssais = document.getElementById("message_essais");
    this.form = document.getElementById("form");

    this.addEventListeners();
  }

  addEventListeners() {
    this.numTriesBtn.addEventListener("mousedown", function (event) {
      event.target.classList.add("bouton-activer");
    });

    this.numTriesBtn.addEventListener("mouseleave", function (event) {
      event.target.classList.remove("bouton-activer");
    });

    this.responseBtn.addEventListener("mousedown", function (event) {
      event.target.classList.add("bouton-activer");
    });

    this.responseBtn.addEventListener("mouseup", function (event) {
      event.target.classList.remove("bouton-activer");
    });

    this.rejouer.addEventListener("mousedown", function (event) {
      event.target.classList.add("bouton-activer");
    });

    this.rejouer.addEventListener("mouseup", function (event) {
      event.target.classList.remove("bouton-activer");
    });
  }

  handleRadioChange(callback) {
    Array.from(this.form.choix).map((radio) =>
      radio.addEventListener("change", () => callback())
    );
  }

  handleNumberOfChoiceSubmit(callback) {
    this.numTriesBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.radioGroup.style.display = "none";
      this.responseWrapper.style.display = "block";
      this.reponse.style.display = "block";
      callback();
      this.displayMessage();
    });
  }

  handleResponseSubmit(callback) {
    this.responseBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const response = this.reponse.value;
      callback(response);

      this.displayMessage();
    });
  }

  handleNewGame(callback) {
    this.rejouer.addEventListener("click", (event) => {
      callback();
      this.radioGroup.style.display = "block";
      this.responseWrapper.style.display = "none";
      this.rejouer.style.display = "none";
      this.responseBtn.style.display = "block";

      this.displayMessage();
    });
  }

  displayMessage() {
    if (this.model.state.gameEnded) {
      this.rejouer.style.display = "block";
      this.responseBtn.style.display = "none";
    }
    this.texte.innerText = this.model.state.message;
  }

  render() {
    const html = ` <h1>Devinez le nombre secret</h1>

      <div class="box-wrapper">
        <div class="content-wrapper">
          <h3 class="regle italic">
            La règle du jeu est simple: il faut découvrir le nombre caché avec
            le moins d'essais possibles.
          </h3>
        </div>

        <div class="content-wrapper" id="radio-form-group">
          <h3 class="italic">Choisissez votre nombre d'essais</h3>
          <form id="form">
            <div class="form-control">
              <input
                type="radio"
                name="choix"
                value="6"
                id="radio_1"
                class="radio-btn selected"
                checked
              /><label for="radio_1">6</label>
              <input
                type="radio"
                name="choix"
                value="7"
                id="radio_2"
                class="radio-btn selected"
              /><label for="radio_2">7</label>
              <input
                type="radio"
                name="choix"
                value="8"
                id="radio_3"
                class="radio-btn selected"
              /><label for="radio_3">8</label>
              <input
                type="radio"
                name="choix"
                value="9"
                id="radio_4"
                class="radio-btn selected"
              /><label for="radio_4">9</label>
              <input
                type="radio"
                name="choix"
                value="10"
                id="radio_5"
                class="radio-btn selected"
              /><label for="radio_5">10</label>
              <input
                type="radio"
                name="choix"
                value="11"
                id="radio_6"
                class="radio-btn selected"
              /><label for="radio_6">11</label>
              <input
                type="radio"
                name="choix"
                value="12"
                id="radio_7"
                class="radio-btn selected"
              /><label for="radio_7">12</label>
            </div>
            <div class="form-control">
              <input
                type="submit"
                name="nombre d'essais"
                class="btn"
                value="Valider"
                id="number-tries-btn"
              />
            </div>
          </form>
        </div>

        <div class="content-wrapper" id="response-wrapper">
          <h3 class="italic">
            Choisissez un nombre entre un nombre entre 1 et 100.
          </h3>
          <div class="reponse">
            <form>
              <div class="form-control">
                <input
                  class="input"
                  type="text"
                  name="nom"
                  size="50"
                  id="reponse"
                  required
                /><br />
              </div>
              <div class="form-control">
                <input
                  type="submit"
                  class="btn"
                  id="response-btn"
                  value="Essayer"
                />
              </div>
            </form>
          </div>
        </div>

        <div class="content-wrapper" id="conteneur_reponse">
          <h3 id="aide">${this.model.state.message}</h3>
          <h3 id="message_essais"></h3>
          <div class="response-control">
            <button class="btn" id="rejouer">Rejouer</button>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <p>
        credit Image by
        <a
          href="https://pixabay.com/users/arlekim-5029982/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2462922"
          >Arlekim</a
        >
        from
        <a
          href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2462922"
          >Pixabay</a
        >
      </p>
    </footer>`;

    this.documentRoot.innerHTML = html;
  }
}

export default View;
