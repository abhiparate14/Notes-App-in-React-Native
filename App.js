import { StatusBar } from 'expo-status-bar';
import { Component, useState } from 'react';
import { StyleSheet, View, Button, FlatList} from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [modelIsVisible, setModelIsVisible] = useState(false);
  const [courseGoals, setCourseGoal] = useState([]);

  function startAddGoalHandler() {
    // console.log('press happened') ;
    setModelIsVisible(true);
  }

  function endAddGoalHandler() {
    // console.log('end button pressed');
    setModelIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    // console.log(enteredGoalText);
    setCourseGoal(currentCourseGoals => [
      ...currentCourseGoals,
      {text: enteredGoalText, id: Math.random().toString()},
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    // console.log('deleted' );
    setCourseGoal(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  };
  
  

  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
      <Button 
        title='Add New Goal' 
        onPress={startAddGoalHandler}
        color="#5e0acc"
      />
      <GoalInput visible={modelIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler}/>
      <View style={styles.goalsContainer}>
        <FlatList data={courseGoals} 
        renderItem={(itemData) => {
          return <GoalItem 
            text={itemData.item.text} 
            id={itemData.item.id}
            onDeleteItem={deleteGoalHandler} 
          />;
        }}/>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
