import React, { Component } from 'react';
import {connect} from 'react-redux';

import transactionActions from '../../actions/transactionActions';

import NewLoanEntry from '../../components/NewLoanEntry2';
const MAX_STEPS = 5;
class New extends Component {
  state = {
    currentStep: 0,
    valid: false,
    amount: '',
    interest: '',
    promise_to_pay_date: undefined,
    memo: '',
  };

  handleInput = (e, field) => {
    this.setState({
      [field]: e.target.value
    })
  };

  handleSubmit = () => {
    const {dispatch} = this.props;

    const transactionData = {
      amount: this.state.amount,
      interest: this.state.interest,
      promise_to_pay_date: this.state.promise_to_pay_date,
      memo: this.state.memo
    };

    dispatch(transactionActions.new(transactionData, this.props.user.token));
  };
  paginate = (direction) => {
    const {currentStep} = this.state;

    if (direction === 'fwd') {
      if (currentStep === MAX_STEPS - 1) {
        return false
      } else {
        this.setState({currentStep: currentStep + 1})
      }
    } else if (direction === 'back') {
      if (currentStep === 0) {
        return false
      } else {
        this.setState({currentStep: currentStep - 1})
      }
    }
  };
  setStep = (step) => {
    this.setState({
      currentStep: step
    });
  };
  render() {
    return (
      <div className="row">
        <div className="col">
          <NewLoanEntry
            setStep={this.setStep}
            paginate={this.paginate}
            currentStep={this.state.currentStep}
            valid={this.state.valid}
            amount={this.state.amount}
            interest={this.state.interest}
            promise_to_pay_date={this.state.promise_to_pay_date}
            memo={this.state.memo}
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user
  }
};

export default connect(mapStateToProps)(New);
