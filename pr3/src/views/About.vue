<template>
	<div class="about">
		<!-- Header -->
		<header class="mb-3 mt-5 pt-5 pb-2 text-warning">
			<div class="container d-flex justify-content-center">
				<div class="row align-items-center">
					<h1 class="display-4 text-center">About</h1>
				</div>
			</div>
		</header>

		<!-- Page Content -->
		<div class="container">
			<div class="row d-flex justify-content-center">
				<div class="col-md-5 my-3">
					<about-card
						title="Developers"
						text="This page has been developed by me and just me and some coffee and bunch of food
								which was also made by me. So tl;dr me."
					/>
				</div>
				<div class="col-md-5 my-3">
					<about-card
						title="Data"
						text="Data in this site is gotten from some dark corner of the internet and is totally 100%
								legal. I most definitely did not make any of it up for this static html site."
					/>
				</div>
				<div class="col-md-5 my-3">
					<about-card
							title="Privacy"
							text="This site gathers absolutely no data currently. Only stuff gathering data is your
								browser and bazillion other things you have running in the background."
					/>
				</div>
				<div class="col-md-5 my-3">
					<about-card
							title="Donate"
							text="So you want to donate to this site? Don't, go donate to some animal shelter or
								something."
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    // @ is an alias to /src
    import AboutCard from '@/components/AboutCard.vue'

    export default {
        name: 'About',
        components: {
            AboutCard
        }
    }
</script>
