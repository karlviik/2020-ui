<template>
	<div id="app">
		<notifications group="foo"/>
		<navbar/>
		<router-view/>
		<custom-footer/>
	</div>
</template>

<script>
	import Navbar from "@/components/Navbar";
	import CustomFooter from "@/components/CustomFooter"
	import store from '@/store'
	import api from "@/api";

	export default {
		store,
		components: {Navbar, CustomFooter},
		data: function () {
			return {
				api: api
			}
		},
		created() {
			let categories = this.api.getCategories()
			categories.forEach(x => this.$store.dispatch('createCategory', x.text))
		}
	}
</script>

<style lang="less">
	@min-sm: 576px;
	@min-md: 768px;
	@min-lg: 992px;
	@min-xl: 1200px;

	@max-xs: 575.98px;
	@max-sm: 767.98px;
	@max-md: 991.98px;
	@max-lg: 1199.98px;

	@color-primary: cyan;

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;

	}

	#nav {
		a {
			font-weight: bold;
			color: #a1a1a0;

			&.router-link-exact-active {
				color: #efefef;
			}
		}
	}

	.link--color-underline-inherit, .link--color-underline-inherit:hover {
		color: inherit;
		text-decoration: inherit;
	}

	html {
		position: relative;
		min-height: 100%;
	}

	@media (max-width: @max-sm) {
		.navbar-nav--fullscreen {
			height: calc(100vh - 50px);
		}
	}

	@media (min-width: @min-md) {
		.navbar-nav--abs-center-x {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			width: 80%
		}
	}



	.row--investment-main-height {
		height: 60.5px;
	}

	.row--table-row-height {
		height: 32.5px;
	}

	.border--bottom-dark {
		border-bottom: 1px solid #454d55;
	}

</style>
