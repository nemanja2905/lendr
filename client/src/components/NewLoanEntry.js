import React, { Component } from 'react';

const MAX_STEPS = 5;

export default class NewLoanEntry extends Component {
  state = {
    currentStep: 0,
    valid: false,
    step1Value: '',
    step2Value: '',
    step3Value: '',
    step4Value: ''
  };

  renderSteps = () => {
    const {currentStep} = this.state;

    const step1 =
      <div className="step">
        <h4 className="card-title">How much do you need to borrow?</h4>
        <p className="lead">describe this step lorem blah lblah ksjkfjfdkdf</p>
        <input onChange={(e) => {this.handleInput(e, 'step1')}} className="form-control form-control-lg" type="text" value={this.state.step1Value} />
      </div>

    const step2 =
      <div className="step">
        <h4 className="card-title">How much interest are you going to pay?</h4>
        <p className="lead">describe this step lorem blah lblah ksjkfjfdkdf</p>
        <input onChange={(e) => {this.handleInput(e, 'step2')}} className="form-control form-control-lg" type="text" value={this.state.step1Value} />
      </div>

    const step3 =
      <div className="step">
        <h4 className="card-title">When do you promise to pay it back??</h4>
        <p className="lead">describe this step lorem blah lblah ksjkfjfdkdf</p>
        <input onChange={(e) => {this.handleInput(e, 'step3')}} className="form-control form-control-lg" type="text" value={this.state.step1Value} />
      </div>

    const step4 =
      <div className="step">
        <h4 className="card-title">What's it for??</h4>
        <p className="lead">describe this step lorem blah lblah ksjkfjfdkdf</p>
        <input onChange={(e) => {this.handleInput(e, 'step4')}} className="form-control form-control-lg" type="text" value={this.state.step1Value} />
      </div>

    const step5 =
      <div className="step">
        <h4 className="card-title">Ready?</h4>
        <p className="lead">describe this step lorem blah lblah ksjkfjfdkdf</p>
        <button type="submit">Post!</button>
      </div>

    const stepArray = [step1, step2, step3, step4, step5];

    return (
      <div className="card text-center">
        <div className="card-body">
          {stepArray[currentStep]}
        </div>
        <div className="card-footer">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={() => {this.paginate('back')}} type="button" className="btn btn-secondary">Left</button>
            <span className="btn btn-secondary control pagination">{currentStep} / {MAX_STEPS}</span>
            <button onClick={() => {this.paginate('fwd')}} type="button" className="btn btn-secondary">Right</button>
          </div>
        </div>
      </div>
    )
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

  render() {
    return (
      <div className="new-loan-entry-wrapper">
        <div className="row">
          <div className="col">
            <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
          <div className="col">
            {this.renderSteps()}
          </div>
        </div>
      </div>
    );
  }
}
