<template>
	<div style="height: 400px; width: 100%">
		<Highstock ref="highcharts" :options="historicGemPriceOptions" style="height: 400px; width: 100%"></Highstock>
	</div>
</template>

<script>
	import api from "@/api"
	import moment from 'moment'
	// eslint-disable-next-line no-unused-vars
	import utils from '@/utils'
	import highcharts from 'highcharts'

	export default {
		name: "StatisticsGemPrice",
		data() {
			return {
				gemPrices: [],
				historicGemPriceOptions: {
					title: {
						text: 'Historic prices for 100 gems'
					},
					subtitle: {
						text: 'Source: <a href="https://gw2tp.com/">gw2tp.com</a>'
					},
					rangeSelector: {
						buttons: [
							{type: 'day', count: 3, text: '3d'},
							{type: 'week', count: 1, text: '1w'},
							{type: 'day', count: 30, text: '1m'},
							{type: 'all', text: 'All' }
						],
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
								let isCoins = true
								let align = isCoins ? '' : 'text-align:left;';
								let y;
								// eslint-disable-next-line no-unused-vars
								let yRaw = point.y.toFixed(0);
								y = isCoins ? utils.currencyFormatterBool(yRaw, true) : highcharts.numberFormat(yRaw, 0);
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

					xAxis: {
						minPadding: 0,
						maxPadding: 0,
						ordinal: true,
						title: {
							text: 'Price'
						}
					},
					yAxis: [
						{
							labels: {
								align: 'right',
								x: 18,
								useHTML: true,
								formatter: function () {
									return utils.currencyFormatterBool(this.value, true);
								}
							},
							lineWidth: 1,
							gridLineWidth: 1,
							currency: "coins",
							title: null,
							tickWidth: 1,
							tickLength: 5,
							tickPosition: 'inside',

						}
					],
					legend: {
						enabled: false
					},
					plotOptions: {
						area: {
							fillOpacity: 0.2,
							lineWidth: 1,
							step: 'center'
						}
					},
					series: []
				}
			}
		},
		computed: {},
		mounted() {
			this.gemPrices = api.getHistoricGemPrices()
			this.historicGemPriceOptions.series = [{
				name: '100 gems: ',
				data: this.gemPrices,
			}]
		}
	}
</script>

<style scoped>

</style>