import React, { Component } from "react";
import Tab from "./Tab.jsx";

class RequestTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTab: "",
      tabContentShown: []
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  handleTabSelect(val) {
    switch (val) {
      case "Request Body":
        this.setState({
          openTab: val
        });
        break;
      case "Request Variables":
        this.setState({
          openTab: val
        });
        break;
      case "Request Cookies":
        this.setState({
          openTab: val
        });
        break;
      case "Request Headers":
        this.setState({
          openTab: val
        });
        break;
      default:
    }
  }

  componentDidMount() {
    this.handleTabSelect("Request Headers");
  }

  render() {
    let body = "Request Body";
    let cookies = 'Request Cookies';
    let headers = "Request Headers";
    let variables = "Request Variables";
    let tabContentShown;

    if (this.state.openTab === "Request Body") {
      tabContentShown = !!this.props.requestContent.body
        ? <pre><p className="reqResContent info" key={`reqResContent${this.props.requestContent.id}`} >{this.props.requestContent.body}</p></pre>
        : <p className="reqResContent" key={`reqResContent${this.props.requestContent.id}`} >No Request Body</p>
    }

    else if (this.state.openTab === "Request Variables") {
      tabContentShown = !!this.props.requestContent.bodyVariables
        ? <pre><p className="reqResContent info" key={`reqResContent${this.props.requestContent.id}`} >{this.props.requestContent.bodyVariables}</p></pre>
        : <p className="reqResContent" key={`reqResContent${this.props.requestContent.id}`} >No Request Variables</p>
    }

    else if (this.state.openTab === "Request Headers") {
      tabContentShown = [];
      if (this.props.requestContent.headers && this.props.requestContent.headers.length > 0) {
        this.props.requestContent.headers.forEach((cur, idx) => {
          tabContentShown.push(
            <div className={"grid-2"} key={idx}>
              <span className={"tertiary-title title_offset"}>{cur.key}</span>
              <span className={"tertiary-title title_offset"}>{cur.value}</span>
            </div>
          );
        });
      }
      else {
        tabContentShown.push(<p className="reqResContent" key={`reqResContent${this.props.requestContent.id}`} >No Request Headers</p>)
      }
    }

    else if (this.state.openTab === "Request Cookies") {
      tabContentShown = [];
      if (this.props.requestContent.cookies && this.props.requestContent.cookies.length > 0) {
        this.props.requestContent.cookies.forEach((cur, idx) => {
          tabContentShown.push(
            <div className={"grid-2"} key={idx}>
              <span className={"tertiary-title title_offset"}>{cur.key}</span>
              <span className={"tertiary-title title_offset"}>{cur.value}</span>
            </div>
          );
        });
      }
      else {
        tabContentShown.push(<p className="reqResContent" key={`reqResContent${this.props.requestContent.id}`}>No Request Cookies</p>)
      }
    }

    return (
      <div className={"request_tabs_container"}>
        <ul className={"tab_list"}>
          <Tab onTabSelected={this.handleTabSelect} tabName={headers} openTab={this.state.openTab} />
          <Tab onTabSelected={this.handleTabSelect} tabName={cookies} openTab={this.state.openTab} />
          <Tab onTabSelected={this.handleTabSelect} tabName={body} openTab={this.state.openTab} />
          {
            this.props.requestContent.bodyType === "GQL" &&
            <Tab onTabSelected={this.handleTabSelect} tabName={variables} openTab={this.state.openTab} />
          }
        </ul>
        <div className={"tab_content"}>{tabContentShown}</div>
      </div>
    );
  }
}

export default RequestTabs;
