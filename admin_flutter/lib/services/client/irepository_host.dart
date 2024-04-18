import '../../models/client.dart';

abstract class IrepositoryClient {
  Future<List<Client>> getClients();
  Future<dynamic> registerClient(Client request,);
}