<template>
  <div style="z-index: 11000" class="position-fixed top-0 end-0 p-4">
    <transition name="fade">
      <notify v-if="notify">
        <b>Жалоба была отмечена завершенной!</b>
      </notify>
    </transition>
  </div>
  <div class="row gx-4">
    <div class="col-md-6 col-12">
      <shop-list class="grid-height mb-4"/>
    </div>
    <form-info/>
  </div>
  <div class="row gx-4">
    <div class="col-md-6 col-12" v-for="(c, index) in INFO" :key="c.Id">
      <div class="card mb-4 pb-0 overflow-auto">
        <div class="card-header">
          <h3 class="m-0">{{ c.Problem }}</h3>
          <button class="btn btn-secondary" @click="test(c.Id)">Завершить</button>
        </div>
        <p>
          <b>Внутренний номер магазина:</b> {{ c.InnerN }}<br>
        </p>
        <div class="d-flex mt-4">
          <div v-for="(photo, index2) in c.Photos" :key="photo.path">
            <div class="info-image me-2" data-bs-toggle="modal" :data-bs-target="'#e'+index+index2">
              <img class="instruction-image" :src="'https://info.smaip.ru/0000/'+photo" style="width: 100px">
              <div class="image-overlay"></div>
            </div>
            <div class="modal fade" :id="'e'+index+index2" tabindex="-1" role="dialog">
              <div class="modal-dialog image-dialog">
                <button class="btn-close" data-bs-dismiss="modal">
                  <i class="ph-x"></i>
                </button>
                <img :src="'https://info.smaip.ru/0000/'+photo" alt="modal-img">
              </div>
            </div>
          </div>
        </div>
        <div class="shipment-card mt-4 d-flex justify-content-between">
          <div class="body-2 text-primary m-0"><b>Дата отправки жалобы:</b></div>
          <div class="body-2 text-primary m-0 text-end"><b>{{ c.Date }}</b></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ShopList from '@/components/app/vc-shop-list'
import FormInfo from '@/components/app/vc-form-info'
import Notify from '@/components/app/vc-notify'

export default {
  name: 'Info',
  data: () => ({
    currentProblem: '',
    notify: false
  }),
  computed: {
    ...mapGetters([
      'SIDEBAR',
      'CURRENT_OBJECT',
      'INFO'
    ])
  },
  methods: {
    ...mapActions([
      'GET_INFO',
      'SET_INFO',
      'CLEAR_INFO',
      'CLOSE_INFO',
      'CLOSE_SIDEBAR'
    ]),
    funcFile (tempVar, tempVar2) {
      this.file = tempVar
      this.files = tempVar2
    },
    async test (a) {
      this.notify = true
      const data = new FormData()
      data.append('infoId', a)
      data.append('Steps', '22')
      await this.CLOSE_INFO(data)
      setTimeout(function (scope) { scope.notify = false }, 2000, this)
    },
    funcFiles (tempVar) {
      this.files = tempVar
    },
  },
  components: {
    ShopList,
    FormInfo,
    Notify
  },
  mounted () {
    this.CLEAR_INFO()
    this.GET_INFO(this.CURRENT_OBJECT.CompanyId)
    this.CLOSE_SIDEBAR()
  }
}
</script>

<style scoped>
.form-card {
  overflow: hidden;
  transition: all 0.3s ease;
}
table {
  color: var(--main-dark);
}
table > tbody > tr:first-child > td {
  border-radius: 15px 15px 0 0;
}
table > tbody > tr:last-child > td {
  border-radius: 0 0 15px 15px;
}
table > tbody > tr:last-child {
  border-bottom: none !important;
  border-color: transparent !important;
}
.table>:not(caption)>*>* {
  padding: 20px;
}
.info-image {
  position: relative;
  width: 100px;
}
</style>
