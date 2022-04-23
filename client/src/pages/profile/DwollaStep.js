import { get } from 'lodash'
import React, { Component } from 'react';
import userActions from '../../actions/userActions';
import {connect} from 'react-redux';
import {dispatchWithTimeout} from '../../utils';

const US_STATES = [
  {short: "AL", long: "Alabama"},
  {short: "AK", long: "Alaska"},
  {short: "AS", long: "American Samoa"},
  {short: "AZ", long: "Arizona"},
  {short: "AR", long: "Arkansas"},
  {short: "CA", long: "California"},
  {short: "CO", long: "Colorado"},
  {short: "CT", long: "Connecticut"},
  {short: "DE", long: "Delaware"},
  {short: "DC", long: "District Of Columbia"},
  {short: "FM", long: "Federated States Of Micronesia"},
  {short: "FL", long: "Florida"},
  {short: "GA", long: "Georgia"},
  {short: "GU", long: "Guam"},
  {short: "HI", long: "Hawaii"},
  {short: "ID", long: "Idaho"},
  {short: "IL", long: "Illinois"},
  {short: "IN", long: "Indiana"},
  {short: "IA", long: "Iowa"},
  {short: "KS", long: "Kansas"},
  {short: "KY", long: "Kentucky"},
  {short: "LA", long: "Louisiana"},
  {short: "ME", long: "Maine"},
  {short: "MH", long: "Marshall Islands"},
  {short: "MD", long: "Maryland"},
  {short: "MA", long: "Massachusetts"},
  {short: "MI", long: "Michigan"},
  {short: "MN", long: "Minnesota"},
  {short: "MS", long: "Mississippi"},
  {short: "MO", long: "Missouri"},
  {short: "MT", long: "Montana"},
  {short: "NE", long: "Nebraska"},
  {short: "NV", long: "Nevada"},
  {short: "NH", long: "New Hampshire"},
  {short: "NJ", long: "New Jersey"},
  {short: "NM", long: "New Mexico"},
  {short: "NY", long: "New York"},
  {short: "NC", long: "North Carolina"},
  {short: "ND", long: "North Dakota"},
  {short: "MP", long: "Northern Mariana Islands"},
  {short: "OH", long: "Ohio"},
  {short: "OK", long: "Oklahoma"},
  {short: "OR", long: "Oregon"},
  {short: "PW", long: "Palau"},
  {short: "PA", long: "Pennsylvania"},
  {short: "PR", long: "Puerto Rico"},
  {short: "RI", long: "Rhode Island"},
  {short: "SC", long: "South Carolina"},
  {short: "SD", long: "South Dakota"},
  {short: "TN", long: "Tennessee"},
  {short: "TX", long: "Texas"},
  {short: "UT", long: "Utah"},
  {short: "VT", long: "Vermont"},
  {short: "VI", long: "Virgin Islands"},
  {short: "VA", long: "Virginia"},
  {short: "WA", long: "Washington"},
  {short: "WV", long: "West Virginia"},
  {short: "WI", long: "Wisconsin"},
  {short: "WY", long: "Wyoming"}
]

//firstName   yes string  Customer or if business, authorized representative’s first name.
//lastName    yes string  Customer or if business, authorized representative’s last name.
//email       yes string  Customer’s email address.
//type        yes string  Either personal or business. If business, see below for additional required information.
//address1    yes string  First line of the street address of the Customer’s permanent residence. Must be 50 characters or less. short: Note, long: PO Boxes are not allowed},
//city        yes string  City of Customer’s permanent residence.
//state       yes string  Two letter abbreviation of the state in which the Customer resides, e.g. CA.
//postalCode  yes string  Postal code of Customer’s permanent residence. Should be a five digit postal code, e.g. 50314.
//dateOfBirth yes string  Customer or if business, authorized representative’s date of birth in YYYY-MM-DD format. Must be 18 years or older.
//ssn         yes string  Last four digits of the Customer’s Social Security Number.

class DwollaStep extends Component {
  state = {
    firstName: get(this.props, 'dwollaUser.data.firstName', ''),
    lastName: get(this.props, 'dwollaUser.data.lastName', ''),
    email: get(this.props, 'dwollaUser.data.email', ''),
    address1: get(this.props, 'dwollaUser.data.address1', ''),
    city: get(this.props, 'dwollaUser.data.city', ''),
    state: get(this.props, 'dwollaUser.data.state', ''),
    postalCode: get(this.props, 'dwollaUser.data.postalCode', ''),
    ssn: get(this.props, 'dwollaUser.data.ssn', '')
  };

