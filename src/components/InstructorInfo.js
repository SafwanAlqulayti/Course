import React, { Component } from 'react';
import { BrowserRouter as Router, Link,Redirect, Route  , withRouter} from "react-router-dom";
import jwt_decode from 'jwt-decode';

import axios from 'axios';

class InstructorInfo extends Component {
	constructor(){
		super()
		this.state = {
			arr: [] ,
			checkRole: ""
		}
	}
	componentDidMount(){
		axios.get('https://cors-anywhere.herokuapp.com/https://course-exam.herokuapp.com/users/')
		.then((res)=>{
			console.log(res.data)
			console.log("instrucot info ")
			const s = res.data.filter(x=> x.role ==="instructor")
			console.log(s)
			this.setState({
				arr: s
			})
		})
		if(localStorage.getItem('tokens')){
		const  x = localStorage.getItem('tokens') ;
        console.log(x)
   const user =jwt_decode(x)
   console.log(user.user.role)
   this.setState({
    checkRole : user.user.role
   })
}
  

}
	 
    render() {
        return (
            <div>
             

			
<section class="section speakers white">
	<div class="container">
		<div class="row">
			<div class="col-12">
 				<div class="section-title">
					<h3>Who <span class="alternate">Teaching?</span></h3>
					<p>Our great Instructors</p>
				</div>
			</div>
		</div>
		<div class="row">
		{this.state.arr.map((elemnt , key)=>
			<div class="col-lg-3 col-md-4 col-sm-6">
 				<div class="speaker-item">
					<div class="image">
						<img src={elemnt.img} alt="Instructor" class="img-fluid"></img>
						<div class="primary-overlay"></div>
						<div class="socials">
							<ul class="list-inline">
								<li class="list-inline-item"><a href="#"><i class="fa fa-facebook"></i></a></li>
								<li class="list-inline-item"><a href="#"><i class="fa fa-twitter"></i></a></li>
								<li class="list-inline-item"><a href="#"><i class="fa fa-linkedin"></i></a></li>
								<li class="list-inline-item"><a href="#"><i class="fa fa-pinterest"></i></a></li>
							</ul>
						</div>
					</div>
					<div class="content text-center">
						<h5><a href="single-speaker.html">{elemnt.username}</a></h5>
						<span>{elemnt.major}</span><br></br>
						{this.state.checkRole === "user" ?
						<button type="button" class="btn btn-primary" onClick={()=>{ this.props.history.push(`/oneinstructor/${elemnt._id}`)}}>See my courses</button>
						:console.log("test")
						}
					 
					</div>
				</div>
			</div>
		)}
			
			
		</div>
	</div>
</section>
            </div>
        );
    }
}

export default withRouter(InstructorInfo);