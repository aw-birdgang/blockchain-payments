import NextAuth from "next-auth";

/**
 * next-auth 인증 정보의 타입에 대한 인터페이스
 * 정의하지 않으면 session 정보를 불러왔을 때, Typescript 에서 세션 데이터에 대한 타입을 감지하지 못함
 * reference: [https://next-auth.js.org/getting-started/typescript#module-augmentation]
 */
declare module "next-auth" {
	interface Session {
		user: {
			id: string
			email: string
			created_at: string
			member_address: string
			member_contact: string
			member_email: string
			member_id: string
			member_idx: string
			member_name: string
			member_type: string
			access_token: string
			access_token_expire: string
			refresh_token: string
			username: string
			isMaster: string
		};
	}
}