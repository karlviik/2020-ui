/* eslint-disable no-prototype-builtins */
import itemsList from "@/api/data/items_list.json"
import itemsObj from "@/api/data/items_obj.json"
import listings from "@/api/data/listings.json"
import categories from "@/api/data/investmentCategories.json"

export default {
	getAllItems() {
		return itemsList
	},
	searchWithParams(params) {
		return itemsList.filter(x => paramsFilterThing(x, params))
	},
	getItemInfo(itemId) {
		return itemsObj[itemId]
	},
	getItemListings(itemId) {
		return listings[itemId]
	},
	getCategories() {
		return categories
	}
}

function paramsFilterThing(itemInfoObj, params) {
	if (params.hasOwnProperty("searchString") && params["searchString"] != null) {
		if (!itemInfoObj["name"].toLowerCase().includes(params["searchString"].toLowerCase())) return false
	}
	if (params.hasOwnProperty("rarity") && params["rarity"] != null && params["rarity"] !== "") {
		if (itemInfoObj["rarity"] !== params["rarity"]) return false
	}
	if (params.hasOwnProperty("category") && params["category"] != null && params["category"] !== "") {
		if (itemInfoObj["category"] !== params["category"]) return false
	}
	if (params.hasOwnProperty("minLevel") && params["minLevel"] != null && !isNaN(params["minLevel"]) && typeof params["minLevel"] === 'number') {
		if (itemInfoObj["level"] < params["minLevel"]) return false
	}
	if (params.hasOwnProperty("maxLevel") && params["maxLevel"] != null && !isNaN(params["maxLevel"]) && typeof params["maxLevel"] === 'number') {
		if (itemInfoObj["level"] > params["maxLevel"]) return false
	}
	if (params.hasOwnProperty("minBuy") && params["minBuy"] != null && !isNaN(params["minBuy"]) && typeof params["minBuy"] === 'number') {
		if (itemInfoObj["buy"] < params["minBuy"]) return false
	}
	if (params.hasOwnProperty("maxBuy") && params["maxBuy"] != null && !isNaN(params["maxBuy"]) && typeof params["maxBuy"] === 'number') {
		if (itemInfoObj["buy"] > params["maxBuy"]) return false
	}
	if (params.hasOwnProperty("minSell") && params["minSell"] != null && !isNaN(params["minSell"]) && typeof params["minSell"] === 'number') {
		if (itemInfoObj["sell"] < params["minSell"]) return false
	}
	if (params.hasOwnProperty("maxSell") && params["maxSell"] != null && !isNaN(params["maxSell"]) && typeof params["maxSell"] === 'number') {
		if (itemInfoObj["sell"] > params["maxSell"]) return false
	}
	if (params.hasOwnProperty("minDemand") && params["minDemand"] != null && !isNaN(params["minDemand"]) && typeof params["minDemand"] === 'number') {
		if (itemInfoObj["demand"] < params["minDemand"]) return false
	}
	if (params.hasOwnProperty("maxDemand") && params["maxDemand"] != null && !isNaN(params["maxDemand"]) && typeof params["maxDemand"] === 'number') {
		if (itemInfoObj["demand"] > params["maxDemand"]) return false
	}
	if (params.hasOwnProperty("minSupply") && params["minSupply"] != null && !isNaN(params["minSupply"]) && typeof params["minSupply"] === 'number') {
		if (itemInfoObj["supply"] < params["minSupply"]) return false
	}
	if (params.hasOwnProperty("maxSupply") && params["maxSupply"] != null && !isNaN(params["maxSupply"]) && typeof params["maxSupply"] === 'number') {
		if (itemInfoObj["supply"] > params["maxSupply"]) return false
	}
	if (params.hasOwnProperty("minProfit") && params["minProfit"] != null && !isNaN(params["minProfit"]) && typeof params["minProfit"] === 'number') {
		if (itemInfoObj["profit"] < params["minProfit"]) return false
	}
	if (params.hasOwnProperty("maxProfit") && params["maxProfit"] != null && !isNaN(params["maxProfit"]) && typeof params["maxProfit"] === 'number') {
		if (itemInfoObj["profit"] > params["maxProfit"]) return false
	}
	if (params.hasOwnProperty("minRoi") && params["minRoi"] != null && !isNaN(params["minRoi"]) && typeof params["minRoi"] === 'number') {
		if (itemInfoObj["roi"] * 100 < params["minRoi"]) return false
	}
	if (params.hasOwnProperty("maxRoi") && params["maxRoi"] != null && !isNaN(params["maxRoi"]) && typeof params["maxRoi"] === 'number') {
		if (itemInfoObj["roi"] * 100 > params["maxRoi"]) return false
	}
	return true
}