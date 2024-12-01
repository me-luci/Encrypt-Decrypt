// Generate a secure key based on date and time input
function generateKeyFromDateTime(dateTime) {
  if (!dateTime) return "";
  const hash = Array.from(dateTime).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const saltedKey = (hash * 97).toString(36); // Create a pseudo-random salted key.
  return saltedKey;
}

// Encrypt the message
function encrypt() {
  const message = document.getElementById("encryptMessage").value;
  const dateTime = document.getElementById("encryptDateTime").value;

  if (!message || !dateTime) {
      alert("Please enter both the message and the date/time.");
      return;
  }

  const key = generateKeyFromDateTime(dateTime);
  let encrypted = "";

  for (let i = 0; i < message.length; i++) {
      encrypted += String.fromCharCode(
          message.charCodeAt(i) + (key.charCodeAt(i % key.length) % 26)
      );
  }

  // Shuffle encrypted message and encode in Base64 for transport safety
  encrypted = btoa(encrypted.split("").reverse().join(""));
  document.getElementById("encryptedOutput").value = encrypted;
}

// Decrypt the message
function decrypt() {
  const encryptedMessage = document.getElementById("decryptMessage").value;
  const dateTime = document.getElementById("decryptDateTime").value;

  if (!encryptedMessage || !dateTime) {
      alert("Please enter both the encrypted message and the date/time.");
      return;
  }

  const key = generateKeyFromDateTime(dateTime);

  try {
      let decoded = atob(encryptedMessage).split("").reverse().join(""); // Decode and reverse

      let decrypted = "";
      for (let i = 0; i < decoded.length; i++) {
          decrypted += String.fromCharCode(
              decoded.charCodeAt(i) - (key.charCodeAt(i % key.length) % 26)
          );
      }

      document.getElementById("decryptedOutput").value = decrypted;
  } catch (e) {
      document.getElementById("decryptedOutput").value = "Decryption failed: Invalid input or wrong time.";
  }
}

// Copy message to clipboard
function copyToClipboard(elementId) {
  const message = document.getElementById(elementId);
  message.select();
  message.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand("copy");
  alert("Copied to clipboard!");
}
