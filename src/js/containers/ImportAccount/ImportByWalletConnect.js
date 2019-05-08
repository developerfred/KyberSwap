import React from "react"
import { connect } from "react-redux"

import { getTranslate } from 'react-localize-redux'

import { Modal } from '../../components/CommonElement'
import {WalletConnector} from "../../services/keys"

@connect((store) => {
    var tokens = store.tokens.tokens
    var supportTokens = []
    Object.keys(tokens).forEach((key) => {
        supportTokens.push(tokens[key])
    })
    return {
        account: store.account,
        ethereum: store.connection.ethereum,
        tokens: supportTokens,
        translate: getTranslate(store.locale),
        analytics: store.global.analytics
    }
})

export default class ImportByWalletConnect extends React.Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
    }
    openModal = () => {
        // this.setState({ open: true })
        var walletConnector = new WalletConnector()
        walletConnector.openQCCode()

        walletConnector.onConnect().then((accounts, chainId) => {
            alert(accounts)
        })

        

        this.props.analytics.callTrack("trackClickImportAccount", "wallet_connect");
    }

    closeModal = () => {
        this.setState({ open: false })
        this.props.analytics.callTrack("trackClickCloseModal", "wallet_connect");
    }


    render() {
        return (
            <div>
                {!this.props.isOnMobile && (
                    <div className="import-account__block" onClick={this.openModal}>
                        <div className="import-account__icon wallet-connect" />
                        <div className="import-account__name"><h3>Wallet Connect</h3></div>
                    </div>
                )}

                {this.props.isOnMobile && (
                    <div className={"import-account__block"}>
                        <div className={"import-account__block-left"}>
                            <div className="import-account__icon wallet-connect" />
                            <div>
                                <div className="import-account__name">Wallet Connect</div>
                                <div className="import-account__desc">Access your Wallet</div>
                            </div>
                        </div>
                        <div className="import-account__block-right" onClick={this.openModal}>Enter</div>
                    </div>
                )}

                <Modal
                    className={{ base: 'reveal medium', afterOpen: 'reveal medium import-privatekey' }}
                    isOpen={this.state.open}
                    onRequestClose={this.closeModal}
                    content={
                        <div>
                           
                           aaaaa

                        </div>
                    }
                />
            </div>
        )
    }
}
