#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AdyenCse, NSObject)

//init Adyen config
RCT_EXTERN_METHOD(initAdyen:(NSString)publicKey env:(NSString *) env)
//encrypt card method
RCT_EXTERN_METHOD(encryptCard:(NSString) cardNumber expiryMonth:(NSString)expiryMonth expiryYear:(NSString) expiryYear securityCode:(NSString) securityCode resolver:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject)
@end
