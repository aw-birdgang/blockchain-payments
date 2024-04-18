import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';

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
          return PagingListView(provider, itemWidget);
        },
      ),
    );
  }
}