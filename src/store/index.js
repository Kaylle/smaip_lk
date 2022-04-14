import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'

export default createStore({
  state: {
    user: {
      Id: localStorage.getItem('userId'),
      Name: localStorage.getItem('userName'),
      LastName: localStorage.getItem('userLastName'),
      SecondName: localStorage.getItem('userSecondName'),
      Seriya: localStorage.getItem('userSeriya'),
      Nomer: localStorage.getItem('userNomer'),
      KemKogda: localStorage.getItem('userKemKogda'),
      IsActive: localStorage.getItem('userIsActive'),
      IdManager: localStorage.getItem('userIdManager'),
      Acception: localStorage.getItem('userAcception')
    },
    manager: {
      Id: localStorage.getItem('managerId'),
      Name: localStorage.getItem('managerName'),
      LastName: localStorage.getItem('managerLastName'),
      SecondName: localStorage.getItem('managerSecondName')
    },
    company: [
      {
        Id: localStorage.getItem('companyId'),
        Title: localStorage.getItem('companyTitle'),
        Revenue: localStorage.getItem('companyRevenue'),
        PricePerKg: localStorage.getItem('companyPricePerKg'),
        PaymentFor: localStorage.getItem('companyPaymentFor'),
        OuterNumber: localStorage.getItem('companyOuterNumber'),
        InnerNumber: localStorage.getItem('companyInnerNumber'),
        Retailer: localStorage.getItem('companyRetailer'),
        Deal_id: localStorage.getItem('companyDeal_id'),
        Balance: localStorage.getItem('companyBalance'),
        Deal_cost: localStorage.getItem('dealCost'),
        Type: localStorage.getItem('companyType'),
        Recommendation: localStorage.getItem('recommend')
      }
    ],
    photo: [
    ],
    invoices: [
    ],
    attorney: [
    ],
    shipments1: [
    ],
    shipments2: [
    ],
    shipments1_group: [
    ],
    shipments2_group: [
    ],
    info: [
    ],
    certificate: [
    ],
    contract: [
    ],
    returnDocument: [
    ],
    receipt: [
    ],
    currentObject: {
      CompanyId: localStorage.getItem('companyId'),
      Title: localStorage.getItem('companyTitle'),
      Revenue: localStorage.getItem('companyRevenue'),
      PricePerKg: localStorage.getItem('companyPricePerKg'),
      PaymentFor: localStorage.getItem('companyPaymentFor'),
      OuterNumber: localStorage.getItem('companyOuterNumber'),
      InnerNumber: localStorage.getItem('companyInnerNumber'),
      Retailer: localStorage.getItem('companyRetailer'),
      Deal_id: localStorage.getItem('companyDeal_id'),
      Balance: localStorage.getItem('companyBalance'),
      Deal_cost: localStorage.getItem('dealCost'),
      Type: localStorage.getItem('companyType'),
      Recommendation: localStorage.getItem('recommend')
    },
    sidebar: {
      is_open: localStorage.getItem('is_open')
    },
    theme: {
      is_light: localStorage.getItem('is_light')
    }
  },
  mutations: {
    SET_USER_DATA: (state, user) => {
      state.user.Id = user.ID
      state.user.Name = user.NAME
      state.user.LastName = user.LAST_NAME
      state.user.SecondName = user.SECOND_NAME
      state.user.Seriya = user.SERIYA
      state.user.Nomer = user.NOMER
      state.user.KemKogda = user.KEMKOGDA
      state.user.IsActive = user.ISACTIVE
      state.user.IdManager = user.ID_MANAGER
      state.sidebar.is_open = false
      state.theme.is_light = true
      state.user.Acception = user.ACCEPTION
    },
    CLEAR_USER_DATA: (state) => {
      state.user.Id = 0
      state.user.Name = 0
      state.user.LastName = 0
      state.user.SecondName = 0
      state.user.Seriya = 0
      state.user.Nomer = 0
      state.user.KemKogda = 0
      state.user.IsActive = 0
      state.user.IdManager = 0
      state.sidebar.is_open = false
      state.user.Acception = 0
    },
    SET_MANAGER_DATA: (state, manager) => {
      state.manager.Id = manager.ID
      state.manager.Name = manager.NAME
      state.manager.LastName = manager.LAST_NAME
      state.manager.SecondName = manager.SECOND_NAME
    },
    CLEAR_MANAGER_DATA: (state) => {
      state.manager.Id = 0
      state.manager.Name = 0
      state.manager.LastName = 0
      state.manager.SecondName = 0
    },
    SET_COMPANY_DATE: (state, company) => {
      state.company.splice(0)
      for (let index = 0; index < company.length; index++) {
        state.company.push({ Id: company[index].COMPANY_ID, Title: company[index].IS_PRIMARY })
      }
    },
    UPDATE_COMPANY_DATA: (state, company2) => {
      for (let index = 0; index < state.company.length; index++) {
        for (let index2 = 0; index2 < company2.length; index2++) {
          if (state.company[index].Id === Number(company2[index2].ID)) {
            state.company[index].Title = company2[index2].TITLE
            state.company[index].Revenue = company2[index2].REVENUE
            state.company[index].PricePerKg = company2[index2].UF_CRM_1613731949
            state.company[index].PaymentFor = company2[index2].UF_CRM_1619173084
            state.company[index].OuterNumber = company2[index2].UF_CRM_1579359748326
            state.company[index].InnerNumber = company2[index2].UF_CRM_1594794891
            state.company[index].Retailer = company2[index2].UF_CRM_1580400783014
            state.company[index].Deal_id = company2[index2].DEAL_ID
            state.company[index].Balance = company2[index2].Balance
            state.company[index].Deal_cost = company2[index2].Deal_cost
            state.company[index].Type = company2[index2].Type
            state.company[index].Recommendation = company2[index2].UF_CRM_1644213453
          }
        }
      }
    },
    CLEAR_COMPANY_DATA: (state) => {
      state.company.splice(0)
    },
    SET_PHOTO_DATA: (state, photo) => {
      state.photo.id = 0
    },
    CLEAR_PHOTO_DATA: (state) => {
      state.photo.splice(0)
    },
    SET_INVOICES_DATA: (state, invoices) => {
      state.invoices.id = 0
    },
    CLEAR_INVOICE_DATA: (state) => {
      state.invoices.splice(0)
    },
    SET_LOCAL_STORAGE: (state) => {
      localStorage.setItem('userId', state.user.Id)
      localStorage.setItem('userName', state.user.Name)
      localStorage.setItem('userLastName', state.user.LastName)
      localStorage.setItem('userSecondName', state.user.SecondName)
      localStorage.setItem('userSeriya', state.user.Seriya)
      localStorage.setItem('userNomer', state.user.Nomer)
      localStorage.setItem('userKemKogda', state.user.KemKogda)
      localStorage.setItem('userIsActive', state.user.IsActive)
      localStorage.setItem('userIdManager', state.user.IdManager)
      localStorage.setItem('managerId', state.manager.Id)
      localStorage.setItem('managerName', state.manager.Name)
      localStorage.setItem('managerLastName', state.manager.LastName)
      localStorage.setItem('managerSecondName', state.manager.SecondName)
      localStorage.setItem('is_open', state.sidebar.is_open)
      localStorage.setItem('is_light', state.theme.is_light)
      localStorage.setItem('userAcception', state.user.Acception)
    },
    SET_CURRENT_OBJECT: (state, id) => {
      for (let index = 0; index < state.company.length; index++) {
        if (state.company[index].Id === id) {
          state.currentObject.CompanyId = id
          state.currentObject.Title = state.company[index].Title
          state.currentObject.Revenue = state.company[index].Revenue
          state.currentObject.PricePerKg = state.company[index].PricePerKg
          state.currentObject.PaymentFor = state.company[index].PaymentFor
          state.currentObject.OuterNumber = state.company[index].OuterNumber
          state.currentObject.InnerNumber = state.company[index].InnerNumber
          state.currentObject.Retailer = state.company[index].Retailer
          state.currentObject.Deal_id = state.company[index].Deal_id
          state.currentObject.Balance = state.company[index].Balance
          state.currentObject.Deal_cost = state.company[index].Deal_cost
          state.currentObject.Type = state.company[index].Type
          state.currentObject.Recommendation = state.company[index].Recommendation
          localStorage.setItem('companyId', id)
          localStorage.setItem('companyTitle', state.company[index].Title)
          localStorage.setItem('companyRevenue', state.company[index].Revenue)
          localStorage.setItem('companyPricePerKg', state.company[index].PricePerKg)
          localStorage.setItem('companyPaymentFor', state.company[index].PaymentFor)
          localStorage.setItem('companyOuterNumber', state.company[index].OuterNumber)
          localStorage.setItem('companyInnerNumber', state.company[index].InnerNumber)
          localStorage.setItem('companyRetailer', state.company[index].Retailer)
          localStorage.setItem('companyDeal_id', state.company[index].Deal_id)
          localStorage.setItem('companyBalance', state.company[index].Balance)
          localStorage.setItem('dealCost', state.company[index].Deal_cost)
          localStorage.setItem('companyType', state.company[index].Type)
          localStorage.setItem('recommend', state.company[index].Recommendation)
        }
      }
    },
    CLEAR_CURRENT_OBJECT: (state) => {
      state.currentObject.CompanyId = 0
      state.currentObject.Title = 0
      state.currentObject.Revenue = 0
      state.currentObject.PricePerKg = 0
      state.currentObject.PaymentFor = 0
      state.currentObject.OuterNumber = 0
      state.currentObject.InnerNumber = 0
      state.currentObject.Retailer = 0
      state.currentObject.Deal_id = 0
      state.currentObject.Balance = 0
      state.currentObject.Deal_cost = 0
      state.currentObject.Type = 0
      state.currentObject.Recommendation = 0
    },
    SET_ATTORNEY: (state, attorney) => {
      state.attorney.splice(0)
      for (let index = 0; index < attorney.length; index++) {
        state.attorney.push({ Id: attorney[index].id, pdfUrl: attorney[index].pdfUrlMachine, Title: attorney[index].title, imageUrl: attorney[index].imageUrlMachine })
      }
    },
    SET_SHIPMENTS1: (state, shipments) => {
      state.shipments1.splice(0)
      for (let index = 0; index < shipments.length; index++) {
        state.shipments1.push({ Id: shipments[index].id, Date: shipments[index].date, Nomenclature: shipments[index].name_of_numenclature, Weight: shipments[index].shipped_with_adjustments })
      }
    },
    SET_SHIPMENTS2: (state, shipments) => {
      state.shipments2.splice(0)
      for (let index = 0; index < shipments.length; index++) {
        state.shipments2.push({ Id: shipments[index].id, Date: shipments[index].date, Nomenclature: shipments[index].name_of_numenclature, Weight: shipments[index].shipped_with_adjustments })
      }
    },
    SET_SHIPMENTS1_GROUP: (state, shipments) => {
      state.shipments1_group.splice(0)
      const value = Object.values(shipments)
      value.forEach(element => {
        state.shipments1_group.push(element)
      })
    },
    SET_SHIPMENTS2_GROUP: (state, shipments) => {
      state.shipments2_group.splice(0)
      const value = Object.values(shipments)
      value.forEach(element => {
        state.shipments2_group.push(element)
      })
    },
    SET_INFO: (state, info) => {
      state.info.splice(0)
      for (let index = 0; index < info.length; index++) {
        state.info.push({
          Id: info[index].id,
          Date: info[index].date,
          InnerN: info[index].innerN,
          Problem: info[index].problem,
          Temp: info[index].temp,
          Status: info[index].status,
          Answer: info[index].answer,
          Photos: info[index].photos
        })
      }
    },
    CLEAR_INFO: (state) => {
      state.info.splice(0)
    },
    CLEAR_ATTORNEY: (state) => {
      state.attorney.splice(0)
    },
    CLEAR_SHIPMENTS: (state) => {
      state.shipments1.splice(0)
      state.shipments2.splice(0)
      state.shipments1_group.slice(0)
      state.shipments2_group.slice(0)
    },
    SET_CERTIFICATE: (state, certificate) => {
      state.certificate.splice(0)
      for (let index = 0; index < certificate.length; index++) {
        state.certificate.push({ url: certificate[index], isOpen: false })
      }
    },
    CLEAR_CERTIFICATE: (state) => {
      state.certificate.splice(0)
    },
    SET_CONTRACT: (state, contract) => {
      state.contract.splice(0)
      for (let index = 0; index < contract.length; index++) {
        state.contract.push({ url: contract[index] })
      }
    },
    CLEAR_CONTRACT: (state) => {
      state.contract.splice(0)
    },
    SET_RETURN: (state, returnDocument) => {
      state.returnDocument.splice(0)
      for (let index = 0; index < returnDocument.length; index++) {
        state.returnDocument.push({ url: returnDocument[index] })
      }
    },
    CLEAR_RETURN: (state) => {
      state.returnDocument.splice(0)
    },
    SET_RECEIPT: (state, receipt) => {
      state.receipt.splice(0)
      for (let index = 0; index < receipt.length; index++) {
        state.receipt.push({ url: receipt[index] })
      }
    },
    CLEAR_RECEIPT: (state) => {
      state.receipt.splice(0)
    },
    MUTATE_SIDEBAR: (state) => {
      state.sidebar.is_open = !state.sidebar.is_open
    },
    MUTATE_THEME: (state) => {
      state.theme.is_light = !state.theme.is_light
      localStorage.setItem('is_light', state.theme.is_light)
    },
    FALSE_SIDEBAR: (state) => {
      state.sidebar.is_open = true
    },
    SET_USER_ACCEPTION: (state) => {
      state.user.Acception = true
      localStorage.setItem('userAcception', '1')
    }
  },
  actions: {
    async LOGIN ({ dispatch, commit }, formData) {
      if (localStorage.getItem('userIsActive')) {
        router.push('/')
      } else {
        await axios.get('https://smaip.ru/lk/b24/handler.php', { params: { formData } })
          .then((response) => {
            commit('SET_USER_DATA', response.data.user)
            if (response.data.user.ISACTIVE) {
              commit('SET_MANAGER_DATA', response.data.manager)
              commit('SET_COMPANY_DATE', response.data.company)
              dispatch('GET_COMPANY', this.getters.COMPANY)
              commit('SET_LOCAL_STORAGE')
              router.push('/')
            } else {
              return Promise.resolve(2)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    async GET_COMPANY ({ commit }, formData) {
      const temp = []
      for (let index = 0; index < formData.length; index++) {
        temp.push(formData[index].Id)
      }
      const temp2 = {
        Steps: '2',
        data: temp
      }
      formData = temp2
      await axios.get('https://smaip.ru/lk/b24/handler.php', { params: { formData } })
        .then((response) => {
          commit('UPDATE_COMPANY_DATA', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async GET_COMPANY_USER ({ commit }, formData) {
      const temp = {
        Steps: '3',
        data: formData.Id
      }
      formData = temp
      await axios.get('https://smaip.ru/lk/b24/handler.php', { params: { formData } })
        .then((response) => {
          commit('SET_COMPANY_DATE', response.data.company)
          commit('UPDATE_COMPANY_DATA', response.data.company_detail)
          if (this.state.currentObject.CompanyId === null || this.state.currentObject.CompanyId === 0) {
            commit('SET_CURRENT_OBJECT', this.state.company[0].Id)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async GET_ATTORNEY ({ commit }, formData) {
      const temp = {
        Steps: '4',
        data: formData
      }
      formData = temp
      await axios.get('https://smaip.ru/lk/b24/handler.php', { params: { formData } })
        .then((response) => {
          commit('SET_ATTORNEY', response.data.attorney)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async GET_SHIPMENTS ({ commit }, formData) {
      const temp = {
        Steps: '5',
        data: formData
      }
      formData = temp
      await axios.get('https://smaip.ru/lk/b24/handler.php', { params: { formData } })
        .then((response) => {
          commit('SET_SHIPMENTS1_GROUP', response.data.shipments1_group)
          commit('SET_SHIPMENTS2_GROUP', response.data.shipments2_group)
        })
        .catch((error) => {
          console.log(error)
        })
      return 'done'
    },
    async GET_INFO ({ commit }, formData) {
      const temp = {
        Steps: '20',
        data: formData
      }
      formData = temp
      await axios.get('https://smaip.ru/lk/b24/handler.php', { params: { formData } })
        .then((response) => {
          commit('SET_INFO', response.data.info)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async SET_INFO ({ dispatch, commit }, formData) {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      await axios.post('https://smaip.ru/lk/b24/handler.php', formData, config)
        .then((response) => {
          if (response.data.message === '0') {
            dispatch('GET_INFO', response.data.CompanyId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async CLOSE_INFO ({ dispatch, commit }, formData) {
      await axios.post('https://smaip.ru/lk/b24/handler.php', formData)
        .then((response) => {
          if (response.data.message === '0') {
            dispatch('GET_INFO', response.data.CompanyId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async GET_CERTIFICATE ({ commit }, formData) {
      const temp = {
        Steps: '6',
        data: formData
      }
      formData = temp
      await axios.get('https://smaip.ru/lk/b24/handler.php', { params: { formData } })
        .then((response) => {
          commit('SET_CERTIFICATE', response.data.certificate)
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    async SET_CERTIFICATE ({ dispatch, commit }, formData) {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      await axios.post('https://smaip.ru/lk/b24/handler.php', formData, config)
        .then((response) => {
          if (response.data.message === 0) {
            dispatch('GET_CERTIFICATE', response.data.dealId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async GET_CONTRACT ({ commit }, formData) {
      const temp = {
        Steps: '8',
        data: formData
      }
      formData = temp
      await axios.get('https://smaip.ru/lk/b24/handler.php', { params: { formData } })
        .then((response) => {
          commit('SET_CONTRACT', response.data.contract)
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    async SET_CONTRACT ({ dispatch, commit }, formData) {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      await axios.post('https://smaip.ru/lk/b24/handler.php', formData, config)
        .then((response) => {
          if (response.data.message === 0) {
            dispatch('GET_CONTRACT', response.data.dealId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async GET_RETURN ({ commit }, formData) {
      const temp = {
        Steps: '18',
        data: formData
      }
      formData = temp
      await axios.get('https://smaip.ru/lk/b24/handler.php', { params: { formData } })
        .then((response) => {
          commit('SET_RETURN', response.data.returnDocument)
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    async SET_RETURN ({ dispatch, commit }, formData) {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      await axios.post('https://smaip.ru/lk/b24/handler.php', formData, config)
        .then((response) => {
          if (response.data.message === 0) {
            dispatch('GET_RETURN', response.data.dealId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async GET_RECEIPT ({ commit }, formData) {
      const temp = {
        Steps: '19',
        data: formData
      }
      formData = temp
      await axios.get('https://smaip.ru/lk/b24/handler.php', { params: { formData } })
        .then((response) => {
          commit('SET_RECEIPT', response.data.receipt)
          return true
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },
    async SET_RECEIPT ({ dispatch, commit }, formData) {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      await axios.post('https://smaip.ru/lk/b24/handler.php', formData, config)
        .then((response) => {
          if (response.data.message === 0) {
            dispatch('GET_RECEIPT', response.data.shopId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    LOGOUT ({ commit }) {
      commit('CLEAR_USER_DATA')
      commit('CLEAR_MANAGER_DATA')
      commit('CLEAR_COMPANY_DATA')
      commit('CLEAR_CURRENT_OBJECT')
      localStorage.clear()
    },
    SET_CURRENTOBJECT ({ commit }, id) {
      commit('SET_CURRENT_OBJECT', id)
    },
    CLEAR_ATTORNEY ({ commit }) {
      commit('CLEAR_ATTORNEY')
    },
    CLEAR_SHIPMENTS ({ commit }) {
      commit('CLEAR_SHIPMENTS')
    },
    CLEAR_INFO ({ commit }) {
      commit('CLEAR_INFO')
    },
    CLEAR_CERTIFICATE ({ commit }) {
      commit('CLEAR_CERTIFICATE')
    },
    CLEAR_CONTRACT ({ commit }) {
      commit('CLEAR_CONTRACT')
    },
    CLEAR_RETURN ({ commit }) {
      commit('CLEAR_RETURN')
    },
    CLEAR_RECEIPT ({ commit }) {
      commit('CLEAR_RECEIPT')
    },
    SET_SIDEBAR ({ commit }) {
      commit('MUTATE_SIDEBAR')
    },
    CLOSE_SIDEBAR ({ commit }) {
      commit('FALSE_SIDEBAR')
    },
    SET_THEME ({ commit }) {
      commit('MUTATE_THEME')
    },
    SET_ACCEPTION ({ commit }) {
      commit('SET_USER_ACCEPTION')
    }
  },
  getters: {
    USER (state) {
      return state.user
    },
    IS_ACTIVE (state) {
      return state.user.IsActive
    },
    MANAGER (state) {
      return state.manager
    },
    COMPANY (state) {
      return state.company
    },
    PHOTO (state) {
      return state.photo
    },
    INVOICES (state) {
      return state.invoices
    },
    CURRENT_OBJECT (state) {
      return state.currentObject
    },
    ATTORNEY (state) {
      return state.attorney
    },
    SHIPMENTS1 (state) {
      return state.shipments1
    },
    SHIPMENTS2 (state) {
      return state.shipments2
    },
    SHIPMENTS1_GROUP (state) {
      return state.shipments1_group
    },
    SHIPMENTS2_GROUP (state) {
      return state.shipments2_group
    },
    INFO (state) {
      return state.info
    },
    CERTIFICATE (state) {
      return state.certificate
    },
    CONTRACT (state) {
      return state.contract
    },
    RETURN (state) {
      return state.returnDocument
    },
    RECEIPT (state) {
      return state.receipt
    },
    SIDEBAR (state) {
      return state.sidebar.is_open
    },
    THEME (state) {
      return state.theme.is_light
    }
  },
  modules: {
  }
})
