<template>
  <div class="row gx-4">
    <div class="col-xl-3 col-lg-4 col-md-6 col-12">
      <div class="card mb-4">
        <div class="card-header">
          <h3 class="m-0">О Компании</h3>
          <div class="btn btn-secondary px-3 py-2"><i class="ph-info  m-0"></i></div>
        </div>
        <p><b>Контакты:</b><br>
          Фактический адрес: 167000, г. Сыктывкар, ул. Первомайская, д. 141<br>
          Электронная почта: office@smaip.ru<br>
          Телефоны: +7 (922) 088-49-48.</p>
      </div>
    </div>
    <div class="col-xl-3 col-lg-4 col-md-6 col-12">
      <div class="card mb-4">
        <p><b>Банковские реквизиты:</b><br>
          Р/с 40802810528000011871<br>
          Коми отделение №8617 ПАО "Сбербанк" г.Сыктывкар<br>
          к/с 30101810400000000640, БИК 048702640</p>
      </div>
    </div>
    <div class="col-xl-3 col-lg-4 col-md-6 col-12">
      <div class="card mb-4">
        <p><b>Контакты:</b><br>
          Фактический адрес: 167000, г. Сыктывкар, ул. Первомайская, д. 141<br>
          Электронная почта: office@smaip.ru<br>
          Телефоны: +7 (922) 088-49-48.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'About',
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
