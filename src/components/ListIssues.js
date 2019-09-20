import React, {Component} from 'react'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import { Typography, Tooltip, List, Button, Badge } from '@material-ui/core';

class ListIssues extends Component {

    damandaStatus = {
        FINALIZADO : 6,
        EXECUCAO : 3,
        CODEREVIEW : 9,
        HOMOLOGACAO : 5,
        PLANEJAMENTO : 2
    };

    render() {

        let issues = this.props.issues;
        let status = this.props.status;

        const issuesFilter = issues.filter((issue) => {
            return issue.status.id == status
        })

        const listIssues = issuesFilter.map(function(issue) { 

            const style = {
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                border: 0,
                color: 'white',
                height: 35,
                padding: '0 15px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            };
            
            if(issue.status.id == this.damandaStatus.FINALIZADO) {
                style.background = 'linear-gradient(45deg, green 30%, #8fed85 90%)'
                style.boxShadow = '0 3px 5px 2px rgba(182, 243, 145, 1)'
            }

            if(issue.status.id == this.damandaStatus.EXECUCAO) {
                style.background = 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                style.boxShadow = '0 3px 5px 2px rgba(141, 200, 211, 0.86)'
                
            }

            if(issue.status.id == this.damandaStatus.CODEREVIEW) {
                style.background = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                style.boxShadow = '0 3px 5px 2px rgba(243, 145, 145, 1)'
            }

            if(issue.status.id == this.damandaStatus.HOMOLOGACAO) {
                style.background = 'linear-gradient(45deg, #a3a310 30%, #f5f573 90%)'
                style.boxShadow = '0 3px 5px 2px rgba(243, 239, 145, 1)'
            }

            if(issue.status.id == this.damandaStatus.PLANEJAMENTO) {
                style.background = 'linear-gradient(45deg, #61615e 30%, #a1a19c 90%)'
                style.boxShadow = '0 3px 5px 2px rgba(145, 145, 145, 1)'
            }

            let label = <Typography  key={issue.id}>
                            #{issue.id}
                        </Typography> 
            let link = 'https://redmine.capes.gov.br/issues/'+issue.id

            return <Button href={link} target="_blank" key={issue.id} >
                    <Tooltip title={
                        <React.Fragment>
                            <Typography color="inherit">{issue.subject+'.' }</Typography>
                            <h2><strong>{issue.estimated_hours + ' Pontos'}</strong></h2>
                      </React.Fragment>
                    } placement="top">
                    <Badge color="primary" badgeContent={(issue.estimated_hours) ? issue.estimated_hours : '0'} >
                        <Chip variant="outlined" style={style} size="small" label={label} avatar={<Avatar>{issue.tracker.name.substring(0,1)}</Avatar>}/>
                    </Badge>
                        
                    </Tooltip>
                </Button>
        }, this)

        return (
            <List>
                {listIssues}
            </List>
        );
    }
}

export default ListIssues;
