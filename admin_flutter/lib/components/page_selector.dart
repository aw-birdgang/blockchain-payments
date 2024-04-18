import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../providers/type/paging_list_provider.dart';

class PageSelector extends StatelessWidget {
  PagingListProvider parentListProvider;
  PageSelector(this.parentListProvider, {
    Key? key
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60.0,
      child: _selectorWidget(),
    );
  }

  Widget _selectorWidget() {
    return Row(
      children: [
        _leftButton(),
        _pageTextField(),
        Text("/", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),),
        _totalPageWidget(),
        _rightButton(),
      ],
    );
  }

  Widget _leftButton() {
    return InkWell(
        onTap: () {
          parentListProvider.onForwardClicked();
        },
        child: Container(
          width: 48.0, height: 48.0,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8.0),
            color: Colors.white.withOpacity(0.05),
          ),
          alignment: Alignment.center,
          child: Icon(Icons.arrow_back_ios_new, color: Colors.white, size: 24.0),
        )
    );
  }

  Widget _rightButton() {
    return InkWell(
        onTap: () {
          parentListProvider.onBackwardClicked();
        },
        child: Container(
          width: 48.0, height: 48.0,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8.0),
            color: Colors.white.withOpacity(0.05),
          ),
          alignment: Alignment.center,
          child: Icon(Icons.arrow_forward_ios, color: Colors.white, size: 24.0),
        )
    );
  }

  Widget _totalPageWidget() {
    return Container(
      width: 60.0, height: 48.0,
      alignment: Alignment.center,
      margin: EdgeInsets.only(right: 8.0),
      child: parentListProvider.currentPage != 0 ? Text("${parentListProvider.getPageRange()}", style: TextStyle(
        color: Colors.white, fontWeight: FontWeight.bold,
      )) : Container(),
    );
  }
  Widget _pageTextField() {
    return Container(
      width: 60.0, height: 48.0,
      margin: EdgeInsets.only(left: 8.0, right: 8.0),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: TextField(
        controller: parentListProvider.pageController,
        inputFormatters: [
          FilteringTextInputFormatter.digitsOnly
        ],
        decoration: InputDecoration(
          border: InputBorder.none,
        ),
        textAlign: TextAlign.center,
        onChanged: (str) {
          int page = int.parse(str);
          if(page < 1 || page > parentListProvider.getPageRange()) {
            parentListProvider.pageController.text = "1";
            parentListProvider.notify();
            return;
          }
        },
        onSubmitted: (str) {
          int page = int.parse(str);
          parentListProvider.onPageChanged(page);
        },
      ),
    );
  }
}