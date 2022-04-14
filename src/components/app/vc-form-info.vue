<template>
  <div style="z-index: 11000" class="position-fixed top-0 end-0 p-4">
    <transition name="fade">
      <notify v-if="notify">
        <b>Жалоба была успешно сформирована!</b>
      </notify>
    </transition>
  </div>
  <div class="col-md-6 col-12">
    <div class="card mb-4">
      <div class="card-header">
        <slot name="header">
          <h3 class="m-0">
            <span class="text-primary">Составить жалобу</span> по магазину {{ CURRENT_OBJECT.Title }}
          </h3>
        </slot>
      </div>
      <div class="alert alert-primary">Внимание! К письму обязательно прикреплять накладные
        и фото отчёты! Максимум 10 фото. Фотографии не должны превышать размер в 20 Мб</div>
      <slot name="body">
        <label class="mb-3">Проблема</label>
        <div @click="choose_Problem" class="dropdown mb-4">
          <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" class="btn btn-secondary dropdown-toggle">
            {{ currentProblem === '' ? 'Выберите проблему' : currentProblemString}}
          </div>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" @click="currentProblem='noShipment'">Не списывают всю продукцию</a></li>
            <li><a class="dropdown-item" @click="currentProblem='noShipmentOne'">Не списывают одну из позиций</a></li>
            <li><a class="dropdown-item" @click="currentProblem='softInvoice'">Мягкие накладные</a></li>
            <li><a class="dropdown-item" @click="currentProblem='noScales'">Нет весов</a></li>
            <li><a class="dropdown-item" @click="currentProblem='garbage'">Отгружают мусор</a></li>
            <li><a class="dropdown-item" @click="currentProblem='rot'">Отгружают гниль</a></li>
            <li><a class="dropdown-item" @click="currentProblem='noInvoice'">Не выдают накладные</a></li>
            <li><a class="dropdown-item" @click="currentProblem='noProgramShipments'">Не работает программа отгрузки</a></li>
            <li><a class="dropdown-item" @click="currentProblem='irregularShipments'">Не регулярные списания</a></li>
            <li><a class="dropdown-item" @click="currentProblem='lowShipments'">Маленькие списания</a></li>
          </ul>
        </div>
        <transition name="slide-fade">
          <div v-if="currentProblem==='noShipment'" class='form-card card mb-4'>
            <div>
              Администрация магазина не отгружает продукцию с
              <input name='date3' class='form-control' type='date' required v-model="date3">
              по сегодняшний день. Просьба посодействовать в разрешении сложившейся ситуации.
            </div>
          </div>
        </transition>
        <transition name="slide-fade">
          <div v-if="currentProblem==='noShipmentOne'" class='form-card card mb-4'>
            <div>
              Администрация магазина не отгружает следующие позиции:
              <input name='position' class='form-control' type='text' required v-model="position">
              c <input class='form-control' name='date1' type='date' required v-model="date1">
              по сегодняшний день. Просьба посодействовать в разрешении сложившейся ситуации.
            </div>
          </div>
        </transition>
        <transition name="slide-fade">
          <div v-if="currentProblem==='softInvoice'" class='form-card card mb-4'>
            <div>
              <input hidden name='soft' type='text'>
              Администрация магазина систематически отгружает товар по мягким накладным, просьба посодействовать в
              разрешении сложившейся ситуации.
            </div>
          </div>
        </transition>
        <transition name="slide-fade">
          <div v-if="currentProblem==='noScales'" class='form-card card mb-4'>
            <div>
              <input hidden name='vesy' type='text'>
              Администрация магазина не предоставляет возможность производить контрольное взвешивание и сверку
              фактического веса товара с накладной, просьба посодействовать в разрешении сложившейся ситуации.
            </div>
          </div>
        </transition>
        <transition name="slide-fade">
          <div v-if="currentProblem==='garbage'" class='form-card card mb-4'>
            <div>
              Систематически в списанной продукции находится
              <input class='form-control' name='garbage' type='text' v-model="garbage" placeholder='пластик/стекло/мусор' required>
              , просьба довести до администрации магазина, что это недопустимо и может привести к гибели животного.
              С администрацией магазина менеджер связывался неоднократно, реакции со стороны магазина не последовало.
              Просьба посодействовать в разрешении сложившейся ситуации.
            </div>
          </div>
        </transition>
        <transition name="slide-fade">
          <div v-if="currentProblem==='rot'" class='form-card card mb-4'>
            <div>
              Систематически в списанной продукции находится
              <input class='form-control' name='garbage2' type='text' placeholder='гниль/плесень' required v-model="garbage2">
              , просьба довести до администрации магазина, что это недопустимо. С администрацией магазина менеджер
              связывался неоднократно, реакции со стороны магазина не последовало. Просьба посодействовать в разрешении
              сложившейся ситуации.
            </div>
          </div>
        </transition>
        <transition name="slide-fade">
          <div v-if="currentProblem==='noInvoice'" class='form-card card mb-4'>
            <div>
              <input hidden name='nak' type='text'>Администрация магазина систематически не выдаёт накладные при наличии
              списаний. Просьба посодействовать в разрешении сложившейся ситуации.
            </div>
          </div>
        </transition>
        <transition name="slide-fade">
          <div v-if="currentProblem==='noProgramShipments'" class='form-card card mb-4'>
            <div>
              <input hidden name='prog' type='text'>Не работает программа отгрузки. Просьба посодействовать в разрешении
              сложившейся ситуации.
            </div>
          </div>
        </transition>
        <transition name="slide-fade">
          <div v-if="currentProblem==='irregularShipments'" class='form-card card mb-4'>
            <div>
              <input hidden name='new1' type='text'>Администрация магазина списывает продукцию не на ежедневной основе.
              Просьба посодействовать в разрешении сложившейся ситуации.
            </div>
          </div>
        </transition>
        <transition name="slide-fade">
          <div v-if="currentProblem==='lowShipments'" class='form-card card mb-4'>
            <div>
              <input hidden name='low' type='text'>Администрация магазина списывает продукцию в малом количестве. Просьба посодействовать в разрешении сложившейся ситуации.
            </div>
          </div>
        </transition>
        <input
          required
          hidden
          type="text"
          name="choose_Problem"
          id="choose_Problem"
          ref="choose_Problem"
          v-model="chooseProblem"
          v-on:change="choose_Problem"
        >
        <label class="mb-3">Загрузить файлы</label>
        <input
          required
          type="file"
          id="file"
          ref="file"
          name="pictures"
          class="form-control card-input mb-4"
          v-on:change="choose_File"
          multiple
        >
      </slot>
      <slot name="footer">
        <button
          @click="sendData"
          type="button"
          id="btnSend"
          class="btn btn-primary ms-auto"
          :disabled="isButtonDisabled"
        >
          <i class="ph-plus"></i>Отправить
        </button>
      </slot>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Notify from '@/components/app/vc-notify'

