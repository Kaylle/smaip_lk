<template>
  <div style="z-index: 11000" class="position-fixed top-0 end-0 p-4">
    <transition name="fade">
      <notify v-if="notify">
        <b>Фото отчёт успешно загружен!</b>
      </notify>
    </transition>
    <transition name="fade">
      <notify v-if="notify2">
        <b>Добавляем фото отчёт...</b>
      </notify>
    </transition>
  </div>
  <div class="row gx-4">
    <div class="col-12">
      <div class="card mb-4">
        <h3 class="m-0">
          <span class="text-primary">Фото отчёты</span> по магазину {{CURRENT_OBJECT.Title}}
        </h3>
      </div>
      <modal
        :class="{show_custom_modal: isOpen}"
        @choiseDate="funcChoisDate($event)"
        @choiseFile="funcFile($event)"
        @choiseFiles="funcFiles($event)"
        @sendData="sendData"
        @close="closeModal"
        Title='Добавить фото отчёты по магазину'
        :chDate="varDate"
        :isInputMultiple="true"
      />
      <modalView
        :class="{show_custom_modal: isOpenView}"
        Title='Просмотр фото отчёта'
        :photos="photos"
        :chDate="varDate"
        @closeView="closeModalView"
      />
      <div class="card mb-4" style="height: 382px;max-width: 330px;">
        <vue-cal
          class="vuecal--blue-theme"
          hide-view-selector
          active-view="month"
          events-count-on-year-view
          xsmall
          locale="ru"
          :disable-views="['years', 'year', 'week']"
          :clickToNavigate="false"
          :dblclickToNavigate="false"
          :time="false"
          :events="events"
          @cell-click="cellClick"
          @view-change="viewChange($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/app/vc-modal'
import ModalView from '@/components/app/vc-modal-view'
import VueCal from 'vue-cal'
import 'vue-cal/dist/i18n/ru.js'
import 'vue-cal/dist/vuecal.css'
import axios from 'axios'
import Notify from '@/components/app/vc-notify'

export default {
  name: 'photo',
  data: () => ({
    isOpen: false,
    isOpenView: false,
    choisDate: 0,
    file: '',
    files: '',
    varDate: '',
    notify: false,
    notify2: false,
    events: [
      {
        start: '2021-12-06 09:00',
        end: '2021-12-06 10:00',
        title: 'заголовок',
        class: 'leisure',
        content: 'содержание'
      }
    ],
    photos: []
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
    sendData () {
      if (this.isOpen) {
        this.setCalEvents()
      }
    },
    openModal () {
      this.isOpen = !this.isOpen
    },
    closeModal () {
      this.isOpen = !this.isOpen
    },
    closeModalView () {
      this.isOpenView = !this.isOpenView
    },
    cellClick (event, e) {
      this.varDate = event.format('YYYY-MM-DD')
      let flag = true
      this.photos.splice(0)
      for (let index = 0; index < this.events.length; index++) {
        if (this.events[index].start === this.varDate) {
          flag = false
          const tempArr = this.events[index].content.split(', ')
          for (let index = 0; index < tempArr.length; index++) {
            this.photos.push(tempArr[index])
          }
        }
      }
      if (flag) {
        this.isOpen = !this.isOpen
      } else {
        this.isOpenView = !this.isOpenView
      }
    },
    funcChoisDate (tempVar) {
      this.choisDate = tempVar
    },
    funcFile (tempVar, tempVar2) {
      this.file = tempVar
      this.files = tempVar2
    },
    funcFiles (tempVar) {
      this.files = tempVar
    },
    async getCalEvents () {
      const temp = {
        Steps: '10',
        shopId: this.CURRENT_OBJECT.CompanyId,
        event_date: this.varDate
      }
      const formData = temp
      await axios.get('https://smaip.ru/lk/b24/handler.php', { params: { formData } })
        .then((response) => {
          if (response.data.getCalEvents.length > 0) {
            this.events.splice(0)
            for (let index = 0; index < response.data.getCalEvents.length; index++) {
              let date1 = new Date(response.data.getCalEvents[index][0][0])
              date1 = date1.format('YYYY-MM-DD')
              this.events.push({ start: date1, end: date1, title: 'заголовок2', class: 'leisure', content: response.data.getCalEvents[index][1][0] })
            }
          }
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    async setCalEvents () {
      this.notify2 = true
      const data = new FormData()
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        data.append('files[' + i + ']', file)
      }
      data.append('fileDate', this.choisDate)
      data.append('shopId', this.CURRENT_OBJECT.CompanyId)
      data.append('InnerNumber', this.CURRENT_OBJECT.InnerNumber)
      data.append('Type', this.CURRENT_OBJECT.Type)
      data.append('Steps', '11')
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      await axios.post('https://smaip.ru/lk/b24/handler.php', data, config)
        .then((response) => {
          if (response.data.message === 0) {
            this.getCalEvents()
            this.notify2 = false
            this.notify = true
            setTimeout(function (scope) { scope.notify = false }, 2000, this)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    btnRefresh () {
      this.getCalEvents()
    },
    viewChange ($obj) {
      let date1 = new Date($obj.startDate)
      date1 = date1.format('YYYY-MM-DD')
      this.varDate = date1
      this.events.splice(0)
      this.getCalEvents()
    }
  },
  components: {
    Notify,
    Modal,
    ModalView,
    'vue-cal': VueCal
  },
  actions: {
  },
  mounted () {
    this.varDate = new Date().format('YYYY-MM-DD')
    if (this.CURRENT_OBJECT.Deal_id === 0) {
      this.$router.push('/')
    } else {
      this.events.splice(0)
      this.getCalEvents()
    }
    this.CLOSE_SIDEBAR()
  }
}
</script>
