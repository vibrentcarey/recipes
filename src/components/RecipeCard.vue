<template>
  <div class="recipe-card" >
    <h1>Recipes</h1>
  <div v-for="recipe in recipes" :key="recipe.title" class="recipe-card-box">
<ul >
  <h2>{{recipe.title}}</h2>
  <li v-for="(ingredient,i) in recipe.ingredients" :key="i">
    <span>{{ingredient}}</span>
  </li>
  <button @click='deleteRecipe(recipe.id)'>Delete {{recipe.title}}</button>
</ul>
    </div>
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
        let recipe = document.data();
        recipe.id = document.id;

        this.recipes.push(recipe);
      })
    })
  },
  methods: {
    //take in the recipe id we want to delete
    deleteRecipe(id) {
      //find the collection and the document id to delete
      db.collection('recipes').doc(id).delete()
      //delete from our local array as well
      .then(()=>{
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
      })
    }
  }
};
</script>

<style lang="css">
  .recipe-card-box {
    background-color: wheat;
    height: 40vh;
    width: 20em;
  }
  li{
    list-style: none;
  }
</style>