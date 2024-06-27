export class Icons {
	private static instance: Icons
	private constructor() {
	}

	public static default =
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-4 h-4">
			<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 2.091 0L21.75 12M4.5 9.75v10.125c0 .622.004 1.125 1.125 1.125H9.75v-4.875c0-.622.004-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
		</svg>

	public static none =
		<div>-</div>
}