import 'package:flutter/material.dart';
import 'package:flutter_switch/flutter_switch.dart';

import '../../../components/default_text_info_row.dart';
import '../../../models/client.dart';
import '../../../shard/constants.dart';
import '../../../shard/utils.dart';

class ClientItem extends StatefulWidget {
  ClientItem(this.client, {Key? key}) : super(key: key);
  Client client;
  @override
  State<ClientItem> createState() => _ClientItemState();
}

class _ClientItemState extends State<ClientItem> {
  bool status = true;

  @override
  Widget build(BuildContext context) {
    Size size = Utils.getscreensize(context);
    String name = widget.client.name!;
    String accessToken = widget.client.accessToken!;
    String webhookUrl = widget.client.webhookUrl!;
    return Container(
      margin: EdgeInsets.only(bottom: 8.0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8.0),
        color: Colors.white.withOpacity(0.05),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(8),
        onTap: () async {
          print("HostItem > onTap ");
        },
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            contentHeaderView(),
            contentView(),
            const Divider(thickness: 2,),
            flutterSwitch(),
          ],
        ),
      ),
    );
  }

  Widget contentHeaderView () {
    return Stack(
      alignment: AlignmentDirectional.topEnd,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Container(),
            ),
          ],
        ),
        PopupMenuButton(
            icon: const Icon(
              Icons.more_vert_rounded,
              color: whiteColor,
            ),
            color: secondaryColor,
            itemBuilder: (context) => [
              PopupMenuItem(
                onTap: () {},
                child: const Text('Edit'),
                value: 1,
              ),
              PopupMenuItem(
                onTap: () {},
                child: const Text(
                  'Delete',
                  style: TextStyle(color: Colors.red),
                ),
                value: 2,
              ),
            ]
        ),
      ],
    );
  }

  Widget contentView () {
    String name = widget.client.name!;
    String accessToken = widget.client.accessToken!;
    String webhookUrl = widget.client.webhookUrl!;
    return Padding(
      padding: const EdgeInsets.all(defaultPadding),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          getTextInfoRow(context, "NAME", name),
          const SizedBox(
            height: 5,
          ),
          getTextInfoRow(context, "ACCESS TOKEN", accessToken),
          const SizedBox(
            height: 5,
          ),
          getTextInfoRow(context, "WEBHOOK URL", webhookUrl)
        ],
      ),
    );
  }

  Widget flutterSwitch () {
    return Padding(
      padding: const EdgeInsets.all(defaultPadding),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FlutterSwitch(
            value: status,
            onToggle: (val) {
              setState(() {
                status = val;
              });
            },
          ),
        ],
      ),
    );
  }

}
