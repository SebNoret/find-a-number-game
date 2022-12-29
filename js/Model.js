class Model {
  constructor(initialState) {
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

export default Model;
