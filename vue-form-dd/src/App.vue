<!-- <template>
  <div>
    <Vueform>
      <TextElement name="hello_world" label="Hello" placeholder="World" />
    </Vueform>
  </div>
</template> -->

<template>
  <div>
    <LandingPage/>
    <router-view></router-view>
  </div>
</template>

<script>
import LandingPage from './pages/LandingPage.vue';

export default {
  name: "App",
  components: {
    LandingPage,
  },
}

</script>