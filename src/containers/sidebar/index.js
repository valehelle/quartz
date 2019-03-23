import React, { Component } from 'react';
import './sidebar.css';
import  Project from '../project'
import  Channel from '../channel'
class Sidebar extends Component {
    render() {
      return (
            <div className="sidebar">
              <div className="col-md-12">
                <Project/>
              </div>
              <div className="col-md-12">
                <hr/>
              </div>
              <div className="col-md-12">
                <Channel/>
              </div>
            </div>
      );
    }
  }
export default Sidebar