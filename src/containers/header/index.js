import { connect } from 'react-redux'
import React, { Component } from 'react';
import './header.css';
import * as channelActions from '../../redux/action/channelAction'
import * as projecActions from '../../redux/action/projectAction'
import * as listenerActions from '../../redux/action/listenerAction'
import * as pushActions from '../../redux/action/pushAction'
import { saveAs } from 'file-saver';
import { isJson } from '../../lib/functions';

class Header extends Component {



    handleFileChosen = (file) => {
      var reader = new FileReader();
      reader.onload = (event) => {
        // The file's text will be printed here
        const jsonString = event.target.result
        if (isJson(jsonString)){
            const params = JSON.parse(jsonString)
            this.props.importRedux(params)
        }else{
          alert('Please choose a JSON format')
        }
      };
    
      reader.readAsText(file);
    };


    exportClick = () => {
      var file = new File([JSON.stringify(this.props.reduxState)], "socket_export.json", {type: "text/plain;charset=utf-8"});
      saveAs(file);
    }
    importClick = () => {
      this.fileInput.click()
    }
    render() {
      return (
        <div className="header">
          <h5 className="align-left">
            <button className="btn btn-info btn-sm col-md-2 btn-ex-im" onClick={this.exportClick}>Export</button> 
            <button className="btn btn-warning btn-sm col-md-2 btn-ex-im" onClick={this.importClick}>Import</button>
            Songket</h5>
          <input type='file'
               id='file'
               className='input-file'
               accept='.json'
               onChange={e => this.handleFileChosen(e.target.files[0])}
               hidden
               ref={fileInput => this.fileInput = fileInput} 
        />
        </div>
  
      );
    }
  }
const mapStateToProps = (state) => {
    return {
      reduxState: state
    }
}
function mapDispatchToProps(dispatch) {
    return {
      importRedux: (params) => {
        dispatch(projecActions.importRedux(params));
      },
    };
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)