import 'package:flutter/material.dart';

import '../../shard/constants.dart';
import '../../shard/responsive.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              flex: 5,
              child: Column(
                children: [
                  const SizedBox(height: defaultPadding),
                  !Responsive.isMobile(context) ? const Row(
                    children: [
                      SizedBox(width: defaultPadding),
                    ],
                  ) : const Column(
                    children: [
                      SizedBox(
                        height: defaultPadding,
                      ),
                    ],
                  ),
                ],
              ),
            ),
            if (!Responsive.isMobile(context))
              const SizedBox(width: defaultPadding),
          ],
        )
      ],
    );
  }
}
