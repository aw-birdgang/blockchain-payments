import {redirect} from "next/navigation";
import {MenuUrl} from "@/common/constants/MenuUrl";

export default function CBasicPageLogout({ logout }: {
	logout: boolean
}) {
	if(logout) redirect(MenuUrl.LOGIN)
	return <div></div>
}