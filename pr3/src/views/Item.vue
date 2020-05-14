<template>
	<b-container class="text-light">

		<b-row class="px-3 align-items-center pt-3">
			<h2><img :src="item.icon" alt="" class="rounded mr-2">{{ item.name }}</h2>
		</b-row>

		<b-row>
			<b-col lg="6" xl="3" class="pr-lg-0 d-flex flex-column my-2">
				<h4>Info</h4>
				<b-container class="rounded border d-flex flex-column flex-fill">
					<b-row class="flex-fill">
						<b-col cols="5" class="text-left">Category</b-col>
						<b-col cols="7" class="text-right pl-0">{{item.category}}</b-col>
					</b-row>
					<b-row class="flex-fill">
						<b-col cols="5" class="text-left">Rarity</b-col>
						<b-col cols="7" class="text-right pl-0">{{ item.rarity }}</b-col>
					</b-row>
					<b-row class="flex-fill">
						<b-col cols="5" class="text-left">Level</b-col>
						<b-col cols="7" class="text-right pl-0">{{ item.level }}</b-col>
					</b-row>
					<b-row class="flex-fill">
						<b-col cols="5" class="text-left">Buy price</b-col>
						<b-col cols="7" class="text-right pl-0" v-html="priceFormatter(item.buy, false)"/>
					</b-row>
					<b-row class="flex-fill">
						<b-col cols="5" class="text-left">Sell price</b-col>
						<b-col cols="7" class="text-right pl-0" v-html="priceFormatter(item.sell, false)"/>
					</b-row>
					<b-row class="flex-fill">
						<b-col cols="5" class="text-left">Profit</b-col>
						<b-col cols="7" class="text-right pl-0" v-html="priceFormatter(item.profit, true)"/>
					</b-row>
					<b-row class="flex-fill">
						<b-col cols="5" class="text-left">ROI</b-col>
						<b-col cols="7" class="text-right pl-0" v-html="percentageFormatter(item.roi, true)"/>
					</b-row>
					<b-row class="flex-fill">
						<b-col cols="5" class="text-left">Demand</b-col>
						<b-col cols="7" class="text-right pl-0">{{ item.demand }}</b-col>
					</b-row>
					<b-row class="flex-fill">
						<b-col cols="5" class="text-left">Supply</b-col>
						<b-col cols="7" class="text-right pl-0">{{ item.supply }}</b-col>
					</b-row>
				</b-container>
			</b-col>

			<b-col lg="6" xl="3" class="pl-lg-0 d-flex flex-column my-2">
				<h4>Invest</h4>
				<b-container class="rounded border d-flex flex-column flex-fill">
					<b-row class="flex-fill align-items-center my-1">
						<b-col cols="5" class="text-left">Quantity</b-col>
						<b-col cols="7" class="text-right px-1">
							<b-input min="1" v-model.number="investmentOptions.quantity" type="number" class="text-center px-1 py-1"/>
						</b-col>
					</b-row>
					<b-row class="flex-fill align-items-center my-1">
						<b-col cols="5" class="text-left">
							<p class="my-0">Price</p>
						</b-col>
						<b-col cols="7" class="text-right px-1" id="popover-target-1">
							<b-input type="number" v-model.number="investmentOptions.price" min="0" class="text-center px-1 py-1"/>
						</b-col>
						<b-popover target="popover-target-1" triggers="hover" placement="top">
							<template v-slot:title>
								<div class="text-dark" v-html='priceFormatter(investmentOptions.price, false)'></div>
							</template>
						</b-popover>
					</b-row>
					<b-row class="flex-fill align-items-center my-1">
						<b-col cols="5" class="text-left">
							<p class="my-0">Category</p>
						</b-col>
						<b-col cols="7" class="px-1">
							<b-form-select class="text-center py-1 px-1" v-model="investmentOptions.category" :options="investmentCategoryOptions">
								<template v-slot:first>
									<option selected :value="''">-None-</option>
									<option :value="'__new'">-New-</option>
								</template>
							</b-form-select>
						</b-col>
					</b-row>
					<b-row class="flex-fill align-items-center my-1">
						<b-col cols="5" class="text-left">Date</b-col>
						<b-col cols="7" class="text-right px-1">
							<b-form-datepicker
									id="example-datepicker"
									v-model="investmentOptions.date"
									:max="new Date()"
									size="sm"
									class="text-center px-1 py-1"
									:date-format-options="{ year: 'numeric', month: 'short', day: '2-digit'}"
							></b-form-datepicker>
						</b-col>
					</b-row>
					<div class="row flex-fill justify-content-center my-1">
						<div class="col-7 text-left">
							<b-button @click="invest" class="btn-warning w-100">Invest!</b-button>
						</div>
					</div>
				</b-container>
			</b-col>

			<div class="col-lg-6 col-xl-3 pr-xl-0 text-center my-2">
				<b-table
					sticky-header="400px"
					hover
					dark
					small
					borderless
					show-empty
					empty-text="No buy orders."
					class="w-100 h-100 mb-0 bg-dark border text-light"
					:items = itemListings.buys
					:fields = buyFields
				>
					<!--eslint-disable-next-line vue/no-unused-vars-->
					<template v-slot:head(listings)="data">
						<font-awesome-icon icon="user"/>
					</template>

					<template v-slot:cell(unit_price)="data">
						<div v-html="priceFormatter(data.value, false)"></div>
					</template>
				</b-table>

			</div>
			<div class="col-lg-6 col-xl-3 text-center my-2">
				<b-table
						sticky-header="400px"
						hover
						dark
						small
						borderless
						show-empty
						empty-text="No sell orders."
						class="w-100 h-100 mb-0 bg-dark border text-light"
						:items = itemListings.sells
						:fields = sellFields
				>
					<!--eslint-disable-next-line vue/no-unused-vars-->
					<template v-slot:head(listings)="data">
						<font-awesome-icon icon="user"/>
					</template>

					<template v-slot:cell(unit_price)="data">
						<div v-html="priceFormatter(data.value, false)"></div>
					</template>
				</b-table>
			</div>

		</b-row>
		<b-row class="row pb-3 pt-2">
			<item-price-chart :id="id.toString()" class="col-12"/>
		</b-row>
		<b-row class="row pb-3 pt-2">
			<item-cumulative-chart :id="id.toString()"  class="col-12"/>
		</b-row>

	</b-container>
</template>

<script>
	import api from "@/api"
	import utils from "@/utils"
	import ItemPriceChart from "@/components/ItemPriceChart";
	import ItemCumulativeChart from "@/components/ItemCumulativeChart";

	export default {
		name: "Item",
		components: {ItemCumulativeChart, ItemPriceChart},
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

</style>