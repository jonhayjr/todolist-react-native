import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-web';

export default function App() {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [currKey, setCurrKey] = useState(1);


  const handleTextChange = (val) => {
    setValue(val);
  }
  
  const handlePressEvent = () => {
    if (value) {
      setTodos((prev) => {
        let data = [...prev];
        data.push({todo: value, complete: false, key: currKey});
        return data;
      })

      handleIncrement();
    }
  }

  const handleIncrement = () => {
    setCurrKey(prev => prev + 1);
  }

  const deleteTodo = (val) => {
    const item = val.target.innerText;
    setTodos(
      (prev) => {
        let data = prev.filter(d => {
          d.todo !== item
        })
        return data;
      }
    )
  }

  const toggleComplete = (item) => {
    setTodos((prev) => {
      let data = [...prev];
      let currItem = data.find(d => {
        return d.todo == item.todo
      });
      currItem.complete = !currItem.complete;
      return data;
    })
  }

  const getTodoStyling = (item) => {
    if (item.complete) {
      return styles.todoGreen
    } else {
      return styles.todoRed;
    }
  }

  const getCompleteButtonText = (item) => {
    if (item.complete) {
      return 'Uncomplete'
    } else {
      return 'Complete'
    }
  }

 
  const renderItem = ({item}) => {
    if (item) {
      return <View style={getTodoStyling(item)}>
      <Text style={styles.todoText} >{item.todo}</Text>
      <View style={styles.buttonSmallGreen}>
        <Button title={getCompleteButtonText(item)} color='white' onPress={(val) => {toggleComplete(item)}}/>
      </View>
      <View style={styles.buttonSmallRed}>
        <Button title='Delete' color='white' onPress={(val) => {deleteTodo(val)}}/>
      </View>
  </View>
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Todo App</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>Enter A Todo</Text>
        <TextInput 
          style={styles.input}
          placeholder='e.g. Mow the lawn'
          onChangeText={(val) => {handleTextChange(val)}}
        />
        <View style={styles.buttonContainer}>
          <Button
            color= 'white'
            title='Add todo'
            onPress={handlePressEvent}
          />
        </View>
      </View>
        <ScrollView>
          <View style={styles.todoContainer}>
            <FlatList
              data={todos}
              renderItem={renderItem}
            />
          </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>&copy;2022 Jon Hay</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  header: {
    backgroundColor: 'red',
    width: '100%',
    padding: 25
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  inputContainer: {
    marginTop: 10
  },
  input: {
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 2,
    padding: 5
  },
  buttonContainer: {
    marginTop: 10,
    fontWeight: 'bold',
    backgroundColor: 'red'
  },
  todoContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  todoRed: {
    borderColor: 'red',
    borderWidth: 2,
    marginTop: 5,
    width: 200,
    padding: 5,
    marginRight: 10
  },
  todoGreen: {
    borderColor: 'green',
    borderWidth: 2,
    marginTop: 5,
    width: 200,
    padding: 5,
    marginRight: 10
  },
  todoText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    color: 'red'
  },
  buttonSmallRed: {
    marginTop: 5,
    padding: 5,
    width: '75%',
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: 'red'
  },
  buttonSmallGreen: {
    marginTop: 5,
    padding: 5,
    width: '75%',
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: 'green'
  },
  footer: {
    backgroundColor: 'red',
    width: '100%',
    padding: 25
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
});
