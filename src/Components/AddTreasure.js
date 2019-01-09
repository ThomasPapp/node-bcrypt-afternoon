import React, { Component } from 'react';
import axios from 'axios';

export default class AddTreasure extends Component {
  constructor() {
    super();
    this.state = {
      treasureURL: '',
    };
  }

  handleInput(e) {
    this.setState({ treasureURL: e.target.value });
  }

  addTreasure() {
    axios.post('/api/treasure/user', { treasureURL: this.state.treasureURL })
    .then(res => {
      this.setState({ treasureURL: "" });
      this.props.addMyTreasure(res.data);
    })
    .catch(err => {
      this.setState({ treasureURL: "" });
      alert(err.response.request.response);
    });
  }

  render() {
    return (
      <div className="addTreasure">
        <input
          type="text"
          placeholder="Add image URL"
          onChange={e => this.handleInput(e)}
          value={this.state.treasureURL}
        />
        <button onClick={() => this.addTreasure()}>Add</button>
      </div>
    );
  }
}
