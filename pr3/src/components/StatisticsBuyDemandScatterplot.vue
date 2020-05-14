<template>
	<div style="height: 600px; width: 100%">
		<Highcharts ref="highcharts" class="stock" :options="scatterplotOptions" style="height: 600px; width: 100%"></Highcharts>
	</div>
</template>

<script>
	// eslint-disable-next-line no-unused-vars
	import api from "@/api"
	// eslint-disable-next-line no-unused-vars
	import utils from "@/utils"

	export default {
		name: "ItemPriceChart",
		data() {
			return {
				vsData: [[10000000, 0, 0, 0, 0]],
				chart: null,
				scatterplotOptions: {
					chart: {
						type: 'scatter',
						zoomType: 'xy'
					},
					title: {
						text: 'All tradable items supply VS demand'
					},
					subtitle: {
						text: 'Source: <a href="https://gw2tp.com/">gw2tp.com</a>'
					},
					legend: {
						enabled: false
					},
					xAxis: {
						title: {
							enabled: true,
							text: 'Supply'
						},
						type: "logarithmic",
						startOnTick: true,
						endOnTick: true,
						showLastLabel: true,
						min: 1
					},
					yAxis: {
						type: "logarithmic",
						title: {
							text: 'Demand'
						},
						min: 1
					},
					plotOptions: {
						scatter: {
							marker: {
								radius: 4,
								states: {
									hover: {
										enabled: true,
										lineColor: 'rgb(100,100,100)'
									}
								}
							},
							states: {
								hover: {
									marker: {
										enabled: false
									}
								}
							},
							tooltip: {
								headerFormat: null,
								pointFormat: '{point.x} supply, {point.y} demand'
							}
						}
					},
					series: []
				}
			}
		},
		mounted() {
			this.vsData = api.getSupplyVsDemand()
			this.scatterplotOptions.series = [
				{
					name: "Items",
					data: this.vsData,
				}
			]
		},
		computed: {
		},
		methods: {
		}
	}
</script>

<style scoped>
	/*.stock {*/
	/*	height: 600px;*/
	/*	width: 100%*/
	/*}*/
</style>