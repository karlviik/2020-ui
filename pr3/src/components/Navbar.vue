<template>
	<div id="nav">
		<b-navbar
				toggleable="md"
				type="dark"
				fixed="top"
				variant="dark"
		>
			<b-navbar-brand :to="{path: '/'}">GW2inv</b-navbar-brand>

			<b-navbar-toggle target="navbarResponsive"/>

			<b-collapse is-nav id="navbarResponsive">
				<b-navbar-nav class="navbar-nav--fullscreen navbar-nav--abs-center-x d-flex justify-content-center align-items-center ">
					<b-nav-item class="my-3 mt-auto">
						<router-link :to="{path: '/'}">
							<img class="--w-h-32px" src="@/assets/ddoor.png" alt="temp_icon">
							Home
						</router-link>
					</b-nav-item>
					<b-nav-item class="my-3 align-bottom">
						<router-link :to="{path: '/tp'}">
							<img class="--w-h-32px" src="@/assets/ddoor.png" alt="temp_icon">
							Trade Post
						</router-link>
					</b-nav-item>
					<b-nav-item class="my-3">
						<router-link :to="{path: '/investments'}">
							<img class="--w-h-32px" src="@/assets/ddoor.png" alt="temp_icon">
							Investments
						</router-link>
					</b-nav-item>
					<b-nav-item class="my-3">
						<router-link :to="{path: '/past'}">
							<img class="--w-h-32px" src="@/assets/ddoor.png" alt="temp_icon">
							Past Investments
						</router-link>
					</b-nav-item>
					<b-nav-item class="mt-auto mb-5 d-md-none">
						<a class="nav-link" href="#">
							<img class="--w-h-32px" src="@/assets/ddoor.png" alt="temp_icon">
							Log in
						</a>
					</b-nav-item>
				</b-navbar-nav>
			</b-collapse>

			<ul class="navbar-nav d-none d-md-block">
				<li class="nav-item">
					<a class="nav-item nav-link py-0" href="#">
						<img class="--w-h-32px" src="@/assets/ddoor.png" alt="temp_icon">
						Log in
					</a>
				</li>
			</ul>
		</b-navbar>
	</div>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped lang="less">
	body {
		margin-top: 56px;
	}

	@media (max-width: 767.98px) {
		.navbar-nav--fullscreen {
			height: calc(100vh - 50px);
		}
	}

	@media (min-width: 768px) {
		.navbar-nav--abs-center-x {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			width: 80%;
		}
	}

	.navbar__img, .--w-h-32px {
		width: 32px;
		height: 32px;
	}
</style>