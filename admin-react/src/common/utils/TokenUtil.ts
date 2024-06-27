import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { HEADER_USER_INFO } from '@/common/constants/values';

/**
 * next-auth 로 관리되는 인증 상태를 불러오기 위한 클래스
 * 일반적으로 인증이 필요한 모든 동작은 server components 혹은 router handler 에서 처리할 것.
 */
export class TokenUtil {
	private static instance: TokenUtil
	private constructor() {}

	/**
	 * route handler 에서 next-auth 쿠키에 저장된 액세스 토큰을 가져옴
	 *
	 * 	 [주의]: server components -> router handler 로 호출하는 경우 사용 불가. getToken() 결과가 나오지 않음
	 * 	       따라서 client components -> router handler 로 호출하는 경우에만 사용.
	 *
	 * 	    @param {NextRequest} request 현재 요청의 request 객체
	 * 	    @return {Promise<string|undefined>} 현재 등록되어 있는 액세스 토큰
	 */
	public static async getTokenFromRouteHandler(request: NextRequest): Promise<string|undefined> {
		const secret = process.env.NEXTAUTH_SECRET;
		const token = await getToken({
			req: request,
			secret: secret,
			secureCookie: false,
		});
		// @ts-ignore
		if(token && token.user_info) return token.user_info.access_token.toString();
		else return undefined;
	}


	/**
	 * 1. headers.get(HEADER_USER_INFO): HEADER_USER_INFO 키를 사용해 헤더에서 인코딩된 사용자 정보를 가져와 encodedStringUserInfo 변수에 저장.
	 * 2. Null 검사: encodedStringUserInfo가 없으면 undefined를 반환. 이렇게 하면 나중에 발생할 수 있는 불필요한 작업을 피할 수 있다.
	 * 3. Buffer.from: encodedStringUserInfo를 Base64로 디코딩해 UTF-8 문자열로 변환. 이 문자열을 stringUserInfo 변수에 저장.
	 * 4. JSON.parse: 디코딩된 문자열을 JSON 객체로 변환. 여기서 예외가 발생할 수 있기 때문에, 이를 try-catch 블록으로 감싸서 에러를 처리하고, 에러가 발생하면 undefined를 반환.
	 * 5. 에러 처리: 디코딩이나 파싱 중에 오류가 발생하면 콘솔에 에러를 출력하고 undefined를 반환. 이는 예상치 못한 데이터로 인해 애플리케이션이 중단되지 않도록 하는 안전 장치.
	 * @param headers
	 */
	public static getUserInfoFromServer(headers: ReadonlyHeaders) {
		const encodedStringUserInfo = headers.get(HEADER_USER_INFO);
		if (!encodedStringUserInfo) {
			return undefined;
		}

		try {
			const stringUserInfo = Buffer.from(encodedStringUserInfo, 'base64').toString('utf-8');
			return JSON.parse(stringUserInfo);
		} catch (error) {
			console.error('Error decoding or parsing user info:', error);
			return undefined;
		}
	}

}