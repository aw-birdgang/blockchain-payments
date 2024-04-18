import 'object_util.dart';

bool isPositiveNum(int? num) {
  if (isNotExists(num)) return false;
  return (0 < num!);
}

bool isNotPositiveNum(int? num) {
  return !isPositiveNum(num);
}

bool isPositiveDouble(double num) {
  return (0.0 < num);
}

bool isNotPositiveDouble(double num) {
  return !isPositiveDouble(num);
}

bool isZeroDouble(double num) {
  return (0.0 == num);
}

bool isManyNum(int num) {
  return (1 < num);
}

int increaseNum(int num) {
  return isNotPositiveNum(++num) ? 0 : num;
}

int decreaseNum(int num) {
  return isNotPositiveNum(--num) ? 0 : num;
}

int getValueDivideInt({int child = 0, int parent = 1}) {
  if (0 >= parent) {
    return 0;
  }
  return child ~/ parent;
}