import {IsNotEmpty, IsString, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ClientRequestCreateDto {
    @IsNotEmpty({ message: '이름(name)은 필수값 입니다.' })
    @IsString({ message: '이름(name)의 형식이 올바르지 않습니다.' })
    @Length(1, 50)
    @ApiProperty({ description: '이름' })
    name: string;

    @IsNotEmpty({ message: '웹 훅 주소(webhookUrl)은 필수값 입니다.' })
    @IsString({ message: '웹 훅 주소(webhookUrl)의 형식이 올바르지 않습니다.' })
    @Length(1, 50)
    @ApiProperty({ description: '웹 훅 주소' })
    webhookUrl: string;
}
