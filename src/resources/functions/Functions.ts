import * as crypto from 'crypto';


export async function encrypt(text: string) {
  const encondedText = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}