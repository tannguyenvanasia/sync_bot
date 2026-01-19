import { ChannelMessage } from 'mezon-sdk';
import { Command } from '@app/decorators/command.decorator';
import { CommandMessage } from '@app/command/common/command.abstract';
import { V2GirlService } from '@app/services/v2girl.service';
import { EmbedProps } from '@app/common/constants';

@Command('girl', {
  description: 'Get random girl image',
  usage: '!girl [page|random]',
  category: 'Fun',
  aliases: ['g'],
})
export class GirlCommand extends CommandMessage {
  constructor(private readonly v2girlService: V2GirlService) {
    super();
  }

  async execute(args: string[], message: ChannelMessage) {
    let pageIndex = 1;

    if (args.length > 0) {
      if (args[0] === 'random') {
        pageIndex = Math.floor(Math.random() * 10) + 1;
      } else {
        const parsed = Number(args[0]);
        if (!isNaN(parsed) && parsed > 0) {
          pageIndex = parsed;
        }
      }
    }

    const imageUrl = await this.v2girlService.getRandomV2Image(pageIndex);
    console.log(imageUrl);
    if (!imageUrl) {
      return this.replyMessageGenerate(
        { messageContent: '❌ Không lấy được ảnh' },
        message,
      );
    }

    const embed: EmbedProps[] = [
      {
        color: '#000000',
        image: {
          url: imageUrl,
          width: 'auto',
          height: 'auto',
        },
      },
    ];

    return this.replyMessageGenerate(
      {
        embed,
      },
      message,
    );
  }
}
