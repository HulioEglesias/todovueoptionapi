<template>
  <div class="list">
    <div class="listItem" v-for="item in modelValue" :key="item.id">
      <div class="title">{{ item.label }}</div>
      <div class="info">
        <div class="status">status: {{ item.status }}</div>
        <div class="date">
          {{ new Date(item.created_at).toLocaleString() }}
        </div>
      </div>
      <div class="actions">
        <EditOutlined @click="onEditItem(item)" />
        <DeleteOutlined @click="onRemove(item.id)" />
      </div>
    </div>
    <button class="createButton" @click="onCreate">Создать новую</button>
    <Modal v-model:open="isOpenModal" :title="modalTitle" @ok="onSave">
      <template v-if="isOpenModal && editingItem">
        <div>
          Название:
          <Input v-model:value="editingItem.label" />
        </div>
        <div>
          Статус:
          <Select v-model:value="editingItem.status">
            <SelectOption value="new"></SelectOption>
            <SelectOption value="done"></SelectOption>
            <SelectOption value="cancel"></SelectOption>
          </Select>
        </div>
        {{ editingItem.created_at }}
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { Modal, Input, Select, SelectOption } from "ant-design-vue";

import { STATUS } from "../composables/constants.js";

export default {
  name: "List",
  components: {
    EditOutlined,
    DeleteOutlined,
    Modal,
    Input,
    Select,
    SelectOption,
  },
  props: {
    modelValue: Array,
  },
  data: () => ({
    editingItem: null,
    items: [],
    isOpenModal: false,
    modalTitle: "",
  }),
  methods: {
    ...mapActions("todoStore", ["loadMoreItems", "loadInitTodo", "setTodo"]),
    onEditItem(item) {
      this.modalTitle = "Редактирование задачи";
      this.editingItem = { ...item };
      this.isOpenModal = true;
    },
    onSave() {
      const foundIndex = this.modelValue.findIndex(
        (item) => item.id === this.editingItem.id
      );

      let newItems = [];
      if (foundIndex === -1) newItems = [...this.modelValue, this.editingItem];
      else
        newItems = this.modelValue.map((item) => {
          if (item.id === this.editingItem.id) return this.editingItem;
          return item;
        });

      this.isOpenModal = false;
      this.editingItem = null;
      this.$emit("update:modelValue", newItems);
    },
    onRemove(id) {
      this.$emit(
        "update:modelValue",
        this.modelValue.filter((item) => item.id !== id)
      );
    },
    onCancel() {
      this.editingItem = null;
      this.isOpenModal = false;
    },
    onCreate() {
      this.modalTitle = "Создание задачи";
      this.isOpenModal = true;
      this.editingItem = {
        id: Math.max(...this.modelValue.map((item) => item.id)) + 1,
        label: "Новая задача",
        status: STATUS.NEW,
        created_at: new Date().toISOString(),
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
}
.listItem {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;

  &:hover {
    background-color: #00000010;
  }
}
.title {
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 1;
}
.date {
  font-size: 11px;
  color: grey;
}
.info {
  min-width: 105px;
  padding: 0 10px;
  flex-shrink: 2;
}
.actions {
  min-width: 40px;
  flex-shrink: 2;
}
.createButton {
  width: 100%;
  padding: 20px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  color: #2874d6;
  text-decoration: underline;

  &:hover {
    background-color: #2874d620;
    cursor: pointer;
  }
}
</style>
