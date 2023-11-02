import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const button_width = 0.20 * Dimensions.get('screen').width;
const button_height = 0.09 * Dimensions.get('screen').height;

export default function App() {

  // states
  const [answerValue, setAnswerValue] = useState(0);
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState(0);
  const [operatorValue, setOperatorValue] = useState(0);

  //variables
  var string_value;
  var previous;
  var current;
  var chain_calculation;

  // function for button pressed 
  function buttonPressed(button_value) {
    string_value = button_value;

    // if number buttons are pressed 
    if (
      string_value == "0" ||
      string_value == "1" || 
      string_value == "2" ||
      string_value == "3" ||
      string_value == "4" ||
      string_value == "5" ||
      string_value == "6" ||
      string_value == "7" ||
      string_value == "8" ||
      string_value == "9" ||
      string_value == "."
    ) {
      setAnswerValue(handleNumber());
    }

    // if clear button is pressed
    if (string_value == "C") {
      setAnswerValue(0);
      setMemoryValue(0);
      setOperatorValue(0);
      setReadyToReplace(true);
    }

    // if operator buttons are pressed
    if (string_value == "+" || string_value == "-" || string_value == "*" || string_value == "/") {
      if (operatorValue != 0) {
        chain_calculation = calculateEquals();
        setMemoryValue(chain_calculation);
        setReadyToReplace(true);
        setOperatorValue(string_value);
      }
      else {
        setMemoryValue(answerValue);
        setReadyToReplace(true);
        setOperatorValue(string_value);
      }
    }

    // if equal button is pressed
    if (string_value == "=") {
      calculateEquals();
      setMemoryValue(0);
      setReadyToReplace(true);
    }

    // if plus/minus button is pressed
    if (string_value == "+/-") {
      setAnswerValue(answerValue * -1);
    }

    // if percentage button is pressed
    if (string_value == "%") {
      setAnswerValue(answerValue * 0.01);
    }

    // if square button is pressed
    if (string_value == "x²") {
      setAnswerValue(answerValue * answerValue);
    }

    // if cube button is pressed
    if (string_value == "x³") {
      setAnswerValue(answerValue * answerValue * answerValue);
    }

    // if squareroot button is pressed
    if (string_value == "√") {
      setAnswerValue(Math.sqrt(answerValue));
    }

    // if cuberoot button is pressed
    if (string_value == "∛") {
      setAnswerValue(Math.cbrt(answerValue));
    }
  }

  // function for handling results field
  function handleNumber() {
    // if results field shows 0 and 0 is pressed
    if (readyToReplace == true && string_value == "0") {
      return answerValue
    }

    else if (readyToReplace == true && string_value == ".") {
      setReadyToReplace(false);
      return "0" + string_value
    }

    // if results field shows 0 and any number besides 0 is pressed
    else if (readyToReplace == true) {
      setReadyToReplace(false);
      return string_value
    }

    // if results field shows any number besides 0 and any number is pressed
    else if (readyToReplace == false) {
      return answerValue + string_value
    }
  }

  // function for calculation
  function calculateEquals () {
    previous = parseFloat(memoryValue);
    current = parseFloat(answerValue);
  
    switch(operatorValue) {
      case "+":
        setAnswerValue(previous + current);
        return previous + current
      case "-":
        setAnswerValue(previous - current);
        return previous - current
      case "*":
        setAnswerValue(previous * current);
        return previous * current
      case "/":
        setAnswerValue(previous / current);
        return previous / current
    }
  }

  // screen
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>

        <Text style={styles.result_text}> {answerValue} </Text>

        {/* rows of buttons */}
        {/* first row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.misc_button} onPress={()=>buttonPressed("C")}>
            <Text style={styles.button_text}> C </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.misc_button} onPress={()=>buttonPressed("+/-")}>
            <Text style={styles.button_text}> +/- </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.misc_button} onPress={()=>buttonPressed("x²")}>
            <Text style={styles.button_text}> x² </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.misc_button} onPress={()=>buttonPressed("x³")}>
            <Text style={styles.button_text}> x³ </Text>
          </TouchableOpacity>
        </View>
        {/* second row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.misc_button} onPress={()=>buttonPressed("√")}>
            <Text style={styles.button_text}> √ </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.misc_button} onPress={()=>buttonPressed("∛")}>
            <Text style={styles.button_text}> ∛ </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.misc_button} onPress={()=>buttonPressed("%")}>
            <Text style={styles.button_text}> % </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operator_button} onPress={()=>buttonPressed("/")}>
            <Text style={styles.button_text}> / </Text>
          </TouchableOpacity>
        </View>
        {/* third row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.number_button} onPress={()=>buttonPressed("7")}>
            <Text style={styles.button_text}> 7 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number_button} onPress={()=>buttonPressed("8")}>
            <Text style={styles.button_text}> 8 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number_button} onPress={()=>buttonPressed("9")}>
            <Text style={styles.button_text}> 9 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operator_button} onPress={()=>buttonPressed("*")}>
            <Text style={styles.button_text}> x </Text>
          </TouchableOpacity>
        </View>
        {/* fourth row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.number_button} onPress={()=>buttonPressed("4")}>
            <Text style={styles.button_text}> 4 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number_button} onPress={()=>buttonPressed("5")}>
            <Text style={styles.button_text}> 5 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number_button} onPress={()=>buttonPressed("6")}>
            <Text style={styles.button_text}> 6 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operator_button} onPress={()=>buttonPressed("-")}> 
            <Text style={styles.button_text}> - </Text>
          </TouchableOpacity>
        </View>
        {/* fifth row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.number_button} onPress={()=>buttonPressed("1")}>
            <Text style={styles.button_text}> 1 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number_button} onPress={()=>buttonPressed("2")}>
            <Text style={styles.button_text}> 2 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number_button} onPress={()=>buttonPressed("3")}>
            <Text style={styles.button_text}> 3 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operator_button} onPress={()=>buttonPressed("+")}>
            <Text style={styles.button_text}> + </Text>
          </TouchableOpacity>
        </View>
        {/* sixth row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.zero_button} onPress={()=>buttonPressed("0")}>
            <Text style={styles.button_text}> 0 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number_button} onPress={()=>buttonPressed(".")}>
            <Text style={styles.button_text}> . </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operator_button} onPress={()=>buttonPressed("=")}>
            <Text style={styles.button_text}> = </Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="light" />
      </View>
    </SafeAreaView>
  );
}

// stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  result_text: {
    color: 'black',
    fontSize: button_width,
    alignSelf: 'flex-end',
    textAlign: 'center',
  },

  row: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },

  operator_button: {
    backgroundColor: 'black',
    width: button_width,
    height: button_height,
    borderRadius: button_width * 0.5,
    alignItems: 'center',
    margin: button_width * 0.05,
  },

  misc_button: {
    backgroundColor: 'grey',
    width: button_width,
    height: button_height,
    borderRadius: button_width * 0.5,
    alignItems: 'center',
    margin: button_width * 0.05,
  },

  number_button: {
    backgroundColor: 'lightgrey',
    width: button_width,
    height: button_height,
    borderRadius: button_width * 0.5,
    alignItems: 'center',
    margin: button_width * 0.05,
  },

  zero_button: {
    backgroundColor: 'lightgrey',
    width: 2.05 * button_width,
    height: button_height,
    borderRadius: button_width * 0.5,
    alignItems: 'center',
    margin: button_width * 0.05,
  },

  button_text: {
    color: 'white',
    fontSize: button_width * 0.5,
    marginTop: button_width * 0.15,
  }
});
