import React from "react";
import Restaurant from "./Restaurant";
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.restaurants !== this.props.restaurants) {
      this.setState({
        restaurants: this.props.restaurants.data,
        nbOfRestaurants: this.props.restaurants.count,
        pageCount: Math.ceil(
          this.props.restaurants.count / this.state.restaurantsPerPage
        )
      });
    }
  }

  handlePageChanged = data => {
    let selected = data.selected;
    this.props.handleLoadData(selected);
  };

  render() {
    const restaurants = this.state.restaurants.map((el, index) => {
      return (
        <Grid className="grid" item xs={4} key={el._id}>
          <Restaurant
            restaurant={el}
            handleLoadData={async () => this.props.handleLoadData()}
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
