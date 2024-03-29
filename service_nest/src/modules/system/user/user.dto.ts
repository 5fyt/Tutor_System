import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { isEmpty } from 'lodash';
import { PageOptionsDto } from 'src/common/dto/page.dto';

export class UpdateUserInfoDto {
  @ApiProperty({
    description: '用户姓名',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    required: false,
    description: '用户邮箱',
  })
  @IsEmail()
  @ValidateIf((o) => !isEmpty(o.email))
  email: string;

  @ApiProperty({
    description: '登录账号',
  })
  @IsString()
  @Matches(/^[a-z0-9A-Z]+$/)
  @MinLength(6)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: '归属角色',
    type: [Number],
  })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  roles: number[];

  @ApiProperty({
    required: false,
    description: '用户手机号',
  })
  @IsString()
  @IsOptional()
  phone: string;
}

export class UpdatePasswordDto {
  @ApiProperty({
    description: '更改前的密码',
  })
  @IsString()
  @MinLength(6)
  @Matches(/^[a-z0-9A-Z`~!#%^&*=+\\|{};:'\\",<>/?]+$/)
  originPassword: string;

  @ApiProperty({
    description: '更改后的密码',
  })
  @MinLength(6)
  @Matches(/^[a-z0-9A-Z`~!#%^&*=+\\|{};:'\\",<>/?]+$/)
  newPassword: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: '用户姓名',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: '登录账号',
  })
  @IsString()
  @Matches(/^[a-z0-9A-Z]+$/)
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: '归属角色',
    type: [Number],
  })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  roles: number[];

  @ApiProperty({
    required: false,
    description: '邮箱',
  })
  @IsEmail()
  @ValidateIf((o) => !isEmpty(o.email))
  email: string;

  @ApiProperty({
    required: false,
    description: '手机号',
  })
  @IsString()
  @IsOptional()
  phone: string;
}

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({
    description: '用户ID',
  })
  @IsInt()
  @Min(0)
  id: number;

  @ApiProperty({
    description: '登录密码',
  })
  @IsString()
  @Matches(/^(?=.*\d).{6,}$/)
  @MinLength(6)
  password: string;
}
export class UpdateAccountDto {
  @ApiProperty({
    description: '用户ID',
  })
  @IsInt()
  @Min(0)
  id: number;

  @ApiProperty({
    description: '用户姓名',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: '登录账号',
  })
  @IsString()
  @Matches(/^[a-z0-9A-Z]+$/)
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    required: false,
    description: '邮箱',
  })
  @IsEmail()
  @ValidateIf((o) => !isEmpty(o.email))
  email: string;

  @ApiProperty({
    required: false,
    description: '手机号',
  })
  @IsString()
  @IsOptional()
  phone: string;
}
export class InfoUserDto {
  @ApiProperty({
    description: '用户ID',
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  userId: number;
}

export class DeleteUserDto {
  @ApiProperty({
    description: '需要删除的用户ID列表',
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  userIds: number[];
}

export class PageSearchUserDto extends PageOptionsDto {
  @ApiProperty({
    required: false,
    description: '用户姓名',
  })
  @IsString()
  @IsOptional()
  name = '';

  @ApiProperty({
    required: false,
    description: '用户名',
  })
  @IsString()
  @IsOptional()
  username = '';

  @ApiProperty({
    required: false,
    description: '用户手机号',
  })
  @IsString()
  @IsOptional()
  phone = '';
}
