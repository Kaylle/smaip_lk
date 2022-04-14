<template>
  <div class="row gx-4">
    <div class="col-xl-3 col-lg-4 col-md-6 col-12">
      <div class="card mb-4">
        <div class="card-header">
          <h3 class="m-0">Согласование снижение стоимости по магазину</h3>
          <div class="btn btn-secondary px-3 py-2"><i class="ph-info  m-0"></i></div>
        </div>
        <p>Скидка</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Discount',
  computed: {
    ...mapGetters([
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
