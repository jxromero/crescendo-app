import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

class RecipesDetails extends Component {
  state = {
    info: [],
    special: []
  };
  componentDidMount() {
    const recipeId = this.props.match.params.id;
    axios.get("http://localhost:3001/recipes/" + recipeId).then(res => {
      const info = res.data;
      this.setState({ info });
    });
    axios.get("http://localhost:3001/specials").then(res => {
      const special = res.data;
      this.setState({ special });
    });
  }

  handleGoBack = () => {
    this.props.history.push("/recipes");
  };

  render() {
    const { info, special } = this.state;

    let list = list => {
      let mapList;
      if (list) {
        mapList = list.map((l, k) => (
          <li key={k}>
            <p>
              {l.name} {l.amount} {l.measurement}
            </p>
            {special.map(s =>
              l.uuid === s.ingredientId ? (
                <div key={s}>
                  <p>
                    {s.title} <span>({s.type})</span>
                  </p>
                  {ReactHtmlParser(s.text)}
                </div>
              ) : (
                ""
              )
            )}
          </li>
        ));
      }
      return mapList;
    };

    return (
      <div className={`recipe row`}>
        <div className={`col-md-4 recipe-title`}>
          <button onClick={this.handleGoBack} className="btn btn-primary">
            Go back to list
          </button>
          <h1>{info.title}</h1>
          <p>{info.description}</p>
          {info.images ? (
            <img
              src={info.images !== 0 ? info.images.full : ""}
              alt={info.title}
            />
          ) : (
            ""
          )}
        </div>
        <div className={`col-md-7 offset-md-1 recipe-detail list-group`}>
          <div className={`list-group-item`}>
            <p className={`prepTime`}>
              Preparation Time: <span>{info.prepTime}</span>
            </p>
            <p>
              Cooking Time: <span>{info.cookTime}</span>
            </p>
            <p>
              Serving Size: <span>{info.servings}</span>
            </p>
          </div>
          <div className={`list-group-item`}>
            <h3>Ingredients</h3>
            <ul className={`procedure`}>
              {!info.ingredients ? "" : list(info.ingredients)}
            </ul>
          </div>
          <div className={`list-group-item`}>
            <h3>Preparation</h3>
            <ul>
              {!info.directions
                ? ""
                : info.directions.map((direction, key) => (
                    <li key={key}>{direction.instructions}</li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipesDetails;
