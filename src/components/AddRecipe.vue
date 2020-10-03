<template>
  <div class="add-recipe">
  <h2>Add Recipe</h2>
  <form @submit.prevent="addRecipe">
    <label for="title">Recipe Title</label>
    <input name='title' v-model='title'/>
    <br/>
    <label v-if="ingredients.length > 0" for="ingredients">Ingredients</label>
    <div v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-box">
      
      <input  name='ingredients' v-model="ingredients[index]"/>
    </div>
    <br/>
    <label for="ingredient">Add Ingredient</label>
    <input placeholder='hit enter to save' name='ingredient' v-model='ingredient' @keydown.enter.prevent="addIngredient"/>
    <p class='red' v-if="feedback">{{feedback}}</p>
<br/>
    <button>Add Recipe</button>
  </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'AddRecipe',
  data() {
    return {
      title: null,
      ingredients: [],
      ingredient: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    addRecipe(){
      if(this.title){
        this.feedback = null
        this.slug = slugify(this.title, {
          replacement: '-',
          remove:/[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        //add the recipe to the database if all verification passes
          db.collection('recipes').add({
        title: this.title,
        ingredients: this.ingredients,
        slug: this.slug
      }).then(()=>{
        this.$router.push({name: 'Home'})
      })
      } else {
        this.feedback = 'You must add a recipe title!'
      }
    
    }, 
    addIngredient(){
      if(this.ingredient){
        this.ingredients.push(this.ingredient)
        this.ingredient = null
        this.feedback = null;
      } else {
        this.feedback = 'Cannot add empty ingredient!'
      }
    },
  }
  
}
</script>

<style lang="css">
  .add-recipe {
    background-color: wheat;
    width: 60vw;
    height: 70vh;
  }
  form {
    padding: 1em;
  }

  input {
    margin: 1em;
  }
  .red{
    color: red;
  }
</style>