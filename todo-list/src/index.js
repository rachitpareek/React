import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

/*
TODO:
1. Enable marking items as completed.
2. Finish styling form with React Bootstrap.
*/

function Item(props) {
  return (
    <div>
      <ListGroup.Item className="pb-4">
        {props.value}
        <Button variant="danger" className="float-right" onClick={() => props.deleteItem(props.value)}>Delete</Button>
      </ListGroup.Item>
    </div>
  )
}

class ListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
    }
  }

  render() {
    return (
      <div>
        <h1><b>{this.props.title}</b></h1>
        <p>Add an item!</p>
        <input onChange={(event) => this.setState({ newItem: event.target.value })} />
        <Button variant="success" onClick={() => this.props.addItem(this.state.newItem)}>Add</Button>
      </div>
    )
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Todo List",
      items: [],
      issues: [],
    }
  }

  addItem = (item) => {
    if (this.state.items.includes(item)) {
      if (this.state.issues.length === 0) {
        this.state.issues.push("You already have this item in your list.");
      }
      this.setState({
        issues: this.state.issues,
      });
      return;
    }
    this.state.items.push(item);
    this.setState({
      items: this.state.items,
    })
  }

  deleteItem = (item) => {
    const items = this.state.items.filter((val) => item !== val);
    this.setState({
      items: items,
    })
  }

  deleteIssue = () => {
    this.setState({
      issues: this.state.issues.splice(0, this.state.issues.length - 1),
    })
  }

  render() {
    return (
      <div>
        <ListHeader
          title={this.state.title}
          addItem={this.addItem}
        ></ListHeader>
        <ul>
          {this.state.issues.map((issue) => {
            return (
              <Alert
                variant="danger"
                onClose={() => this.deleteIssue()}
                dismissible
              >
                <Alert.Heading>Duplicate Item!</Alert.Heading>
                {issue}
              </Alert>
            )
          })}
        </ul>
        <ListGroup>
          {this.state.items.map((item) => {
            return (
              <Item key={item} value={item} deleteItem={this.deleteItem} />
            )
          })}
        </ListGroup>
      </div>
    )
  }
}

// -------------------------------

ReactDOM.render(
  (
    <div>
      <header>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
      </header>
      <TodoList />
    </div>
  ),
  document.getElementById('root')
);

