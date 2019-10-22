import React from "react";
import "../styles/restaurant.css";
/**
 * code relatif à l'effet parallax
 * https://codesandbox.io/embed/r0yEkozrw?view=preview
 */
class RestaurantDetail extends React.Component {
  render() {
    const data = this.props.location.state;
    // const defaultProps = {
    //   center: {
    //     lat: data.restaurant.address.coord[0],
    //     lng: data.restaurant.address.coord[1]
    //   },
    //   zoom: 11
    // };

    return (
      <div>
        <h1>{data.restaurant.name}</h1>
        <h2>{data.restaurant.cuisine}</h2>
      </div>
    );
  }
}

export default RestaurantDetail;
