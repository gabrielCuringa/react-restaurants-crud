import React from "react";
import Card from "@material-ui/core/Card";
import {
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  CardActions,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "../styles/restaurant.css";

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUpdateButton() {
    this.props.handleEditDialog({
      id: this.props.restaurant._id,
      name: this.props.restaurant.name,
      cuisine: this.props.restaurant.cuisine
    });
    this.props.toggleEditDialog();
  }

  render() {
    return (
      <Card className="card">
        <CardActionArea>
          <Link
            to={{
              pathname: "/restaurants/" + this.props.restaurant._id,
              state: { ...this.props }
            }}
          >
            <CardMedia
              className="card-media"
              image="https://picsum.photos/400"
              title={"Random Image " + this.props.restaurant.name}
            />
            <CardContent>
              <Typography color="textPrimary" gutterBottom>
                {this.props.restaurant.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {this.props.restaurant.cuisine}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              this.handleUpdateButton();
            }}
          >
            Modifier
          </Button>
          <Button size="small" color="secondary">
            Supprimer
          </Button>
        </CardActions>
      </Card>
    );
  }
}
export default Restaurant;
