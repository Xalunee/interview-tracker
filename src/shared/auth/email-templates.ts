import { env } from '@/shared/config';

export const MAGIC_LINK_SUBJECT = 'Вход в Interview Tracker';

interface MagicLinkParams {
  url: string;
}

export function buildMagicLinkEmailHtml({ url }: MagicLinkParams): string {
  const appName = env.NEXT_PUBLIC_APP_NAME;
  return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${appName}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#171717;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;padding:32px;max-width:480px;">
            <tr>
              <td style="font-size:22px;font-weight:600;color:#171717;padding-bottom:16px;">
                Вход в ${appName}
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.5;color:#171717;padding-bottom:24px;">
                Нажмите на кнопку ниже, чтобы войти в свой аккаунт. Ссылка действительна 24 часа.
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:24px;">
                <a href="${url}" style="display:inline-block;background-color:#007aff;color:#ffffff;text-decoration:none;font-size:15px;font-weight:500;padding:12px 24px;border-radius:12px;">
                  Войти
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-size:13px;line-height:1.5;color:#666666;padding-bottom:16px;">
                Если кнопка не работает, скопируйте и вставьте эту ссылку в браузер:
              </td>
            </tr>
            <tr>
              <td style="font-size:13px;line-height:1.5;color:#007aff;word-break:break-all;padding-bottom:24px;">
                <a href="${url}" style="color:#007aff;text-decoration:underline;">${url}</a>
              </td>
            </tr>
            <tr>
              <td style="font-size:13px;line-height:1.5;color:#999999;border-top:1px solid #f5f5f5;padding-top:16px;">
                Если вы не запрашивали вход, проигнорируйте это письмо.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildMagicLinkEmailText({ url }: MagicLinkParams): string {
  const appName = env.NEXT_PUBLIC_APP_NAME;
  return [
    `Вход в ${appName}`,
    '',
    'Нажмите на ссылку ниже, чтобы войти. Ссылка действительна 24 часа.',
    '',
    url,
    '',
    'Если вы не запрашивали вход, проигнорируйте это письмо.',
  ].join('\n');
}
