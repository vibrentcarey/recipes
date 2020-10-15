<template>
  <div class="home">
    
    <div class="recipes">
    <RecipeCard/>
    </div>
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

<style lang="css">
.home {
  height: 100vh;
}
.recipes {
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
}
  
</style>
