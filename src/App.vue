<template>
  <div><TodoList class="todolist" /></div>
</template>

<script>
import TodoList from "./components/TodoList.vue";
export default {
  components: { TodoList },
};
</script>

<style scoped>
.todolist {
  width: 500px;
}
</style>
