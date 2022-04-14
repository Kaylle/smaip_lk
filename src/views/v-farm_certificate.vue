<template>
  <div style="z-index: 11000" class="position-fixed top-0 end-0 p-4">
    <transition name="fade">
      <notify v-if="notify">
        <b>Справка о фермерском хозяйстве успешно загружена!</b>
      </notify>
    </transition>
    <transition name="fade">
      <notify v-if="notify2">
        <b>Добавляем справку о фермерском хозяйстве...</b>
      </notify>
    </transition>
  </div>
  <div class="row gx-4">
    <div class="col-12 col-md-6">
      <shop-list class="mb-4"/>
      <Form
        @choiseDate="funcChoisDate($event)"
        @choiseFile="funcFile($event)"
        @sendData="sendData"
        Title='Загрузить справку о наличии фермерского хозяйства'
      />
  </div>
    <div v-if="CERTIFICATE.length > 0" class="col-12 col-md-6">
      <div class="row row-waterfall">
        <div v-for="(c, index) in CERTIFICATE" :key="index" class="item">
          <div class="card" style="box-shadow: none">
            <p class="d-flex justify-content-between">
              Дата крепления документа: <span class="text-primary">{{ c.url[1][0] }}</span>
            </p>
            <div style="position: relative" data-bs-toggle="modal" :data-bs-target="'#image'+index">
              <img :src="c.url[0][0]" class="instruction-image" alt="two">
              <div class="image-overlay"></div>
            </div>
          </div>
          <div class="modal fade" :id="'image'+index" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog image-dialog">
              <button class="btn-close" data-bs-dismiss="modal">
                <i class="ph-x"></i>
              </button>
              <img :src="c.url[0][0]" alt="modal-img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Form from '@/components/app/vc-form'
import Notify from '@/components/app/vc-notify'
import ShopList from '@/components/app/vc-shop-list'

export default {
  name: 'Farm_certificate',
  data: () => ({
    choisDate: 0,
    file: '',
    varDate: '',
    notify: false,
    notify2: false
  }),
  computed: {
    ...mapGetters([
      'CURRENT_OBJECT',
      'CERTIFICATE',
      'SIDEBAR'
    ])
  },
  methods: {
    ...mapActions([
      'GET_CERTIFICATE',
      'SET_CERTIFICATE',
      'CLOSE_SIDEBAR'
    ]),
    set_certificate (dealId, fileDate, file1) {
      const data = new FormData()
      data.append('file', file1, file1.name)
      data.append('fileDate', fileDate)
      data.append('dealId', dealId)
      data.append('Steps', '7')
      return this.SET_CERTIFICATE(data)
    },
    async sendData () {
      this.notify2 = true
      if (await this.set_certificate(this.CURRENT_OBJECT.Deal_id, this.choisDate, this.file)) {
        this.choisDate = null
        this.file = null
      }
      this.notify2 = false
      this.notify = true
      setTimeout(function (scope) { scope.notify = false }, 2000, this)
    },
    funcChoisDate (tempVar) {
      this.choisDate = tempVar
    },
    funcFile (tempVar) {
      this.file = tempVar
    },
    sleep (ms) {
      ms += new Date().getTime()
      // while (new Date() < ms) {}
    }
  },
  components: {
    ShopList,
    Notify,
    Form
  },
  mounted () {
    this.CLOSE_SIDEBAR()
    if (this.CURRENT_OBJECT.Deal_id === 0) {
      this.$router.push('/')
    } else {
      this.GET_CERTIFICATE(this.CURRENT_OBJECT.Deal_id)
    }
  }
}
</script>
