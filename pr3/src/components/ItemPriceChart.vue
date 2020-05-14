<template>
	<div style="height: 600px; width: 100%">
		<Highstock ref="highcharts" class="stock" :options="stockOptions" style="height: 600px; width: 100%"></Highstock>
	</div>
</template>

<script>
	// eslint-disable-next-line no-unused-vars
	import api from "@/api"
	// eslint-disable-next-line no-unused-vars
	import utils from "@/utils"
	import moment from "moment"
	import highcharts from 'highcharts'

	export default {
		name: "ItemPriceChart",
		data() {
			return {
				priceData: [[10000000, 0, 0, 0, 0]],
				chart: null,
				stockOptions: {
					rangeSelector: {
						selected: 1
					},
					tooltip: {
						shared: true,
						split: false,
						useHTML: true,
						// taken from gw2tp.com
						formatter: function () {
							let p = this.points[0];
							let output = ['<small>', moment(p.x).format('llll'), '</small><table>'];
							this.points.forEach(function (point) {
								let series = point.series;
								let isCoins = series.options.currency === 'coins';
								let align = isCoins ? '' : 'text-align:left;';
								let y;
								let yRaw = point.y.toFixed(0);
								y = isCoins ? utils.currencyFormatter(yRaw) : highcharts.numberFormat(yRaw, 0);
								output.push('<tr><td style="color:' + series.color + '">' + series.name + '</td> <td style="' + align + '"><b>' + y + '</b></td></tr>');
							});
							output.push('</table>');
							return output.join('');
						},
						valueDecimals: 0,
						dateTimeLabelFormats: {
							millisecond: '%A, %b %e, %H:%M'
						}
					},
					title: {
						text: "Historic supply, demand and prices"
					},
					subtitle: {
						text: 'Source: <a href="https://gw2tp.com/">gw2tp.com</a>'
					},
					yAxis: [
						{
							labels: {
								align: 'right',
								useHTML: true,
								formatter: function () {
									return utils.currencyFormatterBool(this.value, true);
								}
							},
							title: {
								text: 'Price'
							},
							startOnTick: false,
							endOnTick: false,
							height: '60%',
							lineWidth: 2,
							resize: {
								enabled: true
							}
						}, {
							labels: {
								align: 'right',
								x: -3
							},
							title: {
								text: 'Volume'
							},
							top: '65%',
							height: '35%',
							offset: 0,
							lineWidth: 2
						}
					],
					xAxis: {
						type: 'datetime',
						ordinal: false
					},
					legend: {
						enabled: true,
						verticalAlign: 'bottom'
					},
					scrollbar: {
						enabled: true,
						liveRedraw: true
					},
					time: {
						useUTC: false
					},
					series: []
				}
			}
		},
		props: {
			id: String
		},
		mounted() {
			this.priceData = api.getItemHistoricData(this.id)
			this.stockOptions.series = [
				{
					type: "line",
					name: "TP Sell",
					data: this.sellPrice,
					currency: 'coins',
					showInNavigator: true,
					color: '#ce6c6c',
					yAxis: 0
				}, {
					type: "line",
					name: "TP Buy",
					data: this.buyPrice,
					currency: 'coins',
					showInNavigator: true,
					color: '#3b3d99',
					yAxis: 0
				}, {
					type: "line",
					name: "Supply",
					data: this.sellQuantity,
					showInNavigator: false,
					color: '#9a8f4c',
					yAxis: 1
				}, {
					type: "line",
					name: "Demand",
					data: this.buyQuantity,
					showInNavigator: false,
					color: '#9b5ead',
					yAxis: 1,
					visible: false
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