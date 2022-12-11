import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import { initAdyen, encryptCard } from 'react-native-adyen-cse';
import { Formik } from 'formik';
import { ADYEN_CSE_PK } from '@env';

const App = () => {
  const [encryptedCard, setEncryptedCard] = useState(null);

  useEffect(() => {
    initAdyen(ADYEN_CSE_PK, 'test'); //add your Adyen CSE Public Key or set `ADYEN_CSE_PK` within your .env file.
  }, []);

  const onSubmit = async (values) => {
    const { cardNumber, expMonth, expYear, cvv } = values;
    const encrypted = await encryptCard(cardNumber, expMonth, expYear, cvv);
    setEncryptedCard(encrypted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Adyen CSE library example'}</Text>
      <Formik
        initialValues={{ cardNumber: '', expMonth: '', expYear: '', cvv: '' }}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              placeholder="Card number"
              style={styles.input}
              onChangeText={handleChange('cardNumber')}
              onBlur={handleBlur('cardNumber')}
              value={values.cardNumber}
              keyboardType="number-pad"
              maxLength={16}
            />
            <View style={styles.row}>
              <TextInput
                placeholder="Exp. Month"
                style={styles.input}
                onChangeText={handleChange('expMonth')}
                onBlur={handleBlur('expMonth')}
                value={values.expMonth}
                keyboardType="number-pad"
                maxLength={2}
              />
              <TextInput
                placeholder="Exp. Year"
                style={styles.input}
                onChangeText={handleChange('expYear')}
                onBlur={handleBlur('expYear')}
                value={values.expYear}
                keyboardType="number-pad"
                maxLength={4}
              />
              <TextInput
                placeholder="CVV"
                style={styles.input}
                onChangeText={handleChange('cvv')}
                onBlur={handleBlur('cvv')}
                value={values.cvv}
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
            <View style={styles.button}>
              <Button onPress={() => handleSubmit()} title="Encrypt" />
            </View>
          </View>
        )}
      </Formik>
      {encryptedCard && (
        <ScrollView style={styles.result}>
          <Text style={styles.textResult}>{JSON.stringify(encryptedCard)}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 80,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: 12,
  },
  input: {
    height: 40,
    minWidth: 100,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#cecece',
    padding: 10,
  },
  result: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#cecece',
    padding: 10,
  },
  textResult: {
    paddingBottom: 20,
  },
});

export default App;