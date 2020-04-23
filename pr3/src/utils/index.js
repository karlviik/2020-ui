
export default {
	// eslint-disable-next-line no-unused-vars
	priceFormatter(coins, color) {
		return priceFormatter(coins, color, 20)
	},
	bigPriceFormatter(coins, color) {
		return priceFormatter(coins, color, 32)
	},
	smallPriceFormatter(coins, color) {
		return priceFormatter(coins, color, 16)
	},

	nameFieldFormatter(picUrl, name) {
		return '<img class="rounded mr-2 --w-h-32px" src="' + picUrl + '">' + name
	},

	// eslint-disable-next-line no-unused-vars
	percentageFormatter(roi, color) {
		return Math.round(roi * 1000) / 10 + "%"
	},

	roiCalculator(buy, sell) {
		if (buy === 0 && sell === 0) return 0
		let newBuy = buy == null || buy === 0 ? 1 : buy
		return Math.round(1000 * sell * 0.85 / newBuy) / 1000 - 1
	},

	profitCalculator(buy, sell) {
		return Math.round(sell * 0.85 - buy)
	}
}

// eslint-disable-next-line no-unused-vars
function priceFormatter(coins, color, size) {
	let neg = coins < 0
	coins = Math.round(Math.abs(coins))
	let c = coins % 100
	let s = (coins % 10000 - c) / 100
	let g = (coins - s * 100 - c) / 10000
	let out = neg ? '-' : '';
	if (g > 0) {
		out = g + '<img class="--w-h-' + size + 'px" src="https://render.guildwars2.com/file/090A980A96D39FD36FBB004903644C6DBEFB1FFB/156904.png">'
	}
	if (s > 0 || g > 0) {
		out += s + '<img class="--w-h-' + size + 'px" src="https://render.guildwars2.com/file/E5A2197D78ECE4AE0349C8B3710D033D22DB0DA6/156907.png">'
	}
	out += c + '<img class="--w-h-' + size + 'px" src="https://render.guildwars2.com/file/6CF8F96A3299CFC75D5CC90617C3C70331A1EF0E/156902.png">'
	return out
}