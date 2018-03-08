import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SimpleStorageContract from "../../dapp/SimpleStoreContract";
import "./DappController.css";

/**
 * define our actual DApp that works with a web3 instance on a given account.
 */
 const errorText = "Should be a number"
export default class DappController extends Component {
  static propTypes = {
    web3: PropTypes.object.isRequired,
    account: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
  };
  state = {
    storageValue: 1,
    localInputValue: 1,
    gasPriceGWEI: 1,
    simpleStorage: null,
    error: null,
    pending: false,
    tx: null,
    errorTextValue: false,
    errorTextFees: false,
  };

  async componentDidMount() {
    // initialize the contract and retrieve the deployed version
    const { web3 } = this.props;
    const simpleStorage = await SimpleStorageContract.createWithWeb3(web3);

    const storageValue = await simpleStorage.get();
    this.setState({
      simpleStorage,
      storageValue,
      localInputValue: storageValue
    });

    // and plug to the ValueChanged event
    this.valueChangedSubscription = simpleStorage.listenValueChanged(
      storageValue => {
        this.setState({ storageValue });
      }
    );
  };

  componentWillUnmount() {
    try {
      this.valueChangedSubscription();
    } catch (e) {
      // NB MetaMask currently have an error thrown
      console.error(e);
    }
  };

  onChangeInput = e => {
    const value = e.target.value;

    if(isNaN(value)){
      this.setState({ errorTextValue: true });
    } else if(value){
      this.setState({
        localInputValue: parseInt(value, 10),
        errorTextValue: false
       });
    }
  };

  onChangeGasInput = e => {
    const value = e.target.value;
    if(isNaN(value)){
      this.setState({ errorTextFees: true });
    } else if(value){
      this.setState({
        gasPriceGWEI: parseInt(value, 10),
        errorTextFees: false
       });
    }
  };

  onSetButton = async () => {
    const { simpleStorage, localInputValue, gasPriceGWEI } = this.state
    console.log(this.state);
    const { account } = this.props;
    if (!simpleStorage) return;
    this.setState({ error: null, pending: true });
    try {
      const res = await simpleStorage.set(
        localInputValue,
        account,
        gasPriceGWEI
      );
      // NB at this stage we don't have the transaction confirmed yet,
      // but we move on by optimistically setting the new value
      this.setState({
        error: null,
        storageValue: localInputValue,
        pending: false,
        tx: res.tx
      });
    } catch (error) {
      this.setState({ error, pending: false });
    }
  };

  render() {
    const { account, onLogout } = this.props;
    const {
      simpleStorage,
      storageValue,
      localInputValue,
      gasPriceGWEI,
      error,
      pending,
      tx,
      errorTextValue,
      errorTextFees
    } = this.state;

    if (!simpleStorage) {
      return (
        <div className="App">
          <div className="loading">Loading...</div>
        </div>
      );
    }

    return (
      <div className="DappController">
        <div>
          <div>Account : <code>{account}</code>{" "}</div>
        </div>
        <div>
            <TextField
              hintText="Enter a seed (number)..."
              errorText={errorTextValue ? errorText : ""}
              onChange={this.onChangeInput}
              />
            {pending ? (
              <div>Waiting for validation ...</div>
            ) : (

              <RaisedButton
                label="Set"
                primary={true}
                onClick={this.onSetButton}
                disabled={localInputValue === storageValue}
                />
            )}
        </div>
        <div>
          <TextField
            hintText="Gas Price (number in GWEI)"
            errorText={errorTextFees ? errorText : ""}
            onChange={this.onChangeGasInput}
            />
        </div>
          <p>{tx ? "Transaction: " + tx : null}</p>
          {error ? (
            <div className="error">
              {String((error && error.message) || error)}
            </div>
          ) : null}
      </div>
    );
  }
}
