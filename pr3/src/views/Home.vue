<template>
  <div class="home">
    <header class="mb-3 pt-4 pb-2 text-warning">
      <div class="container d-flex justify-content-center">
        <div class="mr-4 d-none d-lg-block">
          <img class="img-fluid img--home" src="@/assets/stockup.png" alt="">
        </div>
        <div class="row align-items-center">
          <h1 class="display-4 text-center">By Odgen's hammer,<br> what profits!</h1>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <div class="container">

      <div class="row d-flex justify-content-center">
        <div class="col-md-5 my-3">
          <home-card
              route="/tp"
              title="Trade Post"
              text="Search for various items listed on Trade Post by name, price, type or something else
                  and carry in your investments. Stonks!">
          </home-card>
        </div>
        <div class="col-md-5 my-3">
          <home-card
              route="/investments"
              title="Investments"
              text="See your active investments and manage them by adding more or selling them off. Also
                  can quickly see the item price graph from there">
          </home-card>
        </div>
        <div class="col-md-5 my-3">
          <home-card
            route="/past"
            title="Past Investments"
            text="See your past investments that you have sold off and the total profits and few other statistics">
          </home-card>
        </div>
        <div class="col-md-5 my-3">
          <home-card
              route="/about"
              title="About"
              text="Info about this page, some privacy stuff and maybe something else?">
          </home-card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HomeCard from '@/components/HomeCard.vue'

export default {
  name: 'Home',
  components: {
    HomeCard
  }
}
</script>

<style scoped>
  .img--home {
    width: 300px;
    height: 200px;
  }
</style>
