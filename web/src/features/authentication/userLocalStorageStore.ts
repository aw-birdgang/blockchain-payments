import { USER_LOCAL_STORAGE_KEY } from '../../utils/constants';
import { TokenInfo } from './types';

export function saveUser(tokenInfo: TokenInfo): void {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(tokenInfo));
}

export function getUser(): TokenInfo | undefined {
    const tokenInfo = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    return tokenInfo ? JSON.parse(tokenInfo) : undefined;
}

export function removeUser(): void {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}
