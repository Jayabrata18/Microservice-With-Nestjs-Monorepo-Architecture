/* eslint-disable prettier/prettier */
import quicker from '@app/common/health/quicker';
import { Injectable } from '@nestjs/common';

@Injectable()
export class App2Service {
  healthCheck(): { application: unknown; system: unknown; timeStamp: number } {
    const healthData = {
      application: quicker.getApplicationHealth(),
      system: quicker.getSystemHealth(),
      timeStamp: Date.now()
    }
    return healthData;
  }
}
