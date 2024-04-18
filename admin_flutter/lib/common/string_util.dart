import 'package:intl/intl.dart';

import 'int_util.dart';
import 'object_util.dart';

bool isNotExistsStr(String? str) {
  if (null == str || str.isEmpty || str.trim().isEmpty) {
    return true;
  }
  return false;
}

bool isExistsStr(String? str) {
  return !isNotExistsStr(str);
}

bool checkIsEqualStringAtPrefix(String first, String second) {
  var lengthFirst = first.length;
  var lengthSecond = second.length;

  if (isNotPositiveNum(lengthFirst)) return false;
  if (isNotPositiveNum(lengthSecond)) return false;
  if (lengthFirst < lengthSecond) return false;

  var subFirst = first.substring(0, lengthSecond);
  return subFirst == second;
}

String suffixAddSpace(String value) {
  return isExistsStr(value) ? value + ' ' : '';
}

bool checkIsNoneSpaceWordBlank(String message) {
  return RegExp(r'\S').allMatches(message).isEmpty;
}

bool checkIsEqualString(String? first, String? second) {
  return isExistsStr(first) && isExistsStr(second) && (first == second);
}

bool checkIsNotEqualString(String? first, String? second) {
  return !checkIsEqualString(first, second);
}

String transFormattedNumber(int number) {
  if (isNotExists(number)) return '';
  return NumberFormat('###,###,###,###').format(number).replaceAll(' ', '');
}

int transInt(String text) {
  if (isNotExistsStr(text)) return 0;
  var transInt = int.parse(text);
  var isInt = transInt is int;
  return isInt ? transInt : 0;
}