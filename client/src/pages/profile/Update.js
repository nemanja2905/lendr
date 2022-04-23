import { get } from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import DwollaStep from './DwollaStep';
import IAVStep from './IAVStep';

class Update extends Component {
  state = {
    currentStep: 0
  };

  setStep = (step) => {
    this.setState({currentStep: step});
  };

  renderCurrentScreen = () => {
    const {user} = this.props;
    const {currentStep} = this.state;

    const profileStep =
      <div className="step"> 
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="font-weight-light">Your details</h3>
              <h6 className="font-weight-light">These are visible to everyone</h6>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-2">
              <img className="profile-picture" src="https://placehold.it/100x100" alt="profile" />
            </div>
            <div className="col">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Email address</label>
                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    const iavStep = <IAVStep user={user} />;
    const dwollaStep = <DwollaStep user={user} />;
    const stepArray = [profileStep, dwollaStep, iavStep];

    return stepArray[currentStep];
  }
  render() {
    const {currentStep} = this.state;
    const {dwollaUser} = this.props;
    
    const dwollaLoaded = get(dwollaUser, 'success', false);

    return (
      <div className="row settings-wrapper">
        <div className="col-lg-2 step-wrapper">
          <span
            className={`step-indicator ${currentStep === 0 ? 'active': null}`}
            onClick={() => {this.setStep(0)}}
          >
            Profile
          </span>
          <span
              className={`step-indicator ${currentStep === 1 ? 'active': null}`}
            onClick={() => {this.setStep(1)}}
          >
            Bank Verification
          </span>

          {dwollaLoaded ? 
            <span
                className={`step-indicator ${currentStep === 2 ? 'active': null}`}
              onClick={() => {this.setStep(2)}}
            >
              Funding Sources
            </span> : null
          }
        </div>

        <div className="col-lg-10">
          {this.renderCurrentScreen()}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    dwollaUser: state.userReducer.dwollaUser
  }
};

export default connect(mapStateToProps)(Update);
