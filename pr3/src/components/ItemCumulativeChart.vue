<template>
	<div style="height: 400px; width: 100%">
		<Highcharts class="stock" :options="cumulativeOptions" style="height: 400px; width: 100%"></Highcharts>
	</div>
</template>

<script>
	import api from "@/api"
	import utils from "@/utils";
	import highcharts from "highcharts";

	export default {
		name: "ItemCumulativeChart",
		data() {
			return {
				cumulativeOptions: {
					chart: {
						type: 'area',
						zoomType: 'xy'
					},
					title: {
						text: 'Market Depth'
					},
					subtitle: {
						text: 'Source: <a href="https://gw2tp.com/">gw2tp.com</a>'
					},
					xAxis: {
						minPadding: 0,
						maxPadding: 0,
						tickAmount: 0,

						ordinal: true,
						title: {
							text: 'Price'
						},
						labels: {
							enabled: false
						}
					},
					yAxis: [
						{
							type: "area",
							lineWidth: 1,
							gridLineWidth: 1,
							title: null,
							tickWidth: 1,
							tickLength: 5,
							tickPosition: 'inside',
							labels: {
								align: 'left',
								x: 8
							}
						}, {
							type: "area",
							opposite: true,
							linkedTo: 0,
							lineWidth: 1,
							gridLineWidth: 0,
							title: null,
							tickWidth: 1,
							tickLength: 5,
							tickPosition: 'inside',
							labels: {
								align: 'right',
								x: -8
							}
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
					tooltip: {
						// headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
						shared: true,
						split: false,
						useHTML: true,

						formatter: function () {
							let p = this.points[0];
							let output = ['', utils.currencyFormatter(p.x), '<table>'];
							this.points.forEach(function (point) {
								let series = point.series;
								let align = 'text-align:left;';
								let y;
								let yRaw = point.y.toFixed(0);
								y = highcharts.numberFormat(yRaw, 0);
								output.push('<tr><td style="color:' + series.color + '">' + series.name + '</td> <td style="' + align + '"><b>' + y + '</b></td></tr>');
							});
							output.push('</table>');
							return output.join('');
						}
					},
					series: []
				}
			}
		},
		props: {
			id: String
		},
		computed: {
			cumulativeBuys() {
				if (!this.itemListings["buys"]) {
					return []
				}
				let buys = this.itemListings.buys
				buys.sort(function (a, b) {
					return a.unit_price - b.unit_price
				})
				buys.reverse()
				let cum = 0
				buys = buys.map(function (a) {
					cum += a.quantity
					return [
						a.unit_price,
						cum
					]
				})
				buys.reverse()
				return buys
			},
			cumulativeSells() {
				if (!this.itemListings["sells"]) {
					return []
				}
				let sells = this.itemListings.sells
				sells.sort(function (a, b) {
					return a.unit_price - b.unit_price
				})
				// eslint-disable-next-line no-unused-vars
				let cum = 0
				sells = sells.map(function (a) {
					cum += a.quantity
					return [
						a.unit_price,
						cum
					]
				})
				return sells
			}
		},
		mounted() {
			this.itemListings = api.getItemListings(Number(this.id))
			this.cumulativeOptions.series = [{
				name: 'Cumulative supply',
				data: this.cumulativeSells,
				color: '#fc5857'
			}, {
				name: 'Cumulative demand',
				data: this.cumulativeBuys,
				color: '#03a7a8'
			}]
		}
	}
</script>

<style scoped>

</style>