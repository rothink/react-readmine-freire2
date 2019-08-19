import React, {Component} from 'react'
import {TextField, MenuItem, InputAdornment, FormControl, Select} from '@material-ui/core';

const sprints = [
    {
        value: '11',
        label: 'Backlog',
    },
    {
        value: '119',
        label: '10',
    },
    {
        value: '125',
        label: '11',
    },
    {
        value: '134',
        label: '12',
    },
    {
        value: '151',
        label: '13',
    },
    {
        value: '259',
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
    }
    

    handleSprint = (event) => {
        let {onSprintChange} = this.props;
        sprints.filter((sprint) => {
            if(sprint.value == event.target.value) {
                this.setState({sprint : sprint})
            }
        })
        onSprintChange(this.state.sprint.value)
    }

    render() {
        let {sprint} = this.state;

        return (
            <div>
                <br/>
                <FormControl fullWidth sprint={sprint}>
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
