import {redirect} from "next/navigation";

export default function Home({params}: any) {
  redirect('/console/dashboard');
}