export default {
  el: 'button',
  props: {
    chProblem: {
      type: String,
      default: ''
    }
  },
  name: 'FormInfo',
  data: () => ({
    files: '',
    chooseProblem: null,
    isButtonDisabled: true,
    currentProblem: '',
    date1: '',
    date3: '',
    position: '',
    soft: '',
    vesy: '',
    garbage: '',
    garbage2: '',
    nak: '',
    prog: '',
    new1: '',
    low: '',
    notify: false,
    currentProblemString: ''
  }),
  computed: {
    ...mapGetters([
      'CURRENT_OBJECT',
      'INFO'
    ])
  },
  components: {
    Notify
  },
  methods: {
    ...mapActions([
      'SET_INFO',
      'GET_INFO'
    ]),
    close () {
      this.file = null
      this.chooseProblem = null
      this.$refs.choose_Problem.value = null
      this.$refs.file.value = null
      this.isButtonDisabled = true
      this.$emit('close')
    },
    choose_File () {
      this.files = this.$refs.file.files
    },
    choose_Problem () {
      this.chooseProblem = this.currentProblem
      this.isButtonDisabled = false
      if (this.currentProblem === 'noShipment') {
        this.currentProblemString = 'Не списывают всю продукцию'
      }
      if (this.currentProblem === 'noShipmentOne') {
        this.currentProblemString = 'Не списывают одну из позиций'
      }
      if (this.currentProblem === 'softInvoice') {
        this.soft = '2'
        this.currentProblemString = 'Мягкие накладные'
      }
      if (this.currentProblem === 'noScales') {
        this.vesy = '1'
        this.currentProblemString = 'Нет весов'
      }
      if (this.currentProblem === 'garbage') {
        this.currentProblemString = 'Отгружают мусор'
      }
      if (this.currentProblem === 'garbage2') {
        this.currentProblemString = 'Отгружают гниль'
      }
      if (this.currentProblem === 'noInvoice') {
        this.nak = '1'
        this.currentProblemString = 'Не выдают накладные'
      }
      if (this.currentProblem === 'noProgramShipments') {
        this.prog = '1'
        this.currentProblemString = 'Не работает программа отгрузок'
      }
      if (this.currentProblem === 'irregularShipments') {
        this.new1 = '1'
        this.currentProblemString = 'Нерегулярные списания'
      }
      if (this.currentProblem === 'lowShipments') {
        this.low = '1'
        this.currentProblemString = 'Маленькие списания'
      }
    },
    async sendData (shopId, dealId, date1, date3, position, soft, vesy, garbage, garbage2, nak, prog, new1, low, files) {
      this.notify = true
      const data = new FormData()
      data.append('shopId', this.CURRENT_OBJECT.CompanyId)
      data.append('dealId', this.CURRENT_OBJECT.Deal_id)
      data.append('date1', this.date1)
      data.append('date3', this.date3)
      data.append('position', this.position)
      data.append('soft', this.soft)
      data.append('vesy', this.vesy)
      data.append('garbage', this.garbage)
      data.append('garbage2', this.garbage2)
      data.append('nak', this.nak)
      data.append('prog', this.prog)
      data.append('new1', this.new1)
      data.append('low', this.low)
      if (this.files.length > 0) {
        for (let i = 0; i < this.files.length; i++) {
          const file = this.files[i]
          data.append('files[' + i + ']', file)
        }
      }
      data.append('Steps', '21')
      this.currentProblem = ''
      await this.SET_INFO(data)
      await this.GET_INFO(this.CURRENT_OBJECT.CompanyId)
      setTimeout(function (scope) { scope.notify = false }, 2000, this)
      // this.files = null
      // this.$refs.files.value = null
      // this.chooseProblem.value = null
      // this.$refs.choose_Problem.value = null
      this.isButtonDisabled = true
    }
  }
}
</script>
