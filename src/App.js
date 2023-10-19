import { useState , useEffect } from 'react';
import axios from 'axios';
import './App.css';

const URL = "https://www.themealdb.com/api/json/v1/1/random.php"

function App() {

  const [meal, setMeal] = useState('')
  const [category, setCategory] = useState('')
  const [instructions, setInstructions] = useState('')
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        const mealData = response.data.meals[0]
        setMeal(mealData.strMeal)
        setCategory(mealData.strCategory)
        setInstructions(mealData.strInstructions)

        const newIngredients = []
        for (let i = 1; i <= 20; i++) {
          const ingredient = mealData[`strIngredient${i}`]
          if (ingredient) {
            newIngredients.push(ingredient)
          }
        }
        setIngredients(newIngredients)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div id="container">
      <h1>Meal of the day</h1>
      <h2>{meal}</h2>
      <h4>Category:</h4>
      <p>{category}</p>
      <h4>Ingredients:</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4>Instructions:</h4>
      <p>{instructions}</p>
      
    </div>
  )
}

export default App;
