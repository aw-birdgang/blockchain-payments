import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../components/default_text_form.dart';
import '../../../controllers/menu_controller.dart';
import '../../../controllers/auth_controller.dart';
import '../../../models/user_model.dart';
import '../../../shard/helper/prefer_helper.dart';

class LoginForm extends StatelessWidget {
  var text_emailcontroller = TextEditingController();
  var text_passwordcontroller = TextEditingController();
  final GlobalKey<FormState> _formkey = GlobalKey<FormState>();

  LoginForm({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formkey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            "Login Screen",
            style: TextStyle(fontSize: 30),
          ),
          const SizedBox(
            height: 40,
          ),
          defaultTextFormField(
            controller: text_emailcontroller,
            inputType: TextInputType.emailAddress,
            hintText: "Email",
            onValidate: (value) {
              if (value!.isEmpty) return "email must not be empty";
              return null;
            },
          ),
          const SizedBox(
            height: 10,
          ),
          Consumer<AuthController>(builder: (context, authcontroller, child) {
            return defaultTextFormField(
              suffixIcon: InkWell(
                child: Icon(
                  authcontroller.showPassword ? Icons.visibility : Icons.visibility_off,
                ),
                onTap: () {
                  authcontroller.onChangePasswordVisibility();
                },
              ),
              obscure: authcontroller.isShowPassword(),
              controller: text_passwordcontroller,
              inputType: TextInputType.text,
              hintText: "Password",
              onValidate: (value) {
                if (value!.isEmpty) return "password must not be empty";
                return null;
              },
            );
          }),
          const SizedBox(
            height: 30,
          ),
          context.watch<AuthController>().isloadingSignIn
              ? const CircularProgressIndicator()
              : DefaultButton(
              text: "Sign In",
              height: 50,
              onPressed: () async {
                if (_formkey.currentState!.validate()) {
                  String email = text_emailcontroller.text.trim();
                  String password = text_passwordcontroller.text.toString();
                  UserModel? userModel = await context.read<AuthController>().signIn(email, password);
                  if (userModel != null) {
                    text_emailcontroller.clear();
                    text_passwordcontroller.clear();
                    PreferHelper.setUserId(userModel.userId!);
                    PreferHelper.setEmail(email);
                    PreferHelper.setPassword(password);
                    print("sign in successfully > userModel.userId : " + userModel.userId.toString());
                    context.read<MenuController>().buildMenu();
                  }
                }
              }),
        ],
      ),
    );
  }
}