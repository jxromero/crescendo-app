import React, { Component } from "react";
import TextInput from "./common/text-input";
import DynaInput from "./common/dyna-input";
import axios from "axios";
import NumberInput from "./common/number-input";

class AddUpdateRecipe extends Component {
  state = {
    recipe: {
      title: "",
      description: "",
      cookTime: "",
      prepTime: "",
      servings: "",
      directions: [],
      ingredients: []
    },
    action: ""
  };

  componentDidMount() {
    const recipeId = this.props.match.params.id;
    // console.log(recipeId);
    if (recipeId === "new") {
      this.setState({ action: "add" });
      return;
    }

    let recipe = axios
      .get("http://localhost:3001/recipes/" + recipeId)
      .then(res => {
        const recipe = res.data;
        this.setState({ recipe, action: "update" });
      })
      .catch(err => {
        this.props.history.push("/not-found");
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    const recipe = { ...this.state.recipe };
    const action = this.state.action;
    const recipeId = this.props.match.params.id;
    if (action === "add") {
      axios.post("http://localhost:3001/recipes", recipe).then(res => {
        if (res.status === 201) {
          this.props.history.push("/recipes");
        }
      });
      return;
    }
    if (action === "update") {
      axios
        .put("http://localhost:3001/recipes/" + recipeId, recipe)
        .then(res => {
          if (res.status === 200) {
            this.props.history.push("/recipes");
          }
        });
      return;
    }
  };

  handleChange = e => {
    const { currentTarget: input } = e;
    const recipe = { ...this.state.recipe };
    recipe[input.name] = input.value;
    this.setState({ recipe });
  };

  handleDynaChange = e => {
    const { currentTarget: input } = e;
    const recipe = { ...this.state.recipe };
    if (input.dataset.func) {
      recipe[input.dataset.func][recipe[input.dataset.func].length] = {
        name: ""
      };
    }
    if (input.name === "ingredients") {
      recipe[input.name][input.dataset.index] = { name: input.value };
    }
    if (input.name === "directions") {
      recipe[input.name][input.dataset.index] = { instructions: input.value };
    }
    this.setState({ recipe });
  };

  render() {
    const { recipe } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          name={`title`}
          label={`Title`}
          type={`text`}
          value={recipe.title}
          onChange={this.handleChange}
        />
        <TextInput
          name={`description`}
          label={`Description`}
          type={`text`}
          value={recipe.description}
          onChange={this.handleChange}
        />
        <NumberInput
          name={`cookTime`}
          label={`Cooking Time`}
          type={`text`}
          value={recipe.cookTime}
          onChange={this.handleChange}
        />
        <NumberInput
          name={`prepTime`}
          label={`Preparation Time`}
          type={`text`}
          value={recipe.prepTime}
          onChange={this.handleChange}
        />
        <NumberInput
          name={`servings`}
          label={`Serving`}
          type={`text`}
          value={recipe.servings}
          onChange={this.handleChange}
        />
        <DynaInput
          name={`ingredients`}
          label={`Ingredients`}
          value={recipe.ingredients}
          onChange={this.handleDynaChange}
        />
        <DynaInput
          name={`directions`}
          label={`Directions`}
          value={recipe.directions}
          onChange={this.handleDynaChange}
        />
        <button type={`submit`} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default AddUpdateRecipe;
