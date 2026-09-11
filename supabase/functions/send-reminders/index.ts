/**
 * supabase/functions/send-reminders/index.ts
 *
 * Runs on a cron schedule (every day at 09:00 UTC).
 * Finds users who have not been active for more than 3 days and sends them
 * a reminder email via Resend (https://resend.com — free tier: 3 000 emails/month).
 *
 * ─── Setup steps ──────────────────────────────────────────────────────────────
 * 1. Sign up at resend.com, get an API key, add a verified sender domain.
 * 2. In Supabase dashboard → Edge Functions → Secrets, add:
 *      RESEND_API_KEY   = re_xxxxxxxxxxxx
 *      FROM_EMAIL       = noreply@learn.codehuntspk.com   (must be on your Resend domain)
 *      SITE_URL         = https://learn.codehuntspk.com
 * 3. Deploy this function:
 *      npx supabase functions deploy send-reminders --no-verify-jwt
 * 4. Schedule it in Supabase dashboard → Database → Extensions → pg_cron, or
 *    via the Supabase dashboard cron UI:
 *      0 9 * * *   (every day at 09:00 UTC)
 *    and point it at:
 *      https://<project-ref>.supabase.co/functions/v1/send-reminders
 *    with header:  Authorization: Bearer <service_role_key>
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const INACTIVE_DAYS = 3 // send reminder after this many days of inactivity

Deno.serve(async (req: Request) => {
  // Allow only POST (the cron trigger sends POST)
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const resendApiKey = Deno.env.get('RESEND_API_KEY')!
  const fromEmail = Deno.env.get('FROM_EMAIL') ?? 'noreply@learn.codehuntspk.com'
  const siteUrl = Deno.env.get('SITE_URL') ?? 'https://learn.codehuntspk.com'

  const supabase = createClient(supabaseUrl, serviceRoleKey)

  // ── Find inactive users ─────────────────────────────────────────────────────
  // A user is "inactive" if their most recent activity_date is more than
  // INACTIVE_DAYS days ago (or they have no activity at all but have a confirmed email).

  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - INACTIVE_DAYS)
  const cutoff = cutoffDate.toISOString().slice(0, 10) // "YYYY-MM-DD"

  // Get all confirmed users
  const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers()
  if (usersError) {
    console.error('Failed to list users:', usersError)
    return new Response(JSON.stringify({ error: usersError.message }), { status: 500 })
  }

  const confirmedUsers = usersData.users.filter(
    (u) => u.email && u.email_confirmed_at
  )

  // Get latest activity date per user
  const { data: activityRows, error: activityError } = await supabase
    .from('user_activity')
    .select('user_id, activity_date')
    .order('activity_date', { ascending: false })

  if (activityError) {
    console.error('Failed to fetch activity:', activityError)
    return new Response(JSON.stringify({ error: activityError.message }), { status: 500 })
  }

  // Build a map: user_id → latest activity_date
  const latestActivity = new Map<string, string>()
  for (const row of activityRows ?? []) {
    if (!latestActivity.has(row.user_id)) {
      latestActivity.set(row.user_id, row.activity_date)
    }
  }

  // Identify users to remind
  const usersToRemind = confirmedUsers.filter((u) => {
    const lastActive = latestActivity.get(u.id)
    // No activity at all, OR last active before the cutoff
    return !lastActive || lastActive < cutoff
  })

  if (usersToRemind.length === 0) {
    return new Response(JSON.stringify({ sent: 0, message: 'No inactive users.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // ── Send reminder emails via Resend ─────────────────────────────────────────
  let sent = 0
  const errors: string[] = []

  for (const user of usersToRemind) {
    const firstName = user.user_metadata?.full_name?.split(' ')[0] ?? 'there'

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Miss your lessons?</title>
</head>
<body style="margin:0;padding:0;background:#050505;font-family:'Inter',Arial,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#0d0d0d;border:1px solid rgba(255,255,255,0.08);border-radius:4px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:28px 32px 20px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="font-family:'Space Grotesk',Arial,sans-serif;font-size:18px;font-weight:700;color:#ffffff;">
                CodeHunts <span style="color:#818cf8;">Learn</span>
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 32px 8px;">
              <h1 style="font-family:'Space Grotesk',Arial,sans-serif;font-size:22px;font-weight:600;color:#ffffff;margin:0 0 12px;">
                Hey ${firstName}, your trail's getting cold 🥾
              </h1>
              <p style="font-size:15px;line-height:1.7;color:#a1a1aa;margin:0 0 16px;">
                It's been a few days since you last visited CodeHunts Learn.
                Your streak is waiting — pick up right where you left off.
              </p>
              <p style="font-size:15px;line-height:1.7;color:#a1a1aa;margin:0 0 28px;">
                Even 5 minutes today keeps the momentum going.
              </p>

              <!-- CTA button -->
              <a href="${siteUrl}/dashboard"
                style="display:inline-block;background:#818cf8;color:#050505;font-family:'Space Grotesk',Arial,sans-serif;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;text-decoration:none;padding:12px 24px;border-radius:2px;">
                Continue learning →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 32px;border-top:1px solid rgba(255,255,255,0.06);margin-top:24px;">
              <p style="font-size:11px;color:#52525b;margin:0;font-family:monospace;">
                You're receiving this because you have an account at
                <a href="${siteUrl}" style="color:#818cf8;text-decoration:none;">${siteUrl}</a>.
                These reminders send after ${INACTIVE_DAYS} days of inactivity.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: user.email!,
        subject: `Hey ${firstName}, your trail's getting cold 🥾`,
        html,
      }),
    })

    if (res.ok) {
      sent++
    } else {
      const body = await res.text()
      errors.push(`${user.email}: ${body}`)
      console.error(`Failed to send to ${user.email}:`, body)
    }
  }

  return new Response(
    JSON.stringify({ sent, errors: errors.length ? errors : undefined }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
})
