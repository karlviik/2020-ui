<template>

	<b-row class="my-3">
		<b-col class="border rounded text-nowrap flex-nowrap">
			<b-row class="border-bottom bg-warning text-dark">
				<b-col class="pl-0 text-left" v-html="nameFieldFormatterFromId(itemId)"/>
				<b-col class="align-items-center justify-content-center d-none d-md-flex px-1">
					<div v-html="'Buy: ' + priceFormatter(currentBuy, false)"/>
				</b-col>
				<b-col class="align-items-center justify-content-center px-1 d-flex">
					<div v-html="'Sell: ' + priceFormatter(currentSell, false)"/>
				</b-col>
				<b-col class="align-items-center justify-content-center d-none d-lg-flex">
					<div v-html="'Profit: ' + priceFormatter(currentProfit, true)"/>
				</b-col>
				<div class="align-items-center justify-content-center col col-2 d-flex">
					<div v-html="'ROI: ' + roiFormatter(currentRoi, true)"/>
				</div>
			</b-row>

			<b-row>
				<b-col class="px-0 table-responsive mb-0">
					<table class="table table-sm table-dark text-center mb-0">
						<tbody>
						<tr>
							<td class="h6 small">Date</td>
							<td class="h6 small">Quantity</td>
							<td class="h6 small">Investment price</td>
							<td class="h6 small">Value</td>
							<td class="h6 small">Profit per</td>
							<td class="h6 small">Profit total</td>
							<td class="h6 small">ROI</td>
							<td rowspan="2" class="border-bottom border-warning align-middle">
								<b-row class="h5 mx-auto mb-0">
									<b-col class="px-0">
										<font-awesome-icon icon="arrow-alt-circle-down"/>
									</b-col>
									<b-col class="px-0" @click="sellAllInvestments()">
										<font-awesome-icon icon="arrow-alt-circle-up"/>
									</b-col>
									<b-col class="px-0" @click="() => {
										this.showList = false
										this.showGraph = !showGraph
									}">
										<font-awesome-icon icon="chart-line"/>
									</b-col>
									<b-col class="px-0" @click="() => {
										this.showList = !showList
										this.showGraph = false
									}">
										<font-awesome-icon v-if="showList" icon="angle-double-up"/>
										<font-awesome-icon v-else icon="angle-double-down"/>
									</b-col>
								</b-row>
							</td>
						</tr>
						<tr class="small">
							<td class="border-bottom border-warning text-dark">0000-00-00</td>
							<td class="border-bottom border-warning">{{listQuantityCalculator(investments)}}</td>
							<td class="border-bottom border-warning" v-html="smallPriceFormatter(listAverageBuyCalculator(investments), false)"/>
							<td class="border-bottom border-warning" v-html="smallPriceFormatter(currentSell * listQuantityCalculator(investments), false)"/>
							<td class="border-bottom border-warning" v-html="smallPriceFormatter(profitCalculator(listAverageBuyCalculator(investments), currentSell), false)"/>
							<td class="border-bottom border-warning" v-html="smallPriceFormatter(profitCalculator(listAverageBuyCalculator(investments), currentSell) * listAverageBuyCalculator(investments), true)"/>
							<td class="border-bottom border-warning" v-html="roiFormatter(roiCalculator(listAverageBuyCalculator(investments), currentSell), true)">55%</td>
						</tr>
						<tr class="small" v-for="investment in ifList(investments)" v-bind:key="investment.id">
							<td>{{ investment.buyDate }}</td>
							<td>{{ investment.quantity }}</td>
							<td v-html="smallPriceFormatter(investment.price, false)"/>
							<td v-html="smallPriceFormatter(investment.quantity * currentSell, false)"/>
							<td v-html="smallPriceFormatter(profitCalculator(investment.price, currentSell), true)"/>
							<td v-html="smallPriceFormatter(investment.quantity * profitCalculator(investment.price, currentSell), true)"/>
							<td v-html="roiFormatter(roiCalculator(investment.price, currentSell), true)"/>
							<td>
								<b-row class="h5 mx-auto mb-0">
									<b-col class="px-0" @click="sellInvestment(investment.id)">
										<font-awesome-icon icon="arrow-alt-circle-up"/>
									</b-col>
									<b-col class="px-0">
										<font-awesome-icon icon="edit"/>
									</b-col>
									<b-col class="px-0" @click="deleteInvestment(investment.id)">
										<font-awesome-icon icon="trash-alt"/>
									</b-col>
								</b-row>
							</td>
						</tr>
						</tbody>
					</table>
				</b-col>
			</b-row>
			<div class="d-none row px-0 d-none">
				<div class="col-12 px-0">
					<img src="assets/graph.png" class="w-100 img-fluid" alt="">
				</div>
			</div>
		</b-col>

		<b-modal
				:id="someHash"
				size="sm"
				ref="modal"
				title="Insert sell price"
				title-class="text-dark"
				dialog-class="text-dark"
				content-class="text-dark"
				@show="resetModal"
				@hidden="resetModal"
				@ok="handleOk"
		>
			<form ref="form" @submit.stop.prevent="handleSubmit">
				<b-form-group
						:state="priceState"
						label="Price"
						label-for="price-input"
						invalid-feedback="Please enter a valid price."
				>
					<b-form-input
							id="price-input"
							type="number"
							v-model="inputSellPrice"
							:state="priceState"
							required
					></b-form-input>
					<b-popover target="price-input" triggers="hover" placement="top">
						<template v-slot:title>
							<div class="text-dark" v-html='priceFormatter(inputSellPrice, false)'></div>
						</template>
					</b-popover>
				</b-form-group>
			</form>
		</b-modal>

	</b-row>
