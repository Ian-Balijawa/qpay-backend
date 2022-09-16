import { Buffer } from "node:buffer";
import { createDecipheriv } from "node:crypto";

const ALGORITHM = "aes-256-cbc";

export const decryptCipherText = (
  cipherText: string,
  decryptionKey: string
): string => {
  // The IV is usually passed along with the ciphertext.
  const initialisationVector = Buffer.alloc(32, 0);

  // Initialization vector.
  const decipher = createDecipheriv(
    ALGORITHM,
    decryptionKey,
    initialisationVector
  );

  // Encrypted using same algorithm, key and initialisationVector.
  let decrypted = decipher.update(cipherText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  console.log(decrypted);
  
  // Prints: some clear text data
  return decrypted;
};
