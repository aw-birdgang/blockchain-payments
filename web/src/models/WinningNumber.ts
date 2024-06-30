import { RemoteWinningNumbers } from '../services/types';

export class WinningNumber {
    private _drawIdx: string;
    private _winningDate: Date | null;
    private _winningNumber: string;
    private _bonusNumber: string;
    private _prizingConfirmDate: Date;
    private _prizingStartDate: Date;
    private _prizingEndDate: Date;
    private _drawStartDate: Date;
    private _drawEndDate: Date;

    constructor(remoteWinningNumbers: RemoteWinningNumbers) {
        this._drawIdx = remoteWinningNumbers.draw_idx;
        this._winningDate = remoteWinningNumbers.winning_date
            ? new Date(remoteWinningNumbers.winning_date)
            : null;
        this._winningNumber = remoteWinningNumbers.winning_number;
        this._bonusNumber = remoteWinningNumbers.bonus_number;
        this._prizingConfirmDate = new Date(remoteWinningNumbers.prizing_confirm_date);
        this._prizingStartDate = new Date(remoteWinningNumbers.prizing_start_date);
        this._prizingEndDate = new Date(remoteWinningNumbers.prizing_end_date);
        this._drawStartDate = new Date(remoteWinningNumbers.draw_start_date);
        this._drawEndDate = new Date(remoteWinningNumbers.draw_end_date);
    }

    get drawIdx(): string {
        return this._drawIdx;
    }

    get winningDate(): Date | null {
        return this._winningDate;
    }

    get winningNumber(): number[] {
        return this._winningNumber.split('|').map(Number);
    }

    get bonusNumber(): string {
        return this._bonusNumber;
    }

    get prizingConfirmDate(): Date {
        return this._prizingConfirmDate;
    }

    get prizingStartDate(): Date {
        return this._prizingStartDate;
    }

    get prizingEndDate(): Date {
        return this._prizingEndDate;
    }

    get drawStartDate(): Date {
        return this._drawStartDate;
    }

    get drawEndDate(): Date {
        return this._drawEndDate;
    }
}
