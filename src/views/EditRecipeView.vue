<template>
  <div class="home">
<EditRecipe/>
  </div>
</template>

<script>
// @ is an alias to /src
import EditRecipe from '@/components/EditRecipe'

export default {
  name: "Home",
  components: {
EditRecipe
  }
};
</script>
