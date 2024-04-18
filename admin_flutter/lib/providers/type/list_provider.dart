import 'package:flutter/cupertino.dart';

import '../../common/constrant.dart';
import 'view_provider.dart';

abstract class ListProvider extends ViewProvider {
  List<dynamic> list = [];
  ScrollController scrollController = ScrollController();

  int currentPage = 0;
  int totalCount = 0;
  int batchSize = FETCH_SIZE;

  void clear() {
    list.clear();
    notify();
  }

  Future<void> fetchList({int page = 1, int size = FETCH_SIZE});
}