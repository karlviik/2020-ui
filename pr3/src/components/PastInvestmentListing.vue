<template>
	<b-row class="my-3">
		<b-col class="border rounded text-nowrap flex-nowrap">
			<b-row class="row border-bottom bg-warning text-dark flex-nowrap">
				<b-col class="pl-0" v-html="nameFieldFormatterFromId(itemId)"/>
				<b-col class="align-items-center justify-content-center small d-none d-sm-flex px-1">
					<div v-html="'Invested: ' + priceFormatter(listBuyCalculator(investments), false)"/>
				</b-col>
				<b-col class="align-items-center justify-content-center small col d-none d-lg-flex px-1 no-wrap">
					<div v-html="'Value: ' + priceFormatter(listSellCalculator(investments), false)"/>
				</b-col>
				<b-col class="align-items-center justify-content-center small d-none d-lg-flex">
					<div v-html="'Profit: ' + priceFormatter(listProfitCalculator(investments), true)"/>
				</b-col>
				<div class="d-flex align-items-center justify-content-center small col col-lg-1 px-0 text-center">
					<div v-html="'ROI: ' + roiFormatter(listRoiCalculator(investments), true)"/>
				</div>
				<div @click="showList = !showList" class="col col-1 px-0 d-flex justify-content-center align-items-center">
					<font-awesome-icon v-if="showList" icon="angle-double-up"/>
					<font-awesome-icon v-else icon="angle-double-down"/>
				</div>
			</b-row>
			<b-row v-if="showList">
				<b-col class="px-0 my-0 py-0 table-responsive">
					<table class="table table-sm table-dark text-center mb-0">
						<thead class="h6 small">
						<tr>
							<th scope="col">Bought date</th>
							<th scope="col">Sold date</th>
							<th scope="col">Quantity</th>
							<th scope="col">Investment price</th>
							<th scope="col">Value</th>
							<th scope="col">Profit per</th>
							<th scope="col">Profit total</th>
							<th scope="col">ROI</th>
							<th scope="col"></th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="investment in investments" class="small" v-bind:key="investment.id">
							<td class="">{{ investment.buyDate }}</td>
							<td class="">{{ investment.sellDate }}</td>
							<td class="">{{ investment.quantity }}</td>
							<td class="" v-html="smallPriceFormatter(investment.buyPrice, false)"/>
							<td class="" v-html="smallPriceFormatter(investment.sellPrice, false)"/>
							<td class="" v-html="smallPriceFormatter(profitCalculator(investment.buyPrice, investment.sellPrice), false)"/>
							<td class="" v-html="smallPriceFormatter(investment.quantity * (profitCalculator(investment.buyPrice, investment.sellPrice)), false)"/>
							<td class="" v-html="roiFormatter(roiCalculator(investment.buyPrice, investment.sellPrice), false)"/>
							<td class="" @click="deleteInvestment(investment.id)"><font-awesome-icon icon="trash-alt"/></td>
						</tr>
						</tbody>
					</table>
				</b-col>
			</b-row>
		</b-col>
	</b-row>
</template>

<script>
	import utils from "@/utils";
	import api from "@/api";

	export default {
		name: "PastInvestmentListing",
		data() {
			return {
				showList: false
			}
		},
		props: ["itemId", "investments"],
		methods: {
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
				return list.map(x => x.quantity * x.buyPrice).reduce((a, b) => a + b, 0)
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
				this.$store.dispatch("deletePastInvestment",investmentId)
			}
		}
	}
</script>

<style scoped>

</style>