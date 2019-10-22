import React from "react";
import Restaurant from "./Restaurant";
import * as restaurantsApi from "../services/RestaurantsApi.js";
import { Grid, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ReactPaginate from "react-paginate";
import "../styles/pagination.css";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));
const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed"
};
//http://putridparrot.com/blog/react-material-ui-invalid-hook-call-hooks-can-only-be-called-inside-of-the-body-of-a-function-component/
const SampleFab = props => {
  const classes = useStyles();
  return (
    <Fab
      color="primary"
      style={style}
      aria-label="add"
      className={classes.fab}
      onClick={() => {
        props.onClick();
      }}
    >
      <AddIcon />
    </Fab>
  );
};

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      nbOfRestaurants: 0,
      pageCount: 100, //valeur par défaut
      restaurantsPerPage: 10
    };
  }

  async getRestaurants(page) {
    const restaurants = await restaurantsApi.getRestaurants(page);
    console.log(restaurants);
    this.setState({
      restaurants: restaurants.data,
      nbOfRestaurants: restaurants.count,
      pageCount: Math.ceil(restaurants.count / this.state.restaurantsPerPage)
    });
  }

  componentDidMount() {
    this.getRestaurants(0);
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.reload != this.props.reload) {
      if (this.props.reload) {
        this.getRestaurants(0);
      }
    }
  }

  handlePageChanged = data => {
    let selected = data.selected;
    this.getRestaurants(selected);
  };

  render() {
    const restaurants = this.state.restaurants.map((el, index) => {
      return (
        <Grid className="grid" item xs={4} key={el._id}>
          <Restaurant
            restaurant={el}
            toggleEditDialog={() => this.props.toggleEditDialog()}
            handleEditDialog={restaurantSelected => {
              this.props.handleEditDialog(restaurantSelected);
            }}
          />
        </Grid>
      );
    });
    const countRestaurants = this.state.nbOfRestaurants;
    const pageCount = this.state.pageCount;
    return (
      <div>
        <p>Nombre de restaurants : {countRestaurants}</p>
        <Grid className="content" container spacing={3}>
          {restaurants}
        </Grid>
        <ReactPaginate
          className="paginate"
          previousLabel={"prev."}
          previousLinkClassName={"pagination-previous-link"}
          nextLabel={"next"}
          nextLinkClassName={"pagination-next-link"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageChanged}
          containerClassName={"pagination"}
          activeClassName={"pagination-active"}
        />
        <SampleFab onClick={this.props.toggleAddDialog} />
      </div>
    );
  }
}

export default Restaurants;
