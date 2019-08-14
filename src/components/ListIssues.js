import React, {Component} from 'react'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import { Typography, Tooltip, List, Button } from '@material-ui/core';

class ListIssues extends Component {

    render() {

        let issues = this.props.issues;

        const listIssues = issues.map((issue) => { 
            let label = <Typography  key={issue.id}>
                            #{issue.id}
                        </Typography> 
            let link = 'https://redmine.capes.gov.br/issues/'+issue.id
            let description = issue.subject + ' - ' + issue.estimated_hours + ' Pontos'
            return <Button href={link} target="_blank">
                <Tooltip title={description} placement="top">
                    <Chip variant="outlined" color="primary" size="small" label={label} avatar={<Avatar>{issue.tracker.name.substring(0,1)}</Avatar>}/>
                </Tooltip>
            </Button>
        })

        return (
            <List>
                {listIssues}
            </List>
        );
    }
}

export default ListIssues;
