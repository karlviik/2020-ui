<template>
	<b-container class="text-light">

		<header class="mb-3 mt-5 pt-5 pb-2 text-warning">
			<div class="container d-flex justify-content-center">
				<div class="row align-items-center">
					<h1 class="display-4 text-center">Statistics</h1>
				</div>
			</div>
		</header>

		<b-row class="row pb-3 pt-2 mb-4 --chart-small">
			<statistics-gem-price class="col-12"/>
		</b-row>
		<b-row class="row pb-3 pt-2 mb-4 --chart">
			<statistics-item-type-area-chart class="col-12"/>
		</b-row>
		<b-row class="row pb-4 pt-2 mb-4 --chart">
			<statistics-buy-demand-scatterplot class="col-12 mb-5 pb-5"/>
		</b-row>
		<div class="pb-4 pt-2"><p>That's it, folks!</p></div>

	</b-container>
</template>

<script>
	import api from "@/api"
	import utils from "@/utils"
	import StatisticsGemPrice from "@/components/StatisticsGemPrice";
	import StatisticsItemTypeAreaChart from "@/components/StatisticsItemTypeAreaChart";
	import StatisticsBuyDemandScatterplot from "@/components/StatisticsBuyDemandScatterplot";

	export default {
		name: "Item",
		// eslint-disable-next-line vue/no-unused-components
		components: {StatisticsGemPrice, StatisticsItemTypeAreaChart, StatisticsBuyDemandScatterplot},
		data() {
			return {
				item: {
					name: String,
					icon: String,
					category: String,
					rarity: String,
					level: Number,
					buy: Number,
					sell: Number,
					roi: Number,
					profit: Number,
					supply: Number,
					demand: Number
				},
				investmentOptions: {
					quantity: 1,
					price: 0,
					category: "",
					date: new Date().toISOString().slice(0, 10)
				},
				itemListings: {

				},
				investmentCategoryOptions: Array(String),
				buyFields: [
					{key: 'unit_price', label: 'Buy'},
					{key: 'quantity', label: 'Demand'},
					{key: 'listings', label: 'user'},
				],
				sellFields: [
					{key: 'unit_price', label: 'Sell'},
					{key: 'quantity', label: 'Supply'},
					{key: 'listings', label: 'user'},
				],
			}
		},
		props: {
			id: String
		},
		computed: {
			realId() {
				return Number(this.id)
			}
		},
		mounted() {
			this.item = api.getItemInfo(this.realId)
			this.itemListings = api.getItemListings(this.realId)
			this.investmentCategoryOptions = this.$store.getters.categories
		},
		methods: {
			priceFormatter(coins, color) {
				return utils.priceFormatter(coins, color)
			},
			percentageFormatter(roi, color) {
				return utils.percentageFormatter(roi, color)
			},
			invest() {
				if (typeof this.investmentOptions.quantity !== 'number' || typeof this.investmentOptions.price !== 'number' || this.investmentOptions.quantity < 1) {
					this.$notify({
						group: 'foo',
						title: 'Error',
						type: 'error',
						text: 'Wrong input, please fix, thanks.'
					})
					return
				}
				if (this.investmentOptions.category === '__new') {
					let newCatName = prompt('Please enter new category name')
					if (newCatName == null) {
						this.$notify({
							group: 'foo',
							title: 'Error',
							type: 'error',
							text: 'No category name inserted!'
						})
						return
					}
					this.$store.dispatch('createCategory', newCatName)
					this.investmentOptions.category = newCatName
				}

				this.$store.dispatch('addInvestment', {
					itemId: Number(this.realId),
					quantity: Number(this.investmentOptions.quantity),
					price: Number(this.investmentOptions.price),
					date: this.investmentOptions.date,
					category: this.investmentOptions.category
				})
				this.$notify({
					group: 'foo',
					title: 'Success',
					type: 'success',
					text: 'Investment saved!'
				})
				this.investmentOptions.quantity = 0
				this.investmentOptions.price = 0
				this.investmentOptions.category = ""

			}
		}
	}

	// eslint-disable-next-line no-unused-vars
	function makeTableScroll() {
		// Constant retrieved from server-side via JSP
		let maxRows = 8;

		let table = document.getElementById('buyTable');
		let wrapper = table.parentNode;
		let rowsInTable = table.rows.length;
		let height = 0;
		if (rowsInTable > maxRows) {
			for (let i = 0; i < maxRows; i++) {
				height += table.rows[i].clientHeight;
			}
			wrapper.style.height = height + "px";
		}

		table = document.getElementById('sellTable');
		wrapper = table.parentNode;
		rowsInTable = table.rows.length;
		height = 0;
		if (rowsInTable > maxRows) {
			for (let i = 0; i < maxRows; i++) {
				height += table.rows[i].clientHeight;
			}
			wrapper.style.height = height + "px";
		}
	}
</script>

<style scoped lang="less">
	.--chart {
		height: 600px;
		width: 100%;
	}
	.--chart-small {
		height: 400px;
		width: 100%;
	}
</style>