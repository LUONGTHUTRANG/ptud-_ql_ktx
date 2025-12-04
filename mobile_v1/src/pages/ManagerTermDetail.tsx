import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../types";

type ManagerTermDetailRouteProp = RouteProp<
  RootStackParamList,
  "ManagerTermDetail"
>;

const ManagerTermDetail = () => {
  const navigation = useNavigation();
  const route = useRoute<ManagerTermDetailRouteProp>();
  const { mode, term } = route.params || { mode: "create" };

  const [termName, setTermName] = useState("");

  // Normal Registration
  const [normalOpen, setNormalOpen] = useState("");
  const [normalClose, setNormalClose] = useState("");

  // Special Registration
  const [specialOpen, setSpecialOpen] = useState("");
  const [specialClose, setSpecialClose] = useState("");

  // Extension
  const [extensionOpen, setExtensionOpen] = useState("");
  const [extensionClose, setExtensionClose] = useState("");

  useEffect(() => {
    if (mode === "edit" && term) {
      setTermName(term.title);
      // Mocking date population based on the term object structure from ManagerTerm
      setNormalOpen(term.regular?.start || "");
      setNormalClose(term.regular?.end || "");
      setSpecialOpen(term.special?.start || "");
      setSpecialClose(term.special?.end || "");
      setExtensionOpen(term.extension?.start || "");
      setExtensionClose(term.extension?.end || "");
    }
  }, [mode, term]);

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving term:", {
      termName,
      normal: { open: normalOpen, close: normalClose },
      special: { open: specialOpen, close: specialClose },
      extension: { open: extensionOpen, close: extensionClose },
    });
    navigation.goBack();
  };

  const DateInput = ({
    label,
    value,
    onChange,
    placeholder,
  }: {
    label: string;
    value: string;
    onChange: (text: string) => void;
    placeholder: string;
  }) => (
    <View style={styles.dateInputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          value={value}
          onChangeText={onChange}
        />
        <View style={styles.iconContainer}>
          <Ionicons name="calendar-outline" size={24} color="#94a3b8" />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f7f8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {mode === "create" ? "Tạo Kỳ Đăng ký" : "Chỉnh sửa Kỳ Đăng ký"}
        </Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButtonHeader}>
          <Text style={styles.saveButtonHeaderText}>Lưu</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Term Name */}
        <View style={styles.section}>
          <Text style={styles.label}>Tên kỳ đăng ký</Text>
          <TextInput
            style={styles.input}
            placeholder="Ví dụ: Học kỳ I 2024-2025"
            placeholderTextColor="#94a3b8"
            value={termName}
            onChangeText={setTermName}
          />
        </View>

        {/* Normal Registration Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Thời gian đăng ký thông thường
          </Text>
          <View style={styles.row}>
            <DateInput
              label="Ngày/Giờ mở"
              value={normalOpen}
              onChange={setNormalOpen}
              placeholder="Chọn ngày"
            />
            <DateInput
              label="Ngày/Giờ đóng"
              value={normalClose}
              onChange={setNormalClose}
              placeholder="Chọn ngày"
            />
          </View>
        </View>

        {/* Special Registration Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Thời gian đăng ký hoàn cảnh đặc biệt
          </Text>
          <View style={styles.row}>
            <DateInput
              label="Ngày/Giờ mở"
              value={specialOpen}
              onChange={setSpecialOpen}
              placeholder="Chọn ngày"
            />
            <DateInput
              label="Ngày/Giờ đóng"
              value={specialClose}
              onChange={setSpecialClose}
              placeholder="Chọn ngày"
            />
          </View>
        </View>

        {/* Extension Time */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Thời gian gia hạn chỗ ở</Text>
          <View style={styles.row}>
            <DateInput
              label="Ngày/Giờ mở"
              value={extensionOpen}
              onChange={setExtensionOpen}
              placeholder="Chọn ngày"
            />
            <DateInput
              label="Ngày/Giờ đóng"
              value={extensionClose}
              onChange={setExtensionClose}
              placeholder="Chọn ngày"
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f6f7f8",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
  },
  saveButtonHeader: {
    width: 48,
    alignItems: "flex-end",
  },
  saveButtonHeaderText: {
    color: "#136dec",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  lastSection: {
    marginBottom: 80,
  },
  label: {
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    width: "100%",
    height: 56,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#0f172a",
  },
  iconContainer: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  sectionTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  dateInputContainer: {
    flex: 1,
    minWidth: 150,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#f6f7f8",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  saveButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#136dec",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ManagerTermDetail;
