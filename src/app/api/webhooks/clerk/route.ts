import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { env } from "@/env.mjs";

// Webhook secret key from Clerk Dashboard
const webhookSecret = env.CLERK_WEBHOOK_SECRET;

async function validateRequest(request: Request, headersList: Headers) {
  const payloadString = await request.text();

  const svix_id = headersList.get("svix-id");
  const svix_timestamp = headersList.get("svix-timestamp");
  const svix_signature = headersList.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return {
      success: false,
      message: "Missing svix headers",
      payload: null,
    };
  }

  const svixHeaders = {
    "svix-id": svix_id,
    "svix-timestamp": svix_timestamp,
    "svix-signature": svix_signature,
  };

  const wh = new Webhook(webhookSecret || "");

  let evt: WebhookEvent;

  try {
    evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;
  } catch (err) {
    return {
      success: false,
      message: "Error verifying webhook",
      payload: null,
    };
  }

  return {
    success: true,
    message: "Webhook verified",
    payload: evt,
  };
}

export async function POST(request: Request) {
  const headersList = headers();

  try {
    // Validate the webhook
    const { success, message, payload } = await validateRequest(
      request,
      headersList
    );

    if (!success || !payload) {
      return NextResponse.json({ success: false, message }, { status: 400 });
    }

    // Handle the webhook
    const eventType = payload.type;

    if (eventType === "user.created" || eventType === "user.updated") {
      const { email_addresses, first_name, last_name, username } = payload.data;

      const primaryEmail = email_addresses[0]?.email_address;
      const fullName = `${first_name || ""} ${last_name || ""}`.trim();

      if (!primaryEmail) {
        return NextResponse.json(
          { success: false, message: "No email address found" },
          { status: 400 }
        );
      }

      // Upsert user in database
      const user = await prisma.users.upsert({
        where: {
          email: primaryEmail,
        },
        update: {
          name: fullName,
          user_name: username || primaryEmail,
          updated_at: new Date(),
        },
        create: {
          user_name: username || primaryEmail,
          email: primaryEmail,
          name: fullName,
          user_type: "STANDARD",
        },
      });

      return NextResponse.json(
        { success: true, message: "User processed successfully", user },
        { status: 200 }
      );
    }

    // Return 200 for other event types
    return NextResponse.json(
      { success: true, message: "Webhook processed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
