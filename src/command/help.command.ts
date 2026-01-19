import { ChannelMessage } from 'mezon-sdk';
import { Command } from '@app/decorators/command.decorator';
import { CommandMessage } from '@app/command/common/command.abstract';
import { CommandStorage } from '@app/command/common/command.storage';

@Command('help', {
  description: 'Shows available commands and their usage',
  usage: '!help [command]',
  category: 'General',
  aliases: ['h', 'commands'],
})
export class HelpCommand extends CommandMessage {
  constructor() {
    super();
  }

  execute(args: string[], message: ChannelMessage) {
    // =========================
    // !help <command>
    // =========================
    if (args.length > 0) {
      const input = args[0].toLowerCase();
      const metadata = CommandStorage.getCommandMetadata(input);

      if (!metadata) {
        return this.replyMessageGenerate(
          {
            messageContent: `❌ Command **${input}** not found.\nUse \`!help\` to see all available commands.`,
          },
          message,
        );
      }

      const messageContent = this.formatCommandHelp(metadata);
      return this.replyMessageGenerate(
        {
          messageContent,
          mk: [{ type: 'pre', s: 0, e: messageContent.length }],
        },
        message,
      );
    }

    // =========================
    // !help
    // =========================
    const grouped = this.groupCommandsByCategory();
    const messageContent = this.formatCommandList(grouped);

    return this.replyMessageGenerate(
      {
        messageContent,
        mk: [{ type: 'pre', s: 0, e: messageContent.length }],
      },
      message,
    );
  }

  // =========================
  // Helpers
  // =========================

  private groupCommandsByCategory(): Record<string, string[]> {
    const map = new Map<string, string[]>();

    for (const [name, meta] of CommandStorage.getAllCommands()) {
      const category = meta.category ?? 'Other';
      if (!map.has(category)) map.set(category, []);
      map.get(category)!.push(name);
    }

    return Object.fromEntries(map);
  }

  private formatCommandList(grouped: Record<string, string[]>): string {
    const lines: string[] = ['**📖 Available Commands**\n'];

    for (const [category, commands] of Object.entries(grouped)) {
      lines.push(`**${category}:**`);
      lines.push(commands.map((c) => `• !${c}`).join('\n'));
      lines.push('');
    }

    lines.push('Use `!help <command>` for detailed usage.');

    return lines.join('\n');
  }

  private formatCommandHelp(metadata: any): string {
    return [
      `**📌 Command:** ${metadata.name}`,
      `**📝 Description:** ${metadata.description}`,
      `**▶ Usage:** ${metadata.usage}`,
      `**📂 Category:** ${metadata.category}`,
      metadata.aliases?.length
        ? `**🔁 Aliases:** ${metadata.aliases.join(', ')}`
        : '',
      metadata.permissions?.length
        ? `**🔐 Permissions:** ${metadata.permissions.join(', ')}`
        : '',
    ]
      .filter(Boolean)
      .join('\n');
  }
}
