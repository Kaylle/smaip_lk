<template>
  <div style="z-index: 11000" class="position-fixed top-0 end-0 p-4">
    <transition name="fade">
      <notify v-if="notify">
        <b>Копия договора успешно загружена!</b>
      </notify>
    </transition>
  </div>
  <div class="row gx-4">
    <div class="col-12 col-md-6">
      <shop-list class="grid-height"/>
      <div class="card d-flex justify-content-center mt-4 grid-height mb-4 mb-md-0">
        <a class="btn btn-primary" target="_blank" :href="'https://smaip.ru/lk/b24/ticket/dogovor.php?id='+COMPANY[0].Deal_id">Скачать договор</a>
      </div>
    </div>
    <Form
      @choiseDate="funcChoisDate($event)"
      @choiseFile="funcFile($event)"
      @sendData="sendData"
      Title='Загрузить копию договора'
    />
  </div>
  <div v-if="CONTRACT.length > 0"  class="row row-waterfall">
    <div v-for="(c, index) in CONTRACT" :key="index" class="item">
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Form from '@/components/app/vc-form'
import Notify from '@/components/app/vc-notify'
import ShopList from '@/components/app/vc-shop-list'

export default {
  name: 'Add_contract',
  data: () => ({
    choisDate: 0,
    file: '',
    notify: false
  }),
  computed: {
    ...mapGetters([
      'CURRENT_OBJECT',
      'CONTRACT',
      'COMPANY',
      'SIDEBAR'
    ])
  },
  methods: {
    ...mapActions([
      'GET_CONTRACT',
      'SET_CONTRACT',
      'CLOSE_SIDEBAR'
    ]),
    set_contract (dealId, fileDate, file1) {
      const data = new FormData()
      data.append('file', file1, file1.name)
      data.append('fileDate', fileDate)
      data.append('dealId', dealId)
      data.append('Steps', '9')
      return this.SET_CONTRACT(data)
    },
    async sendData () {
      this.notify = true
      if (await this.set_contract(this.CURRENT_OBJECT.Deal_id, this.choisDate, this.file)) {
        this.choisDate = null
        this.file = null
      }
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
    if (this.CURRENT_OBJECT.Deal_id === 0) {
      this.$router.push('/')
    } else {
      this.GET_CONTRACT(this.CURRENT_OBJECT.Deal_id)
    }
    this.CLOSE_SIDEBAR()
  }
}
</script>
