<script>
const url = "http://localhost:8080/api/list";

import TheTable from "./components/TheTable.vue";
import TheHeader from "./components/TheHeader.vue";
import ThePagination from "./components/ThePagination.vue";
import axios from "axios";
import BaseSelect from "./components/BaseSelect.vue";
import BaseModalBg from "./components/UI/BaseModalBg.vue";
import TheFilter from "./components/TheFilter.vue";

export default {
  components: {
    TheTable,
    TheHeader,
    ThePagination,
    BaseSelect,
    BaseModalBg,
    TheFilter,
  },
  data() {
    return {
      typeFilterProp: "",
      conditionFilterProp: "",
      valueFilterProp: "",
      filterNotFound: "",

      sortItemsLabel: [
        {
          id: 1,
          label: "Название",
        },
        {
          id: 2,
          label: "Количество",
        },
        {
          id: 3,
          label: "Расстояние",
        },
      ],
      checkedSort: { id: 0, label: "сортировать" },
      isOpenSelect: false,

      page: 1,
      itemsPerPage: 10,
      items: [],
      filteredItems: [],
    };
  },
  methods: {
    filterItems() {
      this.filterNotFound = "";
      this.filteredItems = this.items.filter((item) => {
        switch (this.conditionFilterProp) {
          case "equals":
            return item[this.typeFilterProp] === +this.valueFilterProp;
          case "contains":
            return (
              item[this.typeFilterProp]
                .toLowerCase()
                .includes(this.valueFilterProp) === true
            );
          case "more":
            return item[this.typeFilterProp] > +this.valueFilterProp;
          case "less":
            return item[this.typeFilterProp] < +this.valueFilterProp;
          default:
            return item;
        }
      });
      if (this.filteredItems.length === 0) {
        this.filterNotFound = "не найдено совпадений";
      }
    },
    checkedSelect($event) {
      this.checkedSort = $event;
      this.isOpenSelect = false;
    },
    openSelect() {
      this.isOpenSelect = true;
    },
    closeModals() {
      this.isOpenSelect = false;
    },

    sortAllItems(type) {
      this.items.sort((product1, product2) => {
        return product1[type] > product2[type] ? -1 : 1;
      });
    },

    sortItems(value) {
      if (value.id === 1) {
        this.sortAllItems("name");
        this.items.reverse();
      }
      if (value.id === 2) {
        this.sortAllItems("amount");
        this.items.reverse();
      }
      if (value.id === 3) {
        this.sortAllItems("distance");
        this.items.reverse();
      }
    },

    async getList() {
      const response = await axios.get(url);
      this.items = response.data;
    },
  },
  computed: {
    itemsData() {
      const offset = (this.page - 1) * this.itemsPerPage;
      if (this.filteredItems.length) {
        return this.filteredItems.slice(offset, offset + this.itemsPerPage);
      }
      return this.items.slice(offset, offset + this.itemsPerPage);
    },
    countItems() {
      return this.filteredItems.length
        ? this.filteredItems.length
        : this.items.length
        ? this.items.length
        : 0;
    },
  },
  watch: {
    checkedSort(newVal) {
      this.sortItems(newVal);
    },
    valueFilterProp() {
      this.filterItems();
    },
    typeFilterProp() {
      this.filterItems();
    },
    conditionFilterProp() {
      this.filterItems();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<template>
  <TheHeader />
  <main class="main">
    <div class="container">
      <div class="main__sort">
        <h2 class="main__title">Сортировка</h2>
        <BaseSelect
          :selectItems="sortItemsLabel"
          :checked="checkedSort"
          :isOpen="isOpenSelect"
          @select-active="openSelect"
          @checked-item="checkedSelect"
        />
        <Teleport to="body">
          <BaseModalBg :isOpen="isOpenSelect" @click="closeModals" />
        </Teleport>
      </div>
      <div class="main__filter">
        <h2 class="main__title">Фильтр</h2>
        <p v-show="filterNotFound" class="main__filter-err">
          {{ filterNotFound }}
        </p>
        <TheFilter
          v-model:typeFilterProp="typeFilterProp"
          v-model:conditionFilterProp="conditionFilterProp"
          v-model:valueFilterProp="valueFilterProp"
        />
      </div>
      <TheTable class="main__table" :items="itemsData" />
      <ThePagination
        v-model:page="page"
        :count="countItems"
        :perPage="itemsPerPage"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  padding-bottom: 100px;
  &__table {
    margin-bottom: 40px;
  }

  &__sort {
    margin-bottom: 20px;
  }

  &__title {
    margin-top: 0;
    margin-bottom: 15px;
  }

  &__filter {
    position: relative;
  }

  &__filter-err {
    margin: 0;
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    text-align: center;
    color: rgb(224, 78, 78);
  }
}
</style>