<template>
  <div class="row gx-4">
    <div class="col-xl-4 col-md-6 col-12">
      <div class="card mb-4" style="padding-bottom: 0;overflow: hidden">
        <div class="card-header">
          <h3 class="m-0">Счёт №1069 от 27.09.2021</h3>
          <button class="btn btn-secondary">
            <i class="ph-download-simple"></i>Скачать
          </button>
        </div>
        <p class="body-2"><b>Москва г, Сущёвский Вал ул, дом 31, строение1</b></p>
        <span>Первая отгрузка 05.10.2021</span>
        <span>Внести платёж до <b>24.01.2022</b></span>
        <div class="shipment-card mt-4 d-flex justify-content-between">
          <div class="body-2 text-primary m-0"><b>Оплачен</b></div>
          <div class="body-2 text-primary m-0"><b>3,644.26 Р</b></div>
        </div>
      </div>
    </div>
    <div class="col-xl-4 col-md-6 col-12">
      <div class="card mb-4" style="padding-bottom: 0;overflow: hidden">
        <div class="card-header">
          <h3 class="m-0">Счёт №1069 от 27.09.2021</h3>
          <button class="btn btn-secondary">
            <i class="ph-download-simple"></i>Скачать
          </button>
        </div>
        <p class="body-2"><b>Москва г, Сущёвский Вал ул, дом 31, строение1</b></p>
        <span>Первая отгрузка 05.10.2021</span>
        <span>Внести платёж до <b>24.01.2022</b></span>
        <div class="shipment-card mt-4 d-flex justify-content-between">
          <div class="body-2 text-primary m-0"><b>Оплачен</b></div>
          <div class="body-2 text-primary m-0"><b>3,644.26 Р</b></div>
        </div>
      </div>
    </div>
    <div class="col-xl-4 col-md-6 col-12">
      <div class="card mb-4" style="padding-bottom: 0;overflow: hidden">
        <div class="card-header">
          <h3 class="m-0">Счёт №1069 от 27.09.2021</h3>
          <button class="btn btn-secondary">
            <i class="ph-download-simple"></i>Скачать
          </button>
        </div>
        <p class="body-2"><b>Москва г, Сущёвский Вал ул, дом 31, строение1</b></p>
        <span>Первая отгрузка 05.10.2021</span>
        <span>Внести платёж до <b>24.01.2022</b></span>
        <div class="shipment-card mt-4 d-flex justify-content-between">
          <div class="body-2 text-primary m-0"><b>Оплачен</b></div>
          <div class="body-2 text-primary m-0"><b>3,644.26 Р</b></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Bills',
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
