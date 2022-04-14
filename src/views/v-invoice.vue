<template>
  <div style="z-index: 11000" class="position-fixed top-0 end-0 p-4">
    <transition name="fade">
      <notify v-if="notify">
        <b>Накладная успешно загружена!</b>
      </notify>
    </transition>
    <transition name="fade">
      <notify v-if="notify3">
        <b>Добавляем накладные...</b>
      </notify>
    </transition>
    <transition name="fade">
      <notify v-if="notify2">
        <b>Накладная успешно обновлена!</b>
      </notify>
    </transition>
    <transition name="fade">
      <notify v-if="notify4">
        <b>Обновляем накладные...</b>
      </notify>
    </transition>
  </div>
  <div class="row gx-4">
    <div class="col-12">
      <div class="card mb-4">
        <h3 class="m-0">
          <span class="text-primary">Накладные</span> по магазину {{CURRENT_OBJECT.Title}}
        </h3>
      </div>
      <modal
        @choiseDate="funcChoisDate($event)"
        @choiseFile="funcFile($event)"
        @sendData="sendData"
        @close="closeModal"
        Title='Добавить накладную'
        :chDate="varDate"
        :class="{show_custom_modal: isOpen}"
      />
      <modalEdit
        :class="{show_custom_modal: isOpenEdit}"
        Title='Просмотр и редактирование накладных по магазину'
        :photos="photos"
        :chDate="varDate"
        @choiseDate="funcChoisDate($event)"
        @choiseFile="funcFile($event)"
        @sendData="sendData"
        @closeEdit="closeModalEdit"
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
import ModalEdit from '@/components/app/vc-modal-edit'
import VueCal from 'vue-cal'
import 'vue-cal/dist/i18n/ru.js'
import 'vue-cal/dist/vuecal.css'
import axios from 'axios'
import Notify from '@/components/app/vc-notify'

export default {
  name: 'Invoice',
  data: () => ({
    isOpen: false,
    isOpenEdit: false,
    choisDate: 0,
    file: '',
    varDate: '',
    notify: false,
    notify2: false,
    notify3: false,
    notify4: false,
    events: [
      {
        start: '2021-12-06 09:00',
        end: '2021-12-06 10:00',
        title: 'Заголовок',
        class: 'leisure',
        content: 'Содержание'
      }
    ],
    photos: [],
    elementId: ''
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
        this.setInvoices()
      }
      if (this.isOpenEdit) {
        this.upInvoices()
      }
    },
    openModal () {
      this.isOpen = !this.isOpen
    },
    closeModal () {
      this.isOpen = !this.isOpen
    },
    closeModalEdit () {
      this.isOpenEdit = !this.isOpenEdit
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
          this.elementId = this.events[index].title
        }
      }
      if (flag) {
        this.isOpen = !this.isOpen
      } else {
        this.isOpenEdit = !this.isOpenEdit
      }
    },
    funcChoisDate (tempVar) {
      this.choisDate = tempVar
    },
    funcFile (tempVar) {
      this.file = tempVar
    },
    btnRefresh () {
      this.getInvoices()
    },
    viewChange ($obj) {
      let date1 = new Date($obj.startDate)
      date1 = date1.format('YYYY-MM-DD')
      this.varDate = date1
      this.events.splice(0)
      this.getInvoices()
    },
    async getInvoices () {
      const temp = {
        Steps: '12',
        shopId: this.CURRENT_OBJECT.CompanyId,
        event_date: this.varDate
      }
      const formData = temp
      await axios.get('https://smaip.ru/lk/b24/handler.php', { params: { formData } })
        .then((response) => {
          if (response.data.getInvoices.length > 0) {
            this.events.splice(0)
            for (let index = 0; index < response.data.getInvoices.length; index++) {
              let date1 = new Date(response.data.getInvoices[index][0][0])
              date1 = date1.format('YYYY-MM-DD')
              this.events.push({ start: date1, end: date1, title: response.data.getInvoices[index][2], class: 'leisure', content: response.data.getInvoices[index][1][0] })
            }
          }
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    async setInvoices () {
      this.notify3 = true
      const data = new FormData()
      data.append('file', this.file)
      data.append('fileDate', this.choisDate)
      data.append('shopId', this.CURRENT_OBJECT.CompanyId)
      data.append('InnerNumber', this.CURRENT_OBJECT.InnerNumber)
      data.append('Type', this.CURRENT_OBJECT.Type)
      data.append('Steps', '13')
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      await axios.post('https://smaip.ru/lk/b24/handler.php', data, config)
        .then((response) => {
          if (response.data.message === 0) {
            this.getInvoices()
            this.notify3 = false
            this.notify = true
            setTimeout(function (scope) { scope.notify = false }, 2000, this)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async upInvoices () {
      this.notify4 = true
      const data = new FormData()
      data.append('file', this.file)
      data.append('fileDate', this.choisDate)
      data.append('shopId', this.CURRENT_OBJECT.CompanyId)
      data.append('InnerNumber', this.CURRENT_OBJECT.InnerNumber)
      data.append('Type', this.CURRENT_OBJECT.Type)
      data.append('elementId', this.elementId)
      data.append('Steps', '14')
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      await axios.post('https://smaip.ru/lk/b24/handler.php', data, config)
        .then((response) => {
          if (response.data.message === 0) {
            this.getInvoices()
            this.notify4 = false
            this.notify2 = true
            setTimeout(function (scope) { scope.notify2 = false }, 2000, this)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  components: {
    Notify,
    Modal,
    ModalEdit,
    'vue-cal': VueCal
  },
  mounted () {
    this.varDate = new Date().format('YYYY-MM-DD')
    if (this.CURRENT_OBJECT.Deal_id === 0) {
      this.$router.push('/')
    } else {
      this.events.splice(0)
      this.getInvoices()
    }
    this.CLOSE_SIDEBAR()
  }
}
</script>
