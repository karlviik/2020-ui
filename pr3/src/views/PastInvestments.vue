<template>
	<div>

		<header class="mb-3 mt-5 pt-5 pb-2 text-warning">
			<b-container class="d-flex justify-content-center">
				<b-row class="align-items-center">
					<h1 class="display-4 text-center">Past investments</h1>
				</b-row>
			</b-container>
		</header>

		<!-- Page Content -->
		<b-container class="text-light">

			<b-row class="justify-content-center my-3">
				<b-col md="5" lg="4" class="mb-2 mb-0-md">
					<b-input-group>
						<label for="searchBox" class="col-4 col-form-label">Search</label>
						<b-col cols="8">
							<input id="searchBox" v-model="searchString" type="text" class="form-control text-center" placeholder="Search...">
						</b-col>
					</b-input-group>
				</b-col>
				<b-col md="5" lg="4">
					<b-input-group>
						<label class="col-4 col-form-label">Category</label>
						<b-col cols="8">
							<b-form-select class="text-center" v-model="searchCategory" :options="investmentCategoryOptions">
								<template v-slot:first>
									<option selected :value="''">-Any-</option>
								</template>
							</b-form-select>
						</b-col>
					</b-input-group>
				</b-col>
			</b-row>

			<b-row class="my-3">
				<b-col cols="6" md="3" class="h5">
					<b-row class="justify-content-center">Invested amount</b-row>
					<b-row class="justify-content-center" v-html="bigPriceFormatter(total.invested, false)"/>
				</b-col>
				<b-col cols="6" md="3" class="h5">
					<b-row class="justify-content-center">Total value</b-row>
					<b-row class="justify-content-center" v-html="bigPriceFormatter(total.value, false)"/>
				</b-col>
				<b-col cols="6" md="3" class="h5">
					<b-row class="justify-content-center">Total profit</b-row>
					<b-row class="justify-content-center" v-html="bigPriceFormatter(total.profit, false)"/>
				</b-col>
				<b-col cols="6" md="3" class="h5">
					<b-row class="justify-content-center">Total ROI</b-row>
					<b-row class="row justify-content-center" v-html="roiFormatter(total.roi, false)"/>
				</b-col>
			</b-row>

			<!-- Items -->
			<past-investment-listing
					v-for="itemId in new Set(filteredPastInvestmentsCompiledList.map(x => x.itemId))"
					:investments=onlyMatching(itemId)
					:item-id="itemId"
					v-bind:key="itemId"
			/>

		</b-container>
	</div>
</template>

<script>
	// eslint-disable-next-line no-unused-vars
	import api from "@/api";
	// eslint-disable-next-line no-unused-vars
	import utils from "@/utils";
	import PastInvestmentListing from "@/components/PastInvestmentListing";

	export default {
		name: "PastInvestments",
		components: {PastInvestmentListing},
		data() {
			return {
				searchString: "",
				searchCategory: "",
			}
		},
		mounted() {
		},
		computed: {
			investmentCategoryOptions: function() {
				return this.$store.getters.categories
			},
			allPastInvestments: function () {
				return this.$store.getters.pastInvestments
			},
			allPastInvestmentItemIdsNames: function() {
				return Array.from(this.$store.getters.pastInvestmentItemIds).map(x => {
					return {id: x, name: api.getItemInfo(x).name}
				})
			},
			filteredPastInvestments: function () {
				return this.allPastInvestments.filter(x => x.category.includes(this.searchCategory))
			},
			filteredPastInvestmentItemIdsNames: function () {
				return this.allPastInvestmentItemIdsNames.filter(x => x.name.toLowerCase().includes(this.searchString.toLowerCase()))
			},
			filteredPastInvestmentsCompiledList: function () {
				let list = this.filteredPastInvestments.filter(x => this.filteredPastInvestmentItemIdsNames.filter(y => y.id === x.itemId && y.name.toLowerCase().includes(this.searchString.toLowerCase())).length > 0)
				list.forEach(x => {
					x.name = api.getItemInfo(x.itemId).name
				})
				return list
			},
			total: function () {
				// {id: 3, itemId: 19746, quantity: 100, buyPrice: 452145, sellPrice: 666666, buyDate: "2020-01-01", sellDate: "2020-02-01", category: ""},
				let invested = this.filteredPastInvestmentsCompiledList.map(x => x.buyPrice * x.quantity).reduce((a, b) => a + b, 0)
				let value = this.filteredPastInvestmentsCompiledList.map(x => x.sellPrice * x.quantity).reduce((a, b) => a + b, 0)
				let profit = this.profitCalculator(invested, value)
				let roi = this.roiCalculator(invested, value)
				return {invested: invested, value: value, profit: profit, roi: roi}
			}
		},
		methods: {
			roiFormatter(roi, color) {
				return utils.percentageFormatter(roi, color)
			},
			bigPriceFormatter(coins, color) {
				return utils.bigPriceFormatter(coins, color)
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
			onlyMatching(itemId) {
				return this.filteredPastInvestmentsCompiledList.filter(x => x.itemId === itemId)
			}

		}
	}
</script>

<style scoped>

</style>