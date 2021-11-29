import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IcStartOff, IcStartOn} from '../../../assets';
import Number from '../../../utils/Number/Number';

const Rating = ({ratingCard, rating, number}) => {

  const renderStar = () => {
    let star = [];
    for(let i = 1 ; i<=5 ; i++)
    {
      if(i <= number){
        star.push(<IcStartOn key={i} />)
      }else{
        star.push(<IcStartOff key={i} />)
      }
    }

    return star;
  }


  if (ratingCard) {
    return (
      <View style={styles.ratingContainer}>
        <View style={styles.startContainer}>
          <IcStartOn />
        </View>
        <Number type="decimal" number={number} style={styles.text} />
      </View>
    );
  }
  return (
    <View style={styles.ratingContainer}>
      <View style={styles.startContainer}>
          {renderStar()}
      </View>
      <Number type="decimal" number={number} style={styles.text} />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
  },
  startContainer: {
    flexDirection: 'row',
  },
});
