import { useSignIn } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import {
  AuthError,
  AuthPage,
  AuthHeading,
  EmailInput,
  OAuthButtons,
  OrDivider,
  PrimaryButton,
  SecurityNotice,
  authStyles,
  getAuthErrorMessage,
} from "@/components/auth/AuthUi";

export default function SignInScreen() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendCode = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setErrorMessage("Enter a valid email address to continue.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const { error } = await signIn.create({ identifier: normalizedEmail });
      if (error) throw error;

      const { error: codeError } = await signIn.emailCode.sendCode();
      if (codeError) throw codeError;

      router.push("/verify-email?mode=signin");
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPage eyebrow="AURA" title="Welcome back" onBack={() => router.back()}>
      <AuthHeading
        title="Log in to Aura"
        description="Pick up where you left off. Continue with Google or Apple, or get a 6-digit email code."
      />
      <OAuthButtons />
      <OrDivider />
      <EmailInput email={email} setEmail={setEmail} />
      <AuthError message={errorMessage} />
      <PrimaryButton
        title="Send login code"
        loading={isSubmitting}
        disabled={!email.trim()}
        onPress={() => void handleSendCode()}
      />
      <View style={authStyles.linkRow}>
        <Text style={authStyles.linkText}>New to Aura?</Text>
        <Pressable accessibilityRole="link" onPress={() => router.push("/get-started")}>
          <Text style={authStyles.link}>Create an account</Text>
        </Pressable>
      </View>
      <SecurityNotice />
      <Text style={authStyles.footerNote}>
        Sign-in is secured by Clerk. Your email code is verified, not stored by this app.
      </Text>
    </AuthPage>
  );
}
