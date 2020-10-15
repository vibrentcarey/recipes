<template>
  <div class="recipe-card">
    <h1>Recipes</h1>
    <div class="recipe-card-box" v-if="recipes.length === 0">
      <h2>No recipes yet, click add recipe to add one!</h2>
    </div>
    <div v-else v-for="recipe in recipes" :key="recipe.title" class="recipe-card-box">
      <ul>
        <h2>{{recipe.title}}</h2>
        <li v-for="(ingredient,i) in recipe.ingredients" :key="i">
          <span>{{ingredient}}</span>
        </li>
        <!-- link to edit recipe and pass the slug from our recipe-->
        <router-link :to="{name: 'EditRecipeView', params: {recipe_slug: recipe.slug}}">Edit Recipe</router-link>
        <br />
        <button @click="deleteRecipe(recipe.id)">Delete {{recipe.title}}</button>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import the database from firebase
import db from "@/firebase/init";

export default {
  name: "RecipeCard",
  data() {
    return {
      recipes: []
    };
  },
  created() {
    //get all the recipes from database
    db.collection("recipes")
      .get()
      .then(snapshot => {
        snapshot.forEach(document => {
          let recipe = document.data();
          recipe.id = document.id;

          this.recipes.push(recipe);
        });
      });
  },
  methods: {
    //take in the recipe id we want to delete
    deleteRecipe(id) {
      //find the collection and the document id to delete
      db.collection("recipes")
        .doc(id)
        .delete()
        //delete from our local array as well
        .then(() => {
          this.recipes = this.recipes.filter(recipe => recipe.id !== id);
        });
    }
  }
};
</script>

<style lang="css" scoped>
.recipe-card-box {
  background-color: #d9adad;
  height: auto;
  width: 30vw;
  border-radius: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  margin: 2em;
}

li {
  list-style: none;
}
</style>