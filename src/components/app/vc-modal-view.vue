<template>
  <div class="modal-backdrop"  @click.self="close">
    <div class="card card-modal mb-4">
      <div class="card-header">
        <slot name="header">
          <h3 class="m-0">{{ Title }} за {{ dateForHeader }}</h3>
          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            <i class="ph-x"></i>
          </button>
        </slot>
      </div>
      <section style="overflow-x:auto;">
        <slot name="body">
          <div v-for="f in this.photos" v-bind:key="f.index">
            <img :src="f" class="modal-image mb-4">
         </div>
        </slot>
       </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    Title: {
      type: String,
      default: 'Modal'
    },
    photos: {
      type: Array
    },
    chDate: {
      type: String,
      default: ''
    }
  },
  name: 'modalView',
  data: () => ({
    Photos: null,
    choiseDate: null,
    dateForHeader: null
  }),
  computed: {
    ...mapGetters([
      'CURRENT_OBJECT'
    ])
  },
  methods: {
    close () {
      this.$emit('closeView')
    }
  },
  updated () {
    this.Photos = this.photos
    this.choiseDate = this.chDate
    this.dateForHeader = this.chDate
  }
}
</script>
