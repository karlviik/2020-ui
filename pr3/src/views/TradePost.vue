<template>
	<div class="container">

		<b-container fluid class="pt-4">
			<!-- User Interface controls -->
			<b-row class="justify-content-center">
				<b-col sm="8" md="4">
					<b-form-group>
						<b-input-group>
							<b-form-input v-model="searchParams.searchString" @keyup.enter.native="performFind" type="text" placeholder="Search..."/>
							<b-button class="btn-warning" @click="performFind">Go!</b-button>
						</b-input-group>
					</b-form-group>
				</b-col>

				<b-col sm="4" md="2">
					<b-form-group>
						<b-button class="btn-secondary w-100" @click="showFilters = !showFilters">Filters</b-button>
					</b-form-group>
				</b-col>

				<b-col sm="5" md="3">
					<b-form-group v-if="showFilters">
						<b-form-select v-model="searchParams.rarity" :options="rarityFilterOptions">
							<template v-slot:first>
								<option selected :value="''">Rarity...</option>
							</template>
						</b-form-select>
					</b-form-group>
				</b-col>

				<b-col sm="7" md="3">
					<b-form-group v-if="showFilters">
						<b-form-select v-model="searchParams.category" :options="categoryFilterOptions">
							<template v-slot:first>
								<option selected :value="''">Category...</option>
							</template>
						</b-form-select>
					</b-form-group>
				</b-col>

				<b-col sm="6" md="4" v-if="showFilters">
					<b-form-group label="Level" label-cols="4">
						<b-row>
							<b-col class="px-2">
								<b-input type="number" class="text-center" placeholder="Min" v-model.number="searchParams.minLevel"/>
							</b-col>
							<b-col class="px-2">
								<b-input type="number" class="text-center" placeholder="Max" v-model.number="searchParams.maxLevel"/>
							</b-col>
						</b-row>
					</b-form-group>
				</b-col>

				<b-col sm="6" md="4" v-if="showFilters">
					<b-form-group label="Buy" label-cols="4">
						<b-row>
							<b-col class="px-2" id="minbuy">
								<b-input type="number" class="text-center" placeholder="Min" v-model.number="searchParams.minBuy"/>
							</b-col>
							<b-popover target="minbuy" triggers="hover" placement="top">
								<template v-slot:title>
									<div class="text-dark" v-html='priceFormatter(searchParams.minBuy, false)'></div>
								</template>
							</b-popover>
							<b-col class="px-2" id="maxbuy">
								<b-input type="number" class="text-center" placeholder="Max" v-model.number="searchParams.maxBuy"/>
							</b-col>
							<b-popover target="maxbuy" triggers="hover" placement="top">
								<template v-slot:title>
									<div class="text-dark" v-html='priceFormatter(searchParams.maxBuy, false)'></div>
								</template>
							</b-popover>
						</b-row>
					</b-form-group>
				</b-col>

				<b-col sm="6" md="4" v-if="showFilters">
					<b-form-group label="Sell" label-cols="4">
						<b-row>
							<b-col class="px-2" id="minsell">
								<b-input type="number" class="text-center" placeholder="Min" v-model.number="searchParams.minSell"/>
							</b-col>
							<b-popover target="minsell" triggers="hover" placement="top">
								<template v-slot:title>
									<div class="text-dark" v-html='priceFormatter(searchParams.minSell, false)'></div>
								</template>
							</b-popover>
							<b-col class="px-2" id="maxsell">
								<b-input type="number" class="text-center" placeholder="Max" v-model.number="searchParams.maxSell"/>
							</b-col>
							<b-popover target="maxsell" triggers="hover" placement="top">
								<template v-slot:title>
									<div class="text-dark" v-html='priceFormatter(searchParams.maxSell, false)'></div>
								</template>
							</b-popover>
						</b-row>
					</b-form-group>
				</b-col>

				<b-col sm="6" md="4" v-if="showFilters">
					<b-form-group label="Demand" label-cols="4">
						<b-row>
							<b-col class="px-2">
								<b-input type="number" class="text-center" placeholder="Min" v-model.number="searchParams.minDemand"/>
							</b-col>
							<b-col class="px-2">
								<b-input type="number" class="text-center" placeholder="Max" v-model.number="searchParams.maxDemand"/>
							</b-col>
						</b-row>
					</b-form-group>
				</b-col>

				<b-col sm="6" md="4" v-if="showFilters">
					<b-form-group label="Supply" label-cols="4">
						<b-row>
							<b-col class="px-2">
								<b-input type="number" class="text-center" placeholder="Min" v-model.number="searchParams.minSupply"/>
							</b-col>
							<b-col class="px-2">
								<b-input type="number" class="text-center" placeholder="Max" v-model.number="searchParams.maxSupply"/>
							</b-col>
						</b-row>
					</b-form-group>
				</b-col>

				<b-col sm="6" md="4" v-if="showFilters">
					<b-form-group label="Profit" label-cols="4">
						<b-row>
							<b-col class="px-2" id="minprofit">
								<b-input type="number" class="text-center" placeholder="Min" v-model.number="searchParams.minProfit"/>
							</b-col>
							<b-popover target="minprofit" triggers="hover" placement="top">
								<template v-slot:title>
									<div class="text-dark" v-html='priceFormatter(searchParams.minProfit, false)'></div>
								</template>
							</b-popover>
							<b-col class="px-2" id="maxprofit">
								<b-input type="number" class="text-center" placeholder="Max" v-model.number="searchParams.maxProfit"/>
							</b-col>
							<b-popover target="maxprofit" triggers="hover" placement="top">
								<template v-slot:title>
									<div class="text-dark" v-html='priceFormatter(searchParams.maxProfit, false)'></div>
								</template>
							</b-popover>
						</b-row>
					</b-form-group>
				</b-col>

				<b-col sm="6" md="4" v-if="showFilters">
					<b-form-group label="ROI" label-cols="4">
						<b-row>
							<b-col class="px-2">
								<b-input type="number" class="text-center" placeholder="Min%" v-model.number="searchParams.minRoi"/>
							</b-col>
							<b-col class="px-2">
								<b-input type="number" class="text-center" placeholder="Max%" v-model.number="searchParams.maxRoi"/>
							</b-col>
						</b-row>
					</b-form-group>
				</b-col>
			</b-row>

			<b-row class="justify-content-center" v-if="showFilters">
				<b-col md="6">
					<b-button class="btn-warning w-100" @click="performFind">Search!</b-button>
				</b-col>
			</b-row>


			<b-row class="mt-3 mb-2">
				<b-col class="my-1">
					<b-pagination
							v-model="currentPage"
							:total-rows="totalRows"
							:per-page="perPage"
							align="fill"
							size="sm"
							class="my-0"
					></b-pagination>
				</b-col>
			</b-row>

			<!-- Main table element -->
			<b-table
					show-empty
					small
					fixed
					stacked="md"
					:items="items"
					:fields="tableFields"
					:current-page="currentPage"
					:per-page=perPage
					@row-clicked="rowClickHandler"
					class="text-light bg-dark"
			>
				<template v-slot:cell(name)="row">
					<div class="text-left" v-html="nameFieldFormatter(row.item.icon, row.item.name)"></div>
				</template>

				<template v-slot:cell(buy)="row">
					<div v-html="priceFormatter(row.value, false)"></div>
				</template>

				<template v-slot:cell(sell)="row">
					<div v-html="priceFormatter(row.value, false)"></div>
				</template>

				<template v-slot:cell(profit)="row">
					<div v-html="priceFormatter(row.value, true)"></div>
				</template>


			</b-table>

			<b-row>
				<b-col class="my-1">
					<b-pagination
							v-model="currentPage"
							:total-rows="totalRows"
							:per-page="perPage"
							align="fill"
							size="sm"
							class="my-0"
					></b-pagination>
				</b-col>
			</b-row>
		</b-container>

	</div>

