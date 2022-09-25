<script>
export default {
  props: ["page", "count", "perPage"],
  methods: {
    pagination(page) {
      this.$emit("update:page", page);
    },
    paginateNext(page) {
      page < this.pages ? page++ : page;
      this.$emit("update:page", page);
    },
    paginatePrev(page) {
      page !== 1 ? page-- : page;
      this.$emit("update:page", page);
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
};
</script>

<template>
  <ul class="pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        href="#"
        :class="{ 'pagination__link--disabled': page === 1 }"
        aria-label="Предыдущая страница"
        @click.prevent="paginatePrev(page)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNum in pages" :key="pageNum">
      <a
        href="#"
        class="pagination__link"
        :class="{
          'pagination__link--current': pageNum === page,
        }"
        @click.prevent="pagination(pageNum)"
      >
        {{ pageNum }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === pages }"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="paginateNext(page)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.pagination {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 18px;
    border: 1px solid var(--color-border);
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

    &--disabled {
      opacity: 0.5;
      cursor: no-drop;
    }

    &:hover {
      color: #000;
      background-color: #fff;
    }

    &--current {
      color: #000;
      background-color: #fff;
    }
  }
}
</style>