import {IsNotEmpty, IsString, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ClientRequestCreateDto {
    @IsNotEmpty({ message: '코드(code)은 필수값 입니다.' })
    @IsString({ message: '코드(code)의 형식이 올바르지 않습니다.' })
    @Length(1, 50)
    @ApiProperty({ description: '코드' })
    code: string;

    @IsNotEmpty({ message: '이름(name)은 필수값 입니다.' })
    @IsString({ message: '이름(name)의 형식이 올바르지 않습니다.' })
    @Length(1, 50)
    @ApiProperty({ description: '이름' })
    name: string;
}
