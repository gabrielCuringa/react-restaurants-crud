import React from "react";
import * as restaurantsApi from "../services/RestaurantsApi.js";

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
  }

  async getRestaurants() {
    const restaurants = await restaurantsApi.getRestaurants();
    console.log(restaurants);
    this.setState({
      restaurants: restaurants.data
    });
  }

  componentDidMount() {
    this.getRestaurants();
  }

  render() {
    const restaurants = this.state.restaurants.map((el, index) => {
      return <li key={index}>{el.name}</li>;
    });

    return (
      <div>
        <ul>{restaurants}</ul>
      </div>
    );
  }
}

export default Restaurants;
