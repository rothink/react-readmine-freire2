import React, {Component} from 'react'
import ListIssues from '../components/ListIssues'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
import Badge from '@material-ui/core/Badge'
import FormFilter from './FormFilter';
import { deepOrange , deepPurple} from '@material-ui/core/colors';  





class ListDesenv extends Component {

    

    state = {
        desenvs: [],
        issues_not_point: [],
        classes: makeStyles(theme => ({
            root: {
              width: '100%',
              maxWidth: 360,
              backgroundColor: theme.palette.background.paper,
            },
            orangeAvatar: {
                margin: 10,
                color: '#fff',
                backgroundColor: deepOrange[500],
              },
            inline: {
              display: 'inline',
            },
            margin: {
                margin: theme.spacing(2),
              },
              padding: {
                padding: theme.spacing(0, 2),
              },
          }))
    }

    constructor(props) {        
        super(props)
        console.info(this.refs)
        console.info(this.props.sprint)

        
    }

    componentDidMount() {
        this.getMembers();
    }

    getMembers(sprintId = 291) {

        let desenvs = [];
        let url = 'http://localhost/app-react-readmine-capes/api-members.php'

        axios({
            method:'get',
            url
        })
            .then((res) => {
                desenvs = res.data.memberships.filter((res) => {
                    return res.roles.some(role => role.id == 4) // Desenv
                })

                desenvs.sort((a,b) => { 
                    if (a.user.name > b.user.name) {
                        return 1;
                      }
                      if (a.user.name < b.user.name) {
                        return -1;
                      }
                      return 0;
                })
                
                this.setState({desenvs},() => {                    
                    
                });
                this.getIssues(sprintId )
                
            })
            .catch((error) => {
                
            });
    }

    getIssues = (sprintId) => {

        const desenvs = this.state.desenvs;
        const issues_not_point = []

        desenvs.map((desenv, key) => {

            this.getIssuesByDesenvId(desenv.user.id, sprintId)
                .then((res) => {
                    
                    let total_points = 0;

                    if(res.issues.length > 0) {
                       res.issues.map((issue) => {
                            if(!issue.estimated_hours) {
                                issues_not_point.push(issue)
                                return 0
                            }
                            total_points += issue.estimated_hours;
                            return total_points
                        });
                    }
                    
                    desenvs[key].demandas = res
                    desenvs[key].total_points = parseInt(total_points);
                })
                .catch((error) => {
                    
                })
                .finally(() => {
                    this.setState({'issues_not_point' : issues_not_point})
                    this.setState({'desenvs': desenvs})
                })
        })
    }

    getIssuesByDesenvId(desenvId, sprintId) {

        let url = 'http://localhost/app-react-readmine-capes/api-issues.php?desenvId='+desenvId+'&sprintId='+sprintId

        return axios({
            method:'get',
            url
        })
            .then((res) => {
                return res.data
            })
            .catch((error) => {
                
            });
    }

    handleSprintChange = (idSprint) => {
        console.info(idSprint,'id sprint')
        this.getIssues(idSprint)
    }

    render() {
        const desenvs = this.state.desenvs;
        const listDesenvs = desenvs.map((desenv) => {

            let issues = (desenv.demandas && desenv.demandas.issues) ? desenv.demandas.issues : []

            return  <ListItem alignItems="flex-start" key={desenv.id} >
                        <Badge color="primary" badgeContent={4} className={this.state.classes.margin}>
                            <Typography className={this.state.classes.padding}></Typography>
                        </Badge>
                        <ListItemAvatar>
                            <Avatar>{desenv.user.name[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={desenv.user.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        demandas:
                                    </Typography>
                                    <strong> {(desenv.demandas) ? desenv.demandas.total_count : 0} </strong> <br/>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        pontos:
                                    </Typography>
                                    <strong> {desenv.total_points} </strong>
                                </React.Fragment>
                            }
                        />
                        <ListIssues issues = {issues}/>
                        <Divider/>
                    </ListItem>
                    
        })

        return (
            <Grid container>
                <Grid item xs={9}>
                    <FormFilter onSprintChange={this.handleSprintChange}/>
                    <List>
                        {listDesenvs}
                    </List>
                </Grid>
                
            </Grid>
        );
    }
}

export default ListDesenv;
