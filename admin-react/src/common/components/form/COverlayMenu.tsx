'use client'

import React from "react";
import {Button, Menu, MenuHandler, MenuItem, MenuList} from "@material-tailwind/react";

interface IOverlayMenu {
}

export default function COverlayMenu(props: IOverlayMenu) {
	return (
		<Menu>
			<MenuHandler>
				<Button placeholder={''}>Menu</Button>
			</MenuHandler>
			<MenuList placeholder={''}>
				<MenuItem placeholder={''}>Menu Item 1</MenuItem>
				<MenuItem placeholder={''}>Menu Item 2</MenuItem>
				<MenuItem placeholder={''}>Menu Item 3</MenuItem>
			</MenuList>
		</Menu>
	)
}