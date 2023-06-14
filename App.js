import { StatusBar } from 'expo-status-bar';
import { Component, useState } from 'react';
import { StyleSheet, View, Button, FlatList} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, getDocs, doc } from 'firebase/firestore';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [modelIsVisible, setModelIsVisible] = useState(false);
  const [courseGoals, setCourseGoal] = useState([]);


  const firebaseConfig = {
    apiKey: "AIzaSyBcbuLJaODarVj-wngx47X3D2vlsiETTdY",
    authDomain: "notes-app-44.firebaseapp.com",
    projectId: "notes-app-44",
    storageBucket: "notes-app-44.appspot.com",
    messagingSenderId: "70213484242",
    appId: "1:70213484242:web:ec0208ffd06279a4ee770b",
    measurementId: "G-VV2PSYYYFV"
  };
  
  const app = initializeApp(firebaseConfig);

    const sendData = async () => {
      
      const firebase= getFirestore(app);

      await setDoc(doc(firebase, "users", "user_id"), {
        first: "Abhi",
        last: "Parate",
        born: 2002
      });
    }


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
        // onPress={sendData}
      />
      <Button onPress={sendData} title='Send Data'/>
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
