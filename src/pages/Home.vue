<template>
  <div class="hello">
    home
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  }, mounted () {
    console.log(process.env);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
