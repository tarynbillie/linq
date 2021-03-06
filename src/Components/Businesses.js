import React, { Component } from 'react'

export default class Businesses extends Component {
    state={
        businessType: this.props.match.params.id,
        business:[]
    }
    async componentDidMount(){
        let init = {
            method:'POST',
            body: JSON.stringify(this.state),
            headers:{
              "content-type": "application/json"
            }
          }
        await fetch('http://localhost:8080/businesses', init)
        .then( res => res.json())
        .then( data => this.setState({
                business: data
            })
        )
        .catch( err => console.log(err) )
    }

  render() {
      let displayCompany =
        this.state.business.map(arr=>{
            return( 
            <div className='companyDisplay'>
                <img src={arr.dataValues.img} />
                <h1> {arr.dataValues.businessName} </h1>
                <div onClick={()=>{ this.props.history.push('/Genre/'+this.state.businessType+'/'+arr.businessName.split(' ').join(''))} }> Visit Company Site </div>
                <h2> {arr.dataValues.address} </h2>
            </div>
        )})
    return (
      <div className='businesses'>
        {displayCompany}
      </div>
    )
  }
}
