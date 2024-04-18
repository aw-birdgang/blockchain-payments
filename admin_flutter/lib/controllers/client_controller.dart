import 'package:flutter/material.dart';

import '../models/client.dart';
import '../services/client/repository_host.dart';

class ClientController extends ChangeNotifier {

  RepositoryClient repositoryHost = RepositoryClient();
  List<Client> listClients = [];
  late Client client;
  bool isLoading = true;

  ClientController() {
    init();
  }

  Future<void> init() async {
    isLoading = true;
    notifyListeners();
  }

  void getClients() async {
    try {
      isLoading = true;
      notifyListeners();
      listClients = await repositoryHost.getClients();
      isLoading = false;
      notifyListeners();
    } catch (e) {
      print(e);
    }
  }

  void registerClient(Client request, {response}) async {
    try {
      isLoading = true;
      notifyListeners();
      client = await repositoryHost.registerClient(request);
      isLoading = false;
      notifyListeners();
      response(client);
    } catch (e) {
      print(e);
    }
  }

}