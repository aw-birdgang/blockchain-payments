import { RemoteDrawVideo } from '../services/types';

export class DrawVideo {
    private readonly _drawVideoIdx: string;
    private readonly _drawVideoUrl: string;
    private readonly _drawIdx: string;
    private readonly _winningDate: Date | null;

    constructor(remoteDrawVideo: RemoteDrawVideo) {
        this._drawVideoIdx = remoteDrawVideo.draw_video_idx;
        this._drawVideoUrl = remoteDrawVideo.draw_video_url;
        this._drawIdx = remoteDrawVideo.draw_idx;
        this._winningDate = remoteDrawVideo.winning_date
            ? new Date(remoteDrawVideo.winning_date)
            : null;
    }

    get drawVideoIdx(): string {
        return this._drawVideoIdx;
    }

    get drawVideoUrl(): string {
        return this._drawVideoUrl;
    }

    get drawIdx(): string {
        return this._drawIdx;
    }

    get winningDate(): Date | null {
        return this._winningDate;
    }
}
