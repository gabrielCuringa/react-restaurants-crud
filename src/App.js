import React from "react";
import "./App.css";
import Restaurants from "./components/Restaurants";
import RestaurantDetail from "./components/RestaurantDetail";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import AddDialog from "./components/AddDialog";
import EditDialog from "./components/EditDialog";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddDialogVisible: false,
      isEditDialogVisible: false,
      restaurantToEdit: {},
      restaurants: {}
    };
  }

  toggleAddDialog() {
    let dialogVisible = this.state.isAddDialogVisible;
    this.setState({
      isAddDialogVisible: !dialogVisible
    });
  }

  toggleEditDialog(reload) {
    let dialogVisible = this.state.isEditDialogVisible;
    this.setState({
      isEditDialogVisible: !dialogVisible
    });
  }

  handleEditDialog(restaurantSelected) {
    console.log("toggle edit");
    console.log(restaurantSelected);
    this.setState({
      restaurantToEdit: restaurantSelected
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Redirect exact from="/" to="restaurants" />
            <Route exact path="/restaurants">
              <div className="App-header">
                <h2>React-Restaurants CRUD</h2>
              </div>
              <Restaurants
                toggleAddDialog={() => {
                  this.toggleAddDialog();
                }}
                toggleEditDialog={() => {
                  this.toggleEditDialog();
                }}
                handleEditDialog={restaurantSelected => {
                  this.handleEditDialog(restaurantSelected);
                }}
              />
            </Route>
            <Route
              path="/restaurants/:id"
              render={props => <RestaurantDetail {...props} />} //passing props
            />
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>

          <AddDialog
            isVisible={this.state.isAddDialogVisible}
            handleClose={() => {
              this.toggleAddDialog();
            }}
          />
          <EditDialog
            isVisible={this.state.isEditDialogVisible}
            handleClose={reload => {
              this.toggleEditDialog(reload);
            }}
            restaurantToEdit={this.state.restaurantToEdit}
          />
        </Router>
      </div>
    );
  }
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <p>
        La page <code>{location.pathname}</code> n'existe pas.
      </p>
    </div>
  );
}

export default App;
