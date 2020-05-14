<template>
	<div style="height: 600px; width: 100%">
		<Highcharts ref="highcharts" class="stock" :options="treeOptions" style="height: 600px; width: 100%"></Highcharts>
	</div>
</template>

<script>
	import api from "@/api"
	import moment from "moment"

	export default {
		name: "ItemPriceChart",
		data() {
			return {
				priceData: [[10000000, 0, 0, 0, 0]],
				chart: null,
				treeOptions: {
					title: {
						text: "Guild Wars 2 item distribution by type"
					},
					subtitle: {
						text: 'Source: <a href="https://api.guildwars2.com/">gw2tp.com</a>'
					},
					series: []
				}
			}
		},
		props: {
			id: String
		},
		mounted() {
			this.priceData = api.getItemTypes()
			this.treeOptions.series = [
				{
					type: "treemap",
					layoutAlgorithm: 'stripes',
					alternateStartingDirection: true,
					levels: [{
						level: 1,
						layoutAlgorithm: 'sliceAndDice',
						dataLabels: {
							enabled: true,
							align: 'left',
							verticalAlign: 'top',
							style: {
								fontSize: '15px',
								fontWeight: 'bold'
							}
						}
					}],
					data: this.priceData
				}
			]
		},
		computed: {
			buyPrice() {
				return this.getData(this.priceData, 2);
			},
			buyQuantity() {
				return this.getData(this.priceData, 4);
			},
			sellPrice() {
				return this.getData(this.priceData, 1);
			},
			sellQuantity() {
				return this.getData(this.priceData, 3);
			}
		},
		methods: {
			getData(data, index) {
				let output = [];
				let isEmpty = true;
				data.forEach(function (b) {
					if (b[index] != null) {
						isEmpty = false;
					}
					output.push([moment.utc(b[0]).valueOf(), b[index]]);
				});
				if (isEmpty) {
					return [];
				}
				return output;
			}
		}
	}
</script>

<style scoped>
	/*.stock {*/
	/*	height: 600px;*/
	/*	width: 100%*/
	/*}*/
</style>