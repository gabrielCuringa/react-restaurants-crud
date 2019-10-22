import React from "react";
import PropTypes from "prop-types";
import * as restaurantsApi from "../services/RestaurantsApi.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText
} from "@material-ui/core";

class AddDialog extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleClose: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cuisine: "",
      nameOnError: false,
      cuisineOnError: false
    };
  }

  async addRestaurant() {
    const name = this.state.name;
    const cuisine = this.state.cuisine;
    if (!name) {
      this.setState({
        nameOnError: true
      });
    }
    if (!cuisine) {
      this.setState({
        cuisineOnError: true
      });
    }
    if (name && cuisine) {
      this.setState({
        nameOnError: false,
        cuisineOnError: false
      });
      let formData = new FormData();

      formData.append("nom", name);
      formData.append("cuisine", cuisine);
      let result = await restaurantsApi.addRestaurant(formData);
      console.log(result);
      this.props.handleClose();
    }
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeCuisine(event) {
    this.setState({ cuisine: event.target.value });
  }

  render() {
    const isVisible = this.props.isVisible;
    const nameOnError = this.state.nameOnError;
    const cuisineOnError = this.state.cuisineOnError;
    return (
      <Dialog
        open={isVisible}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Ajouter un restaurant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ajouter un restaurant en remplissant ce formulaire.
          </DialogContentText>
          <FormControl>
            <InputLabel htmlFor="input-name">Nom</InputLabel>
            <Input
              id="input-name"
              aria-describedby="my-helper-text"
              value={this.state.name}
              onChange={e => {
                this.handleChangeName(e);
              }}
            />
            {nameOnError && (
              <FormHelperText id="helper-text-name" error>
                Required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="input-cuisine">Cuisine</InputLabel>
            <Input
              id="input-cuisine"
              aria-describedby="helper-text-cuisine"
              value={this.state.cuisine}
              onChange={e => {
                this.handleChangeCuisine(e);
              }}
            />
            {cuisineOnError && (
              <FormHelperText id="helper-text-cuisine" error>
                Required
              </FormHelperText>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              await this.addRestaurant();
            }}
            color="primary"
          >
            Ajouter
          </Button>
          <Button
            onClick={() => {
              this.props.handleClose();
            }}
            color="secondary"
          >
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddDialog;
