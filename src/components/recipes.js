import React, { Component } from "react";
import axios from "axios";

class Recipes extends Component {
  state = {
    recipes: []
  };

  componentDidMount() {
    axios.get("http://localhost:3001/recipes").then(res => {
      const recipes = res.data;
      this.setState({ recipes });
    });
  }

  handleDelete = async id => {
    await axios.delete("http://localhost:3001/recipes/" + id);
    const recipes = this.state.recipes.filter(recipe => recipe.uuid !== id);
    this.setState({ recipes });
  };

  render() {
    const { recipes } = this.state;
    return (
      <>
        <div className={`mb-3`}>
          <a
            href={`/recipes/add-update-recipe/new`}
            className="btn btn-primary"
          >
            Add Recipe
          </a>
        </div>

        <div className={`row`}>
          {recipes.map((recipe, key) => (
            <div className={`col-6 mb-4`} key={key}>
              <div className="card">
                {recipe.images ? (
                  <img
                    className="card-img-top"
                    src={recipe.images.medium}
                    alt={recipe.title}
                  />
                ) : (
                  ""
                )}
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <a
                    href={`/recipes/${recipe.uuid}`}
                    className="btn btn-primary mr-2"
                  >
                    Show more
                  </a>
                  <a
                    href={`/recipes/add-update-recipe/${recipe.uuid}`}
                    className="btn btn-primary mr-2"
                  >
                    Update
                  </a>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(recipe.uuid)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Recipes;
