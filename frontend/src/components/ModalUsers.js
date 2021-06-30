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
export default class CustomModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeUser: this.props.activeUser,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    const activeUser = { ...this.state.activeUser, [name]: value };

    this.setState({ activeUser });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add User</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="first-name">First Name</Label>
              <Input
                type="text"
                id="first-name"
                name="first"
                value={this.state.activeUser.first}
                onChange={this.handleChange}
                placeholder="Enter First Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="last-name">Last Name</Label>
              <Input
                type="text"
                id="last-name"
                name="last"
                value={this.state.activeUser.last}
                onChange={this.handleChange}
                placeholder="Enter Last Name"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeUser)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}