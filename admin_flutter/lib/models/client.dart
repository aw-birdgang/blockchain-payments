import '../common/map_util.dart';

class Client {
  String? id;
  String? name;
  String? accessToken;
  String? webhookUrl;
  String? createdAt;
  String? updatedAt;

  Client({
    this.id,
    this.name,
    this.accessToken,
    this.webhookUrl,
    this.createdAt,
    this.updatedAt,
  });

  Map<String, dynamic> toMap() => {
    "id": id,
    "name": name,
    "accessToken": accessToken,
    "webhookUrl": webhookUrl,
    "createdAt": createdAt,
    "updatedAt": updatedAt,
  };

  Client.fromJson(Map<String, dynamic> map) {
    id = getItemFromMapForStr(map, "id");
    name = getItemFromMapForStr(map, "name");
    accessToken = getItemFromMapForStr(map, "accessToken");
    webhookUrl = getItemFromMapForStr(map, "webhookUrl");
    createdAt = getItemFromMapForStr(map, "createdAt");
    updatedAt = getItemFromMapForStr(map, "updatedAt");
  }

  @override
  String toString() => '${toMap()}';
}
