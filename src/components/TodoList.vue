<template>
  <div :class="{ disabled: isLoading }">
    <div class="title">
      Список задач
      <div class="headerActions">
        <button class="more" @click="loadMoreItems">More</button>
      </div>
    </div>
    <!-- <List v-model="items"> </List> -->
    <List :model-value="list" @update:model-value="onUpdate"> </List>
  </div>
</template>

<script>
import List from "./List.vue";

import { mapActions, mapState } from "vuex";
export default {
  name: "TodoList",
  components: { List },
  data: () => {
    return {};
  },
  computed: {
    ...mapState({
      list: (state) => state.todoStore.list,
      isLoading: (state) => state.todoStore.isLoading,
    }),
  },
  methods: {
    ...mapActions("todoStore", ["loadMoreItems", "loadInitTodo", "setTodo"]),
    onUpdate(list) {
      this.setTodo(list);
    },
  },
  mounted() {
    this.loadInitTodo();
  },
};
</script>

<style scoped>
.title {
  width: 100%;
  font-size: 20px;
  text-align: center;
  border-bottom: 2px solid #eee;
}
.headerActions {
  float: right;
}
.more {
  font-size: 12px;
  width: 100%;
  padding: 5;
  border: none;
  background-color: transparent;
  color: #769dcf;
  text-decoration: underline;
  cursor: pointer;
}
.disabled {
  opacity: 0.3;
  cursor: default;
  pointer-events: none;
}
</style>
