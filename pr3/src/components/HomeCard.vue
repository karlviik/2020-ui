<template>
	<div id="home-card">
		<router-link :to="route" class="link--color-underline-inherit">
			<div class="card h-100 py-4 bg-secondary border-warning text-light">
				<div class="card-body text-center">
					<h4 class="card-title text-warning">{{ title }}</h4>
					<p class="card-text">{{ text }}</p>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
    export default {
        name: "HomeCard",
        props: ["route", "title", "text"]
    }
</script>

<style scoped>

</style>