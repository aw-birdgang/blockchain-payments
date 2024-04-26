import '../api/client_api.dart';
import '../common/constrant.dart';
import 'type/paging_list_provider.dart';

class ClientProvider extends PagingListProvider {
  ClientProvider() {
    init();
  }

  @override
  Future<void> fetchList({int? page, int size = FETCH_SIZE}) async {
    try {
      int fetchPage = page ?? currentPage;
      clear();
      startLoading();
      list.addAll(await ClientApi().getClientList(fetchPage, batchSize));
      totalCount = ClientApi().totalCount;
      stopLoading();
    } catch (e) {
      print('## getClientList() error >> ${e.toString()}');
    }
  }
}
