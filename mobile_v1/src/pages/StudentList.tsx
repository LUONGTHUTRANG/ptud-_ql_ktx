import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../types";

type StudentListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "StudentList"
>;

interface Props {
  navigation: StudentListScreenNavigationProp;
}

interface StudentItem {
  id: string;
  name: string;
  studentId: string;
  room: string;
  building: string;
  status: string;
}

const StudentList = ({ navigation }: Props) => {
  const [filterType, setFilterType] = useState<"building" | "room">("building");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const students: StudentItem[] = [
    {
      id: "1",
      name: "Nguyễn Văn A",
      studentId: "SV001",
      room: "101",
      building: "A1",
      status: "Đang ở",
    },
    {
      id: "2",
      name: "Trần Thị B",
      studentId: "SV002",
      room: "102",
      building: "A1",
      status: "Đang ở",
    },
    {
      id: "3",
      name: "Lê Văn C",
      studentId: "SV003",
      room: "201",
      building: "B1",
      status: "Đang ở",
    },
    {
      id: "4",
      name: "Phạm Thị D",
      studentId: "SV004",
      room: "305",
      building: "G6",
      status: "Đang ở",
    },
    {
      id: "5",
      name: "Hoàng Văn E",
      studentId: "SV005",
      room: "101",
      building: "A2",
      status: "Đang ở",
    },
  ];

  const filteredStudents = students.filter((s) => {
    const query = searchQuery.toLowerCase();
    if (filterType === "building") {
      return s.building.toLowerCase().includes(query);
    } else {
      return s.room.toLowerCase().includes(query);
    }
  });

  const renderItem = ({ item }: { item: StudentItem }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="person" size={32} color="#0ea5e9" />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemInfo}>MSSV: {item.studentId}</Text>
        <Text style={styles.itemSubInfo}>
          {item.building} - P.{item.room}
        </Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const selectFilter = (type: "building" | "room") => {
    setFilterType(type);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

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
        <Text style={styles.headerTitle}>Danh sách sinh viên</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          {/* Custom Select Box */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={toggleDropdown}
            >
              <Text style={styles.dropdownText}>
                {filterType === "building" ? "Tòa nhà" : "Phòng"}
              </Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="#64748b" />
            </TouchableOpacity>

            {isDropdownOpen && (
              <Modal
                transparent={true}
                visible={isDropdownOpen}
                animationType="fade"
                onRequestClose={() => setIsDropdownOpen(false)}
              >
                <TouchableWithoutFeedback
                  onPress={() => setIsDropdownOpen(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.dropdownMenu}>
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => selectFilter("building")}
                      >
                        <Text style={styles.dropdownItemText}>Tòa nhà</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => selectFilter("room")}
                      >
                        <Text style={styles.dropdownItemText}>Phòng</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            )}
          </View>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={
                filterType === "building"
                  ? "Nhập mã số tòa nhà..."
                  : "Nhập mã số phòng..."
              }
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filteredStudents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
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
    backgroundColor: "rgba(248, 250, 252, 0.8)",
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
  headerRight: {
    width: 40,
  },
  filterContainer: {
    padding: 16,
    paddingBottom: 8,
    zIndex: 10,
  },
  filterRow: {
    flexDirection: "row",
    gap: 12,
  },
  dropdownContainer: {
    width: 120,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  dropdownText: {
    fontSize: 14,
    color: "#0f172a",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownMenu: {
    position: "absolute",
    top: 120, // Approximate position, might need adjustment or calculation
    left: 16,
    width: 120,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#334155",
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    justifyContent: "center",
  },
  input: {
    fontSize: 14,
    color: "#0f172a",
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 4,
  },
  itemInfo: {
    fontSize: 14,
    color: "#64748b",
  },
  itemSubInfo: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#dcfce7",
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#16a34a",
  },
});

export default StudentList;
