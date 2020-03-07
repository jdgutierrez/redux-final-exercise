import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    showNotification,
 } from './actions/notifications';

import './App.css'

class Notification extends Component {
    render() {
        const {
            show, 
            message,
        } = this.props; 
        
        if (!show) {
            return null;
        }

        return <div className='notification'>
            <div>{message}</div>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        show: state.notification.show,
        message: state.notification.message,
    };
};

const mapDispatchToProps = {
    showNotification,
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
)(Notification);