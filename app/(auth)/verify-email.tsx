import { useSignIn, useSignUp } from "@clerk/expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SymbolView } from "expo-symbols";

import {
  AuthError,
  AuthPage,
  AuthHeading,
  PrimaryButton,
  authStyles,
  getAuthErrorMessage,
} from "@/components/auth/AuthUi";

type AuthMode = "signin" | "signup";

export default function VerifyEmailScreen() {
  const { mode: requestedMode } = useLocalSearchParams<{ mode?: string }>();
  const mode: AuthMode = requestedMode === "signin" ? "signin" : "signup";
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(30);
  const [errorMessage, setErrorMessage] = useState("");

  const email = mode === "signin" ? signIn.identifier : signUp.emailAddress;

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timer = setTimeout(() => setResendSeconds((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendSeconds]);

  const handleVerify = async () => {
    if (!/^\d{6}$/.test(code)) {
      setErrorMessage("Enter the 6-digit code sent to your email.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    try {
      if (mode === "signin") {
        const { error } = await signIn.emailCode.verifyCode({ code });
        if (error) throw error;
        if (signIn.status !== "complete") {
          throw new Error("Your sign-in needs another verification step. Contact support.");
        }
        await signIn.finalize();
      } else {
        const { error } = await signUp.verifications.verifyEmailCode({ code });
        if (error) throw error;
        if (signUp.status !== "complete") {
          throw new Error("Your sign-up needs another step. Contact support.");
        }
        await signUp.finalize();
      }
      router.replace("/(tabs)");
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    try {
      if (mode === "signin") {
        const { error } = await signIn.emailCode.sendCode();
        if (error) throw error;
      } else {
        const { error } = await signUp.verifications.sendEmailCode();
        if (error) throw error;
      }
      setCode("");
      setResendSeconds(30);
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeEmail = async () => {
    setIsSubmitting(true);
    try {
      if (mode === "signin") {
        await signIn.reset();
        router.replace("/sign-in");
      } else {
        await signUp.reset();
        router.replace("/get-started");
      }
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const digits = code.padEnd(6, " ").slice(0, 6);

  return (
    <AuthPage
      eyebrow="AURA"
      title="Check your email"
      onBack={() => router.back()}
    >
      <AuthHeading
        title="Enter your 6-digit code"
        description="We sent a secure verification code to:"
      />
      <Text style={authStyles.emailAddress}>{email || "your email address"}</Text>
      <Pressable
        accessibilityRole="button"
        disabled={isSubmitting}
        onPress={() => void handleChangeEmail()}
        style={authStyles.editEmail}
      >
        <Text style={authStyles.editEmail}>Change email address</Text>
      </Pressable>

      <View style={authStyles.field}>
        <Text style={authStyles.label}>Email code</Text>
        <View style={authStyles.codeRow}>
          {digits.split("").map((digit, index) => (
            <View
              key={index}
              style={[
                authStyles.codeCell,
                index === Math.min(code.length, 5) ? authStyles.codeCellActive : null,
              ]}
            >
              <Text style={authStyles.codeDigit}>{digit.trim()}</Text>
            </View>
          ))}
          <TextInput
            accessibilityLabel="6-digit email code"
            autoComplete="one-time-code"
            autoFocus
            caretHidden
            keyboardType="number-pad"
            maxLength={6}
            onChangeText={(value) => {
              setCode(value.replace(/\D/g, "").slice(0, 6));
              setErrorMessage("");
            }}
            style={authStyles.codeInput}
            textContentType="oneTimeCode"
            value={code}
          />
        </View>
        <Text style={authStyles.hint}>Enter the code from the email sent by Clerk.</Text>
      </View>
      <AuthError message={errorMessage} />
      <PrimaryButton
        title="Verify & continue"
        loading={isSubmitting}
        disabled={code.length !== 6}
        onPress={() => void handleVerify()}
      />
      <Text style={authStyles.resendHint}>Didn&apos;t receive a code? Check your spam folder.</Text>
      <Pressable
        accessibilityRole="button"
        disabled={resendSeconds > 0 || isSubmitting}
        onPress={() => void handleResend()}
        style={authStyles.resend}
      >
        <Text style={authStyles.resendText}>
          {resendSeconds > 0
            ? `Resend code in 00:${String(resendSeconds).padStart(2, "0")}`
            : "Resend code"}
        </Text>
      </Pressable>

      <View style={authStyles.verifySpacer} />
      <View style={authStyles.safety}>
        <SymbolView
          name={{ ios: "lock.shield", android: "lock", web: "lock" }}
          size={19}
          tintColor="#175B45"
        />
        <Text style={authStyles.safetyText}>
          Keep this code private. Anyone with your code could access your account.
        </Text>
      </View>
      <Text style={authStyles.footerNote}>Email verification and sessions are managed by Clerk.</Text>
    </AuthPage>
  );
}
