import React from "react";
import { BiEdit } from "react-icons/bi";

export default class Table extends React.Component {

    state = {
      show: false,
      singleUser: ""
    }

    handleModal(user) {
      console.log("Befor state",user);
      this.setState({show: true, singleUser:user})
    };

    handleClose(){
      this.setState({show:false})
    };


    render(){
        var { users, onDelete, onHandleOperation } = this.props;
        
        if (users.length === 0)
          return <center><p><b>There are no users in the database</b></p></center>      

        return  (
          <div>
          <div >
          <center><p><b>Showing {users.length} users in the database</b></p></center>
          </div>
          <table className="table">
            <thead>
                <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Registered Time</th>
                <th>Surveys</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
              
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.registeredAt}</td>
              <td>{user.surveys }</td>
              <td>
              <BiEdit onClick={()=> onHandleOperation(user, "Edit")} />
              </td>
              <td>
                <button onClick={() => onDelete(user.userId)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        </div>
        );
        }
    }

    //&& user.surveys.join()