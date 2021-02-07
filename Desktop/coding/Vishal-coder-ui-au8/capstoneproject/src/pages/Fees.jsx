import React, { Component } from "react";
import "../styles/Fees.scss";
import ResponsiveDrawer from "./NavBar";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import salert from "sweetalert2";
import axios from "axios";

//import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
//import InputLabel from "@material-ui/core/InputLabel";
//import NativeSelect from "@material-ui/core/NativeSelect";
//import FormControl from "@material-ui/core/FormControl";
//import InputBase from "@material-ui/core/InputBase";
//import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import FeeStatus from "../components/FeeStatus";

// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     "label + &": {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: "relative",
//     backgroundColor: theme.palette.background.paper,
//     border: "1px solid #ced4da",
//     fontSize: 16,
//     padding: "10px 26px 10px 12px",
//     transition: theme.transitions.create(["border-color", "box-shadow"]),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:focus": {
//       borderRadius: 4,
//     },
//   },
// }))(InputBase);

//const defaultersUrl = "http://localhost:8700/fees/defaulters";
//const editDefaultersUrl = `http://localhost:8700/fees/editdefaulter/`;

const defaultersUrl = "https://edumanageapp.herokuapp.com/fees/defaulters";
const editDefaultersUrl = `https://edumanageapp.herokuapp.com/fees/editdefaulter/`;

