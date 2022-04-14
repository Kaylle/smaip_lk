<template>
  <div class="row gx-4">
    <div class="col-12">
      <div class="card mb-4">
        <div class="card-header">
          <h3 class="m-0">Лист фиксации отсутствия отгрузок</h3>
        </div>
        <a target="_blank" :href="'https://smaip.ru/lk/b24/ticket/no_shiping.php?id='+COMPANY[0].Deal_id" class="d-flex align-items-center">
          <i class="icon-on-side ph-download-simple"></i>
          <div class="gift-card-text">
            Скачать "Лист фиксации отсутствия отгрузок" по магазину - {{COMPANY[0].Title}}
          </div>
        </a>
      </div>
    </div>
  </div>
  <div class="row gx-4">
    <div v-for="(c, index) in COMPANY" v-bind:key="index">
      <div v-if="index != 0" class="col-xl-3 col-lg-4 col-md-6 col-12">
        <a target="_blank" :href="'https://smaip.ru/lk/b24/ticket/no_shiping.php?id='+c.Deal_id" class="card icon-card mb-4">
            <i class="icon-on-side ph-download-simple"></i>
            <div class="gift-card-text">
              Скачать "Лист фиксации отсутствия отгрузок" по магазину - {{c.Title}}
            </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Lf',
  computed: {
    ...mapGetters([
      'COMPANY',
      'SIDEBAR'
    ])
  },
  methods: {
    ...mapActions([
      'CLOSE_SIDEBAR'
    ])
  },
  mounted () {
    this.CLOSE_SIDEBAR()
  }
}
</script>
