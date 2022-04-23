import { includes } from 'lodash';
import React, { Component } from 'react';
import DayPicker from 'react-day-picker';

const FORWARD_KEYS = [13, 39];
const BACKWARD_KEYS = [37];

export default class NewLoanEntry extends Component {
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

  renderSteps = () => {
    const {currentStep} = this.props;

    const step1 =
      <div className="step">
        <div className="row">
          <div className="col">
            $<input
              className="new-loan-input font-weight-light"
              onChange={(e) => {this.props.handleInput(e, 'amount')}}
              type="number"
              value={this.props.amount}
            />
          </div>
          <div className="col">
            <p>How much money are you asking for? The lower this amount, the more likely you will be to get your loan accepted by a community member.</p>
          </div>
        </div>
      </div>

    const step2 =
      <div className="step">
        <div className="row">
          <div className="col">
            $<input
              className="new-loan-input"
              onChange={(e) => {this.props.handleInput(e, 'interest')}}
              type="number"
              value={this.props.interest}
            />
          </div>
          <div className="col">
            <p>How much are you offering to pay for this loan? Keep in mind that the total amount you have to pay back is the previous amount (principal) plus this amount (interest).</p>
            <p>The higher the interest, the higher your chances are of this loan being accepted.</p>
          </div>
        </div>
      </div>

    const step3 =
      <div className="step">
        <div className="row">
          <div className="col">
            <DayPicker
              selectedDays={this.props.promise_to_pay_date}
              onDayClick={this.handleDayClick}
              fromMonth={new Date()}
              disabledDays={{before: new Date()}}
            />
          </div>
          <div className="col">
            <p>When do you promise to pay the money back? The sooner you promise to pay, the higher your chances of your loan being accepted.</p>
          </div>
        </div>
      </div>

    const step4 =
      <div className="step">
        <div className="row">
          <div className="col">
            <input
              className="new-loan-input"
              onChange={(e) => {this.props.handleInput(e, 'memo')}}
              type="text"
              value={this.props.memo}
            />
          </div>
          <div className="col">
            <p>What is this money for? Try to give a brief explanation of why you need to borrow this money and/or what your circumstances are.</p>
          </div>
        </div>
      </div>

    const step5 =
      <div className="step">
        <div className="row">
          <div className="col">
            <div className="card bg-light mb-3">
              <div className="card-header">Your Loan Details</div>
              <div className="card-body">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <th scope="row">Amount</th>
                      <td>${this.props.amount}</td>
                    </tr>
                    <tr>
                      <th scope="row">Interest</th>
                      <td>${this.props.interest}</td>
                    </tr>
                    <tr>
                      <th scope="row">Payback Date</th>
                      <td>{new Date(this.props.promise_to_pay_date).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th scope="row">Memo</th>
                      <td>{this.props.memo}</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="btn btn-block btn-primary"
                  type="submit"
                  onClick={() => {this.props.handleSubmit()}}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <p>You're all set to go! If the details on the left look good, click submit to post your loan request for others to see.</p>
          </div>
        </div>
      </div>

    const stepArray = [step1, step2, step3, step4, step5];

    return (
      <div className="new-loan-input-wrapper">

        <div className="new-loan-input-content">
          {stepArray[currentStep]}
        </div>

        <div className="new-loan-pagination">
          <span  className="btn btn-lg btn-primary font-weight-light border border-primary bg-white text-primary" onClick={() => {this.props.paginate('back')}}>back</span>
          <span  className="btn btn-lg btn-primary font-weight-light border border-primary bg-white text-primary" onClick={() => {this.props.paginate('fwd')}}>next</span>
        </div>
      </div>
    )
  };

  render() {
    const {currentStep} = this.props;

    return (
      <div className="new-loan-entry-wrapper">
        <div className="row">
          <div className="col-lg-2 step-wrapper">
            <span
              className={`step-indicator ${currentStep === 0 ? 'active': null}`}
              onClick={() => {this.props.setStep(0)}}
            >
              Amount
            </span>
            <span
              className={`step-indicator ${currentStep === 1 ? 'active': null}`}
              onClick={() => {this.props.setStep(1)}}
            >
              Interest
            </span>
            <span
              className={`step-indicator ${currentStep === 2 ? 'active': null}`}
              onClick={() => {this.props.setStep(2)}}
            >
              Payback
            </span>
            <span
              className={`step-indicator ${currentStep === 3 ? 'active': null}`}
              onClick={() => {this.props.setStep(3)}}
            >
              Memo
            </span>
            <span
              className={`step-indicator ${currentStep === 4 ? 'active': null}`}
              onClick={() => {this.props.setStep(4)}}
            >
              Confirm
            </span>
          </div>

          <div className="col-lg-10">
            {this.renderSteps()}
          </div>
        </div>
      </div>
    );
  }
}
