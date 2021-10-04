import React from 'react';
import './App.css';
import axios from "axios";

export const validEmail = new RegExp(
  '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);
export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

const validRegNumber = new RegExp('^[A-Z0-9 ]+[-]?[0-9]{4}$');


class App extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        users:[],
        id: 0,
        brandName:'',
        vehicleNumber:'',
        chasisNumber:'',
        regNumberError:'',
        brandNameError:'',
        chasisNumberError:'',
      
      }
    }

    
    validateRegNumber = () =>{
      let regNumberError = '';
      const value = this.state.vehicleNumber;

      if(value.trim() === '') regNumberError = "Vehicle number is required";
       else if (!validRegNumber.test(value))
          regNumberError = "Vehicle Number is not valid";

      this.setState({
        regNumberError
      })

      return regNumberError === "";
    }

    validateBrandName = () =>{
      let brandNameError = '';
      const value = this.state.brandName; 
      

      if(value.trim() === '') brandNameError = "Brand name is required";

      this.setState({
        brandNameError
      })

      return brandNameError === "";
    }

    validateChasisNumber = () =>{
      let chasisNumberError = '';
      const value = this.state.chasisNumber;

      if(value.trim() === '') chasisNumberError = "Chasis number is required";

      this.setState({
        chasisNumberError
      })

      return chasisNumberError === "";

    }
    /*validateEmailAddress = () =>{

        let emailError = '';
        const value = this.state.email;
        if(value.trim === '') emailError = "Email Address is required";
        else if (!validEmail.test(value))
          emailError = "Email is not valid";

        this.setState({
          emailError
        });

        return emailError === "";
    };*/
    

    componentDidMount(){
      axios.get("http://localhost:8080/api/")
      .then((response)=>{
        this.setState({
          users:response.data,
          id:0,
          brandName: '',
          //email:'',
          vehicleNumber: '',
          chasisNumber:''
          //password:''
        })
      })
    }

    submit(event,id){
      event.preventDefault();
      const isValidRegNumber = this.validateRegNumber();
      const isValidBrandName = this.validateBrandName();
      const isValidChasisNumber = this.validateChasisNumber();

      
      if(isValidRegNumber && isValidBrandName && isValidChasisNumber){
        if(id === 0){
          axios.post("http://localhost:8080/api/",{
            brandName: this.state.brandName,
            vehicleNumber: this.state.vehicleNumber,
            chasisNumber: this.state.chasisNumber
          })
          .then((response) =>{
            this.componentDidMount();
          })
        }else{
          axios.put("http://localhost:8080/api/",{
            id: this.state.id,
            brandName: this.state.brandName,
            vehicleNumber: this.state.vehicleNumber,
            chasisNumber: this.state.chasisNumber
          })
          .then(() =>{
            this.componentDidMount();
          })

        }
      }
    }
  

    delete(id){      
      axios.delete(`http://localhost:8080/api/${id}`)
      .then((response) => {
        this.componentDidMount();
      })
    }

    edit(id){
      axios.get(`http://localhost:8080/api/${id}`)
      .then((res) => {
        console.log(res);
        this.setState({
          id:res.data.id,
          brandName:res.data.brandName,
          vehicleNumber: res.data.vehicleNumber,
          chasisNumber: res.data.chasisNumber

        })          
      })
    }

    search(id){

    }
    

    render (){
      
      return(        
        <div className="container">
          
            <div className="firstDiv">
              
              <form onSubmit={(e)=>this.submit(e,this.state.id)}>             
                  <div className="col s12">                 
                      <div className="input-field col s12">

                        

                        <i className="material-icons prefix">desktop_windows</i>
                        <input 
                            onChange={(e)=>this.setState({brandName:e.target.value})}                             
                            value={this.state.brandName} 
                            type="text" 
                            id="autocomplete-input" 
                            className="autocomplete"
                        />
                        
                        <label for="autocomplete-input">Brand Name</label>                             
                      </div>
                      <div style={{color: "red"}}>{ this.state.brandNameError }</div>
                  </div>

                  <div className="col s12">                 
                      <div className="input-field col s12">
                        <i className="material-icons prefix">directions_car</i>
                        <input 
                            onChange={(e)=>this.setState({vehicleNumber:e.target.value})} 
                            value={this.state.vehicleNumber} 
                            type="text" 
                            id="autocomplete-input" 
                            className="autocomplete"
                        />
                        
                        <label for="autocomplete-input">Vehicle Number</label>                             
                      </div>
                      <div style={{color: "red"}}>{ this.state.regNumberError }</div>
                  </div>

                  <div className="col s12">                 
                      <div className="input-field col s12">
                        <i className="material-icons prefix">vpn_key</i>
                        <input 
                            onChange={(e)=>this.setState({chasisNumber:e.target.value})} 
                            value={this.state.chasisNumber} 
                            type="text" 
                            id="autocomplete-input" 
                            className="autocomplete"
                        />
                        <label for="autocomplete-input">Chasis Number</label>                             
                      </div>
                      <div style={{color: "red"}}>{ this.state.chasisNumberError }</div>
                  </div>
                  
                  <button className="btn waves-effect waves-light" style={{marginTop: "10px"}}type="submit" name="action">Submit
                      <i className="material-icons right">send</i>
                  </button>

              </form>
            </div>
                 
              <table style={{ width:"100%" }}>
                <thead>
                  <tr>
                      <th>Id</th>
                      <th>Brand Name</th>
                      <th>Vehicle Number</th>
                      <th>Chasis Number</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    this.state.users.map(
                      user =>
                      <tr key = {user.id}>
                        <td>{user.id}</td>
                        <td>{user.brandName}</td>
                        <td>{user.vehicleNumber}</td>
                        <td>{user.chasisNumber}</td>
                        <td>
                        <button onClick={(e)=>this.edit(user.id)} className="btn waves-effect waves-light" type="submit" name="action">Edit
                           <i className="material-icons right">edit</i>
                        </button>
                        </td>
                        <td>
                            <button onClick={(e)=>this.delete(user.id)} className="btn waves-effect waves-light" type="submit" name="action">Delete
                              <i className="material-icons right">delete</i>
                            </button>
                        </td>
                      </tr>
                    )
                  }                                    
                </tbody>
                
              </table>
            
          </div>
        
    );
  }
}

export default App;
