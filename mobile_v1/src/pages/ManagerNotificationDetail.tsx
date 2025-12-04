import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../types";

type ManagerNotificationDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ManagerNotificationDetail"
>;

type ManagerNotificationDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ManagerNotificationDetail"
>;

interface Props {
  navigation: ManagerNotificationDetailScreenNavigationProp;
  route: ManagerNotificationDetailScreenRouteProp;
}

const ManagerNotificationDetail = ({ navigation, route }: Props) => {
  const { id } = route.params || {};
  const isEditing = !!id;

  // Mock data based on ID (in a real app, fetch from API)
  const [title, setTitle] = useState(
    isEditing ? "Thông báo về việc đăng ký điện nước" : ""
  );
  const [content, setContent] = useState(
    isEditing
      ? "Kính gửi các bạn sinh viên,\nPhòng Quản lý KTX xin thông báo về lịch đăng ký và gia hạn hợp đồng điện, nước cho học kỳ tới. Vui lòng hoàn tất đăng ký trước ngày 25/08/2024.\nTrân trọng cảm ơn."
      : ""
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? "Chi tiết Thông báo" : "Tạo Thông báo"}
        </Text>
        {/* Empty view for balance, replacing the trash icon as requested */}
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Title Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tiêu đề</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Nhập tiêu đề thông báo"
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* Content Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nội dung</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={content}
              onChangeText={setContent}
              placeholder="Nhập nội dung thông báo"
              placeholderTextColor="#94a3b8"
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Recipient List Item */}
          <View style={styles.recipientCard}>
            <View style={styles.recipientContent}>
              <View style={styles.recipientIcon}>
                <MaterialIcons name="groups" size={24} color="#136dec" />
              </View>
              <View style={styles.recipientInfo}>
                <Text style={styles.recipientLabel}>Đối tượng nhận</Text>
                <Text style={styles.recipientValue} numberOfLines={2}>
                  Nhà A1, Tầng 5 - Nhà B2
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Action Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              {isEditing ? "Lưu thay đổi" : "Tạo mới"}
            </Text>
          </TouchableOpacity>
          {isEditing && (
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Gửi lại</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: "#f8fafc",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    textAlign: "center",
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 24,
    paddingBottom: 100,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: "#0f172a",
  },
  textArea: {
    minHeight: 192, // min-h-48 (48 * 4 = 192)
  },
  recipientCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 16,
    minHeight: 72,
  },
  recipientContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 16,
  },
  recipientIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(19, 109, 236, 0.1)", // primary/10
    alignItems: "center",
    justifyContent: "center",
  },
  recipientInfo: {
    flex: 1,
    justifyContent: "center",
  },
  recipientLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1e293b",
  },
  recipientValue: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#136dec",
  },
  footer: {
    padding: 16,
    backgroundColor: "#f8fafc",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    gap: 12,
  },
  primaryButton: {
    height: 48,
    backgroundColor: "#136dec",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    height: 48,
    backgroundColor: "rgba(19, 109, 236, 0.1)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#136dec",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ManagerNotificationDetail;
