import PropTypes from 'prop-types';
import React from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer';

export default class EditableTimer extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    elapsed: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    onStartPress: PropTypes.func.isRequired,
    onStopPress: PropTypes.func.isRequired,
  };

  state = {
    editFormOpen: false,
  };

  handleEditPress = () => {
    console.log('EditableTimer - handleEditPress');

    this.openForm();
  };

  handleFormClose = () => {
    console.log('EditableTimer - handleFormClose');

    this.closeForm();
  };

  handleSubmit = timer => {
    console.log('EditableTimer - handleSubmit');

    const { onFormSubmit } = this.props;

    onFormSubmit(timer);
    this.closeForm();
  };

  closeForm = () => {
    console.log('EditableTimer - closeForm');

    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    console.log('EditableTimer - openForm');

    this.setState({ editFormOpen: true });
  };

  render() {
    const { id, title, project, elapsed, isRunning, onRemovePress, onStartPress, onStopPress } = this.props;
    const { editFormOpen } = this.state;

    if (editFormOpen) {
      return (
        <TimerForm
          id={id}
          title={title}
          project={project}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    }
    return (
      <Timer
        id={id}
        title={title}
        project={project}
        elapsed={elapsed}
        isRunning={isRunning}
        onEditPress={this.handleEditPress}
        onRemovePress={onRemovePress}
        onStartPress={onStartPress}
        onStopPress={onStopPress}
      />
    );
  }
}
