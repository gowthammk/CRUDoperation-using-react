import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Modal from 'react-bootstrap/Modal';

import Table from "./Table";
import Form from "./Form";
import SearchBox from "./SearchBox/SearchBox"



class FetchUser extends Component {

    state = { 
        fields: {},
        users: [],
        operation: "",
        editUser: {},
        searchQuery: ""
     }

    async componentDidMount(){
    const url = "https://dashboard-api.bounceinsights.com/misc/sampleUsers";
    const response = await fetch(url);
    // Deals with response statuses
    if ( response.status === 200) {
      const data = await response.json();
      this.setState({ users: data.users, loading: false, errorMessage: "" });
    }
    else if( response.status === 404 ) {
      this.setState({ errorMessage: "URL Not found", loading: false });
    }
    else if( response.status === 401 ) {
      this.setState({ errorMessage: "Unauthorised", loading: false });
    }
    else if( response.status === 403 ) {
      this.setState({ errorMessage: "Forbidden", loading: false });
    }
    else if( response.status === 500 ) {
      this.setState({ errorMessage: "Internal Server Error", loading: false });
    }
    else if( response.status === 502 ) {
      this.setState({ errorMessage: "Bad Gateway", loading: false });
    }
    }

    //Delete User
    handleDelete = (deleteuser) => {
      const newUsers = this.state.users.filter(u => u.userId !== deleteuser);
      this.setState({users: newUsers});
    };

    // Add user
    addNewUser = (user) => {
      var { users } = this.state;
      user.userId = users.length + 1;
      user.registeredAt = new Date().toISOString();
      users.push(user);
      this.setState({ users: users, operation: ""});
    };

    //Edit existing user
    handleEdit = (e, user) => {  
      var { users } = this.state;
      var userInd = users.findIndex((u) => u.userId == user.userId);
      if (userInd != -1) {
        users[userInd] = user;
        this.setState({ users: users, operation: "", editUser: {} });
      }
    };

    // Either adds or deletes
    handleOperation = (user, ops) => {
      this.setState({operation: ops, edituser: user})
    }

    
    handleModal (){
        this.setState({operation: "Add"})
    }

    // Search a user
    handleSearch = query => {
        console.log(query);
        this.setState({ searchQuery: query});
    }

    render() {
      const { searchQuery, users } = this.state;

      const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return(
      <div>
      <SearchBox value={this.state.searchQuery} onChange={this.handleSearch}></SearchBox>
      <Table users = {filteredUsers} onDelete={this.handleDelete} onHandleOperation={this.handleOperation} />
      { this.state.operation  == "Edit" && 
      <Modal show={true}>
      <Form user={this.state.edituser} operation={this.state.operation}  onSubmit={this.handleEdit} /> 
      </Modal> 
      }
      { this.state.operation == "Add" &&
      <Modal show={true}>
      <Form  onSubmit={fields => this.addNewUser(fields)} /> 
      </Modal>
      }
      <center><button onClick={()=> this.handleModal() } className="btn btn-success" >Add User</button></center>
      </div>
      );
    }
}
 
export default FetchUser;