import React, { Component } from "react";
import Account from "./Account";

class App extends Component {
  state = {
    isLoading: true,
    users: [],
    error: null,
    counter: 0,
  };

  fetchUsers() {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          users: data,
          isLoading: false,
          counter: data.length,
        })
      )
      .catch((error) => this.setState({ error, isLoading: false, counter: 0 }));
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const { isLoading, users, error } = this.state;
    return (
      <React.Fragment>
        <h1>Display Active Users Account Details</h1>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          users.map((user) => {
            return <Account key={user.username} user={user} />;
          })
        ) : (
          <h3>Fetching Users...</h3>
        )}
        <button
          id="counter"
          onClick={() =>
            this.setState({ ...this.state, counter: this.state.counter + 1 })
          }
        >
          Increment
        </button>
      </React.Fragment>
    );
  }
}

export default App;
