<template>
  <div class="row gx-4">
    <div class="col-12">
      <div class="card mb-4">
        <div class="card-header">
          <h3 class="m-0"><span class="text-primary">Список доверенностей</span> по магазину {{CURRENT_OBJECT.Title}}</h3>
        </div>
      </div>
    </div>
    <div
      v-for="(a, index) in ATTORNEY"
      :key="index"
      :class="[index != 0 ? 'col-xl-3 col-lg-4 col-md-6 col-12' : 'col-12']"
      :style="index === 0 ? 'margin-top: -60px' : ''"
    >
      <div class="card icon-card mb-4" :style="index === 0 ? 'box-shadow: none' : ''">
        <a :href=a.pdfUrl target="_blank"><i class="icon-on-side ph-download-simple"></i></a>
        <div class="gift-card-text">
          <a :href=a.pdfUrl target="_blank">{{a.Title}}</a> или <a :href=a.imageUrl target="_blank" class="text-primary">скачать картинку</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Attorney',
  computed: {
    ...mapGetters([
      'CURRENT_OBJECT',
      'ATTORNEY',
      'SIDEBAR'
    ])
  },
  methods: {
    ...mapActions([
      'GET_ATTORNEY',
      'CLEAR_ATTORNEY',
      'CLOSE_SIDEBAR'
    ])
  },
  actions: {
  },
  mounted () {
    this.CLEAR_ATTORNEY()
    if (this.CURRENT_OBJECT.Deal_id === 0) {
      this.$router.push('/')
    } else {
      this.GET_ATTORNEY(this.CURRENT_OBJECT.Deal_id)
    }
    this.CLOSE_SIDEBAR()
  }
}
</script>
