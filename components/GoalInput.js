import {View, TextInput, Button, StyleSheet, Modal, Image   } from 'react-native';
import {useState} from 'react';



function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(enteredText) {
        // console.log(enteredText);
        setEnteredGoalText(enteredText);
    };
    
    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        props.onFirebase(enteredGoalText);
        setEnteredGoalText('');
    };

    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../assets/images/goal.png')} />
                <TextInput 
                    style={styles.textInput} 
                    placeholder='Your course goal!!' 
                    onChangeText={goalInputHandler} 
                    value={enteredGoalText}
                />
                <View style={styles.buttonContainer}>
                <View style={styles.button}>
                        <Button title='Cancle' onPress={props.onCancel} color="#f31282"/>
                    </View>
                    <View style={styles.button}>
                        <Button title='Add Goal' onPress={addGoalHandler} color="#5e0acc"/>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b'
    },
    textInput: {
        width: '100%',
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        color: '#120438',
        borderRadius: 6,
        borderWidth: 1,
        padding: 16,
        marginRight: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    button: {
        width: '40%',
        padding: 10,
        margin: 10,
    },
    image: {
        width: 100,
        height: 100,
        margin: 20
    }
});