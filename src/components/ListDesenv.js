import React, {Component} from 'react'
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
    }

    componentDidMount() {
        this.getMembers();
        this.randomPhoto();
    }

    getMembers() {

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
                
                this.setState({'desenvs' : desenvs})
                this.getIssues()
            })
            .catch((error) => {
                console.error(error, 'error');
            });
    }

    getIssues() {

        const desenvs = this.state.desenvs;
        const issues_not_point = []

        desenvs.map((desenv, key) => {

            this.getIssuesByDesenvId(desenv.user.id)
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
                    console.error(error, 'error');
                })
                .finally(() => {
                    this.setState({'issues_not_point' : issues_not_point})
                    this.setState({'desenvs': desenvs})
                })
        })
    }

    getIssuesByDesenvId(desenvId) {

        let url = 'http://localhost/app-react-readmine-capes/api-issues.php?desenvId='+desenvId

        return axios({
            method:'get',
            url
        })
            .then((res) => {
                return res.data
            })
            .catch((error) => {
                console.error(error, 'error');
            });
    }

    randomPhoto() {
        let url = 'https://randomuser.me/api?results=100&gender=male'
        let photos = [];

        axios({
            method:'get',
            url
        })
            .then((res) => {
                photos = res.data.results
            })
            .catch((error) => {
                console.error(error, 'error');
            })
            .finally(() => {
                let desenvs = this.state.desenvs
                desenvs.map((desenv, key) => {
                    desenvs[key].photo = photos[Math.floor(Math.random() * 100) + 1].picture.medium
                })

                this.setState({'desenvs': desenvs})

            })
    }

    render() {
        const desenvs = this.state.desenvs;
        const listDesenvs = desenvs.map((desenv) => {

            return <div key={desenv.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={desenv.photo} />
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
                                            {/* <Badge color="primary" badgeContent={4} className={this.state.classes.margin}>
                                                <Typography className={this.state.classes.padding}>Typography</Typography>
                                            </Badge> */}
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
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
        })

        return (
            <div>
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        <List>
                            {listDesenvs}
                        </List>
                    </Grid>
                    <Grid item xs={8}>
                        <div className="container">
                            Agora tenho esse espaço em branco aqui
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ListDesenv;
