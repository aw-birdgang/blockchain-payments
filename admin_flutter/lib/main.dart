import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import 'controllers/auth_controller.dart';
import 'services/configure/http_configuration_provider.dart';
import 'shard/constants.dart';


Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // print("load dotenv!!");
  // await dotenv.load(fileName: "assets/env/.env.dev");
  // String envFbProjectId = dotenv.get('FIREBASE_PROJECT_ID');
  // print("envFbProjectId :: " + envFbProjectId);
  HttpConfigurationProvider provider = HttpConfigurationProvider();
  await Firebase.initializeApp(
    options: FirebaseOptions(
        apiKey: provider.getFirebaseApiKey(), //"AIzaSyD2hshi7Hz-hgKtAiFM_aK8Mnn09zm69tk",
        authDomain: provider.getFirebaseDomain(),
        projectId: provider.getFirebaseProductName(),
        storageBucket: provider.getFirebaseStorageBucket(),
        messagingSenderId: provider.getFirebaseMessagingSenderId(),
        appId: provider.getFirebaseAppId(),
        measurementId: provider.getFirebaseMeasurementId()
    ),
  );
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(
      create: (context) => AuthController(),
    ),
    ChangeNotifierProxyProvider<AuthController, MenuController>(
      update: (context, auth, previousMenu) => MenuController(auth),
      create: (BuildContext context) => MenuController(null),
    ),
  ], child: const MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: bgColor,
        textTheme: GoogleFonts.poppinsTextTheme(Theme.of(context).textTheme).apply(bodyColor: Colors.white),
        canvasColor: secondaryColor,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const MainScreen(),
      },
    );
  }
}