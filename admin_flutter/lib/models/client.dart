import '../common/map_util.dart';

class Client {
  String? id;
  String? name;
  String? accessToken;
  String? type;
  String? createdAt;
  String? updatedAt;

  Client({
    this.id,
    this.name,
    this.accessToken,
    this.type,
    this.createdAt,
    this.updatedAt,
  });

  Map<String, dynamic> toMap() => {
    "id": id,
    "name": name,
    "accessToken": accessToken,
    "type": type,
    "createdAt": createdAt,
    "updatedAt": updatedAt,
  };

  Client.fromJson(Map<String, dynamic> map) {
    id = getItemFromMapForStr(map, "id");
    name = getItemFromMapForStr(map, "name");
    accessToken = getItemFromMapForStr(map, "accessToken");
    type = getItemFromMapForStr(map, "type");
    createdAt = getItemFromMapForStr(map, "createdAt");
    updatedAt = getItemFromMapForStr(map, "updatedAt");
  }

  @override
  String toString() => '${toMap()}';
}