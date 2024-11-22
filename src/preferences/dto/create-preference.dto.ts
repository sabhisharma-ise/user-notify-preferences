import { IsEmail, IsString, IsObject, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ChannelsDto {
  @IsNotEmpty()
  email: boolean;

  @IsNotEmpty()
  sms: boolean;

  @IsNotEmpty()
  push: boolean;
}

export class PreferencesDto {
  @IsNotEmpty()
  marketing: boolean;

  @IsNotEmpty()
  newsletter: boolean;

  @IsNotEmpty()
  updates: boolean;

  @IsString()
  @IsNotEmpty()
  frequency: 'daily' | 'weekly' | 'monthly' | 'never';

  @IsObject()
  @ValidateNested()
  @Type(() => ChannelsDto)
  channels: ChannelsDto;
}

export class CreatePreferenceDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEmail()
  email: string;

  @IsObject()
  @ValidateNested()
  @Type(() => PreferencesDto)
  preferences: PreferencesDto;

  @IsString()
  @IsNotEmpty()
  timezone: string;
}