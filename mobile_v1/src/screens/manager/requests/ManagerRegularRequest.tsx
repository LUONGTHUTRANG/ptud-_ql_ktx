import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types";
import SupportRequestList, {
  RequestItem,
} from "../../../components/SupportRequestList";

type ManagerRegularRequestScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ManagerRegularRequest"
>;

interface Props {
  navigation: ManagerRegularRequestScreenNavigationProp;
}

const ManagerRegularRequest = ({ navigation }: Props) => {
  const requests: RequestItem[] = [
    {
      id: "1",
      code: "SC123",
      type: "repair",
      studentName: "Nguyễn Văn A",
      room: "P.404 A2",
      date: "18/07/2024",
      status: "pending",
    },
    {
      id: "2",
      code: "KN456",
      type: "complaint",
      studentName: "Trần Thị B",
      room: "P.201 B1",
      date: "17/07/2024",
      status: "completed",
    },
    {
      id: "3",
      code: "DX789",
      type: "proposal",
      studentName: "Lê Văn C",
      room: "P.1103 C2",
      date: "16/07/2024",
      status: "new",
    },
    {
      id: "4",
      code: "SC125",
      type: "repair",
      studentName: "Phạm Thị D",
      room: "P.505 A1",
      date: "15/07/2024",
      status: "rejected",
    },
    {
      id: "5",
      code: "KN457",
      type: "complaint",
      studentName: "Vũ Minh E",
      room: "P.701 B2",
      date: "14/07/2024",
      status: "completed",
    },
  ];

  return (
    <SupportRequestList
      role="manager"
      title="Quản lý Yêu cầu"
      data={requests}
      onBackPress={() => navigation.goBack()}
      onItemPress={(id) => navigation.navigate("RequestDetail", { id })}
    />
  );
};

export default ManagerRegularRequest;