  updateFirstName = (e) => {this.setState({firstName: e.target.value})};
  updateLastName = (e) => {this.setState({lastName: e.target.value})};
  updateEmail = (e) => {this.setState({email: e.target.value})};
  updateAddress = (e) => {this.setState({address1: e.target.value})};
  updateCity = (e) => {this.setState({city: e.target.value})};
  updateState = (e) => {this.setState({state: e.target.value})};
  updateZipCode = (e) => {this.setState({postalCode: e.target.value})};
  updateDay = (e) => {this.setState({day: e.target.value})};
  updateMonth = (e) => {this.setState({month: e.target.value})};
  updateYear = (e) => {this.setState({year: e.target.value})};
  updateSsn = (e) => {this.setState({ssn: e.target.value})};

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.dwollaUser !== this.props.dwollaUser) {
      this.setState({
        ...this.props.dwollaUser.data
      })
    }
  };

  handleSubmit = () => {
    const {dispatch, user, dwollaUser} = this.props;
    const {
      firstName,
      lastName,
      email,
      address1,
      city,
      state,
      postalCode,
      ssn,
      day,
      month,
      year
    } = this.state;

    if (!day || !month || !year || !firstName || !lastName || !email || !address1 || !city || !state || !postalCode || !ssn) {
      dispatchWithTimeout(
        dispatch,
        5000,
        {message: 'Please make sure all fields are filled out.', className: 'alert-warning'},
        'NEW_STATUS',
        'CLEAR_ALL_ERRORS'
      )
    }

    const data = {
      dateOfBirth: `${year}-${month}-${day}`,
      firstName: firstName,
      lastName: lastName,
      email: email,
      address1: address1,
      city: city,
      state: state,
      postalCode: postalCode,
      ssn: ssn,
      user_id: user.id
    };

    if (get(dwollaUser, 'data._links.edit.href', false)) {
      // if there is an id, update the user
      dispatch(userActions.createNewDwollaUser(data, user.token, get(dwollaUser, 'data._links.edit.href', false)))
    } else {
      // if not, create one
      dispatch(userActions.createNewDwollaUser(data, user.token));
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      address1,
      city,
      state,
      postalCode,
      day,
      month,
      year,
      ssn,
      dwollaUser
    } = this.state;

    return (
      <div className="step">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="font-weight-light">Account Verification</h3>
              <h6 className="font-weight-light">To ensure the safety and privacy of your account, we need to verify your identity.</h6>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="container">
              <form>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="first name..."
                        onChange={this.updateFirstName}
                        value={firstName}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="last name..."
                        onChange={this.updateLastName}
                        value={lastName}
                      />
                    </div>
                  </div>
                </div>


                <div className="row">
                  {
                    !get(dwollaUser, 'success', false) ?
                      <div className="col">
                        <div className="form-group">
                          <label>Date of Birth</label>
                          <div className="row">
                            <div className="col">
                              <input
                                className="form-control"
                                type="number"
                                placeholder="dd"
                                onChange={this.updateDay}
                                value={day}
                             />
                             </div>
                             <div className="col">
                              <input
                                className="form-control"
                                type="number"
                                placeholder="mm"
                                onChange={this.updateMonth}
                                value={month}
                              />
                            </div>
                            <div className="col">
                              <input
                                className="form-control"
                                type="number"
                                placeholder="yyyy"
                                onChange={this.updateYear}
                                value={year}
                              />
                            </div>
                          </div>
                        </div>
                      </div> : 
                      null
                  }

                  <div className="col">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="email address"
                        onChange={this.updateEmail}
                        value={email}
                      />
                    </div>
                  </div>
                  {
                    !get(dwollaUser, 'success', false) ?
                      <div className="col">
                        <div className="form-group">
                          <label>Last 4 Digits of Social Security</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="ssn"
                            onChange={this.updateSsn}
                            value={ssn}
                          />
                        </div>
                      </div> : null
                  }
                </div>
                <hr />
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="address1"
                        onChange={this.updateAddress}
                        value={address1}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="city"
                        onChange={this.updateCity}
                        value={city}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Zip Code</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="zip code"
                        onChange={this.updateZipCode}
                        value={postalCode}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>State</label>
                      <select
                        type="select"
                        className="form-control"
                        onChange={this.updateState}
                        value={state}
                      >
                        {US_STATES.map((c, i) => {
                          return <option key={`${c.short}-${i}`}value={c.short}>{c.long}</option>
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </form>

              <button
                className="btn btn-block btn-primary"
                type="submit"
                onClick={() => {this.handleSubmit()}}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    dwollaUser: state.userReducer.dwollaUser
  }
};

export default connect(mapStateToProps)(DwollaStep);
