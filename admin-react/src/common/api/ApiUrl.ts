const WEB_SERVER_URL =
    process.env.NEXT_PUBLIC_WEB_SERVER_URL ?? 'http://localhost:3000';
const API_SERVER_URL =
    process.env.NEXT_PUBLIC_ADMIN_SERVER_URL ?? 'http://localhost:3001';

/**
 * API 호출에서 이용될 URL 주소들을 정의
 */
export class ApiUrl {
    private static instance: ApiUrl;

    private constructor() {
    }

    /**
     * 호출할 API 의 타겟 서버의 도메인 주소를 얻어 옴 (웹서버 Or 백엔드 서버)
     *
     * @param url - API 의 주소
     * @param target - web: 웹서버 (nextjs), api: 백엔드 서버
     * @return {string} 타겟 서버에 대한 API 주소
     */
    public static get(url: string, target: 'web' | 'api') {
        if (target === 'web') return `${WEB_SERVER_URL}/api${url}`;
        else if (target === 'api') return `${API_SERVER_URL}${url}`;
        return '';
    }

    // admin-login
    public static ADMIN_ADMIN_JOIN = `/admin/admin-join`; // Admin 회원가입
    public static ADMIN_ADMIN_LOGIN = `/admin/admin-login`; // Admin 회원 로그인
    public static ADMIN_ADMIN_REFRESH = `/admin/admin-refresh`; // Admin 회원 Refresh
    public static ADMIN_ADMIN_RESET_PASSWORD = `/admin/admin-reset-password`; // Admin 회원 비밀번호 변경

    public static ADMIN_LOGIN_INFO = `/admin/login-info`; // Login 정보 조회
    public static ADMIN_LOGIN_LOG = `/admin/login-log`; // Login Log 정보 조회
    public static ADMIN_MY_MENU = `/admin/my-menu`; // My Menu 정보 조회
    public static ADMIN_ALL_MENU_TYPE = `/admin/all-menu`; // 전체 Menu 정보 조회

    // A00
    public static A00_A0000000_GAME = `/A00/A0000000-Game`; // 회원 DashBoard 정보
    public static A00_A0000000_GAME_DRAW = `/A00/A0000000-GameDraw`; // DashBoard 게임 상금 정보
    public static A00_A0000000_LINE_ISSUE_DAY = `/A00/A0000000-LineIssue-Day`; // DashBoard 일별 발권 티켓 정보
    public static A00_A0000000_MEMBER_JOIN_DAY = `/A00/A0000000-MemberJoin-Day`; // DashBoard 일별 회원가입 정보

    public static A01_A0101000_LIST = `/A01/A0101000-List`; // 회원 계정 리스트 조회
    public static A01_A0101000_INFO = `/A01/A0101000-Info`; // 회원 정보 조회
    public static A01_A0101000_JOIN = `/A01/A0101000-Join`; // 회원 가입
    public static A01_A0101000_UPDATE = `/A01/A0101000-Update`; // 회원 정보 수정
    public static A01_A0101000_UPDATE_PASSWORD = `/A01/A0101000-Update-Password`; // 회원 비밀번호 수정
    public static A01_A0101000_DELETE = `/A01/A0101000-Delete`; // 회원 계정 삭제

    // A0102000 [회원 접속 관리]
    public static A01_A0102000_LIST = `/A01/A0102000-List`; // 회원 접속 리스트 조회

    // A0103000 [포인트 거래내역 관리]
    public static A01_A0103000_LIST = `/A01/A0103000-List`; // 포인트 거래내역 리스트 조회
    public static A01_A0103000_CATEGORY = `/A01/A0103000-Category`; // 포인트 카테고리 조회
    public static A01_A0103000_DEPOSIT_POINTS = `/A01/A0103000-Deposit-Points`; // 회원 포인트 입출금
    public static A01_A0103000_SEND_POINTS = `/A01/A0103000-Send-Points`; // 포인트 전송

    // A0104000 [포인트 자산관리]
    public static A01_A0104000_LIST = `/A01/A0104000-List`; // 포인트 자산관리 조회

