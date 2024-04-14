import {IsNotEmpty, IsString, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class MasterWalletRequestCreateDto {
    @IsNotEmpty({ message: '코드(code)은 필수값 입니다.' })
    @IsString({ message: '코드(code)의 형식이 올바르지 않습니다.' })
    @Length(1, 50)
    @ApiProperty({ description: '코드' })
    code: string;

    @IsNotEmpty({ message: '네트 워크(network)은 필수값 입니다.' })
    @IsString({ message: '네트 워크(network)의 형식이 올바르지 않습니다.' })
    @Length(1, 50)
    @ApiProperty({ description: '네트 워크' })
    network: string;
}
