// 날짜 관련 유틸리티 함수들

/**
 * 주어진 날짜 객체를 "YYYY-MM-DD" 형식의 문자열로 변환합니다.
 * @param date 변환할 날짜 객체
 * @returns 변환된 날짜 문자열
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 현재 날짜와 시간을 "YYYY-MM-DD HH:mm:ss" 형식의 문자열로 반환합니다.
 * @returns 변환된 날짜 시간 문자열
 */
export function getCurrentDateTime(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
