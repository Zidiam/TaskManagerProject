import React, { Component } from "react";
import Modal from "./components/Modal";
import ModalUsers from "./components/ModalUsers";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      taskList: [],
      modal: false,
      modalUser: false,
      userList: [],
      activeUser: {first: "", last: ""},
      activeItem: {
        title: "",
        description: "",
        completed: false,
        user: "",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
    this.getUsersList();
  }

  refreshList = () => {
    axios
      .get("/api/tasks/")
      .then((res) => this.setState({ taskList: res.data }))
      .catch((err) => console.log(err));

  };

  getUsersList = () => {
    axios
      .get("/api/users/")
      .then((res) => this.setState({ userList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  toggle2 = () => {
    this.setState({ modalUser: !this.state.modalUser });
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`/api/tasks/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/tasks/", item)
      .then((res) => this.refreshList());

  };

  handleDelete = (item) => {
    axios
      .delete(`/api/tasks/${item.id}/`)
      .then((res) => this.refreshList());
  };

  handleSubmitUser = (user) => {
    this.toggle2();

    if (user.id) {
      axios
        .put(`/api/users/${user.id}/`, user)
        .then((res) => this.getUsersList());
      return;
    }
    axios
      .post("/api/users/", user)
      .then((res) => this.getUsersList());
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/tasks/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false, user: "", };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  createUser = () => {
    const user = {first: "", last: ""};

    this.setState({ activeUser: user, modalUser: !this.state.modalUser });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`task-title mr-2 ${
            this.state.viewCompleted ? "completed-task" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
         <style>{'body { background-color: black; }'}</style>
        <h1 className="text-white text-uppercase text-center my-4">Task app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-outline-primary"
                  onClick={this.createItem}
                >
                  Add task
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={this.createUser}
                  style={{float: 'right'}}
                >
                  Add User
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            userList={this.state.userList}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        {this.state.modalUser ? (
          <ModalUsers
            activeUser={this.state.activeUser}
            toggle={this.toggle2}
            onSave={this.handleSubmitUser}
          />
        ) : null}
      </main>
    );
  }
}

export default App;