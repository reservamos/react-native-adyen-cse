package com.adyencse

import com.adyen.checkout.core.api.Environment
import com.adyen.checkout.cse.CardEncrypter
import com.adyen.checkout.cse.UnencryptedCard
import com.facebook.react.bridge.*

class AdyenCseModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  var publicKey: String? = null
  var environment: Environment? = null
  var envName: String? = null

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun initAdyen(publicKey: String, env: String) {
    this.publicKey = publicKey
    this.envName = env
    this.environment = if (env.trim { it <= ' ' }.isEmpty()) {
      Environment.TEST
    } else {
      if (env.equals("test", ignoreCase = true)) {
        Environment.TEST
      } else {
        Environment.UNITED_STATES
      }
    }
  }

  @ReactMethod
  fun encryptCard(cardNumber: String?, expiryMonth: String?, expiryYear: String?, securityCode: String?, promise: Promise) {
    val unencryptedCard = UnencryptedCard.Builder()
      .setNumber(cardNumber!!)
      .setExpiryMonth(expiryMonth!!)
      .setExpiryYear(expiryYear!!)
      .setCvc(securityCode!!)
      .build()
    val encryptedCard = CardEncrypter.encryptFields(unencryptedCard, publicKey!!)
    val resultMap: WritableMap = WritableNativeMap()
    resultMap.putString("encryptedNumber", encryptedCard.encryptedCardNumber)
    resultMap.putString("encryptedExpiryMonth", encryptedCard.encryptedExpiryMonth)
    resultMap.putString("encryptedExpiryYear", encryptedCard.encryptedExpiryYear)
    resultMap.putString("encryptedSecurityCode", encryptedCard.encryptedSecurityCode)
    promise.resolve(resultMap)
  }

  companion object {
    const val NAME = "AdyenCse"
  }
}
