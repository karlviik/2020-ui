import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    investmentIdThing: 100,
    investments: [
      {id: 1, itemId: 19746, quantity: 100, price: 6, buyDate: "2020-01-01", category: ""},
      {id: 2, itemId: 19746, quantity: 200, price: 21, buyDate: "2020-01-02", category: "Summer 2019"}
    ],
    pastInvestments: [
      {id: 3, itemId: 19746, quantity: 100, buyPrice: 452145, sellPrice: 666666, buyDate: "2020-01-01", sellDate: "2020-02-01", category: ""},
      {id: 4, itemId: 19746, quantity: 200, buyPrice: 21, sellPrice: 46354, buyDate: "2020-01-02", sellDate: "2020-03-01", category: "Halloween"}
    ]
  },
  mutations: {
    ADD_INVESTMENT_CATEGORY(state, categoryName) {
      state.categories.push({text: categoryName, value: categoryName})
    },
    REMOVE_INVESTMENT_CATEGORY(state, categoryName) {
      state.categories = state.categories.filter(x => x.text !== categoryName)
    },
    ADD_INVESTMENT(state, investment) {
      let itemId = investment.itemId
      let quantity = investment.quantity
      let price = investment.price
      let date = investment.date
      let category = investment.category
      state.investments.push({id: state.investmentIdThing, itemId: itemId, quantity: quantity, price: price, buyDate: date, category: category})
      state.investmentIdThing++
    },
    DELETE_INVESTMENT(state, investmentId) {
      state.investments = state.investments.filter(x => x.id !== investmentId)
    },
    MOVE_INVESTMENT_TO_PAST(state, investmentIn) {
      let investmentId = investmentIn.id
      let price = investmentIn.price
      let investment = state.investments.filter(x => x.id === investmentId)[0]
      state.investments = state.investments.filter(x => x.id !== investmentId)
      let pastInvestment = {
        id: investment.id,
        itemId: investment.itemId,
        quantity: investment.quantity,
        buyPrice: investment.price,
        sellPrice: price,
        buyDate: investment.buyDate,
        sellDate: new Date().toISOString().slice(0, 10),
        category: investment.category
      }
      state.pastInvestments.push(pastInvestment)
    },
    DELETE_PAST_INVESTMENT(state, investmentId) {
      state.pastInvestments = state.pastInvestments.filter(x => x.id !== investmentId)
    }
  },
  actions: {
    createCategory({ commit }, categoryName) {
      commit('ADD_INVESTMENT_CATEGORY', categoryName)
    },
    removeCategory({ commit }, categoryName) {
      commit('REMOVE_INVESTMENT_CATEGORY', categoryName)
    },
    addInvestment({ commit }, investment) {
      commit('ADD_INVESTMENT', investment)
    },
    deleteInvestment({ commit }, investmentId) {
      commit('DELETE_INVESTMENT', investmentId)
    },
    moveInvestmentToPast({ commit }, investment) {
      commit('MOVE_INVESTMENT_TO_PAST', investment)
    },
    deletePastInvestment({ commit }, investmentId) {
      commit('DELETE_PAST_INVESTMENT', investmentId)
    }
  },
  modules: {
  },
  getters: {
    categories: state => {
      return state.categories
    },
    investmentItemIds: state => {
      return new Set(state.investments.map(x => x.itemId))
    },
    pastInvestmentItemIds: state => {
      return new Set(state.pastInvestments.map(x => x.itemId))
    },
    pastInvestments: state => {
      return state.pastInvestments
    },
    investments: state => {
      return state.investments
    }
  }
})
