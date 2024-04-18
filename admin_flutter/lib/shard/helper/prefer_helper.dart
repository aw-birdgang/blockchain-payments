import 'package:shared_preferences/shared_preferences.dart';

class PreferHelper {
  //
  static const String _userId = 'userId';
  static const String _email = 'email';
  static const String _password = 'password';
  static const String _mnemonic = 'mnemonic';
  static const String _address = 'address';
  static const String _privateKey = 'privateKey';
  static const String _publicKey = 'publicKey';

  //
  static Future<String> getUserId() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_userId) ?? '';
  }
  static Future<bool> setUserId(String userId) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.setString(_userId, userId);
  }

  //
  static Future<String> getEmail() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_email) ?? '';
  }
  static Future<bool> setEmail(String email) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.setString(_email, email);
  }

  //
  static Future<String> getPassword() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_password) ?? '';
  }
  static Future<bool> setPassword(String password) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.setString(_password, password);
  }

  //
  static Future<String> getMnemonic() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_mnemonic) ?? '';
  }
  static Future<bool> setMnemonic(String mnemonic) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.setString(_mnemonic, mnemonic);
  }

  //
  static Future<String> getAddress() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_address) ?? '';
  }
  static Future<bool> setAddress(String address) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.setString(_address, address);
  }


  //
  static Future<String> getPrivateKey() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_privateKey) ?? '';
  }
  static Future<bool> setPrivateKey(String privateKey) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.setString(_privateKey, privateKey);
  }

  //
  static Future<String> getPublicKey() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_publicKey) ?? '';
  }
  static Future<bool> setPublicKey(String privateKey) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.setString(_publicKey, privateKey);
  }

}