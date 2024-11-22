import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './schemas/user-preference.schema';
import { CreatePreferenceDto } from './dto/create-preference.dto';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel(UserPreference.name)
    private userPreferenceModel: Model<UserPreference>,
  ) {}

  async create(createPreferenceDto: CreatePreferenceDto): Promise<UserPreference> {
    const existingPreference = await this.userPreferenceModel.findOne({ userId: createPreferenceDto.userId });
    if (existingPreference) {
      throw new BadRequestException('Preferences already exist for this user');
    }
    const newPreference = new this.userPreferenceModel(createPreferenceDto);
    return newPreference.save();
  }

  async findOne(userId: string): Promise<UserPreference> {
    const preference = await this.userPreferenceModel.findOne({ userId }).exec();
    if (!preference) {
      throw new NotFoundException(`User preferences not found for userId ${userId}`);
    }
    return preference;
  }

  async update(userId: string, updatePreferenceDto: Partial<CreatePreferenceDto>): Promise<UserPreference> {
    const updatedPreference = await this.userPreferenceModel
      .findOneAndUpdate({ userId }, updatePreferenceDto, { new: true })
      .exec();
    if (!updatedPreference) {
      throw new NotFoundException(`User preferences not found for userId ${userId}`);
    }
    return updatedPreference;
  }

  async remove(userId: string): Promise<void> {
    const result = await this.userPreferenceModel.deleteOne({ userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User preferences not found for userId ${userId}`);
    }
  }
}
