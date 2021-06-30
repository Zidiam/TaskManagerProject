import React, { Component } from "react";
import Select from 'react-select'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

function getOptions(userList){
  console.log(userList)
  var option = []
  for (let val of userList) {
    option.push({value: val.first + " " + val.last, label: val.first + " " + val.last})
    console.log(val.first);
  }
  return option
}


export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      selectedOptions: [],
      options: getOptions(this.props.userList),
    };
  }

  createoptions(){
    const options = new Map();
    for (let i = 0; i < this.userss; i++) {
      const name = {name: this.userss[i].label}
      options.set(name, this.userss[i].label);
    }


  }

  handleOptionChange = selectedOption => {
    const state = this.state;
    state.selectedOptions = [];
    selectedOption.forEach((option) => {
      state.selectedOptions.push(option.label);
    });
    const activeItem = { ...this.state.activeItem, ['user']:  JSON.stringify(state.selectedOptions)};

    this.setState({ activeItem });
  };

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Task Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="task-title">Title</Label>
              <Input
                type="text"
                id="task-title"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Task Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="task-description">Description</Label>
              <Input
                type="text"
                id="task-description"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Task description"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
            <Select isMulti onChange={this.handleOptionChange} options={this.state.options} placeholder={this.state.activeItem.user}/>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}