import React, {Component} from 'react'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import { Typography, Tooltip, List, Button, Badge } from '@material-ui/core';


class ListIssues extends Component {

    render() {

        let issues = this.props.issues;
        let status = this.props.status;

        const issuesFilter = issues.filter((issue) => {
            return issue.status.id == status
        })

        const listIssues = issuesFilter.map((issue) => { 

            let label = <Typography  key={issue.id}>
                            #{issue.id}
                        </Typography> 
            let link = 'https://redmine.capes.gov.br/issues/'+issue.id
            return <Button href={link} target="_blank" key={issue.id}>
                    <Tooltip title={
                        <React.Fragment>
                            <Typography color="inherit">{issue.subject+'.' }</Typography>
                            <h3><strong>{issue.estimated_hours + ' Pontos'}</strong></h3>
                      </React.Fragment>
                    } placement="top">
                    <Badge color="secondary" badgeContent={(issue.estimated_hours) ? issue.estimated_hours : '0'}>
                        <Chip variant="outlined" color="primary" size="small" label={label} avatar={<Avatar>{issue.tracker.name.substring(0,1)}</Avatar>}/>
                    </Badge>
                        
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
