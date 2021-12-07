import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Counter1, Counter2} from '../../../assets';

const Counter = ({payment,onValueChange,  addItem, onPress}) => {
  const [value,setValue] = useState(1);
  
  useEffect(() => {
    onValueChange(value);
  }, [])

  const onCount =(type) => {
    let result = value;
    if(type === 'plus')
    {
      result = value+1;

    }if(type === 'minus')
    {
      if(value > 1){
       result = value-1;
      }
    }

    setValue(result)
    onValueChange(result)
  }

  const renderAddItem = () => {

    if(value > 0)
    {
      return(
        <TouchableOpacity onPress={() => onCount('minus')} style={{ flexDirection: 'row' }} >
          <Text style={{ paddingHorizontal: 5 }}>{`${value} Items`}</Text>
          <Counter2 />
          
        </TouchableOpacity>
        )
    }
    
    return(
      
      <View style={{ marginLeft: 5 }}>
         
      </View>
      
      )
  }

  if (payment) {
    return (
      <View style={styles.counter}>
        <TouchableOpacity onPress={() => onCount('minus')} style={styles.containerCounter}>
          <Counter2 />
        </TouchableOpacity>
        <View>
          <Text>{`${value} Items`}</Text>
        </View>
        <TouchableOpacity onPress={() => onCount('plus')} style={styles.containerCounter}>
          <Counter1 />
        </TouchableOpacity>
      </View>
    );
  }

  if(addItem)
  {
    return(
      <View style={styles.counter}>
          <TouchableOpacity onPress={() => onCount('plus')} style={styles.containerCounter}>
            <Counter1 />
            {renderAddItem()}
          </TouchableOpacity>
      </View>    
      )

  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>Add</Text>
    </TouchableOpacity>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFDC60',
    marginTop: 13,
    paddingVertical: 6,
    borderRadius: 15,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerCounter: {
    padding: 5,
    flexDirection: 'row'
  },
});
