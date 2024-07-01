import { RemoteAnnouncement } from './RemoteAnnouncement';

export class Announcement {
    private readonly _rowNum: string;
    private readonly _boardId: string;
    private readonly _boardIdx: string;
    private readonly _boardSubidx: number;
    private readonly _boardSubject: string;
    private readonly _notice: string;
    private readonly _memberType: string;
    private readonly _memberIdx: string;
    private readonly _memberEmail: string;
    private readonly _memberName: string;
    private readonly _hit: number;
    private readonly _useTag: string;
    private readonly _createdAt: Date;

    constructor(remoteAnnouncement: RemoteAnnouncement) {
        this._rowNum = remoteAnnouncement.row_num;
        this._boardId = remoteAnnouncement.board_id;
        this._boardIdx = remoteAnnouncement.board_idx;
        this._boardSubidx = remoteAnnouncement.board_subidx;
        this._boardSubject = remoteAnnouncement.board_subject;
        this._notice = remoteAnnouncement.notice;
        this._memberType = remoteAnnouncement.member_type;
        this._memberIdx = remoteAnnouncement.member_idx;
        this._memberEmail = remoteAnnouncement.member_email;
        this._memberName = remoteAnnouncement.member_name;
        this._hit = remoteAnnouncement.hit;
        this._useTag = remoteAnnouncement.use_tag;
        this._createdAt = new Date(remoteAnnouncement.created_at);
    }

    get rowNum(): string {
        return this._rowNum;
    }

    get boardId(): string {
        return this._boardId;
    }

    get boardIdx(): string {
        return this._boardIdx;
    }

    get boardSubidx(): number {
        return this._boardSubidx;
    }

    get boardSubject(): string {
        return this._boardSubject;
    }

    get notice(): string {
        return this._notice;
    }

    get memberType(): string {
        return this._memberType;
    }

    get memberIdx(): string {
        return this._memberIdx;
    }

    get memberEmail(): string {
        return this._memberEmail;
    }

    get memberName(): string {
        return this._memberName;
    }

    get hit(): number {
        return this._hit;
    }

    get useTag(): string {
        return this._useTag;
    }

    get createdAt(): Date {
        return this._createdAt;
    }
}
