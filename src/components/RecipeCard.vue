<template>
  <div class="recipe-card" >
<ul v-for="recipe in recipes" :key="recipe.title">
  <h1>{{recipe.title}}</h1>
  <li v-for="(ingredient,i) in recipe.ingredients" :key="i">
    <span>{{ingredient}}</span>
  </li>
  
</ul>
    
  </div>
</template>

<script>
// @ is an alias to /src
//import the database from firebase
import db from '@/firebase/init'

export default {
  name: "RecipeCard",
  data() {
    return {
      recipes: []
    }
  },
  created() {
    //get all the recipes from database
    db.collection('recipes').get()
    .then(snapshot => {
      snapshot.forEach(document => {
        let recipe = document.data()
        recipe.id = document.id

        this.recipes.push(recipe)
      })
    })
  },
  methods: {
    deleteRecipe(id) {
      db.collection('recipes').doc(id).delete()
    }
  }
};
</script>

<style lang="css">
  .recipe-card {
    background-color: wheat;
    height: 40vh;
    width: 20em;
  }
  li{
    list-style: none;
  }
</style>