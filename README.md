# react-native-adyen-cse

Adyen client side encryption library for react native projects.

It is for project when you don't need use Adyen Drop-in integration and just need tokenize card info or use your custom interface for card data.

## Installation

```sh
yarn add git+https://github.com/reservamos/react-native-adyen-cse.git#1.1.0
```

## Requirements

**Check if your app is compatible:**

- Android mininal sdk version: 21 - Android Lollipop
- iOS minimal build target: iOS 12.4

**Get your Client Encryption Public Key.**

You need to set this as your `publicKey` when using the `react-native-adyen-cse` library. To get your public key:

- Sign in to your [Customer Area](https://ca-test.adyen.com/) using your company-level account.
- Navigate to **Developers** > **API credentials**.
- Click on your web service user (**ws@Company.[YourCompanyAccount]**) in the users list.

  This opens the **Edit Web Service** User page.

- In the **Client-Side Encryption** panel, copy the **Client Encryption Public Key**.

## Usage

```js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { initAdyen, encryptCard } from 'react-native-adyen-cse';

// ...

const App = () => {
  const publicKey = '1001|...'; //add your Adyen CSE Public Key
  const [encryptedCard, setEncryptedCard] = useState(null);

  const card = {
    cardNumber: '4917610000000000',
    cvv: '737',
    expMonth: '03',
    expYear: '2030',
  };

  useEffect(() => {
    initAdyen(publicKey, 'test'); // environment can be ['test'|'live']
  }, []);

  const onSubmit = async () => {
    const { cardNumber, expMonth, expYear, cvv } = card;
    const encrypted = await encryptCard(cardNumber, expMonth, expYear, cvv);
    setEncryptedCard(encrypted);
  };
};

return (
  <View>
    <View
      style={{
        margin: 12,
      }}
    >
      <Button onPress={onSubmit} title="Encrypt" />
    </View>
    {encryptedCard && (
      <ScrollView
        style={{
          margin: 12,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#cecece',
          padding: 10,
        }}
      >
        <Text>{JSON.stringify(encryptedCard)}</Text>
      </ScrollView>
    )}
  </View>
);

export default App;
```

## Demo app

you can see an example to use `react-native-adyen-cse` library in our [demo app](https://github.com/reservamos/react-native-adyen-cse/tree/main/example).

<table>
  <tr>
    <th>iOS</th>
    <th>Android</th>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/11278416/201222237-e6a43d37-cf21-43fa-b757-8bd7fb2c35d7.png" height=480 /></td>
    <td><img src="https://user-images.githubusercontent.com/11278416/201222270-3f8f5fed-a05f-41f1-b1e8-7b8d32242fed.png" height=480 /></td>
  </tr>
</table>

## References

- [Custom Card Integration](https://docs.adyen.com/payment-methods/cards/custom-card-integration)
- [Adyen iOS Drop-in](https://docs.adyen.com/online-payments/ios/drop-in)
- [Adyen Android Drop-in](https://docs.adyen.com/online-payments/android/drop-in)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
# react-native-adyen-cse
