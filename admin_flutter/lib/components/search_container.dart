import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../providers/type/paging_list_provider.dart';
import '../shard/constants.dart';

class SearchContainer extends StatelessWidget {
  PagingListProvider parentListProvider;
  SearchContainer(this.parentListProvider, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56.0,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: MediaQuery.of(context).size.width/4,
            child: TextField(
              onSubmitted: (str) {
                if(str.isEmpty) return;
                parentListProvider.onSearch();
              },
              controller: parentListProvider.searchController,
              inputFormatters: [
                FilteringTextInputFormatter.allow(r"^[ㄱ-ㅎ가-힣0-9a-zA-Z]$"),
              ],
              decoration: const InputDecoration(
                hintText: "Search",
                fillColor: secondaryColor,
                filled: true,
                border: OutlineInputBorder(
                  borderSide: BorderSide.none,
                  borderRadius: BorderRadius.all(Radius.circular(8)),
                ),
              ),
            ),
          ),
          SizedBox(width: 8.0,),
          PopupMenuButton(
            child: Container(
              width: 80.0,
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.05),
                borderRadius: BorderRadius.circular(8.0),
              ),
              alignment: Alignment.center,
              child: Text(parentListProvider.selectedSearchFilter, style: TextStyle(color: Colors.white,)),
            ),
            itemBuilder: (context) => parentListProvider.searchFilterList.map((filter) => PopupMenuItem(
              onTap: () {
                parentListProvider.onSearchFilterChanged(filter);
              },
              value: filter,
              child: Text(filter),
            )).toList(),
          )
        ],
      ),
    );
  }
}