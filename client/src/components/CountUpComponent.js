import { range } from 'lodash';
import React, {Component} from 'react';

export default class ReviewDisplay extends Component {
  renderStars = () => {
    const {data} = this.props;

    return range(data.review_rating).map((current, index) =>{
      return <span className="oi oi-star" key={`review-display-star-${index}`}></span>
    });
  };

  render() {
    const {data} = this.props;

    return (
      <div className="review-display-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-1">
              <img className="review-display-pic" src="https://www.placecage.com/200/200" />
            </div>
            <div className="col">
              <div className="review-display-stars">
                {this.renderStars()}  
              </div>

              <div className="review-display-memo">
                <p>{data.review_memo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
