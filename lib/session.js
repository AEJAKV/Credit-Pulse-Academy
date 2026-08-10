const encoder = new TextEncoder();

function toHex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sign(value) {
  const secret = process.env.SESSION_SECRET || "credit-pulse-local-preview-secret";
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

export async function createSession(scope, hours = 12) {
  const payload = `${scope}.${Date.now() + hours * 60 * 60 * 1000}`;
  return `${payload}.${await sign(payload)}`;
}

export async function verifySession(token, scope) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== scope || Number(parts[1]) < Date.now()) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  return parts[2] === await sign(payload);
}