    // A0105000 [CS 밸런스 관리]
    public static A01_A0105000_LIST = `/A01/A0105000-List`; // CS 밸런스 관리 조회
    public static A01_A0105100_LIST = `/A01/A0105100-List`; // CS 밸런스 히스토리 조회

    // A0201000 [Seller 회원 계정 관리]
    public static A02_A0201000_LIST = `/A02/A0201000-List`; // Seller 회원 계정 리스트 조회
    public static A02_A0201000_DELETE = `/A02/A0201000-Delete`; // Seller 회원 계정 삭제
    public static A02_A0201000_INFO = `/A02/A0201000-Info`; // Seller 회원 정보 조회
    public static A02_A0201000_UPDATE = `/A02/A0201000-Update`; // Seller 회원 정보 수정
    public static A02_A0201000_JOIN = `/A02/A0201000-Join`; // Seller 회원 가입
    public static A02_A0201000_UPDATE_PASSWORD = `/A02/0201000-Update-Password`; // Seller 회원 비밀번호 수정

    // A0202000 [Seller 회원 접속 관리]
    public static A02_A0202000_LIST = `/A02/A0202000-List`; // Seller 회원 접속 리스트 조회

    // A0301000 [티켓 목록]
    public static A03_A0301000_LIST = `/A03/A0301000-List`; // 티켓 목록 조회
    public static A03_A0301001_RECEIPT_INFO = `/A03/A0301001-Receipt-Info/`; // 영수증 정보 조회
    public static A03_A0301002_LINE_INFO = `/A03/A0301002-Line-Info`; // 티켓 정보 조회

    // A0302000 [티켓 거래내역]
    public static A03_A0302000_LIST = `/A03/A0302000-List`; // 티켓 거래내역 조회
    public static A03_A0302000_DETAIL = `/A03/A0302000-Detail`; // 티켓영수증 주문내역 상세 조회

    // A0303000 [티켓 발권]
    public static A03_A0303000_BUY_LINES = `/A03/A0303000-Buy-Lines`; // 티켓 발권

    // A0401000 [xxx 관리]

    // A0501000 [회차별 매출통계]
    public static A05_A0501000_LIST = `/A05/A0501000-list`; // 회차별 매출통계 조회

    // A0501001 [회차별 매출통계- 상금내역]
    public static A05_A0501001_PRIZING_INFO = `/A05/A0501001-prizing-info`; // 회차별 매출통계- 상금내역 조회

    // A0502000 [일자별 매출통계]
    public static A05_A0502000_LIST = `/A05/A0502000-list`; // 일자별 매출통계 조회

    // A0601000 [게임 정보]
    public static A06_A0601000_INFO = `/A06/A0601000-Info`; // 게임 정보 조회
    public static A06_A0601000_INFO_SAVE = `/A06/A0601000-InfoSave`; // 게임 정보 저장
    public static A06_A0601000_DRAW_RULE = `/A06/A0601000-DrawRule`; // 게임 당첨 규칙 조회
    public static A06_A0601000_RULE_SAVE = `/A06/A0601000-RuleSave`; // 게임 당첨 규칙 저장

    // A0602000 [게임 규칙 정보]
    public static A06_A0602000_INFO = `/A06/A0602000-Info`; // 게임 규칙 정보 조회
    public static A06_A0602000_RULE_SAVE = `/A06/A0602000-RuleSave`; // 게임 당첨 규칙 정보 저장

    // A0603000 [게임 회차 관리]
    public static A06_A0603000_LIST = `/A06/A0603000-List`; // 회차 리스트 조회
    public static A06_A0603000_START_GAME_DRAW = `/A06/A0603000-StartGameDraw`; // 게임 회차 시작
    public static A06_A0603000_INPUT_WINNING_NUMBER_DRAW = `/A06/A0603000-InputWinningNumberDraw`; // 게임 회차 당첨번호 입력
    public static A06_A0603000_GET_PRIZE_INFO = `/A06/A0603000-GetPrizeInfo`; // 게임 회차 상금 정보 조회
    public static A06_A0603000_CALCULATE_GAME_DRAW = `/A06/A0603000-CalculateGameDraw`; // 게임 회차 티켓 당첨 처리
    public static A06_A0603000_GET_CALCULATE_PERCENTAGE = `/A06/A0603000-GetCalcuatePercentage`; // 게임 회차 티켓 당첨 처리 진행률 조회
    public static A06_A0603000_CALCULATE_TOTAL_DRAW = `/A06/A0603000-CalculateTotalDraw`; // 게임 회차 티켓 당첨자 수 및 상금 계산
    public static A06_A0603000_UPDATE_MANAGER_PRIZE = `/A06/A0603000-UpdateManagerPrize`; // 관리자 수동 입금 상금 입력
    public static A06_A0603000_EXIT_GAME_DRAW = `/A06/A0603000-ExitGameDraw`; // 게임 회차 마감

