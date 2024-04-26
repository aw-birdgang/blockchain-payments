// import 'package:flutter/material.dart';
// import 'package:provider/provider.dart';
//
// import '../../controllers/client_controller.dart';
// import '../../pages/client/components/client_add.dart';
// import '../../pages/client/components/client_item.dart';
// import '../../shard/constants.dart';
// import '../../shard/responsive.dart';
//
// class ClientListScreen extends StatefulWidget {
//   const ClientListScreen({Key? key}) : super(key: key);
//   @override
//   State<ClientListScreen> createState() => _ClientListScreenState();
// }
//
// class _ClientListScreenState extends State<ClientListScreen> {
//   late ClientController clientController;
//
//   @override
//   Widget build(BuildContext context) {
//     return ChangeNotifierProvider(
//       create: (context) => ClientController()..getClients(),
//       child: _consumer(context),
//     );
//   }
//
//   Widget _consumer(BuildContext context) {
//     return Consumer<ClientController>(
//       builder: (context, clientController, child) {
//         this.clientController = clientController;
//         return _scaffold(context);
//       },
//     );
//   }
//
//   Widget _scaffold(BuildContext context,) {
//     return RefreshIndicator(
//       backgroundColor: primaryColor,
//       color: secondaryColor,
//       strokeWidth: 3,
//       triggerMode: RefreshIndicatorTriggerMode.onEdge,
//       onRefresh: () async {
//         await Future.delayed(const Duration(milliseconds: 1500));
//       },
//       child: contentView(context,),
//     );
//   }
//
//   Widget contentView (BuildContext context) {
//     return context.watch<ClientController>().isLoading
//         ? const CircularProgressIndicator()
//         : Column(
//       children: [
//         Row(
//           mainAxisAlignment: MainAxisAlignment.end,
//           children: [
//             ElevatedButton.icon(
//               style: TextButton.styleFrom(
//                 padding: EdgeInsets.symmetric(
//                   horizontal: defaultPadding,
//                   vertical: defaultPadding / (Responsive.isMobile(context) ? 2 : 1),
//                 ),
//               ),
//               onPressed: () {
//                 print("ClientListScreen > onPressed ");
//                 // context.watch<HostController>().getClients();
//                 clientController.getClients();
//               },
//               icon: const Icon(Icons.swap_horiz),
//               label: const Text("새로 고침"),
//             ),
//             const SizedBox(width: 10,),
//             ElevatedButton.icon(
//               style: TextButton.styleFrom(
//                 padding: EdgeInsets.symmetric(
//                   horizontal: defaultPadding,
//                   vertical: defaultPadding / (Responsive.isMobile(context) ? 2 : 1),
//                 ),
//               ),
//               onPressed: () {
//                 print("ClientListScreen > onPressed ");
//                 Navigator.push(context, MaterialPageRoute(builder: (context) => const ClientAdd()));
//               },
//               icon: const Icon(Icons.add),
//               label: const Text("추가"),
//             ),
//           ],
//         ),
//         ListView.builder(
//           physics: const NeverScrollableScrollPhysics(),
//           shrinkWrap: true,
//           itemCount: context.watch<ClientController>().listClients.length,
//           itemBuilder: (context, index) {
//             return ClientItem(context
//                 .watch<ClientController>()
//                 .listClients[index]);
//           }
//         ),
//       ],
//     );
//   }
// }
