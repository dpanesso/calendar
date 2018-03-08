import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import toggleDapp from '../../store/actions';
import availableWallets from '../../dapp/wallets';
import DappController from './DappController'
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
    error: null,
    accounts: null,
    selectedWalletIndex: -1,
    selectedAccountIndex: 0,
    accountSelected: false,
    web3: null,
    account: null
  };

  handleClose = () => {
    this.setState({
      open: false,
      web3: null,
      account: null
    });

    this.props.onClose()
  };

  onAccountChange = e => {
    this.setState({ selectedAccountIndex: parseInt(e.target.value, 10) });
  };

  onOnboardingDone = (e) => {
    const { web3, accounts, selectedAccountIndex } = this.state;
    const account = accounts && accounts[selectedAccountIndex];
    this.setState({ account })
  }

  onChange = e => {
    const { accounts } = this.state
    if(accounts === null){
      this.onWalletChange(e)
    } else {
      this.onAccountChange(e)
    }
  }


  onWalletChange = async e => {
    const selectedWalletIndex = parseInt(e.target.value, 10);
    const wallet = availableWallets[selectedWalletIndex];

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
      accounts,
      selectedAccountIndex,
      selectedWalletIndex,
      web3,
      account
    } = this.state;

    let actions = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />];

    let title = "Select a wallet"
    const radios = [];

    if(account == null && accounts === null){
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
    } else if(account == null) {
      title = "Select an account"
      actions = [
        ...actions,
        <RaisedButton
          label="Next"
          primary={true}
          keyboardFocused={true}
          onClick={this.onOnboardingDone}
          />]

      accounts.map((account, i) => (
        radios.push(
          <RadioButton
            key={i}
            value={i}
            checked={selectedAccountIndex === i}
            label={account}
            style={styles.radioButton}
          />
        )))
    }

    return (
      <div>
        <Dialog
              title={title}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
            {account && web3 ? (<DappController account={account} web3={web3} />):
              (<RadioButtonGroup name="shipSpeed" defaultSelected="not_light" onChange={this.onChange}>
                {radios}
              </RadioButtonGroup>)
            }
        </Dialog>
      </div>
    );
  }
}
