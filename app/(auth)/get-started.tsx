import { useSignUp } from "@clerk/expo";
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

export default function GetStartedScreen() {
  const { signUp } = useSignUp();
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
      const { error } = await signUp.create({ emailAddress: normalizedEmail });
      if (error) throw error;

      const { error: codeError } = await signUp.verifications.sendEmailCode();
      if (codeError) throw codeError;

      router.push("/verify-email?mode=signup");
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPage eyebrow="AURA" title="Let's get started" onBack={() => router.back()}>
      <AuthHeading
        title="Sign in or create an account"
        description="Continue with Google or Apple, or enter your email to receive a 6-digit code."
      />
      <OAuthButtons />
      <OrDivider />
      <EmailInput email={email} setEmail={setEmail} />
      <AuthError message={errorMessage} />
      <PrimaryButton
        title="Send my code"
        loading={isSubmitting}
        disabled={!email.trim()}
        onPress={() => void handleSendCode()}
      />
      <Text style={authStyles.legal}>
        By continuing, you agree to our Terms and Privacy Notice.
      </Text>
      <View style={authStyles.linkRow}>
        <Text style={authStyles.linkText}>Already have an account?</Text>
        <Pressable accessibilityRole="link" onPress={() => router.push("/sign-in")}>
          <Text style={authStyles.link}>Log in</Text>
        </Pressable>
      </View>
      <SecurityNotice />
      <Text style={authStyles.footerNote}>
        Clerk will verify your email and create your Aura account.
      </Text>
    </AuthPage>
  );
}
