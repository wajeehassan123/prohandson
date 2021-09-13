import React from 'react'


export const Card = (props) => {
    // var base64Flag = 'data:image/png;base64,';
    // function arrayBufferToBase64(buffer) {
    //     var binary = '';
    //     var bytes = [].slice.call(new Uint8Array(buffer));
    //     bytes.forEach((b) => binary += String.fromCharCode(b));
    //     return window.btoa(binary);
    // }

    var imageStr = "./uploads/"+props.img;
    
    return (
        <div >
          
            <div className="card_img">
                <img src={imageStr ? imageStr : 'dp.jpg'} alt="card-pic"/>
            </div>
            <div className="card_heading mb-3">
                <h5>{props.title}</h5>
            </div>
           
            <div className="card_author fw-bold">
               {props.name}
            </div>
            <div className="card_reviews fw-light">
                4.8
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              
            </div>
            <div className="card_price fw-bold">
               {props.price} $
            </div>
            <div className="card_badge">
                bestseller
            </div>
        </div>
    )
}
