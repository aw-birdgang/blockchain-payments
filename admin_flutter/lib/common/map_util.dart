import 'object_util.dart';
import 'string_util.dart';

///
/// Map Item Get
///
dynamic getItemFromMap(Map? map, dynamic key) {
  if (isNotExists(map)) return null;
  if (isNotExists(key)) return null;
  if (!map!.containsKey(key)) return null;

  var data = map[key];
  if (isNotExists(data)) return null;

  return map[key];
}

Map? getItemFromMapForMap(Map? map, String? name) {
  var data = getItemFromMap(map, name);
  if (isNotExists(data)) return null;

  return data is Map ? data : null;
}

bool getItemFromMapForBool(Map? map, String? name, {bool defValue = false}) {
  var data = getItemFromMap(map, name);
  if (isNotExists(data)) return defValue;

  return data is bool ? data : defValue;
}

int getItemFromMapForInt(Map? map, String? name, {int defValue = 0}) {
  var data = getItemFromMap(map, name);
  if (isNotExists(data)) return defValue;
  return data is int ? data : defValue;
}

double getItemFromMapForDouble(Map? map, String? name, {double defValue = 0.0}) {
  var data = getItemFromMap(map, name);
  if (isNotExists(data)) return defValue;
  return data is double ? data : defValue;
}

String getItemFromMapForStr(Map? map, String? name) {
  var data = getItemFromMap(map, name);
  if (isNotExists(data)) return '';

  return data is String ? data : '';
}

List<T> getItemFromMapForList<T>(Map? map, String? name) {
  var data = getItemFromMap(map, name);
  if (isNotExists(data)) return <T>[];

  return data is List ? List.from(data) : <T>[];
}

///
/// Map Item Set
///
void setItemFromMapForBool(Map? map, String key, bool value) {
  if (isNotExists(map)) return;
  if (isNotExistsStr(key)) return;
  if (isNotExists(value)) return;

  map?[key] = value;
}

void setItemFromMapForInt(Map? map, String key, int value) {
  if (isNotExists(map)) return;
  if (isNotExistsStr(key)) return;
  if (isNotExists(value)) return;

  map?[key] = value;
}

void setItemFromMapForDouble(Map? map, String key, double value) {
  if (isNotExists(map)) return;
  if (isNotExistsStr(key)) return;
  if (isNotExists(value)) return;

  map?[key] = value;
}

void setItemFromMapForStr(Map? map, String key, String value) {
  if (isNotExists(map)) return;
  if (isNotExistsStr(key)) return;
  if (isNotExists(value)) return;

  map?[key] = value;
}

void setItemFromMapForList(Map? map, String key, List<dynamic> value) {
  if (isNotExists(map)) return;
  if (isNotExistsStr(key)) return;
  if (isNotExists(value)) return;

  map?[key] = value;
}

void setItemFromMap(Map? map, String key, dynamic value) {
  if (isNotExists(map)) return;
  if (isNotExistsStr(key)) return;
  if (isNotExists(value)) return;

  map?[key] = value;
}

Map<String, dynamic>? transMapFrom(Map? map) {
  if (isNotExists(map)) return null;

  return Map<String, dynamic>.from(map!);
}