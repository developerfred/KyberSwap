
import React from 'react';
import * as keyService from "./baseKey"

import WalletConnect from "@walletconnect/browser";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";



export default class WalletConnector extends React.Component {

    constructor(props) {
        super(props);

        this.walletConnector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org" // Required
        });
    }

    openQCCode = () => {
        if (!this.walletConnector.connected) {
            // create new session
            this.walletConnector.createSession().then(() => {
              // get uri for QR Code modal
              const uri = this.walletConnector.uri;
              // display QR Code modal
              WalletConnectQRCodeModal.open(uri, () => {
                console.log("QR Code Modal closed");
              });
            });
          }
          
    }

    onConnect = () => {
        return new Promise ((resolve, reject)=> {
            this.walletConnector.on("connect", (error, payload) => {
                if (error) {
                    reject(error);
                }
              
                // close QR Code Modal
                WalletConnectQRCodeModal.close();
              
                // get provided accounts and chainId
                const { accounts, chainId } = payload.params[0];
                resolve(accounts, chainId)
              });
        })
        
    }
    callSignTransaction = (funcName, ...args) => {
        return new Promise((resolve, reject) => {
            keyService[funcName](...args).then(result => {
                const { txParams, keystring, password } = result
                this.sealTx(txParams, keystring, password).then(result => {
                    resolve(result)
                }).catch(e => {
                    console.log(e.message)
                    reject(e)
                })
            })
        })
        // const { txParams, keystring, password } = keyService[funcName](...args)
        // return this.sealTx(txParams, keystring, password)
    }

    sealTx = (txParams, web3Service, password) => {
        txParams.gas = txParams.gasLimit
        delete (txParams.gasLimit)

        return new Promise((resolve, reject) => {
            web3Service.web3.eth.sendTransaction(txParams, function (err, transactionHash) {
                if (!err) {
                    resolve(transactionHash)
                } else {
                    console.log(err)
                    reject(err.message)
                }
            })
        })
    }
}
