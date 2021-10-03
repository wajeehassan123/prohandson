import React from 'react'
import ReactStars from "react-rating-stars-component";


export class Card extends React.Component {
    constructor(props){
        super(props);
        this.state={rating:'',imageStr:"./uploads/"+props.img,dataLoaded:false}
        this.getReviews=this.getReviews.bind(this);
        
        
    }
    componentDidMount(){
        this.getReviews()
    }

    getReviews(){
        fetch(`/api/courses/getReviews/${this.props._id}`)
        .then(response => response.json())
  .then(data => 
      {
          console.log(data);
          let avg_rate
          let  sum=0
          data.forEach(element => {
              sum += element.rate
          });
          let len = data.length
         avg_rate = sum/len
          this.setState({rating:avg_rate});
          
          console.log(this.state.rating + "is the rating")

      })
    }
    
    render(){
        console.log(this.state.rating + 'bro');

        let nos = this.state.rating
        console.log(nos + 'nos');
        let bro = 4
    return (
        

        
        <div className="card_inner">
            
          
            <div className="card_img">
                <img src={this.state.imageStr ? this.state.imageStr : 'dp.jpg'} alt="card-pic"/>
            </div>
            <div className="card_heading mb-3">
                <h5>{this.props.title}</h5>
            </div>
           
            <div className="card_author fw-bold">
               
 {this.props.tutor_id.first_name + ' ' + this.props.tutor_id.last_name}
                        </div>
            <div className="card_reviews fw-light">

         
        {this.state.rating?
        <div className="rating_stars">
        {this.state.rating?this.state.rating:<p>No rating</p>}
         
         <ReactStars
                 // count={this.state.rating}
                 value={1}
                 count={1}
                 // value={3}
                 
                 size={18}
                 isHalf = {true}
                 edit = {false}
                 activeColor="#ffd700"
                 classNames="stars"
             />
        </div>:
        <div>No ratings Yet</div>}
           
              
            </div>
            <div className="card_price fw-bold">
               {this.props.price} $
            </div>
            <div className="card_badge">
                bestseller
            </div>
        </div>
    )
        
    }
}
