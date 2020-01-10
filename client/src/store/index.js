import reducers from "./reducers";
import { createStore } from "redux";
class StateLoader {
  loadState() {
    try {
      let serializedState = localStorage.getItem("pg-control");

      if (serializedState === null) {
        return this.initializeState();
      }

      return JSON.parse(serializedState);
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state) {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem("pg-control", serializedState);
    } catch (err) {}
  }

  initializeState() {
    return {
      //state object
    };
  }
}

const stateLoader = new StateLoader();

const store = createStore(
  reducers,
  stateLoader.loadState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

const mapStateToProps = state => {
  return state;
};
export { store, mapStateToProps };
