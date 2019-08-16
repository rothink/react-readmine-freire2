import React, {Component} from 'react'
import {TextField, MenuItem, InputAdornment, FormControl, Select} from '@material-ui/core';

const sprints = [
    {
      value: '29',
      label: '14',
    },
    {
      value: '291',
      label: '15',
    }
];

class FormFilter extends Component {
    
    state = {
        sprint: sprints[1]
    }

    constructor(props) {
        super(props)
        this.handleSprint = this.handleSprint.bind(this);

    }
    

    handleSprint(event) {
        sprints.filter((sprint) => {
            if(sprint.value == event.target.value) {
                this.setState({'sprint' : sprint})
            }
        })
        alert('troquei');
        
    }

    render() {

        return (
            <div>
                <br/>
                <FormControl fullWidth sprint={this.state.sprint}>
                    <TextField
                        select
                        variant="outlined"
                        label="With Select"
                        value={this.state.sprint.value}
                        onChange={this.handleSprint}
                        onChange={this.props.onSprintChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Sprint</InputAdornment>,
                        }}
                    >
                        {sprints.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
            </div>
        );
    }
}

export default FormFilter;
