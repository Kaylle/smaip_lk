<template>
  <div style="z-index: 11000" class="position-fixed top-0 end-0 p-4">
    <notify notify="true">
      <b>Письмо успешно отправлено</b>
    </notify>
  </div>
  <div class="table-responsive card p-0">
    <div class="modal fade" id="e90" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="card">
          <h5 class="card-header">
            Информационное письмо.  Пятёрочка 1236 Кировская область, Тестбург
            <button class="btn-close" data-bs-dismiss="modal">
              <i class="ph-x"></i>
            </button>
          </h5>
          <form action="#" method="post">
            Добрый день,<br>
            В магазине Пятёрочка 1236 <input class="card-input form-control" name="rf" value="Кировская область">, <input class="card-input form-control" name="adress" value="Тестбург, "><br>
            <br>
            Отгружают мусор тест<br>
            <br>
            Суть разговора с ДМ: <input class="card-input form-control" name="rDM" value=""><br>
            Суть разговора с СПВ: <input class="card-input form-control" name="rSP" value=""><br><br>
            Данные ДМ: <input class="card-input form-control" name="fioDM" value="Тестовый ДМ"> - <input class="card-input form-control" name="tDM" value="790811111111"><br>
            Данные СПВ: <input class="card-input form-control" name="fioSP" value="Тестовый СВ"> - <input class="card-input form-control" name="tSP" value="79091111111">
            <input hidden="" name="id" value="90">
            <input hidden="" name="type" value="Пятёрочка">
            <input hidden="" name="outerN" value="1236">
            <input hidden="" name="innerN" value="14254">
            <input hidden="" name="problem" value="Отгружают мусор тест">
            <input hidden="" name="problem_short" value="Отгружают мусор">
            <input hidden="" name="temp" value="тест">
            <input hidden="" name="shop_id" value="">
            <input hidden="" name="ip" value="0">
            <input hidden="" name="dogovor" value="1">
            <div class="d-flex justify-content-between align-items-center mt-5">
              <button type="submit" name="save" class="btn btn-primary">Сохранить</button>
              <button type="submit" name="next" class="btn btn-primary">Подтвердить (отправить на почту)</button>
              <div class="d-flex align-items-center">
                <input class="card-input form-control" name="reason" placeholder="Причина отказа (увидит КА)">
                <button type="submit" name="reject" class="btn btn-primary">Отклонить</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <table class="table table-bordered table-sm table-hover bg-white m-0">
      <thead class="bg-primary">
        <tr>
          <th>Дата отправки жалобы</th>
          <th>Внутренний номер</th>
          <th>КА</th>
          <th>Проблема</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>25.01 09:18</td>
          <td><a target="_blank" href="https://rahalcrm.bitrix24.ru/crm/company/details/49680/">14254</a></td>
          <td><a target="_blank" href="https://rahalcrm.bitrix24.ru/crm/contact/details/12314/">Тычкин Евгений Александрович</a></td>
          <td>Отгружают мусор тест</td>
          <td>Оформлено</td>
          <td><button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#e90">Открыть</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Notify from '@/components/app/vc-notify'
export default {
  name: 'InfoAdmin',
  data: () => ({
    notify: false
  }),
  components: {
    Notify
  },
  mounted () {
    this.notify = true
    setTimeout(function (scope) { scope.notify = false }, 2000, this)
  }
}
</script>

<style scoped>
.modal-dialog {
  width: 80vw !important;
  margin-left: 10vw;
  margin-right: 10vw;
}
.modal-dialog .card {
  width: 80vw !important;
}
.form-control {
  width: auto;
  display: inline-flex;
  height: 33px;
  margin-bottom: 4px;
}
</style>
