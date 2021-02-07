import React, { Component } from "react";

import '../styles/Fees.scss';
//import TextField from "@material-ui/core/TextField";
//import { Button } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
//import salert from 'sweetalert2'
import ResponsiveDrawer from "../pages/NavBar";

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4
    },  
  },
}))(InputBase);


//const getStudentsUrl = "http://localhost:8700/class/list";
//const getDetailUrl = "http://localhost:8700/fees/getdetail";

const getStudentsUrl = "https://edumanageapp.herokuapp.com/class/list";
const getDetailUrl = "https://edumanageapp.herokuapp.com/fees/getdetail";


class FeeStatus extends Component {  
  constructor(props) {
    super(props);
    
    this.state = {
        std : "",
        name : "", 
        students:[],      
        studentstat: null  
     
    };
   
  }  
  
  handleStd = async(e) => {
    this.setState({ std: e.target.value });
    console.log(e.target.value)
    let url =   `${getStudentsUrl}?std=${e.target.value}`
    console.log(url)

    try{
      const { data } = await axios(url);     
      console.log(data);      
      await this.setState({ students: data }); 
      console.log(this.state.students)
      
    }
    catch(err){
      console.log(err);
      throw(err);
    }

}


handleName = async(e) => {
  this.setState({ name: e.target.value });
  console.log(`${this.state.std}`);
  console.log(e.target.value)
  let url =   `${getDetailUrl}?std=${this.state.std}&name=${e.target.value}`
  console.log(url)  

  try{
    const { data } = await axios(url);     
    console.log(data);      
    await this.setState({ studentstat: data }); 
    console.log(this.state.studentstat)
    
  }
  catch(err){
    console.log(err);
    throw(err);
  }


}


  
  render() {

      
        let studentItems = this.state.students.map((student) =>
                <option key={student._id}>{student.name}</option>
            );

    

      return (
        <div className="pageborder">
          <ResponsiveDrawer history={this.props.history} />
          <div className="container1">

            
          <h3> Fees Status </h3>        
          

          <form >

          <h3> Select Class and Student to view Fees Status</h3>
          
            <FormControl>
              <InputLabel htmlFor="demo-customized-select-native"> Select Class</InputLabel>
                <NativeSelect onChange={this.handleStd}  value={this.state.std}
                input={<BootstrapInput />}
              >
                  <option aria-label="None" value="0" >Select Class</option>
                       <option value="first">First</option>
                       <option value="second">Second</option>
                       <option value="third">Third</option>
                       <option value="fourth">Fourth</option>
                       <option value="fifth">Fifth</option>                      
                       
                </NativeSelect>
              </FormControl>

              <FormControl>
                      <InputLabel htmlFor="demo-customized-select-native"> </InputLabel>
                      <NativeSelect style={{ marginLeft: '20px'}} value={this.state.name} onChange={this.handleName}  
                      input={<BootstrapInput />}
                      >
                       <option aria-label="None" value="" >Select Student</option>                       
                       {studentItems}
                      </NativeSelect>
              </FormControl> 

              {this.state.studentstat ? 
                        (
                          <div>
                          
                          <h4> Student Details </h4>
                          
                          <div>
                              <p> <small>  <strong> Name   </strong> </small> : {this.state.studentstat.name} </p> 
                              <p> <small> <strong>  Class </strong>   </small> : {this.state.studentstat.std} </p>                              
                              <p> <small> <strong>  Fees Amount   </strong> </small> :  ₹ {this.state.studentstat.feesamt} </p>
                              <p> <small> <strong> Fees Paid   </strong> </small> : {this.state.studentstat.feespaid ? "Yes" : "No"} </p>
                              <p> <small> <strong> Payment Mode </strong> </small> :{this.state.studentstat.paymentmode} </p>
                              <p> <small> <strong> Payment Date  </strong> </small> : {this.state.studentstat.paymentdate} </p>                                
                                                      
                                                      
                          </div>
                          </div>
                        ) : (<> </>)}
              

               

          </form>


          </div>    
        </div>
      )
      
  }

}
export default FeeStatus;