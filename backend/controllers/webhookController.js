const { Webhook } = require("svix");
const User = require("../models/User");

exports.handleClerkWebhook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ CLERK_WEBHOOK_SECRET is not defined in environment variables");
    return res.status(500).json({ error: "Webhook secret is not configured" });
  }

  // Retrieve Svix headers
  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];

  // Verify headers exist
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: "Missing Svix headers" });
  }

  // Get raw body as a string
  const payload = req.body.toString();

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  // Verify signature
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).json({ error: "Invalid signature" });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`📡 Clerk Webhook received: ${eventType} (User ID: ${id})`);

  try {
    if (eventType === "user.created" || eventType === "user.updated") {
      const { email_addresses, first_name, last_name, image_url } = evt.data;
      
      const email = email_addresses?.[0]?.email_address;
      const name = [first_name, last_name].filter(Boolean).join(" ") || "Clerk User";

      const updatedUser = await User.findOneAndUpdate(
        { clerkId: id },
        {
          clerkId: id,
          email,
          name,
          profileImageUrl: image_url,
        },
        { upsert: true, new: true }
      );
      
      console.log(`✅ Synced user in MongoDB: ${updatedUser.name} (${updatedUser.email})`);
    } else if (eventType === "user.deleted") {
      const deletedUser = await User.findOneAndDelete({ clerkId: id });
      if (deletedUser) {
        console.log(`✅ Deleted user from MongoDB: ${deletedUser.name}`);
      } else {
        console.log(`ℹ️ User with ID ${id} was not found in MongoDB`);
      }
    }

    res.status(200).json({ success: true, message: "Webhook processed successfully" });
  } catch (error) {
    console.error("❌ Error syncing user to database:", error);
    res.status(500).json({ error: "Internal database sync error" });
  }
};
