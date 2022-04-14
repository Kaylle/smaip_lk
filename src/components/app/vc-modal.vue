<template>
    <div class="modal-backdrop" @click.self="close">
        <div class="card card-modal mb-4">
          <div class="card-header">
            <slot name="header">
              <h3 class="m-0">{{ Title }} - {{CURRENT_OBJECT.Title}}</h3>
              <button
                type="button"
                class="btn-close"
                @click="close"
              >
                <i class="ph-x"></i>
              </button>
            </slot>
          </div>
          <p>Изображение не должно превышать размер в 20МБ! Подробнее о загрузке фото в <span class="text-primary">инструкции</span>.</p>
          <section>
            <slot name="body">
              <label for="chois_Date">Дата документа</label>
              <input
                required
                type="date"
                name="chois_Date"
                id="chois_Date"
                ref="chois_Date"
                class="form-control mt-1 mb-4 card-input"
                v-model="choiseDate"
              >
              <label for="file" class="form-label">Документ</label>
              <input
                required
                type="file"
                accept="image/*,image/jpeg,image/jpg"
                id="file"
                ref="file"
                name="pictures"
                class="form-control mt-1 card-input"
                v-on:change="chois_File"
                :multiple=isInputMultiple
              >
            </slot>
            <slot name="footer">
              <button
                @click="sendData"
                type="button"
                class="btn btn-primary mt-4"
                style="margin-left: auto"
                id="btnSend"
                :disabled="isButtonDisabled"
              >
                <i class="ph-plus"></i>
                Добавить
              </button>
            </slot>
          </section>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  el: 'button',
  props: {
    Title: {
      type: String,
      default: 'Modal'
    },
    chDate: {
      type: String,
      default: ''
    },
    isInputMultiple: {
      type: Boolean,
      default: false
    }
  },
  name: 'modal',
  data: () => ({
    file: null,
    files: null,
    choiseDate: null,
    isButtonDisabled: true
  }),
  computed: {
    ...mapGetters([
      'CURRENT_OBJECT'
    ])
  },
  methods: {
    close () {
      this.file = null
      this.choiseDate = null
      this.$refs.chois_Date.value = null
      this.$refs.file.value = null
      this.isButtonDisabled = true
      this.$emit('close')
    },
    chois_File () {
      this.file = this.$refs.file.files[0]
      this.files = this.$refs.file.files
      if ((this.file !== null) && (this.choiseDate !== null)) {
        this.isButtonDisabled = false
      }
    },
    sendData () {
      this.$emit('choiseDate', this.choiseDate)
      this.$emit('choiseFile', this.file, this.files)
      this.$emit('choiseFiles', this.files)
      this.$emit('sendData')
      this.close()
    }
  },
  updated () {
    const test = new Date().format('YYYY-MM-DD')
    if (this.chDate === '') {
      this.choiseDate = test
    } else {
      this.choiseDate = this.chDate
    }
  }
}
</script>
