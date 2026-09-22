const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authMode = import.meta.env.VITE_AUTH_MODE || "demo";
export const demoAdminEmail = "admin@tripwala.demo";
const demoAdminPassword = "TripWala@123";

const authUrl = (action) =>
  `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${firebaseApiKey}`;

const ensureConfiguration = () => {
  if (!firebaseApiKey) {
    throw new Error("Authentication is not configured. Add VITE_FIREBASE_API_KEY to .env.local.");
  }
};

const getErrorMessage = (error) => {
  const code = error?.message?.replace("Firebase: ", "") || "";
  const messages = {
    EMAIL_NOT_FOUND: "No account was found for this email address.",
    INVALID_PASSWORD: "The password is incorrect.",
    INVALID_LOGIN_CREDENTIALS: "The email address or password is incorrect.",
    USER_DISABLED: "This account has been disabled.",
    INVALID_EMAIL: "Enter a valid email address.",
  };
  return messages[code] || "Unable to complete that request. Please try again.";
};

const request = async (action, body) => {
  ensureConfiguration();
  const response = await fetch(authUrl(action), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message);
  return data;
};

export const signInWithEmail = async (email, password) => {
  if (authMode === "demo") {
    if (email.trim().toLowerCase() === demoAdminEmail && password === demoAdminPassword) {
      return { email: demoAdminEmail, idToken: "demo-admin-session" };
    }
    throw new Error("Use the demo administrator email and password shown below.");
  }
  try {
    return await request("signInWithPassword", { email, password, returnSecureToken: true });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const sendPasswordReset = async (email) => {
  if (authMode === "demo") {
    if (email.trim().toLowerCase() !== demoAdminEmail) {
      throw new Error("Use the demo administrator email shown below.");
    }
    return;
  }
  try {
    await request("sendOobCode", { requestType: "PASSWORD_RESET", email });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const configuredAdminEmail = (import.meta.env.VITE_ADMIN_EMAIL || demoAdminEmail).trim().toLowerCase();
export const isDemoAuth = authMode === "demo";
