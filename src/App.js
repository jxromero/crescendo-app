import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/not-found";
import Recipes from "./components/recipes";
import RecipesDetail from "./components/recipes-detail";
import AddUpdateRecipe from "./components/add-update-recipe";

class App extends Component {
  state = {};
  render() {
    return (
      <main className={`container mt-4`}>
        <Switch>
          {/* add exact to read more specifically */}
          <Route path={`/not-found`} component={NotFound} />
          <Route
            path={`/recipes/add-update-recipe/:id`}
            component={AddUpdateRecipe}
          />
          <Route path={`/recipes/:id`} component={RecipesDetail} />
          <Route path={`/recipes`} component={Recipes} />
          <Redirect from={`/`} exact to={`/recipes`} />
          <Redirect to={`/not-found`} />
        </Switch>
      </main>
    );
  }
}

export default App;
