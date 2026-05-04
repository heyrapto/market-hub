export const sendLoginEmail = ({ firstName }: { firstName: string }) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome Back</title>
  </head>
  <body style="margin:0;padding:0;background-color:transparent;font-family:Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:40px 20px;">
      <tr>
        <td align="center">
          <table role="presentation" width="520" cellspacing="0" cellpadding="0" style="max-width:520px;width:100%;">

            <tr>
              <td style="padding-bottom:24px;">
                <p style="margin:0;font-size:18px;font-weight:bold;color:#ffffff;">YourApp</p>
              </td>
            </tr>

            <tr>
              <td style="padding-bottom:12px;">
                <h1 style="margin:0;font-size:22px;font-weight:bold;color:#ffffff;">Welcome back, ${{ firstName }} 👋</h1>
              </td>
            </tr>

            <tr>
              <td style="padding-bottom:40px;">
                <p style="margin:0;font-size:15px;color:#cccccc;line-height:1.6;">
                  Good to see you again. We've missed you around here.<br/><br/>
                  Pick up right where you left off — everything is just as you left it.
                </p>
              </td>
            </tr>

            <tr>
              <td style="border-top:1px solid #444444;padding-top:24px;">
                <p style="margin:0;font-size:12px;color:#666666;">© 2026 YourApp · <a href="#" style="color:#666666;text-decoration:none;">Unsubscribe</a></p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

export const sendRegisterEmail = ({ firstName }: { firstName: string }) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome to YourApp</title>
  </head>
  <body style="margin:0;padding:0;background-color:transparent;font-family:Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:40px 20px;">
      <tr>
        <td align="center">
          <table role="presentation" width="520" cellspacing="0" cellpadding="0" style="max-width:520px;width:100%;">

            <tr>
              <td style="padding-bottom:24px;">
                <p style="margin:0;font-size:18px;font-weight:bold;color:#ffffff;">YourApp</p>
              </td>
            </tr>

            <tr>
              <td style="padding-bottom:12px;">
                <h1 style="margin:0;font-size:22px;font-weight:bold;color:#ffffff;">You're in, ${{ firstName }} ✨</h1>
              </td>
            </tr>

            <tr>
              <td style="padding-bottom:40px;">
                <p style="margin:0;font-size:15px;color:#cccccc;line-height:1.6;">
                  Thank you so much for joining us — it truly means a lot.<br/><br/>
                  We believe the best things happen when great people and great tools come together. We can't wait to create something magical with you. This is just the beginning.
                </p>
              </td>
            </tr>

            <tr>
              <td style="border-top:1px solid #444444;padding-top:24px;">
                <p style="margin:0;font-size:12px;color:#666666;">© 2026 YourApp · <a href="#" style="color:#666666;text-decoration:none;">Unsubscribe</a></p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
