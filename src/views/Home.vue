<template>
  <div class="home">
    <RecipeCard/>
  </div>
</template>

<script>
// @ is an alias to /src
import RecipeCard from '@/components/RecipeCard'

export default {
  name: "Home",
  components: {
RecipeCard
  }
};
</script>
