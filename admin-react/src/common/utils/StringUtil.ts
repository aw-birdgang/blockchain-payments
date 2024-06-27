export class StringUtil {
	private static instance: StringUtil
	private constructor() {}

	/**
	 * 해당 문자열이 공백/undefined/null 인지 판별합니다.
	 *
	 * 		@param      {string} str 확인할 문자열
	 * 	    @return     {boolean} 공백이면 true, 문자가 있다면 false
	 */
	public static isBlank(str?: string) {
		return str === "" || str === undefined || str === null;
	}

	/**
	 * 해당 문자열이 공백/undefined/null 인지 판별합니다.
	 *
	 * 		@param      {string} str 확인할 문자열
	 * 	    @return     {boolean} 문자가 있다면 true, 공백이면 false
	 */
	public static isNotBlank(str?: string) {
		return !this.isBlank(str);
	}


	/**
	 * url 문자열로부터 쿼리 정보를 가져옵니다.
	 *
	 * 	    @author     daniel
	 * 		@param      {string} url 확인할 문자열
	 * 	    @return     {Record<string, string> key: 쿼리스트링의 키, value: 쿼리스트링의 값
	 */
	public static parseQueryString(url: string): Record<string, string> {
		const queryString = url.split('?')[1];
		if (!queryString) {
			return {};
		}

		const params = queryString.split('&');
		const queryParams: Record<string, string> = {};

		params.forEach(param => {
			const [key, value] = param.split('=');
			queryParams[key] = decodeURIComponent(value);
		});

		return queryParams;
	}

	/**
	 * url 문자열에 쿼리 정보를 추가합니다.
	 *
	 * 	    @author     daniel
	 * 		@param      {string} url 기본 url
	 * 	    @return     {string} 쿼리 정보가 포함된 새로운 url
	 */
	public static appendQueryParams(url: string, params: { [key: string]: any } = {}): string {
		const queryParams = Object.keys(params)
			.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
			.join('&');

		if (queryParams) {
			return `${url}${url.includes('?') ? '&' : '?'}${queryParams}`;
		}

		return url;
	}

	/**
	 * 텍스트가 공백/undefined/null 인지 판별하고, 비었다면 '-' 문자로 대체합니다.
	 *
	 * 	    @author     daniel
	 * 		@param      {string} text 판별할 문자열
	 * 	    @return     {string} 빈 문자열이 아니라면 그대로 출력, 아니라면 '-' 출력
	 */

	public static checkEmptyText(text?: string): string {
		if(this.isBlank(text)) return '-';
		else { // @ts-ignore
			return text;
		}
	}
}