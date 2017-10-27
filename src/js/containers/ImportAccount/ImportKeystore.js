import React from "react"
import { connect } from "react-redux"
import { push } from 'react-router-redux';
//import DropFile from "../../components/Elements/DropFile"
//import Modal from '../../components/Elements/Modal'
//import {Modal} from '../CommonElements'

//import {ImportAccountForm} from "../../components/Forms"

//mport { closeModal } from "../../actions/utilActions"
import {DropFile} from "../../components/ImportAccount"
//import Dropzone from 'react-dropzone'

//import { uploadKey } from "../../actions/importKeystoreActions"
//import { addAccount } from "../../actions/accountActions"
import { importNewAccount, throwError } from "../../actions/accountActions"
import { verifyKey, anyErrors } from "../../utils/validators"
import { addressFromKey } from "../../utils/keys"

//import { history } from 'history'

//const history = createHashHistory()

@connect((store) => {
  return {...store.account}
})

export default class ImportKeystore extends React.Component {

  lowerCaseKey = (keystring) => {
    return keystring.toLowerCase()
    // var keyObject = JSON.parse(keystring)
    // var keyLowerCase = {}
    // //lowercase all key
    // Object.keys(keyObject).map(function (key) {
    //   keyLowerCase[key.toLowerCase()]= keyObject[key]
    // })
    // return JSON.stringify(keyLowerCase)
  }

  // importAccount = (event) => {
  //   event.preventDefault()
  //   var keystring = this.lowerCaseKey(this.props.keystring)
  //   var errors = {}
  //   errors["addressError"] = verifyAccount(this.props.address)
  //   errors["keyError"] = verifyKey(keystring)
  //   if (anyErrors(errors)) {
  //     console.log(errors)
  //     this.props.dispatch(throwError("Cannot import invalid keystore file"))
  //   } else {
  //     this.props.dispatch(addAccount(
  //     this.props.address, keystring,
  //     this.props.name, this.props.desc))
  //     this.props.dispatch(emptyForm())

  //     this.props.dispatch(closeModal(this.props.modalID))
  //   }
  // }
  goToExchange = () =>{
    // window.location.href = "/exchange"
    // this.props.router.push('/exchange')
    this.props.dispatch(push('/exchange'));
  }

  onDrop = (files) => {
    //console.log("xxx")
    var _this = this
    var file = files[0]
    var fileReader = new FileReader()
    fileReader.onload = (event) => {
      var keystring = this.lowerCaseKey(event.target.result)
      //keystring = this.lowerCaseKey(keystring)
      var errors = {}      
      errors["keyError"] = verifyKey(keystring)
       if (anyErrors(errors)) {
          console.log(errors)
          this.props.dispatch(throwError("Cannot import invalid keystore file"))
        }else{          
          console.log("keystring: ", keystring)
          var address = addressFromKey(keystring)
          this.props.dispatch(importNewAccount(address, "keystore", keystring))
          // this.goToExchange()   
          // setTimeout(() => {this.goToExchange()}, 3000)        


          // setInterval(function(){ _this.goToExchange() }, 3000);            
        }    
      
  }
  fileReader.readAsText(file)    
}

  render() {
    return (
      <DropFile 
            error ={this.props.error}
            onDrop = {this.onDrop}
            />
    )
  }
}