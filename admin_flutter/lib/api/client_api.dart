
import '../models/client.dart';
import 'base_api.dart';

class ClientApi {
  static final _instance = ClientApi._internal();
  factory ClientApi() => _instance;

  ClientApi._internal();

  int totalCount = 0;

  Future<List<Client>> getClientList(int page, int batchSize) async {
    Map<String, dynamic> data = await Api().get("client/admin", query: {
      "take": batchSize,
      "page": page,
    });
    var results = data['results'];
    totalCount = data['total'];
    List<Client> clientList = (results as List)
        .map((x) => Client.fromJson(x))
        .toList();
    return clientList;
  }
}