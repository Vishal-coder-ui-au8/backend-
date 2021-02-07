import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import salert from "sweetalert2";

import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ResponsiveDrawer from "./NavBar";

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

//const stdUrl = "http://localhost:8700/class/list";
//const sendUrl = "http://localhost:8700/class/sendemail";

const stdUrl = "https://edumanageapp.herokuapp.com/class/list";
const sendUrl = "https://edumanageapp.herokuapp.com/class/sendemail";

class Communication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      std: "",
      students: [],
      student: "",
      recipients: "",
      subject: "",
      content: "",
    };
  }

  handleStd = async (e) => {
    this.setState({ std: e.target.value });
    console.log(e.target.value);
    let url = `${stdUrl}?std=${e.target.value}`;
    console.log(url);

    try {
      const { data } = await axios(url);
      console.log(data);
      await this.setState({ students: data });
      console.log(this.state.students);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  handleStudent = (e) => {
    this.setState({ student: e.target.value });

    var recep = this.state.recipients;
    if (recep.length === 0) {
      recep = e.target.value;
    } else {
      recep = recep + "," + e.target.value.trim();
    }

    this.setState({ recipients: recep });

    //delete the selected student from the list of students
    //so that he/she is not selected again
    let newEditStudents = this.state.students.filter(
      (student) => student.name !== e.target.value.trim()
    );
    this.setState({ students: newEditStudents });
    console.log("new state of students", this.state.students);
  };

  handleSubject = (e) => {
    this.setState({ subject: e.target.value });
  };

  handleRecipients = (e) => {
    this.setState({ recipients: e.target.value });
  };

  handleContent = (e) => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    console.log(this.state);
    const { std, recipients, subject, content } = this.state;
    console.log(JSON.stringify(this.state));
    fetch(sendUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("ltk"),
      },
      body: JSON.stringify({ std, recipients, subject, content }),
    })
      .then((res) => {
        this.setState({
          std: "",
          students: [],
          student: "",
          recipients: "",
          subject: "",
          content: "",
        });
        salert.fire(" ", "Email sent", "success");
      })
      .catch((err) => {
        console.log(err);
        salert.fire(" ", err.message, "error");
        throw err;
      });
  };

  handleClear = (e) => {
    this.setState({
      std: "",
      students: [],
      student: "",
      recipients: "",
      subject: "",
      content: "",
    });
  };

  render() {
    let students = this.state.students;
    let studentItems = students.map((student) => (
      <option key={student._id}>{student.name}</option>
    ));

    const { user } = this.props;

    if (user) {
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
                    <i> Send Emails </i>
                  </h2>
                </Box>
              </Grid>
            </Grid>

            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={2} direction="row" justify="center">
                <Grid item xs={2}>
                  <FormControl>
                    <InputLabel htmlFor="demo-customized-select-native">
                      {" "}
                    </InputLabel>
                    <NativeSelect
                      disabled={this.state.std}
                      onChange={this.handleStd}
                      name="stdlist"
                      input={<BootstrapInput />}
                    >
                      <option aria-label="None" value="0">
                        Select Class
                      </option>
                      <option value="first">One</option>
                      <option value="second">Two</option>
                      <option value="third">Three</option>
                      <option value="fourth">Four</option>
                      <option value="fifth">Five</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl>
                    <InputLabel htmlFor="demo-customized-select-native">
                      {" "}
                    </InputLabel>
                    <NativeSelect
                      disabled={this.state.student === "entire"}
                      value={this.state.student}
                      onChange={this.handleStudent}
                      input={<BootstrapInput />}
                    >
                      <option aria-label="None" value="">
                        Select students from a class
                      </option>
                      <option
                        disabled={
                          !(
                            this.state.student === "entire" ||
                            this.state.student === ""
                          )
                        }
                        value="entire"
                      >
                        Entire Class
                      </option>
                      {studentItems}
                    </NativeSelect>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={8} style={{ marginTop: 40 }}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Recipients"
                    multiline
                    rows={2}
                    variant="outlined"
                    name="recipients"
                    value={this.state.recipients}
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={8} style={{ marginTop: 40 }}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Subject"
                    variant="outlined"
                    name="recipients"
                    value={this.state.subject}
                    onChange={this.handleSubject}
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={8} style={{ marginTop: 40 }}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Email Contents"
                    multiline
                    rows={9}
                    variant="outlined"
                    value={this.state.content}
                    onChange={this.handleContent}
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                spacing={0}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={1} style={{ marginTop: 40, marginBottom: 20 }}>
                  <Button variant="contained" color="primary" type="submit">
                    Send
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={1}
                  style={{ marginTop: 40, marginBottom: 20, marginLeft: 4 }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleClear}
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
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

export default connect(mapStateToProps)(Communication);
