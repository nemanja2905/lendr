import { get } from 'lodash';
import {API} from '../../API'
import React, { Component } from 'react';
import {connect} from 'react-redux';
import Script from 'react-load-script';
import userActions from '../../actions/userActions';

class IAVStep extends Component {
  state = {
    scriptLoaded: false,
    displayIav: false
  };

  handleScriptLoad = () => {
    this.setState({
      scriptLoaded: true
    })
  };

  componentDidMount = () => {
    this.checkIAVStatus();
  };

  checkIAVStatus = () => {
    this.interval = setInterval(() => {
      if (window.dwolla && document.getElementById('iav-container')) {
        this.setState({
          iavLoaded: true
        });
        window.dwolla.configure('sandbox');
        this.initializeIAV();
        clearInterval(this.interval);
      }
    }, 100);
  };

  initializeIAV = () => {
    const {dwollaUser, user, dispatch} = this.props;

    const editHref = get(dwollaUser, 'data._links.edit.href', '');
    const editHrefSplit = editHref.split('/');
    const dwollaId = editHrefSplit[editHrefSplit.length - 1];

    API.generateIAVToken(dwollaId, user.token).then((data) => {
      window.dwolla.iav.start(data.data.token, {
        container: 'iav-container'
      }, (e, res) => {
        clearInterval(this.interval)

        if (dwollaId && !e) {
          dispatch(userActions.fetchDwollaUser(dwollaId, user.token));
        }

      });
    })
    .catch((error) => {
      console.log(error)
      return error
    });
  };
  makePrimary = (id) => {
    const {dwollaUser, user, dispatch} = this.props;

    const editHref = get(dwollaUser, 'data._links.edit.href', '');
    const editHrefSplit = editHref.split('/');
    const dwollaId = editHrefSplit[editHrefSplit.length - 1];

    API.makePrimary(id, user.id, user.token)
      .then((data) => {
        dispatch(userActions.fetchDwollaUser(dwollaId, user.token));
      })
      .then(() => {
        dispatch(userActions.fetchById(user.id, user.token));
      })
      .catch((error) => {
        console.log('Error making funding source primary');
      })
  };

  remove = (id) => {
    const {dwollaUser, user, dispatch} = this.props;

    const editHref = get(dwollaUser, 'data._links.edit.href', '');
    const editHrefSplit = editHref.split('/');
    const dwollaId = editHrefSplit[editHrefSplit.length - 1];

    API.removeFundingSource(id, user.id, user.token)
      .then((data) => {
        dispatch(userActions.fetchDwollaUser(dwollaId, user.token));
      })
      .catch((error) => {
        console.log('Error making funding source primary');
      })
  };
  renderFundingSources = () => {
    const {dwollaUser, user} = this.props;
    return dwollaUser.funding.map((current, index) => {
      const isPrimary = user.primary_funding_id === current.id;
      return current.type === 'bank' && !current.removed ?
        <div className={`card feed-card funding-source-card ${isPrimary ? 'settled' : null}`}>
          {
            isPrimary ? 
              <div className="card-header bg-success text-white">
                Active
              </div> : 
              <div className="card-header bg-secondary">
                Inactive
              </div>
          }
          <div className="card-body">
            <h5 className="card-title">{current.bankName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{current.name}</h6>
            {!isPrimary ?
              <a href="#" onClick={() => {this.makePrimary(current.id)}} className="card-link">
                Make Primary
              </a>
              : null
            }
            <a href="#" onClick={() => {this.remove(current.id)}} className="card-link">Remove</a>
          </div>
        </div> : null
    })
  }
  render() {
    const {dwollaUser} = this.props;

    const content = get(dwollaUser, 'funding', []).length ? 
      this.renderFundingSources() : null;

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

          <div className="col">
            <div className="card-deck">
              {content}
            </div>
            <div className="card-deck">
              <div className="card">
                <div className="card-header bg-secondary">
                  Add Funding Sources
                </div>
                <div className="card-body">
                  <div id="iav-container">
                    <Script
                      url="https://cdn.dwolla.com/1/dwolla.js"
                      onLoad={this.handleScriptLoad.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    authStatus: state.authReducer.status,
    user: state.authReducer.user,
    dwollaUser: state.userReducer.dwollaUser
  }
};

export default connect(mapStateToProps)(IAVStep);
