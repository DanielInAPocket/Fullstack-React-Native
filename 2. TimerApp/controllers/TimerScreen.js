import React from 'react';

import { StyleSheet, View, ScrollView, Text, KeyboardAvoidingView } from 'react-native';

import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

import EditableTimer from '../components/EditableTimer';
import ToggleableTimerForm from '../components/ToggleableTimerForm';
import { newTimer } from '../utils/TimerUtils';

export default class TimerScreen extends React.Component {
  state = {
    timers: [
      {
        title: 'Mow the lawn',
        project: 'House Chores',
        id: uuidv4(),
        elapsed: 5456099,
        isRunning: true,
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuidv4(),
        elapsed: 1273998,
        isRunning: false,
      },
    ],
  };

  componentDidMount() {
    const TIME_INTERVAL = 1000;

    this.intervalId = setInterval(() => {
      const { timers } = this.state;

      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer;

          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
          };
        }),
      });
    }, TIME_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleCreateFormSubmit = timer => {
    console.log('TimerScreen - handleCreateFormSubmit');

    const { timers } = this.state;

    this.setState({
      timers: [newTimer(timer), ...timers],
    });
  };

  handleFormSubmit = attrs => {
    console.log('TimerScreen - handleFormSubmit');

    const { timers } = this.state;

    this.setState({
      timers: timers.map(timer => {
        if (timer.id === attrs.id) {
          const { title, project } = attrs;

          return {
            ...timer,
            title,
            project,
          };
        }

        return timer;
      }),
    });
  };

  handleRemovePress = timerId => {
    console.log('TimerScreen - handleRemovePress');

    const { timers } = this.state;

    this.setState({
      timers: timers.filter(t => t.id !== timerId),
    });
  };

  toggleTimer = timerId => {
    console.log('TimerScreen - toggleTimer');

    this.setState(prevState => {
      const { timers } = prevState;

      return {
        timers: timers.map(timer => {
          const { id, isRunning } = timer;

          if (id === timerId) {
            return {
              ...timer,
              isRunning: !isRunning,
            };
          }

          return timer;
        }),
      };
    });
  };

  render() {
    const { timers } = this.state;

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.timerListContainer}
        >
          <ScrollView style={styles.timerList}>
            <ToggleableTimerForm
              onFormSubmit={this.handleCreateFormSubmit}
            />
            {timers.map(
              ({ title, project, id, elapsed, isRunning }) => (
                <EditableTimer
                  key={id}
                  id={id}
                  title={title}
                  project={project}
                  elapsed={elapsed}
                  isRunning={isRunning}
                  onFormSubmit={this.handleFormSubmit}
                  onRemovePress={this.handleRemovePress}
                  onStartPress={this.toggleTimer}
                  onStopPress={this.toggleTimer}
                />
              ),
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
  flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 15,
  },
    timerList: {
    paddingBottom: 15,
  },
});
