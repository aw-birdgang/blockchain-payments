import {redirect} from "next/navigation";
import {MenuUrl} from "@/common/constants/MenuUrl";

export default function Home() {
  redirect(MenuUrl.CONSOLE_DASHBOARD)
}
