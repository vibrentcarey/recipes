<template>
  <div class="add-recipe">
  <h2 v-if='recipe'>Edit {{recipe.title}} Recipe</h2>
  <form @submit.prevent="editRecipe">
    <label for="title">Recipe Title</label>
    <input v-if='recipe' name='title' v-model='recipe.title'/>

    <br/>
    <!-- show the array of ingredients each inside of an input tag -->
    <template v-if='recipe'>
    <label v-if="recipe.ingredients.length > 0" for="ingredients">Ingredients</label>
    <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredient-box">
      <input  name='ingredients' v-model="recipe.ingredients[index]"/>
      <p @click='deleteIngredient(ingredient)'>Delete</p>
    </div>
    </template>

    <br/>
    <!-- input field for user to add ingredients-->
    <label for="ingredient">Add Ingredient</label>
    <input placeholder='hit enter to save' name='ingredient' v-model='ingredient' @keydown.enter.prevent="addIngredient"/>
    <p class='red' v-if="feedback">{{feedback}}</p>
    <br/> 
    <button @click='editRecipe'>Save Changes</button>
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
     recipe: null,
      ingredient: null,
      feedback: null,
    }
  },
   created() {
     //get a reference of the recipe we are looking for based on route parameters
    let reference = db.collection('recipes').where('slug', '==', this.$route.params.recipe_slug)
    reference.get().then(snapshot => {
      snapshot.forEach(doc => {
        //set our recipe object to the data object from database
        this.recipe = doc.data()
        this.recipe.id = doc.id
      })
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
  editRecipe(){
	if(this.recipe.title){
		this.feedback = null;
//create slug to turn title into url friendly title
		this.recipe.slug = slugify(this.recipe.title, {
			replacement: '-',
//remove these globally from the slug
			remove: /[$*_+~.()'"!\-:@]/g,
			lower: true
		})
//this is an async request to add this object to the database
//instead of add we will use .doc(id)
		db.collection('recipes').doc(this.recipe.id).update({
			title: this.recipe.title,
			ingredients: this.recipe.ingredients,
			slug: this.recipe.slug
		}).then(()=> {
			this.$router.push({name: 'Home'})
    }).catch(err => console.log(err))
  }	else {
		this.feedback = 'You must enter a smoothie title'
	}
},
    addIngredient(){
      //make sure ingredient field isnt empty
      if(this.ingredient){
        //add our ingredient to our recipe object from the database
        this.recipe.ingredients.push(this.ingredient)
        this.ingredient = null
        this.feedback = null;
      } else {
        this.feedback = 'Cannot add empty ingredient!'
      }
    },
    deleteIngredient(ing){
      //return a new array with the deleted one missing
      this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => ingredient !== ing)
    }
  },
 
  
}
</script>

<style lang="css">
  .add-recipe {
    background-color: #d9adad;
    width: 60vw;
    height: 70vh;
    border-radius:1em ;
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