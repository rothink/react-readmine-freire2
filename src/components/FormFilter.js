import React, {Component} from 'react'
import {TextField, MenuItem, InputAdornment, FormControl, Select} from '@material-ui/core';

const sprints = [
    {
      value: '14',
      label: '14',
    },
    {
      value: '15',
      label: '15',
    }
];




class FormFilter extends Component {
    
    state = {
        sprint: sprints[1]
    }

    constructor(props) {
        super(props)
    }
    

    handleSprint(event) {
        console.info(event.target.value,'valiue')
    }

    render() {

        

        return (
            <div>
                <br/>
                <FormControl fullWidth>
                    <TextField
                        select
                        variant="outlined"
                        label="With Select"
                        value={this.state.sprint.value}
                        onChange={this.handleSprint}
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