    // A0801000 [게시판 관리]
    public static A07_A0701000_LIST = `/A07/A0701000-List`; // 게시판 리스트 조회
    public static A07_A0701000_ADD = `/A07/A0701000-Add`; // 게시판 추가
    public static A07_A0701000_UPDATE = `/A07/A0701000-Update`; // 게시판 내용 수정
    public static A07_A0701000_DELETE = `/A07/A0701000-Delete`; // 게시판 삭제

    // A0702000 [게시판 내용 관리]
    public static A07_A0702000_LIST = `/A07/A0702000-List`; // 게시판 내용 리스트 조회
    public static A07_A0702000_INFO = `/A07/A0702000-Info`; // 게시판 내용 조회
    public static A07_A0702000_REPLY_LIST = `/A07/A0702000-RepLy-List`; // 게시판 내용 댓글 조회
    public static A07_A0702000_ADD = `/A07/A0702000-Add`; // 게시판 내용 추가
    public static A07_A0702000_UPDATE = `/A07/A0702000-Update`; // 게시판 내용 수정
    public static A07_A0702000_DELETE = `/A07/A0702000-Delete`; // 게시판 내용 삭제
    public static A07_A0702000_REPLY_ADD = `/A07/A0702000-Reply-Add`; // 게시판 댓글 내용 추가
    public static A07_A0702000_REPLY_UPDATE = `/A07/A0702000-Reply-Update`; // 게시판 댓글 내용 수정
    public static A07_A0702000_REPLY_DELETE = `/A07/A0702000-Reply-Delete`; // 게시판 댓글 내용 삭제

    // A0801000 [메세지 관리]
    public static A08_A0801000_LIST = `/A08/A0801000-List`; // 메시지 리스트 조회
    public static A08_A0801000_CATEGORY = `/A08/A0801000-Category`; // 메시지 카테고리 조회
    public static A08_A0801000_INFO = `/A08/A0801000-Info`; // 메시지 정보 조회
    public static A08_A0801000_UPDATE_MESSAGE = `/A08/A0801000-Update-Message`; // 메시지 수정
    public static A08_A0801000_UPDATE_READED = `/A08/A0801000-Update-Readed`; // 메시지 읽음 처리/비처리
    public static A08_A0801000_DELETE = `/A08/A0801000-Delete`; // 메시지 삭제
    public static A08_A0801000_SEND_MESSAGE = `/A08/A0801000-Send-Message`; // 메시지 전송

    // A0802000 [FAQ 문의]
    public static A08_A0802000_CATEGORY = `/A08/A0802000-Category`; // FAQ 카테고리 조회
    public static A08_A0802000_LIST = `/A08/A0802000-List`; // FAQ 문의 목록 조회
    public static A08_A0802000_INFO = `/A08/A0802000-Info`; // FAQ 문의 항목 조회
    public static A08_A0802000_SAVE = `/A08/A0802000-Save`; // FAQ 문의사항 생성
    public static A08_A0802000_UPDATE = `/A08/A0802000-Update`; // FAQ 문의사항 수정
    public static A08_A0802000_DELETE = `/A08/A0802000-Delete`; // FAQ 문의사항 삭제

    // A0803000 [1:1 문의]
    public static A08_A0803000_CATEGORY = `/A08/A0803000-Category`; // 1:1 문의 카테고리 조회
    public static A08_A0803000_LIST = `/A08/A0803000-List`; // 1:1 문의 목록 조회
    public static A08_A0803000_INFO = `/A08/A0803000-Info`; // 1:1 문의 항목 조회
    public static A08_A0803000_SAVE = `/A08/A0803000-Save`; // 1:1 문의 답변 작성
    public static A08_A0803000_DELETE = `/A08/A0803000-Delete`; // 1:1 문의사항 삭제

