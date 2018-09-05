import React, { Component } from 'react';
import { AsyncStorage } from "react-native";
import { Toast } from "native-base";

export default class Api {
  static get = ( route, data, cb ) => {
    AsyncStorage.getItem('loginToken').then((token) => {
      data.loginToken = token;
      fetch( 'http://119.59.113.142:8001' + route , {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        cb(responseJson);
      })
      .catch((error) => {
        cb(error);
        Toast.show({
          text: 'Lost connection Please try again.'
        })
      })
    });
  }

}
