abstract class ConfigurationProvider {
  bool containsKey(String key);
  String? getOrNull(String key, {String? defaultValue});
  Future<bool> containsKeyAsync(String key) async {
    return Future.value(containsKey(key));
  }
  Future<String?> getOrNullAsync(String key, {String? defaultValue}) async {
    return Future.value(getOrNull(key, defaultValue: defaultValue));
  }
}