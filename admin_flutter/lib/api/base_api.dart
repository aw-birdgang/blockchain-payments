import 'package:dio/dio.dart';

import '../common/constrant.dart';
import '../services/configure/http_configuration_provider.dart';

class Api {
  static final _instance = Api._internal();
  factory Api() => _instance;

  Api._internal();

  /// ============= ///
  ///      GET      ///
  /// ============= ///
  Future<Map<String, dynamic>> get(String url, {
    int batchSize = FETCH_SIZE,
    Map<String, dynamic>? query,
    String version = "v1",
  }) async {
    HttpConfigurationProvider provider = HttpConfigurationProvider();
    String baseUrl = provider.getBaseApiUrl();
    String apiKey = provider.getApiKey();
    String apiUrl = '${baseUrl}/${version}/${url}';
    print('## GET >> ${apiUrl}');

    Dio dio = Dio();
    // dio.options.headers["Authorization"] = 'Bearer $apiKey';
    dio.interceptors.add(InterceptorsWrapper(
        onRequest:(options, handler) async {
          return handler.next(options); //continue
        },
        onResponse:(response,handler) {
          return handler.next(response); // continue
        },
        onError: (error, handler) {
          print('## GET error >> ${error.message}');
          return  handler.next(error);
        }
    ));
    // dio.interceptors.add(CustomLogInterceptor());
    Response response = await dio.get(apiUrl, queryParameters: query);
    print('## response: ${response.data}');
    return response.data as Map<String, dynamic>;
  }

  /// ============== ///
  ///      POST      ///
  /// ============== ///
  Future<Map<String, dynamic>> post(String url, {
    required Map<String, dynamic> data,
    String version = "/v1",
  }) async {
    HttpConfigurationProvider provider = HttpConfigurationProvider();
    String baseUrl = provider.getBaseApiUrl();
    String apiKey = provider.getApiKey();
    String apiUrl = '${baseUrl}${version}${url}';
    print('## POST >> ${apiUrl}');

    Dio dio = Dio();
    dio.options.headers["Authorization"] = 'Bearer $apiKey';
    dio.interceptors.add(InterceptorsWrapper(
        onRequest:(options, handler) async {
          return handler.next(options); //continue
        },
        onResponse:(response,handler) {
          return handler.next(response); // continue
        },
        onError: (error, handler) {
          print('## POST error >> ${error.message}');
          return  handler.next(error);
        }
    ));
    // dio.interceptors.add(CustomLogInterceptor());
    Response response = await dio.post(apiUrl, data: data);
    return response.data as Map<String, dynamic>;
    // return jsonDecode(response.data);
  }
}
