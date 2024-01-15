import React, { useRef } from "react";
import { View } from "react-native";
import { FAB } from "./fab";
import { ModalizeComponent } from "./modalize";
import { Modalize } from "react-native-modalize";

export const CreateUser: React.FC = () => {
  const modalRef = useRef<Modalize | null>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <View>
      <FAB onPress={openModal} />
      <ModalizeComponent modalRef={modalRef} closeModal={closeModal} />
    </View>
  );
};
