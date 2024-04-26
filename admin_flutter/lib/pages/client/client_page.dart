import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';

import '../../components/empty_view.dart';
import '../../components/paging_listview.dart';
import '../../models/client.dart';
import '../../providers/client_provider.dart';
import 'components/client_item.dart';

class ClientPage extends StatelessWidget {
  const ClientPage({Key? key}) : super(key: key);

  Widget itemWidget(Client item) {
    return ClientItem(item, key: Key("client_${item.id}"));
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<ClientProvider>(
      create: (context) => ClientProvider(),
      child: Consumer<ClientProvider>(
        builder: (context, provider, child) {
          // 조건을 검사하여, 클라이언트 목록이 비어 있거나 null이면 EmptyView를 보여줌
          // if (provider.list == null || provider.list.isEmpty) {
          //   return const EmptyView(); // 클라이언트가 없는 경우 보여질 위젯
          // }
          // 클라이언트가 있는 경우 PagingListView를 사용
          return PagingListView(provider, itemWidget);
        },
      ),
    );
  }
}
