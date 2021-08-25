import React from "react";
import "../styles/Nav.css";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

function Nav(props) {
  let history = useHistory();
  const handleRoute = (route) => {
    history.push("/" + route);
  };
  function flatten(arr) {
    return arr?.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      );
    }, []);
  }
  const options = props.movieList?.map((list) => list.data);
  const searchOptions = [];
  const flattenArray = flatten(options);
  // eslint-disable-next-line
  const x = flattenArray?.forEach((optn) =>
    searchOptions.push({ title: optn.title, id: optn.id })
  );
  const uniqueSearchOptions = flattenArray?.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );

  const useStyles = makeStyles((theme) => ({
    //   root: {
    //   "& .MuiOutlinedInput-notchedOutline": {
    //     borderColor: "white"
    //   },
    //   "& .MuiOutlinedInput-input": {
    //     backgroundColor: "gray"
    //   },
    //   "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //     borderColor: "white"
    //   },
    //   "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //     borderColor: "gray"
    //   }
    // }
  }));
  // eslint-disable-next-line
  const classes = useStyles();
  return (
    <div className="nav">
      <div class="title" style={{"fontSize":"34px", "color":"violet"}}><b>Mediaflix</b></div>
      <div onClick={() => handleRoute("movies")}>Movies</div>
      <div onClick={() => handleRoute("tv")}>TV</div>
      <Autocomplete
        id="combo-box-demo"
        className="autoComplete"
        options={uniqueSearchOptions}
        getOptionLabel={(option) => option.title || ""}
        onChange={props.onChange}
        renderInput={(params) => (
          <TextField {...params} label={props.label} variant="outlined" />
        )}
      />
    </div>
  );
}

export default Nav;
