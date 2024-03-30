import { createStore } from "vuex";
import { todoStore } from "./todo";

// Create a new store instance.
const store = createStore({
  modules: {
    todoStore,
  },
});

export default store;
