import '../../common/env.dart';

class HttpConfigurationProvider {
  String getBaseApiUrl () {
    return (IS_ENV == PROD) ? PROD_API_URL : DEV_API_URL;
  }

  String getApiKey () {
    return (IS_ENV == PROD) ? PROD_API_KEY : DEV_API_KEY;
  }

  String getFirebaseProductName () {
    return (IS_ENV == PROD) ? PROD_FIREBASE_PROJECT_NAME : DEV_FIREBASE_PROJECT_NAME;
  }

  String getFirebaseApiKey () {
    return (IS_ENV == PROD) ? PROD_FIREBASE_API_KEY : DEV_FIREBASE_API_KEY;
  }

  String getFirebaseDomain () {
    return (IS_ENV == PROD) ? PROD_FIREBASE_DOMAIN : DEV_FIREBASE_DOMAIN;
  }

  String getFirebaseStorageBucket () {
    return (IS_ENV == PROD) ? PROD_STORAGE_BUCKET : DEV_STORAGE_BUCKET;
  }

  String getFirebaseMessagingSenderId () {
    return (IS_ENV == PROD) ? PROD_MESSAGING_SENDER_ID : DEV_MESSAGING_SENDER_ID;
  }

  String getFirebaseAppId () {
    return (IS_ENV == PROD) ? PROD_APP_ID : DEV_APP_ID;
  }

  String getFirebaseMeasurementId () {
    return (IS_ENV == PROD) ? PROD_MEASUREMENT_ID : DEV_MEASUREMENT_ID;
  }
}