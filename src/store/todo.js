import { getDefaultList, STATUS } from "../composables/constants";
import { getNewId } from "../composables/utils";

export const todoStore = {
  namespaced: true,
  state: () => ({
    list: [],
    isLoading: false,
    _start: 0,
    _limit: 3,
    _page: 1,
  }),
  mutations: {
    setTodo(state, newList) {
      state.list = newList;
    },
    addTodoItem(state, item) {
      state.list = [...state.list, item];
    },
    incrementPage(state) {
      state._page++;
      state._start = (state._page - 1) * state._limit;
    },
  },
  actions: {
    async loadInitTodo({ commit, state }) {
      state.isLoading = true;
      commit("setTodo", getDefaultList());
      state.isLoading = false;
    },
    async loadMoreItems({ commit, state }) {
      state.isLoading = true;
      commit("incrementPage");
      const fetchedList = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_start=${state._start}&_limit=${state._limit}`
      ).then((response) => response.json());
      const itemList = fetchedList.map((item, index) => ({
        id: getNewId(state.list) + index,
        label: item.title,
        status: item.completed ? STATUS.DONE : STATUS.NEW,
        created_at: new Date().toISOString(),
      }));
      for (const item of itemList) {
        commit("addTodoItem", item);
      }
      state.isLoading = false;
    },
    async addTodoItem({ commit, state }, item) {
      commit("addTodoItem", item);
    },
    async setTodo({ commit, state }, newList) {
      commit("setTodo", newList);
    },
  },
  getters: {},
};
