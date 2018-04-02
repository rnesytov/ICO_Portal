import React from 'react'
import {connect} from 'react-redux'
//components
import AccountInfo from '../components/AccountInfo'
import {SetAccountButton, SetAccountForm} from '../components/SetAccount'
//actions
import UserActions, {User} from '../actions/UserActions.js'

class Account extends React.Component{
    render() {
        const {
            ethAccount,
            showSetAccountForm,
            showForm,
            hideForm,
            setAccount,
            metaMaskAccount
        } = this.props

        if (ethAccount){
            return (
                <AccountInfo ethAccount={ethAccount} />
            )
        } else {
            return (
                <AccountInfo>
                    <SetAccountButton onClick={showForm} />
                    {showSetAccountForm &&
                     <SetAccountForm closeModal={hideForm} handleSubmit={setAccount} metaMaskAccount={metaMaskAccount} />}
                </AccountInfo>
            )
        }
    }
}

const mapStateToProps = ({user}) => ({
    ethAccount: user.get('eth_account'),
    showSetAccountForm: user.get('showSetAccountForm'),
    metaMaskAccount: user.get('metaMaskAccount')
})

const mapDispatchToProps = (dispatch) => ({
    showForm() {
        dispatch(User.showSetAccountForm())
        dispatch(UserActions.extractMetaMaskAccount())
    },
    hideForm() {
        dispatch(User.hideSetAccountForm())
    },
    setAccount(data) {
        dispatch(User.setAccountRequest(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)