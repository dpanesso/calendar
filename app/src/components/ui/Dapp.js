import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import availableWallets from '../../dapp/wallets';
import DAppController from './DAppController'
const styles = {
  radioButton: {
    marginTop: 16,
  },
};

/**
 * Dialog content can be scrollable.
 */
export default class Dapp extends Component {
  state = {
    open: true,
    pending: false,
    web3: null,
    error: null,
    accounts: null,
    selectedWalletIndex: -1,
    selectedAccountIndex: 0,
    web3: null,
    account: null
  };

  // handleOpen = () => {
  //   this.setState({open: true});
  // };

  handleClose = () => {
    console.log("====handleClose");
    this.setState({open: false});
  };

  onAccountChange = e => {
    this.setState({ selectedAccountIndex: parseInt(e.target.value, 10) });
  };

  onOnboardingDone = (e) => {
    console.log("====onOnboardingDone");
    const { web3, accounts, selectedAccountIndex } = this.state;
    const account = accounts && accounts[selectedAccountIndex];
    console.log(web3);
    console.log(accounts);
    this.setState({ account })
    //account && this.onOnboardingDone(web3, account);
  }

  onWalletChange = async e => {
    console.log("======onWalletChange");
    const selectedWalletIndex = parseInt(e.target.value, 10);
    const wallet = availableWallets[selectedWalletIndex];
    this.handleClose()
    try {
      this.setState({
        selectedWalletIndex,
        pending: true,
        accounts: null,
        error: null
      });
      const web3 = await wallet.getWeb3();
      const accounts = await new Promise((resolve, reject) => {
        web3.eth.getAccounts((error, accounts) => {
          if (error) reject(error);
          else resolve(accounts);
        });
      });
      if (accounts.length === 0) throw new Error("no accounts found");
      console.log("=====Accounts found");
      this.setState({
        web3,
        accounts,
        pending: false,
        error: null
      });
    } catch (error) {
      this.setState({ error, pending: false });
    }
  };


  render() {

    const {
      pending,
      error,
      accounts,
      selectedAccountIndex,
      selectedWalletIndex,
      web3,
      account
    } = this.state;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.onOnboardingDone}
      />,
    ];

    const radios = [];
    console.log(availableWallets);
    availableWallets.map((wallet, i) => (
      radios.push(
        <RadioButton
          key={i}
          value={i}
          checked={selectedWalletIndex === i}
          label={wallet.name}
          style={styles.radioButton}
          disabled={pending}
        />
      )))

    return (
      <div>
        {account && web3 ? (<DAppController account={account} web3={web3} onLogout={this.onLogout} />):
        (<Dialog
              title="Select a wallet"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
              <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" onChange={this.onWalletChange}>
                {radios}
              </RadioButtonGroup>
            </Dialog>
          )
        }
      </div>
    );
  }
}
