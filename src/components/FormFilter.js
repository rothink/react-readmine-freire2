import React, { Component } from "react";
import {
  TextField,
  MenuItem,
  InputAdornment,
  FormControl,
  Select,
  Button,
  Box,
  Grid,
} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

const sprints = [
  {
    value: "11",
    label: "Backlog",
  },
  {
    value: "119",
    label: "10",
  },
  {
    value: "125",
    label: "11",
  },
  {
    value: "134",
    label: "12",
  },
  {
    value: "151",
    label: "13",
  },
  {
    value: "259",
    label: "14",
  },
  {
    value: "291",
    label: "15",
  },
  {
    value: "305",
    label: "16",
  },
  {
    value: "311",
    label: "17",
  },
  {
    value: "312",
    label: "18",
  },
  {
    value: "313",
    label: "19",
  },
  {
    value: "314",
    label: "20",
  },
  {
    value: "420",
    label: "21",
  },
  {
    value: "403",
    label: "22",
  },
  {
    value: "470",
    label: "23",
  },
  {
    value: "490",
    label: "24",
  },
  {
    value: "512",
    label: "25",
  },
  {
    value: "528",
    label: "26",
  },
  {
    value: "536",
    label: "27",
  },
  {
    value: "550",
    label: "28",
  },
  {
    value: "564",
    label: "29",
  },
  {
    value: "607",
    label: "30",
  },
  {
    value: "625",
    label: "31",
  },
  {
    value: "644",
    label: "32",
  },
  {
    value: "647",
    label: "33",
  },

];

class FormFilter extends Component {
  state = {
    sprint: sprints[sprints.length - 1],
    issue: "",
  };

  constructor(props) {
    super(props);
  }

  handleSprint = (event) => {
    let { onSprintChange } = this.props;
    sprints.filter((sprint) => {
      if (sprint.value == event.target.value) {
        this.setState({ sprint: sprint });
        onSprintChange(sprint.value);
      }
    });
  };

  handleClickSprint = (event, value) => {
    if (!value) {
      value = event.target.value;
    }

    let { onSprintChange } = this.props;
    sprints.filter((sprint) => {
      if (sprint.value == value) {
        this.setState({ sprint: sprint });
        onSprintChange(sprint.value);
      }
    });
  };

  handleIssueFilter = (event) => {
    let { onIssueFilter } = this.props;
    this.setState({ issue: event.target.value });
    onIssueFilter(this.state.sprint.value, event.target.value);
  };

  render() {
    let { sprint } = this.state;
    let { issue } = this.state;

    return (
      <div>
        <br />
        <Grid container spacing={3}>
          <Grid item xl={5}>
            <FormControl sprint={sprint} fullWidth>
              <TextField
                select
                label="With Select"
                value={this.state.sprint.value}
                onChange={this.handleSprint}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Sprint</InputAdornment>
                  ),
                }}
              >
                {sprints.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel htmlFor="adornment-amount">Nª</InputLabel>
              <Input
                id="adornment-amount"
                startAdornment={
                  <InputAdornment position="start">#</InputAdornment>
                }
                value={this.state.issue.value}
                onChange={(e) => this.handleIssueFilter(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <br />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e) => {
                this.handleClickSprint(e, this.state.sprint.value);
              }}
            >
              Atualizar
            </Button>
          </Grid>
        </Grid>
        <br />
      </div>
    );
  }
}

export default FormFilter;
