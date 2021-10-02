import React from 'react'


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
          var avg_rate;
          if(data.length>0){
            // for(var i=0;i<data.length;i++){
            //     if(data[i+1]){}
            //     avg_rate=(data[i].rate+data[i+1].rate)/(data.length+1);
            // }
          this.setState({rating:data[0].rate});
          }
          console.log(this.state.rating)

      })
    }
    
    render(){
    return (
        

        
        <div className="card_inner">
            
          
            <div className="card_img">
                <img src={this.state.imageStr ? this.state.imageStr : 'dp.jpg'} alt="card-pic"/>
            </div>
            <div className="card_heading mb-3">
                <h5>{this.props.title}</h5>
            </div>
           
            <div className="card_author fw-bold">
               {this.props.tutor_id.first_name+this.props.tutor_id.last_name}
            </div>
            <div className="card_reviews fw-light">

            {this.state.rating}
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              
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
