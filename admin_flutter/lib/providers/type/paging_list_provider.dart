import 'package:flutter/widgets.dart';

import '../../common/constrant.dart';
import 'list_provider.dart';

abstract class PagingListProvider extends ListProvider {
  TextEditingController pageController = TextEditingController();
  TextEditingController searchController = TextEditingController();
  String selectedSearchFilter = SEARCH_FILTER_ALL;
  List<String> searchFilterList = [SEARCH_FILTER_ALL];

  @override
  void init() {
    pageController.text = "1";
    currentPage = 1;
    fetchList();
  }

  int getPageRange() {
    return totalCount ~/ batchSize + 1;
  }

  void onSearch() {
    switch(selectedSearchFilter) {
      case SEARCH_FILTER_ALL:
        fetchList();
        break;
      default:
        fetchList();
        break;
    }
    return;
  }

  void onSearchFilterChanged(String filter) {
    selectedSearchFilter = filter;
    notify();
  }

  void onForwardClicked() {
    print('## onForwardClicked() >> currentPage: ${currentPage}');
    if(currentPage <= 1) return;
    currentPage--;
    pageController.text = currentPage.toString();
    fetchList();
    return;
  }

  void onBackwardClicked() {
    print('## onBackwardClicked() >> currentPage: ${currentPage}');
    if(currentPage >= getPageRange()) return;
    currentPage++;
    pageController.text = currentPage.toString();
    fetchList();
    return;
  }

  void onPageChanged(int page) {
    print('## onPageChanged()');
    if(page < 1 || page > getPageRange()) return;
    if(currentPage != page) {
      currentPage = page;
      fetchList();
    }
    notify();
  }
}