    // A0804000 [FCM Token 관리]
    public static A08_A0804000_LIST = `/A08/A0804000-List`; // FCM token 리스트 관리
    public static A08_A0804000_SEND_FCM_MESSAGE = `/A08/A0804000-Send-Fcm-Message`; // FCM 메시지 전송
    public static A08_A0804000_SEND_FCM_MESSAGE_TOPIC = `/A08/A0804000-Send-Fcm-Message-Topic`; // fcm 메시지 전송 [Topic]
    public static A08_A0804000_DELETE = `/A08/A0804000-Delete`; // FCM Token 삭제

    // A0805000 [FCM 메시지 관리]
    public static A08_A0805000_LIST = `/A08/A0805000-List`; // FCM 메시지 리스트 관리
    public static A08_A0805000_INFO = `/A08/A0805000-Info`; // FCM 메시지 항목 조회
    public static A08_A0805000_UPDATE = `/A08/A0805000-Update`; // FCM 메시지 수정
    public static A08_A0805000_SEND_MESSAGE = `/A08/A0805000-Send-Message`; // FCM 메시지 전송
    public static A08_A0805000_DELETE = `/A08/A0805000-Delete`; // FCM 메시지 삭제

    // A0901000 [Admin 회원 계정 관리]
    public static A09_A0901000_LIST = `/A09/A0901000-List`; // Admin 리스트 조회
    public static A09_A0901000_ADMIN_INFO = `/A09/A0901000-Admin-Info`; // Admin 회원 정보 조회
    public static A09_A0901000_ADMIN_JOIN = `/A09/A0901000-Admin-Join`; // Admin 회원 가입
    public static A09_A0901000_ADMIN_MODIFY = `/A09/A0901000-Admin-Modify`; // Admin 회원 정보 수정
    public static A09_A0901000_ADMIN_MODIFY_PASSWORD = `/A09/A0901000-Admin-Modify-Password`; // Admin 회원 비밀번호 수정
    public static A09_A0901000_ADMIN_DELETE = `/A09/A0901000-Admin-Delete`; // Admin 회원 계정 삭제

    // A0902000 [Admin 회원 접속관리]
    public static A09_A0902000_LIST = `/A09/A0902000-List`; // Admin 접속 로그 조회

    // A0903000 [Admin 회원 권한관리]
    public static A09_A0903000_LIST = `/A09/A0903000-List`; // Admin 리스트 조회
    public static A09_A0903001_ROLE_LIST = `/A09/A0903001-Role-List`; // Admin 권한 리스트 조회
    public static A09_A0903000_ROLE_SAVE = `/A09/A0903000-Role-Save`; // Admin 권한 저장
    public static A09_A0903000_ROLE_DELETE = `/A09/A0903000-Role-Delete`; // 권한 정보 삭제

    // A0904000 [메뉴코드관리]
    public static A09_A0904000_LIST = `/A09/A0904000-List`; // 메뉴 정보 리스트 조회
    public static A09_A0904000_SAVE = `/A09/A0904000-Save`; // 메뉴 추가/수정
    public static A09_A0904000_DELETE = `/A09/A0904000-Delete`; // 메뉴 정보 삭제

    // A0905000 [일반코드관리]
    public static A09_A0905000_LIST = `/A09/A0905000-List`; // 코드 정보 리스트 조회
    public static A09_A0905000_SAVE = `/A09/A0905000-Save`; // 코드 추가/수정
    public static A09_A0905000_DELETE = `/A09/A0905000-Delete`; // 코드 정보 삭제
    public static A09_A0905001_ITEM = `/A09/A0905001-Item`; // 코드 항목 정보
    public static A09_A0905000_INDEX_LIST = `/A09/A0905000-Index_List`; // 코드 인덱스 리스트

    // Test Functions
    public static TEST = `/test`;
    public static TEST_BUY_TICKETS_WITH_TEST = `/test/buyTicketsWithTest`;
}
