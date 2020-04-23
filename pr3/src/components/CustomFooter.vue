<template>
	<footer id="footer" class="footer--sticky-bottom py-1 bg-dark mt-auto">
		<div class="container-fluid d-flex">
			<div class="flex-fill">
				<p class="m-0 text-left text-white">Images copyright of Anet</p>
			</div>
			<div class="">
				<p class="m-0 text-right text-white">Made by me</p>
			</div>
		</div>
	</footer>
</template>

<script>
    export default {
        name: "CustomFooter"
    }
</script>

<style scoped>
	.footer--sticky-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 32px;
	}
</style>