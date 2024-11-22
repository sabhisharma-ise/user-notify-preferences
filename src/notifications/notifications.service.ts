import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './schemas/notification-log.schema';
import { SendNotificationDto } from './dto/send-notification.dto';
import { PreferencesService } from '../preferences/preferences.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationLog.name)
    private notificationLogModel: Model<NotificationLog>,
    private preferencesService: PreferencesService,
  ) {}

  async validateUserPreferences(userId: string, type: string, channel: string) {
    const userPreferences = await this.preferencesService.findOne(userId);

    if (!userPreferences.preferences[type]) {
      throw new Error(`User has disabled ${type} notifications`);
    }

    if (!userPreferences.preferences.channels[channel]) {
      throw new Error(`User has disabled ${channel} notifications`);
    }
  }


  async send(sendNotificationDto: SendNotificationDto): Promise<NotificationLog> {
    const { userId, type, channel } = sendNotificationDto;

    await this.validateUserPreferences(userId, type, channel);

    const success = Math.random() > 0.1; // Simulated success rate
    const logData = {
      ...sendNotificationDto,
      status: success ? 'sent' : 'failed',
      sentAt: success ? new Date() : undefined,
      failureReason: success ? undefined : 'Notification delivery failed',
      metadata: {
        content: sendNotificationDto.content,
        attemptedAt: new Date(),
      },
    };

    return this.notificationLogModel.create(logData);
  }

  async getUserLogs(userId: string): Promise<NotificationLog[]> {
    return this.notificationLogModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async getStats() {
    const totalSent = await this.notificationLogModel.countDocuments({ status: 'sent' });
    const totalFailed = await this.notificationLogModel.countDocuments({ status: 'failed' });
    
    return {
      totalSent,
      totalFailed,
      successRate: totalSent / (totalSent + totalFailed),
    };
  }
}