</template>

<script>
	import api from "@/api/"
	import utils from "@/utils"

	export default {
		name: "TradePost",
		data() {
			return {
				showFilters: false,
				rarityFilterOptions: [
					{text: 'Junk', value: 'Junk'},
					{text: 'Basic', value: 'Basic'},
					{text: 'Fine', value: 'Fine'},
					{text: 'Masterwork', value: 'Masterwork'},
					{text: 'Rare', value: 'Rare'},
					{text: 'Exotic', value: 'Exotic'},
					{text: 'Ascended', value: 'Ascended'},
					{text: 'Legendary', value: 'Legendary'}
				],
				categoryFilterOptions: [
					{text: 'Weapon', value: 'Weapon'},
					{text: 'Armor', value: 'Armor'},
					{text: 'Bag', value: 'Bag'},
					{text: 'Consumable', value: 'Consumable'},
					{text: 'Container', value: 'Container'},
					{text: 'Crafting Material', value: 'CraftingMaterial'}
				],
				searchParams: {
					searchString: null,
					rarity: "",
					category: "",
					minLevel: null,
					maxLevel: null,
					minBuy: null,
					maxBuy: null,
					minSell: null,
					maxSell: null,
					minDemand: null,
					maxDemand: null,
					minSupply: null,
					maxSupply: null,
					minProfit: null,
					maxProfit: null,
					minRoi: null,
					maxRoi: null
				},
				tableFields: [
					{key: 'name', label: 'Name', sortable: true, sortDirection: 'desc', class: 'text-center'},
					{key: 'buy', label: 'Buy', sortable: true},
					{key: 'sell', label: 'Sell', sortable: true},
					{key: 'profit', label: 'Profit', sortable: true},
					{
						key: 'roi', label: 'ROI', sortable: true, formatter: (val) => {
							return Math.round(val * 1000) / 10 + '%'
						}
					},
					{key: 'demand', label: 'Demand', sortable: true},
					{key: 'supply', label: 'Supply', sortable: true}
				],
				items: [],
				currentPage: 1,
				perPage: 20,
			}
		},
		computed: {
			totalRows() {
				return this.items.length
			}
		},
		mounted() {
		},
		methods: {
			priceFormatter(coins, color) {
				return utils.priceFormatter(coins, color)
			},
			nameFieldFormatter(picUrl, name) {
				return utils.nameFieldFormatter(picUrl, name)
			},
			performFind() {
				this.items = api.searchWithParams(this.searchParams)
				this.currentPage = 1
			},
			rowClickHandler(record) {
				this.$router.push({name: 'Item', params: {id: record.id}})
			}
		}
	}
</script>

<style scoped>
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type=number] {
		-moz-appearance: textfield;
	}

</style>