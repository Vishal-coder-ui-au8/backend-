import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "../styles/HumanResources.scss";
//import TextField from "@material-ui/core/TextField";
//import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
//import salert from "sweetalert2";
import ResponsiveDrawer from "./NavBar";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
    },
  },
}))(InputBase);

//const staffUrl = "http://localhost:8700/staff/paydetail";

const staffUrl = "https://edumanageapp.herokuapp.com/staff/paydetail";

class HumanResources extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      name: "",
      staffs: [],
      staff: null,
    };
  }

  handleCategory = async (e) => {
    this.setState({ category: e.target.value });
    console.log(e.target.value);
    let url = `${staffUrl}?category=${e.target.value}`;
    console.log(url);

    try {
      const { data } = await axios(url);
      console.log(data);
      await this.setState({ staffs: data });
      console.log(this.state.staffs);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  handleName = async (e) => {
    this.setState({ staff: e.target.value });
    console.log(e.target.value);
    let url = `${staffUrl}?category=${this.state.category}&name=${e.target.value}`;
    console.log(url);

    try {
      const { data } = await axios(url);
      console.log(data);
      await this.setState({ staff: data[0] });
      console.log("Staff", `${this.state.staff}`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  render() {
    const { user } = this.props;

    if (user) {
      let staffs = this.state.staffs;
      let staffItems = staffs.map((staff) => (
        <option key={staff._id}>{staff.name}</option>
      ));

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

          <div style={{ width: "70%" }}>
            <Grid container direction="row" justify="center">
              <Grid item xs={3}>
                <Box marginTop={10}>
                  <h2>
                    {" "}
                    <i> Human Resources </i>{" "}
                  </h2>
                </Box>
              </Grid>
            </Grid>

            <form className="hrform">
              <Grid container direction="row" justify="center">
                <Grid item xs={9}>
                  <Box marginTop={10}>
                    <h2>
                      {" "}
                      <i> Select Staff to view payroll details </i>{" "}
                    </h2>
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={2} direction="row" justify="center">
                <Grid item xs={3}>
                  <FormControl>
                    <InputLabel htmlFor="demo-customized-select-native">
                      {" "}
                    </InputLabel>
                    <NativeSelect
                      onChange={this.handleCategory}
                      input={<BootstrapInput />}
                    >
                      <option aria-label="None" value="0">
                        Select Category
                      </option>
                      <option value="Teaching">Teaching</option>
                      <option value="NonTeaching">NonTeaching</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl>
                    <InputLabel htmlFor="demo-customized-select-native">
                      {" "}
                    </InputLabel>
                    <NativeSelect
                      style={{ marginLeft: "20px" }}
                      value={this.state.name}
                      onChange={this.handleName}
                      input={<BootstrapInput />}
                    >
                      <option aria-label="None" value="">
                        Select Staff
                      </option>
                      {staffItems}
                    </NativeSelect>
                  </FormControl>
                </Grid>
              </Grid>

              {this.state.staff ? (
                <Grid container direction="row" justify="center" border={1}>
                  <Grid container direction="row" justify="center">
                    <Grid item xs={9}>
                      <Box marginTop={4}>
                        <h2>
                          {" "}
                          <i> Staff Details </i>{" "}
                        </h2>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={9}>
                    <Box marginTop={2}>
                      <p>
                        {" "}
                        <small>
                          {" "}
                          <strong> Employee Id </strong>{" "}
                        </small>{" "}
                        : {this.state.staff.empid}{" "}
                      </p>
                      <p>
                        {" "}
                        <small>
                          {" "}
                          <strong> Name </strong>{" "}
                        </small>{" "}
                        : {this.state.staff.name}{" "}
                      </p>
                      <p>
                        {" "}
                        <small>
                          {" "}
                          <strong> Department </strong>{" "}
                        </small>{" "}
                        : {this.state.staff.dept}{" "}
                      </p>
                      <p>
                        {" "}
                        <small>
                          {" "}
                          <strong> Basic Salary </strong>{" "}
                        </small>{" "}
                        : ₹{this.state.staff.basicsalary}{" "}
                      </p>
                      <p>
                        {" "}
                        <small>
                          {" "}
                          <strong> Bonus </strong>{" "}
                        </small>{" "}
                        :₹{this.state.staff.bonus}{" "}
                      </p>
                      <p>
                        {" "}
                        <small>
                          {" "}
                          <strong> Deductions </strong>{" "}
                        </small>{" "}
                        : ₹{this.state.staff.deductions}{" "}
                      </p>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <> Details </>
              )}
            </form>
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

export default connect(mapStateToProps)(HumanResources);
