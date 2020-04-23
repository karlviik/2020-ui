<template>
	<div class="card h-100 py-4 bg--blackish border-warning text-light">
		<div class="card-body text-center">
			<h4 class="card-title text-warning">{{ title }}</h4>
			<p class="card-text">{{ text }}</p>
		</div>
	</div>
</template>

<script>
    export default {
        name: "AboutCard",
        props: ["title", "text"]
    }
</script>

<style scoped lang="less">
	.bg--blackish {
		background: #1e1e1e;
	}

</style>