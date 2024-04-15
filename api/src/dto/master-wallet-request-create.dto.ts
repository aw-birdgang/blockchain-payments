import {IsNotEmpty, IsString, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class MasterWalletRequestCreateDto {
    @IsNotEmpty({ message: '클라이언트 아이디(clientId)은 필수값 입니다.' })
    @IsString({ message: '클라이언트 아이디(clientId)의 형식이 올바르지 않습니다.' })
    @Length(1, 50)
    @ApiProperty({ description: '클라이언트 아이디' })
    clientId: string;

}
