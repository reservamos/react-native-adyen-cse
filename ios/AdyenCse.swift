import Adyen
import Foundation

@objc(AdyenCse)
class AdyenCse: NSObject {
  
  var publicKey: String?
  var env: Environment?
  var envName: String?
  
  @objc func initAdyen(_ publicKey: String, env: String) {
    self.publicKey = publicKey
    envName = env
    switch env {
    case "live":
      self.env = .liveUnitedStates
    default:
      self.env = .test
    }
  }
  
  @objc func encryptCard(_ cardNumber: String, expiryMonth: String, expiryYear: String, securityCode: String, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock)  {
    
    
    let unencryptedCard = Card(number: cardNumber, securityCode: securityCode, expiryMonth: expiryMonth, expiryYear: expiryYear)
    
    var resultData = NSMutableDictionary()
    
    do {
      let encryptedCard = try CardEncryptor.encrypt(card: unencryptedCard, with: self.publicKey!)
      
      resultData = [
        "encryptedNumber":encryptedCard.number!,
        "encryptedExpiryMonth":encryptedCard.expiryMonth!,
        "encryptedExpiryYear":encryptedCard.expiryYear!,
        "encryptedSecurityCode":encryptedCard.securityCode!,
      ]
      
    } catch let encryptedCardError {
      debugPrint(encryptedCardError)
    }
    resolve(resultData)
  }
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

