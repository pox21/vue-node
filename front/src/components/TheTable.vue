<script>
export default {
  props: {
    items: Array,
  },
};
</script>

<template>
  <div class="table">
    <h2 class="table__title">Title</h2>
    <ul class="table__list list-reset">
      <li class="table__item table__item--hd">
        <span class="cell cell--hd">Название</span>
        <span class="cell cell--hd">Количество</span>
        <span class="cell cell--hd">Расстояние</span>
        <span class="cell cell--hd">Дата</span>
      </li>
      <li class="table__item" v-for="(item, i) in items" :key="item.id">
        <span class="cell">{{ [i + 1, item.name].join(". ") }}</span>
        <span class="cell">{{ item.amount }}</span>
        <span class="cell">{{ item.distance }}</span>
        <span class="cell">{{ new Date(item.date).toLocaleString() }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.table {
  &__title {
    text-align: center;
  }

  &__list {
    border: 1px solid var(--color-border);
  }

  &__item {
    display: grid;
    grid-template-columns: repeat(4, minmax(150px, 300px));
    justify-content: space-between;

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-border);
    }

    &--hd {
      border-bottom: 1px solid var(--color-border);
      text-align: center;
    }
  }
}

.cell {
  padding: 5px 10px;
  font-size: 16px;
  &:not(:last-child) {
    border-right: 1px solid #5c5a5a;
  }

  &--hd {
    padding: 10px;
    font-weight: 700;
    font-size: 18px;
  }
}
</style>