import React, { Component } from 'react';
import { includes, range } from 'lodash';

const FORWARD_KEYS = [13, 39]
const BACKWARD_KEYS = [37]
const MAX_STARS = 5;

export default class RatingsComponent extends Component {
  state = {
    rating: 0,
    memo: '',
    hasBeenModified: false
  };

  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeyDown);
  };
  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = (e) => {
    if (includes(FORWARD_KEYS, e.keyCode)) {
      this.props.paginate('fwd');
    } else if (includes(BACKWARD_KEYS, e.keyCode)) {
      this.props.paginate('back');
    }
  };

  handleDayClick = (day) => {
    this.props.handleInput({target: {value: day}}, 'promise_to_pay_date');
  };

  setRating = (rating) => {
    this.setState({
      rating: rating,
      hasBeenModified: true
    })
  };

  renderStars = () => {
    const {rating} = this.state;

    const stars = range(MAX_STARS).map((current, index) => {
      const isActive = (index + 1) <= rating;
      return (
        <span className={`oi oi-star ${isActive ? 'active' : null}`} onClick={() => {this.setRating((index + 1))}}></span>
      );
    })

    return (
      <div className="row stars">
        {stars}
      </div>
    );
  };

  handleSubmit = () => {
    const data = {
      memo: this.state.memo,
      rating: this.state.rating,
      created_by_user: this.props.userData.id,
      created_for_user: this.props.transactionData.created_by_user_id,
      transaction_id: this.props.transactionData.id
    };

    this.props.onSubmit(data);
  };

  render() {
    const {hasBeenModified} = this.state;

    return (
      <div className="ratings-entry-wrapper">
        <div className="col">
          {this.renderStars()}
          <div className="row">
            <textarea onChange={(e) => {this.setState({memo: e.target.value})}} className="form-control"/>
          </div>
        </div>
        {hasBeenModified ? <button onClick={() => {this.handleSubmit()}} type="button" className="btn btn-primary">Repay!</button> : null}
      </div>
    );
  }
}
