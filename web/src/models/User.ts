import { RemoteUser } from '../services/types';

export default class User {
    private readonly _email?: string;
    private readonly _refreshToken: string;
    private readonly _accessToken: string;
    private readonly _firstName?: string;
    private readonly _lastName?: string;
    private readonly _fullName?: string;
    private readonly _emailVerified?: boolean;
    private readonly _kycVerified?: boolean;
    private readonly _memberId?: string;
    private readonly _memberType?: string;
    private readonly _memberIdx?: number;
    private readonly _accessTokenExpire?: string;

    private readonly _refreshTokenExpire?: string;
    constructor(remoteUser: Partial<RemoteUser>) {
        this._email = remoteUser.member_email;
        this._fullName = remoteUser.member_name;
        this._emailVerified = remoteUser.emailVerified;
        this._kycVerified = remoteUser.kycVerified;
        this._memberId = remoteUser.member_id;
        this._memberType = remoteUser.member_type;
        this._memberIdx = remoteUser.member_idx;
        this._accessToken = remoteUser.access_token as string;
        this._accessTokenExpire = remoteUser.access_token_expire;
        this._refreshToken = remoteUser.refresh_token as string;
        this._refreshTokenExpire = remoteUser.refresh_token_expire;
    }

    get email() {
        return this._email;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get fullName() {
        return this._fullName;
    }

    get emailVerified() {
        return this._emailVerified;
    }

    get kycVerified() {
        return this._kycVerified;
    }

    get memberId() {
        return this._memberId;
    }

    get memberType() {
        return this._memberType;
    }

    get memberIdx() {
        return this._memberIdx;
    }

    get accessToken() {
        return this._accessToken;
    }

    get accessTokenExpire() {
        return this._accessTokenExpire;
    }

    get refreshToken() {
        return this._refreshToken;
    }

    get refreshTokenExpire() {
        return this._refreshTokenExpire;
    }
}
