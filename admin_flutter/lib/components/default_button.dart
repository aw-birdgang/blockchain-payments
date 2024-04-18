import 'package:flutter/material.dart';

@immutable
class DefaultButton extends StatelessWidget {
  late double width;
  late Color background;
  late VoidCallback? onPressed;
  late String text;
  late double radius;
  late double height;
  late LinearGradient? gradient;
  late bool isUppercase;

  DefaultButton({
    this.width = double.infinity,
    this.background = Colors.blue,
    this.onPressed,
    required this.text,
    this.radius = 0,
    this.height = 40,
    this.gradient,
    this.isUppercase  = false,
    Key? key
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(radius),
          color: background,
          gradient: gradient),
      child: MaterialButton(
        height: height,
        onPressed: onPressed,
        child: Text(
          (isUppercase != null && isUppercase) ? text.toUpperCase() : text,
          style: const TextStyle(
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}