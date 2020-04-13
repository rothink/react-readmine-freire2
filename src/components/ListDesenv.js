import React, { Component } from "react";
import ListIssues from "../components/ListIssues";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import FormFilter from "./FormFilter";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class ListDesenv extends Component {
  state = {
    desenvs: [],
    issues_not_point: [],
    issue_filter: "",
    classes: makeStyles((theme) => ({
      root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      orangeAvatar: {
        margin: 10,
        color: "#fff",
        backgroundColor: deepOrange[500],
      },
      inline: {
        display: "inline",
      },
      margin: {
        margin: theme.spacing(2),
      },
      padding: {
        padding: theme.spacing(0, 2),
      },
    })),
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getMembers(this.props.sprint);
  }

  getMembers(sprintId = 512) {
    let desenvs = [];
    let url = "http://localhost/react-readmine-freire2/api-members.php";

    axios({
      method: "get",
      url,
    })
      .then((res) => {
        desenvs = res.data.memberships.filter((res) => {
          return res.roles.some((role) => role.id == 4); // Desenv
        });

        //Retirando valdecy, zé e Thiagão
        desenvs = desenvs.filter((dev) => {
          return dev.id != 359 && dev.id != 362 && dev.id != 355;
        });

        desenvs.sort((a, b) => {
          if (a.user.name > b.user.name) {
            return 1;
          }
          if (a.user.name < b.user.name) {
            return -1;
          }
          return 0;
        });

        this.setState({ desenvs }, () => {});
        this.getIssues(sprintId);
      })
      .catch((error) => {});
  }

  getIssues = (sprintId) => {
    const desenvs = this.state.desenvs;
    const issues_not_point = [];

    desenvs.map((desenv, key) => {
      this.getIssuesByDesenvId(desenv.user.id, sprintId)
        .then((res) => {
          let total_points = 0;
          if (res.issues.length > 0) {
            res.issues.map((issue) => {
              if (issue.status.id == 6) {
                // Somente demandas finalizadas
                let points = issue.custom_fields.find((e) => {
                  return e.name == "Pontos de história";
                });
                total_points += parseInt(points.value ? points.value : 0);
                return total_points;
              }
              return 0;
            });
          }

          desenvs[key].demandas = res;
          desenvs[key].total_points = parseInt(total_points);
        })
        .catch((error) => {})
        .finally(() => {
          this.setState({ issues_not_point: issues_not_point });
          this.setState({ desenvs: desenvs });
        });
    });
  };

  getIssuesByDesenvId(desenvId, sprintId) {
    let url =
      "http://localhost/react-readmine-freire2/api-issues.php?desenvId=" +
      desenvId +
      "&sprintId=" +
      sprintId;

    return axios({
      method: "get",
      url,
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {});
  }

  handleSprintChange = (idSprint) => {
    this.getIssues(idSprint);
  };

  handleIssueFilter = (idSprint, idIssue) => {
    this.setState({ issue_filter: idIssue });
    this.getIssues(idSprint);
  };

  render() {
    const desenvs = this.state.desenvs;
    let totalAllPoints = 0;

    const listDesenvs = desenvs.map((desenv) => {
      let issues =
        desenv.demandas && desenv.demandas.issues ? desenv.demandas.issues : [];

      if (this.state.issue_filter) {
        issues = issues.filter((issue) => {
          let issueString = issue.id.toString();
          let issueFilterString = this.state.issue_filter.toString();
          return issueString.includes(issueFilterString);
        });
      }

      totalAllPoints += desenv.total_points ? desenv.total_points : 0;

      return (
        <TableRow key={desenv.id}>
          <TableCell component="th" scope="row">
            <ListItem alignItems="flex-start" key={desenv.id}>
              <Badge
                color="secondary"
                badgeContent={
                  desenv.demandas ? desenv.demandas.total_count : "0"
                }
                className={this.state.classes.margin}
              >
                <Typography className={this.state.classes.padding}></Typography>
              </Badge>
              <ListItemAvatar>
                <Avatar>
                  {desenv.user.name[0]}
                  {desenv.user.name[1].toUpperCase()}
                </Avatar>
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
                      pontos:
                    </Typography>
                    <strong> {desenv.total_points} </strong>
                  </React.Fragment>
                }
              />
            </ListItem>
          </TableCell>
          <TableCell align="right">
            {/* Em planejamento */}
            <ListIssues issues={issues} status={`2`} desenvs={desenvs} />
          </TableCell>
          <TableCell align="right">
            {/* Em execução */}
            <ListIssues issues={issues} status={`3`} desenvs={desenvs} />
          </TableCell>
          <TableCell align="right">
            {/* Code review */}
            <ListIssues issues={issues} status={`9`} desenvs={desenvs} />
          </TableCell>
          <TableCell align="right">
            {/* Test */}
            <ListIssues issues={issues} status={`4`} desenvs={desenvs} />
          </TableCell>
          <TableCell align="right">
            {/* Em homolog */}
            <ListIssues issues={issues} status={`5`} desenvs={desenvs} />
          </TableCell>
          <TableCell align="right">
            {/* Homologado */}
            <ListIssues issues={issues} status={`10`} desenvs={desenvs} />
          </TableCell>
          <TableCell align="right">
            {/* finalizado */}
            <ListIssues issues={issues} status={`6`} desenvs={desenvs} />
          </TableCell>
        </TableRow>
      );
    });

    let table = (
      <TableRow>
        <TableCell align="left">
          Total: <strong> {totalAllPoints} </strong> pontos
        </TableCell>
      </TableRow>
    );

    return (
      <Grid container>
        <Grid item xs={12}>
          <FormFilter
            onSprintChange={this.handleSprintChange}
            onIssueFilter={this.handleIssueFilter}
          />
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Desenvolvedor</TableCell>
                  <TableCell align="center">Planejamento </TableCell>
                  <TableCell align="center">Execução </TableCell>
                  <TableCell align="center">Revisão</TableCell>
                  <TableCell align="center">Teste</TableCell>
                  <TableCell align="center">Homologação</TableCell>
                  <TableCell align="center">Homologado</TableCell>
                  <TableCell align="center">Finalizado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listDesenvs}
                {table}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default ListDesenv;
