import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class V2GirlService {
  private readonly BASE_URL = 'https://img.v2girl.com/getGirlImages';

  async getImages(pageIndex = 1) {
    const res = await axios.get(this.BASE_URL, {
      params: { pageIndex },
      headers: {
        accept: 'application/json, text/plain, */*',
        origin: 'https://www.v2girl.com',
        referer: 'https://www.v2girl.com/',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
      },
    });

    return res.data;
  }

  /**
   * Lấy random 1 ảnh
   */
  async getRandomV2Image(pageIndex = 1): Promise<string | null> {
    const data = await this.getImages(pageIndex);

    const images: any[] = data?.Data?.PageData ?? [];
    if (!images.length) return null;

    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex].ImageUrl;
  }
}
