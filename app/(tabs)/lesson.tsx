import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";

import { getLesson, lessonDetailCopy } from "@/lib/lesson-content";
import { useLessonLanguage } from "@/lib/lesson-language";

const colors = {
  background: "#F7F8F3",
  green: "#175B45",
  darkGreen: "#173D32",
  muted: "#738078",
  border: "#DDE4DC",
  white: "#FFFFFF",
  paleGreen: "#E8F2EB",
  yellow: "#FFF3D4",
  gold: "#765922",
};

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { language } = useLessonLanguage();
  const lesson = getLesson(Array.isArray(id) ? id[0] : id);
  const detailCopy = lessonDetailCopy[language];

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Link href="/(tabs)/lessons" asChild>
          <Pressable accessibilityRole="button" style={styles.backButton}>
            <SymbolView name={{ ios: "arrow.left", android: "arrow_back", web: "arrow_back" }} size={18} tintColor={colors.green} />
            <Text style={styles.backText}>All lessons</Text>
          </Pressable>
        </Link>

        {lesson ? (
          <>
            <Text style={styles.eyebrow}>FINANCIAL LITERACY · {lesson.minutes} MIN READ</Text>
            <Text style={styles.title}>{lesson.title[language]}</Text>
            <View style={styles.articleCard}>
              <View style={styles.iconCircle}>
                <SymbolView name={{ ios: "book", android: "menu_book", web: "menu_book" }} size={23} tintColor={colors.green} />
              </View>
              <Text style={styles.articleText}>{lesson.body[language]}</Text>
            </View>
            <View style={styles.practiceCard}>
              <Text style={styles.practiceTitle}>{detailCopy.tryTitle}</Text>
              <Text style={styles.practiceText}>{detailCopy.tryText}</Text>
            </View>
            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerText}>{detailCopy.disclaimer}</Text>
            </View>
          </>
        ) : (
          <View style={styles.notFound}>
            <Text style={styles.title}>Lesson not found</Text>
            <Text style={styles.notFoundText}>Choose a lesson from the learning library.</Text>
          </View>
        )}
        <Link href="/(tabs)/lessons" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Browse all lessons</Text>
            <SymbolView name={{ ios: "arrow.right", android: "arrow_forward", web: "arrow_forward" }} size={18} tintColor={colors.white} />
          </Pressable>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 28 },
  backButton: { minHeight: 40, flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "flex-start", paddingHorizontal: 11, borderRadius: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  backText: { color: colors.green, fontSize: 12, fontWeight: "700" },
  eyebrow: { color: colors.muted, fontSize: 10, letterSpacing: 0.45, marginTop: 20 },
  title: { color: colors.darkGreen, fontSize: 25, fontWeight: "800", lineHeight: 33, marginTop: 6 },
  articleCard: { padding: 17, marginTop: 17, borderRadius: 17, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white },
  iconCircle: { width: 42, height: 42, alignItems: "center", justifyContent: "center", borderRadius: 13, backgroundColor: colors.paleGreen },
  articleText: { color: colors.darkGreen, fontSize: 16, lineHeight: 26, marginTop: 16 },
  practiceCard: { padding: 15, marginTop: 13, borderRadius: 15, backgroundColor: colors.paleGreen },
  practiceTitle: { color: colors.green, fontSize: 14, fontWeight: "800" },
  practiceText: { color: colors.darkGreen, fontSize: 12, lineHeight: 18, marginTop: 5 },
  disclaimer: { padding: 13, marginTop: 13, borderRadius: 13, backgroundColor: colors.yellow },
  disclaimerText: { color: colors.gold, fontSize: 11, lineHeight: 16 },
  notFound: { paddingVertical: 25 },
  notFoundText: { color: colors.muted, fontSize: 13, marginTop: 8 },
  primaryButton: { minHeight: 50, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, marginTop: 17, borderRadius: 12, backgroundColor: colors.green },
  primaryButtonText: { color: colors.white, fontSize: 13, fontWeight: "800" },
});