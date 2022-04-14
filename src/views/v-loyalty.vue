<template>
  <div class="row gx-4">
      <div class="col-12">
          <div class="card mb-4">
              <div class="card-header">
                  <h3 class="m-0">Процент документов</h3>
                  <a class="btn btn-secondary px-3 py-2"><strong>74,6%</strong></a>
              </div>
              <p>Процент документов состоит из следующих параметров: наличие справки и договора,
                  накладные и фото отчёты.</p>
              <p>Справка и договор должны быть прикреплены за каждый магазин. Соответственно, сколько
                  магазинов, столько и справок/договоров должно быть прикреплено.</p>
              <p>Накладные и фото отчёты должны прикрепляться за каждый день. Процент документов
                  расчитывается за предыдущий месяц.</p>
          </div>
      </div>
      <div class="col-xl-3 col-md-6 col-12">
          <div class="card icon-card mb-4">
              <i class="icon-on-side ph-calendar-check"></i>
              <div class="gift-card-text">
                  <span>Накладные</span>
                  <div class="progress">
                      <div class="progress-bar bg-primary" style="width: 47%"></div>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-xl-3 col-md-6 col-12">
          <div class="card icon-card mb-4">
              <i class="icon-on-side ph-calendar-plus"></i>
              <div class="gift-card-text">
                  <span>Фото отчёты</span>
                  <div class="progress">
                      <div class="progress-bar bg-primary" style="width: 13%"></div>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-xl-3 col-md-6 col-12">
          <div class="card icon-card mb-4">
              <i class="icon-on-side ph-paw-print"></i>
              <div class="gift-card-text">
                  <span>Справка о ФХ</span>
                  <div class="progress">
                      <div class="progress-bar bg-primary" style="width: 60%"></div>
                  </div>
              </div>
          </div>
      </div>
      <div class="col-xl-3 col-md-6 col-12">
          <div class="card icon-card mb-4">
              <i class="icon-on-side ph-files"></i>
              <div class="gift-card-text">
                  <span>Копия договора</span>
                  <div class="progress">
                      <div class="progress-bar bg-primary" style="width: 85%"></div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Loyalty',
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
