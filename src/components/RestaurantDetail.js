import React from "react";
import "../styles/restaurant.css";
/**
 * code relatif à l'effet parallax
 * https://codesandbox.io/embed/r0yEkozrw?view=preview
 */
class RestaurantDetail extends React.Component {
  render() {
    const data = this.props.location.state;
    console.log(data);
    const grades = data.grades.map((el, index) => {
      let formattedDate = new Date(el.date);
      return (
        <li key={index}>
          {formattedDate.toDateString()} | {el.grade}, {el.score}
        </li>
      );
    });
    return (
      <div>
        <h1>{data.name}</h1>
        <h2>{data.cuisine}</h2>
        <h3>{data.borough}</h3>
        <h3>Notes</h3>
        <ul>{grades}</ul>
      </div>
    );
  }
}

export default RestaurantDetail;
