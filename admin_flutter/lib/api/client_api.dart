
import '../models/client.dart';
import 'base_api.dart';

class ClientApi {
  static final _instance = ClientApi._internal();
  factory ClientApi() => _instance;

  ClientApi._internal();

  int totalCount = 0;

  Future<List<Client>> getClientList(int page, int batchSize) async {
    print("getClientList >> page :: $page + batchSize :: $batchSize");

    Map<String, dynamic> data = await Api().get("client", query: {
      "take": batchSize,
      "page": page,
    });
    print("data :: $data");

    var results = data['results'];
    totalCount = data['total'];

    print("results :: $results");
    print("totalCount :: $totalCount");

    List<Client> clientList = (results as List)
        .map((x) => Client.fromJson(x))
        .toList();
    return clientList;
  }
}
