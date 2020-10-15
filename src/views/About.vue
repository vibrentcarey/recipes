<template>
  <div class="about">
<AddRecipe/>
  </div>
</template>

<script>
import AddRecipe from '@/components/AddRecipe'
export default {
  components: {AddRecipe}
}
</script>

<style lang="css">
  .about {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>