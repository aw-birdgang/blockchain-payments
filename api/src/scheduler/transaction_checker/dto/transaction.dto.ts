export class TransactionDto {
    txhash: string;
    from_address: string;
    to_address: string;
    block_number: number;
    coin: string;
    amounts: number;
    clientId: string;
    blkhash: string;
    is_sended: string;
    webhook_count: number;
    webhook_success: string;
    created_at: Date;
    updated_at: Date;
}
