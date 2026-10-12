import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

import { stokvelGroups, type StokvelMember } from "@/lib/stokvel-data";

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
  orange: "#B85C18",
};

function formatRand(amount: number, decimals = 0) {
  return `R ${amount.toLocaleString("en-ZA", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

function MemberRow({
  member,
  contributionAmount,
}: {
  member: StokvelMember;
  contributionAmount: number;
}) {
  const statusColor =
    member.status === "Overdue"
      ? colors.orange
      : member.status === "Part-paid"
        ? colors.orange
        : colors.muted;
  const statusDetail =
    member.status === "Paid"
      ? `Paid · ${member.date}`
      : member.status === "Part-paid"
        ? `Part-paid · ${formatRand(Math.max(contributionAmount - member.amount, 0))} left`
        : `Overdue · ${formatRand(contributionAmount)} left`;

  return (
    <View style={styles.memberRow}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{member.initials}</Text>
      </View>
      <View style={styles.memberDetails}>
        <Text style={styles.memberName}>{member.name}</Text>
        <Text style={[styles.memberStatus, { color: statusColor }]}>{statusDetail}</Text>
      </View>
      <Text style={styles.memberAmount}>{formatRand(member.amount)}</Text>
    </View>
  );
}

export default function StokvelDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [planNoteVisible, setPlanNoteVisible] = useState(false);
  const group = stokvelGroups.find((item) => item.id === id);

  if (!group) {
    return (
      <>
        <Stack.Screen options={{ title: "Stokvel not found" }} />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.notFound}>
            <Text style={styles.title}>Stokvel not found</Text>
            <Link href="/stokvels/index" style={styles.backLink}>Back to my stokvels</Link>
          </View>
        </SafeAreaView>
      </>
    );
  }

  const progress = Math.min(group.paidThisMonth / group.monthlyTarget, 1);
  const visibleMembers = showAllMembers ? group.members : group.members.slice(0, 5);

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Link href="/stokvels/index" asChild>
            <Pressable accessibilityRole="button" accessibilityLabel="Back to my stokvels" style={styles.backButton}>
              <SymbolView
                name={{ ios: "arrow.left", android: "arrow_back", web: "arrow_back" }}
                size={20}
                tintColor={colors.green}
              />
            </Pressable>
          </Link>
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>{group.memberCount} MEMBERS · MONTHLY SAVING</Text>
            <Text style={styles.title}>{group.name}</Text>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.muted}>Group balance</Text>
            <Text style={styles.demoBadge}>Demo data</Text>
          </View>
          <Text style={styles.balance}>{formatRand(group.balance, 2)}</Text>
          <View style={styles.contributionHeader}>
            <Text style={styles.muted}>{group.month} contributions</Text>
            <Text style={styles.contributionAmount}>
              {formatRand(group.paidThisMonth)} / {formatRand(group.monthlyTarget)}
            </Text>
          </View>
          <View
            accessibilityLabel={`${Math.round(progress * 100)} percent of monthly group contributions`}
            style={styles.progressTrack}
          >
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.memberCounts}>
            {group.paidCount} paid · {group.partPaidCount} part-paid · {group.overdueCount} overdue
          </Text>
        </View>

        <View style={styles.nextCard}>
          <SymbolView
            name={{ ios: "calendar", android: "calendar_month", web: "calendar_month" }}
            size={21}
            tintColor={colors.green}
          />
          <View style={styles.nextCopy}>
            <Text style={styles.nextTitle}>
              Your next: {formatRand(group.nextContribution)} · {group.nextDate}
            </Text>
            <Text style={styles.nextDescription}>
              You paid {formatRand(group.nextContribution)} on 25 Sep. Your total contribution
              record is {formatRand(group.userContribution)}.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Who&apos;s contributed?</Text>
          <Text style={styles.monthLabel}>{group.month}</Text>
        </View>

        <View style={styles.membersCard}>
          {visibleMembers.map((member) => (
            <MemberRow
              contributionAmount={group.nextContribution}
              key={member.initials}
              member={member}
            />
          ))}
          {group.members.length > 5 ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => setShowAllMembers((visible) => !visible)}
              style={styles.viewAllButton}
            >
              <Text style={styles.viewAllText}>
                {showAllMembers ? "Show fewer members" : `View all ${group.memberCount} members`}
              </Text>
              <SymbolView
                name={{
                  ios: showAllMembers ? "chevron.up" : "arrow.right",
                  android: showAllMembers ? "expand_less" : "arrow_forward",
                  web: showAllMembers ? "expand_less" : "arrow_forward",
                }}
                size={16}
                tintColor={colors.green}
              />
            </Pressable>
          ) : null}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => setPlanNoteVisible((visible) => !visible)}
          style={({ pressed }) => [styles.planButton, pressed && styles.pressed]}
        >
          <Text style={styles.planButtonText}>
            {planNoteVisible ? "Contribution reminder noted" : "Plan my next contribution"}
          </Text>
          <SymbolView
            name={{ ios: "calendar.badge.plus", android: "event", web: "event" }}
            size={19}
            tintColor={colors.white}
          />
        </Pressable>
        {planNoteVisible ? (
          <Text style={styles.planNote}>
            Reminder: {formatRand(group.nextContribution)} is due {group.nextDate}. No payment is
            made or scheduled in this demo.
          </Text>
        ) : null}

        <Text style={styles.disclaimer}>
          Demo records, visible to group members in this concept. No contribution or payment is
          processed.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    backgroundColor: colors.white,
  },
  headerCopy: { flex: 1, marginLeft: 12 },
  eyebrow: { color: colors.muted, fontSize: 11, letterSpacing: 0.25 },
  title: { color: colors.darkGreen, fontSize: 24, fontWeight: "800", marginTop: 4 },
  balanceCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.white,
  },
  balanceHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  muted: { color: colors.muted, fontSize: 12 },
  demoBadge: {
    color: colors.green,
    backgroundColor: colors.paleGreen,
    borderRadius: 20,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: "700",
  },
  balance: { color: colors.darkGreen, fontSize: 32, fontWeight: "800", marginTop: 11 },
  contributionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 12,
  },
  contributionAmount: { color: colors.green, fontSize: 12, fontWeight: "700" },
  progressTrack: {
    height: 8,
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: colors.paleGreen,
    marginTop: 9,
  },
  progressFill: { height: "100%", borderRadius: 8, backgroundColor: colors.green },
  memberCounts: { color: colors.muted, fontSize: 11, marginTop: 10 },
  nextCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 14,
    marginTop: 18,
    borderRadius: 16,
    backgroundColor: colors.yellow,
  },
  nextCopy: { flex: 1 },
  nextTitle: { color: colors.darkGreen, fontSize: 13, fontWeight: "800" },
  nextDescription: { color: "#80683E", fontSize: 11, lineHeight: 16, marginTop: 5 },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 21,
    marginBottom: 10,
  },
  sectionTitle: { color: colors.darkGreen, fontSize: 17, fontWeight: "800" },
  monthLabel: { color: colors.green, fontSize: 12, fontWeight: "700" },
  membersCard: {
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 17,
    backgroundColor: colors.white,
  },
  memberRow: { minHeight: 52, flexDirection: "row", alignItems: "center", gap: 10 },
  avatar: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: colors.paleGreen,
  },
  avatarText: { color: colors.green, fontSize: 10, fontWeight: "800" },
  memberDetails: { flex: 1 },
  memberName: { color: colors.text, fontSize: 12, fontWeight: "700" },
  memberStatus: { fontSize: 10, marginTop: 3 },
  memberAmount: { color: colors.text, fontSize: 12, fontWeight: "700" },
  viewAllButton: {
    minHeight: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  viewAllText: { color: colors.green, fontSize: 12, fontWeight: "700" },
  planButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 18,
    borderRadius: 12,
    backgroundColor: colors.green,
  },
  pressed: { opacity: 0.82 },
  planButtonText: { color: colors.white, fontSize: 14, fontWeight: "800" },
  planNote: { color: colors.green, fontSize: 12, lineHeight: 17, textAlign: "center", marginTop: 10 },
  disclaimer: {
    color: colors.muted,
    fontSize: 10,
    lineHeight: 15,
    textAlign: "center",
    marginTop: 18,
    paddingHorizontal: 10,
  },
  notFound: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 24 },
  backLink: { color: colors.green, fontSize: 14, fontWeight: "700" },
});
