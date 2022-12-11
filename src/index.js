import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-adyen-cse' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AdyenCse = NativeModules.AdyenCse
  ? NativeModules.AdyenCse
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function initAdyen(clientEncryptionPublicKey, env) {
  if (!clientEncryptionPublicKey || !env) {
    return;
  }

  AdyenCse.initAdyen(clientEncryptionPublicKey, env);
}

export function encryptCard(
  cardNumber,
  expiryMonth,
  expiryYear,
  securityCode
) {
  return AdyenCse.encryptCard(
    cardNumber,
    expiryMonth,
    expiryYear,
    securityCode
  );
}
