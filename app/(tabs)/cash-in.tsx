import { useState } from "react";
import * as Clipboard from "expo-clipboard";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const colors = {
  background: "#F7F8F3",
  green: "#175B45",
  darkGreen: "#173D32",
  text: "#263B34",
  muted: "#738078",
  border: "#DDE4DC",
  paleGreen: "#E8F2EB",
  white: "#FFFFFF",
  yellow: "#FFF3D4",
  gold: "#765922",
};
const retailers = ["Shoprite", "Pick n Pay", "PEP"] as const;

function formatAmount(amount: number) {
  return `R ${amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function CashInScreen() {
  const [retailer, setRetailer] = useState<(typeof retailers)[number]>("Shoprite");
  const [amountText, setAmountText] = useState("200.00");
  const [copied, setCopied] = useState(false);
  const amount = Number(amountText.replace(",", "."));
  const validAmount = Number.isFinite(amount) && amount > 0;
  const fee = validAmount ? amount * 0.01 : 0;

  const copyReference = async () => {
    try {
      await Clipboard.setStringAsync("DEMO 472 816");
      setCopied(true);
    } catch (error) {
      Alert.alert(
        "Couldn't copy the demo reference",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Link href="/(tabs)" asChild>
            <Pressable accessibilityRole="button" accessibilityLabel="Go to home" style={styles.headerIcon}>
              <SymbolView name={{ ios: "arrow.left", android: "arrow_back", web: "arrow_back" }} size={20} tintColor={colors.green} />
            </Pressable>
          </Link>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>RETAIL CASH-IN · DEMO</Text>
            <Text style={styles.title}>Add cash to your wallet</Text>
          </View>
        </View>

        <Text style={styles.fieldTitle}>1. Choose a retailer</Text>
        <View style={styles.retailers}>
          {retailers.map((item) => {
            const selected = item === retailer;
            return (
              <Pressable
                key={item}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                onPress={() => setRetailer(item)}
                style={[styles.retailer, selected && styles.selectedRetailer]}
              >
                <Text style={[styles.retailerText, selected && styles.selectedRetailerText]}>{item}</Text>
                {selected ? (
                  <SymbolView name={{ ios: "checkmark", android: "check", web: "check" }} size={15} tintColor={colors.green} />
                ) : null}
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.smallNote}>Example options only. No retailer partnership is claimed.</Text>

        <View style={styles.card}>
          <Text style={styles.fieldTitle}>2. Check your amount &amp; fee</Text>
          <View style={styles.amountBox}>
            <Text style={styles.currency}>R</Text>
            <TextInput
              accessibilityLabel="Demo cash-in amount in rand"
              keyboardType="decimal-pad"
              value={amountText}
              onChangeText={(value) => {
                setAmountText(value.replace(/[^\d.,]/g, ""));
                setCopied(false);
              }}
              style={styles.amountInput}
            />
            <Text style={styles.currencyCode}>ZAR</Text>
          </View>
          {!validAmount ? <Text style={styles.validation}>Enter an amount greater than zero.</Text> : null}
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Cash handed over</Text>
            <Text style={styles.breakdownValue}>{validAmount ? formatAmount(amount) : "—"}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Illustrative fee (1%)</Text>
            <Text style={styles.breakdownValue}>{validAmount ? formatAmount(fee) : "—"}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.resultLabel}>Added to your sample wallet</Text>
            <Text style={styles.resultValue}>{validAmount ? formatAmount(amount - fee) : "—"}</Text>
          </View>
          <Text style={styles.smallNote}>Demo pricing only, not a real fee quote.</Text>
        </View>

        <View style={styles.referenceCard}>
          <View style={styles.referenceHeading}>
            <Text style={styles.referenceTitle}>3. Your sample reference</Text>
            <Text style={styles.invalidBadge}>Not valid</Text>
          </View>
          <Text style={styles.reference}>DEMO 472 816</Text>
          <Text style={styles.referenceNote}>Illustration only. Do not present this reference or make a payment at a till.</Text>
        </View>

        <Text style={styles.sectionTitle}>What a future cash-in could look like</Text>
        <Text style={styles.body}>Choose a supported store, confirm the fee, then pay at the till. Keep your receipt until the deposit is confirmed.</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => void copyReference()}
          style={({ pressed }) => [styles.copyButton, pressed && styles.pressed]}
        >
          <Text style={styles.copyButtonText}>{copied ? "Demo reference copied" : "Copy demo reference"}</Text>
          <SymbolView name={{ ios: copied ? "checkmark" : "doc.on.doc", android: copied ? "check" : "content_copy", web: copied ? "check" : "content_copy" }} size={19} tintColor={colors.white} />
        </Pressable>
        <Text style={styles.disclaimer}>All amounts are demo data. No cash is accepted or moved by this concept.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 28 },
  header: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 },
  headerIcon: { width: 43, height: 43, alignItems: "center", justifyContent: "center", borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  headerText: { flex: 1 },
  eyebrow: { color: colors.muted, fontSize: 10, letterSpacing: 0.4 },
  title: { color: colors.darkGreen, fontSize: 22, fontWeight: "800", marginTop: 3 },
  fieldTitle: { color: colors.darkGreen, fontSize: 14, fontWeight: "800" },
  retailers: { flexDirection: "row", gap: 8, marginTop: 10 },
  retailer: { flex: 1, minHeight: 48, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, paddingHorizontal: 6, borderWidth: 1, borderColor: colors.border, borderRadius: 13, backgroundColor: colors.white },
  selectedRetailer: { borderWidth: 1.5, borderColor: colors.green, backgroundColor: colors.paleGreen },
  retailerText: { color: colors.text, fontSize: 12, fontWeight: "700" },
  selectedRetailerText: { color: colors.green },
  smallNote: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 8 },
  card: { padding: 15, marginTop: 18, borderRadius: 17, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  amountBox: { height: 55, flexDirection: "row", alignItems: "center", paddingHorizontal: 12, marginTop: 11, borderRadius: 12, backgroundColor: colors.background },
  currency: { color: colors.darkGreen, fontSize: 21, fontWeight: "800" },
  amountInput: { flex: 1, color: colors.darkGreen, fontSize: 21, fontWeight: "800", paddingHorizontal: 5 },
  currencyCode: { color: colors.muted, fontSize: 11 },
  validation: { color: "#B34C25", fontSize: 11, marginTop: 6 },
  breakdownRow: { flexDirection: "row", justifyContent: "space-between", gap: 8, marginTop: 12 },
  breakdownLabel: { color: colors.muted, fontSize: 12 },
  breakdownValue: { color: colors.text, fontSize: 12, fontWeight: "700" },
  resultLabel: { color: colors.green, fontSize: 12, fontWeight: "800" },
  resultValue: { color: colors.green, fontSize: 13, fontWeight: "800" },
  referenceCard: { padding: 15, marginTop: 18, borderRadius: 17, backgroundColor: colors.yellow },
  referenceHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  referenceTitle: { color: colors.darkGreen, fontSize: 14, fontWeight: "800" },
  invalidBadge: { color: colors.gold, fontSize: 10, fontWeight: "700" },
  reference: { color: colors.darkGreen, fontSize: 27, fontWeight: "800", textAlign: "center", marginTop: 14 },
  referenceNote: { color: colors.gold, fontSize: 11, lineHeight: 16, textAlign: "center", marginTop: 9 },
  sectionTitle: { color: colors.darkGreen, fontSize: 15, fontWeight: "800", marginTop: 23 },
  body: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 7 },
  copyButton: { minHeight: 51, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 17, borderRadius: 12, backgroundColor: colors.green },
  copyButtonText: { color: colors.white, fontSize: 14, fontWeight: "800" },
  disclaimer: { color: colors.muted, fontSize: 11, lineHeight: 16, textAlign: "center", marginTop: 16 },
  pressed: { opacity: 0.85 },
});