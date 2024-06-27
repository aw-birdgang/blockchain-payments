import { ITableColumn } from '@/common/models/interfaces';
import { DataResponse } from '@/common/api/BaseHttp';

/**
 * 공통 지연 함수
 *
 * @param {number} ms 지연될 ms 시간
 */
export async function delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * react-datatables 라이브러리의 데이터 리스트를 입력받아 드롭다운 형식의 데이터로 변경 (필터 생성용)
 *
 * @param {ITableColumn[]} columnList react-datatables 데이터 리스트
 */
export function convertFilterListToDropdown(columnList: ITableColumn[] = []): { id: string; name: string; value: string }[] {
    return columnList.map((col) => ({
        id: col.id,
        name: col.name,
        value: col.name,
    }));
}


/**
 * 오브젝트를 입력받아 해당 오브젝트의 값이 올바른지 확인합니다. (null|undefined|'' 여부 확인)
 *
 * @param obj 오브젝트 (객체)
 */
export function checkValidation<T>(obj: T): boolean {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
                return false;
            }
        }
    }
    return true;
}

/**
 * 오브젝트를 입력받아 값에 null|undefined|'' 가 포함되어 있으면 해당 키/밸류를 제거한 새 오브젝트를 출력합니다.
 *
 * @param obj
 */
export function validateObject<T>(obj: T): Object {
    const newObject: any = {};
    for (const key in obj) {
        if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
            newObject[key] = obj[key];
        }
    }
    return newObject;
}

/**
 * 시간까지 함께 출력하는 테스트용 log 함수
 *
 * @param {string} message 메세지
 * @param {any} value
 */
export function log(message: string, value?: any) {
    if (process.env.SHOW_LOG) {
        const date = new Date();
        const currentTime = `${date.getHours()}:${date.getMonth()}:${date.getDate()}.${date.getMilliseconds().toString().slice(0, 3)}`;
        console.log(`[${currentTime}] ${message}`, value);
    }
}

/**
 * 서버에서 가져온 리스트 데이터에 index 값을 직접 주입합니다. (리스트의 순번 확인시 필요)
 *
 * @param data 원본 응답 데이터
 */
export function insertIndexIntoList(data: DataResponse<any[]>) {
    if (!data || !data.data || data.error) return data;
    for (let i = 0; i < data.data.length; i++) {
        data.data[i].index = i + 1;
    }
    return data;
}

/**
 * "2024-4-23" 와 같은 형태로 이루어져 있는 날짜 문자열을 Date 타입으로 변환
 *
 * @param {string} dateString "2024-4-23" 형식의 날짜 문자열
 */
export function parseDateString(dateString: string): Date | undefined {
    try {
        const parts = dateString.split('-').map(part => parseInt(part));
        if (parts.length !== 3) {
            return undefined;
        }
        const [year, month, day] = parts;
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            return undefined;
        }
        return new Date(year, month - 1, day);
    } catch (e) {
        return undefined;
    }
}

/**
 * API 요청에 대한 에러 응답이 발생했을 경우 응답에 맞춰서 alert 메세지를 출력합니다.
 * (디폴트 값은 lang.message_update_failed)
 * @param res API 응답
 * @param lang 언어 셋 데이터
 */
export function showErrorMessage(res: DataResponse<any>, lang: any) {
    const message = res.error ?
        res.error.errorMessage ? res.error.errorMessage :
            res.error.message ? res.error.message :
                lang && lang.message_update_failed ? lang.message_update_failed :
                    undefined : undefined;
    if (message) alert(message);
}