class Fees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feesamt: 0,
      feespaid: true,
      paymentmode: "",
      paymentdate: null,
      firstreminder: false,
      secondreminder: false,
      feesamtchgd: false,
      feespaidchgd: false,
      paymentmodechgd: false,
      paymentdatechgd: false,
      firstreminderchgd: false,
      secondreminderchgd: false,
      defaulters: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(defaultersUrl);
      const defaulters = await response.json();
      await this.setState({ defaulters: defaulters });
      console.log(defaulters);
    } catch (err) {
      console.error(err.message);
    }
  } // componentdidmount

  //

  handleChangeFeesamt = (e) => {
    this.setState({ feesamt: e.target.value });
    this.setState({ feesamtchgd: true });
  };

  handleChangePaymentmode = (e) => {
    this.setState({ paymentmode: e.target.value });
    this.setState({ paymentmodechgd: true });
  };

  handleChangePaymentdate = (e) => {
    this.setState({ paymentdate: e.target.value });
    this.setState({ paymentdatechgd: true });
  };

  handleChangeFeespaid = (e) => {
    if (e.target.value === "Yes") this.setState({ feespaid: true });
    else this.setState({ feespaid: false });

    this.setState({ feespaidchgd: true });
  };

  handleChangeFirstReminder = (e) => {
    if (e.target.value === "Yes") this.setState({ firstreminder: true });
    else this.setState({ firstreminder: false });

    this.setState({ firstreminderchgd: true });
  };

  handleChangeSecondReminder = (e) => {
    if (e.target.value === "Yes") this.setState({ secondreminder: true });
    else this.setState({ secondreminder: false });
    this.setState({ secondreminderchgd: true });
  };

  handleEdit = (e, id, index) => {
    console.log(e, id, index);
    console.log(this.state.defaulters);

    e.preventDefault();

    let query = {};
    if (this.state.feesamtchgd) query.feesamt = this.state.feesamt;
    if (this.state.feespaidchgd) query.feespaid = this.state.feespaid;
    if (this.state.paymentmodechgd) query.paymentmode = this.state.paymentmode;
    if (this.state.paymentdatechgd) query.paymentdate = this.state.paymentdate;
    if (this.state.firstreminderchgd)
      query.firstreminder = this.state.firstreminder;
    if (this.state.secondreminderchgd)
      query.secondreminder = this.state.secondreminder;

    console.log("query", query);
    console.log(this.state.firstreminderchgd);

    // let bodyobj = query
    // console.log("bodyobj", bodyobj)
    // console.log(url + id)

    axios
      .put(editDefaultersUrl + id, query)

      .then((res) => {
        console.log("success", res.data);
        if (res.data.success && this.state.feespaid === true) {
          console.log("save", this.state.defaulters);
          // this.setState((previousState) => {
          //   return {
          //     defaulters: previousState.defaulters.filter((d) => d._id !== id),
          //   };
          // });
          // salert.fire("", "Data uploaded", "success");
        } else if (res.data.success) {
          salert.fire("", "Data uploaded", "success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSend = (e) => {
    console.log("Reached Send");
    this.props.history.push("/communication");
  };

  render() {
    const { user } = this.props;

    if (user) {
      if (this.state.defaulters) {
        var defaulters = this.state.defaulters.map((defaulter, index) => (
          <tr>
            <input
              type="text"
              disabled="true"
              placeholder={defaulter.std}
              style={{ width: "3rem" }}
            />
            <input
              type="text"
              disabled="true"
              placeholder={defaulter.name}
              style={{ width: "10rem" }}
            />
            <input
              type="text"
              name="feesamt"
              placeholder={defaulter.feesamt}
              onChange={this.handleChangeFeesamt}
              style={{ width: "5rem" }}
            />
            <input
              type="text"
              name="feespaid"
              placeholder={defaulter.feespaid ? "Yes" : "No"}
              onChange={this.handleChangeFeespaid}
              style={{ width: "5rem" }}
            />
            <input
              type="text"
              name="paymentmode"
              placeholder={defaulter.paymentmode}
              onChange={this.handleChangePaymentmode}
              style={{ width: "6rem" }}
            />
            <input
              type="date"
              name="paymentdate"
              placeholder={defaulter.paymentdate}
              onChange={this.handleChangePaymentdate}
              style={{ width: "8rem" }}
            />
            <input
              type="text"
              name="firstreminder"
              placeholder={defaulter.firstreminder ? "Yes" : "No"}
              onChange={this.handleChangeFirstReminder}
              style={{ width: "7rem" }}
            />
            <input
              type="text"
              name="secondreminder"
              placeholder={defaulter.secondreminder ? "Yes" : "No"}
              onChange={this.handleChangeSecondReminder}
              style={{ width: "7rem" }}
            />
            <button onClick={(e) => this.handleEdit(e, defaulter._id, index)}>
              {" "}
              Save
            </button>
          </tr>
        ));
      }

      return (
        <div
          style={{
            background: "#FCF8E8",
            display: "flex",
            direction: "row",
            justifyContent: "center",
            minHeight: "120vh",
          }}
        >
          <ResponsiveDrawer history={this.props.history} />

          <div style={{ width: "75%" }}>
            <Grid container direction="row" justify="center">
              <Grid item xs={3}>
                <Box marginTop={10}>
                  <h2>
                    <i> Fees </i>
                  </h2>
                </Box>
              </Grid>
            </Grid>

            <div
              style={{
                width: "100%",
                border: "2px solid brown",
                borderRadius: "0.25rem",
                marginBottom: "1rem",
              }}
            >
              <div style={{ padding: "1rem" }}>
                <Grid container>
                  <Grid item xs={3} padding={1}>
                    <Box marginTop={2}>
                      <h4>List of Defaulters</h4>
                    </Box>
                  </Grid>
                </Grid>
                {this.state.defaulters ? (
                  <div style={{ padding: "0.5rem" }}>
                    <input
                      type="text"
                      disabled="true"
                      placeholder="Class"
                      style={{ width: "3rem" }}
                    />
                    <input
                      type="text"
                      disabled="true"
                      placeholder="Name"
                      style={{ width: "10rem" }}
                    />
                    <input
                      type="text"
                      placeholder="Amount"
                      style={{
                        width: "5rem",
                      }}
                      disabled="true"
                    />
                    <input
                      type="text"
                      placeholder="Fees Paid"
                      style={{ width: "5rem" }}
                      disabled="true"
                    />
                    <input
                      type="text"
                      placeholder="Payment Mode"
                      style={{ width: "6rem" }}
                      disabled="true"
                    />
                    <input
                      type="text"
                      placeholder="Payment Date"
                      style={{ width: "8rem" }}
                      disabled="true"
                    />
                    <input
                      type="text"
                      placeholder="First Reminder"
                      style={{ width: "7rem" }}
                      disabled="true"
                    />
                    <input
                      type="text"
                      placeholder="Second Reminder"
                      onChange={this.handleChangeSecondReminder}
                      style={{ width: "7rem" }}
                      disabled="true"
                    />

                    {defaulters ? defaulters : "Loading defaulters "}
                  </div>
                ) : (
                  <> No Defaulters </>
                )}
              </div>
              <br></br>
              <br></br>
              <div>
                <Button
                  style={{ marginLeft: "20px" }}
                  variant="contained"
                  color="primary"
                  onClick={this.handleSend}
                >
                  Send Reminder
                </Button>
              </div>
              <br></br> <br></br>
              <FeeStatus />
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.userState.user,
  };
};

export default connect(mapStateToProps)(Fees);
