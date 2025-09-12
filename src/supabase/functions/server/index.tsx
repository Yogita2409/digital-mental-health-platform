import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-5913c255/health", (c) => {
  return c.json({ status: "ok" });
});

// KV Store endpoints for general data storage
app.post("/make-server-5913c255/kv/set", async (c) => {
  try {
    const { key, value } = await c.req.json();
    if (!key || value === undefined) {
      return c.json({ error: "Key and value are required" }, 400);
    }
    
    await kv.set(key, value);
    return c.json({ success: true, message: "Data stored successfully" });
  } catch (error) {
    console.log("Error storing data in KV:", error);
    return c.json({ error: "Failed to store data" }, 500);
  }
});

app.get("/make-server-5913c255/kv/get/:key", async (c) => {
  try {
    const key = c.req.param("key");
    const value = await kv.get(key);
    
    if (value === null) {
      return c.json({ error: "Key not found" }, 404);
    }
    
    return c.json({ key, value });
  } catch (error) {
    console.log("Error retrieving data from KV:", error);
    return c.json({ error: "Failed to retrieve data" }, 500);
  }
});

app.post("/make-server-5913c255/kv/get-multiple", async (c) => {
  try {
    const { keys } = await c.req.json();
    if (!Array.isArray(keys)) {
      return c.json({ error: "Keys must be an array" }, 400);
    }
    
    const results = await kv.mget(keys);
    return c.json({ results });
  } catch (error) {
    console.log("Error retrieving multiple keys from KV:", error);
    return c.json({ error: "Failed to retrieve data" }, 500);
  }
});

app.get("/make-server-5913c255/kv/prefix/:prefix", async (c) => {
  try {
    const prefix = c.req.param("prefix");
    const results = await kv.getByPrefix(prefix);
    return c.json({ results });
  } catch (error) {
    console.log("Error retrieving data by prefix from KV:", error);
    return c.json({ error: "Failed to retrieve data" }, 500);
  }
});

// Emergency Resources specific endpoints
app.post("/make-server-5913c255/emergency-contacts", async (c) => {
  try {
    const { userId, contact } = await c.req.json();
    if (!userId || !contact) {
      return c.json({ error: "User ID and contact are required" }, 400);
    }
    
    const key = `emergency_contacts_${userId}`;
    
    // Get existing contacts
    const existingContacts = await kv.get(key) || [];
    
    // Add new contact with timestamp
    const newContact = {
      ...contact,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    existingContacts.push(newContact);
    
    await kv.set(key, existingContacts);
    
    return c.json({ 
      success: true, 
      message: "Emergency contact saved successfully",
      contact: newContact 
    });
  } catch (error) {
    console.log("Error saving emergency contact:", error);
    return c.json({ error: "Failed to save emergency contact" }, 500);
  }
});

app.get("/make-server-5913c255/emergency-contacts/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const key = `emergency_contacts_${userId}`;
    
    const contacts = await kv.get(key) || [];
    
    return c.json({ contacts });
  } catch (error) {
    console.log("Error retrieving emergency contacts:", error);
    return c.json({ error: "Failed to retrieve emergency contacts" }, 500);
  }
});

app.post("/make-server-5913c255/emergency-settings", async (c) => {
  try {
    const { userId, settings } = await c.req.json();
    if (!userId || !settings) {
      return c.json({ error: "User ID and settings are required" }, 400);
    }
    
    const key = `emergency_settings_${userId}`;
    const settingsWithTimestamp = {
      ...settings,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(key, settingsWithTimestamp);
    
    return c.json({ 
      success: true, 
      message: "Emergency settings saved successfully",
      settings: settingsWithTimestamp 
    });
  } catch (error) {
    console.log("Error saving emergency settings:", error);
    return c.json({ error: "Failed to save emergency settings" }, 500);
  }
});

Deno.serve(app.fetch);