import 'package:flutter/material.dart';

import '../providers/type/paging_list_provider.dart';
import 'page_selector.dart';
import 'search_container.dart';

class PagingListView extends StatelessWidget {
  PagingListProvider parentListProvider;
  Function itemWidgetFunction;
  bool isSearch;
  PagingListView(this.parentListProvider, this.itemWidgetFunction, {
    this.isSearch = false,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            PageSelector(parentListProvider),
            if(isSearch) SearchContainer(parentListProvider),
          ],
        ),
        const SizedBox(height: 8.0),
        Expanded(
          child: parentListProvider.list.isNotEmpty ? SingleChildScrollView(
            padding: const EdgeInsets.all(0.0),
            controller: parentListProvider.scrollController,
            child: ListView.builder(
                padding: const EdgeInsets.all(0.0),
                itemCount: parentListProvider.list.length,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemBuilder: (context, index) {
                  dynamic item = parentListProvider.list[index];
                  return itemWidgetFunction(item);
                }
            ),
          ) : const Center(child: CircularProgressIndicator()),
        )
      ],
    );
  }
}