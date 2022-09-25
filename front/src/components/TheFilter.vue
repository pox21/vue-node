<script>
import BaseSelect from "./BaseSelect.vue";
import BaseModalBg from "./UI/BaseModalBg.vue";
export default {
  components: { BaseSelect, BaseModalBg },
  props: {
    typeFilterProp: String,
    conditionFilterProp: String,
    valueFilterProp: String,
  },
  data() {
    return {
      typeFilter: [
        {
          id: 1,
          label: "Название",
          type: "name",
        },
        {
          id: 2,
          label: "Количество",
          type: "amount",
        },
        {
          id: 3,
          label: "Расстояние",
          type: "distance",
        },
      ],
      checkedTypeFilter: { id: 0, label: "фильтровать по" },
      isOpenFilterType: false,
      checkedConditionFilter: { id: 0, label: "условие" },
      isOpenFilterCondition: false,

      valueFilter: null,
    };
  },
  methods: {
    resetFilter() {
      this.checkedTypeFilter = { id: 0, label: "фильтровать по" };
      this.checkedConditionFilter = { id: 0, label: "условие" };
      this.valueFilter = null;
      this.$emit("update:typeFilterProp", "");
      this.$emit("update:conditionFilterProp", "");
      this.$emit("update:valueFilterProp", "");
    },
    closeModals() {
      this.isOpenFilterType = false;
      this.isOpenFilterCondition = false;
    },
    openFilterType() {
      this.isOpenFilterType = true;
    },
    openFilterCondition() {
      this.isOpenFilterCondition = true;
    },
    checkedFilterTypeSelect($event) {
      this.checkedTypeFilter = $event;
      this.isOpenFilterType = false;
    },
    checkedFilterConditionSelect($event) {
      this.checkedConditionFilter = $event;
      this.isOpenFilterCondition = false;
    },

    filterSubmit() {
      if (!this.valueFilter) return;

      this.$emit("update:typeFilterProp", this.checkedTypeFilter.type);
      this.$emit(
        "update:conditionFilterProp",
        this.checkedConditionFilter.type
      );
      this.$emit("update:valueFilterProp", this.valueFilter);
    },
  },
  computed: {
    conditionFilter() {
      let items = [{ id: 0, label: "условие" }];
      if (this.checkedTypeFilter.id === 1) {
        items = [
          {
            id: 1,
            label: "содержит",
            type: "contains",
          },
        ];
      }
      if (this.checkedTypeFilter.id === 2 || this.checkedTypeFilter.id === 3) {
        items = [
          {
            id: 1,
            label: "равно",
            type: "equals",
          },
          {
            id: 2,
            label: "больше",
            type: "more",
          },
          {
            id: 3,
            label: "меньше",
            type: "less",
          },
        ];
      }

      return items;
    },
  },
  watch: {
    checkedTypeFilter() {
      this.checkedConditionFilter = { id: 0, label: "условие" };
    },
  },
};
</script>

<template>
  <form class="filter" @submit.prevent="filterSubmit">
    <BaseSelect
      :selectItems="typeFilter"
      :checked="checkedTypeFilter"
      :isOpen="isOpenFilterType"
      @select-active="openFilterType"
      @checked-item="checkedFilterTypeSelect"
    />
    <BaseSelect
      :selectItems="conditionFilter"
      :checked="checkedConditionFilter"
      :isOpen="isOpenFilterCondition"
      @select-active="openFilterCondition"
      @checked-item="checkedFilterConditionSelect"
    />
    <input
      class="filter__input"
      v-if="checkedConditionFilter.id !== 0"
      type="text"
      v-model="valueFilter"
    />
    <Teleport to="body">
      <BaseModalBg
        :isOpen="isOpenFilterType || isOpenFilterCondition"
        @click="closeModals"
      />
    </Teleport>
    <button
      v-if="checkedConditionFilter.id !== 0"
      class="filter__btn"
      type="submit"
    >
      Применить
    </button>
    <button
      v-if="checkedConditionFilter.id !== 0"
      class="filter__btn"
      type="button"
      @click="resetFilter"
    >
      Сбросить фильтр
    </button>
  </form>
</template>
<style lang="scss" scoped>
.filter {
  display: flex;
  align-items: flex-start;
  gap: 50px;

  &__btn {
    cursor: pointer;
  }

  &__btn,
  &__input {
    padding: 10px 15px;
    border: 1px solid #7bb899;
    color: inherit;
    background-color: var(--color-background);
    line-height: 1.5;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #fff;
    }
  }
}
</style>