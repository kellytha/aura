import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

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
const history = [
  { month: "Jul", score: 650 },
  { month: "Aug", score: 662 },
  { month: "Sep", score: 668 },
  { month: "Oct", score: 680 },
];
const factors = [
  { icon: { ios: "calendar", android: "event_available", web: "event_available" }, title: "Payment history", detail: "12 of 12 repayments on time", status: "On track", color: colors.green },
  { icon: { ios: "creditcard", android: "credit_card", web: "credit_card" }, title: "Credit used", detail: "42% of available credit used", status: "Can improve", color: "#B95B1A" },
  { icon: { ios: "clock", android: "schedule", web: "schedule" }, title: "Account age", detail: "Oldest credit account: 2 years", status: "Building", color: colors.green },
  { icon: { ios: "doc.text", android: "description", web: "description" }, title: "Recent applications", detail: "1 credit application in 6 months", status: "Keep low", color: colors.green },
] as const;

export default function CreditScoreScreen() {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.pageHeader}>
          <Link href="/(tabs)" asChild>
            <Pressable accessibilityRole="button" accessibilityLabel="Go to home" style={styles.backButton}>
              <SymbolView name={{ ios: "arrow.left", android: "arrow_back", web: "arrow_back" }} size={19} tintColor={colors.green} />
            </Pressable>
          </Link>
          <View>
            <Text style={styles.eyebrow}>UNDERSTAND YOUR CREDIT</Text>
            <Text style={styles.title}>My credit score</Text>
          </View>
        </View>

        <View style={styles.notice}>
          <SymbolView name={{ ios: "info.circle", android: "info", web: "info" }} size={18} tintColor={colors.gold} />
          <Text style={styles.noticeText}>Illustrative data—not a credit bureau report. No bureau is connected.</Text>
        </View>

        <View style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <Text style={styles.scoreDate}>Example · 12 Oct 2026</Text>
            <Text style={styles.demoBadge}>Demo score</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.score}>680</Text>
            <View>
              <Text style={styles.rating}>Good</Text>
              <Text style={styles.scoreSub}>on this example scale</Text>
            </View>
          </View>
          <View style={styles.scaleLabels}><Text style={styles.scaleText}>300</Text><Text style={styles.scaleText}>Example scale · higher is better</Text><Text style={styles.scaleText}>850</Text></View>
          <View style={styles.scaleTrack}>
            <View style={[styles.scaleSegment, { flex: 38, backgroundColor: "#E7B960" }]} />
            <View style={[styles.scaleSegment, { flex: 24, backgroundColor: "#AFCFAF" }]} />
            <View style={[styles.scaleSegment, { flex: 38, backgroundColor: colors.white }]} />
            <View style={styles.scaleMarker} />
          </View>
          <View style={styles.scaleCaptions}>
            <Text style={styles.scaleCaption}>Developing{"\n"}300–579</Text>
            <Text style={styles.scaleCaption}>Fair{"\n"}580–669</Text>
            <Text style={styles.scaleCaption}>Good{"\n"}670–850</Text>
          </View>
          <Text style={styles.scoreDisclaimer}>Bureau scales vary. A score alone does not guarantee credit approval.</Text>
        </View>

        <View style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Text style={styles.cardTitle}>Recent demo history</Text>
            <Text style={styles.growthBadge}>↑ 12 points</Text>
          </View>
          <View style={styles.historyRow}>
            {history.map((item) => (
              <View key={item.month} style={styles.historyItem}>
                <View style={[styles.historyDot, { marginBottom: Math.max(0, (680 - item.score) / 5) }]} />
                <Text style={styles.historyScore}>{item.score}</Text>
                <Text style={styles.historyMonth}>{item.month}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.cardFootnote}>July–October 2026 · Illustrative monthly snapshots</Text>
        </View>

        <Text style={styles.sectionTitle}>What can influence a score?</Text>
        <Text style={styles.body}>These sample factors explain credit habits—not an assessment of your accounts.</Text>
        <View style={styles.factorCard}>
          {factors.map((factor, index) => (
            <View key={factor.title} style={[styles.factorRow, index < factors.length - 1 && styles.factorBorder]}>
              <SymbolView name={factor.icon} size={18} tintColor={colors.green} />
              <View style={styles.factorText}>
                <Text style={styles.factorTitle}>{factor.title}</Text>
                <Text style={styles.factorDetail}>{factor.detail}</Text>
              </View>
              <Text style={[styles.factorStatus, { color: factor.color }]}>{factor.status}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.sectionTitle}>Small steps, healthier credit</Text>
          <View style={styles.tipRow}><Text style={styles.tipTitle}>Pay by the due date</Text><Text style={styles.tipDetail}>Set reminders for repayments. If you may miss one, speak to your credit provider early.</Text></View>
          <View style={styles.tipRow}><Text style={styles.tipTitle}>Bring credit balances down</Text><Text style={styles.tipDetail}>Aim to use less of your available credit. Avoid borrowing just to build a score.</Text></View>
          <View style={styles.tipRow}><Text style={styles.tipTitle}>Check your credit report</Text><Text style={styles.tipDetail}>Request your report from a registered credit bureau and dispute any errors you find.</Text></View>
        </View>
        <Text style={styles.sectionTitle}>Your footprint is a separate story</Text>
        <Text style={styles.body}>A bureau score reflects credit account history. Your money footprint records community saving habits. Stokvel contributions do not automatically change a bureau score.</Text>
        <Link href="/(tabs)/footprint" asChild>
          <Pressable style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}>
            <Text style={styles.outlineButtonText}>View my money footprint</Text>
            <SymbolView name={{ ios: "arrow.right", android: "arrow_forward", web: "arrow_forward" }} size={17} tintColor={colors.green} />
          </Pressable>
        </Link>
        <Text style={styles.disclaimer}>All figures are demo data. Nothing is shared with a lender or credit bureau.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 28 },
  pageHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  backButton: { width: 43, height: 43, alignItems: "center", justifyContent: "center", borderRadius: 13, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  eyebrow: { color: colors.muted, fontSize: 11, letterSpacing: 0.4 },
  title: { color: colors.darkGreen, fontSize: 25, fontWeight: "800", marginTop: 5 },
  notice: { flexDirection: "row", alignItems: "flex-start", gap: 9, padding: 12, marginTop: 17, borderRadius: 13, backgroundColor: colors.yellow },
  noticeText: { flex: 1, color: colors.gold, fontSize: 12, lineHeight: 17 },
  scoreCard: { padding: 16, marginTop: 17, borderRadius: 18, backgroundColor: colors.green },
  scoreHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  scoreDate: { color: colors.white, fontSize: 12 },
  demoBadge: { color: colors.gold, backgroundColor: colors.yellow, overflow: "hidden", paddingHorizontal: 9, paddingVertical: 4, borderRadius: 15, fontSize: 10, fontWeight: "700" },
  scoreRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 7 },
  score: { color: colors.white, fontSize: 53, fontWeight: "800" },
  rating: { color: colors.white, fontSize: 19, fontWeight: "800" },
  scoreSub: { color: "#E3F0E9", fontSize: 11, marginTop: 2 },
  scaleLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  scaleText: { color: "#E3F0E9", fontSize: 9 },
  scaleTrack: { height: 9, flexDirection: "row", gap: 3, position: "relative", marginTop: 5 },
  scaleSegment: { height: 8, borderRadius: 5 },
  scaleMarker: { position: "absolute", left: "69%", top: -3, width: 14, height: 14, borderRadius: 7, borderWidth: 3, borderColor: colors.white, backgroundColor: colors.green },
  scaleCaptions: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  scaleCaption: { color: "#E3F0E9", fontSize: 9 },
  scoreDisclaimer: { color: "#E3F0E9", fontSize: 10, lineHeight: 15, marginTop: 10 },
  historyCard: { padding: 15, marginTop: 17, borderRadius: 17, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  historyHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardTitle: { color: colors.darkGreen, fontSize: 15, fontWeight: "800" },
  growthBadge: { color: colors.green, backgroundColor: colors.paleGreen, overflow: "hidden", paddingHorizontal: 9, paddingVertical: 5, borderRadius: 14, fontSize: 10, fontWeight: "700" },
  historyRow: { height: 92, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-around", marginTop: 9, borderBottomWidth: 1, borderColor: colors.border },
  historyItem: { alignItems: "center", justifyContent: "flex-end", flex: 1, height: "100%" },
  historyDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.green },
  historyScore: { color: colors.green, fontSize: 11, fontWeight: "800", marginTop: 5 },
  historyMonth: { color: colors.muted, fontSize: 10, marginTop: 5, marginBottom: 7 },
  cardFootnote: { color: colors.muted, fontSize: 10, marginTop: 10 },
  sectionTitle: { color: colors.darkGreen, fontSize: 16, fontWeight: "800", marginTop: 21 },
  body: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 6 },
  factorCard: { paddingHorizontal: 13, marginTop: 12, borderRadius: 17, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  factorRow: { minHeight: 61, flexDirection: "row", alignItems: "center", gap: 9 },
  factorBorder: { borderBottomWidth: 1, borderColor: colors.border },
  factorText: { flex: 1 },
  factorTitle: { color: colors.darkGreen, fontSize: 12, fontWeight: "800" },
  factorDetail: { color: colors.muted, fontSize: 10, marginTop: 4 },
  factorStatus: { fontSize: 10, fontWeight: "700" },
  tipsCard: { padding: 15, marginTop: 17, borderRadius: 17, backgroundColor: colors.yellow },
  tipRow: { marginTop: 13 },
  tipTitle: { color: colors.darkGreen, fontSize: 12, fontWeight: "800" },
  tipDetail: { color: colors.gold, fontSize: 11, lineHeight: 16, marginTop: 3 },
  outlineButton: { minHeight: 49, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingHorizontal: 12, marginTop: 17, borderWidth: 1, borderColor: colors.border, borderRadius: 13, backgroundColor: colors.white },
  outlineButtonText: { color: colors.green, fontSize: 13, fontWeight: "800" },
  disclaimer: { color: colors.muted, fontSize: 10, textAlign: "center", marginTop: 15 },
  pressed: { opacity: 0.85 },
});