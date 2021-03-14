import React from 'react';

class Form extends React.Component {

    constructor(props){
      super(props);
      this.state ={
        edituser: props.user || {}
      }
    }

    change = (e, property) => {
          e.preventDefault();
          var { edituser } = this.state;
          edituser[property] = e.target.value
          this.setState({
            edituser:  edituser
          })
      };
  
   
    render(){

    let { operation } = this.props;
    let { edituser } = this.state;
    if (operation == "Edit" ) {
    return (    
    <div >
    <form>
      <div className="mr-4 ml-4 mb-4 mt-4">
          <div className="form-group" >
          <label>Name</label>
          <input 
           name="name"
           placeholder="Name" 
           value={edituser && edituser.name}  
           onChange={e => this.change(e, "name")} 
           className="form-control" 
           id="name" 
           required />
          </div>
                  
          <div className="form-group">
          <label>Gender</label>
          <input  
           name="gender"
           placeholder="Gender" 
           value={edituser && edituser.gender}  
           onChange={e => this.change(e, "gender")} 
           className="form-control" 
                id="gender"  />
          </div>

          <div className="form-group">
          <label>Email</label>
          <input  
           name="email"
           placeholder="Email ID" 
           value={edituser && edituser.email}  
           onChange={e => this.change(e, "email")} 
           className="form-control" 
                id="email"  />
          </div>

          <div className="form-group">
          <label>Surveys</label>
          <input  
           name="surveys"
           placeholder="Surveys" 
           value={edituser && edituser.surveys}  
           onChange={e => this.change(e, "surveys")} 
           className="form-control" 
                id="surveys"  />
          </div>
          <button onClick={(e) => { this.props.onSubmit(e, this.state.edituser) }  } className="btn btn-primary" on>Submit</button>
          </div>
      </form>
      
    </div> 
    )
    }

    else {
      return (

        <div >
    <form>
      <div className="mr-4 ml-4 mb-4 mt-4">
          <div className="form-group">
          <label>Name</label>
          <input 
           name="name"
           placeholder="Name" 
           onChange={e => this.change(e, "name")} 
           className="form-control" 
           id="name" 
           required />
          </div>
                  
          <div className="form-group">
          <label>Gender</label>
          <input  
           name="gender"
           placeholder="Gender"  
           onChange={e => this.change(e, "gender")} 
           className="form-control" 
                id="gender"  />
          </div>

          <div className="form-group">
          <label>Email</label>
          <input  
           name="email"
           placeholder="Email ID"   
           onChange={e => this.change(e, "email")} 
           className="form-control" 
                id="email"  />
          </div>

          <div className="form-group">
          <label>Surveys</label>
          <input  
           name="surveys"
           placeholder="Surveys"  
           onChange={e => this.change(e, "surveys")} 
           className="form-control" 
                id="surveys"  />
          </div>
          <button onClick={() => { this.props.onSubmit(this.state.edituser) }  } type="submit" className="btn btn-primary" on>Submit</button>
          </div>
      </form>
      
    </div> 

      )
    }

  }
}
 
export default Form;
