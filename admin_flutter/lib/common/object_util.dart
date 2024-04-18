bool isExists(var obj) {
  return (null != obj);
}

bool isNotExists(var obj) {
  return !isExists(obj);
}

bool isTrue(bool? value) {
  if (isExists(value)) {
    return value!;
  }
  return false;
}

bool isFalse(bool? value) {
  if (isExists(value)) {
    return !isTrue(value);
  }
  return true;
}