</template>

<script>
	import utils from "@/utils";
	import api from "@/api";

	export default {
		name: "InvestmentListing",
		data() {
			return {
				showList: false,
				showGraph: false,
				currentBuy: 0,
				currentSell: 0,
				currentProfit: 0,
				currentRoi: 0,
				inputSellPrice: null,
				priceState: null,
				toSellInvestments: [],
				someHash: ""
			}
		},
		props: ["itemId", "investments"],
		mounted() {
			this.someHash = makeid(10)
			let itemData = api.getItemInfo(this.itemId)
			this.currentBuy = itemData.buy
			this.currentSell = itemData.sell
			this.currentProfit = itemData.profit
			this.currentRoi = itemData.roi
		},
		methods: {
			listQuantityCalculator(list) {
				return list.map(x => x.quantity).reduce((a, b) => a + b, 0)
			},
			listAverageBuyCalculator(list) {
				return Math.round(this.listBuyCalculator(list) / this.listQuantityCalculator(list))
			},
			roiFormatter(roi, color) {
				return utils.percentageFormatter(roi, color)
			},
			bigPriceFormatter(coins, color) {
				return utils.bigPriceFormatter(coins, color)
			},
			smallPriceFormatter(coins, color) {
				return utils.smallPriceFormatter(coins, color)
			},
			priceFormatter(coins, color) {
				return utils.priceFormatter(coins, color)
			},
			nameFieldFormatterFromId(itemId) {
				let item = api.getItemInfo(itemId)
				return this.nameFieldFormatter(item.icon, item.name)
			},
			nameFieldFormatter(url, name) {
				return utils.nameFieldFormatter(url, name)
			},
			profitCalculator(buy, sell) {
				return utils.profitCalculator(buy, sell)
			},
			roiCalculator(buy, sell) {
				return utils.roiCalculator(buy, sell)
			},
			listBuyCalculator(list) {
				return list.map(x => x.quantity * x.price).reduce((a, b) => a + b, 0)
			},
			listSellCalculator(list) {
				return list.map(x => x.quantity * x.sellPrice).reduce((a, b) => a + b, 0)
			},
			listProfitCalculator(list) {
				return Math.round(this.listSellCalculator(list) * 0.85 - this.listBuyCalculator(list))
			},
			listRoiCalculator(list) {
				let buy = this.listBuyCalculator(list)
				buy = buy === 0 ? 1 : buy
				return Math.round(this.listProfitCalculator(list) * 1000 / buy) / 1000
			},
			onlyMatching(itemId) {
				return this.filteredPastInvestmentsCompiledList.filter(x => x.itemId === itemId)
			},
			deleteInvestment(investmentId) {
				this.$store.dispatch("deleteInvestment", investmentId)
			},
			sellAllInvestments() {
				this.toSellInvestments = this.investments.map(x => x.id)
				this.askPrice()
			},
			sellInvestment(id) {
				this.toSellInvestments = [id]
				this.askPrice()
			},
			askPrice() {
				console.log("hello")
				this.$root.$emit('bv::show::modal', this.someHash, '#modal')
			},
			ifList(list) {
				return this.showList ? list : []
			},
			checkFormValidity() {
				const valid = this.$refs.form.checkValidity()
				this.priceState = valid
				return valid
			},
			resetModal() {
				this.inputSellPrice = null
				this.priceState = null
			},
			handleOk(bvModalEvt) {
				// Prevent modal from closing
				bvModalEvt.preventDefault()
				// Trigger submit handler
				this.handleSubmit()
			},
			handleSubmit() {
				// Exit when the form isn't valid
				if (!this.checkFormValidity()) {
					return
				}
				this.startSelling()
				this.$nextTick(() => {
					this.$bvModal.hide('price-modal')
				})
			},
			startSelling() {
				this.toSellInvestments.forEach(x => {
					this.$store.dispatch("moveInvestmentToPast", {id: x, price: Number(this.inputSellPrice)})
				})
			}
		}
	}
	function makeid(length) {
		let result           = '';
		let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

</script>

<style scoped>

</style>